/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','../rup.base'], factory );
	} else {

		// Browser globals
		root.UploadJQueryUIAdapter = factory( jQuery );
	}
} (this,  function( $ ) {

	function UploadJQueryUIAdapter(){

	}

	UploadJQueryUIAdapter.prototype.NAME = 'upload_jqueryui';

	UploadJQueryUIAdapter.prototype.processdone = function (e, data) {
		$(e.target).find('.start').button('enable');
	};


	UploadJQueryUIAdapter.prototype.downloadTemplate = function(o){
		var that = this,
			rows = $(),
			files = o.files,
			options = o.options;
		$.each(files, function (index, file) {
			// file = that._downloadTemplateHelper(file);
			var row = $('<tr class="template-download"><td>' +
														(file.error ?
															'<td class="file_icon"></td>' +
																		'<td class="name"></td>' +
																		'<td class="size"></td>' +
																		'<td class="error" colspan="2"></td>'
															:
															'<div class="formulario_columna_cnt">' +
																'<span class="izq_float file_icon">&nbsp;</span>' +
																'<div class="izq_float name"><a></a></div>' +
																'</div>' +
																'<div class="formulario_columna_cnt">' +
																'<div class="izq_float type"></div>' +
																'<div class="izq_float size"></div>' +
																'</div>'+
																'<div class="formulario_columna_cnt">' +
																'<a><div class="izq_float">'+
																'<div class="file_download" >'+
																'<span class="file_download_icon">&nbsp;</span>'+
																'<span class="file_download_text">'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.openUploaded')+'</span></div>'+
																'</div></a>' +
																'<div class="izq_float delete"><button>'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.deleteUploaded')+'</button></div>' +
																'</div>'
														) +
														'</td></tr>');

			row.find('.size').text(file.sizef);
			row.find('.type').text(file.type);
			if (file.error) {
				row.find('.name').text(file.name);
				row.addClass('ui-state-error');
				row.find('.error').text(
					options.errorMessages[file.error] || file.error
				);
			} else {
				row.find('.name a').text(file.name);
				if (file.thumbnail_url) {
					row.find('.preview').append('<a><img></a>')
						.find('img').prop('src', file.thumbnail_url);
					row.find('a').prop('target', '_blank');
				}
				row.find('a').prop('href', $.rup_utils.setNoPortalParam(file.url));
				row.find('.delete button')
					.attr('data-type', file.delete_type)
					.attr('data-url',  $.rup_utils.setNoPortalParam(file.delete_url));
			}
			rows = rows.add(row);
		});
		return rows;
	};


	UploadJQueryUIAdapter.prototype.uploadTemplate = function(o) {
		var that = this,
			rows = $(),
			files = o.files,
			options = o.options;

		// var settings = $.data(this.element[0], "settings");


		$.each(files, function (index, file) {
			// file = that._uploadTemplateHelper(file);
			var row = $(
				'<tr class="template-upload"><td>' +
														'<div class="formulario_columna_cnt">' +
																'<span class="izq_float file_icon">&nbsp;</span>' +
																'<div class="izq_float name"><b></b></div>' +
																'<div class="formulario_columna_cnt">' +
																'<div class="izq_float type"></div>' +
																'<div class="izq_float size"></div>' +
																(options.submitInForm ?
																	'<div class="izq_float cancel" style><button>'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.cancelUpload')+'</button></div>'
																	: '') +
																'</div>' +
																(!options.submitInForm ?
																	'<div class="formulario_columna_cnt">' +
																(file.error ?
																	'<div class="izq_float error" ></div>'
																	:
																	'<div class="izq_float progress"><div></div></div>' +
																				'<div class="izq_float fileupload-buttonbar"><button class="start">'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.startUpload')+'</button>'
																) +
																'<button class="cancel">'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.cancelUpload')+'</button>' +
																'</div>':'<div class="izq_float start fileupload-buttonbar ui-button" style="display:none"><button>'+$.rup.i18nParse($.rup.i18n.base,'rup_upload.startUpload')+'</button></div>') +
																'</td></tr>');
			row.find('.name b').text(file.name);
			row.find('.size').text(file.sizef);
			row.find('.type').text(file.type);
			if (file.error) {
				row.addClass('ui-state-error');
				row.find('.error').text(
					options.errorMessages[file.error] || file.error
				);
			}

			rows = rows.add(row);
		});
		return rows;
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[UploadJQueryUIAdapter.prototype.NAME ] = new UploadJQueryUIAdapter;

	return $;
}));
