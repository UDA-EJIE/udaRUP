'use strict';

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.returnExports = factory();
	}
}(typeof self !== 'undefined' ? self : this, function () {

	var DataTableRequest = function(data){

		var start = data.start,
			length = data.length,
			page = (start / length) + 1,
			sidx, sord;

		if (data.order.length>0){
			sidx = data.columns[data.order[0].column].colSidx ||  data.columns[data.order[0].column].data;
			sord = data.order[0].dir;
		}

		// super(length, (start / length) + 1, 'id', 'asc');
		this._data = data;
		this._start = start;
		this._length = length;
		this._filter = data.filter;

		this._rows = length;
		this._page = page;
		this._sidx = sidx;
		this._sord = sord;
		this._filter = data.filter;
	};

	DataTableRequest.prototype = {

		set rows(rows) {
			this._rows = rows;
		},
		get rows() {
			return this._rows;
		},
		set page(page) {
			this._page = page;
		},
		get page() {
			return this._page;
		},
		set sidx(sidx) {
			this._sidx = sidx;
		},
		get sidx() {
			return this._sidx;
		},
		set sord(sord) {
			this._sord = sord;
		},
		get sord() {
			return this._sord;
		},
		set filter(filter) {
			this._filter = filter;
		},
		get filter() {
			return this._filter;
		}
	};

	/**
	* Obtiene el objeto a mapear en el multiselect.
	*
	* @name getData
	* @private
	* @function
	* @return DataTableRequest
	* @example
	* 
	*/
	DataTableRequest.prototype.getData = function(){

		return {
			rows: this._rows,
			page: this._page,
			sidx: this._sidx,
			sord: this._sord,
			filter: this._filter,
			nd: Date.now(),
			core: {
				pkToken: '~',
				pkNames: ['id']
			}
		};

	};

	return DataTableRequest;

}));
