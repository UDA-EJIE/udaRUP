var gulp = require('gulp');
var fs = require('fs');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json','utf8'));

gulp.task('uglify:css:rup-base', function () {
    console.log("Generando rup.classic.min.css...");
    return gulp.src("./build/css/rup-base.css")
        .pipe(concat("rup-base.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('uglify:css:rup-jqueryui-theme', function () {
    console.log("Generando rup.classic.min.css...");
    return gulp.src("./build/css/rup-jqueryui-theme.css")
        .pipe(concat("rup-jqueryui-theme.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('uglify:css:rup-theme', function () {
    console.log("Generando rup.classic.min.css...");
    return gulp.src("./build/css/rup-theme.css")
        .pipe(concat("rup-theme.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('uglify:js:rup', function () {
    console.log("Generando rup.min.js...");
    return gulp.src('./build/js/rup.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js/'));
});

// gulp.task('uglify:css:rup', function () {
//     var sources = minimizeConf.rupCssExternalFiles.concat(minimizeConf.rupCssBuildFiles);
//     console.log("Generando rup.min.css...");
//
//     gulp.src(sources)
//         .pipe(concat("rup.min.css"))
//         .pipe(cleanCSS())
//         .pipe(gulp.dest('./build/css/'));
// });



// gulp.task('uglify:css:rup-classic', function () {
//     console.log("Generando rup.classic.min.css...");
//     gulp.src("./build/css/rup-classic.css")
//         .pipe(concat("rup-classic.min.css"))
//         .pipe(cleanCSS())
//         .pipe(gulp.dest('./build/css'));
// });



// gulp.task('uglify:js:rup-classic', function () {
//     console.log("Generando rup.classic.min.js...");
//     gulp.src('./build/js/rup.classic.js')
//         .pipe(uglify())
//         .pipe(rename({
//             suffix: '.min'
//         }))
//         .pipe(gulp.dest('./build/js/'));
// });
