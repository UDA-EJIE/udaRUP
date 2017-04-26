define(['marionette',
        'templates',
        'rup/rup.upload'], function(Marionette, App){

  var UploadBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.upload.uploadBodyTemplate
  });

  return UploadBodyView;
});
