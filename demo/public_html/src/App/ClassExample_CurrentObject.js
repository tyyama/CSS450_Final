/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global ClassExample, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


ClassExample.prototype.update = function () {
};

ClassExample.prototype.currentObject = function () {
    return this.mCurrentObject;
};

ClassExample.prototype.defineCenter = function (pos) {
    this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
    this.mCurrentObject.setColor([
        Math.random(), Math.random(), Math.random(), 1]);
    this.mAllObjects.push(this.mCurrentObject);
    var xf = this.mCurrentObject.getXform();
    xf.setXPos(pos[0]);
    xf.setYPos(pos[1]);
    xf.setSize(2, 2);
};

// from center to current position is 1/2 of width
ClassExample.prototype.defineWidth = function (pos) {
    var xf = this.mCurrentObject.getXform();
    var dx = Math.abs(pos[0] - xf.getXPos());
    var dy = Math.abs(pos[1] - xf.getYPos());
    xf.setSize(dx * 2, dy * 2);
};
