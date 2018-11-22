/* jslint multistr: true */


$.when(messageTester('Ok'))
	.then(messageTester('Alert'))
	.then(messageTester('Error'))
	.then(messageTester('Confirm'));

function messageTester(msgType) {
	var def = $.Deferred();
    describe('Test Message '+ msgType, () => {
		beforeAll((done) => {
			testutils.loadCss(done);
		});
		afterAll(() => {
			def.resolve();
		});
		beforeEach(() => {
			let clsCallback = () => {
				$('#content').addClass('msg-cls');
			};
			switch(msgType){
				case 'Ok':
					$.rup_messages('msgOK', {
						title: 'Correcto',
						message: 'Todo ha ido Ok',
						beforeClose: clsCallback
					});
					break;
				case 'Alert':
					$.rup_messages('msgAlert', {
						title: 'Aviso',
						message: 'Advertencia',
						beforeClose: clsCallback
					});
					break;
				case 'Error':
					$.rup_messages('msgError', {
						title: 'Error',
						message: 'Fallo',
						beforeClose: clsCallback
					});
					break;
				case 'Confirm':
					$.rup_messages('msgConfirm', {
						title: 'Confirmacion',
						message: 'Confirma?',
						beforeClose: clsCallback
					});
					break;
			}
		});
		afterEach(() => {
			let $ctn = $('#content');
			$ctn.is('.msg-cls') ? $ctn.removeClass('msg-cls') : undefined ;
			$ctn.nextAll().remove();
		});
		describe('Creación > ', () => {
			it('Posee las clases adecuadas:', () => {
				switch(msgType){
					case 'Ok':
						expect($('div.ui-dialog').is('.rup-message.rup-message-ok')).toBeTruthy();
						break;
					case 'Alert':
						expect($('div.ui-dialog').is('.rup-message.rup-message-alert')).toBeTruthy();
						break;
					case 'Error':
						expect($('div.ui-dialog').is('.rup-message.rup-message-error')).toBeTruthy();
						break;
					case 'Confirm':
						expect($('div.ui-dialog').is('.rup-message.rup-message-confirm')).toBeTruthy();
						break;
				}
			});
			it('Posee el título correspondiente:', () => {
				switch(msgType){
					case 'Ok':
						expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Correcto');
						break;
					case 'Alert':
						expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Aviso');
						break;
					case 'Error':
						expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Error');
						break;
					case 'Confirm':
						expect($('.ui-dialog-titlebar > span.ui-dialog-title').text()).toBe('Confirmacion');
						break;
				}
			});
			it('Posee el mensaje especificado:', () => {
				switch(msgType){
					case 'Ok':
						expect($('.ui-dialog-content > div.rup-message_msg-ok').text()).toBe('Todo ha ido Ok');
						break;
					case 'Alert':
						expect($('.ui-dialog-content > div.rup-message_msg-alert').text()).toBe('Advertencia');
						break;
					case 'Error':
						expect($('.ui-dialog-content > div.rup-message_msg-error').text()).toBe('Fallo');
						break;
					case 'Confirm':
						expect($('.ui-dialog-content > div.rup-message_msg-confirm').text()).toBe('Confirma?');
						break;
				}
			});
			it('Posee los botones apropiados:', () => {
				switch(msgType){
					case 'Ok':
						expect($('button',$('.ui-dialog-buttonset')).text()).toBe('Aceptar');
						break;
					case 'Alert':
						expect($('button',$('.ui-dialog-buttonset')).text()).toBe('Aceptar');
						break;
					case 'Error':
						expect($('button',$('.ui-dialog-buttonset')).text()).toBe('Aceptar');
						break;
					case 'Confirm':
						expect($('button',$('.ui-dialog-buttonset')).length).toBe(2);
						expect($('button:first',$('.ui-dialog-buttonset')).text()).toBe('Aceptar');
						expect($('button:last',$('.ui-dialog-buttonset')).text()).toBe('Cancelar');
						break;
				}
			});
		});
		describe('Funcionamiento > ', () => {
			describe('Cerrado del message > ', () => {
				beforeEach(() => {
					$('button.ui-dialog-titlebar-close').click();
				});
				it('Se cierra el message:', () => {
					expect($('.ui-dialog').length).toBe(0);
				});
				it('Se ejecuta el callback de cierre:', () => {
					expect($('#content').is('.msg-cls')).toBeTruthy();
				});
			});
		});
	});
}