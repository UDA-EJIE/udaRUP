/*global require */

var gulp = require('gulp');
var sass = require('gulp-sass');

var config = require('../config.js').config;

gulp.task('sass:all', ['sass:rup-base','sass:rup-theme','sass:rup-jqueryui-theme']);

gulp.task('sass:rup-theme', function (callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupScss)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));

	callback();
});

gulp.task('sass:rup-jqueryui-theme', function (callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupJQueryuiTheme)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));

	callback();
});

gulp.task('sass:rup-base', function (callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupClassicScss)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));

	callback();
});

gulp.task('sass:main', function (callback) {
	gulp.src(config.dirs.sass + 'main.scss')
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));

	callback();
});
