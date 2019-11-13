const gulp = require('gulp');

var requireDir = require('require-dir');
// Require all tasks.
requireDir('./gulp/tasks', {
    recurse: true
});


gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('dist:build', gulp.series(
    'build:uglify'
));

gulp.task('dist', gulp.series(
    'dist:build'
    // 'dist:copy'
));

gulp.task('build', gulp.series(
    'build:resources',
    'build:css',
    'build:uglify'
));

// WATCHES
gulp.task('watch', gulp.series(
    'watch:sass:rup-base',
    'watch:sass:rup-theme',
    'watch:sass:rup-jqueryui-theme',
    'watch:table',
    'watch:templates:demo',
    'watch:templates:rup',
    'watch:minimize:js:rup',
    'watch:dist',
    'watch:x21a'
));

gulp.task('watch:dist', gulp.series(
    'watch:sass:rup-base',
    'watch:sass:rup-theme',
    'watch:sass:rup-jqueryui-theme',
    'watch:table',
    'watch:templates:demo',
    'watch:templates:rup',
    'watch:minimize:js:rup',
    'watch:uglify:css:rup-base',
    'watch:uglify:css:rup-jqueryui-theme',
    'watch:uglify:css:rup-theme',
    'watch:uglify:js:rup',
    'watch:dist',
    'watch:x21a'
));

gulp.task('dist:prepare', function () {
    gulp.src('./css/basic-theme/images/**').pipe(gulp.dest('./dist/css/images'));
    gulp.src('./css/basic-theme/cursors/**').pipe(gulp.dest('./dist/css/cursors'));
});