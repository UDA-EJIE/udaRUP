var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');

var config = require('../config.js').config;

var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));


// MINIMIZE

// gulp.task('minimize:css:rup-classic', function () {
//
//
// });

// gulp.task('minimize:css:rup', function () {
//     var sources = minimizeConf.rupCssExternalFiles.concat(minimizeConf.rupCssBuildFiles);
//     console.log("Generando rup.css...");
//     console.log(sources);
//     gulp.src(sources)
//         .pipe(concat(config.files.css))
//         // .pipe(cleanCSS())
//         .pipe(gulp.dest('./build/css'));
// });

gulp.task('minimize:js:rup', function () {
	console.log('Generando rup.js...');
	gulp.src(minimizeConf.rupJsFiles)
		.pipe(concat('rup.js'))
		.pipe(gulp.dest('./build/js'));
});
//
// gulp.task('minimize:js:rup-base', function () {
//     console.log("Generando rup.classic.js...");
//     gulp.src(minimizeConf.rupJsClassicFiles)
//         .pipe(concat("rup.classic.js"))
//         .pipe(gulp.dest('./build/js'));
// });
