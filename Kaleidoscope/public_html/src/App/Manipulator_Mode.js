/* File: Manipulator_Mode.js 
 *
 * Support for drawing of a square
 */

/*jslint node: true, vars: true */
/*global Manipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

// r is the reference position
// (xPos, yPos) is the user enter position
// All position are in WC space
Manipulator.prototype.withinBounds = function (r, xPos, yPos) {
    return ((xPos > (r[0] - this.mTol)) &&
            (xPos < (r[0] + this.mTol)) &&
            (yPos > (r[1] - this.mTol)) &&
            (yPos < (r[1] + this.mTol)) );
};

Manipulator.prototype.objToWCMatrix = function () {
    var m = this.mSceneNode.getXform().getXform();
    mat4.multiply(m, this.mObjToWCMatrix, m);
    return m;
};

Manipulator.prototype.objToWC = function (objP) {
    var m = this.objToWCMatrix();
    var wcPos = [0, 0];
    vec2.transformMat4(wcPos, objP, m);
    return wcPos;
};

Manipulator.prototype.wcToObj = function (wcP) {
    var im = mat4.create();
    mat4.invert(im, this.mObjToWCMatrix);
    var objPos = [0, 0];
    vec2.transformMat4(objPos, wcP, im);
    objPos[0] -= this.mInitCx;
    objPos[1] -= this.mInitCy;
    return objPos;
};

Manipulator.prototype.triggerManipulatorMode = function(wcX, wcY) {
    if (!this.isActivated())
        return;
    
    this.mTriggerMode =  this.kTriggerMode.eTriggerModeMove;
    var r, tObj, p = [0, 0];
    var t = this.getXform().getPosition();
    var found = false;
    while ( (!found) && (this.mTriggerMode<this.kTriggerMode.eTriggerModeNone)) {
        tObj = this.mTrigger[this.mTriggerMode];
        p[0] = tObj.mTriggerPos[0] + t[0];
        p[1] = tObj.mTriggerPos[1] + t[1];
        r = this.objToWC(p);
        found = this.withinBounds(r, wcX, wcY);
        if (found) {
          tObj.mTriggerControl.setColor(this.mTriggeredColor);
          this.mStartPosX = wcX;
          this.mStartPosY = wcY;
        } else
            this.mTriggerMode++;
    }
    return found;
};

Manipulator.prototype.manipulate = function(wcX, wcY) {
    if (this.mTriggerMode === this.kTriggerMode.eTriggerModeNone)
        return;
    
    var dx = wcX - this.mStartPosX;
    var dy = wcY - this.mStartPosY;
    this.mStartPosX = wcX;
    this.mStartPosY = wcY;
    var xf = this.mSceneNode.getXform();
    
    switch (this.mTriggerMode) {
        case this.kTriggerMode.eTriggerModeMove:
            var obj = this.wcToObj([wcX, wcY]);
            xf.setPosition(obj[0], obj[1]);
            break;
        case this.kTriggerMode.eTriggerModeScale:
            xf.incWidthBy(0.5*dx);
            xf.incHeightBy(0.5*dy);
            break;
        case this.kTriggerMode.eTriggerModeRotate:
            var d = 30 * Math.sqrt(dx*dx + dy*dy);
            if (dx > 0)
                d = -d;
            xf.incRotationByDegree(d);
            break;
    }
};

Manipulator.prototype.resetTrigger = function() {
    var tObj;
    for (var i = 0; i<this.kTriggerMode.eTriggerModeNone; i++) {
        tObj = this.mTrigger[i];
        tObj.mTriggerControl.setColor(tObj.mTriggerColor);
    }
    this.mTriggerMode = this.kTriggerMode.eTriggerModeNone;
};

Manipulator.prototype.isInManipulationMode = function() {
    return (this.mTriggerMode !== this.kTriggerMode.eTriggerModeNone);
};