/*
 * File: MyGame.js 
 * This is the logic of our game. For now, this is very simple.
 */
/*jslint node: true, vars: true */
/*global gEngine, SimpleShader, SquareRenderable, SceneNode, ArmSegment */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ClassExample() {
    
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
    
    this.mVertexColorShader = new ColorVertexShader(
        "src/GLSLShaders/ColorVertexVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/ColorVertexFS.glsl");    // Path to the simple FragmentShader
    
    this.vmUseRandomColor = true;
    
    this.mCurrentObject = new SquareRenderable(this.mVertexColorShader);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    this.mCurrentObject.getXform().setPosition(40, 30);
    this.mCurrentObject.getXform().setSize(5, 5);
    
    this.mAllObjects = [];
    this.mAllObjects.push(this.mCurrentObject);
    
    this.setVertexColorShader();
};

ClassExample.prototype.draw = function (camera) {
    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();

    // centre red square
    var i, d;
    for (d=0; d<360; d+=45) {
        for (i=0; i<this.mAllObjects.length; i++) {
            this.mAllObjects[i].draw(camera, d);
        }
    }
        
};