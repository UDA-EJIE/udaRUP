/* global define */

define(['marionette',
	'./comboSimpleBodyTemplate.hbs',
	'rup.combo'], function(Marionette, ComboSimpleBodyTemplate){

	var ComboSimpleBodyView = Marionette.LayoutView.extend({
		template: ComboSimpleBodyTemplate
	});

	return ComboSimpleBodyView;
});
