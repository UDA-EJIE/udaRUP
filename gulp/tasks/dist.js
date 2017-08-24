var gulp = require('gulp');
var fs = require('fs');

var config = require('../config.js').config;
var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json','utf8'));




gulp.task('dist:x21a', function () {
	gulp.src(['!./dist/css/main.css','./dist/**/*.*'])
		.pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/'));

	gulp.src(['./dist/css/main.css'])
		.pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/x21a/styles'));
});
