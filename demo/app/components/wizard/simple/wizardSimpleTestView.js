define(['marionette',
	'./wizardSimpleTestTemplate.hbs',
	'rup.wizard','rup.button'], function(Marionette, WizardSimpleTestTemplate){

	var WizardSimpleTestView = Marionette.LayoutView.extend({
		template: WizardSimpleTestTemplate,

		onAttach: fncOnAttach
	});

	function fncOnAttach(){
		// Feedback
		var $feedbackErroresValidaciones = jQuery('#feedbackErroresValidaciones').rup_feedback({
			closeLink: true,
			block:false
		});

		jQuery('#wizardForm').rup_validate({
			feedback: $feedbackErroresValidaciones,
			rules:{
				'username':{required:true},
				'password':{required:true}
			}
		});

		jQuery.validator.addMethod('validacionPropia', function(value, element) {
			return element.value()==='Uda';
		});


		$('#radio_summary_yes').click(function(){
			$('[name=accordion]').attr('disabled',false);
			$('[name=tabs2accordion]').attr('disabled',false);
		});
		$('#radio_summary_no').click(function(){
			$('[name=accordion]').attr('disabled',true);
			$('[name=tabs2accordion]').attr('disabled',true);
		});

		$('#makeWizard').click(function (){
			$('#wizardForm').rup_wizard({
				submitButton: 'saveForm',
				submitFnc : function(){
					//Función que se ejecuta antes de enviar el formulario
					//console.log("Enviando formulario...");
					window.alert('Enviando formulario...');
				},
				//parseJSON para convertir String en Boolean
				summary: $.parseJSON($('[name=summary]:checked').val()),
				summaryWithAccordion: $.parseJSON($('[name=accordion]:checked').val()),
				summaryTabs2Accordion: $.parseJSON($('[name=tabs2accordion]:checked').val()),
				summaryFnc_PRE: function(){
					//Función adicional previa al generar el resumen (con return false se corta generación)
					//console.log("Generando resumen...");
				},
				summaryFnc_INTER: function(){
					//Función adicional intermedia al generar el resumen (con return false se corta generación)
					//console.log("Comenzando gestión elementos...");
				},
				summaryFnc_POST: function(){
					//Función adicional posterior al generar el resumen (con return false se corta generación)
					//console.log("Resumen generado.");
				},
				stepFnc : {
					//Funciones de cada paso.
					0 : function (){
						//						console.log("Ir al paso "+$("#stepDesc0").children("a").text());
					},
					1 : function (){
						//						console.log("Ir al paso "+$("#stepDesc1").children("a").text());
					},
					2 : function (){
						var valid = true, validator = jQuery('#wizardForm').validate();

						valid = validator.element('#username') && valid;
						valid = validator.element('#password') && valid;

						return valid;





						//						if ($("#wizardForm").rup_wizard("getCurrentStep")==0 && $("#username").val()!=="uda"){
						//							window.alert("El campo 'Usuario' deber contener 'uda'");
						//							return false;
						//						}
						//						console.log("Ir al paso "+$("#stepDesc2").children("a").text());
					},
					3 : function (){
						//					console.log("Ir al paso "+$("#stepDesc3").children("a").text());
					}
				}
				, disabled : [1] //Intervalos con string separado con guión (ej. "1-2")
			});
			$('#wizard_options').remove();
		});

		//Pasos
		$('#tabs').rup_tabs({
			tabs : [
				{i18nCaption:'Empleado', layer:'#empleado'},
				{i18nCaption:'Empresa', tabs:[
					{i18nCaption:'Datos', layer:'#empresa_datos'},
					{i18nCaption:'Delegaciones', tabs: [
						{i18nCaption:'Araba', layer:'#empresa_araba'},
						{i18nCaption:'Bizkaia', layer:'#empresa_bizkaia'},
						{i18nCaption:'Gipuzkoa', layer:'#empresa_gipuzkoa'}
					]}
				]},
				{i18nCaption:'Datos adicionales', layer:'#otros_datos'}
			]
		});

		$.rup_date({
			from: 'desde',
			to: 'hasta',
			labelMaskId : 'intervalo-mask',
			numberOfMonths: 3
		});

		$('#hora_entrada').rup_time({
			labelMaskId : 'hora-mask',
			showSecond : true,
			timeFormat: 'hh:mm:ss',
			showButtonPanel: true
		});

		$('#hora_salida').rup_time({
			showSecond : true,
			timeFormat: 'hh:mm:ss',
			showButtonPanel: true
		});

		$('#dias').rup_combo({
			source : ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
			ordered: false,
			width: 320,
			multiselect: true,
			summaryInline : true
		});


		$('#cliente').rup_combo({
			sourceGroup : [
				{'Invierno' : ['Enero', 'Febrero', 'Marzo']},
				{'Primavera' : ['Abril', 'Mayo', 'Junio']},
				{'Verano' : [ 'Julio', 'Agosto', 'Septiembre']},
				{'Otoño' : [ 'Octubre', 'Noviembre', 'Diciembre']}
			],
			width: 400,
			height: 300,
			multiselect: true
		});

		$('#meses').rup_accordion({
			animated: 'bounceslide',
			active: false,
			autoHeight: false,
			collapsible: true
		});
	}


	return WizardSimpleTestView;
});
