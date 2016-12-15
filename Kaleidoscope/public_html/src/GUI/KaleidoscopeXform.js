/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('XformModule', ['SliderModule'])
        .directive('xform', function() {
            return {
                template:  `
                <div class="modes">
                    <label ng-repeat="mode in mModes" title="{{mode}}">
                        {{ mode[0] }}:
                        <input type="radio"
                                name="mode"
                                value="{{$index}}"
                                ng-model="$parent.mSelectedMode">
                    </label>
                </div>
                
                <slider ng-show="mModes[mSelectedMode] !== 'Rotate'"
                        label='X'
                        value="mSliders['X']"
                        min="{{mSliderMin}}"
                        max="{{mSliderMax}}"></slider>
                <slider ng-show="mModes[mSelectedMode] !== 'Rotate'"
                        label='Y'
                        value="mSliders['Y']"
                        min="{{mSliderMin}}"
                        max="{{mSliderMax}}"></slider>
                
                <slider ng-show="mModes[mSelectedMode] === 'Rotate'"
                        label='Angle'
                        value="mSliders['Angle']"
                        min="{{mSliderMin}}"
                        max="{{mSliderMax}}"></slider>
                
                <!--<button ng-click="log()">Log</button>-->
                `,
        
                scope: {
                    mXform: "=model",
                    mShouldUpdate: "=update"
                },
                
                controller: function($scope) {
                    $scope.mModes = [
                        "Translate", "Rotate", "Scale", "Pivot"
                    ];
                    
                    $scope.mSliders = {
                        'X': 0,
                        'Y': 0,
                        'Angle': 0
                    };
                    
                    $scope.mSliderLimits = {
                        'Translate': [-10, 10],
                        'Rotate': [-180, 180],
                        'Scale': [-5, 5],
                        'Pivot': [-10, 10]
                    }
                    
                    $scope.mSliderMin = 0;
                    $scope.mSliderMax = 0;
                    
                    $scope.dummyData = {
                        'translate': [4, 3],
                        'rotate': 57,
                        'scale': [1.2, 5.6],
                        'pivot': [0, 0]
                    }
                    
                    $scope.mSelectedMode = 0;
                    $scope.mValue = 10;
                    
                    $scope.$watch('mSelectedMode', function(newValue, oldValue) {
                        $scope.updateValues();
                    });
                    
                    $scope.$watch('mXform', function(newValue, oldValue) {
                        $scope.updateValues();
                    });
                    
                    $scope.$watch('mShouldUpdate', function(newValue, oldValue) {
                        if ($scope.mShouldUpdate) {
                            $scope.updateValues();
                            $scope.mShouldUpdate = false;
                        }
                    });
                    
                    $scope.updateValues = function() {
                        if (!angular.isDefined($scope.mXform)) return;
                        
                        var mode = $scope.mModes[$scope.mSelectedMode];
                        switch (mode) {
                            case 'Translate':
                                var pos = $scope.mXform.getPosition();
                                $scope.mSliders['X'] = parseFloat(pos[0]).toFixed(1);
                                $scope.mSliders['Y'] = parseFloat(pos[1]).toFixed(1);
                                break;
                            case 'Rotate':
                                var rot = $scope.mXform.getRotationInDegree();
                                $scope.mSliders['Angle'] = parseFloat(rot).toFixed(1);
                                break;
                            case 'Scale':
                                var scale = $scope.mXform.getSize();
                                $scope.mSliders['X'] = parseFloat(scale[0]).toFixed(1);
                                $scope.mSliders['Y'] = parseFloat(scale[1]).toFixed(1);
                                break;
                            case 'Pivot':
                                var pivot = $scope.mXform.getPivot();
                                $scope.mSliders['X'] = parseFloat(pivot[0]).toFixed(1);
                                $scope.mSliders['Y'] = parseFloat(pivot[1]).toFixed(1);
                                break;
                        }
                           
                        $scope.mSliderMin = $scope.mSliderLimits[mode][0];
                        $scope.mSliderMax = $scope.mSliderLimits[mode][1];
                    };
                    
                    $scope.$watch('mSliders["X"]', function(newValue, oldValue) {
                        $scope.handleUpdate();
                    });
                    
                    $scope.$watch('mSliders["Y"]', function(newValue, oldValue) {
                        $scope.handleUpdate();
                    });
                    
                    $scope.$watch('mSliders["Angle"]', function(newValue, oldValue) {
                        $scope.handleUpdate();
                    });
                    
                    $scope.handleUpdate = function() {
                        if (!angular.isDefined($scope.mXform)) return;
                        
                        var mode = $scope.mModes[$scope.mSelectedMode];
                        switch (mode) {
                            case 'Translate':
                                $scope.mXform.setPosition($scope.mSliders['X'], $scope.mSliders['Y']);
                                break;
                            case 'Rotate':
                                $scope.mXform.setRotationInDegree($scope.mSliders['Angle']);
                                break;
                            case 'Scale':
                                $scope.mXform.setSize($scope.mSliders['X'], $scope.mSliders['Y']);
                                break;
                            case 'Pivot':
                                $scope.mXform.setPivot($scope.mSliders['X'], $scope.mSliders['Y']);
                                break;
                        }
                    };
                }
            };
});