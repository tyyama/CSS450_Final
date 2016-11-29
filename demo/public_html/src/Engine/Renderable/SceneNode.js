/* File: SceneNode.js 
 *
 * Support for grouping of Renderables with custom pivot ability
 */

/*jslint node: true, vars: true */
/*global PivotedTransform, SquareRenderable  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function SceneNode(shader, drawPivot) {
    this.mElements = [];
    this.mXform = new PivotedTransform();

    // this is for debugging only: for drawing the pivot position
    this.mPivotPos = null;
    if ((drawPivot !== undefined) && (drawPivot === true)) {
        this.mPivotPos = new SquareRenderable(shader);
        this.mPivotPos.setColor([1, 0, 0, 1]); // default color
        var xf = this.mPivotPos.getXform();
        xf.setSize(2, 2); // always this size
    }
}


SceneNode.prototype.getXform = function () { return this.mXform; };

SceneNode.prototype.size = function () { return this.mElements.length; };

SceneNode.prototype.getRenderableAt = function (index) {
    return this.mElements[index];
};

SceneNode.prototype.addToSet = function (obj) {
    this.mElements.push(obj);
};

SceneNode.prototype.removeFromSet = function (obj) {
    var index = this.mElements.indexOf(obj);
    if (index > -1)
        this.mElements.splice(index, 1);
};

SceneNode.prototype.moveToLast = function (obj) {
    this.removeFromElements(obj);
    this.addToSet(obj);
};

SceneNode.prototype.draw = function (aCamera) {
    var i;
    var xfMat = this.mXform.getXform(); // gets the xform matrix
    for (i = 0; i < this.mElements.length; i++) {
        this.mElements[i].draw(aCamera, xfMat); // pass to each renderable
    }
    
    // for debugging, let's draw the pivot position
    if (this.mPivotPos !== null) {
        var pxf = this.getXform();
        var t = pxf.getPosition();
        var p = pxf.getPivot();
        var xf = this.mPivotPos.getXform();
        xf.setPosition(p[0] + t[0], p[1] + t[1]);
        this.mPivotPos.draw(aCamera);
    }
};