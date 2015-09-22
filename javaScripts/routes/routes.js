app.config(function($routeProvider){
	$routeProvider.
		when('/', {
			// template: '<ul><li ng-repeat="project in projects"><a href="http://localhost:4000/portfolio/#/[[project.name]]">[[project.name]]</a></li></ul>',
			templateUrl: '../javaScripts/templates/projects.html',
			controller: 'portfolioCtrl'
		}).
		when('/:projectName', {
			// template: '<h1>Project Name</h1><a href="http://localhost:4000/portfolio/#/">back</a>',
			templateUrl: '../javaScripts/templates/project.html',
			controller: 'projectDetailCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});