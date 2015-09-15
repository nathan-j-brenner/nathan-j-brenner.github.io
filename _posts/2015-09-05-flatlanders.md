---
layout: post
title: "The Flatlanders have a store..."
date : 2015-09-05
---

A few weeks ago, I started exploring Angular. Angular is a model-view-controller.  I had worked with Backbone.js, which is another mvc.  

I started with the Treehouse course, then worked through the tutorial on codecademy.

The treehouse course gave some interesting definitions, but there seemed to be several gaps.  I've heard that Treehouse is working on a new course to replace this older version.

CodeCademy course was helpful because there was a lot of practical coding exercises.  I would like to see more specific feedback when I wrote errors.  Currently, there are forums where users post questions when they get stuck.  This lends to spending a lot of time looking at my code and other peoples code to debug the error.

Finally, I got to the code school tutorial and I'm pretty sure I'm going to have that song stuck in my head for a while.  At this point, I haven't retained anything specific from the treehouse course, but it served as a foundation. Code School is equally valuable as codecademy, and their pedagogic sense is a little different.

Code School has more courses on Angular, and their first course is free because Google paid for it.  About this time, I dove into a small project.  The WeatherForecastApp repo on gitHub is the result.  It still needs some work and cleaning up.  I've been looking at the tutorial on the angularjs.org, with the hope of filling in gaps.  I've also integrated angular into the portfolio page on this site.  

So what makes Angular different from Backbone? Backbone doesn't have a controller.  If you're familiar with classical inheritance, the jump is easier to write in Backbone.  The model contains the data, and the view displays the data and can have events, which act like controllers.  This is all written in javaScript files.  Another key difference is that Backbone doesn't have a strong opinion on how you create your app.  It's suitable to work with underscore.js and jQuery, and you can get away with a lot of different approaches to problems.

Angular is a little more opinionated, and it turns html into something quite different.  Angular uses directives to extend javaScript into expressions in the html.  A couple examples of directives would be ng-app, ng-controller, and ng-model.  A controller has to be specified to access the data from the model.   Angular has two-way data binding, so if data appears on the DOM and there is an input tag, the input tag can change the data by specifying ng-model. 

Angular 2.0 is around the corner, and there seems to be a lot of hesitation about it.  React seems to be picking up steem.  It will be interesting to see what happens in the next year.
