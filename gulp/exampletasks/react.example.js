var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')
var config = require('../config').example.react;

gulp.task('reactexample', function () {
  return gulp.src(config.src)
    .pipe(browserify({
    	transform: [reactify],
		debug : false
	}))
	.pipe(rename('app.js'))
	.pipe(gulp.dest(config.dest));
});