/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, Renderable */

function CircleRenderable(shader) {
    Renderable.call(this, shader);
}

gEngine.Core.inheritPrototype(CircleRenderable, Renderable);

CircleRenderable.prototype.draw = function (camera, parentMat, deg, flip) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(
        gEngine.VertexBuffer.getCircleVertexRef(),
        this.mColor,        // this is defined in the super class!
        camera.getVPMatrix(deg,flip));  // always activate the shader first!
    this.computeAndLoadModelXform(parentMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, gEngine.VertexBuffer.getCircleVertexCount() + 2);
};

// uses formula for finding a point in an ellipse
// (x - h)^2/Rx^2 + (y-k)^2/Ry^2 <= 1
CircleRenderable.prototype.pointInObject = function(x, y) {
    var h = this.mXform.getXPos();
    var k = this.mXform.getYPos();
    var Rx = this.mXform.getSize()[0] / 2;
    var Ry = this.mXform.getSize()[1] / 2;
    var xTerm = Math.pow(x - h, 2) / Math.pow(Rx, 2);
    var yTerm = Math.pow(y - k, 2) / Math.pow(Ry, 2);
    
    return xTerm + yTerm <= 1;
};

