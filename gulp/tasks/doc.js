/*eslint no-console: off */

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const jsdoc2md = require('jsdoc-to-markdown');
const tap = require('gulp-tap');
const fs = require('fs');

gulp.task('doc:html', function (cb) {
    var config = require('../../jsdoc.conf.json');
    //gulp.src(['README.md', './src/**/*.js']).pipe(jsdoc(config, cb));
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

gulp.task('doc:api', function () {


    var fileSource = 'src/rup*.js';
    var outputPath = './doc/api/';

    runJsdoc2md(fileSource, outputPath);
    //rup_jqtable
    fileSource = 'src/rup_jqtable/rup*.js';
    //outputPath = './doc/api/';
    runJsdoc2md(fileSource, outputPath);
    //rup_table antes datatable
    fileSource = 'src/table/*.js';
    //outputPath = './doc/api/';
    runJsdoc2md(fileSource, outputPath);
    //outputPath = './doc/api/';
    runJsdoc2md(fileSource, outputPath);
});

gulp.task('jsdocFile', function () {
    var filePath = 'src/rup_jqtable/';
    var basename = 'rup.jqtable.report';
    var outputPath = './doc/api/';
    jsdoc2md.render({
        files: filePath + basename + '.js'
    }).then(output => fs.writeFile(outputPath + basename + '.md', output));
});