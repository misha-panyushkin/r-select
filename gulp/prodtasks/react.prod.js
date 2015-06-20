var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')
var config = require('../config').react;

gulp.task('reactprod', function () {
  return gulp.src(config.src)
    .pipe(browserify({
    	transform: [reactify],
		debug : false
	}))
	.pipe(rename('r-select.core.js'))
	.pipe(gulp.dest(config.dest))
	.pipe(uglify())
	.pipe(rename('r-select.core.min.js'))
    .pipe(gulp.dest(config.dest));
});