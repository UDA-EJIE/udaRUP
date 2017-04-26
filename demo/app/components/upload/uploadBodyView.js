define(['marionette',
        'templates',
        'rup/rup.upload'], function(Marionette, App){

  var UploadBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.upload.uploadBodyTemplate
  });

  return UploadBodyView;
});
