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
    
    
    $scope.reflect = [
      {num: '4'},
      {num: '6'},
      {num: '8'},
      {num: '12'},
      {num: '18'},
      {num: '24'}
    ];
    
    $scope.reflections = $scope.reflect[3];
    
    $scope.mSelectedObject = $scope.mMyWorld.getCurrentObject();//new PivotedTransform();
    console.log($scope.mSelectedObject);
    $scope.mSelectedXform = $scope.mSelectedObject.getXform();
    $scope.mSelectedRotSpeed = $scope.mSelectedObject.getRotSpeed();
    $scope.mShouldUpdate = false;
//    $scope.mSelectedXform.setSize(4, 2);
    
    $scope.mLargeView = new Camera(
            [0, 0],
            10,
            [0, 0, 0, 0],
            "View");
            
    $scope.mSmallView = new Camera(
            [0, 0],
            15,
            [0, 0, 0, 0],
            "Editor");
            
    $scope.mViewsSwapped = false;
    
    $scope.mLastWCPosX = 0;
    $scope.mLastWCPosY = 0;
    
    $scope.mainTimerHandler = function() {
        gEngine.Core.clearCanvas([.05, .05, .05, 1]);
        
        $scope.mMyWorld.draw($scope.mLargeView,parseInt($scope.reflections.num));
        $scope.mMyWorld.draw($scope.mSmallView);
        
        //$scope.mShouldUpdate = true;
    };
    
    $scope.handleMove = function(event) {
        var x = $scope.mCanvasMouse.getPixelXPos(event);
        var y = $scope.mCanvasMouse.getPixelYPos(event);
        
        if ($scope.mSmallView.isMouseInViewport(x, y)) {
            $scope.mLastWCPosX = $scope.mSmallView.mouseWCX(x);
            $scope.mLastWCPosY = $scope.mSmallView.mouseWCY(y);
            
            if (event.which === 1) {
                $scope.mMyWorld.detectMouseOver($scope.mLastWCPosX,
                                                $scope.mLastWCPosY);
//                console.log($scope.mMyWorld.getCurrentXform());
                $scope.mSelectedObject = $scope.mMyWorld.getCurrentObject();//new PivotedTransform();
                $scope.mSelectedXform = $scope.mSelectedObject.getXform();
                $scope.mSelectedRotSpeed = $scope.mSelectedObject.getRotSpeed();
                
                $scope.mShouldUpdate = true;
            }
        }
        
    };
    
    $scope.handleRelease = function(event) {
        $scope.mMyWorld.resetSelection();
    };
    
    window.onload = function() {
        $scope.handleResize();
    };
    
    window.onresize = function() {
        if ($scope.mViewsSwapped) {
            $scope.handleResize($scope.mSmallView, $scope.mLargeView);
        } else {
            $scope.handleResize($scope.mLargeView, $scope.mSmallView);
        }
    };
    
    $scope.mLargeCanvasContainer = document.getElementById('GLCanvas_Container');
    $scope.mHeader = document.getElementById('header');
    $scope.mSidebar = document.getElementById('sidebar');
    
    $scope.handleResize = function(largeView, smallView) {
        if (!largeView || !smallView) return;
        
        var width = window.innerWidth;
        var height = window.innerHeight -  2 * $scope.mHeader.clientHeight;

        $scope.mCanvas.width = width;
        $scope.mCanvas.height = height;

        var largeViewWidth = width - $scope.mSidebar.clientWidth;
        var largeViewHeight = height;
        var largeViewSize = Math.min(largeViewWidth, largeViewHeight);
        var largeViewX = largeViewWidth / 2 - largeViewSize / 2;
        var largeViewY = largeViewHeight / 2 - largeViewSize / 2;
        largeView.setViewport([largeViewX, largeViewY, largeViewSize, largeViewSize]);

        var smallViewWidth = $scope.mSidebar.clientWidth;
        var smallViewHeight = $scope.mSidebar.clientWidth;
        var smallViewX = width - $scope.mSidebar.clientWidth;
        smallView.setViewport([smallViewX, 0, smallViewWidth, smallViewHeight]);

        $scope.mCanvasMouse = new CanvasMouseSupport("GLCanvas");
    };
    
    $scope.swapViews = function() {
        $scope.mViewsSwapped = !$scope.mViewsSwapped;
        
        if ($scope.mViewsSwapped) {
            $scope.handleResize($scope.mSmallView, $scope.mLargeView);
        } else {
            $scope.handleResize($scope.mLargeView, $scope.mSmallView);
        }
    };
    
    $scope.saveCanvasAsImage = function(){
        var canvas = document.getElementById("GLCanvas");
        var img = new Image();
        img.src = cropDataURL(canvas.toDataURL(),0,0,window.innerWidth - $scope.mSidebar.clientWidth,window.innerHeight -  2 * $scope.mHeader.clientHeight);
        
        document.getElementById('hiddenDiv').innerHTML = '<a id="canvasDownload" href="' + img.src + '" download = "Kaleidoscope">Save</a>';
        document.getElementById("canvasDownload").click();
    };
    
    $scope.$watch('mSelectedRotSpeed', function (newValue, oldValue) {
        $scope.mSelectedObject.setRotSpeed(newValue);
    });
    
    $scope.pauseRotation = function() {
        $scope.mSelectedObject.shouldRotate(false);
        $scope.mShouldUpdate = true;
    };
    
    $scope.playRotation = function() {
        $scope.mSelectedObject.shouldRotate(true);
        $scope.mShouldUpdate = true;
    };
    
    $scope.clearRotation = function() {
        console.log("RAN");
        $scope.mSelectedObject.clearRotSpeed();
        $scope.mSelectedRotSpeed = $scope.mSelectedObject.getRotSpeed();
        $scope.mShouldUpdate = true;
    };
    
    $scope.handleResize($scope.mLargeView, $scope.mSmallView);
});