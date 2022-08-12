const gulp = require('gulp');
const { sass_rupTheme, sass_rupJqueryuiTheme, sass_rupBase } = require('./sass.js');

// WATCHES:sass

// gulp.task('watch:sass:bootstrap', function () {
//     gulp.watch(['./scss/custom-bootstrap.scss', './scss/bootstrap/*.scss'], gulp.series('sass:bootstrap'));
// });


gulp.task('watch:src', gulp.series(
		// 'watch:sass:bootstrap',
		watch_sass_rupBase,
		watch_sass_rupTheme,
		watch_sass_rupJqueryuiTheme,
		watch_table,
		watch_templates_rup
		// 'watch:minimize:js:rup-classic'
	));

// Watches css

function watch_sass_rupBase() {
	gulp.watch(['./scss/rup-base.scss', './scss/base/*.scss'], gulp.series(sass_rupBase));
};

function watch_sass_rupTheme() {
	gulp.watch(['./scss/rup-theme.scss', './scss/theme/*.scss'], gulp.series(sass_rupTheme));
};

function watch_sass_rupJqueryuiTheme() {
	gulp.watch(['./scss/rup-jqueryui-theme.scss', './scss/jquery-ui/*.scss'], gulp.series(sass_rupJqueryuiTheme));
};



// WATCHES:minimize

// gulp.task('watch:minimize:css:rup', function () {
//     gulp.watch(['./dist/css/bootstrap.css', './dist/css/rup.css'], gulp.series('minimize:css:rup'));
// });
//
// gulp.task('watch:minimize:css:rup-classic', function () {
//     gulp.watch(['./dist/css/rup-classic.css'], gulp.series('minimize:css:rup-classic'));
// });

gulp.task('watch:minimize:js:rup', function () {
	gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], gulp.series('minimize:js:rup'));
});

// gulp.task('watch:minimize:js:rup-classic', function () {
//     gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], gulp.series('minimize:js:rup-classic'));
// });

// WATCHES:templates

gulp.task('watch:templates:demo', function () {
	gulp.watch('./demoResponsive/**/*.hbs', gulp.series('templates:app:rup'));
});

// gulp.task('watch:templates:rup-classic', function () {
//     gulp.watch('./demo/**/*.hbs', gulp.series('templates:app:rup-classic'));
// });

function watch_templates_rup() {
	gulp.watch('./src/templates/*.hbs', gulp.series('templates:rup'));
};


// WATCHES: build table

function watch_table() {
	gulp.watch(['./src/rup_table/**/*.js'], gulp.series('rup:build:table'));

};


// WATHCES: uglify

gulp.task('watch:uglify:css:rup-base', function () {
	gulp.watch(['./build/css/rup-base.css'], gulp.series('uglify:css:rup-base'));

});

gulp.task('watch:uglify:css:rup-jqueryui-theme', function () {
	gulp.watch(['./build/css/rup-jqueryui-theme.css'], gulp.series('uglify:css:rup-jqueryui-theme'));

});

gulp.task('watch:uglify:css:rup-theme', function () {
	gulp.watch(['./build/css/rup-theme.css'], gulp.series('uglify:css:rup-theme'));

});

gulp.task('watch:uglify:js:rup', function () {
	gulp.watch(['./build/js/rup.js'], gulp.series('uglify:js:rup'));

});

// WATHCES: Dist
gulp.task('watch:dist', function () {
	gulp.watch(['./build/**/*.*'], gulp.series('dist:copy'));

});

gulp.task('watch:x21a', function () {
	gulp.watch(['./dist/**/*.*'], gulp.series('dist:x21a'));

});
