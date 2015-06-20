var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var config = require('../config').less;

gulp.task('lessprod', function () {	
	return gulp.src(config.src)
		.pipe(less())
		.pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
		.pipe(rename('r-select.default.css'))
		.pipe(gulp.dest(config.dest));
});