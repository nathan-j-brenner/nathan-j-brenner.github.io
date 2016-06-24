---
layout: post
title: "Webpacking Simple Angular 1 apps"
date : 2016-06-06
---

I've got a few front-end angular applications on my portfolio, and I'm ready to add on to them.  Originally, my portfolio was intended to show as a historical view point from where I started writing to where I was at the end of the Portland Code School Javascript Immersion program.  In the last year, I wanted to change that so there's only a couple applications that bring out my strengths.  So that was just going to be some full-stack apps, but over time, it's now involved angular 1.x written cleanly by John Papa's styleguide, unit tests, webpack, and a backend with express and mongo.

I had been putting off looking at Webpack and unit tests for a while, and I'm ready to take what I've learned and apply them a few times over in some applications.  This is another recipe type blog that can show how to take an existing angular application and add in webpack.

I have a todo app with the following structure:

```
	node_modules
	todo
		todo.html
		todo.controller.js
	.gitignore
	app.module.js
	index.html
	package.json
	readme.md
```

Index.html currently has a bunch of scripts in it (I didn't bother with gulp on this case), and there's a reference to `ui-view` because I'm using angular ui-router.  There's only one state, but this application was built the same way I would expect larger applications would be built.  That's also why there's a component type directory (todo) with it's view and controller.  

Recipe:

1. npm install webpack --save-dev --save-exact
2. `npm install -S angular` along with any other dependancies

I want to maintain the component type directory structure, so I'm not going to move the js files into a separate app directory.  

3. Comment out the script dependencies in index.html
4.  add in: 
	```html
		<script src="/scripts/vendor.bundle.js"></script>
		<script src="/scripts/app.bundle.js"></script>
	```
5. `touch webpack.config.js` in root of the app
	1. require webpack and path modules
	2. Set `var config` to an empty object
	3. set `config.entry` with two properties: app and vendor.  App should be set to the path to `app.module.js`, and vendor should list all of your vendor dependancies, which you installed from npm (in this case, angular, angular-ui-router, angular-animate, ui-boostrap, angular-touch)
	4. Set `config.output` to property path to `__dirname + /scripts` and property filename to `app.bundle.js`
	5. Add in this plugin:
	```
	    plugins: [
        	new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    	]
	```
	6. Then set `module.exports = config`
6. in app.module.js, require angular and the rest of the dependancies (you'll need to do this with angular for all the app modules)
7. In app.module.js, require all of the modules (controllers, directives, services)
8. type `webpack` in the terminal (webpack has to be installed globally with npm)
9. Run webpack in terminal

This will get you started, and there's a lot more to webpack than this.
