/* File: Manipulator.js 
 *
 * Support for drawing of a square
 */

/*jslint node: true, vars: true */
/*global PivotedTransform, SquareRenderable, SceneNode  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function Manipulator(shader) {
    this.mTriggeredColor = [1, 1, 1, 1];

    this.mObjToWCMatrix = null;
    this.mSceneNode = null;
    this.mStratPosX = 0;
    this.mStartPosY = 0;
    
    this.mInitCx = 0;
    this.mInitCy = 0;
    
    SceneNode.call(this, shader, "Manipulator", true);
    this.kWidth = 0.04;
    this.mTol = 0.25;
    this.kKnobSize = 0.25;
    this.kKnobLength = 1.5;
    
    this.kTriggerMode = {
        eTriggerModeMove: 0,
        eTriggerModeScale: 1,
        eTriggerModeRotate: 2,
        eTriggerModeNone: 3
    };
    
    this.mTrigger = [
        {   // 0 is move, center
            mTriggerControl: this.mPivotPos,
            mTriggerColor: [1, 0.6, 0.6, 1],
            mTriggerPos: [0, 0]
        },
        {   // 1 is scale, horizontal
            mTriggerControl: null,
            mTriggerColor: [1, 0.8, 0.4, 1],
            mTriggerPos: [this.kKnobLength, 0]
        },
        {   // 2 is rotate
            mTriggerControl: null,
            mTriggerColor: [1, 0, 1, 1],
            mTriggerPos: [0, this.kKnobLength]
        }   
    ];
    this.mTriggerMode = this.kTriggerMode.eTriggerModeNone;
    this.mPivotPos.setColor(this.mTrigger[this.kTriggerMode.eTriggerModeMove].mTriggerColor);
    
    // Horizontable know for scaling
    var obj =  new SquareRenderable(shader);
    obj.setColor([0, 0, 0, 1]);
    var xf = obj.getXform();
    xf.setSize(this.kKnobLength, this.kWidth);  // Horizontal
    xf.setPosition(this.kKnobLength * 0.5, 0);
    this.addToSet(obj);
    obj = new SquareRenderable(shader);
    obj.setColor(this.mTrigger[this.kTriggerMode.eTriggerModeScale].mTriggerColor);
    var xf = obj.getXform();
    xf.setSize(this.kKnobSize, this.kKnobSize);  // Horizontal
    xf.setPosition(this.kKnobLength, 0);
    this.addToSet(obj);
    this.mTrigger[this.kTriggerMode.eTriggerModeScale].mTriggerControl = obj;

    // Vertical for rotation
    obj = new SquareRenderable(shader);
    obj.setColor([0, 0, 0, 1]);
    xf = obj.getXform();
    xf.setSize(this.kWidth, this.kKnobLength);
    xf.setPosition(0, this.kKnobLength * 0.5);  // Vertical
    this.addToSet(obj);
    obj = new SquareRenderable(shader);
    obj.setColor(this.mTrigger[this.kTriggerMode.eTriggerModeRotate].mTriggerColor);
    xf = obj.getXform();
    xf.setSize(this.kKnobSize, this.kKnobSize);
    xf.setPosition(0, this.kKnobLength);  // Vertical
    this.addToSet(obj);
    this.mTrigger[this.kTriggerMode.eTriggerModeRotate].mTriggerControl = obj;
}
gEngine.Core.inheritPrototype(Manipulator, SceneNode);

Manipulator.prototype.isActivated = function () { return this.mObjToWCMatrix !== null; };

Manipulator.prototype.setXformMatrix = function (m, sn) {
    if (this.mSceneNode !== null) {
        this.mSceneNode.setManipulator(null);
    }
    this.mObjToWCMatrix = m;
    this.mSceneNode = sn;
    if (this.mSceneNode !== null) {
        this.mSceneNode.setManipulator(this);
        var p = this.getXform().getPosition();
        this.mInitCx = p[0];
        this.mInitCy = p[1];
    }
};

Manipulator.prototype.draw = function (camera, parentMat) {
    if (this.isActivated() && camera.getName() === "Editor")
        SceneNode.prototype.draw.call(this, camera, parentMat);
};