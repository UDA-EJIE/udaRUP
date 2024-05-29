define(['marionette',
	'./accordionTestTemplate.hbs',
	'rup.accordion','rup.button'], function(Marionette, AccordionTestTemplate){

	var AccordionTestView = Marionette.View.extend({
		template: AccordionTestTemplate,
		ui:{
			accordion: '.rup_accordion',
			toolbarMixta: '#toolbarMixta',
			toolbarRight: '#toolbarRight'
		},
		onAttach: fncOnAttach

	});

	function fncOnAttach(){

		$('.rup_accordion').rup_accordion({
			animated: 'bounceslide',
			active: false,
			autoHeight: false,
			collapsible: true
		});

		$('#accordionExample2').rup_accordion('option','change', function(event, ui){
			//section autocomplete
			if(ui.options.active === 0){
				$('#autocomplete').rup_select('search', 'java');
				//seccion mantenimiento
			} else if (ui.options.active === 1){

				//////////////////////////
				//seccion Mantenimiento
				//////////////////////////

				if($('#mockPageContent').length > 0){
					$('#mockPageContent').remove();
				}

				$.rup_ajax({
					url: '/x21aMantenimientosWar/usuario/groupMulti',
					//Cabecera RUP
					success: function(data) {
						$('#maintGroup').html('');
						$('#maintGroup').append(data);
					},
					error: function (){
						$.rup.errorGestor(
								'Se ha producido un error al recuperar los datos del servidor',
								$.rup.i18nParse($.rup.i18n.base, 'rup_global.error'));
					}
				});
			} else if (ui.options.active === 2){

				/////////////////////
				//seccion pestañas
				/////////////////////

				if($('#mockPageContent').length > 0){
					$('#mockPageContent').remove();
				}

				if(!$('#maintTab').hasClass('ui-tabs')){
					$('#maintTab').rup_tabs({
						tabs:[
							{i18nCaption:'maint1', url:'/x21aMantenimientosWar/usuario/simpleTable1'},
							{i18nCaption:'maint2', url:'/x21aMantenimientosWar/usuario/simpleTable2'},
							{i18nCaption:'maint3', url:'/x21aMantenimientosWar/usuario/simpleTable3'},
							{i18nCaption:'edit1', url:'/x21aMantenimientosWar/usuario/editTable1'},
							{i18nCaption:'multi1', url:'/x21aMantenimientosWar/usuario/multiTable1'}],
						load: function(){
							if($('#mockPageContent').length > 0){
								$('#maintTab').rup_tabs('disableTabs', {
									idTab: 'maintTab',
									position: [1,2,3,4]
								});
								$('#mockPageContent #loginButtonObject').on('click', function (){
									$('#maintTab').rup_tabs('enableTabs', {
										idTab: 'maintTab',
										position: [1,2,3,4]
									});
								});
							}
						}
					});
				} else {
					$('#maintTab').rup_tabs('loadTab', {
						idTab: 'maintTab',
						position: 0
					});
					$('#maintTab').rup_tabs('selectTab', {
						idTab: 'maintTab',
						position: 0
					});
				}
			}
		});

		$('#accordionExample2').rup_accordion('option','changestart', function(event, ui){
			//section autocomplete
			if (ui.options.active === 1){
				$('#maintGroup').html('');
			}
		});

		/////////////////////////
		//section autocomplete
		/////////////////////////

		$('#autocomplete').rup_select({
			data: [
				{i18nCaption: 'asp', id:'asp_value'},
				{i18nCaption: 'c', id:'c_value'},
				{i18nCaption: 'c++', id:'c++_value'},
				{i18nCaption: 'coldfusion', id:'coldfusion_value'},
				{i18nCaption: 'groovy', id:'groovy_value'},
				{i18nCaption: 'haskell', id:'haskell_value'},
				{i18nCaption: 'java', id:'java_value'},
				{i18nCaption: 'javascript', id:'javascript_value'},
				{i18nCaption: 'perl', id:'perl_value'},
				{i18nCaption: 'php', id:'php_value'},
				{i18nCaption: 'python', id:'python_value'},
				{i18nCaption: 'ruby', id:'ruby_value'},
				{i18nCaption: 'scala', id:'scala_value'}
			],
			autocomplete: true,
			contains: false
		});

		$('#patron').rup_select({
			url: 'autocomplete/remote',
			sourceParam: {text:'desc'+$.rup_utils.capitalizedLang(), id:'code'},
			autocomplete: true,
			minLength: 4
		});

		///////////////////
		//seccion upload
		///////////////////

		// Creacion de los componentes feedback
		$('#feedback_fileupload_form_multiple').rup_feedback();

		// Se utiliza jquery.form para realizar el submit de los formularios por AJAX
		$('#usuarioFormSimple').ajaxForm(function(){
			$('#feedback_fileupload_form_multiple').rup_feedback('set','Los datos se han enviado correctamente');
		});

		// Dos controles Upload intergrados en un mismo formulario
		$('#fileupload_file_form_padre').rup_upload({
			form:'fileupload_form_multiple',
			fileInput: $('#file_form_padre'),
			submitFormButton: $('#sendButtonMultiple'),
			maxFileSize: 5000000,
			singleFileUploads:true,
			submitInForm:true
		});

		$('#fileupload_file_form_madre').rup_upload({
			form:'fileupload_form_multiple',
			fileInput: $('#file_form_madre'),
			submitFormButton: $('#sendButtonMultiple'),
			maxFileSize: 5000000,
			singleFileUploads:true,
			submitInForm:true
		});

	}


	return AccordionTestView;
});
