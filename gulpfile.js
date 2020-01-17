const gulp = require('gulp');
const clean = require('gulp-clean');
const requireDir = require('require-dir');
const run = require('gulp-run');

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

gulp.task('run-npm-all-x21a', function() {
    return run('npm run all:x21a').exec();
});

// WATCHES
gulp.task('watch', function(){
    return gulp.watch(
        ['./src/**/*.*', 
            '!./src/templates.js', 
            '!./src/rup.jqtable.js', 
            './scss/**/*.*'], 
        gulp.series('run-npm-all-x21a')
    );
});