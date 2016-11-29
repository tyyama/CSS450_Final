/* File: SquareArea.js 
 *
 * Support for drawing of a square
 */

/*jslint node: true, vars: true */
/*global PivotedTransform, SquareRenderable, SceneNode  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function SquareArea(shader, color) {
    this.mTriggeredColor = [1, 1, 1, 1];
    this.mMoveTriggerColor = [1, 0, 0, 1];
    this.mScaleTriggerColor = [0, 0, 0, 1];
    
    SceneNode.call(this, shader, true);
    this.mPivotPos.setColor(this.mMoveTriggerColor);
    this.kWidth = 0.02;
    this.kTol = 5;

    var obj = new SquareRenderable(shader);
    obj.setColor(color);
    var xf = obj.getXform();
    xf.setSize(this.kWidth, 1);  // left
    xf.setPosition(-0.5, 0);
    this.addToSet(obj);

    obj = new SquareRenderable(shader);
    obj.setColor(color);
    xf = obj.getXform();
    xf.setSize(this.kWidth, 1);
    xf.setPosition(0.5, 0);  // right
    this.addToSet(obj);

    obj = new SquareRenderable(shader);
    obj.setColor(color);
    xf = obj.getXform();
    xf.setSize(1, this.kWidth);
    xf.setPosition(0, -0.5);  // bottom
    this.addToSet(obj);

    obj = new SquareRenderable(shader);
    obj.setColor(color);
    xf = obj.getXform();
    xf.setSize(1, this.kWidth);
    xf.setPosition(0, 0.5); // top
    this.addToSet(obj);
    
    this.mScaleControl = new SquareRenderable(shader);
    this.mScaleControl.setColor(this.mScaleTriggerColor);
    xf = this.mScaleControl.getXform();
    xf.setSize(3*this.kWidth, 3*this.kWidth);
    xf.setPosition(0.5, 0.5); // top
    this.addToSet(this.mScaleControl );
}
gEngine.Core.inheritPrototype(SquareArea, SceneNode);

SquareArea.prototype.withinBounds = function (p, xPos, yPos) {
    return ((xPos > (p[0] - this.kTol)) &&
            (xPos < (p[0] + this.kTol)) &&
            (yPos > (p[1] - this.kTol)) &&
            (yPos < (p[1] + this.kTol)) );
};

SquareArea.prototype.inMoveTrigger = function (xPos, yPos) {
    // if within 5 units around the center
    var xf = this.getXform();
    var inTrigger = this.withinBounds(xf.getPosition(), xPos, yPos);
    if (inTrigger)
        this.triggeredMove();
    return inTrigger;
};

SquareArea.prototype.inScaleTrigger = function (xPos, yPos) {
    // if within 5 units around the center
    var xf = this.getXform();
    var p = [];
    p[0] = xf.getXPos() + (xf.getWidth() * 0.5);
    p[1] = xf.getYPos() + (xf.getHeight() * 0.5);
    var inTrigger = this.withinBounds(p, xPos, yPos);
    if (inTrigger)
        this.triggeredScale();
    return inTrigger;
};

SquareArea.prototype.triggeredMove = function () {
    this.mPivotPos.setColor(this.mTriggeredColor);
};

SquareArea.prototype.triggeredScale = function () {
    this.mScaleControl.setColor(this.mTriggeredColor);
};

SquareArea.prototype.resetTrigger = function () {
    this.mScaleControl.setColor(this.mScaleTriggerColor);
    this.mPivotPos.setColor(this.mMoveTriggerColor);
};


// 
SquareArea.prototype.moveArea = function (xPos, yPos) {
    // if within 5 units around the center
    var hasMoved = false;
    var xf = this.getXform();
    if (this.withinBounds(xf.getPosition(), xPos, yPos)) {
        xf.setPosition(xPos, yPos);
        hasMoved = true;
    }
    return hasMoved;
};