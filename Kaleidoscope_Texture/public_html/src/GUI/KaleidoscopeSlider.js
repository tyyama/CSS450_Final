/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('SliderModule', [])
        .directive('slider', function() {
            return {
                template: `
                    <p>{{mLabel}}:</p> 
                    <input type="range" min="{{mMin}}" max="{{mMax}}" step=".1" ng-model="mValue">
                    <input type="text" ng-model="mValue">
                `,
        
                scope: {
                    mLabel: '@label',
                    mValue: '=value',
                    mMin:   '@min',
                    mMax:   '@max'
                },
                
                controller: function($scope) {
                    
                },
                compile: function(element, attrs) {
                    if (!attrs.mMin) attrs.mMin = 0;
                    if (!attrs.mMax) attrs.mMax = 100;
                }
            };
});