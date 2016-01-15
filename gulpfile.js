/**
 * Gulp tasks for static site builds
 *
 * @copyright Copyright (c) 2016, humblemeteor.com
 * @author Michael Becker - michael@humblemeteor.com
 * @license MIT
 */

// gulp plugin vars
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	gulpif = require('gulp-if'),
	browserSync = require('browser-sync'),
	imageop = require('gulp-image-optimization'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	del = require('del'),
	fileinclude = require('gulp-file-include');

// browserSync vars
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var env, production, outputDir, sources, sassStyle; // reference vars

production = false; 								// set true for production

if (production) {
	env = 'production'
	sassStyle = 'compressed';
} else {
	env = 'development'
	sassStyle = 'expanded';
}

outputDir = 'builds/'+env+'/';						// path to the output directory

// holds all paths needed to build the project; edit as needed
sources = {
	js: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'source/assets/js/app.js'],
	html: ['source/*.html'],
	htmlIncludes: ['source/includes/*.html'],
	sass: ['source/assets/sass/*.scss'],
	fonts: ['source/assets/fonts/*', 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*', 'node_modules/font-awesome/fonts/*'],
	images: ['source/assets/images/*.{png,gif,jpg,svg}'],
	favicons: ['source/assets/ico/**/*']
}

// browsersync configured here to use localhost 8888 as a proxy, assumes you have mamp up and running.
// refer to terminal output for full path to your project
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: "localhost:8888",
	    startPath: outputDir,
	    browser: ["firefox"],
	    notify: false
    });
});

// concat all js files and minify if env=production
gulp.task('js', function() {
	gulp.src(sources.js)
		.pipe(concat('scripts.js'))
		.pipe(gulpif(production, uglify()))
		.pipe(gulp.dest(outputDir + 'assets/js'));
});

// html task updates build folder and processes includes
gulp.task('html', function() {
	gulp.src(sources.html)
	    .pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }))
		.pipe(gulp.dest(outputDir));
});

// basic sass compiling task
gulp.task('sass', function() {
	gulp.src(sources.sass)
		.pipe(sass({
			outputStyle: sassStyle
		}).on('error', sass.logError))
		.pipe(gulp.dest(outputDir + 'assets/css'))
		.pipe(browserSync.stream());
});

// basic fonts task, move them to build dir
gulp.task('fonts', function() {
	gulp.src(sources.fonts)
		.pipe(gulp.dest(outputDir + 'assets/fonts'));
});

// basic favicons task, move them to build dir
gulp.task('favicons', function() {
	gulp.src(sources.favicons)
		.pipe(gulp.dest(outputDir + 'assets/ico'));
});

// optimize images and move them to build dir
gulp.task('images', function() {
	gulp.src(sources.images)
		.pipe(imageop({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(outputDir + 'assets/images'));
});

// clean task: empties build folder for a fresh start each time the project spins up
// ---------------------------------------------------------------------------------
gulp.task('clean', function(cb) {
    return del(['builds'], cb);
});

// watch all file types for changes
gulp.task('watch', function() {
	gulp.watch(sources.js, ['js']).on('change', reload);
	gulp.watch(sources.sass, ['sass']).on('change', reload);
	gulp.watch(sources.images, ['images']).on('change', reload);
	
	// force html files to reload via browsersync
	gulp.watch(sources.html.concat(sources.htmlIncludes), ['html']).on('change', reload);
    gulp.watch(sources.html).on('change', reload);
});

// default task
gulp.task('default', ['clean'], function() {
  // Default task to run for local dev
  gulp.start('js', 'sass', 'fonts', 'favicons','html', 'images', 'serve', 'watch');
});

