/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ArmSegment(shader, name, xPivot, yPivot) {
    SceneNode.call(this, shader, name, false);   // calling super class constructor

    var xf = this.getXform();
    xf.setPivot(xPivot, yPivot);
    
    // now create the children shapes
    var obj = new SquareRenderable(shader);  // The 1x2 base
    this.addToSet(obj);
    obj.setColor([1, .439, .263, 1]);
    xf = obj.getXform();
    xf.setSize(.8, 2);
    xf.setPosition(xPivot, 1 + yPivot);
    
    obj = new SquareRenderable(shader); // The middle stripe
    this.addToSet(obj);
    obj.setColor([1, .992, .906, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 2);
    xf.setPosition(xPivot, yPivot+1);
    
    obj = new CircleRenderable(shader); // The left circle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.5, 0.5);
    xf.setPosition(xPivot - .5, yPivot + 1.5);
    
    obj = new TriangleRenderable(shader); // The top-left triangle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.45);
    xf.setRotationInDegree(235);
    xf.setPosition(xPivot - .75, yPivot + 1.7);
    
    obj = new TriangleRenderable(shader); // The bottom-left triangle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.45);
    xf.setRotationInDegree(315);
    xf.setPosition(xPivot - .75, yPivot + 1.3);
    
    obj = new CircleRenderable(shader); // The right circle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.5, 0.5);
    xf.setPosition(xPivot + .5, yPivot + 1.5);
    
    obj = new TriangleRenderable(shader); // The top-right triangle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.45);
    xf.setRotationInDegree(135);
    xf.setPosition(xPivot + .71, yPivot + 1.7);
    
    obj = new TriangleRenderable(shader); // The bottom-right triangle
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.45);
    xf.setRotationInDegree(45);
    xf.setPosition(xPivot + .71, yPivot + 1.3);
    
    obj = new CircleRenderable(shader); // The middle dot (for manipulator)
    this.addToSet(obj);
    obj.setColor([0, .722, .813, 1]);
    xf = obj.getXform();
    xf.setSize(0.25, 0.25);
    xf.setPosition(xPivot, yPivot+1);
}
gEngine.Core.inheritPrototype(ArmSegment, SceneNode);

// The 4th element is the middle blue circle, we want its posiiton
ArmSegment.prototype.getCenterPosition = function () {
    return this.getRenderableAt(8).getXform().getPosition();
};


ArmSegment.prototype.selected = function(wcPos, parentMat, manipulator) {
    var myMat = this.getXform().getXform();
    var m = mat4.create();
    mat4.multiply(m, parentMat, myMat);
    var ptWC = [];
    vec2.transformMat4(ptWC, this.getCenterPosition(), m);
    var selected = withInBound(ptWC, wcPos);
    if (selected) {
        manipulator.setXformMatrix(parentMat, this);
    }
    return selected;
};