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
              rupBase: 'rup-base.scss',
              rupJQueryuiTheme: 'rup-jqueryui-theme.scss',
              rupTheme: 'rup-theme.scss',

              // legacy
              customBootstrapScss: 'custom-bootstrap.scss',
              rupScss: 'rup-theme.scss',
              rupJQueryuiTheme: 'rup-jqueryui-theme.scss',
              rupClassicScss: 'rup-base.scss',
          },
          css:{
              rupBase: 'rup-base.css',
              rupBaseMin: 'rup-base.min.css',
              rupJQueryuiTheme: 'rup-jqueryui-theme.css',
              rupJQueryuiThemeMin: 'rup-jqueryui-theme.min.css',
              rupTheme: 'rup-theme.scss',
              rupThemeMin: 'rup-theme.min.scss'
          },
          js:{
              rup: 'rup.js',
              rupMin: 'rup.min.js'
          }
      }
  }
};
