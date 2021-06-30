/*eslint no-console: off */

const gulp = require('gulp');
const clean = require('gulp-clean');
const jsdoc = require('gulp-jsdoc3');
const jsdoc2md = require('jsdoc-to-markdown');
const tap = require('gulp-tap');
const fs = require('fs');

gulp.task('doc:api:clean', function () {
    return gulp.src('./doc/api/**/.*', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('doc:html', function (cb) {
    var config = require('../../jsdoc.conf.json');
    gulp.src(['README.md', './src/*.js']).pipe(jsdoc(config, cb));
});

var runJsdoc2md = function (fileSource, outputPath) {
    var basename;
    return gulp.src(fileSource)
        .pipe(tap(function (file) {
            basename = file.relative.split('.js')[0];
            console.log('outpath ' + outputPath + ' File ' + file.path + '  ' + basename);

            var output = jsdoc2md.renderSync({
                files: file.path
            });
            fs.writeFileSync(outputPath + basename + '.md', output);
        }));
};

gulp.task('doc:api:table', function () {
    var fileSource = 'src/rup_table/rup*.js';
    var outputPath = './doc/api/';

    return runJsdoc2md(fileSource, outputPath);
});

gulp.task('doc', gulp.series(
    'doc:api:clean',
    'doc:api:table',
    function () {
        var fileSource = 'src/rup*.js';
        var outputPath = './doc/api/';

        return runJsdoc2md(fileSource, outputPath);
    }
));
