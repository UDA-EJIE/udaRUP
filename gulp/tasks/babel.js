const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
    src:      ['src/**.js', 'src/*/**.js'],
    dest:     'build/src',
    specSrc:  'spec/**/*Spec.js',
    specDest: 'build/spec',
    spec:     'build/spec/**/*Spec.js',
    appSrc:   'app/**/*.js',
    appDest:  'build/app'
};


function build(src, dst) {
  return gulp.src(src)
      .pipe(babel())
      .pipe(gulp.dest(dst));
    // var pipe = gulp.src(src).pipe(babel({ presets: ['es2015'] })), dest = gulp.dest(dst);
    // return pipe.pipe(dest);
}

gulp.task('build:babel', function() {
    return build(paths.src, paths.dest);
});
