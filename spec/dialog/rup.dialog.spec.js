import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.dialog';

describe('Test Dialog', () => {
	function testDialogType(type) {
		describe('Test de creacion', () => {
			var $dialogo;
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
					expect($dialogo.css('display')).toBe('none');
				});
				it('No debe estar abierto', () => {
					expect($dialogo.rup_dialog('isOpen')).toBe(false);
				});
			});
			describe('Método widget', () => {
				it('No debe devolver undefined', () => {
					expect($dialogo.rup_dialog('widget')).toBeDefined();
				});
			});
			describe('Metodo moveToTop', () => {
				it('No debe lanzar error', () => {
					expect($dialogo.rup_dialog('moveToTop')).not.toThrowError();
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
			      $dialogo.rup_date('disable');
			    });
			    it('Debe poder deshabilitarse', () => {
			      expect($dialogo).toBeDisabled();
			    });
			});
			describe('Método enable', () => {
			    beforeAll(() => {
			      if($dialogo.is(':enabled') && 'disable' in methods){
			          $dialogo.disable();
			      }
			      $dialogo.rup_date('enable');
			    });
			    it('Debe poder habilitarse', () => {
			      expect($dialogo).not.toBeDisabled();
			    });
			});
			describe('Método destroy', () => {
			    beforeAll(() => {
			        $dialogo.rup_date('destroy');
			    });
			    it('No debe existir', () => {
			        expect($dialogo.rup_date('destroy')).toThrowError();
			    });
			});
		});
	}

	testDialogType($.rup.dialog.TEXT);
	testDialogType($.rup.dialog.DIV);

});
