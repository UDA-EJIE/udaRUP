define(['marionette',
        'templates',
        'rup/rup.accordion'], function(Marionette, App){

  var AccordionBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.accordion.accordionBodyTemplate

  });

  return AccordionBodyView;
});
