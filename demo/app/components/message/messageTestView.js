define(['marionette',
	'./messageTestTemplate.hbs',
	'rup.message'], function(Marionette, MessageTestTemplate){

	var MessageTestView = Marionette.LayoutView.extend({
		template: MessageTestTemplate,
		ui:{
			btnError: '#btnError',
			btnConfirm: '#btnConfirm',
			btnOK: '#btnOK',
			btnAlert: '#btnAlert',
			btnAlertJS: '#btnAlertJS',
			buttons: 'button.message-button'
		},
		events:{
			'click @ui.btnError': fncClickBtnError,
			'click @ui.btnConfirm': fncClickBtnConfirm,
			'click @ui.btnOK': fncClickBtnOK,
			'click @ui.btnAlert': fncClickAlert,
			'click @ui.btnAlertJS': fncClickBtnAlertJS
		},
		onAttach: fncOnAttach
	});

	function fncOnAttach(){

		this.ui.buttons.rup_button({});

	}

	function fncClickBtnError(){
		$.rup_messages('msgError', {
			title: 'Error grave',
			message: '<p>Se ha producido un error a la hora de intentar guardar el registro.<br>Consulte con el administrador.</p>'
		});
	}

	function fncClickBtnConfirm(){
		$.rup_messages('msgConfirm', {
			message: '¿Está seguro que desea cancelar?',
			title: 'Confirmación',
			OKFunction : fncConfirmAcceptCallback
		});
	}

	function fncClickBtnOK(){
		$.rup_messages('msgOK', {
			title: 'Correcto',
			message: 'Todo ha ido OK.'
		});
	}

	function fncClickAlert(){
		$.rup_messages('msgAlert', {
			title: 'Alerta',
			message: 'Esto es una alerta.'
		});
	}

	function fncClickBtnAlertJS(){
		alert('esto es un alert de javascript puro');
	}

	function fncConfirmAcceptCallback(){
		alert('Aceptar');
	}

	return MessageTestView;
});
