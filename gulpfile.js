/* global require */
var gulp = require('gulp');
var runSequence = require('run-sequence');

var requireDir  = require('require-dir');
// Require all tasks.
requireDir( './gulp/tasks', { recurse: true });



gulp.task('default', function () {
	// place code for your default task here
});

gulp.task('dist', function(callback){
	runSequence('dist:build', 'dist:copy', callback);
});


// gulp.task('dist', [
//   'dist:build',
//   'dist:copy',
//   'dist:portal'
// ]);

gulp.task('dist:build', ['build:uglify']);





gulp.task('build', function(callback){
	runSequence('build:resources', 'build:css', 'build:uglify', callback);

});


// WATCHES

gulp.task('watch', [
	// 'watch:sass:bootstrap',
	'watch:sass:rup-base',
	'watch:sass:rup-theme',
	'watch:sass:rup-jqueryui-theme',
	'watch:table',
    'watch:templates:demo',
	'watch:templates:rup',
	// 'watch:templates:rup-core',
	'watch:minimize:js:rup',
	'watch:dist',
	'watch:x21a'
	// 'watch:minimize:js:rup-classic'
]);


gulp.task('watch:dist', [
	// 'watch:sass:bootstrap',
	'watch:sass:rup-base',
	'watch:sass:rup-theme',
	'watch:sass:rup-jqueryui-theme',
	'watch:buildTable',
	'watch:templates:demo',
	'watch:templates:rup',
	// 'watch:templates:rup-core',
	'watch:minimize:js:rup',
	// 'watch:minimize:js:rup-classic'

	'watch:uglify:css:rup-base',
	'watch:uglify:css:rup-jqueryui-theme',
	'watch:uglify:css:rup-theme',
	'watch:uglify:js:rup',
	'watch:dist',
	'watch:x21a'
]);



gulp.task('dist:prepare', function () {
	gulp.src('./css/basic-theme/images/**').pipe(gulp.dest('./dist/css/images'));
	gulp.src('./css/basic-theme/cursors/**').pipe(gulp.dest('./dist/css/cursors'));
});
