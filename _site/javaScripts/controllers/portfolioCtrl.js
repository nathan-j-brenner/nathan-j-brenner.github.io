app.controller('portfolioCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('../projects/projects.json').success(function(data) {
		$scope.projects = data;
	});
	$scope.orderProp = '-age';
}]);