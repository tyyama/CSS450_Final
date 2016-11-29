/* 
 * File: ViewManipulator.js
 */

/*jslint node: true, vars: true, bitwise: true */
/*global ViewManipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";


ViewManipulator.prototype.withinBounds = function (rx, ry, xPos, yPos) {
    return ((xPos > (rx - this.kViewportSelectTol)) &&
            (xPos < (rx + this.kViewportSelectTol)) &&
            (yPos > (ry - this.kViewportSelectTol)) &&
            (yPos < (ry + this.kViewportSelectTol)) );
};


// cx, cy: mouse click in canvas coordinate
// rx, ry: center
ViewManipulator.prototype.viewportMoveSelected = function (cx, cy) {
    var v = this.mTargetCamera.getViewport();
    var rx = v[0] + 0.5 * v[2];
    var ry = v[1] + 0.5 * v[3];
    var inTrigger = this.withinBounds(rx, ry, cx, cy);
    if (inTrigger)
        this.mViewportBound.triggeredMove();
    return inTrigger;
};

// cx, cy: mouse click in canvas coordinate
// rx, ry: top left
ViewManipulator.prototype.viewportScaleSelected = function(cx, cy) {
    var v = this.mTargetCamera.getViewport();
    var rx = v[0] + v[2];
    var ry = v[1] + v[3];
    var inTrigger = this.withinBounds(rx, ry, cx, cy);
    if (inTrigger)
        this.mViewportBound.triggeredScale();
    return inTrigger;
};


