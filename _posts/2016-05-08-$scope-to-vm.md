---
layout: post
title: "Refactoring from $scope to vm in ng1.x"
date : 2016-05-08
---

Using `$scope` brings on some issues, which is evident as it's been taken out of Angular2.  With your existing Angular 1.x apps, one of the ways you can refactor is to strip out all instances of `$scope`.

There's three steps you need to take for this to work:  

#### First

Change the declarations of your controllers from the name they have to `vm`.  VM represents view-model, and is a convention that's a part of the John Papa Angular styleguide.  

For example, within an app, where you have a controller such as  

	<div ng-controller="mainController"></div>
	
change it to 
	
	<div ng-controller="mainController as vm"></div>`
	
If you declared your routing, such as with the `angular-ui-router`, you might have  

	$routeProvider.state( "main", {
		url: "/main",
		templateUrl: "./templates/main.html",
		controller: "mainController"
		});
		
Change the last line to `controller: mainController as vm`.  

#### Second

Within your views, every time you have a property, such as  

	ng-model = "name" 
	
reference the property as part of vm, which in this case would look like 

	ng-model= "vm.name"

#### Third

Within the controller, declare `vm` as a variable set to `this`, then replace `vm` everywhere you have `$scope`.  
 

For example, given this:  

	angular.module('app').controller('MainController', MainController);
	
	function MainController($scope) {
		$scope.numb = 5;
		$scope.add = function(){ 
			$scope.numb += 1;
		}
	}

Change to:

	angular.module('app').controller('MainController', MainController);
	
	function MainController() {
		var vm = this;
		vm.numb = 5;
		vm.add = function(){
			vm.numb += 1;
		}
		
There's plenty of blogs about why you should get off the habit of using `$scope`, and there's justifications for using `ctlr` in place of `vm` for the controller as syntax.  Bottom line, it looks cleaner, it's easier to use, and you don't have to work with embedded scopes.

I had heard of using `controllerAs` syntax before, and how John Papa was a strong advocate for it, but it took me figuring out on my own how to effectively make this shift. Ironically, here's a blog he did that looks like it covers the same premise, and proably goes into more depth: [http://johnpapa.net/angularjss-controller-as-and-the-vm-variable/](http://johnpapa.net/angularjss-controller-as-and-the-vm-variable/)
Also, if you're learning angular 1, interested in learning angular2 and trying to see the connective glue between ng1 and ng2, or have some existing apps and you're trying to find work but you keep getting told you're code isn't good enough, try refactoring some of it to these conventions: [https://github.com/johnpapa/angular-styleguide](https://github.com/johnpapa/angular-styleguide)