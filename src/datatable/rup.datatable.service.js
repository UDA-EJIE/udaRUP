'use strict';

import {RupXhrService} from '../utils/rup.xhr.service';

class RupDatatableService{



	static filter(url){


		var filterObj = {
			filter: {},
			rows: 10,
			page: 1,
			sixd: 'id',
			sord: 'asc',
			core: {
				pkToken: '~',
				pkNames: ['id']
			}

		};




		RupXhrService.ajax({
			url: url+'/filter',
			data: JSON.stringify(filterObj),
			type: 'post',
			contentType: 'application/json',
			dataType: 'json'
		});
	}

}

export { RupDatatableService };
