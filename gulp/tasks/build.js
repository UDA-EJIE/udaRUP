var gulp = require('gulp');
const runSequence = require('run-sequence');


gulp.task('build:all', ['build:css', 'build:js']);
gulp.task('build:dist', function(callback){
	runSequence('build:css', 'build:js', 'build:uglify', callback);
});



gulp.task('build:css', [
	'sass:rup-base',
	'sass:rup-theme',
	'sass:rup-jqueryui-theme',
	'sass:main'
	// 'minimize:css:rup-classic',
	// 'minimize:css:rup'
]);


gulp.task('build:js', [
	'rup:build:table',
	'templates:app:rup',
	'templates:app:rup-classic',
	'templates:rup',
	'minimize:js:rup'
]);

gulp.task('build:uglify', [
	'uglify:css:rup-base',
	'uglify:css:rup-jqueryui-theme',
	'uglify:css:rup-theme',
	'uglify:js:rup'
]);
