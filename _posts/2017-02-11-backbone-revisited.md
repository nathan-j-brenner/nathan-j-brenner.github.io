---
layout: post
title: "Backbone Revisited"
date : 2017-02-11
---

It's 2017 and the popular modern javascript frameworks are React, Angular 2, Ember, and maybe Vue. So why would you use Backbone? And if you had to use it, could you build a scalable application as well as you could with the fancy popular frameworks?

ES6, Webpack, evergreen browsers, typescript, reactive programming, they're all nice, but do you know JavaScript well enough to not have access to them? Or are you dependant on an opinionated framework and have you not made sound judgements on concepts like design principals?

I found myself asking these questions recently when I had an oppertunity to build an app with barebones Backbone.  It had to be compatible with IE 10, and the client didn't want to maintain a more modern framework. Even adding additional dependancies like a css framework or abstractions from Backbone like  Marionette or a backbone plugin wasn't possible.  It was a hardware shop with a small software engineering team of mostly C# experience.

I also inheirited some code. This was a redo of an existing application that was static.  The customers wanted more flexibility to change the configurations of the app, so they needed to go from a static app that had used Backbone for it's routing to a dynamic spa.

The code I inheirited showed a few code smells and a serios lack of understanding of object oriented applications, basics in data structures, and best practices on html and css. I mean no harm to who wrote that code, and if anything I'd love to have some conversations with that person to figure out why they made the decisions to write what they did.

First of all, don't use id's on html tags for css styles. For example: 

```
#my-element {
	styles ...
}
```
Using id's like that is short sighted, and prone to bugs later one.  In this case, there would be multiple themes later on. In the first case, you might have a set of divs that would look like squares.  Later on, the user might decide that they want those squares to look like circles or rectangles.  Giving those square divs an `id=square` in their Backbone view is a bad idea. Furthermore, targeting an html node with multiple id's doesn't make your selector any more spectific.  The id is already unique.  Don't clutter up the css by doing something like:

```
#parentDiv #firstChildDiv {
	styles...
}
```

I refactored a lot of the css, and I started with reducing the additional targets first, so in the case above, I changed it to:

```
#firstChildDiv {
	styles...
}
```
Then I checked the browser, and if everything went well, I would switch the id to a class attribute. Even still, I might later refactor that again so that instead of assigning classes to elements by their role on the app, I would move the styles into classes that describe the styles in that class.  Those classes would become more flexible to use, and you end up having less styles in your css files.  It might seem off in the beginning, but think about things like buttons, where the look of a button on an app should be consistent.  So you don't need button classes like `endBtn`, and `startBtn` which describe what their role and what they do.  It doesn't describe their styles.  What they do will be defined in the javascript classes.  

There was also one big huge long exhaustive css file.  I broke that down into where those styles would be found. For example, the root page might have a css file for it, then for each additional route might have it's own styles.  You can't avoid the cascading nature of css, and you'll still have to think about which order those files are loaded into the dom. It's more for the sanity of the dev that has to maintain the application as it grows.

Back to Backbone.  Backbone is a library that requires jQuery and lodash.  Lodash and Backbone were written by the same developer, and Backbone was a huge improvement in it's time, when before you had Knockout (which I havn't used), and otherwise jQuery.

Lodash is a helper library that adds a lot of extra nice methods on classes like Arrays, but it is not there to replace the methods on Arrays (like map, forEach, reduce) that make javascript so functional.  Personally, I've been able to get by without it, but it was kinda nice to play with it a little more.

Before jQuery, it took a lot more code to wire up a function to get called by an event on the dom.  And you had to often write code specific to each of the browsers because they didn't play well so nicely.  This ended up poluting a lot of public variables into the global namespace (the window object), which might be fine if you are a server side app where everytime the user does anything, a request gets sent to the server, and the response reloads the entire application.  If you wanted to use javascript classes, you had to wire those up all on your own, and honestly you should try it so you understand what's happening under the hood when you're using more modern frameworks that have abstracted that code from you so you could build things faster.

So Backbone is a library, that like Angular, React, and other frameworks, implement the MVC pattern for single page applications (SPA).  The Model View Controller (MVC) pattern became popular with server applications, and it hasn't really worked out exactly in the font end.  What seems to have typically happened is more like MV* or MV whatever, where you have a view that has it's javascript functions and properties, bound to a particular template.

In Backbone, you get Models, Collections (which should be a set of models), and Views (which you can have a view for a model, and a view for a collection). Models should not have nested data structures, but if they do (since nested data structures work so well for javascript and real life items), you can't implement them like that in the model. For example, you should not have a model like this:

```
var person = Backbone.Model.extend({
	defaults: {
		name: 'Nate',
		cars: [
			{
				year: 2008,
			},
			{
				year: 2009
			}
		]
	}
});
```

Cars should be it's own separated Collection with a Car model.  This separates the concerns and behaviors of those models and their cooresponding views from eachother. It makes your application scalable. It's easier to test.  Instead, write your person Model like this:

```
(function(){
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Nate',
		cars: []
	}
});

App.Models.Car = Backbone.Model.extend({
	defaults: {
		year: 2008
	}
});

App.Collections.Cars = Backbone.Collection.extend({
	model: Car
});

})()
```

There's a lot there, and I would add that each of these would be in their own separate js file, all wrapped with an IIFE (Immediately Invocked Function Expression). `App` is a property specified earlier with 

```
window.App = { 
	Models: {},
	Collections: {},
	Views: {}
}
```

This keeps you from populating the global scope with a bunch of variables that could at some unknown point get changed (Sorry, this is es5. We only get lexical scoping, so you can change any declared variables at any point). The only time you should use `var` is within a function, so that the varible is closed within that function.

Alright, so now you are ready to create a view for the person, but how do you do that with the car model and cars collections. Like this: 

```
App.Views.Car = Backbone.View.extend({
	tagName: 'li',
	render: function(){
		this.$el.html(this.model.get('year'));
		return this;
	},
});

App.Views.Cars = Backbone.View.extend({
	tagName: 'ul',
	initialize: function(){
		this.collection.on('add', this.render);
	},
	render: function(){
		this.collection.forEach(function(car){
			this.$el.html();
			var myCar = new App.Models.Car(car);
			var myCarView = new App.Views.Car({model: myCar});
			this.$el.append(myCarView.render().el);
		});
		return this;
	},
});

App.Views.Person = Backbone.View.extend({
	render: function(){
		var cars = new App.Collection.Cars();
		var carsView = new App.Views.Cars({collection: cars});
		this.model.get('cars').forEach(function(car){
			cars.add(car);
		});
		this.$el.html();
		this.$el.append(carsView.render().el);
	}
});
```

A Backbone Collection is not a Javascript Array.  It inheirts from it.  An a view to a collection is not a Javascript Array.  If you have nested data structures, separate each nested property into a Collection bound to a specific model.

This is a small example, but if you havn't used Backbone recenlty, like if you inheirited someone else's code, this is not going to be much better than spaghetti jQuery.  You don't want to maintain a more modern framework? It's more likely to be harder to maintain jquery and Backbone. I had a friend tell me that you basically have to write a framework when you're building an app with Backbone.  Furthermore, you might not have such easy access to an active community that knows a lot about backbone.  It's not hard to find old tutorials that no longer work, and plugins that are no longer being maintained.

With that said, I enjoyed exercising my vanilla javascript chops.  There's not a lot to learn from the docs, and you can use a lot of those best practices that you get for free in the modern frameworks. I actually found an oppertunity to use recusion, and I wrote a lot more inline documentation that I have ever done with a modern app.  I had to think carefully about how I would maintain state, and the names of my models, views, and collections.  It wasn't a complicated app. I never had to use http.  I did have to develop with Visual Studio, and I'm very much looking forward to not doign that any time soon. And it was very interesting to see a C# application that integrated with javascript. After having build larger spas with modern frameworks, it was interesting looking at Backbone as if I had sunglasses on that embodied the modern stuff. I looked at data structures and problems differently because of what I knew about larger apps. I'm pretty sure when I first used backbone, I barely understood how to use Collections, Models, and Views approapriately, and I definately didn't understand the issues concerning managing state and types of data structures.

Ironically, at least one of the C# devs told me how he plays with Angular, and how much he loves TypeScript because it looks just like the C# code he writes.

Bottom line: Stick with best practices for javascript and css.  Learn the fundamentals, ask for help, never stop learning, and look under the hood often.
