define(['marionette',
        'templates',
        'rup.message'], function(Marionette, App){

  var MessageBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.message.messageBodyTemplate,
  });

  return MessageBodyView;
});
