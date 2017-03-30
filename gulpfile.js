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
var tap = require('gulp-tap');
var pump = require('pump');
var fs = require('fs');
var sass = require('gulp-sass');
var cssWrap = require('gulp-css-wrap');
var runSequence = require('run-sequence');
var amdOptimize = require("amd-optimize");


// jsdoc
var jsdoc2md = require('jsdoc-to-markdown');

var moduleImporter = require('sass-module-importer');

var version = "3.0.1";

var minimizeConf = JSON.parse(fs.readFileSync('./minimizeConf.json'));
var amdConf = JSON.parse(fs.readFileSync('./amd.conf.json'));


var config = {
    bootstrapDir: './node_modules/bootstrap',
    jqueryUiDir: './node_modules/jquery-ui',
    jqueryUiSassSource: './node_modules/jquery-ui/themes/base/*.css',
    qtip2Dir: './node_modules/qtip2',
    qtip2SassSource: './node_modules/qtip2/dist/jquery.qtip.min.css',
    publicDir: './public',
    dirs: {
        dist: './dist/',
        distCss: './dist/css/',
        distJs: './dist/js/',
        build: './build/',
        buildCss: './build/css/',
        buildJs: './build/js/',
        sass: './scss/',
        sassBootstrap: './scss/bootstrap/',
        sassRupBase: './scss/bootstrap/base',
        sassRupTheme: './scss/bootstrap/theme'
    },
    files: {
        sass: {
            customBootstrapScss: 'custom-bootstrap.scss',
            rupScss: 'rup-rwd.scss',
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
};


// import moduleImporter from 'sass-module-importer';

gulp.task('default', function () {
    // place code for your default task here
});



gulp.task('sass:bootstrap', function () {
    gulp.src(config.dirs.sass + config.files.sass.customBootstrapScss)
        .pipe(sass.sync({
            precision: 8
        }).on('error', sass.logError))
        .pipe(rename(function (path) {
            path.basename = 'bootstrap';
        }))
        .pipe(gulp.dest(config.dirs.buildCss));
});

gulp.task('sass:rup', function () {
    gulp.src(config.dirs.sass + config.files.sass.rupScss)
        .pipe(sass.sync({
            outputStyle: 'nested ',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dirs.buildCss));
});

gulp.task('sass:rup-classic', function () {
    gulp.src(config.dirs.sass + config.files.sass.rupClassicScss)
        .pipe(sass.sync({
            outputStyle: 'nested ',
            precision: 8,
        }).on('error', sass.logError))
        .pipe(gulp.dest(config.dirs.buildCss));
});

// MINIMIZE

gulp.task('minimize:css:rup-classic', function () {
    // gulp.src(minimizeConf.rupClassicCssExternalFiles)
    //   .pipe(concat("rup-classic.min.css"))
    //   .pipe(cleanCSS())
    //   .pipe(gulp.dest('./build/css'));

    // gulp.src("./build/css/rup-classic.css")
    //   .pipe(concat("rup-classic.min.css"))
    //   .pipe(cleanCSS())
    //   .pipe(gulp.dest('./build/css'));

});

gulp.task('minimize:css:rup', function () {
    var sources = minimizeConf.rupCssExternalFiles.concat(minimizeConf.rupCssBuildFiles);
    console.log("Generando rup.css...");
    console.log(sources);
    gulp.src(sources)
        .pipe(concat("rup.css"))
        // .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));


    // FIXME: Solo para desarrollo de la x21a
    // gulp.src('./build/css/rup.min.css')
    //   .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/css'));
    // gulp.src(minimizeConf.rupCssFiles)
    //     .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/css'));
    //
    //   gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont*.*')
    //     .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/fonts'));

});

gulp.task('minimize:js:rup', function () {

    console.log("Generando rup.js...");
    gulp.src(minimizeConf.rupJsFiles)
        .pipe(concat("rup.js"))
        .pipe(gulp.dest('./build/js'));

    // FIXME: Solo para desarrollo de la x21a
    // gulp.src('./build/js/rup.min.js')
    //   .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/js'));


});

gulp.task('minimize:js:rup-classic', function () {

    console.log("Generando rup.classic.js...");
    gulp.src(minimizeConf.rupJsClassicFiles)
        .pipe(concat("rup.classic.js"))
        .pipe(gulp.dest('./build/js'));

    // FIXME: Solo para desarrollo de la x21a
    // gulp.src('./build/js/rup.classic.min.js')
    //   .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/js'));


});

gulp.task('uglify:css:rup', function () {
    var sources = minimizeConf.rupCssExternalFiles.concat(minimizeConf.rupCssBuildFiles);
    console.log("Generando rup.min.css...");

    gulp.src(sources)
        .pipe(concat("rup.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('uglify:css:rup-classic', function () {
    console.log("Generando rup.classic.min.css...");
    gulp.src("./build/css/rup-classic.css")
        .pipe(concat("rup-classic.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('uglify:js:rup', function () {
    console.log("Generando rup.min.js...");
    gulp.src('./build/js/rup.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('uglify:js:rup-classic', function () {
    console.log("Generando rup.classic.min.js...");
    gulp.src('./build/js/rup.classic.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js/'));
});





gulp.task('dist', ["dist:build", "dist:copy"]);

gulp.task('dist:build', ['uglify:css:rup', 'uglify:css:rup-classic', 'uglify:js:rup', 'uglify:js:rup-classic']);

gulp.task('dist:portal', function () {

    gulp.src(['./dist/css/**/*.css'])
        .pipe(cssWrap({
            selector: '.r01gContainer'
        }))
        .pipe(gulp.dest('./dist/portalCss/'));
    gulp.src('./dist/css/cursors/**/*.*').pipe(gulp.dest('./dist/portalCss/cursors'));
    gulp.src('./dist/css/images/**/*.*').pipe(gulp.dest('./dist/portalCss/images'));
});

gulp.task('dist:copy', function () {

    // Generamos la carpeta de distribuibles

    // dist/js
    console.log("dist/js");
    gulp.src(config.dirs.buildJs + "/*").pipe(gulp.dest('./dist/js'));


    // dist/css
    console.log("dist/css");
    gulp.src(minimizeConf.rupCssDistFiles).pipe(gulp.dest('./dist/css'));

    // dist/css/external
    console.log("dist/css/external");
    //gulp.src(minimizeConf.rupCssExternalFiles).pipe(gulp.dest('./dist/css/external'));
    gulp.src(["./node_modules/jquery-ui-dist/jquery-ui.css",
    "./node_modules/gridstack/dist/gridstack.css",
    "./node_modules/gridstack/dist/gridstack-extra.css",
    "./node_modules/blueimp-file-upload/css/jquery.fileupload.css",
    "./node_modules/blueimp-file-upload/css/jquery.fileupload-ui.css"])
        .pipe(gulp.dest('./dist/css/external'));
    gulp.src("./node_modules/font-awesome/css/font-awesome.css").pipe(gulp.dest('./dist/css'));
    gulp.src("./build/css/bootstrap.css").pipe(gulp.dest('./dist/css/external'));
    gulp.src("./build/css/rup-rwd.css").pipe(gulp.dest('./dist/css'));

    // dist/css/images
    console.log("dist/css/images");
    gulp.src(["./assets/images/**/*.*"]).pipe(gulp.dest('dist/css/images'));
    // dist/css/cursors
    console.log("dist/css/cursors");
    gulp.src(["./assets/cursors/**/*.*"]).pipe(gulp.dest('dist/css/cursors'));

    // resources
    console.log("dist/resources");
    gulp.src(["./i18n/*.json"]).pipe(gulp.dest('dist/resources'));

    // fonts
    console.log("dist/fonts");
    gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont*.*')
        .pipe(gulp.dest('dist/fonts'));

    // jquery-ui (legacy)
    console.log("jquery-ui (legacy)");
    gulp.src(["./assets/jquery-ui/**/*.*"])
        .pipe(gulp.dest('dist/css/external'));


});

gulp.task('dist:x21a', function () {
    gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('../udaDemoApp/x21aStatics/WebContent/rup/'));
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
    gulp.watch(['./scss/custom-bootstrap.scss', './scss/bootstrap/*.scss'], ['sass:bootstrap']);
});

gulp.task('watch:sass:rup-classic', function () {
    gulp.watch(['./scss/rup-classic.scss', './scss/base/*.scss'], ['sass:rup-classic']);
});

gulp.task('watch:sass:rup', function () {
    gulp.watch(['./scss/rup.scss', './scss/theme/*.scss'], ['sass:rup']);
});

// WATCHES:minimize

gulp.task('watch:minimize:css:rup', function () {
    gulp.watch(['./dist/css/bootstrap.css', './dist/css/rup.css'], ['minimize:css:rup']);
});

gulp.task('watch:minimize:css:rup-classic', function () {
    gulp.watch(['./dist/css/rup-classic.css'], ['minimize:css:rup-classic']);
});

gulp.task('watch:minimize:js:rup', function () {
    gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], ['minimize:js:rup']);
});

gulp.task('watch:minimize:js:rup-classic', function () {
    gulp.watch(['./src/**/*.js', '!./src/rup_table/**/*.js'], ['minimize:js:rup-classic']);
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
    gulp.src(['README.md', './src/*.js']).pipe(jsdoc(config, cb));
});


var runJsdoc2md = function (fileSource, outputPath) {
    var basename;
    return gulp.src(fileSource)
        .pipe(tap(function (file, t) {
            basename = file.relative.split('.js')[0];
            //console.log("outpath " + outputPath + " File " + file.path + "  " + basename);
            jsdoc2md.render({
                files: file.path
            }).then(output => fs.writeFile(outputPath + basename + '.md', output));
        }));
};


gulp.task('jsdocFile', function () {
    var filePath = 'src/rup_table/';
    var basename = 'rup.table.report';
    var outputPath = './doc/api/';
    jsdoc2md.render({
        files: filePath + basename + '.js'
    }).then(output => fs.writeFile(outputPath + basename + '.md', output));
});

gulp.task('doc:api', function () {


    var fileSource = 'src/rup*.js';
    var outputPath = './doc/api/';

    runJsdoc2md(fileSource, outputPath);
    //rup_table
    fileSource = 'src/rup_table/rup*.js';
    //outputPath = './doc/api/table/';
    runJsdoc2md(fileSource, outputPath);
});


//gulp.task('dist', ['copyRupSources', 'minimizeRupJs', 'minimizeRupCss']);

gulp.task('copyRupSources', function (cb) {
    console.log("Borrando el contenido del directorio 'dist'");
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