/*
 * File: BodyWithArms.js 
  */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment, Manipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BodyWithArms(shader) {
    SceneNode.call(this, shader, "Base", true);
    
    this.mLeftChild = new ArmSegment(shader, "LeftGen 1", -2, 0);
    this.addAsChild(this.mLeftChild);
    this.mTopChild = new ArmSegment(shader, "LeftGen 2", -2, 2);
    this.mLeftChild.addAsChild(this.mTopChild);
    
    this.mRightChild = new ArmSegment(shader, "RightGen 1", 2, 0);
    this.addAsChild(this.mRightChild);  


    // shapes in the base
    var obj = new SquareRenderable(shader);  // the base
    this.addToSet(obj);
    obj.setColor([0.3, 0.3, 0.9, 1]);
    var xf = obj.getXform();
    xf.setSize(4, 1.5);
    
    obj = new SquareRenderable(shader); // The head
    this.addToSet(obj);
    obj.setColor([0.9, 0.8, 0.8, 1]);
    xf = obj.getXform();
    xf.setSize(1.3, 1.3);
}
gEngine.Core.inheritPrototype(BodyWithArms, SceneNode);

BodyWithArms.prototype.leftChildXform = function () {
    return this.mLeftChild.getXform();
};

BodyWithArms.prototype.rightChildXform = function () {
    return this.mRightChild.getXform();
};


BodyWithArms.prototype.topChildXform = function () {
    return this.mTopChild.getXform();
};


BodyWithArms.prototype.parentXform = function () {
    return this.getXform();
};