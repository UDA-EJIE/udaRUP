
import * as Marionette from 'marionette';
import DatatableTemplate from './datatableTemplate.hbs';

import $ from 'jquery';

import RupDatatable from 'datatable/rup.datatable';


// define(['marionette',
// 	'templates',
// 	'datatables.net-bs'], function(Marionette, App){

var DatatableView = Marionette.LayoutView.extend({
	template: DatatableTemplate,
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
