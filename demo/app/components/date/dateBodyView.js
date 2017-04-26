define(['marionette',
        'templates'], function(Marionette, App){

  var DateBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.date.dateBodyTemplate,
  });

  return DateBodyView;
});
