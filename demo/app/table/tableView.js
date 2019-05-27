define(['marionette',
	'./tableTemplate.hbs',
	'rup_table/rup.table'], function(Marionette, TableTemplate){

var TableView = Marionette.LayoutView.extend({
	template: TableTemplate,
	initialize: fncInitilize,
	onDomRefresh: fncOnDomRefresh
});

function fncInitilize(){}

function fncOnDomRefresh(){
	// var $view = this;

	$('#example').rup_table();
}

});
