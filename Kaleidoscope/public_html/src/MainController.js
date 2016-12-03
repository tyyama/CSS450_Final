/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine, $window */

var myModule = angular.module('kaleidoscope', ['XformModule', 'SliderModule', 'CSS450Timer']);

myModule.controller('MainCtrl', function($scope) {
    gEngine.Core.initializeWebGL('GLCanvas_Large');
//    gEngine.Core.initializeWebGL('GLCanvas_Small');
    
    $scope.mMyWorld = new ClassExample();
    $scope.mCanvasMouseLarge = new CanvasMouseSupport('GLCanvas_Large');
    $scope.mCanvasMouseSmall = new CanvasMouseSupport('GLCanvas_Small');
    
    $scope.mCanvasLarge = document.getElementById('GLCanvas_Large');
    $scope.mCanvasSmall = document.getElementById('GLCanvas_Small');
    
    $scope.mSelectedXform = new PivotedTransform();
    $scope.mSelectedXform.setSize(4, 2);
    
    $scope.mView = new Camera(
            [0, 1.5],
            8,
            [0, 0, 250, 250]);
    
    $scope.mainTimerHandler = function() {
        gEngine.Core.clearCanvas([.9, .9, .9, 1]);
        
        $scope.mMyWorld.draw($scope.mView);
    };
    
    window.onload = function() {
        $scope.handleResize();
    };
    
    window.onresize = function() {
        $scope.handleResize();
    };
    
    $scope.mLargeCanvasContainer = document.getElementById('GLCanvas_Large_Container');
    $scope.mSidebar = document.getElementById('sidebar');
    
    $scope.handleResize = function() {
        var width = window.innerWidth - $scope.mSidebar.clientWidth;
        var height = $scope.mLargeCanvasContainer.clientHeight;
        var size = Math.min(width, height);

        if ($scope.mCanvasLarge.width !== size || $scope.mCanvasLarge.height !== size) {
            $scope.mCanvasLarge.width = size;
            $scope.mCanvasLarge.height = size;
            $scope.mView.setViewport([0, 0, size, size]);
        }

        var size = $scope.mSidebar.clientWidth;

        if ($scope.mCanvasSmall.width !== size || $scope.mCanvasSmall.height !== size) {
            $scope.mCanvasSmall.width = size;
            $scope.mCanvasSmall.height = size;
        }
    };
});