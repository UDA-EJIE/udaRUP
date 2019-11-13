/*eslint no-console: off */

const gulp = require('gulp');
const fs = require('fs');
const concat = require('gulp-concat');
const minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));

// MINIMIZE
gulp.task('minimize:js:rup', function () {
    console.log('Generando rup.js...');
    gulp.src(minimizeConf.rupJsFiles)
        .pipe(concat('rup.js'))
        .pipe(gulp.dest('./build/js'));
});