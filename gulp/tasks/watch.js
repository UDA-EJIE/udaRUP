var gulp = require('gulp');

// WATCHES:sass

// gulp.task('watch:sass:bootstrap', function () {
//     gulp.watch(['./scss/custom-bootstrap.scss', './scss/bootstrap/*.scss'], ['sass:bootstrap']);
// });


gulp.task('watch:src', [
	// 'watch:sass:bootstrap',
	'watch:sass:rup-base',
	'watch:sass:rup-theme',
	'watch:sass:rup-jqueryui-theme',
	'watch:table',
	'watch:templates:rup'

	// 'watch:minimize:js:rup-classic'
]);

// Watches css

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

// gulp.task('watch:minimize:css:rup', function () {
//     gulp.watch(['./dist/css/bootstrap.css', './dist/css/rup.css'], ['minimize:css:rup']);
// });
//
// gulp.task('watch:minimize:css:rup-classic', function () {
//     gulp.watch(['./dist/css/rup-classic.css'], ['minimize:css:rup-classic']);
// });

gulp.task('watch:minimize:js:rup', function () {
	gulp.watch(['./src/**/*.js', '!./src/rup_jqtable/**/*.js'], ['minimize:js:rup']);
});

// gulp.task('watch:minimize:js:rup-classic', function () {
//     gulp.watch(['./src/**/*.js', '!./src/rup_jqtable/**/*.js'], ['minimize:js:rup-classic']);
// });

// WATCHES:templates

gulp.task('watch:templates:demo', function () {
	gulp.watch('./demoResponsive/**/*.hbs', ['templates:app:rup']);
});

// gulp.task('watch:templates:rup-classic', function () {
//     gulp.watch('./demo/**/*.hbs', ['templates:app:rup-classic']);
// });

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
