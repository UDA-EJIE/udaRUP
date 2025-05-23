const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.resolve(__dirname, 'dist');
const targetDir = path.resolve(__dirname, '../udaDemoApp/x21aStatics/WebContent/rup');

const excludeExtensions = ['.map', '.txt'];

async function copy() {
  try {
    if (!fs.existsSync(sourceDir)) {
      throw new Error(`No existe la carpeta ${sourceDir}`);
    }

    console.log('🧹 Limpiando destino...');
    await fs.emptyDir(targetDir);

    console.log(`📁 Copiando de:\n  ${sourceDir}\na\n  ${targetDir}`);

    await fs.copy(sourceDir, targetDir, {
      overwrite: true,
      filter: (src) => {
        const ext = path.extname(src).toLowerCase();
        return !excludeExtensions.includes(ext);
      }
    });

    console.log('✅ Copiado completo y sin .map ni .txt');
  } catch (err) {
    console.error('❌ Error al copiar archivos:', err.message);
    process.exit(1);
  }
}

copy();
