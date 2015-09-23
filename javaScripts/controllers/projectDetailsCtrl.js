app.controller('projectDetailCtrl', ['$scope', '$routeParams', 'projects', function($scope, $routeParams, projects){
	projects.find($routeParams.projectName, function(project){
		$scope.project = project;
	});
}]);