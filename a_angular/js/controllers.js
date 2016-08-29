var app = angular.module('MainApp', ['ngRoute'])
    .config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{template:'这是首页页面'})
        .when('/info',{templateUrl:'info.html'})
        //.when('/info',{redirectTo:'info.html'})
        .otherwise({redirectTo:'/'});
        angular.element(document.getElementById("tar")).html("dddddf得到");
        //$locationProvider.hashPrefix('#');
       // $locationProvider.html5Mode(true);
}]);
app.controller('MainCtrl', function($scope,$http) {
    $scope.adf="fsdf";
    $scope.header=[
        {name:"首页","href":"#"},
        {name:"信息","href":"#/info"}
    ];
    $scope.location_href=function(e){
        alert(e);
        window.location.href="#/info";
    }
});
app.controller('PhoneListCtrl', function($scope,$http) {
    $scope.phones = [
        {"name": "Nexus S",
            "snippet": "Fast just got faster with Nexus S."},
        {"name": "Motorola XOOM™ with Wi-Fi",
            "snippet": "The Next, Next Generation tablet."},
        {"name": "MOTOROLA XOOM™",
            "snippet": "The Next, Next Generation tablet."}
    ];
    $scope.ad="dddd";
    $http.post("http://localhost:8999/node/login").then(function (response) {
        alert(response.data);
        $scope.myWelcome = response.data;
    });
    $scope.names = ["Google", "Runoob", "Taobao"];
});
app.controller('selectCtrl', function($scope) {
    $scope.names = ["Google", "Runoob", "Taobao"];
});