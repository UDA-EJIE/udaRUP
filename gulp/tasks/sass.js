/*global require */

const gulp = require('gulp');
const sass = require('gulp-sass');

const config = require('../config.js').config;

gulp.task('sass:all', gulp.series(
		sass_rupBase, 
		sass_rupTheme, 
		sass_rupJqueryuiTheme
	));

function sass_rupTheme(callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupScss)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));
	
	callback();
}

function sass_rupJqueryuiTheme(callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupJQueryuiTheme)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));
	
	callback();
}

function sass_rupBase(callback) {
	gulp.src(config.dirs.sass + config.files.sass.rupClassicScss)
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));

	callback();
}

function sass_main(callback) {
	gulp.src(config.dirs.sass + 'main.scss')
		.pipe(sass.sync({
			outputStyle: 'nested ',
			precision: 8,
		}).on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.buildCss));
	
	callback();
}

module.exports = {
	sass_rupTheme,
	sass_rupJqueryuiTheme,
	sass_rupBase,
	sass_main
}
