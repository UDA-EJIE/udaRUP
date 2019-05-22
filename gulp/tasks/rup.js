/* global require */

var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');

var config = require('../config.js').config;
var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));

gulp.task('rup:build:table', function (cb) {
	console.log('Minimizando RUP Table...');
	return gulp.src(minimizeConf.rupTableFiles, {
		cwd: 'src'
	})
		.pipe(concat('rup.jqtable.js'))
		.pipe(wrap(`
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["jquery","./rup.base","./rup.form", "./rup.contextMenu", "./rup.toolbar","./rup.report","./core/utils/form2object"], factory );
         } else {

            // Browser globals
            factory( jQuery );
         }
        } ( function( $ ) {
          <%= contents %>
        }));
        `))
		.pipe(gulp.dest('src'));
});
