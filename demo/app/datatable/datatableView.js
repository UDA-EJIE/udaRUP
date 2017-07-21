
import * as Marionette from 'marionette';
import * as App from 'templates';

import $ from 'jquery';

import RupDatatable from 'rup/datatable/rup.datatable';


// define(['marionette',
// 	'templates',
// 	'datatables.net-bs'], function(Marionette, App){

var DatatableView = Marionette.LayoutView.extend({
	template: App.Templates.demo.app.datatable.datatableTemplate,
	initialize: fncInitilize,
	onDomRefresh: fncOnDomRefresh

});

function fncInitilize(){





}

function fncOnDomRefresh(){
	// var $view = this;

	// var datatable = new RupDatatable('#example', {});
	//  console.log($('#example').rup_datatable);
	$('#example').rup_datatable();


}

export { DatatableView as default };

// });
