var app = angular.module('portfolio', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
//when you're ready to work on modal again, add 'ngAnimate', 'ui.bootstrap' to dependencies and $modal to controller function
app.controller('portfolioCtrl', function($scope){
	$scope.projects = [
		{
			"name": "weatherForecastApp",
			"img": "/imgs/weatherApp.png",
			"alt": "weatherForecastApp",
			"description": "First project with Angular. Started on August 25 with features to be added possibly with testing through Protractor and adding geolocation. The user can put in a zip code and get a three day forecast.",
			"gitHub": "https://github.com/nathan-j-brenner/weatherForecastApp",
			"age": 1,
			"lastCommit": 2015-09-09,
			"tags": ['angular.js', 'bootstrap', 'css', 'html', 'weather underground api']
		},
		{
			"name" : "SnapOR",
			"img": "/imgs/snapOR/index.png",
			"alt": "SnapOR",
			"description": "Single page application geared toward users that like to photograph the outdoors, specifically in the Oregon State Parks. Project timeframe to complete mvp: July  6 – July 31. I worked with two other developers on this project.",
			"gitHub": "https://github.com/nathan-j-brenner/snapOR",
			"site": "http://snaporegon.herokuapp.com/",
			"lastCommit": 2015-08-11,
			"age": 2,
			"tags": ['html 5', 'css 3', 'sass', 'gulp.js', 'backbone.js', 'foundation', 'responsive web design', 'jQuery', 'underscrore.js', 'node.js', 'npm', 'express.js', 'json', 'orchestrate.io', 'Oregon State Parks api', 'flickr api', 'google maps api', 'gitHub', 'trello', 'slack']

		},
		{
			"name": "CalendarApp",
			"img": "/imgs/calendarApp/example1.png",
			"alt": "CalendarApp",
			"description": "First project with an mvc, primary attention between July 20-24.  The user can create a day, or a group of days, and add events individually to each event.",
			"gitHub": "https://github.com/nathan-j-brenner/calendarApp",
			"age": 3,
			"lastCommit": 2015-07-05,
			"tags": ['backbone.js', 'css', 'html', 'jQuery', 'underscore.js', 'node.js', 'express.js']
		},
		{
			"name": "AuthMe",
			"img": "/imgs/authme/index.png",
			"alt": "AuthMe",
			"description": "Twitter clone: user can register and log in.  After log-in, a cookie is saved until the user logs out. The user can submit comments.",
			"gitHub": "https://github.com/nathan-j-brenner/authMe",
			"age": 4,
			"lastCommit": 2015-07-01,
			"tags": ['html', 'ccs', 'node.js', 'express.js', 'jade', 'json', 'postgresql', 'knex.js']
		},
		{
			"name": "StaticCharge",
			"img": "/imgs/static-charge/index.png",
			"alt": "StaticCharge",
			"description": "This is a static site generator I worked on in late May 2015",
			"gitHub": "https://github.com/nathan-j-brenner/static-charge",
			"age": 5,
			"lastCommit": 2015-05-28,
			"tags":['html', 'css', 'javaScript', 'express.js', 'node.js']
		},
		{
			"name": "Git Ping-Pong",
			"img": "/imgs/pingPong.png",
			"alt": "Git Ping-Pong",
			"description": "While I was in JavaScript Immersion during the day, I was teaching the Web Foundations. This repo was an activity I created for the intent that the students would be able to get their hands dirty with git.  In previous versions, the instructor would demonstate this process while the students watched",
			"gitHub": "https://github.com/nathan-j-brenner/ping_pong",
			"age": 6,
			"lastCommit": 2015-05-14,
			"tags": ['markdown', 'git']
		},
		{
			"name": "JavaScript Mad-Libs",
			"img": "/imgs/mad.png",
			"alt": "JavaScript Mad-Libs",
			"description": "This is another teaching asset with the intent that the students would start to apply some very basic javaScript elements such as functions, arrays, and objects.",
			"gitHub": "https://github.com/nathan-j-brenner/mad_libs_in_console",
			"age": 7,
			"lastCommit": 2015-06-02,
			"tags": ['markdown', 'javaScript']
		},
		{
			"name": "234th Army Band",
			"img": "/imgs/armyBand.png",
			"alt": "234th Army Band",
			"description": "This bootstrap website took me about 8 hours to write. The client really liked it, but it hasn't gone live yet.",
			"gitHub": "https://github.com/nathan-j-brenner/234",
			"age": 8,
			"lastCommit": 2015-05-04,
			"tags": ['bootstrap', 'html', 'css', 'jQuery', 'javaScript']
		},
		{
			"name": "Previous Portfolio",
			"img": "/imgs/foundation.png",
			"alt": "Portfolio with Foundation framework",
			"description": "I wrote this right before JavaScript Immersion started and the picture takes forever to load.  It's a single static page with the help of the <a href='http://foundation.zurb.com/'>Foundation</a> front-end framework.  Over the course of JavaScript, there seemed to be too much that I wanted to change that I decided not to fight this.  I was also writing in a wordPress blog, so this jekyll site fits both of those needs",
			"gitHub": "https://github.com/nathan-j-brenner/portfolioWithFoundation",
			"age": 9,
			"lastCommit": 2015-08-02,
			"tags": ['html', 'css', 'foundation', 'javaScript']
		},
		{
			"name": "Primal Touch Massage 2.0",
			"img": "/imgs/porcali3.png",
			"alt": "Primal Touch Massage 2.0",
			"description": "This was the final project of the web foudnations I took as a student.  This is a boostrap site refactored from a previous site without any framework. Turn on your speakers.  Can you name that composer?",
			"gitHub": "https://github.com/nathan-j-brenner/porcali3",
			"age": 10,
			"lastCommit": 2015-03-05,
			"tags": ['html', 'css', 'jQuery', 'bootstrap']
		},
		{
			"name": "Primal Touch Massage 1.0",
			"img": "/imgs/porcali2.png",
			"alt": "Primal Touch Massage 1.0",
			"description": "All hand typed css and html, along with the first oppertunity to collaborate with git.  I had a hand in the gradient and I was also the defacto-git expert",
			"gitHub": "https://github.com/nathan-j-brenner/porcali2",
			"age": 11,
			"lastCommit": 2015-02-07,
			"tags": ['html', 'css']
		},
		{
			"name": "PCS Curriculum",
			"img": "/imgs/pcs.png",
			"alt": " Portland Code School Web Foundations Curriculum",
			"description": "This was my first published content: lesson plans for each class, with the hope that more web developers could teach this course by following along.  I had no idea what a static site generator was, and I wrote in markdown a lot like I would write in Microsoft Word and add some syntax later.",
			"gitHub": "https://portlandcodeschool.github.io/primer//course/",
			"age": 12,
			"lastCommit": 2015-05-26,
			"tags": ['jekyll', 'markdown', 'html', 'css', 'javaScript']
		}

	];
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















});