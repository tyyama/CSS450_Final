/*
 * File: Spiky_Select.js
 *    Supports selection of one of the body parts
 */
/*jslint node: true, vars: true */
/*global ClassExample, matrix, Spiky  */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Spiky.prototype.selectBase = function (wcPos, manipulator) {
    var baseXf = this.getXform();
    var baseMat = baseXf.getXform();
    var basePos = vec2.fromValues(0, 0);
    var basePosWC = [];
    vec2.transformMat4(basePosWC, basePos, baseMat);
    var selected = withInBound(basePosWC, wcPos);
    if (selected) {
        manipulator.setXformMatrix(mat4.create(), this);
    }
    return selected;
};

// Re-computing the concatenation of matrices is quite expensive, can be optimized
// For this MP, for clarity, they are left as is
Spiky.prototype.selectArmBase = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    return this.mArmBase.selected(wcPos, baseMat, manipulator);
};

Spiky.prototype.selectArmTipLeft = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    return this.mArmTipLeft.selected(wcPos, baseMat, manipulator);
};

Spiky.prototype.selectArmTipRight = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    return this.mArmTipRight.selected(wcPos, baseMat, manipulator);
};