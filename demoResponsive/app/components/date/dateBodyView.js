define(['marionette',
        'templates'], function(Marionette, App){

  var DateBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.date.dateBodyTemplate,
  });

  return DateBodyView;
});
