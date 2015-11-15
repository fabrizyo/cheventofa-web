'use strict';

var assert = function (condition) {
  if (condition === false) {
    throw new Error("Assertion failed");
  }
};

var app = angular.module('App', ['ngMaterial','ngRoute','ngMessages']);

 // configure our routes
app.config( ['$routeProvider',  function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'login.html',
            controller  : 'loginController'
        })

        // route for the about page
        .when('/stazioni', {
            templateUrl : 'stazioni.html',
            controller  : 'stazioniController'
        })

        .otherwise({
          redirectTo:'/'
        });

}]);

app.controller('loginController', ['$scope','$location',function($scope,$location) {
  $scope.stazioni = function() {
    $location.path("/stazioni");
  };
 
}]);

app.controller('stazioniController', ['$scope', '$mdSidenav',function($scope, $mdSidenav) {
  var stazioni=[];
  stazioni.push("Caorle (3/4)");
  stazioni.push("Conche-Piovini (3/4)");
  stazioni.push("Cortellazzo (3/4)");
  stazioni.push("Grado1 (8/9)");
  stazioni.push("Grado2 (4/7)");
  stazioni.push("Irom-Venezia (2/3)");
  stazioni.push("Lago di Cavazzo (3/4)");
  stazioni.push("Lago Morto (3/4)");
  stazioni.push("Lago S.Croce (1/2)");
  stazioni.push("Lignano (3/4)");
  stazioni.push("Marina Palmense (5/9)");
  stazioni.push("Porto Barricata (3/5)");
  stazioni.push("Punta Sabbioni (2/4)");
  stazioni.push("Sottomarina Bagni Splash (3/4)");
  stazioni.push("Sottomarina Gigetto (3/5)");
  stazioni.push("Volano (2/4)");
  $scope.stazioni=stazioni;

  $scope.stazioneScelta=stazioni[0];

  $scope.toggleStazioni = function() {
    $mdSidenav('left').toggle();
  };

  $scope.myDate = new Date();


}]);

//directive for Enter keypress
app.directive('keyEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.keyEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.filter('limitEllipses', function() {
  return function(s,max) {
    if (s==null) {
      return null;
    }
    if (s.length>max) {
      s=s.substring(0,Math.max(1,max-3))+"...";
    }
    return s;
  };
});
