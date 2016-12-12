/* 
 * File: MainController.js
 * Container controller for the entire world
 */

/*jslint node: true, vars: true, bitwise: true */
/*global angular, document, ClassExample, Camera, CanvasMouseSupport */
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
    
    $scope.mMyWorld = new ClassExample();
    $scope.mView = new Camera(
         [40, 30],
         80,
         [0, 0, 800, 600]);
    
    $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
    
    $scope.mUseShader = [
        {label: "Constant Color", value: "Constant"},
        {label: "Per Vertex Color", value:"PerVertex"}
    ];
    $scope.mSelectedShader = $scope.mUseShader[1].value;
    $scope.selectShader = function() {
        switch ($scope.mSelectedShader) {
            case $scope.mUseShader[0].value:
                 $scope.mMyWorld.setConstShader();
                break;
            case $scope.mUseShader[1].value:
                $scope.mMyWorld.setVertexColorShader();
                break;
        }
    };

    $scope.mainTimerHandler = function () {
        // $scope.mMyWorld.update();
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);        // Clear the canvas
        $scope.mMyWorld.draw($scope.mView);
    };

    $scope.defineSquare = function (event) {
        $scope.mMyWorld.defineCenter(
            $scope.mView.mouseWCX($scope.mCanvasMouse.getPixelXPos(event)),
            $scope.mView.mouseWCY($scope.mCanvasMouse.getPixelYPos(event)));
        $scope.mSelectedXform = $scope.mMyWorld.currentObject().getXform();
        $scope.mForceRedraw = true;
    };

    $scope.dragSquare = function (event) {
        // console.log("dragging");
        switch (event.which) {
        case 1: // left
            $scope.mMyWorld.defineWidth(
                $scope.mView.mouseWCX($scope.mCanvasMouse.getPixelXPos(event)),
                $scope.mView.mouseWCX($scope.mCanvasMouse.getPixelYPos(event)));
            $scope.mForceRedraw = true;
            break;
        }
    };

});