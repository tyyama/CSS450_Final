/* File: SceneNode.js 
 *
 * Support for grouping of Renderables with custom pivot ability
 */

/*jslint node: true, vars: true */
/*global PivotedTransform, SquareRenderable  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function SceneNode(shader, name, drawPivot) {
    this.mName = name;
    this.mSet = [];
    this.mChildren = [];
    this.mXform = new PivotedTransform();
    
    this.mManipulator = null;

    // this is for debugging only: for drawing the pivot position
    this.mPivotPos = null;
    if ((drawPivot !== undefined) && (drawPivot === true)) {
        this.mPivotPos = new SquareRenderable(shader);
        this.mPivotPos.setColor([1, 0, 0, 1]); // default color
        var xf = this.mPivotPos.getXform();
        xf.setSize(0.2, 0.2); // always this size
    }
}
SceneNode.prototype.setName = function (n) { this.mName = n; };
SceneNode.prototype.getName = function () { return this.mName; };

SceneNode.prototype.getXform = function () { return this.mXform; };

SceneNode.prototype.size = function () { return this.mSet.length; };

SceneNode.prototype.getRenderableAt = function (index) {
    return this.mSet[index];
};

SceneNode.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};
SceneNode.prototype.removeFromSet = function (obj) {
    var index = this.mSet.indexOf(obj);
    if (index > -1)
        this.mSet.splice(index, 1);
};
SceneNode.prototype.moveToLast = function (obj) {
    this.removeFromSet(obj);
    this.addToSet(obj);
};

// support children opeations
SceneNode.prototype.addAsChild = function (node) {
    this.mChildren.push(node);
};
SceneNode.prototype.removeChild= function (node) {
    var index = this.mChildren.indexOf(node);
    if (index > -1)
        this.mChildren.splice(index, 1);
};
SceneNode.prototype.getChildAt = function (index) {
    return this.mChildren[index];
};

SceneNode.prototype.setManipulator = function(mani) {
    this.mManipulator = mani;
    if (mani === null) {
         return;
     }
    if (this.mSet.length > 1) {
        var b = new Bound(this.mSet[0].getXform());
        var bb;
        var i = 0;
        for (i = 1; i<this.mSet.length; i++) {
           bb = new Bound(this.mSet[i].getXform());
           b.mergeWithBound(bb);
        }
        b.setXform(mani.getXform());
        /*
        var xf = this.getXform();
        var mxf = mani.getXform();
        mxf.incXPosBy(xf.getXPos());
        mxf.incYPosBy(xf.getYPos()); */
    } else {
        mani.getXform().initialize();
    }
};

SceneNode.prototype.draw = function (aCamera, parentMat) {
    var i;
    var xfMat = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(xfMat, parentMat, xfMat);
    
    // Draw our own!
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera, xfMat); // pass to each renderable
    }
    
    // now draw the children
    for (i = 0; i < this.mChildren.length; i++) {
        this.mChildren[i].draw(aCamera, xfMat); // pass to each renderable
    }
    
    // for debugging, let's draw the pivot position
    if (this.mPivotPos !== null) {
        var pxf = this.getXform();
        var t = pxf.getPosition();
        var p = pxf.getPivot();
        var xf = this.mPivotPos.getXform();
        xf.setPosition(p[0] + t[0], p[1] + t[1]);
        this.mPivotPos.draw(aCamera, parentMat);
    }
    
    if (this.mManipulator !== null) {
        // 1. figure out the scale of all elements
        
        this.mManipulator.draw(aCamera, xfMat);
    }
};