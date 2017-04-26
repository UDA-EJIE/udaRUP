define(['marionette',
        'templates',
        'rup/rup.tooltip'], function(Marionette, App){

  var TooltipBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.tooltip.tooltipBodyTemplate
  });

  return TooltipBodyView;
});
