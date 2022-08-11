/* global define */

define(['marionette',
	'./comboSimpleBodyTemplate.hbs',
	'rup.combo'], function(Marionette, ComboSimpleBodyTemplate){

	var ComboSimpleBodyView = Marionette.View.extend({
		template: ComboSimpleBodyTemplate
	});

	return ComboSimpleBodyView;
});
