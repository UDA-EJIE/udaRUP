const gulp = require('gulp');

gulp.task('dist:x21a', function () {
    gulp.src(['!./dist/css/main.css', './dist/**/*.*'])
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/4x/rup/'));

    gulp.src(['./dist/css/main.css'])
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/4x/x21a/styles'));
});