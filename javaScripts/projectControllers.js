var projectControllers = angular.module('projectControllers', []);

projectControllers.controller('portfolioCtrl', ['$scope', 'projects', function($scope, projects){
	projects.list(function(projects){
		$scope.projects = projects;
	});
	$scope.orderProp = '-age';
}]);

projectControllers.controller('projectDetailCtrl', ['$scope', '$routeParams', 'projects', function($scope, $routeParams, projects){
	projects.find($routeParams.projectName, function(project){
		$scope.project = project;
	});
}]);