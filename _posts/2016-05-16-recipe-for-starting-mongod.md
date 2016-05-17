---
layout: post
title: "Recipe for starting MongoD"
date : 2016-05-08
---

## Why
1.  A couple posts ago, I made a 'recipe' for creating a typescript project with node.js.  I've actually used that a few times, and I've gotten some feedback from other devs that liked it, so this is another one.

2.  I'm a ta for a MongoDB University course with node.js that starts soon.  Part of that means I'll be previewing the materials before the students have access so I can offer suggestions to the instructors, and the other part means I'll be closely watching the forum so I can break blockers as they come up.  So I'm taking notes as I watch the video as an adjudictor to the course materials, to guess possible student questions, and to expand my understanding of MongoDB.

## Format
The first few steps involve the browser, then they switch to a lot of bash commands in the terminal.  I've gotten MongoDB running on PCs, I've used Bash with some luck althrough I haven't tried it on Windows 10 yet, and I've used Mac default Terminal (which I prefur), and iTerm.  I'm now using iTerm on my day job computer, and I haven't tried that (maybe tomorrow, fingers crossed some fires stay out), so this post will get updated. 

Basically Bash command will be followed by brief explanation.  Bash commands are the code snippets, assume you have to type enter after you type in the command.  This isn't a post for learning Bash.  Check out [learnyoubash at node school](http://nodeschool.io/).

## Steps for Mac users
1. google `download mongodb`, click on second link to the <span style="font-weight: 700">MongoDB Download Center | MongoDB</span>
2. Scroll down, click on the green button that says __DOWNLOAD (tzg)__.  This will download the Current Stable Release, which it says if you search the page for that text. As of the first draft of this post, it was 3.2.6.  This mongo/node course uses 3.2.x
3.  Open up a command prompt.
4. `cd ~/Downloads` : Move into your Downloads directory
5. `ls -lt` List all the contents of the Downloads directory, look at what gets printed first.  It should say something like __mongodb-osx-x86_64-3.2.6.tgz__.  It might be different depending on your mac, but it should definately end with __.tgz__
6. `tar xvf mongobd-osx-x86_64-3.2.6.tgz` Hint: use code completion.  Type the first few letters of the tgz file and hit the tab key.  This is un-tarring the file.
7. `cd mongodb-osx-x86_64-3.2.6` Move into the file you just expanded. Notice no tar ball extention.
8. `ls` List all the contents of that mongodb directory.  Notice the __bin__ directory.
9. `cd bin` Move into the __bin__ directory.
10. `ls -l` List all the contents of the __bin__ directory. Notice __mongo__ and __mongod__
11. `sudo root` You need to become root so you can do the next step.  This is going to let you write/read mongodb documents.  You'll probably need to type in your password.  Don't expect to see any characters as you type it in.
12. `mkdir -p /data/db` Create the directory that mongodb by default saves its data.
13. `chmod 777 /data`
14. `chmod 777 /data/db`
15. `ls -ld /data/db` You should see something like __root__
16. `exit` Get out of root
17. `whoami` You should see your computer's username that you're logged into.
18. `./monngod` This starts the MongoDB server. Notice __on port 27017__.  That's the default port, and will be more useful later when you connect the MongoDB Server through a driver.
19. `control + t` or open a new tab (top menu=>Shell=>New Tab), and move into that tab for the next few commands.
20. `pwd` You should still be in __bin__.  If you're not, like if you're using __iTerm__, move back into it with `~/Downloads/mongodb-osx-x86_64-3.2.6/bin`
21. `./mongo` This starts the Mongo shell.
22. `db.names.insert({name: "Your name"})`.  All this does is write to the server.  Expect to see `WriteResult({ "nInserted" : 1 })`.
23. `db.names.find()` You should see a json object with 2 fields: an _id field with an ObjectId, and a name field with the value you just typed.
24. Switch back to the tab that has the mongod server running
25. `control c` This stops the server
26. `sudo root` Become root again
27. `cp * /user/local/bin` You're copying the contents of the mongo bin directory to the __/user/local/bin directory__.
28. `exit` exit root
29. `which mongod` You should see __/usr/local/bin/mongod__
30. `cd` switch back to your home directory
30. `mongod` You just started the mongod server from your home directory, which you'll do from now on.
31. Switch into another tab. Run `control c` if you moved back to the tab where you had the mongo shell running before. `cd` so you move to home directory. `mongo`. You can start a mongo shell now.

Conclusion: To use the mongo shell, open command line, run `mongod`, open another command line window, run `mongo`. You can do this from any directory

### Additional feedback based off of setting up on Mac with iTerm:
Comming soon...

## Setting up for PC Users
Comming soon...