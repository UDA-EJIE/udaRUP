'use strict';

import { RupDatatableService } from './rup.datatable.service.js';
import { DataTableRequest } from './datatable.request.js';

import * as datatables from 'datatables.net-bs4';
import * as datatablesResponsiveBs from 'datatables.net-responsive-bs4';

import $ from 'jquery';

import plugin from '../utils/jquery.plugin';


class RupDatatable{

	constructor(element, options){

		this._element = element;
		this._$element = $(element);
		this._userOptions = options;

		this.options = this._initOptions();

		this.init();
	}


	init(){
		this._$element.DataTable(this.options);
	}

	_initOptions(){

		const options = Object.assign({}, this._userOptions);

		options.processing = true;
		options.serverSide = true;
		options.responsive = true;
		options.columns = this._getColumns();
		options.ajax = this._ajaxOptions();

		// Urls
		options.urls = {};
		options.urls.base = this._element.getAttribute('data-url-base');
		options.urls.filter = options.urls.base+'/filter';

		return options;

	}

	_getColumns(){
		return this._$element.find('th[data-col-prop]').map((i,e)=>{return {data: e.getAttribute('data-col-prop')};});
	}

	_ajaxOptions(){
		return {
			'url': 'jqGridUsuario/filter',
			'dataSrc': this._ajaxSuccessData,
			'type': 'POST',
			'data': this._ajaxRequestData
		};
	}

	_ajaxSuccessData(json){
		var ret ={};

		json.recordsTotal = json.records;
		json.recordsFiltered = json.records;

		ret.recordsTotal = json.records;
		ret.recordsFiltered = json.records;
		ret.data = json.rows;
		return ret.data;

	}

	_ajaxRequestData(data){

		var datatableRequest = new DataTableRequest(data);

		$.extend(data, datatableRequest.getData());

	}

}


plugin('rup_datatable', RupDatatable);

export { RupDatatable as default };
