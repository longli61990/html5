angular.module('app')
    .controller('UploaderController', function($scope, fileReader){
        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };
    })
