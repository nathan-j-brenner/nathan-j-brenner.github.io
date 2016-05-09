---
layout: post
title: "ExpressWorks with Typescript"
date : 2016-04-17
---

Typescript is a superset of Javascript. It's a transpiler for es6 to es5 and offers typechecking, which you don't get with Babel.  However, there's some configuration and some weird terminology. It's easy for me to forget some of this stuff, so I like to use the node school workshops as an oppertunity to expand my understanding, which is a bonus: I get to learn the content in the workshops, and I get to learn and practice es6.

## Why do I like writing typescript instead of plain javascript?
1. Code completion: As soon as I start typing a reference to an object, such as jQuery `$.`, I get a modal window with the list of possible methods or properties I can use with helpful information like the definition and the parameters. I can select any of them and get tab completion.
2. Code-smart spell checking: If I misspell something, if I assign a property or method to the wrong type, or if I give the wrong type, such as providing a number instead of a string as an argument to a function, I get feedback in the editor just like I do with the red lines in word processors.
3. I get to write State-of-the art code instead of state-of-the-web, which means I'm also learning more about es6 syntax and learning more about javascript.

## Here's the steps, read on for the explantion.

[git directory](https://github.com/nathan-j-brenner/node_school/tree/master/ts_expressworks)

#### Complete before you start a node school workshop:
install node/npm  
npm install -g typescript  
npm install -g tsd  

#### Specifics for everyworkshop, but more specific for Express:
1. `mkdir expressworks`  
2. `mkdir dist`  
3. `npm init`
4. In `package.json`, add in `scripts`:     
	"tsc": "tsc",
    "tsc:w": "tsc -w --outDir dist",
    "start": "npm run tsc:w"
5. `touch tsconfig.json`¸
6. Add in your compiler options, such as:  
`{  
	"compilerOptions": {  
		"module": "commonjs",
		"target": "es5",  
		"noImplicitAny": true,  
		"removeComments": true  
	}  
}`
6. `tsd install express -S`
7. `npm install express -S`
8. `npm install -g expressworks`
9. `tsd rebundle`
10. `touch 1-hello-world.ts`
11. First line of 1-hello-world.ts: `/// <reference path="typings/tsd.d.ts" />`
12. Write the solution
13. `npm start`
14. create another tab in your terminal, `cd dist`
15. `expressworks 1-hello-world.js`

## The why:  
before: Installing `typescript` and `tsd` globally lets you run the `tsc` commands in the terminal.  

1. With nodeschool courses, I like to write the course name as the directory.  All of the courses I've worked on are in the `node_school` directory, and they serve as code examples for future reference. I don't get a lot of time to work on these, it's usually a couple minutes in the middle of the day when I'm waiting on feedback from qa or I've got some time in the weekend when my son is napping.  

2. Dist is the directory for all javascript files.  Call it what you want, I like the idea of `dist` and `src` directories, but the only thing in it is `*.js`.  

3. I'm going to be using npm modules, so every module I install, I do this first, then add the `-S` flag so it get's saved into `package.json`.  

4. This seems to be a realiable way for me accomplish two things: The `*.ts` files are separated from the `*.js` files, and the `*.ts` files get compiled in the background to `*.js` so I don't have to run `tsc *.js` over and over.  

5. `tsconfig.json` keeps your configuration on how you want typescript to work.  

6. This installs a typed definition file of the express framework, so you get access to all those methods and properties when you want them in the ts files. This creates a `typings` directory.  

7. Look at `./typings/express.d.ts` for which version of express has been defined.  Npm install that version.  

8. Install the node school workshop. This can be done at any time, I just like doing it here because I'm about to start working on the workshop.  

9. Any time you add new module definitons, you'll need to rebundle tds so your ts files will know where to look for references of definitions.  

10. So I can get tab completion, I like to name my workshop exercises as `number-workshop_expercise.ts`, so when I'm ready to verify it, I can just hit `workshop verify number tab`. Since the exercises scaffold upon eachother, this is an easy way to keep them appearing in order in the directory.  

11. The first line of every ts file needs to have this text, otherwise when you complile the ts, you'll get an error that says that typescript doesn't know about these external files, even though it works fine in the editor and the js files will pass if you have the correct solution.  

12. Sorry, no freebes, but you wouldn't have to look hard for them.  

13. This starts the compiler  

14. Keep the compiler running, and move into the js files directory so you can check the solutions.
