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
    
    this.mVertexColorShader = new ColorVertexShader(
        "src/GLSLShaders/ColorVertexVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/ColorVertexFS.glsl");    // Path to the simple FragmentShader
    
    this.mFileTextureShader = new FileTextureShader(
        "src/GLSLShaders/TextureVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/TextureFS.glsl");    // Path to the simple FragmentShader
        
    this.mManipulator = new Manipulator(this.mConstColorShader);
    this.mBody = new Spiky(this.mConstColorShader);
    this.mMask = null;
    
    // load circular mask mesh
    var maskFile = new XMLHttpRequest();
    maskFile.open('GET', '/Kaleidoscope/assets/CircularMask.obj');
    maskFile.onreadystatechange = function() {
        if (maskFile.readyState === 4 && (maskFile.status === 200 || maskFile.status === 0)) {
            this.mMask = new MeshRenderable(this.mConstColorShader, maskFile.responseText);
            this.mMask.setColor([.05, .05, .05, 1]);
            this.mMask.getXform().setSize(10.1, 10.1);
            this.mMask.getXform().setPosition(0, 0);
            
        }
    }.bind(this);
    maskFile.send(null);
    
    this.mCurrentObject = this.mBody;
}


ClassExample.prototype.draw = function (camera,reflections) {
    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();
    var cameraName = camera.getName();
    if (cameraName === "Editor" ) {
        this.mBody.draw(camera);   //Draw body in editor only
    }
    
    if (cameraName === "View") {
        var angle = 360/reflections; 
        for(var d=0;d<360;d+=angle){
            this.mBody.draw(camera,undefined,d-angle,(d/angle)%2 === 0);
        }
        
        if (this.mMask) {
            this.mMask.draw(camera);
        }
    }

};

ClassExample.prototype.getCurrentObject = function () {
    return this.mCurrentObject;
};

// *** GLOBAL funciton for bound checking ...

var kBoundTol = 0.2;
// check if (wcx, wcy) is close enough to (px, py) by kBountTol
var withInBound = function (p, wc) {
    return ( ((p[0] - kBoundTol) < wc[0]) && (wc[0] < (p[0] + kBoundTol)) &&
             ((p[1] - kBoundTol) < wc[1]) && (wc[1] < (p[1] + kBoundTol)) );
};
