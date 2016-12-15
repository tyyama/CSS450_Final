/*
 * File: EngineCore_VertexBuffer.js
 *  
 * defines the object that supports the loading and using of the buffer that 
 * contains vertex positions of a square onto the gGL context
 * 
 * Notice, this is a singleton object.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

// The VertexBuffer object
gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;
    var mSquareTextureCoordBuffer = null;
    
    var mTriangleVertexBuffer = null;
    var mTriangleTextureCoordBuffer = null;

    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    
    // Second: define the corresponding texture coordinates
    var squareTextureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];
    
    var verticesOfTriangle = [
        0.414214, 0.5, 0.0,
        0.0, 0.0, 0.0,
        -0.414214, 0.5, 0.0
    ];
    
    var triangleTextureCoordinates = [
        0.914214, 1.0,
        0.5, 0.0,
        0.085786, 1.0
    ];
    
    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // First: Square Vertex
        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        
        // Second: texture coordinate buffer
        mSquareTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareTextureCoordinates), gl.STATIC_DRAW);
        
        mTriangleVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTriangleVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfTriangle), gl.STATIC_DRAW);
        
        mTriangleTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTriangleTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleTextureCoordinates), gl.STATIC_DRAW);
    };

    var getSquareVertexRef = function () { return mSquareVertexBuffer; };
    var getSquareTexCoordRef = function () { return mSquareTextureCoordBuffer; };
    var getTriangleVertexRef = function () { return mTriangleVertexBuffer; };
    var getTriangleTexCoordRef = function () { return mTriangleTextureCoordBuffer; };

    var mPublic = {
        initialize: initialize,
        getSquareVertexRef: getSquareVertexRef,
        getSquareTexCoordRef: getSquareTexCoordRef,
        getTriangleVertexRef: getTriangleVertexRef,
        getTriangleTexCoordRef: getTriangleTexCoordRef
    };

    return mPublic;
}());