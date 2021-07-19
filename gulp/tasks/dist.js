const gulp = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const cssWrap = require('gulp-css-wrap');
const rename = require('gulp-rename');

gulp.task('dist:x21a:clean', function () {
    return gulp.src('../udaDemoApp/x21aStatics/WebContent/5x/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('dist:x21a:copy', function () {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/5x/rup/'));
});

gulp.task('dist:x21a', gulp.series(
    'dist:x21a:clean',
    'dist:x21a:copy'
));

gulp.task('dist:templates:clean', function () {
    return gulp.src('../udaTemplates/templates/statics/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('dist:templates:copy', function () {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaTemplates/templates/statics/rup/'));
});

gulp.task('dist:templates', gulp.series(
    'dist:templates:clean',
    'dist:templates:copy'
));

gulp.task('dist:portal', function (callback) {
    gulp.src('./dist/css/rup.css')
        .pipe(cssWrap({
            selector: '.r01gContainer'
        }))
        .pipe(gulp.dest('./dist/portal/'))
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(rename('rup.min.css'))
        .pipe(gulp.dest('./dist/portal/'));
    gulp.src('./dist/css/cursors/**/*.*').pipe(gulp.dest('./dist/portal/cursors'));
    gulp.src('./dist/css/images/**/*.*').pipe(gulp.dest('./dist/portal/images'));
    callback();
});