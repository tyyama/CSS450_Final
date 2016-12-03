/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment, Manipulator */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample() {    
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
        
    this.mManipulator = new Manipulator(this.mConstColorShader);
    this.mBody = new BodyWithArms(this.mConstColorShader);
    this.mTest = new SquareRenderable(this.mConstColorShader);
    this.mTest.setColor([0, 1, 1, 1]);
    this.mTest.getXform().setPosition(2, 3);
}


ClassExample.prototype.draw = function (camera) {
    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();
    var cameraName = camera.getName();
    if (cameraName === "Editor") {
        this.mBody.draw(camera);
    } else if (cameraName === "View") {
        this.mTest.draw(camera);
    }
};

ClassExample.prototype.leftChildXform = function () {
    return this.mBody.leftChildXform();
};

ClassExample.prototype.rightChildXform = function () {
    return this.mBody.rightChildXform();
};


ClassExample.prototype.topChildXform = function () {
    return this.mBody.topChildXform();
};


ClassExample.prototype.parentXform = function () {
    return this.mBody.parentXform();
};

// *** GLOBAL funciton for bound checking ...

var kBoundTol = 0.2;
// check if (wcx, wcy) is close enough to (px, py) by kBountTol
var withInBound = function (p, wc) {
    return ( ((p[0] - kBoundTol) < wc[0]) && (wc[0] < (p[0] + kBoundTol)) &&
             ((p[1] - kBoundTol) < wc[1]) && (wc[1] < (p[1] + kBoundTol)) );
};
