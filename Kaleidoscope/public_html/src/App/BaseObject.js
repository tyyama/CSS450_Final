/*
 * File: Spiky.js 
  */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment, Manipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Spiky(shader) {
    SceneNode.call(this, shader, "Base", false);
    
    this.mArmBase = new ArmSegment(shader, "ArmBase", 0, 1.4);
    this.addAsChild(this.mArmBase);
    
    this.mArmTipLeft = new ArmSegment(shader, "ArmTip_Left", 0, 3.4);
    this.mArmTipLeft.getXform().setRotationInDegree(45);
    this.mArmBase.addAsChild(this.mArmTipLeft);
    
    this.mArmTipRight = new ArmSegment(shader, "ArmTip_Right", 0, 3.4);
    this.mArmTipRight.getXform().setRotationInDegree(-45);
    this.mArmBase.addAsChild(this.mArmTipRight);
    
//    this.mRightChild = new ArmSegment(shader, "RightGen 1", 2, 0);
//    this.addAsChild(this.mRightChild);  


    // shapes in the base
    var obj = new CircleRenderable(shader);  // the base
    this.addToSet(obj);
    obj.setColor([0.224, 0.286, 0.671, 1]);
    var xf = obj.getXform();
    xf.setSize(3, 3);
    
    // shapes in the base
    obj = new CircleRenderable(shader);  // the base
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    var xf = obj.getXform();
    xf.setSize(2.5, 2.5);
    
    // shapes in the base
    obj = new CircleRenderable(shader);  // the base
    this.addToSet(obj);
    obj.setColor([1, .992, .906, 1]);
    var xf = obj.getXform();
    xf.setSize(2, 2);
    
    obj = new CircleRenderable(shader); // The middle dot (for manipulator)
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.25);
    xf.setPosition(0, 0);
}
gEngine.Core.inheritPrototype(Spiky, SceneNode);

Spiky.prototype.mArmBase = function () {
    return this.mArmBase.getXform();
};

Spiky.prototype.mArmTipLeft = function () {
    return this.mArmTipLeft.getXform();
};


Spiky.prototype.mArmTipRight = function () {
    return this.mArmTipRight.getXform();
};


Spiky.prototype.parentXform = function () {
    return this.getXform();
};