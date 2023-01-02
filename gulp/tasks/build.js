/*eslint no-console: off */

require('./templates.js');

const gulp = require('gulp');
const deleteLines = require('gulp-delete-lines');
const fs = require('fs');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
	return gulp.src('./src/**/*.js')
		.pipe(modernizr('modernizr.js', {
			minify: false,
			options: [
				'addTest',
				'atRule',
				'domPrefixes',
				'hasEvent',
				'html5shiv',
				'html5printshiv',
				'load',
				'mq',
				'prefixed',
				'prefixes',
				'prefixedCSS',
				'setClasses',
				'testAllProps',
				'testProp',
				'testStyles'
			]
		}))
		.pipe(gulp.dest('./src/external'))
});

gulp.task('build:js', gulp.series(
    'templates',
    function (done) {
        // build:js code here
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
        .pipe(gulp.dest('./dist/resources'))
        .pipe(gulp.dest('./demo/rup/resources'));

    // externals
    console.log('externals ');

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