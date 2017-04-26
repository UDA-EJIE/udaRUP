define(['marionette',
        'templates',
        'rup/rup.form'], function(Marionette, App){

  var FormBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.form.formBodyTemplate
  });

  return FormBodyView;
});
