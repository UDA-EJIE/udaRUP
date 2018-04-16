import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.dialog';

describe('Test Dialog', () => {
	var $dialogo;
	function testDialogType(type) {
		describe('Test de creacion', () => {
			
			beforeAll( () => {
				var html = '<div id="exampleDialogo"></div>'
				$('body').append(html);
				let opciones = {
					type: type,
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo',
					message: 'MensajeDialogo'
				};
				$dialogo = $('#exampleDialogo');
				$dialogo.rup_dialog(opciones);
			});
			it('debe existir:', () => {
				expect($('.ui-dialog')).toExist();
			});
		});
		describe('Métodos públicos:', () => {
			describe('Método open e isOpen', () => {
				beforeAll( () => {
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
				beforeAll( () => {
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
				beforeAll(() => {
					$dialogo.rup_dialog('setOption', 'width', 260);
				});
				it('Establece la opcion correctamente', () => {
					expect($dialogo.rup_dialog('getOption','width')).toBe(260);
				});
			});
			describe('Método disable', () => {
			    beforeAll(() => {
			      if($dialogo.is(':disabled')){
			          $dialogo.enable();
			      }
			      $dialogo.rup_dialog('disable');
				});
				// TODO: Hay que comprobar como se deshabilita-.
			    it('Debe poder deshabilitarse', () => {
			      expect($dialogo.is(':disabled')).toBeTruthy();
			    });
			});
			describe('Método enable', () => {
			    beforeAll(() => {
			      if($dialogo.is(':enabled')){
			          $dialogo.disable();
			      }
			      $dialogo.rup_dialog('enable');
			    });
			    it('Debe poder habilitarse', () => {
					expect($dialogo.is(':disabled')).toBeFalsy();
			    });
			});
			describe('Método destroy', () => {
			    beforeAll(() => {
			        $dialogo.rup_dialog('destroy');
			    });
			    it('No debe existir', () => {
			        expect(() => {$dialogo.rup_dialog('destroy')}).toThrowError();
			    });
			});
		});
	}

	testDialogType($.rup.dialog.TEXT);
	testDialogType($.rup.dialog.DIV);

});
