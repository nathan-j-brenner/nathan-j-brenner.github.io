# This is a Jekyll Site
To create another site like this, follow the following steps:

## Create a new project
1. In the directory where you want to keep this repo, type  `jekyll new project` in the terminal.  Replace *project* with the desired name of your repo.  Now all of the files you need for this project have been created in that project directory.  
  * `_config.yml` : instructions to Jekyll on how to build the site.  
  * `_includes` folder: the reusable parts that will be included in the layouts and posts.  
  * `_layouts` : the main page templates of your project  
  * `_posts` :  This is where you keep your blog posts, written in markdown files.  Markdown is a simple text format for writing on the web.  You can type like you would in a word processor like Microsoft Word and it will appear like paragraph text.  If you want your content to display with headers, lists, and other formats, check out this [markdown guide](http://daringfireball.net/projects/markdown/syntax).
  * `_sass` : built in support for sass. This directory contains all of your sass partials.  
  * `css` : Where the `main.scss` file exists.
2. To view the site locally on your computer, type `jekyll serve` in the terminal. This sets up a local server.  By default, you can view your site in the browser at [http://localhost:4000/](http://localhost:4000/).  This command also created a `_site` directory.  This contains the static html that will be rendered in the browser. At this point, the only content is the Jekyll default theme.  The only file in the `_posts` gives instructions on how to make more posts.  While the server is running in the terminal, you can make changes to the files, and those changes will be rendered in the browser when you refresh the browser.  
3. When you're done working and you want to stop the server, type `control+c`.  
4. Any file or directory that starts with an underscore, jekyll ignores those files when it builds the site. If you want to create a directory or file that will appear on the site, save that file without an underscore.
  
## Jekyll Configurations
This section talks about the `_config.yml` file.
  
This file contains variables that we use in our site.  If you make any changes with the server running, you need to restart the server for the changes to become active.

* Site settings: set the website title, description, url, and contact email.  
* Build Settings: markdown is rendered as kramdown, and permalinks are set to `:/title` so that when you visit a post, the title is added to the url 
* Default