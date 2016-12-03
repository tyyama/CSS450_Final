/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var largeCanvasContainer = null;
var largeCanvas = null;
var smallCanvas = null;
var sidebar = null;

function handleResize() {
    if (!largeCanvasContainer || !largeCanvas || !smallCanvas || !sidebar) {
        largeCanvasContainer = document.getElementById('GLCanvas_Large_Container');
        largeCanvas = document.getElementById('GLCanvas_Large');
        smallCanvas = document.getElementById('GLCanvas_Small');
        sidebar = document.getElementById('sidebar');
    }
    
    
    var width = window.innerWidth - sidebar.clientWidth;
    var height = largeCanvasContainer.clientHeight;
    var size = Math.min(width, height);
    
    if (largeCanvas.width !== size || largeCanvas.height !== size) {
        largeCanvas.width = size;
        largeCanvas.height = size;
    }
    
    var size = sidebar.clientWidth;
    
    if (smallCanvas.width !== size || smallCanvas.height !== size) {
        smallCanvas.width = size;
        smallCanvas.height = size;
    }
}

window.onload = function() {
    handleResize();
};

window.onresize = function() {
    handleResize();
};