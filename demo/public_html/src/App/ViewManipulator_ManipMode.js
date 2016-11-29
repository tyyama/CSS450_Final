/* 
 * File: ViewManipulator.js
 */

/*jslint node: true, vars: true, bitwise: true */
/*global ViewManipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

ViewManipulator.prototype.isInManipMode = function () {
    return this.mManipMode !== this.eManipMode.eNotInManipMode;
};

ViewManipulator.prototype.exitManipMode = function () {
    this.mManipMode = this.eManipMode.eNotInManipMode;
    this.mWCBound.resetTrigger();
    this.mViewportBound.resetTrigger();
};

ViewManipulator.prototype.triggerManipulation = function (cx, cy, wcPos) {
    var isTriggered = false;
    isTriggered = this.viewportMoveSelected(cx, cy);
    if (isTriggered) {
        // Do what?
        this.mManipMode = this.eManipMode.eMoveViewport;
    } else {
        isTriggered = this.viewportScaleSelected(cx, cy);
        if (isTriggered) {
            // Do what?
            this.mManipMode = this.eManipMode.eScaleViewport;
        } else {
            isTriggered = this.mWCBound.inMoveTrigger(wcPos[0], wcPos[1]);
            if (isTriggered) {
                this.mManipMode = this.eManipMode.eMoveWCWindow;
            } else {
                isTriggered = this.mWCBound.inScaleTrigger(wcPos[0], wcPos[1]);
                if (isTriggered) {
                    // Do what?
                    this.mManipMode = this.eManipMode.eScaleWCWindow;
                }
            }
        }
    }
    return isTriggered;
};

ViewManipulator.prototype.updateManipulation = function (ctrl, wcPos) {
    switch (this.mManipMode) {
    case this.eManipMode.eMoveViewport:
        // canvasX, Y: must be the center
        ctrl.mSmallViewport[0] = ctrl.mCanvasX - 0.5 * ctrl.mSmallViewport[2];
        ctrl.mSmallViewport[1] = ctrl.mCanvasY - 0.5 * ctrl.mSmallViewport[3];
        ctrl.setSmallViewport();
        break;
    case this.eManipMode.eScaleViewport:
        // canvasX, Y: must be the top-right
        if ((ctrl.mCanvasX > ctrl.mSmallViewport[0]) &&
            (ctrl.mCanvasY > ctrl.mSmallViewport[1])) {
            var vWidth = ctrl.mCanvasX - ctrl.mSmallViewport[0];
            var vHeight = ctrl.mCanvasY - ctrl.mSmallViewport[1];
            ctrl.mSmallViewport[2] = vWidth;
            ctrl.mSmallViewport[3] = vHeight;
            ctrl.setSmallViewport();
        }
        break;
    case this.eManipMode.eMoveWCWindow:
        this.mTargetCamera.setWCCenter(wcPos[0], wcPos[1]);
        ctrl.mSmallViewWCCenter[0] = wcPos[0];
        ctrl.mSmallViewWCCenter[1] = wcPos[1];
        this.mWCBound.getXform().setPosition(wcPos[0], wcPos[1]);
        break;
    case this.eManipMode.eScaleWCWindow:
        // must handle viewport aspect ratio ...
        var c = this.mTargetCamera.getWCCenter();
        if ((wcPos[0] > c[0]) && (wcPos[1] > c[1])) {
            var wcWidth = (wcPos[0] - c[0]) * 2;
            var wcHeight = (wcPos[1] - c[1]) * 2;
            var aspect = wcHeight / wcWidth;
            ctrl.mSmallViewport[3] = ctrl.mSmallViewport[2] * aspect;
            ctrl.setSmallViewport();
            this.setWCWidth(wcWidth);
            ctrl.mSmallViewWCWidth = wcWidth;
        }
        break;
    }
};