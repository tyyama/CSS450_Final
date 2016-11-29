/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample() {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mCurrentObject = null;        // these are the Renderable objects

    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    this.mCurrentObject = new SquareRenderable(this.mConstColorShader);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    this.mCurrentObject.getXform().setPosition(0, 0);
    this.mCurrentObject.getXform().setSize(10, 10);
    
    this.mAllObjects = [];
    this.mAllObjects.push(this.mCurrentObject);
}

ClassExample.prototype.draw = function (camera) {

    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();

    // centre red square
    var i;
    for (i=0; i<this.mAllObjects.length; i++)
        this.mAllObjects[i].draw(camera);
};