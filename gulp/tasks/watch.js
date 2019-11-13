const gulp = require('gulp');

// WATCHES:sass
gulp.task('watch:sass:rup-base', function () {
    gulp.watch(['./scss/rup-base.scss', './scss/base/*.scss'], gulp.series('sass:rup-base'));
});

gulp.task('watch:sass:rup-theme', function () {
    gulp.watch(['./scss/rup-theme.scss', './scss/theme/*.scss'], gulp.series('sass:rup-theme'));
});

gulp.task('watch:sass:rup-jqueryui-theme', function () {
    gulp.watch(['./scss/rup-jqueryui-theme.scss', './scss/jquery-ui/*.scss'], gulp.series('sass:rup-jqueryui-theme'));
});

// WATCHES:templates
gulp.task('watch:templates:demo', function () {
    gulp.watch('./demoResponsive/**/*.hbs', gulp.series('templates:app:rup'));
});
gulp.task('watch:templates:rup', function () {
    gulp.watch('./src/templates/*.hbs', gulp.series('templates:rup'));
});

// WATCHES: build table
gulp.task('watch:table', function () {
    gulp.watch(['./src/rup_jqtable/**/*.js'], gulp.series('rup:build:table'));

});

// WATHCES: Dist
gulp.task('watch:x21a', function () {
    gulp.watch(['./dist/**/*.*'], gulp.series('dist:x21a'));
});

gulp.task('watch:src', gulp.series(
    'watch:sass:rup-base',
    'watch:sass:rup-theme',
    'watch:sass:rup-jqueryui-theme',
    'watch:table',
    'watch:templates:rup'
));