var gulp        = require('gulp'),            //automate and enhance your workflow
	sass        = require('gulp-sass'),       //allows use of Sass/Scss
    cleanCSS = require('gulp-clean-css'),     //minify CSS
	connect     = require('gulp-connect'),    //allows live reload
	bourbon     = require('node-bourbon'),    //allows mixin library for Sass.
    plumber     = require('gulp-plumber'),    //preview gulp crash error
    sourcemaps  = require('gulp-sourcemaps'), //handleing sourcemaps
    react       = require('gulp-react');      //allows use of react.js


bourbon.with('sass'); //activate bourbon with SASS

/**
* test gulp task
*
* @retun hello world
*/
gulp.task('hello', function(){
	console.log("hello world");
});

/**
* Compile Sass/Scss
*
* @retun css and live reload
*/
gulp.task('compileSass', function(){
	gulp.src("_prod/_src/sass/style.scss")
    .pipe(plumber())
	.pipe(sass({ includePaths: bourbon.includePaths }))
//    .pipe(cleanCSS({compatibility: 'ie8'}))
//    .pipe(cleanCSS({debug: true}, function(details) {
//            console.log(details.name + ': ' + details.stats.originalSize);
//            console.log(details.name + ': ' + details.stats.minifiedSize);
//        }))
	.pipe(gulp.dest('_prod/_src/css'))
	.pipe(connect.reload());
});

/**
* HTML
*
* @retun html and reload
*/
gulp.task('html', function(){
	return gulp.src('_prod/*.html')
	.pipe(connect.reload());
});

/**
* CSS
*
* @retun css and reload
*/
gulp.task('style', function(){
	return gulp.src('_prod/_src/css/*.*css')
	.pipe(connect.reload());
});

/**
* SCRIPTS
*
* @retun js and reload
*/
gulp.task('script', function(){
	return gulp.src('_prod/_src/scripts/*.js')
	.pipe(connect.reload());
});

/**
* WATCH
*
* tracks files updates
*/
gulp.task('watch', ['connect'], function(){
	gulp.watch('_prod/_src/sass/*.*css', ['compileSass']);
	gulp.watch('_prod/*.html', ['html']);
	gulp.watch('_prod/_src/scripts/*.js', ['script']);
	gulp.watch('_prod/_src/css/*.*css', ['style']);
});

/**
* CONNECT
*
* Live reload
*/
gulp.task('connect', function(){
	connect.server({
		root: [__dirname],
		livereload: true,
		port: 3000
	});
});

/**
* React
*
* @return react
*/
gulp.task('react', function () {
    return gulp.src('template.jsx')
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

/**
* DEFAULT
*
* type 'gulp' in prompt to start using gulp
*/
gulp.task('default', ['watch'], function(){});