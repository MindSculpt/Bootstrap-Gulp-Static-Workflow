# Project Setup

## Dependencies

* Requires Node.js, Gulp, Bootstrap, & Sass

### Install Node JS (Mac):

[https://nodejs.org/en/](https://nodejs.org/en/)

### Install Gulp globally

1. Enter `npm install -g gulp`
    * If on a Mac and you get errors use `sudo npm install -g gulp` and enter your password when required

## Setup

1. Clone the repo to your local machine
2. Navigate to the project root in the command prompt
3. Run `npm install` to install all of the remaining project dependencies
4. Run `gulp` to compile the project files in the source folder to the development builds/folder and start watching the source folder for changes.
    * To stop the gulp task hit `ctrl+c` in the command prompt
    
5. [Browsersync](https://www.browsersync.io/) deploys your project without a local server at http://localhost:3000

### Configuration
Update, edit, add styles as needed in `source / assets / sass`. This repo makes no assumption about other dependencies (e.g. fonts, analytics, open graph tags, etc.) typically included in your template files, so you will need to customize that based on your project needs.

### Project Notes
Development should take place in the source folder. The watch command that runs when you run `gulp` will watch changes in this folder and update the builds in the /builds folder. Any changes made to the builds folder will be overwritten by the gulp tasks.

The builds folder is cleaned each time you start up a project, so before you run your `gulp` task make sure you set the 'outputDir' folder value to either 'production' (minified assets) or 'development' (unminified assets).

Don't forget to add your own `.htaccess` file to your root on production.

Sass is the CSS preprocessor this project uses for styles. Learn more about syntax here: [http://sass-lang.com/](http://sass-lang.com/)
