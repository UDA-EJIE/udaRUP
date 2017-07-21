var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat');


gulp.task('templates:app:rup-classic', function () {
	var templates = gulp.src('demo/app/**/*.hbs')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'App.Templates',
			noRedeclare: true, // Avoid duplicate declarations
			processName: function (filePath) {
				// Allow nesting based on path using gulp-declare's processNameByPath()
				// You can remove this option completely if you aren't using nested folders
				// Drop the client/templates/ folder from the namespace path by removing it from the filePath
				return declare.processNameByPath(filePath.replace('client/templates/', ''));
			}
		}));
	// .pipe(concat('templates.js'))
	// //.pipe(defineModule('amd'))
	// .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
	// .pipe(gulp.dest('demo/'));

	var partials = gulp.src(['demo/app/**/_*.hbs'])
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
			imports: {
				processPartialName: function (fileName) {
					// Strip the extension and the underscore
					// Escape the output with JSON.stringify
					return JSON.stringify(path.basename(fileName, '.js').substr(1));
				}
			}
		}));

	return merge(partials, templates)
		.pipe(concat('templates.js'))
		.pipe(wrap('define([\'handlebars\'], function(Handlebars) { <%= contents %>  return this[\'App\'];});'))
		.pipe(gulp.dest('demo/'));
});

gulp.task('templates:app:rup', function () {
	var templates = gulp.src('demoResponsive/app/**/*.hbs')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'App.Templates',
			noRedeclare: true, // Avoid duplicate declarations
			processName: function (filePath) {
				// Allow nesting based on path using gulp-declare's processNameByPath()
				// You can remove this option completely if you aren't using nested folders
				// Drop the client/templates/ folder from the namespace path by removing it from the filePath
				return declare.processNameByPath(filePath.replace('client/templates/', ''));
			}
		}));
	// .pipe(concat('templates.js'))
	// //.pipe(defineModule('amd'))
	// .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
	// .pipe(gulp.dest('demo/'));

	var partials = gulp.src(['demoResponsive/app/**/_*.hbs'])
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
			imports: {
				processPartialName: function (fileName) {
					// Strip the extension and the underscore
					// Escape the output with JSON.stringify
					return JSON.stringify(path.basename(fileName, '.js').substr(1));
				}
			}
		}));

	return merge(partials, templates)
		.pipe(concat('templates.js'))
		.pipe(wrap('define([\'handlebars\'], function(Handlebars) { <%= contents %>  return this[\'App\'];});'))
		.pipe(gulp.dest('demoResponsive/'));
});


gulp.task('templates:rup', function () {
	var templates = gulp.src('src/**/*.hbs')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Rup.Templates',
			noRedeclare: true // Avoid duplicate declarations
			// processName: function (filePath) {
			//     // Allow nesting based on path using gulp-declare's processNameByPath()
			//     // You can remove this option completely if you aren't using nested folders
			//     // Drop the client/templates/ folder from the namespace path by removing it from the filePath
			//     return declare.processNameByPath(filePath.replace('src/', ''));
			// }
		}));
	// .pipe(concat('templates.js'))
	// //.pipe(defineModule('amd'))
	// .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
	// .pipe(gulp.dest('demo/'));

	var partials = gulp.src(['src/**/_*.hbs'])
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
			imports: {
				processPartialName: function (fileName) {
					// Strip the extension and the underscore
					// Escape the output with JSON.stringify
					return JSON.stringify(path.basename(fileName, '.js').substr(1));
				}
			}
		}));

	return merge(partials, templates)
		.pipe(concat('templates.js'))
	// .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['Rup'];});"))
	//
		.pipe(wrap(`
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["handlebars" ], factory );
         } else {

            // Browser globals
            factory( Handlebars );
         }
        } ( function( Handlebars ) {
          <%= contents %>
          return this['Rup'];
        }
        ));
        `))
		.pipe(gulp.dest('build/src/'))
		.pipe(gulp.dest('src/'));
});
