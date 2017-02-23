var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
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
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var amdOptimize = require("amd-optimize");

// jsdoc
var jsdoc2md = require('jsdoc-to-markdown');

var moduleImporter = require('sass-module-importer');

var version = "2.4.9";

var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));
var amdConf = JSON.parse(fs.readFileSync('./amd.conf.json'));


var config = {
    bootstrapDir: './node_modules/bootstrap',
    jqueryUiDir: './node_modules/jquery-ui',
    jqueryUiSassSource: './node_modules/jquery-ui/themes/base/*.css',
    qtip2Dir: './node_modules/qtip2',
    qtip2SassSource: './node_modules/qtip2/dist/jquery.qtip.min.css',
    publicDir: './public',
    dirs:{
      dist: './dist/',
      distCss: './dist/css/',
      distJs: './dist/js/',
      sass: './scss/',
      sassBootstrap: './scss/bootstrap/',
      sassRupBase: './scss/bootstrap/base',
      sassRupTheme: './scss/bootstrap/theme'
    },
    files:{
      sass:{
        customBootstrapScss: 'custom-bootstrap.scss',
        rupScss: 'rup.scss',
        rupClassicScss: 'rup-classic.scss',
      }
    }
};

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}
// import moduleImporter from 'sass-module-importer';

gulp.task('default', function () {
    // place code for your default task here
});



gulp.task('sass:bootstrap', function(){
  gulp.src(config.dirs.sass + config.files.sass.customBootstrapScss)
    .pipe(sass.sync({
      precision: 8
    }).on('error', sass.logError))
    .pipe(rename(function(path){
      path.basename='bootstrap';
    }))
    .pipe(gulp.dest(config.dirs.distCss));
});

gulp.task('sass:rup', function () {
  gulp.src(config.dirs.sass + config.files.sass.rupScss)
    .pipe(sass.sync({
      outputStyle: 'nested ',
      precision: 8,
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.dirs.distCss));
});

gulp.task('sass:rup-classic', function () {
  gulp.src(config.dirs.sass + config.files.sass.rupClassicScss)
    .pipe(sass.sync({
      outputStyle: 'nested ',
      precision: 8,
    }).on('error', sass.logError))
    .pipe(gulp.dest(config.dirs.distCss));
});

// MINIMIZE

gulp.task('minimize:css:rup-classic', function () {
  gulp.src(minimizeConf.rupClassicCssFiles)
    .pipe(concat("rup-classic.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minimize:css:rup', function () {
  console.log(minimizeConf.rupCssFiles);
  gulp.src(minimizeConf.rupCssFiles)
    .pipe(concat("rup.min.css"))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));

    // FIXME: Solo para desarrollo de la x21a
    gulp.src('./dist/css/rup.min.css')
      .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/css'));
    gulp.src(minimizeConf.rupCssFiles)
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/css'));

      gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont*.*')
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/fonts'));

});

gulp.task('minimize:js:rup', function () {


  gulp.src(minimizeConf.rupJsFiles)
  .pipe(concat("rup.min.js"))
  .pipe(gulp.dest('./dist/js'));

  // FIXME: Solo para desarrollo de la x21a
  gulp.src('./dist/js/rup.min.js')
    .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/js'));


});

gulp.task('minimize:js:rup-classic', function () {


  gulp.src(minimizeConf.rupJsClassicFiles)
  .pipe(concat("rup.classic.min.js"))
  .pipe(gulp.dest('./dist/js'));

  // FIXME: Solo para desarrollo de la x21a
  gulp.src('./dist/js/rup.classic.min.js')
    .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/js'));


});

gulp.task('build', [
  'sass:bootstrap',
  'sass:rup-classic',
  'sass:rup',
  'buildTable',
  'minimize:css:rup-classic',
  'minimize:css:rup',
  'templates',
  'templates-classic',
  'templates-rup',
  'minimize:js:rup',
  'minimize:js:rup-classic'
]);


// WATCHES

gulp.task('watch', [
  'watch:sass:bootstrap',
  'watch:sass:rup-classic',
  'watch:sass:rup',
  'watch:buildTable',
  'watch:minimize:css:rup-classic',
  'watch:minimize:css:rup',
  'watch:templates:rup',
  'watch:templates:rup-classic',
  'watch:templates:rup-core',
  'watch:minimize:js:rup',
  'watch:minimize:js:rup-classic'
]);

// WATCHES:sass

gulp.task('watch:sass:bootstrap', function () {
  gulp.watch(['./scss/custom-bootstrap.scss','./scss/bootstrap/*.scss'], ['sass:bootstrap']);
});

gulp.task('watch:sass:rup-classic', function () {
  gulp.watch(['./scss/rup-classic.scss','./scss/base/*.scss'], ['sass:rup-classic']);
});

gulp.task('watch:sass:rup', function () {
  gulp.watch(['./scss/rup.scss','./scss/theme/*.scss'], ['sass:rup']);
});

// WATCHES:minimize

gulp.task('watch:minimize:css:rup', function () {
  gulp.watch(['./dist/css/bootstrap.css','./dist/css/rup.css'], ['minimize:css:rup']);
});

gulp.task('watch:minimize:css:rup-classic', function () {
  gulp.watch(['./dist/css/rup-classic.css'], ['minimize:css:rup-classic']);
});

gulp.task('watch:minimize:js:rup', function () {
  gulp.watch(['./src/**/*.js','!./src/rup_table/**/*.js'], ['minimize:js:rup']);
});

gulp.task('watch:minimize:js:rup-classic', function () {
  gulp.watch(['./src/**/*.js','!./src/rup_table/**/*.js'], ['minimize:js:rup-classic']);
});

// WATCHES:templates

gulp.task('watch:templates:rup', function () {
  gulp.watch('./demoResponsive/**/*.hbs', ['templates']);
});

gulp.task('watch:templates:rup-classic', function () {
  gulp.watch('./demo/**/*.hbs', ['templates-classic']);
});

gulp.task('watch:templates:rup-core', function () {
  gulp.watch('./src/templates/*.hbs', ['templates-rup']);
});



// -------------------


gulp.task('dist:prepare', function () {
  gulp.src('./css/basic-theme/images/**').pipe(gulp.dest("./dist/css/images"));
  gulp.src('./css/basic-theme/cursors/**').pipe(gulp.dest("./dist/css/cursors"));
});


gulp.task('doc:html', function (cb) {
    var config = require('./jsdoc.conf.json');
    //gulp.src(['README.md', './src/**/*.js']).pipe(jsdoc(config, cb));
    gulp.src(['README.md', './src/rup.accordion.js']).pipe(jsdoc(config, cb));
});

gulp.task('doc:api', function () {


  return jsdoc2md.render({ files: 'src/rup.accordion.js' }).then(output => fs.writeFile('./doc/api/rup.accordion.md', output));
})

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
    return gulp.src("src/**/*.js")
    // Traces all modules and outputs them in the correct order.
    .pipe(amdOptimize("main", amdConf))
    .pipe(concat("rup.js"))
    .pipe(gulp.dest("dist/js"));


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

gulp.task('watch:buildTable', function () {
    gulp.watch(['./src/rup_table/**/*.js'], ['buildTable']);

});

gulp.task('buildTable', function (cb) {
    console.log("Minimizando RUP Table...");
    gulp.src(minimizeConf.rupTableFiles, {
            cwd: "src"
        })
        .pipe(concat("rup.table.js"))
        .pipe(wrap(`
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["jquery","./rup.base","./rup.form", "./rup.contextMenu", "./rup.toolbar","./rup.report","form2object"], factory );
         } else {

            // Browser globals
            factory( jQuery );
         }
        } ( function( $ ) {
          <%= contents %>
        }));
        `))
        .pipe(gulp.dest('src'));
});

gulp.task('templates-classic', function () {
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

gulp.task('templates', function () {
    var templates = gulp.src('demoResponsive/app/**/*.hbs')
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

    var partials = gulp.src(['demoResponsive/app/**/_*.hbs'])
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
        .pipe(gulp.dest('demoResponsive/'));
});


gulp.task('templates-rup', function () {
    var templates = gulp.src('src/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Rup.Templates',
            noRedeclare: true // Avoid duplicate declarations
            // processName: function (filePath) {
            //     // Allow nesting based on path using gulp-declare's processNameByPath()
            //     // You can remove this option completely if you aren't using nested folders
            //     // Drop the client/templates/ folder from the namespace path by removing it from the filePath
            //     return declare.processNameByPath(filePath.replace('src/', ''));
            // }
        }));
    // .pipe(concat('templates.js'))
    // //.pipe(defineModule('amd'))
    // .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['App'];});"))
    // .pipe(gulp.dest('demo/'));

    var partials = gulp.src(['src/**/_*.hbs'])
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
        // .pipe(wrap("define(['handlebars'], function(Handlebars) { <%= contents %>  return this['Rup'];});"))
        //
        .pipe(wrap(`
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["handlebars" ], factory );
         } else {

            // Browser globals
            factory( Handlebars );
         }
        } ( function( Handlebars ) {
          <%= contents %>
          return this['Rup'];
        }
        ));
        `))
        .pipe(gulp.dest('src/'));
});
