const gulp = require('gulp');

// WATCHES:sass
gulp.task('watch:sass:rup-base', function () {
    gulp.watch(['./scss/rup-base.scss', './scss/base/*.scss'], ['sass:rup-base']);
});

gulp.task('watch:sass:rup-theme', function () {
    gulp.watch(['./scss/rup-theme.scss', './scss/theme/*.scss'], ['sass:rup-theme']);
});

gulp.task('watch:sass:rup-jqueryui-theme', function () {
    gulp.watch(['./scss/rup-jqueryui-theme.scss', './scss/jquery-ui/*.scss'], ['sass:rup-jqueryui-theme']);
});

// WATCHES:minimize
gulp.task('watch:minimize:js:rup', function () {
    gulp.watch(['./src/**/*.js', '!./src/rup_jqtable/**/*.js'], ['minimize:js:rup']);
});

// WATCHES:templates
gulp.task('watch:templates:demo', function () {
    gulp.watch('./demoResponsive/**/*.hbs', ['templates:app:rup']);
});
gulp.task('watch:templates:rup', function () {
    gulp.watch('./src/templates/*.hbs', ['templates:rup']);
});

// WATCHES: build table
gulp.task('watch:table', function () {
    gulp.watch(['./src/rup_jqtable/**/*.js'], ['rup:build:table']);

});

// WATHCES: uglify
gulp.task('watch:uglify:css:rup-base', function () {
    gulp.watch(['./build/css/rup-base.css'], ['uglify:css:rup-base']);

});
gulp.task('watch:uglify:css:rup-jqueryui-theme', function () {
    gulp.watch(['./build/css/rup-jqueryui-theme.css'], ['uglify:css:rup-jqueryui-theme']);

});
gulp.task('watch:uglify:css:rup-theme', function () {
    gulp.watch(['./build/css/rup-theme.css'], ['uglify:css:rup-theme']);

});
gulp.task('watch:uglify:js:rup', function () {
    gulp.watch(['./build/js/rup.js'], ['uglify:js:rup']);

});

// WATHCES: Dist
gulp.task('watch:dist', function () {
    gulp.watch(['./build/**/*.*'], ['dist:copy']);
});
gulp.task('watch:x21a', function () {
    gulp.watch(['./dist/**/*.*'], ['dist:x21a']);
});

gulp.task('watch:src', gulp.series(
    'watch:sass:rup-base',
    'watch:sass:rup-theme',
    'watch:sass:rup-jqueryui-theme',
    'watch:table',
    'watch:templates:rup'
));