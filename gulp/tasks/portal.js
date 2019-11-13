const gulp = require('gulp');
const cssWrap = require('gulp-css-wrap');

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