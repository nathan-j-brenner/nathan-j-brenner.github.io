var app = angular.module('portfolio', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
//when you're ready to work on modal again, add 'ngAnimate', 'ui.bootstrap' to dependencies and $modal to controller function


app.controller('portfolioCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('../projects/projects.json').success(function(data) {
		$scope.projects = data;
	});
	$scope.orderProp = 'age';
}]);

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