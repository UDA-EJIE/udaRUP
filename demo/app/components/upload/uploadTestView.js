define(['marionette',
		'./uploadTestTemplate.hbs',
		'rup.upload', 'rup.button'
	],
	function (Marionette, UploadTestTemplate) {

		var UploadTestView = Marionette.View.extend({
			template: UploadTestTemplate,
			ui: {
				basicFileuploadContext: '#basicFileuploadContext'
			},
			onAttach: fncOnAttach

		});

		function fncOnAttach() {
			var $view = this;

			$('#basicFileupload').rup_upload({
				dataType: 'json',
				uploadTemplateId: false,
				downloadTemplateId: false,
				add: function (e, data) {
					$view.ui.basicFileuploadContext.text('Subiendo archivos...');
					data.submit();
				},
				done: function (e, data) {
					$.each(data.result, function (index, file) {
						$view.ui.basicFileuploadContext.text(file.name);
					});
				}
			});

		}



		return UploadTestView;
	});