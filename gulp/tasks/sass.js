var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var config = require('../config.js').config;
// Build CSS FILES FROM SASS

gulp.task('sass:all', ['sass:rup-base','sass:rup-theme','sass:rup-jqueryui-theme']);




// Legacy

// gulp.task('sass:bootstrap', function () {
//     gulp.src(config.dirs.sass + config.files.sass.customBootstrapScss)
//         .pipe(sass.sync({
//             precision: 8
//         }).on('error', sass.logError))
//         .pipe(rename(function (path) {
//             path.basename = 'bootstrap';
//         }))
//         .pipe(gulp.dest(config.dirs.buildCss));
// });

gulp.task('sass:rup-theme', function () {
    return gulp.src(config.dirs.sass + config.files.sass.rupScss)
        .pipe(sass.sync({
            outputStyle: 'nested ',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dirs.buildCss));

        // legacy file: rup-rwd.css
        // .pipe(rename(function (path) {
        //     path.basename = 'rup-rwd';
        // }))
        // .pipe(gulp.dest(config.dirs.buildCss));
});

gulp.task('sass:rup-jqueryui-theme', function () {
    return gulp.src(config.dirs.sass + config.files.sass.rupJQueryuiTheme)
        .pipe(sass.sync({
            outputStyle: 'nested ',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dirs.buildCss))

});

gulp.task('sass:rup-base', function () {
    return gulp.src(config.dirs.sass + config.files.sass.rupClassicScss)
        .pipe(sass.sync({
            outputStyle: 'nested ',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dirs.buildCss));

        // legacy file: rup-rwd.css
        // .pipe(rename(function (path) {
        //     path.basename = 'rup-classic';
        // }))
        // .pipe(gulp.dest(config.dirs.buildCss));
});
