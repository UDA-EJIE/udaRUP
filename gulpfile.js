var gulp = require('gulp');

var requireDir  = require('require-dir');
// Require all tasks.
requireDir( './gulp/tasks', { recurse: true });



gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('dist', [
  'dist:build',
  'dist:copy'
]);

gulp.task('dist:build', [
  'uglify:css:rup',
  'uglify:css:rup-classic',
  'uglify:js:rup',
  'uglify:js:rup-classic'
]);





gulp.task('build', [
  'sass:bootstrap',
  'sass:rup-classic',
  'sass:rup',
  'rup:build:table',
  'minimize:css:rup-classic',
  'minimize:css:rup',
  'templates:app:rup',
  'templates:app:rup-classic',
  'templates:rup',
  'minimize:js:rup',
  'minimize:js:rup-classic'
]);


// WATCHES

gulp.task('watch', [
  'watch:sass:bootstrap',
  'watch:sass:rup-classic',
  'watch:sass:rup',
  'watch:buildTable',
  'watch:minimize:css:rup-classic',
  'watch:minimize:css:rup',
  'watch:templates:rup',
  'watch:templates:rup-classic',
  'watch:templates:rup-core',
  'watch:minimize:js:rup',
  'watch:minimize:js:rup-classic'
]);


gulp.task('dist:prepare', function () {
    gulp.src('./css/basic-theme/images/**').pipe(gulp.dest("./dist/css/images"));
    gulp.src('./css/basic-theme/cursors/**').pipe(gulp.dest("./dist/css/cursors"));
});
