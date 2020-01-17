const gulp = require('gulp');
const clean = require('gulp-clean');
const cssWrap = require('gulp-css-wrap');

gulp.task('dist:x21a:clean', function () {
    return gulp.src('../udaDemoApp/x21aStatics/WebContent/4x/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('dist:x21a:copy', function () {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/4x/rup/'));
});

gulp.task('dist:portal', function (callback) {
    gulp.src('./dist/css/**/*.css')
        .pipe(cssWrap({
            selector: '.r01gContainer'
        }))
        .pipe(gulp.dest('./dist/portal/'));
    gulp.src('./dist/css/cursors/**/*.*').pipe(gulp.dest('./dist/portal/cursors'));
    gulp.src('./dist/css/images/**/*.*').pipe(gulp.dest('./dist/portal/images'));
    callback();
});

gulp.task('dist:x21a', gulp.series(
    'dist:x21a:clean',
    'dist:x21a:copy'
));