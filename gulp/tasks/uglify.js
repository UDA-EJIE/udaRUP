/* global require */

var gulp = require('gulp');

var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('uglify:css:rup-base', function (callback) {
	console.log('Generando rup.classic.min.css...');
	gulp.src('./dist/css/rup-base.css')
		.pipe(concat('rup-base.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));

	callback();
});

gulp.task('uglify:css:rup-jqueryui-theme', function (callback) {
	console.log('Generando rup.classic.min.css...');
	gulp.src('./dist/css/rup-jqueryui-theme.css')
		.pipe(concat('rup-jqueryui-theme.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));

	callback();
});

gulp.task('uglify:css:rup-theme', function (callback) {
	console.log('Generando rup.classic.min.css...');
	gulp.src('./dist/css/rup-theme.css')
		.pipe(concat('rup-theme.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/css'));

	callback();
});
