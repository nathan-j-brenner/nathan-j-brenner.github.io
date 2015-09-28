var app = angular.module('portfolio', ['ngRoute', 'projectControllers', 'projectsFactory'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.config(function($routeProvider){
	$routeProvider.
		when('/', {
			templateUrl: '../javaScripts/templates/test.html',
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
