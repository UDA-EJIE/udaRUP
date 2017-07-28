define(['marionette',
        'templates',
        'rup.form'], function(Marionette, App){

  var FormBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.form.formBodyTemplate
  });

  return FormBodyView;
});
