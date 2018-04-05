
import * as Marionette from 'marionette';
import DataTableTemplate from './dataTableTemplate.hbs';

import $ from 'jquery';

import RupDataTable from 'datatable/rup.dataTable';


// define(['marionette',
// 	'templates',
// 	'datatables.net-bs'], function(Marionette, App){

var DataTableView = Marionette.LayoutView.extend({
	template: DataTableTemplate,
	initialize: fncInitilize,
	onDomRefresh: fncOnDomRefresh
});

function fncInitilize(){

}

function fncOnDomRefresh(){
	$('#example').rup_dataTable();
}

export { DataTableView as default };

// });
