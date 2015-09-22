app.controller('projectDetailCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
	console.log($routeParams);
	$scope.name = $routeParams.projectName;

	$http.get('../projects/projects.json').success(function(data) {
		var project = data.filter(function(entry){
			return entry.name === $scope.name;
		})[0];
		console.log(project);
		$scope.project = project;
	});
}]);