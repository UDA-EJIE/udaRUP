/* eslint no-console: off */

const gulp = require('gulp');
const clean = require('gulp-clean');
const jsdoc = require('gulp-jsdoc3');
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs/promises');
const path = require('path');
const glob = require('glob');

// Limpiar directorio de documentación previa
gulp.task('doc:api:clean', function () {
  return gulp.src('./doc/api/**/.*', { allowEmpty: true })
    .pipe(clean({ force: true }));
});

// Documentación HTML (opcional)
gulp.task('doc:html', function (cb) {
  const config = require('../../jsdoc.conf.json');
  gulp.src(['README.md', './src/*.js'])
    .pipe(jsdoc(config, cb));
});

// Función para procesar todos los archivos con jsdoc2md
async function runJsdoc2md(fileGlob, outputPath) {
  const files = glob.sync(fileGlob);

  for (const file of files) {
    const basename = path.basename(file, '.js');
    console.log(`[doc] Generando ${outputPath}${basename}.md`);

    try {
      const output = await jsdoc2md.render({ files: file });
      await fs.writeFile(path.join(outputPath, `${basename}.md`), output);
    } catch (err) {
      console.error(`[doc] Error al generar Markdown para ${basename}:`, err);
    }
  }
}

// Documentación para tablas
gulp.task('doc:api:table', async function () {
  await runJsdoc2md('src/rup_table/rup*.js', './doc/api/');
});

// Tarea principal
gulp.task('doc', gulp.series(
  'doc:api:clean',
  'doc:api:table',
  async function () {
    await runJsdoc2md('src/rup*.js', './doc/api/');
  }
));