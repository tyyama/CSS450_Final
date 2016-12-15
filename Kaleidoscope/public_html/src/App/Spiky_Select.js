/*
 * File: Spiky_Select.js
 *    Supports selection of one of the body parts
 */
/*jslint node: true, vars: true */
/*global ClassExample, matrix  */
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
Spiky.prototype.selectLeftArm = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    return this.mLeftChild.selected(wcPos, baseMat, manipulator);
};

Spiky.prototype.selectTopArm = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    var leftArmMat = this.mLeftChild.getXform().getXform(); // a matrix
    var m = mat4.create();
    mat4.multiply(m, baseMat, leftArmMat);
    return this.mTopChild.selected(wcPos, m, manipulator);
};

Spiky.prototype.selectRightArm = function (wcPos, manipulator) {
    var baseMat = this.getXform().getXform();
    return this.mRightChild.selected(wcPos, baseMat, manipulator);
};