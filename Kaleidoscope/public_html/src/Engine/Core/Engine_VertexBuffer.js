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
    var mTriangleVertexBuffer = null;
    var mCircleVertexBuffer = null;
    
    var mCircleVertexCount = 30;

    // First: define the vertices for a square
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    
    var verticesOfTriangle = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.0, -0.5, 0.0
    ];
    
    var verticesOfCircle = function() {
        var verticesOfCircle = [0.0, 0.0, 0.0];
        
        var radiansPerSlice = 360 / mCircleVertexCount * Math.PI / 180;
        var currentAngle = 0;
        for (var i = 0; i <= mCircleVertexCount; i++) {
            verticesOfCircle.push(Math.cos(currentAngle) / 2);
            verticesOfCircle.push(Math.sin(currentAngle) / 2);
            verticesOfCircle.push(0.0);
            
           currentAngle += radiansPerSlice;
        }
        
        return verticesOfCircle;
    };

    var initialize = function () {
        var gl = gEngine.Core.getGL();

        // Step A: Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();

        // Step B: Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Step C: Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        
        mTriangleVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mTriangleVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfTriangle), gl.STATIC_DRAW);
        
        mCircleVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mCircleVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfCircle()), gl.STATIC_DRAW);
    };

    var getSquareVertexRef = function () { return mSquareVertexBuffer; };
    var getTriangleVertexRef = function () { return mTriangleVertexBuffer; };
    var getCircleVertexRef = function () { return mCircleVertexBuffer; };
    var getCircleVertexCount = function () { return mCircleVertexCount; };

    var mPublic = {
        initialize: initialize,
        getSquareVertexRef: getSquareVertexRef,
        getTriangleVertexRef: getTriangleVertexRef,
        getCircleVertexRef: getCircleVertexRef,
        getCircleVertexCount: getCircleVertexCount
    };

    return mPublic;
}());