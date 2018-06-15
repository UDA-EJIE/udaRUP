import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.dialog';

testDialogType($.rup.dialog.TEXT);
testDialogType($.rup.dialog.DIV);

function testDialogType(type) {
	describe('Test Dialog > ', () => {
		var $dialog;
		beforeEach(() => {
			let html, opciones;
			if(type == $.rup.dialog.TEXT) {
				html = '<div id="exampleDialogo"></div>'
				opciones = {
					type: type,
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo',
					message: 'MensajeDialogo'
				};
			}
			else {
				html = '<div id="exampleDialogo">MensajeDialogo</div>'
				opciones = {
					type: type,
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo'
				};
			}
			$('body').append(html);
			$('#exampleDialogo').rup_dialog(opciones);
			$dialogo = $('#exampleDialogo');
		});
		describe('Creación > ', () => {});
		describe('Métodos públicos > ', () => {
			describe('Método open e isOpen > ', () => {});
			describe('Método close e isOpen > ', () => {});
			describe('Método disable > ', () => {});
			describe('Método enable > ', () => {});
			describe('Método moveToTop > ', () => {});
			describe('Método getOption > ', () => {});
			describe('Método setOption > ',() => {});
			describe('Método createBtnLinks > ', () => {});
		});
	});
}

/*function testDialogType(type) {
	describe('Test Dialog > ', () => {
		var $dialogo;
		beforeEach( () => {
			let html = '<div id="exampleDialogo"></div>'
			$('body').append(html);
			let opciones = {
				type: type,
				autoOpen: false,
				width: 200,
				title: 'TituloDialogo',
				message: 'MensajeDialogo'
			};
			$('#exampleDialogo').rup_dialog(opciones);
			$dialogo = $('#exampleDialogo');
		});
		afterEach(() => {
			$('body').html('');
		});
		describe('Creacion > ', () => {
			it('debe existir:', () => {
				expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog').length)
					.toBe(1);
			});
		});
		describe('Métodos públicos:', () => {
			describe('Método open e isOpen', () => {
				beforeEach( () => {
					$dialogo.rup_dialog('open');
				});
				it('Debe ser visible:', () => {
					expect($dialogo.css('display')).toBe('block');
				});
				describe('Método isOpen:', () => {
					it('debe estar abierto:',  () => {
						expect($dialogo.rup_dialog('isOpen')).toBe(true);
					});
				});
			});
			describe('Método close e isOpen', () => {
				beforeEach( () => {
					$dialogo.rup_dialog('close');
				});
				it('No debe ser visible:', () => {
					expect($dialogo.is(':visible')).toBeFalsy();
				});
				it('No debe estar abierto', () => {
					expect($dialogo.rup_dialog('isOpen')).toBeFalsy();
				});
			});
			describe('Método widget', () => {
				it('No debe devolver undefined', () => {
					expect($dialogo.rup_dialog('widget')).toBeDefined();
				});
			});
			describe('Metodo moveToTop', () => {
				it('No debe lanzar error', () => {
					expect(() => {$dialogo.rup_dialog('moveToTop')}).not.toThrowError();
				});
			});
			describe('Método getOption', () => {
				it('Obtiene la opcion correctamente', () => {
					expect($dialogo.rup_dialog('getOption','width')).toBe(200);
				});
			});
			describe('Método setOption', () => {
				beforeEach(() => {
					$dialogo.rup_dialog('setOption', 'width', 260);
				});
				it('Establece la opcion correctamente', () => {
					expect($dialogo.rup_dialog('getOption','width')).toBe(260);
				});
			});
			/*
			//No existen estos metodos en el subyacente
			describe('Método disable', () => {});
			describe('Método enable', () => {});
			*//*
			describe('Método destroy', () => {
			    beforeEach(() => {
			        $dialogo.rup_dialog('destroy');
			    });
			    it('No debe existir:', () => {
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog').length)
						.toBe(0);
				});
			});
		});
	});
}

	testDialogType($.rup.dialog.TEXT);
	testDialogType($.rup.dialog.DIV);*/


