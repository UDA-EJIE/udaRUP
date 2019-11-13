/*eslint no-console: off */

require('./sass.js');
require('./rup.js');
require('./templates.js');
require('./uglify.js');

const gulp = require('gulp');
const deleteLines = require('gulp-delete-lines');


gulp.task('build:sass', gulp.series(
    'sass:rup-base',
    'sass:rup-theme',
    'sass:rup-jqueryui-theme',
    'sass:main',
    function (done) {
        // build:sass code here
        done();
    }
));

gulp.task('build:js', gulp.series(
    'rup:build:table',
    'templates:demo',
    'templates:rup',
    function (done) {
        // build:js code here
        done();
    }
));

gulp.task('build:uglify', gulp.series(
    'uglify:css:rup-base',
    'uglify:css:rup-jqueryui-theme',
    'uglify:css:rup-theme',
    function (done) {
        // build:uglify code here
        done();
    }
));

gulp.task('build:css', gulp.series(
    'build:sass',
    'build:js',
    'build:uglify',
    function (done) {
        // build:css code here
        done();
    }
));

gulp.task('build:resources', function (callback) {

    // Generamos la carpeta de distribuibles
    console.log('Generando la carpeta de distribuibles...');

    // dist/html
    console.log('dist/html');
    gulp.src(['./assets/html/**/*.*'])
        .pipe(gulp.dest('dist/html'));

    // dist/css/images
    console.log('dist/css/images');
    gulp.src(['./assets/images/**/*.*'])
        .pipe(gulp.dest('./dist/css/images'));

    // dist/css/cursors
    console.log('dist/css/cursors');
    gulp.src(['./assets/cursors/**/*.*'])
        .pipe(gulp.dest('./dist/css/cursors'));

    // dist/css/fonts
    console.log('dist/css/fonts');
    gulp.src(['./assets/fonts/*.*'])
        .pipe(gulp.dest('./dist/css/fonts'))
        .pipe(gulp.dest('./dist/portal/fonts'));

    // resources
    console.log('dist/resources');
    gulp.src(['./i18n/*.json'])
        .pipe(gulp.dest('./dist/resources'));

    // externals
    console.log('externals ');

    // bootstrap
    console.log('bootstrap');
    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.*'])
        .pipe(gulp.dest('./dist/css/externals/bootstrap'))
        .pipe(gulp.dest('./dist/portal/externals/bootstrap'));

    gulp.src(['./node_modules/bootstrap/dist/js/*bundle*.*'])
        .pipe(gulp.dest('./dist/js/externals/bootstrap'));

    // @mdi/font (fuente iconos material)
    console.log('@mdi/font (fuente iconos material)');
    gulp.src(['./node_modules/@mdi/font/fonts/materialdesignicons-*.*'])
        .pipe(gulp.dest('./dist/css/externals/icons'))
        .pipe(gulp.dest('./dist/portal/externals/icons'));

    // tether
    console.log('tether');
    gulp.src(['./node_modules/tether/dist/css/tether\.*'])
        .pipe(gulp.dest('./dist/css/externals/tether'));

    gulp.src(['./node_modules/tether/dist/js/tether\.*'])
        .pipe(gulp.dest('./dist/js/externals/tether'));

    // popper.js
    console.log('popper');
    gulp.src(['./node_modules/popper.js/dist/umd/popper\.*'])
        .pipe(gulp.dest('./dist/js/externals/popper'));

    // jasmine
    console.log('jasmine');
    gulp.src(['./node_modules/jasmine-core/lib/jasmine-core/jasmine.css'])
        .pipe(gulp.dest('./dist/css/externals/jasmine'))
        .pipe(gulp.dest('./dist/portal/externals/jasmine'));

    gulp.src(['./node_modules/jasmine-core/images/*favicon*.png'])
        .pipe(gulp.dest('./dist/css/externals/jasmine'))
        .pipe(gulp.dest('./dist/portal/externals/jasmine'));

    gulp.src(['./node_modules/jasmine-core/lib/jasmine-core/*jasmine*.js', './node_modules/jasmine-core/lib/jasmine-core/boot.js'])
        .pipe(gulp.dest('./dist/js/externals/jasmine'));

    gulp.src(['./node_modules/jasmine-jquery/lib/*jasmine*.js'])
        .pipe(gulp.dest('./dist/js/externals/jasmine'));

    //Todo test
    gulp.src(['./spec/**/*.spec.js'])
        .pipe(deleteLines({
            'filters': [
                /import\s+/i
            ]
        }))
        .pipe(gulp.dest('./dist/js/test'));

    //Se traspasa el demo
    gulp.src(['./demo/demo-idx.html'])
        .pipe(gulp.dest('./dist/html'));

    gulp.src(['./spec/rup.config.js'])
        .pipe(gulp.dest('./dist/js/test'));

    gulp.src('./spec/common/specCommonUtils.js')
        .pipe(gulp.dest('./dist/js/test/common'));

    // Archivos fuentes
    gulp.src(['./src/**/*'])
        .pipe(gulp.dest('./dist/js/src'));

    callback();
});