/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, 
 * ViewManipulator, CanvasMouseSupport, SimpleShader, SquareArea */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";

// Creates the "backend" logical support for appMyExample
var myModule = angular.module("appMyExample", ["CSS450Timer", "CSS450Slider", "CSS450Xform"]);

// registers the constructor for the controller
// NOTE: the constructor is only called _AFTER_ the </body> tag is encountered
//       this code does NOT run until the end of loading the HTML page
myModule.controller("MainCtrl", function ($scope) {
    // Initialize the graphics system
    gEngine.Core.initializeWebGL('GLCanvas');
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');
    
     // All the mouse coordinate points
    $scope.mClientX = 0;
    $scope.mClientY = 0;
    $scope.mCanvasX = 0;
    $scope.mCanvasY = 0;
    $scope.mViewportX = 0;
    $scope.mViewportY = 0;
    $scope.mCameraX = 0;
    $scope.mCameraY = 0;
    $scope.mWhichCamera = "";

        
    // this is the model
    $scope.mMyWorld = new ClassExample();

    $scope.mViewWCWidth = 100;
    $scope.mViewWCCenter = [0, 0];
    $scope.mTopLeftView = new Camera(
                $scope.mViewWCCenter,         // wc Center
                $scope.mViewWCWidth,                // wc Width
                [0, 300, 300, 300], // viewport: left, bottom, width, height
                0); 
                
    $scope.mTopRightView = new Camera(
                $scope.mViewWCCenter,         // wc Center
                $scope.mViewWCWidth,                // wc Width
                [300, 300, 300, 300], // viewport: left, bottom, width, height
                2);
                
    $scope.mBottomLeftView = new Camera(
                $scope.mViewWCCenter,         // wc Center
                $scope.mViewWCWidth,                // wc Width
                [0, 0, 300, 300], // viewport: left, bottom, width, height
                1);  
                
    $scope.mBottomRightView = new Camera(
                $scope.mViewWCCenter,         // wc Center
                $scope.mViewWCWidth,                // wc Width
                [300, 0, 300, 300], // viewport: left, bottom, width, height
                3);
            
    // small view support
    $scope.setSmallViewWC = function () {
        $scope.mSmallViewControl.setWCWidth(parseInt($scope.mSmallViewWCWidth));
    };
    $scope.setSmallViewWCCenter = function () {
        $scope.mSmallViewControl.setWCCenter(
            parseInt($scope.mSmallViewWCCenter[0]),
            parseInt($scope.mSmallViewWCCenter[1])
        );
    };
    $scope.setSmallViewport = function () {
        $scope.mSmallViewControl.setViewport($scope.mSmallViewport);
        $scope.mSmallViewWCWidth = $scope.mSmallView.getWCWidth();
    };
    $scope.mSmallViewWCWidth = 30;
    $scope.mSmallViewport = [50, 50, 100, 100];
    $scope.mSmallViewWCCenter = [-5, -10];
    $scope.mSmallView = new Camera(
                [0, 0],// wc Center
                10, // wc width
                [0, 0, 100, 100], // viewport: left, bottom, width, height
                1);    
    $scope.mSmallView.setBackgroundColor([0.9, 0.7, 0.7, 1]);
    $scope.mSmallViewControl = new ViewManipulator($scope.mSmallView, $scope.mTopLeftView);
    $scope.setSmallViewWC();
    $scope.setSmallViewWCCenter();
    $scope.setSmallViewport();

    $scope.mainTimerHandler = function () {
        // Step E: Clear the canvas
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas
        //
        // $scope.mMyWorld.update();
        $scope.mMyWorld.draw($scope.mTopLeftView);
        $scope.mMyWorld.draw($scope.mTopRightView);
        $scope.mMyWorld.draw($scope.mBottomLeftView);
        $scope.mMyWorld.draw($scope.mBottomRightView);
//        $scope.mMyWorld.draw($scope.mSmallView);
//        
//        $scope.mSmallViewControl.draw($scope.mTopLeftView);
    };

    $scope.computeWCPos = function (event) {
        var wcPos = [0, 0];
        $scope.mClientX = event.clientX;
        $scope.mClientY = event.clientY;
        
        $scope.mCanvasX = $scope.mCanvasMouse.getPixelXPos(event);
        $scope.mCanvasY = $scope.mCanvasMouse.getPixelYPos(event);
        var useCam = $scope.mTopLeftView; // assume using this camera
        $scope.mWhichCamera = "Top Left";
        
        if ($scope.mTopLeftView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mTopLeftView;
            $scope.mWhichCamera = "Top Left";
        } else if ($scope.mTopRightView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mTopRightView;
            $scope.mWhichCamera = "Top Right";
        } else if ($scope.mBottomLeftView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mBottomLeftView;
            $scope.mWhichCamera = "Bottom Left";
        } else if ($scope.mBottomRightView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
            useCam = $scope.mBottomRightView;
            $scope.mWhichCamera = "Bottom Right";
        }
        
//        if ($scope.mSmallView.isMouseInViewport($scope.mCanvasX, $scope.mCanvasY)) {
//            useCam = $scope.mSmallView;
//            $scope.mWhichCamera = "Small";
//        }
        
        // these are "private functions" on the camera, 
        // for the purpose of clear illustration, we will call them
        $scope.mViewportX = useCam._viewportX($scope.mCanvasX);
        $scope.mViewportY = useCam._viewportY($scope.mCanvasY);
        
        wcPos[0] = useCam.mouseWCX($scope.mCanvasX);
        wcPos[1] = useCam.mouseWCY($scope.mCanvasY);
        $scope.mCameraX = wcPos[0];
        $scope.mCameraY = wcPos[1];
        return wcPos;
    };

    // Mouse support for creation of objects
    $scope.serviceClick = function (event) {
        var wcPos = $scope.computeWCPos(event);
        if (!$scope.mSmallViewControl.triggerManipulation($scope.mCanvasX, $scope.mCanvasY, wcPos)) {
            $scope.mMyWorld.defineCenter(wcPos);
        }
    };
    
    $scope.serviceMove = function (event) {
        // console.log("dragging");
        if (event.which === 1) {
            var wcPos;
            var wcPos = $scope.computeWCPos(event);
//            if (this.mSmallViewControl.isInManipMode()) {
//                this.mSmallViewControl.updateManipulation($scope, wcPos);
//            } else {
                $scope.mMyWorld.defineWidth(wcPos);
//            }
    
        }
    };
    
    $scope.serviceRelease = function(event) {
        if (event.which === 1) {
            var wcPos;
            var wcPos = $scope.computeWCPos(event);
//            if (this.mSmallViewControl.isInManipMode()) {
//                this.mSmallViewControl.updateManipulation($scope, wcPos);
//                this.mSmallViewControl.exitManipMode();
//            }
        }
    };

});