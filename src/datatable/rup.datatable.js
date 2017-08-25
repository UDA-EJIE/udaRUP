'use strict';

import {
	RupDatatableService
} from './rup.datatable.service.js';
import {
	DataTableRequest
} from './datatable.request.js';


import * as datatables from 'datatables.net-bs4';
import * as datatablesResponsiveBs from 'datatables.net-responsive-bs4';

import $ from 'jquery';

import plugin from '../utils/jquery.plugin';


class RupDatatable {

	constructor(element, options) {

		this._element = element;
		this._$element = $(element);
		this._userOptions = options;

		this.options = this._initOptions();

		this.init();
	}


	init() {
		this._$element.DataTable(this.options);
	}

	_initOptions() {

		const options = Object.assign({}, this._userOptions);
		//const i18nFile = require('json-loader!./file.json');

		options.processing = true;
		options.serverSide = true;
		options.responsive = true;
		options.columns = this._getColumns();


		//filter
		options.filterForm = this._element.previousElementSibling;
		options.filterButton = options.filterForm.getElementsByTagName('button')[0];
		options.filterButton.addEventListener('click', () => this._doFilter(options));
		options.clearButton = options.filterForm.getElementsByClassName('rup-enlaceCancelar')[0];
		options.clearButton.addEventListener('click', () => this._clearFilter(options));




		// Urls
		options.urls = {};
		options.urls.base = this._element.getAttribute('data-url-base');
		options.urls.filter = options.urls.base + '/filter';






		options.ajax = this._ajaxOptions();

		options.language = {
			'url': '../../i18n/datatable_es.json'
		};




		return options;

	}

	_getColumns() {
		return this._$element.find('th[data-col-prop]').map((i, e) => {
			return {
				data: e.getAttribute('data-col-prop')
			};
		});
	}
	_doFilter(options) {

		this._$element.DataTable().settings()[0].ajax.filter = form2object(options.filterForm);
		this._$element.DataTable().ajax.reload();

	}

	_clearFilter(options) {

		// Se realiza el reset de los campos ordinarios
		//form.resetForm();
		jQuery('input[type!=\'button\'][type!=\'checkbox\'][type!=\'radio\'], textarea', options.filterForm).val('');
		jQuery('input[type=\'checkbox\']', options.filterForm).not('[name*=\'jqg_GRID_\']', options.filterForm).not('[disabled=\'disabled\']', options.filterForm).removeAttr('checked');
		// Se realiza el reset de los rup_combo
		jQuery.each($('select.rup_combo', options.filterForm), function (index, elem) {
			//if (settings.filter && settings.filter.clearSearchFormMode === 'reset') {
			//jQuery(elem).rup_combo('reset');
			//} else {
			//jQuery(elem).rup_combo('clear');
			//}
			jQuery(elem).rup_combo('reset');
		});
		//Vaciar los autocompletes
		$('[ruptype=\'autocomplete\']', options.filterForm).each(function (index, element) {
			$(element).val('');
		});

		//Vaciar los arboles
		$('[ruptype=\'tree\']', options.filterForm).each(function (index, element) {
			$(element).rup_tree('setRupValue', '');
		});


		$('input[type=\'radio\']', options.filterForm).removeAttr('checked');

		this._doFilter(options);

	}



	_ajaxOptions() {

		return {
			'url': this._userOptions.urlBase + '/filter',
			'dataSrc': this._ajaxSuccessData,
			'type': 'POST',
			'data': this._ajaxRequestData,
			'contentType': 'application/json',
			'dataType': 'json'

		};
	}

	_ajaxSuccessData(json) {
		var ret = {};

		json.recordsTotal = json.records;
		json.recordsFiltered = json.records;

		ret.recordsTotal = json.records;
		ret.recordsFiltered = json.records;
		ret.data = json.rows;
		return ret.data;

	}




	_ajaxRequestData(data, options) {

		data.filter = options.ajax.filter;
		var datatableRequest = new DataTableRequest(data);
		var json = $.extend({}, data, datatableRequest.getData());
		return JSON.stringify(json);


	}

}


plugin('rup_datatable', RupDatatable);

export {
	RupDatatable as
	default
};
