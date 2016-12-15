/*
 * File: 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global ClassExample, matrix  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

ClassExample.prototype.resetSelection = function() {
    this.mManipulator.resetTrigger();
};

// define a hit as a WC pos within 0.2 from the center position
ClassExample.prototype.detectMouseOver = function (wcX, wcY) {
    var triggered = false;
    
    if (this.mManipulator.isActivated()) {
        if (this.mManipulator.isInManipulationMode()) {
            this.mManipulator.manipulate(wcX, wcY);
            triggered = true;
        } else {
            triggered = this.mManipulator.triggerManipulatorMode(wcX, wcY);
        }
    }
    
    if (!triggered) {
        var wcPos = [wcX, wcY];
        var once = (
            this.mBody.selectBase(wcPos, this.mManipulator) ||
            this.mBody.selectArmBase(wcPos, this.mManipulator) ||
            this.mBody.selectArmTipLeft(wcPos, this.mManipulator) ||
            this.mBody.selectArmTipRight(wcPos, this.mManipulator) );
            
        if (!once) {
            this.mManipulator.setXformMatrix(null, null);
        } else {
            this.mCurrentObject = this.mManipulator.mSceneNode;
//            console.log(this.mCurrentXform);
        }
     }
    
};