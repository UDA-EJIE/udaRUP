/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','../templates','../rup.base'], factory );
	} else {

		// Browser globals
		root.UploadBootstrapAdapter = factory( jQuery );
	}
} (this,  function( $, Rup ) {

	function UploadBootstrapAdapter(){

	}

	UploadBootstrapAdapter.prototype.NAME = 'upload_bootstrap';

	UploadBootstrapAdapter.prototype.processdone = function (e, data) {
		//$(e.target).find('.start').removeAttr('disabled');
	};

	UploadBootstrapAdapter.prototype.downloadTemplate = function(o){
		var that = this,
			rows = $(),
			files = o.files,
			options = o.options;
		rows = $('<ul>').addClass('list-group');

		return Rup.Templates.rup.upload.downloadTemplate({
			files:files
		});

	};

	UploadBootstrapAdapter.prototype.uploadTemplate = function(o) {
		var files = o.files,
			options = o.options;
		
		function formatFileSize(bytes) {
			if (bytes === 0) return '0 Bytes';
			var k = 1024;
			var sizes = ['Bytes', 'KB', 'MB', 'GB'];
			var i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
		}
		
		var processedFiles = [];
		if (files && files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				processedFiles.push({
					name: file.name,
					type: file.type,
					size: file.size,
					sizef: file.sizef || formatFileSize(file.size)
				});
			}
		}
		
		return Rup.Templates.rup.upload.uploadTemplate({
			files: processedFiles,
			submitInForm: options.submitInForm===true?true:undefined,
			notSubmitInForm: !(options.submitInForm===true?true:undefined)
		});
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[UploadBootstrapAdapter.prototype.NAME ] = new UploadBootstrapAdapter;

	return $;
}));
