define(['marionette',
        'templates',
        'rup/rup.message'], function(Marionette, App){

  var MessageBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.message.messageBodyTemplate,
  });

  return MessageBodyView;
});
