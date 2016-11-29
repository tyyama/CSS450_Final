/* 
 * File: ViewManipulator.js
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, CanvasMouseSupport, SimpleShader, SquareArea */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

function ViewManipulator(targetCamera, parentCamera) {
    this.eManipMode = {
        eMoveWCWindow: 0,
        eScaleWCWindow: 1,
        eMoveViewport: 2,
        eScaleViewport: 3,
        eNotInManipMode : 4
    };
    this.mManipMode = this.eManipMode.eNotInManipMode;
    
    this.kViewportSelectTol = 10; // 10x10 pixels

    this.mTargetCamera = targetCamera;
    this.mParentCamera = parentCamera;
    this.mShader =  new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
    this.mViewportBound = new SquareArea(this.mShader, [0, 0, 1, 1]);
    this.mWCBound = new SquareArea(this.mShader, [1, 1, 1, 1]);
}

// the following set functions are called from GUI
ViewManipulator.prototype.setWCWidth = function (width) {
    this.mTargetCamera.setWCWidth(width);
    var xf = this.mWCBound.getXform();
    xf.setSize(width, this.mTargetCamera.getWCHeight());
};

ViewManipulator.prototype.setWCCenter = function (x, y) {
    this.mTargetCamera.setWCCenter(x, y);
    var xf = this.mWCBound.getXform();
    xf.setPosition(x, y);
};

ViewManipulator.prototype.setViewport = function (vp) {
    var v = this.mTargetCamera.getViewport();
    var i;
    var ow = v[2];
    for (i = 0; i < 4; i++)
        v[i] = parseInt(vp[i]);
    var left = this.mParentCamera.mouseWCX(v[0]);
    var bottom = this.mParentCamera.mouseWCY(v[1]);
    var right = this.mParentCamera.mouseWCX(v[0]+v[2]);
    var top = this.mParentCamera.mouseWCY(v[1]+v[3]);
    
    var xf = this.mViewportBound.getXform();
    xf.setSize(right-left, top-bottom);
    xf.setPosition(0.5*(left + right), 0.5*(top + bottom));
    
    // now let's adjust the WC width ...
    var dw = (v[2] - ow)/ow;
    this.setWCWidth((1+dw) * this.mTargetCamera.getWCWidth());
};

ViewManipulator.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    var v = this.mParentCamera.getViewport();
    gl.viewport(v[0], v[1], v[2], v[3]);
    
    this.mWCBound.draw(aCamera);
    this.mViewportBound.draw(aCamera);
}