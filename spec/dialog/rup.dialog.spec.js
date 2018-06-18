import 'jquery';
import 'jasmine-jquery';
import 'rup.dialog';

testDialogType($.rup.dialog.TEXT);
testDialogType($.rup.dialog.DIV);

function testDialogType(type) {
	describe('Test Dialog > ', () => {
		var $dialogo;
		beforeEach(() => {
			let html, opciones;
			if(type == $.rup.dialog.TEXT) {
				html = '<div id="exampleDialogo"></div>';
				opciones = {
					type: type,
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo',
					message: 'MensajeDialogo'
				};
			}
			else {
				html = '<div id="exampleDialogo">MensajeDialogo</div>';
				opciones = {
					type: type,
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo',
					resizable: false,
					modal: true
				};
			}
			$('#content').append(html);
			$('#exampleDialogo').rup_dialog(opciones);
			$dialogo = $('#exampleDialogo');
		});
		afterEach(() => {
			$dialogo.rup_dialog('destroy');
			$('#content').nextAll().remove();
			$('#content').html('');
		});
		describe('Creación > ', () => {
			it('Debe crearse el contenedor del dialogo:', () => {
				expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
					.length).toBe(1);
			});
			it('El contenedor no debe ser visible:', () => {
				expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
					.is(':visible')).toBe(false);
			});
			it('Debe contener el texto establecido:', () => {
				expect($dialogo.text()).toBe('MensajeDialogo');
			});
		});
		describe('Métodos públicos > ', () => {
			describe('Método open e isOpen > ', () => {
				beforeEach(() => {
					$dialogo.rup_dialog('open');
				});
				it('Debe ser visible:', () => {
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
						.is(':visible')).toBe(true);
				});
				it('Debe devolver correctamente el resultado de isOpen:', () => {
					expect($dialogo.rup_dialog('isOpen')).toBe(true);
				});
			});
			describe('Método close e isOpen > ', () => {
				beforeEach(() => {
					$dialogo.rup_dialog('open');
					$dialogo.rup_dialog('close');
				});
				it('Debe ser visible:', () => {
					console.info($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog').html());
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
						.is(':visible')).toBe(false);
				});
				it('Debe devolver correctamente el resultado de isOpen:', () => {
					expect($dialogo.rup_dialog('isOpen')).toBe(false);
				});
			});
			describe('Método disable > ', () => {
				beforeEach(() => {
					$dialogo.rup_dialog('disable');
				});
				it('Los métodos no deberían funcionar:', () => {
					$dialogo.rup_dialog('open');
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
						.is(':visible')).toBe(false);
				});
			});
			describe('Método enable > ', () => {
				beforeEach(() => {
					$dialogo.rup_dialog('disable');
					$dialogo.rup_dialog('enable');
				});
				it('Los métodos no deberían funcionar:', () => {
					$dialogo.rup_dialog('open');
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
						.is(':visible')).toBe(true);
				});
			});
			describe('Método moveToTop > ', () => {
				beforeEach(() => {
					let aux = '<div id="auxDialog"></div>';
					$('body').append(aux);
					let opts = {
						type: $.rup.dialog.TEXT,
						autoOpen: true,
						width: 200,
						title: 'TituloDialogo',
						message: 'MensajeDialogo'
					};
					$dialogo.rup_dialog('open');
					$('#auxDialog').rup_dialog(opts);
					$dialogo.rup_dialog('moveToTop');
				});
				it('El dialog debe estar encima del aux:', () => {
					console.info($('body').html());
					expect($dialogo.parent().css('z-index'))
						.toBeGreaterThan($('#auxDialog').parent().css('z-index'));
				});
			});
			describe('Método getOption > ', () => {
				it('Debe devolver los valores esperados:', () => {
					expect($dialogo.rup_dialog('getOption', 'width')).toBe(200);
					expect($dialogo.rup_dialog('getOption', 'type')).toBe(type);
				});
			});
			describe('Método setOption > ',() => {
				beforeEach(() => {
					$dialogo.rup_dialog('setOption', 'width', 400);
					$dialogo.rup_dialog('setOption', 'draggable', false);
				});
				it('Debe devolver los valores esperados:', () => {
					expect($dialogo.rup_dialog('getOption', 'width')).toBe(400);
					expect($dialogo.rup_dialog('getOption', 'draggable')).toBe(false);
				});
			});
			// TODO: No entiendo el objetivo de este método
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


