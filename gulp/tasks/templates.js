const gulp = require('gulp');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const path = require('path');
const merge = require('merge-stream');
const concat = require('gulp-concat');

gulp.task('templates', function () {
    // Configurar Handlebars para permitir acceso a propiedades del prototipo
    // Esto resuelve warnings en Handlebars 4.7.8 sobre acceso a propiedades del prototipo
    // que se generan cuando los templates usan helpers como {{i18n}}
    const Handlebars = require('handlebars');
    
    // Configurar opciones de runtime para Handlebars 4.7.8
    const handlebarsWithOptions = Handlebars.create({
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    });
    
    var templates = gulp.src('src/**/*.hbs')
        .pipe(handlebars({
            handlebars: handlebarsWithOptions
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'Rup.Templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    var partials = gulp.src(['src/**/_*.hbs'])
        .pipe(handlebars({
            handlebars: handlebarsWithOptions
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
          // Configurar Handlebars para suprimir warnings de acceso a propiedades del prototipo
          if (typeof Handlebars !== 'undefined') {
            // Interceptar y suprimir warnings específicos
            var originalLog = Handlebars.logger.log;
            if (Handlebars.logger && originalLog) {
              Handlebars.logger.log = function(level, message) {
                if (typeof message === 'string' && message.includes('Access has been denied to resolve the property')) {
                  return; // Suprimir este warning
                }
                return originalLog.apply(this, arguments);
              };
            }
            
            // Configurar opciones de runtime globalmente
            if (Handlebars.Utils && Handlebars.Utils.extend) {
              Handlebars.Utils.extend(Handlebars, {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true
              });
            }
          }
          <%= contents %>
          return this['Rup'];
        }
        ));
        `))
        .pipe(gulp.dest('src/'));
});