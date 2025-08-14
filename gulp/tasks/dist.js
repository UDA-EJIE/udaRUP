const gulp = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const cssWrap = require('gulp-css-wrap');
const rename = require('gulp-rename');
const run = require('gulp-run');

gulp.task('dist:x21a:clean', function () {
    return gulp.src('../udaDemoApp/x21aStatics/WebContent/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

const copy = require('gulp-copy');

gulp.task('dist:x21a:copy2', function () {
	console.log('📁 Ejecutando copia segunda...');
    return 	gulp.src([
	        './dist/**/*.*',                  // ✅ Todos los archivos
	        '!./dist/css/images{,/**}',       // ❌ Excluye dist/css/images y su contenido
	        '!./dist/css/fonts{,/**}',        // ❌ Excluye dist/css/fonts y su contenido
	        '!./dist/css/cursors{,/**}',      // ❌ Excluye dist/css/cursors y su contenido
			'!./dist/**/*.txt',
	    ], { base: './dist' })
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/'));
});

gulp.task('dist:x21a:copy', function () {	
    console.log('📁 Ejecutando copia con fs-extra...');
    return run('node copyDistToStatics.js').exec();
});


gulp.task('dist:x21a', gulp.series(
    'dist:x21a:clean',
    'dist:x21a:copy',
	'dist:x21a:copy2'
));

gulp.task('dist:templates:clean', function () {
    return gulp.src('../udaTemplates/templates/statics/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
});

gulp.task('dist:templates:copy', function () {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaTemplates/templates/statics/rup/'));
});

gulp.task('dist:templates', gulp.series(
    'dist:templates:clean',
    'dist:templates:copy'
));

gulp.task('dist:portal', function (callback) {
    gulp.src('./dist/css/rup.css')
        .pipe(cssWrap({
            selector: '.r01gContainer'
        }))
        .pipe(gulp.dest('./dist/portal/'))
        .pipe(cleanCSS({compatibility: 'ie11'}))
        .pipe(rename('rup.min.css'))
        .pipe(gulp.dest('./dist/portal/'));
    gulp.src('./dist/css/cursors/**/*.*').pipe(gulp.dest('./dist/portal/cursors'));
    gulp.src('./dist/css/images/**/*.*').pipe(gulp.dest('./dist/portal/images'));
	gulp.src('./dist/css/fonts/**/*.*').pipe(gulp.dest('./dist/portal/fonts'));
    callback();
});