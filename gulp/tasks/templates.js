const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const path = require('path');
const merge = require('merge-stream');
const concat = require('gulp-concat');

gulp.task('templates', function () {
    var templates = gulp.src('src/**/*.hbs')
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Rup.Templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

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