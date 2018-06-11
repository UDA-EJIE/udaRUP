/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';

const webRoot = "http://localhost:8081";

describe('Test Combo > ', () => {
	var $combo, $comboPadre, $comboHijo, $comboMulti;
	beforeEach(() => {
		setupCombos();

		$combo      = $('#combo');
		$comboMulti = $('#comboMulti');
		$comboPadre = $('#comboPadre');
		$comboHijo  = $('#comboHijo');
	});
	afterEach(() => {
		$('body').html('');
	});
	describe('Creacion > ', () => {
		describe('Combo simple >', () => {
			it('Debe tener el valor por defecto: ', () => {
				expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('Opcion2');
			});
		});
		describe('Combo padre >', () => {
			it('Debe tener el valor por defecto: ', () => {
				expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt1');
			});
		});
		describe('Combo hijo >', () => {
			it('Debe tener el valor por defecto: ', () => {
				expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt11');
			});
		});
		describe('Combo multiple >', () => {
			it('Debe tener el valor por defecto: ', () => {
				expect($('#comboMulti-button > span:not([class])').text()).toBe('1 seleccionado(s)');
			});
		});
	});
	describe('Métodos públicos > ', () => {
		describe('Métodos getRupValue y setRupValue > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('setRupValue','1');
				});
				it('Debe actualizarse la ui: ', () => {
					expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
				});
				it('Debe reflejarse en getRupValue: ', () => {
					expect($combo.rup_combo('getRupValue')).toBe('1');
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('setRupValue','2');
				});
				it('Debe actualizarse la ui: ', () => {
					expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt2');
				});
				it('Debe reflejarse en getRupValue: ', () => {
					expect($comboPadre.rup_combo('getRupValue')).toBe('2');
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					$comboHijo.rup_combo('setRupValue','1.2');
				});
				it('Debe actualizarse la ui: ', () => {
					expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt12');
				});
				it('El método getRupValue debe devolver el valor establecido', () => {
					expect($comboHijo.rup_combo('getRupValue')).toBe('1.2');
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('setRupValue', ['3', '4']);
				});
				it('Debe actualizarse ', () => {
					expect($('#comboMulti-button > span:not([class])').text()).toBe('2 seleccionado(s)');
				});
				it('El método getRupValue debe devolver el valor establecido', () => {
					expect($comboMulti.rup_combo('getRupValue')).toEqual(['3', '4']);
				});
			});
		});
		describe('Método clear > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('clear');
				});
				it('Debe actualizar la ui ', () => {
					expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('[Seleccione un elemento]');
				});
				it('El método getRupValue debe devolver el valor establecido', () => {
					expect($combo.rup_combo('getRupValue')).toEqual('0');
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('clear');
				});
				it('Debe actualizar la ui ', () => {
					expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('----');
				});
				it('El método getRupValue debe devolver el valor establecido', () => {
					expect($comboPadre.rup_combo('getRupValue')).toEqual('0');
				});
			});
			describe('Combo hijo > ', () => {
				describe('Combo padre > ', () => {
					beforeEach(() => {
						$comboHijo.rup_combo('clear');
					});
					it('Debe actualizar la ui ', () => {
						expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('[Selecciona Hijo]');
					});
					it('El método getRupValue debe devolver el valor establecido', () => {
						expect($comboHijo.rup_combo('getRupValue')).toEqual('0');
					});
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('clear');
				});
				it('Debe actualizar la ui ', () => {
					expect($('#comboMulti-button > span:not([class])').text()).toBe('Seleccione las opciones');
				});
				it('El método getRupValue debe devolver el valor establecido', () => {
					expect($comboMulti.rup_combo('getRupValue')).toEqual([]);
				});
			});
		});
		describe('Método change > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('change');
				});
				it('Debe aparecer la clase ', () => {
					expect($combo.hasClass('randomClass')).toBe(true);
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('change');
				});
				it('Debe aparecer la clase ', () => {
					expect($comboPadre.hasClass('randomClass')).toBe(true);
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					$comboHijo.rup_combo('change');
				});
				it('Debe aparecer la clase ', () => {
					expect($comboHijo.hasClass('randomClass')).toBe(true);
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('change');
				});
				it('Debe aparecer la clase ', () => {
					expect($comboMulti.hasClass('randomClass')).toBe(true);
				});
			});
		});
		describe('Método checkAll > ', () => {
			beforeEach(() => {
				$comboMulti.rup_combo('checkAll');
			});
			it('Debe modificar el ui ', () => {
				expect($('#comboMulti-button > span:not([class])').text()).toBe('6 seleccionado(s)');
			});
			it('Debe reflejarse en el getRupValue ', () => {
				expect($comboMulti.rup_combo('getRupValue')).toEqual(['1', '2', '3', '4', '5', '6']);
			});
		});
		describe('Método select > ', () => {
			describe('Combo simple > ', () => {
				describe('Selección por valor > ', () => {
					beforeEach(() => {
						$combo.rup_combo('select', '1');
					});
					it('Debe modificar la ui ', () => {
						expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($combo.rup_combo('getRupValue')).toBe('1');
					});
				});
				describe('Selección por índice > ', () => {
					beforeEach(() => {
						$combo.rup_combo('select', 1);
					});
					it('Debe modificar la ui ', () => {
						expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($combo.rup_combo('getRupValue')).toBe('1');
					});
				});
			});
			describe('Combo padre > ', () => {
				describe('Selección por valor > ', () => {
					beforeEach(() => {
						$comboPadre.rup_combo('select', '2');
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt2');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboPadre.rup_combo('getRupValue')).toBe('2');
					});
				});
				describe('Selección por índice > ', () => {
					beforeEach(() => {
						$comboPadre.rup_combo('select', 2);
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt2');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboPadre.rup_combo('getRupValue')).toBe('2');
					});
				});
			});
			describe('Combo hijo > ', () => {
				describe('Selección por valor > ', () => {
					beforeEach(() => {
						$comboHijo.rup_combo('select', '1.2');
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt12');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboHijo.rup_combo('getRupValue')).toBe('1.2');
					});
				});
				describe('Selección por índice > ', () => {
					beforeEach(() => {
						$comboHijo.rup_combo('select', 3);
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt12');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboHijo.rup_combo('getRupValue')).toBe('1.2');
					});
				});
			});
			describe('Combo multiple > ', () => {
				describe('Selección por valor > ', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('select', ['3', '4']);
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboMulti-button > span:not(class)').text()).toBe('3 seleccionado(s)');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboMulti.rup_combo('getRupValue')).toEqual(['2', '3', '4']);
					});
				});
				describe('Selección por índice > ', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('select', [2, 3]);
					});
					it('Debe modificar la ui ', () => {
						expect($('#comboMulti-button > span:not(class)').text()).toBe('3 seleccionado(s)');
					});
					it('Debe reflejarse en el método getRupValue', () => {
						expect($comboMulti.rup_combo('getRupValue')).toEqual(['2', '3', '4']);
					});
				});
			});
		});
		describe('Método selectLabel > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('selectLabel', 'Opcion1');
				});
				it('Debe modificar la ui ', () => {
					expect($('#combo-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
				});
				it('Debe reflejarse en el método getRupValue', () => {
					expect($combo.rup_combo('getRupValue')).toBe('1');
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('selectLabel', 'Opt2');
				});
				it('Debe modificar la ui ', () => {
					expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt2');
				});
				it('Debe reflejarse en el método getRupValue', () => {
					expect($comboPadre.rup_combo('getRupValue')).toBe('2');
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					$comboHijo.rup_combo('selectLabel', 'Subopt12');
				});
				it('Debe modificar la ui ', () => {
					expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt12');
				});
				it('Debe reflejarse en el método getRupValue', () => {
					expect($comboHijo.rup_combo('getRupValue')).toBe('1.2');
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('selectLabel', ['Opcion3', 'Opcion4']);
				});
				it('Debe modificar la ui ', () => {
					expect($('#comboMulti-button > span:not(class)').text()).toBe('3 seleccionado(s)');
				});
				it('Debe reflejarse en el método getRupValue', () => {
					expect($comboMulti.rup_combo('getRupValue')).toEqual(['2', '3', '4']);
				});
			});
		});
		describe('Método value > ', () => {
			describe('Combo simple > ', () => {
				it('Debe devolver el valor del componente', () => {
					expect($combo.rup_combo('value')).toBe('2');
				});
			});
			describe('Combo padre > ', () => {
				it('Debe devolver el valor del componente', () => {
					expect($comboPadre.rup_combo('value')).toBe('1');
				});
			});
			describe('Combo hijo > ', () => {
				it('Debe devolver el valor del componente', () => {
					expect($comboHijo.rup_combo('value')).toBe('1.1');
				});
			});
			describe('Combo multiple > ', () => {
				it('Debe devolver el valor del componente', () => {
					expect($comboMulti.rup_combo('value')).toEqual(['2']);
				});
			});
		});
		describe('Método label > ', () => {
			describe('Combo simple > ', () => {
				it('Debe devolver la label de la seleccion', () => {
					expect($combo.rup_combo('label')).toBe('Opcion2');
				});
			});
			describe('Combo padre > ', () => {
				it('Debe devolver la label de la seleccion', () => {
					expect($comboPadre.rup_combo('label')).toBe('Opt1');
				});
			});
			describe('Combo hijo > ', () => {
				it('Debe devolver la label de la seleccion', () => {
					expect($comboHijo.rup_combo('label')).toBe('Subopt11');
				});
			});
			describe('Combo multiple > ', () => {
				it('Debe devolver la label de la seleccion', () => {
					expect($comboMulti.rup_combo('label')).toEqual(['Opcion2']);
				});
			});
		});
		describe('Método index > ', () => {
			describe('Combo simple > ', () => {
				it('Debe devolver el indice de la seleccion', () => {
					expect($combo.rup_combo('index')).toBe(2);
				});
			});
			describe('Combo padre > ', () => {
				it('Debe devolver el indice de la seleccion', () => {
					expect($comboPadre.rup_combo('index')).toBe(1);
				});
			});
			describe('Combo hijo > ', () => {
				it('Debe devolver el indice de la seleccion', () => {
					expect($comboHijo.rup_combo('index')).toBe(2);
				});
			});
			describe('Combo multiple > ', () => {
				it('Debe devolver el indice de la seleccion', () => {
					expect($comboMulti.rup_combo('index')).toEqual([1]);
				});
			});
		});
		describe('Método disable e isDisabled > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('disable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($combo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
				});
				it('El metodo isDisabled debe devolver true', () => {
					expect($combo.rup_combo('isDisabled')).toBe(true);
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('disable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboPadre.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
				});
				it('El metodo isDisabled debe devolver true', () => {
					expect($comboPadre.rup_combo('isDisabled')).toBe(true);
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					$comboHijo.rup_combo('disable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
				});
				it('El metodo isDisabled debe devolver true', () => {
					expect($comboHijo.rup_combo('isDisabled')).toBe(true);
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('disable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboMulti.attr('disabled')).toBe('disabled');
				});
				it('El metodo isDisabled debe devolver true', () => {
					expect($comboMulti.rup_combo('isDisabled')).toBe(true);
				});
			});
		});
		describe('Método enable e isDisabled > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					$combo.rup_combo('disable');
					$combo.rup_combo('enable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($combo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
				});
				it('El metodo isDisabled debe devolver false', () => {
					expect($combo.rup_combo('isDisabled')).toBe(false);
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					$comboPadre.rup_combo('disable');
					$comboPadre.rup_combo('enable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboPadre.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
				});
				it('El metodo isDisabled debe devolver false', () => {
					expect($comboPadre.rup_combo('isDisabled')).toBe(false);
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					$comboHijo.rup_combo('disable');
					$comboHijo.rup_combo('enable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
				});
				it('El metodo isDisabled debe devolver false', () => {
					expect($comboHijo.rup_combo('isDisabled')).toBe(false);
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('disable');
					$comboMulti.rup_combo('enable');
				});
				it('Debe tener las clases de deshabilitado', () => {
					expect($comboMulti.attr('disabled')).toBe(undefined);
				});
				it('El metodo isDisabled debe devolver false', () => {
					expect($comboMulti.rup_combo('isDisabled')).toBe(false);
				});
			});
		});
		describe('Método disableChild > ', () => {
			beforeEach(() => {
				$comboPadre.rup_combo('disableChild');
			});
			it('Debe deshabilitar el combo padre', () => {
				expect($comboPadre.rup_combo('isDisabled')).toBe(true);
			});
			it('Debe deshabilitar el combo hijo', () => {
				expect($comboHijo.rup_combo('isDisabled')).toBe(true);
			});
		});
		describe('Método disableOpt > ', () => {
			beforeEach(() => {
				$comboMulti.rup_combo('disableOpt', '4');
			});
			it('Debe tener el atributo de deshabilitado', () => {
				let context = $('#rup-multiCombo_comboMulti > ul > li > label:contains("Opcion4")');
				expect($('input[disabled="disabled"]', context).length).toBe(1);
			});
		});
		describe('Método disableOptArr > ', () => {
			beforeEach(() => {
				$comboMulti.rup_combo('disableOptArr', ['4','5']);
			});
			it('Deben deshabilitarse las opciones especificadas', () => {
				let labels = ['Opcion4', 'Opcion5'];
				labels
					.map(x => $('#rup-multiCombo_comboMulti > ul > li > label:contains("'+ x +'")'))
					.forEach(cur => {
						expect($('input[disabled="disabled"]',cur).length).toBe(1);
					});
			});
		});
		describe('Método enableOpt > ', () => {
			beforeEach(() => {
				$comboMulti.rup_combo('disableOpt', '4');
				$comboMulti.rup_combo('enableOpt', '4');
			});
			it('Debe tener el atributo de deshabilitado', () => {
				let context = $('#rup-multiCombo_comboMulti > ul > li > label:contains("Opcion4")');
				expect($('input[disabled="disabled"]', context).length).toBe(0);
			});
		});
		describe('Método enableOptArr > ', () => {
			beforeEach(() => {
				$comboMulti.rup_combo('disableOptArr', ['4', '5']);
				$comboMulti.rup_combo('enableOptArr', ['4', '5']);
			});
			it('Deben deshabilitarse las opciones especificadas: ', () => {
				let labels = ['Opcion4','Opcion5'];

				labels
					.map(x => $('#rup-multiCombo_comboMulti > ul > li > label:contains("'+ x +'")'))
					.forEach(cur => {
						expect($('input[disabled="disabled"]',cur).length).toBe(0);
					});
			});
		});
		describe('Método refresh > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$combo.append(newOpt);
					$combo.rup_combo('refresh');
				});
				it('Debe haber metido el elemento:', () => {
					expect($('#combo-menu > li > a:contains("Intruso")').length).toBe(1);
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboPadre.append(newOpt);
					$comboPadre.rup_combo('refresh');
				});
				it('Debe haber metido el elemento:', () => {
					expect($('#comboPadre-menu > li > a:contains("Intruso")').length).toBe(1);
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboHijo.append(newOpt);
					$comboHijo.rup_combo('refresh');
				});
				it('Debe haber metido el elemento:', () => {
					expect($('#comboHijo-menu > li > a:contains("Intruso")').length).toBe(1);
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboMulti.append(newOpt);
					$comboMulti.rup_combo('refresh');
				});
				it('Debe haber metido el elemento:', () => {
					expect($('#rup-multiCombo_comboMulti > ul > li > label > span:contains("Intruso")').length).toBe(1);
				});
			});
		});
		describe('Método reload > ', () => {
			beforeEach(() => {
				let html = '<select id="comboRemoto"></select>';
				$('body').append(html);
				$('#comboRemoto').rup_combo({
					source: webRoot + '/demo/comboSimple/remote',
					sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"}
				});
				$('#comboRemoto').append('<option class="intruso">intruso</option>');
				$('#comboRemoto').rup_combo('refresh');
				$('#comboRemoto').rup_combo('reload');
			});
			it('Debe crearse', () => {
				expect($('#comboRemoto-menu > li > a:contains("intruso")').length).toBe(0);
			});
		});
		describe('Método order > ', () => {
			describe('Combo simple > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$combo.append(newOpt);
					$combo.rup_combo('refresh');
					$combo.rup_combo('order');
				});
				it('Intruso debe ser la primera opcion', () => {
					expect($('#combo-menu > li').eq(1).text()).toBe('Intruso');
				});
			});
			describe('Combo padre > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboPadre.append(newOpt);
					$comboPadre.rup_combo('refresh');
					$comboPadre.rup_combo('order');
				});
				it('Intruso debe ser la primera opcion', () => {
					expect($('#comboPadre-menu > li').eq(1).text()).toBe('Intruso');
				});
			});
			describe('Combo hijo > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboHijo.append(newOpt);
					$comboHijo.rup_combo('refresh');
					$comboHijo.rup_combo('order');
				});
				it('Intruso debe ser la primera opcion', () => {
					expect($('#comboHijo-menu > li').eq(2).text()).toBe('Intruso');
				});
			});
			describe('Combo multiple > ', () => {
				beforeEach(() => {
					let newOpt = new Option('Intruso', 'intruso_value');
					$comboMulti.append(newOpt);
					$comboMulti.rup_combo('refresh');
					$comboMulti.rup_combo('order');
				});
				it('Intruso debe ser la primera opcion', () => {
					expect($('#rup-multiCombo_comboMulti > ul > li').eq(0).text()).toBe('Intruso');
				});
			});
		});
	});
});

function setupCombos(){
	let html = '<select id="combo"></select>\
		<select id="comboMulti"></select>\
		<select id="comboPadre"></select>\
		<select id="comboHijo"></select>';
	$('body').append(html);

	let source = [
		{i18nCaption: 'Opcion1', value: '1'},
		{i18nCaption: 'Opcion2', value: '2'},
		{i18nCaption: 'Opcion3', value: '3'},
		{i18nCaption: 'Opcion4', value: '4'},
		{i18nCaption: 'Opcion5', value: '5'},
		{i18nCaption: 'Opcion6', value: '6'}
	];
	let optionsSimple = {
		change: () =>{$('#combo').addClass('randomClass');},
		source: source,
		blank: '0',
		selected: '2'
	};
	let optionsMulti = {
		change: () =>{$('#comboMulti').addClass('randomClass');},
		source: source,
		selected: ['2'],
		multiselect:true
	};
	let optionsPadre = {
		change: () =>{$('#comboPadre').addClass('randomClass');},
		source:[
			{i18nCaption:'Opt1', value:'1'},
			{i18nCaption:'Opt2', value:'2'}
		],
		blank: '0',
		selected:'1'
	};
	let optionsHijo = {
		change: () =>{$('#comboHijo').addClass('randomClass');},
		parent:['comboPadre'],
		source:{
			'1':[{i18nCaption:'Subopt11', value:'1.1'},{i18nCaption:'Subopt12', value:'1.2'}],
			'2':[{i18nCaption:'Subopt21', value:'2.1'},{i18nCaption:'Subopt22', value:'2.2'}]
		},
		blank:'0',
		selected:'1.1'
	};

	$('#combo').rup_combo(optionsSimple);
	$('#comboMulti').rup_combo(optionsMulti);
	$('#comboPadre').rup_combo(optionsPadre);
	$('#comboHijo').rup_combo(optionsHijo);

	//Mete automaticamente randomClass asi que lo quitamos
	$('#combo').removeClass('randomClass');
	$('#comboMulti').removeClass('randomClass');
	$('#comboPadre').removeClass('randomClass');
	$('#comboHijo').removeClass('randomClass');
}