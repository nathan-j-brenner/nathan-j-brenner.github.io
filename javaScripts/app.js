// var app = angular.module('portfolio', [], function($interpolateProvider) {
//   $interpolateProvider.startSymbol('[[');
//   $interpolateProvider.endSymbol(']]');
// });
// //when you're ready to work on modal again, add 'ngAnimate', 'ui.bootstrap' to dependencies and $modal to controller function

// app.controller('portfolioCtrl', ['$scope', '$http', function($scope, $http){
// 	$http.get('../projects/projects.json').success(function(data) {
// 		$scope.projects = data;
// 	});
// 	$scope.orderProp = '-age';
// }]);

/*
	$scope.orderProp = "age";
	// $scope.animationsEnabled = true;
	// $scope.open = function (size) {
	// 	var modalInstance = $modal.open({
	// 		animation: $scope.animationsEnabled,
	// 		templateUrl: 'myModalContent.html',
	// 		controller: 'portfolioCtrl',
	// 		size: size,
	// 		resolve: {
	// 			items: function () {
	// 				return $scope.items;
	// 			}
	// 		}
 //    });
});*/
var app = angular.module('portfolio', ['ngRoute'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

// app.config(function($routeProvider){
// 	$routeProvider.
// 		when('/', {
// 			template: '<ul><li ng-repeat="project in projects"><a href="http://localhost:4000/portfolio/#/[[project.name]]">[[project.name]]</a></li></ul>',
// 			controller: 'portfolioCtrl'
// 		}).
// 		when('/:projectName', {
// 			template: '<h1>Project Name</h1><a href="http://localhost:4000/portfolio/#/">back</a>',
// 			controller: 'projectDetailCtrl'
// 		}).
// 		otherwise({
// 			redirectTo: '/'
// 		});
// });

// app.controller('portfolioCtrl', ['$scope', '$http', function($scope, $http){
// 	$http.get('../projects/projects.json').success(function(data) {
// 		$scope.projects = data;
// 	});
// 	$scope.orderProp = '-age';
// }]);

// app.controller('projectDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
// 	console.log($routeParams);
// }]);
