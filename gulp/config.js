module.exports = {
   config : {
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
  }
};
