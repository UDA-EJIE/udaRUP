var gulp = require('gulp');

// WATCHES:sass

gulp.task('watch:sass:bootstrap', function () {
    gulp.watch(['./scss/custom-bootstrap.scss', './scss/bootstrap/*.scss'], ['sass:bootstrap']);
});

gulp.task('watch:sass:rup-classic', function () {
    gulp.watch(['./scss/rup-classic.scss', './scss/base/*.scss'], ['sass:rup-classic']);
});

gulp.task('watch:sass:rup', function () {
    gulp.watch(['./scss/rup.scss', './scss/theme/*.scss'], ['sass:rup']);
});

// WATCHES:minimize

gulp.task('watch:minimize:css:rup', function () {
    gulp.watch(['./dist/css/bootstrap.css', './dist/css/rup.css'], ['minimize:css:rup']);
});

gulp.task('watch:minimize:css:rup-classic', function () {
    gulp.watch(['./dist/css/rup-classic.css'], ['minimize:css:rup-classic']);
});

gulp.task('watch:minimize:js:rup', function () {
    gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], ['minimize:js:rup']);
});

gulp.task('watch:minimize:js:rup-classic', function () {
    gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], ['minimize:js:rup-classic']);
});

// WATCHES:templates

gulp.task('watch:templates:rup', function () {
    gulp.watch('./demoResponsive/**/*.hbs', ['templates:app:rup']);
});

gulp.task('watch:templates:rup-classic', function () {
    gulp.watch('./demo/**/*.hbs', ['templates:app:rup-classic']);
});

gulp.task('watch:templates:rup-core', function () {
    gulp.watch('./src/templates/*.hbs', ['templates:rup']);
});


// WATCHES: build table

gulp.task('watch:buildTable', function () {
    gulp.watch(['./src/rup_table/**/*.js'], ['rup:build:table']);

});
