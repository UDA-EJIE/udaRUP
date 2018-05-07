var path = require('path');
var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var defineModule = require('gulp-define-module');
var jsdoc = require('gulp-jsdoc3');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var pump = require('pump');
var fs = require('fs');

var version = "2.4.12";

var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('doc', function (cb) {
  let config = require('./jsdoc.conf.json');
  gulp.src(['README.md', './src/**/*.js']).pipe(jsdoc(config, cb));
});

gulp.task('dist', ['copyRupSources', 'minimizeRupJs', 'minimizeRupCss']);

gulp.task('copyRupSources', function (cb) {
  console.log("Borrando el contenido del directorio 'dist'")
  del(['dist/rup/**/*']).then(function () {

    console.log("Copiando fuentes de src...");
    // Copy scipts
    gulp.src(["src/*.js"]).pipe(rename(function (path) {
      path.basename += "-" + version;
    })).pipe(gulp.dest('dist/rup/scripts'));

    gulp.src(["src/rup_table"]).pipe(gulp.dest('dist/rup/scripts'));
    gulp.src(["src/rup_table/*.js"]).pipe(rename(function (path) {
      path.basename += "-" + version;
    })).pipe(gulp.dest('dist/rup/scripts/rup_table'));

    gulp.src(["src/core"]).pipe(gulp.dest('dist/rup/scripts'));
    gulp.src(["src/core/**"]).pipe(gulp.dest('dist/rup/scripts/core'));

    // Copy resources
    gulp.src(["i18n/*.json"]).pipe(gulp.dest('dist/rup/resources'));

    // Copy styles
    gulp.src(["css/custom-theme"]).pipe(gulp.dest('dist/rup'));
    gulp.src(["css/basic-theme"]).pipe(gulp.dest('dist/rup'));

    gulp.src(["css/custom-theme/**"]).pipe(gulp.dest('dist/rup/custom-theme'));
    gulp.src(["css/basic-theme/**", "!css/basic-theme/theme.rup.*.css"]).pipe(gulp.dest('dist/rup/basic-theme'));
    gulp.src(["css/basic-theme/theme.rup.*.css"]).pipe(rename(function (path) {
      path.basename += "-" + version;
    })).pipe(gulp.dest('dist/rup/basic-theme'));
  });
});

gulp.task('minimizeRupJs', function (cb) {
  console.log("Minimizando ficheros js de RUP...");
  mkdirSync('dist/rup/scripts/min');

  pump([
      gulp.src(minimizeConf.rupJsFiles, {
      cwd: "src"
    }),
      concat("rup.min-" + version + ".js"),
      uglify({
      preserveComments: 'license'
    }),
      gulp.dest('dist/rup/scripts/min')
  ], cb);


});

gulp.task('minimizeRupCss', function (cb) {
  console.log("Minimizando ficheros css de RUP...");
  gulp.src(minimizeConf.rupCssFiles, {
      cwd: "css/basic-theme"
    })
    .pipe(concat("rup.min-" + version + ".css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/rup/basic-theme'));
});

gulp.task('minimizeRupTable', function (cb) {
  console.log("Minimizando RUP Table...");
  gulp.src(minimizeConf.rupCssFiles, {
      cwd: "css/basic-theme"
    })
    .pipe(concat("rup.min-" + version + ".css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/rup/basic-theme'));
});

gulp.task('templates', function () {
  var templates = gulp.src('demo/app/**/*.hbs')
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'App.Templates',
      noRedeclare: true, // Avoid duplicate declarations
      processName: function (filePath) {
        // Allow nesting based on path using gulp-declare's processNameByPath()
        // You can remove this option completely if you aren't using nested folders
        // Drop the client/templates/ folder from the namespace path by removing it from the filePath
        return declare.processNameByPath(filePath.replace('client/templates/', ''));
      }
    }));
  // .pipe(concat('templates.js'))
  // //.pipe(defineModule('amd'))
  // .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
  // .pipe(gulp.dest('demo/'));

  var partials = gulp.src(['demo/app/**/_*.hbs'])
    .pipe(handlebars({
      handlebars: require('handlebars')
    }))
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function (fileName) {
          // Strip the extension and the underscore
          // Escape the output with JSON.stringify
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    }));

  return merge(partials, templates)
    .pipe(concat('templates.js'))
    .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
    .pipe(gulp.dest('demo/'));
});
