/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine, Transform, mat4, matrix */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Renderable(shader) {
    this.mShader = shader;         // the shader for shading this object
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
    
    this.mVertexColors = [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 1, 1
    ];
    
    this.mFileTexture = null;
    this.mTextureTransform = new PivotedTransform();
    this.mBlendColor = false;
   
}

Renderable.prototype.setVertexColor = function (i, color) {
    var offset = i * 4;
    var count = 0;
    for (count = 0; count < 4; count++) {
        this.mVertexColors[offset+count] = color[count];
    }
};

Renderable.prototype.setFileTexture = function (f) {
    this.mFileTexture = f;
};

Renderable.prototype.getFileTexture = function() {
    return this.mFileTexture;
};


Renderable.prototype.update = function () {};

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------
Renderable.prototype.draw = function (camera, parentMat) {
    if (this.mShader.setVertexColor) 
        this.mShader.setVertexColor(this.mVertexColors);
    
    if (this.mFileTexture !== null)
        this.mFileTexture.activateFileTexture();
    
    if (this.mShader.setTextureTransform) {
        this.mShader.setTextureTransform(this.mTextureTransform.getXform2d());
        this.mShader.setBlendColor(this.mBlendColor);
    }
};
Renderable.prototype.computeAndLoadModelXform = function (parentMat) {
    var m = this.mXform.getXform();
    if (parentMat !== undefined)
        mat4.multiply(m, parentMat, m);
    this.mShader.loadObjectTransform(m);
};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.getTextureXform = function () { return this.mTextureTransform; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype.setBlendColor = function (b) { this.mBlendColor = b; };
Renderable.prototype.getBlendColor = function () { return this.mBlendColor; };


//--- end of Public Methods
//</editor-fold>