const gulp = require('gulp');
const clean = require('gulp-clean');
const requireDir = require('require-dir');

// Require all tasks.
requireDir('./gulp/tasks', {
    recurse: true
});

gulp.task('clean', function () {
    return gulp.src('./dist/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('build', gulp.series(
    'clean',
    'build:resources',
    'build:js'
));

// WATCHES
gulp.task('watch', function(){
    return gulp.watch(['./dist/**/*.*'], gulp.series('dist:x21a'));
});