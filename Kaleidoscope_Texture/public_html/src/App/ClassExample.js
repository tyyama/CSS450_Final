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
    
    this.mFileTextureShader = new FileTextureShader(
        "src/GLSLShaders/TextureVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/TextureFS.glsl");    // Path to the simple FragmentShader
    
    this.mCurrentObject = new SquareRenderable(this.mFileTextureShader);
    this.mFileTexture = new FileTextureSupport("assets/test-pattern.jpg", true);
    this.mCurrentObject.setFileTexture(this.mFileTexture);
    this.mCurrentObject.setColor([1, 0.25, 0.25, 1]);

    this.mCurrentObject.getXform().setPosition(0, 0);
    this.mCurrentObject.getXform().setSize(1, 1);
    
    this.mAllObjects = [];
    this.mAllObjects.push(this.mCurrentObject);
    
    this.mTriangles = [];
    this.generateTriangles();
    
    this.vmUseRandomColor = false;
    this.setConstShader();
    
    this.mMask = null;
    var maskFile = new XMLHttpRequest();
    maskFile.open('GET', '/Kaleidoscope/assets/CircularMask.obj');
    maskFile.onreadystatechange = function() {
        if (maskFile.readyState === 4 && (maskFile.status === 200 || maskFile.status === 0)) {
            this.mMask = new MeshRenderable(this.mConstColorShader, maskFile.responseText);
            this.mMask.setColor([.05, .05, .05, 1]);
            this.mMask.getXform().setPosition(0, 0);
            this.mMask.getXform().setSize(10, 10);
        }
    }.bind(this);
    maskFile.send(null);
};

ClassExample.prototype.generateTriangles = function () {
    var size = 4;
    
    for (var i = 0; i < 8; i++) {
        var angle = i * 45 + 22.5;
        var angleRad = angle * Math.PI / 180;
        var x = Math.cos(angleRad) * size / 2 * 0;
        var y = Math.sin(angleRad) * size / 2 * 0;
        
        var triangle = new TriangleRenderable(this.mFileTextureShader);
        triangle.setFileTexture(this.mFileTexture);
        triangle.setColor([1, 0, 0, 1]);
        
        var xf = triangle.getXform();
        xf.setPosition(x, y);
        xf.setRotationInDegree(angle - 90);
        
        if (i % 2 == 0) {
            xf.setSize(size, size * 2);
        } else {
            xf.setSize(-size, size * 2);
        }
        
        this.mTriangles[i] = triangle;
    }
};

ClassExample.prototype.draw = function (camera) {
    // Step F: Starts the drawing by activating the camera
    camera.setupViewProjection();

    // centre red square
    if (camera.getName() === "Editor") {
        var i;
        for (i=0; i<this.mAllObjects.length; i++)
            this.mAllObjects[i].draw(camera);
    } else if (camera.getName() === "View") {
        for (i = 0; i < this.mTriangles.length; i++) {
            this.mTriangles[i].draw(camera);
        }
        
        if (this.mMask)
            this.mMask.draw(camera);
    }
};

ClassExample.prototype.parentXform = function () {
    return this.mCurrentObject.getXform();
};