/* global app */
app.config(function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl: '../javaScripts/templates/projects.html',
			controller: 'portfolioCtrl'
		}).
		when('/:projectName', {
			templateUrl: '../javaScripts/templates/project.html',
			controller: 'projectDetailCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});