import scss1 from '../../dist/css/rup-base.css';
import scss2 from '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'rup.dialog';

testDialogType($.rup.dialog.TEXT);
testDialogType($.rup.dialog.DIV);
testDialogType($.rup.dialog.AJAX);

function testDialogType(type) {
	describe('Test Dialog '+ type +' > ', () => {
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
			if(type == $.rup.dialog.DIV) {
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
			if(type == $.rup.dialog.AJAX) {
				html = '<div id="exampleDialogo">MensajeDialogo</div>';
				opciones = {
					type: type,
					url: 'http://localhost:8081/demo/demo-idx.html',
					autoOpen: false,
					width: 200,
					title: 'TituloDialogo',
					resizable: false
				};
			}
			$('head').append('<link rel="stylesheet" type="text/css" href="http://localhost:8081/dist/css/rup-base.css" />');
			$('head').append('<link rel="stylesheet" type="text/css" href="http://localhost:8081/dist/css/rup-theme.css" />');
			
			/*
			//El AJAX Chusca :)
			$.ajax({
				type: 'GET',
				url: 'http://localhost:8081/demo/demo-idx.html',
				success: function() {
					console.info('CHUSCA !=================================================');
				},
				error: function() {
					console.info('NO CHUSCA !=================================================');
				}            
			});

			$.ajax({
				type: 'GET',
				url: 'http://localhost:8081/dist/css/rup-base.css',
				success: function() {
					console.info('CHUSCA !=================================================');
				},
				error: function() {
					console.info('NO CHUSCA !=================================================');
				}            
			});*/
			$('#content').append(html);
			$('#exampleDialogo').rup_dialog(opciones);
			/**
			 * En el caso de AJAX $dialogo es undefined:
			 *  a) No obtiene correctamente el contenido de la url
			 *  b) Al ser asíncrono tarda demasiado y se ejecutan los test
			 * 	 antes de que se defina $dialogo.
			 */
			$dialogo = $('#exampleDialogo');
		});
		afterEach(() => {
			$dialogo.rup_dialog('destroy');
			$dialogo = undefined;
			$('link[href="http://localhost:8081/dist/css/rup-base.css"]','head').remove();
			$('link[href="http://localhost:8081/dist/css/rup-theme.css"]','head').remove();
			$('#content').nextAll().remove();
			$('#content').html('');
		});
		describe('Creación > ', () => {
			it('Debe crearse el contenedor del dialogo:', () => {
				if(type == $.rup.dialog.TEXT) {
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
						.length).toBe(1);
				}
				if(type == $.rup.dialog.DIV) {
					let selector = $('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog');
					expect(selector.length).toBe(1);
					expect(selector.hasClass('ui-resizable')).toBe(false);
				}
				if(type == $.rup.dialog.AJAX) {
					console.info('************************************************************************************');
					console.info($dialogo.parent());
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
						.length).toBe(1);
				}
			});
			it('El contenedor no debe ser visible:', () => {
				expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
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
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
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

					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
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
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
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
					expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
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
					//console.info($('body').html());
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
