/* global require */

var gulp = require('gulp');
const runSequence = require('run-sequence');
var deleteLines = require('gulp-delete-lines');


// gulp.task('build:all', ['build:css', 'build:js']);
// gulp.task('build:dist', function(callback){
// 	runSequence('build:css', 'build:js', 'build:uglify', callback);
// });



gulp.task('build:css', function(callback){
	runSequence('build:sass', 'build:js', 'build:uglify', callback);
});

gulp.task('build:sass', function(callback){
	runSequence('sass:rup-base',
		'sass:rup-theme',
		'sass:rup-jqueryui-theme',
		'sass:main', callback);
	// 'minimize:css:rup-classic',
	// 'minimize:css:rup'
});


gulp.task('build:js', [
	'rup:build:table',
	'templates:demo',
	'templates:rup'
	// 'minimize:js:rup'
]);

gulp.task('build:uglify', function(callback){
	runSequence('uglify:css:rup-base',
		'uglify:css:rup-jqueryui-theme',
		'uglify:css:rup-theme', callback);
// 'minimize:css:rup-classic',
// 'minimize:css:rup'
});



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
		.pipe(gulp.dest('dist/css/images'));

	// dist/css/cursors
	console.log('dist/css/cursors');
	gulp.src(['./assets/cursors/**/*.*'])
		.pipe(gulp.dest('dist/css/cursors'));

	// resources
	console.log('dist/resources');
	gulp.src(['./i18n/*.json'])
		.pipe(gulp.dest('dist/resources'));

	// fonts
	console.log('dist/fonts');
	gulp.src('./node_modules/font-awesome/fonts/*.*')
		.pipe(gulp.dest('dist/css/externals/fonts'))
		.pipe(gulp.dest('dist/portal/externals/fonts'));

	// externals
	console.log('externals ');
	
	// bootstrap
	console.log('bootstrap (v4.1.0)');
	gulp.src(['./assets/css/externals/**/*.*'])
		.pipe(gulp.dest('dist/css/externals/bootstrap'));

	gulp.src(['./assets/js/externals/**/*.*'])
		.pipe(gulp.dest('dist/js/externals/bootstrap'));
	
	// font-awesome
	console.log('font-awesome');
	gulp.src(['./node_modules/font-awesome/css/font-awesome.min.css', './node_modules/font-awesome/css/font-awesome.css.map'])
		.pipe(gulp.dest('./dist/css/externals/font-awesome'));
	
	// tether
	console.log('tether');
	gulp.src(['./node_modules/tether/dist/css/*min*.*'])
	.pipe(gulp.dest('./dist/css/externals/tether'));
	
	gulp.src(['./node_modules/tether/dist/js/*min*.*'])
		.pipe(gulp.dest('./dist/js/externals/tether'));

	// popper.js
	console.log('popper');
	gulp.src(['./node_modules/popper.js/dist/umd/*min*.*'])
		.pipe(gulp.dest('./dist/js/externals/popper'));
	
	// jasmine
	console.log('jasmine');
	gulp.src(['./node_modules/jasmine-core/lib/jasmine-core/jasmine.css'])
	.pipe(gulp.dest('./dist/css/externals/jasmine'));
	
	gulp.src(['./node_modules/jasmine-core/images/*favicon*.png'])
	.pipe(gulp.dest('./dist/css/externals/jasmine'));
	
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
	
	//Se traspasa el specRunner
	gulp.src(['./spec/specRunner.html'])
		.pipe(gulp.dest('./dist/html'));
	
	gulp.src(['./spec/rup.config.js'])
		.pipe(gulp.dest('./dist/js/test'));
	
	gulp.src(['./spec/specCommonUtils.js', './spec/specCommonUtils.spec.js'])
		.pipe(gulp.dest('./dist/js/test/common'));
	
	// Archivos fuentes
	gulp.src(['./src/*'])
		.pipe(gulp.dest('./dist/js/src'));
	
	callback();
});
