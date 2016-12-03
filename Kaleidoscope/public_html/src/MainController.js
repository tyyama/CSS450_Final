/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, $window */

var myModule = angular.module('kaleidoscope', ['XformModule', 'SliderModule', 'CSS450Timer']);

myModule.controller('MainCtrl', function($scope) {
    gEngine.Core.initializeWebGL('GLCanvas');
    
    $scope.mMyWorld = new ClassExample();
    $scope.mCanvasMouse = new CanvasMouseSupport('GLCanvas');
    $scope.mCanvas = document.getElementById('GLCanvas');
    
    $scope.mSelectedXform = $scope.mMyWorld.parentXform();//new PivotedTransform();
//    $scope.mSelectedXform.setSize(4, 2);
    
    $scope.mLargeView = new Camera(
            [0, 1.5],
            8,
            [0, 0, 0, 0],
            "View");
            
    $scope.mSmallView = new Camera(
            [0, 1.5],
            8,
            [0, 0, 0, 0],
            "Editor");
    
    $scope.mainTimerHandler = function() {
        gEngine.Core.clearCanvas([.9, .9, .9, 1]);
        
        $scope.mMyWorld.draw($scope.mLargeView);
        $scope.mMyWorld.draw($scope.mSmallView);
    };
    
    window.onload = function() {
        $scope.handleResize();
    };
    
    window.onresize = function() {
        $scope.handleResize();
    };
    
    $scope.mLargeCanvasContainer = document.getElementById('GLCanvas_Container');
    $scope.mHeader = document.getElementById('header');
    $scope.mSidebar = document.getElementById('sidebar');
    
    $scope.handleResize = function() {
        var width = window.innerWidth;
        var height = window.innerHeight -  2 * $scope.mHeader.clientHeight;

        if ($scope.mCanvas.width !== width || $scope.mCanvas.height !== height) {
            $scope.mCanvas.width = width;
            $scope.mCanvas.height = height;
            
            console.log(width, height);
            var largeViewWidth = width - $scope.mSidebar.clientWidth;
            var largeViewHeight = height;
            $scope.mLargeView.setViewport([0, 0, largeViewWidth, largeViewHeight]);
            
            var smallViewWidth = $scope.mSidebar.clientWidth;
            var smallViewHeight = $scope.mSidebar.clientWidth;
            var smallViewX = width - $scope.mSidebar.clientWidth;
            $scope.mSmallView.setViewport([smallViewX, 0, smallViewWidth, smallViewHeight]);
        }
    };
});