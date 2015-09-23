app.controller('portfolioCtrl', ['$scope', 'projects', function($scope, projects){
	projects.list(function(projects){
		$scope.projects = projects;
	});
	$scope.orderProp = '-age';
}]);