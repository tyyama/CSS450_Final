/*
 * File: SquareRenderable.js
 *  
 * draws from the square vertex buffer
 */
/*jslint node: true, vars: true */
/*global gEngine, Renderable */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TriangleRenderable(shader) {
    Renderable.call(this, shader);
        // Notice how to call the super class constructor!
        // The constructor takes on paramter, but we are calling it with two arguments!
        // First argument says, "this" is the caller of the constructor
}
gEngine.Core.inheritPrototype(TriangleRenderable, Renderable);
// This line MUST be defined right after the constructor
// To get all the methods defined in the super-class.prototype


// Ovreride the super-class "draw()" method!
TriangleRenderable.prototype.draw = function (camera, parentMat) {
    Renderable.prototype.draw.call(this, camera, parentMat);

    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(
        gEngine.VertexBuffer.getTriangleVertexRef(),
        this.mColor,            // this is defined in the super class!
        camera.getVPMatrix(),
        gEngine.VertexBuffer.getTriangleTexCoordRef());  // always activate the shader first!
    this.computeAndLoadModelXform(parentMat);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    
    // should really have a shader-deActivateShader ...
    gl.activeTexture(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
};

// The get/set color, and getXform funcitons are inherited