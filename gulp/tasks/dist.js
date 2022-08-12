const gulp = require('gulp');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const cssWrap = require('gulp-css-wrap');
const rename = require('gulp-rename');

gulp.task('dist:x21a', gulp.series(
	dist_x21a_clean,
	dist_x21a_copy
));

gulp.task('dist:templates', gulp.series(
	dist_templates_clean,
	dist_templates_copy
));

function dist_clean() {
    return gulp.src('./dist/', {allowEmpty: true})
        .pipe(clean({force: true}));
};

function dist_x21a_clean() {
    return gulp.src('../udaDemoApp/x21aStatics/WebContent/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
};

function dist_x21a_copy() {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/'));
};

function dist_templates_clean() {
    return gulp.src('../udaTemplates/templates/statics/rup/', {allowEmpty: true})
        .pipe(clean({force: true}));
};

function dist_templates_copy() {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaTemplates/templates/statics/rup/'));
};

function dist_portal(callback) {
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
    callback();
};

module.exports = {
	dist_clean,
	dist_x21a_clean,
	dist_x21a_copy,
	dist_templates_clean,
	dist_templates_copy,
	dist_portal
}
