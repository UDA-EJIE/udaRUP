'use strict';


class TableRequest {

	constructor(rows, page, sixd, sord) {
		this._rows = rows;
		this._page = page;
		this._sixd = sixd;
		this._sord = sord;
		this._filter;


	}

	getData() {

		return {
			rows: this._rows,
			page: this._page,
			sixd: this._sixd,
			sord: this._sord,
			filter: this._filter,
			nd: Date.now(),
			core: {
				pkToken: '~',
				pkNames: ['id']
			}
		};


	}


	set rows(rows) {
		this._rows = rows;
	}
	get rows() {
		return this._rows;
	}
	set page(page) {
		this._page = page;
	}
	get page() {
		return this._page;
	}
	set sixd(sixd) {
		this._sixd = sixd;
	}
	get sixd() {
		return this._sixd;
	}
	set sord(sord) {
		this._sord = sord;
	}
	get sord() {
		return this._sord;
	}

	set filter(filter) {
		this._filter = filter;
	}
	get filter() {
		return this._filter;
	}



}


class DataTableRequest extends TableRequest {

	constructor(data) {
		const start = data.start;
		const length = data.length;

		super(length, (start / length) + 1, 'id', 'asc');
		this._data = data;
		this._start = start;
		this._length = length;
		this._filter = data.filter;
	}


}

export {
	TableRequest,
	DataTableRequest
};