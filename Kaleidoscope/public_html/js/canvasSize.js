/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var largeCanvasContainer = null;
var largeCanvas = null;
var sidebar = null;

function handleResize() {
    if (!largeCanvasContainer || !largeCanvas || !sidebar) {
        largeCanvasContainer = document.getElementById('GLCanvas_Large_Container');
        largeCanvas = document.getElementById('GLCanvas_Large');
        sidebar = document.getElementById('sidebar');
    }
    
    var height = largeCanvasContainer.clientHeight;
    var width = window.innerWidth - sidebar.clientWidth;
    var size = Math.min(width, height);
    
    largeCanvas.style.width = size + 'px';
    largeCanvas.style.height = size + 'px';
}

window.onload = function() {
    handleResize();
};

window.onresize = function() {
    handleResize();
};