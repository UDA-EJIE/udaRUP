import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';

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
				expect($('#comboMulti-button > spa:not([class])').text())
			});
			it('Debe reflejarse en el getRupValue ', () => {
				expect($comboMulti.rup_combo('getRupValue')).toEqual(['1', '2', '3', '4', '5', '6']);
			});
		});
		describe('Método select > ', () => {
			describe('Combo simple > ', () => {
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
			describe('Combo padre > ', () => {
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
			describe('Combo hijo > ', () => {
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
			describe('Combo multiple > ', () => {
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
			describe('Combo simple > ', () => {});
			describe('Combo padre > ', () => {});
			describe('Combo hijo > ', () => {});
			describe('Combo multiple > ', () => {});
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
			describe('Combo multiple > ', () => {});
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
};

/*
describe('Test Combo', () => {
		var $combo, $comboMulti;
		beforeEach(() => {
			var html = '<select id="exampleCombo"></select>'
					+  '<select id="exampleComboMulti"></select>'
					+  '<select id="exampleComboPadre"></select>'
					+  '<select id="exampleComboHijo"></select>';
			var source = [
				{i18nCaption: 'Opcion1', value: '1'},
				{i18nCaption: 'Opcion2', value: '2'},
				{i18nCaption: 'Opcion3', value: '3'},
				{i18nCaption: 'Opcion4', value: '4'},
				{i18nCaption: 'Opcion5', value: '5'},
				{i18nCaption: 'Opcion6', value: '6'}
			];
			$('body').append(html);
			var optionsSimple = {
				change: () =>{$('#exampleCombo').addClass('randomClass');},
				source: source,
				blank: '0',
				selected: '2'
			}
			var optionsMulti = {
				change: () =>{$('#exampleComboMulti').addClass('randomClass');},
				source: source,
				blank: '0',
				selected: ['2'],
				multiselect:true
			}
			var optionsPadre = {
				source:[
					{i18nCaption:'Opt1', value:'1'},
					{i18nCaption:'Opt2', value:'2'}
				],
				selected:'1'
			};
			var optionsHijo = {
				parent:['exampleComboPadre'],
				source:{
					'1':[{i18nCaption:'Subopt11', value:'1.1'},{i18nCaption:'Subopt12', value:'1.2'}],
					'2':[{i18nCaption:'Subopt21', value:'2.1'},{i18nCaption:'Subopt22', value:'2.2'}]
				},
				selected:'1.1'
			};
			$('#exampleCombo').rup_combo(optionsSimple);
			$('#exampleComboMulti').rup_combo(optionsMulti);
			$('#exampleComboPadre').rup_combo(optionsPadre);
			$('#exampleComboHijo').rup_combo(optionsHijo);
			$combo = $('#exampleCombo');
			$comboMulti = $('#exampleComboMulti');
		});
		describe('Creación', () => {
			it('Debe tener la clase rup_combo', () => {
				expect($('#exampleCombo').hasClass('rup_combo')).toBeTruthy();
				expect($('#exampleComboMulti').hasClass('rup_combo')).toBeTruthy();
				expect($('#exampleComboPadre').hasClass('rup_combo')).toBeTruthy();
				expect($('#exampleComboHijo').hasClass('rup_combo')).toBeTruthy();
			});
		});
		describe('Métodos públicos', () => {
			describe('Método change', () => {
				//Lanza el evento change
				beforeEach(() => {
					$combo.rup_combo('change');
					$comboMulti.rup_combo('change');
				});
				it('Debe ejecutar el evento', () => {
					setTimeout(() => {
						expect($combo.hasClass('randomClass')).toBeTruthy();
						expect($comboMulti.hasClass('randomClass')).toBeTruthy();
					}, 1500);
				});
			});
			describe('Métodos select, selectLabel y reset', () => {
						//select: selecciona uno de los elementos
						//reset: devuelve el combo a su estado inicial
				beforeEach(() => {
					$combo.rup_combo('select', '1');
					$comboMulti.rup_combo('select', ['1','2']);
				});
				afterEach(() => {
					$combo.rup_combo('reset');
					$comboMulti.rup_combo('reset');
				});
				describe('Método select', () => {
					it('comprobamos que se ha seleccionado correctamente el campo', () => {
						expect($combo.val()).toBe('1');
						expect($comboMulti.val().sort().join()).toBe('1,2');
					});
				});
				describe('Método reset', () => {
					beforeEach(() => {
						$combo.rup_combo('reset');
						$comboMulti.rup_combo('reset');
					});
					it('Comprobamos que esta en su estado inicial (val = 2)', () => {
						expect($combo.rup_combo('getRupValue')).toBe('2');
						expect($comboMulti.rup_combo('getRupValue').join()).toBe('2');
					});
				});
				describe('Método selectLabel', () => {
					beforeEach(() => {
							$combo.rup_combo('selectLabel', 'Opcion1');
							$comboMulti.rup_combo('selectLabel', ['Opcion3','Opcion2']);
					});
							
					it('Comprobamos que haya cambiado la seleccion', () => {
							expect($combo.rup_combo('getRupValue')).toBe('1');
							expect($comboMulti.rup_combo('getRupValue').sort().join()).toBe('2,3');
					});
					afterEach(() => {
							$combo.rup_combo('reset');
							$comboMulti.rup_combo('reset');
					});
				});
			});
			describe('Métodos value, label e index',() => {
				beforeEach(() => {
					$combo.rup_combo('select',1);
					$comboMulti.rup_combo('select',[1,2]);
				});
				it('Debe devolver el valor actual',() => {
					expect($combo.rup_combo('value')).toBe('1');
					expect($comboMulti.rup_combo('value').sort().join()).toBe('2,3');
				});
				it('Debe devolver la label del valor actual',() => {
					expect($combo.rup_combo('label')).toBe('Opcion1');
					expect($comboMulti.rup_combo('label').sort().join()).toBe('Opcion2,Opcion3');
				});
				it('Debe devolver el index del valor actual',() => {
					expect($combo.rup_combo('index')).toBe(1);
					expect($comboMulti.rup_combo('index').sort().join()).toBe('2,3');
				});
			});
			describe('Método isDisabled',() => {
				beforeEach(() => {
					$combo.rup_combo('disable');
					$comboMulti.rup_combo('disable');
				});
				it('Debe devolver si esta deshabilitado', () => {
					expect($combo.rup_combo('isDisabled')).toBeTruthy();
					expect($comboMulti.rup_combo('isDisabled')).toBeTruthy();
				});
			});
			describe('Método reload', () => {
				//A PROBAR:: Habría que cambiar los datos desde un controlador.
			});
			describe('Método refresh', () => {
				beforeEach(() => {
					$combo.append(new Option('IntrusoZ','XXXZ'));
					$comboMulti.append(new Option('MazingerZ','AAAZ'));
					$combo.rup_combo('refresh');
					$comboMulti.rup_combo('refresh');
				});
				it('Debe tener el valor añadido', () => {
					let ok = false;
					let okMulti = false;
					let opts = $combo.children();
					let optsMulti = $comboMulti.children();
					$.each(opts, (cur) => {
						if(opts[cur].innerText === 'IntrusoZ') {
							ok = true;
						}
					});
					$.each(optsMulti, (cur) => {
						if(optsMulti[cur].innerText === 'MazingerZ') {
							okMulti = true;
						}
					});
					expect(ok).toBeTruthy();
					expect(okMulti).toBeTruthy();
				});
			});
			describe('Método clear', () => {
				beforeEach(() => {
					$combo.rup_combo('clear');
					$comboMulti.rup_combo('clear');
				});
				afterEach(() => {
					$combo.rup_combo('refesh');
					$comboMulti.rup_combo('refresh');
				});
				it('Deben estar vacios', () => {
					expect($combo.rup_combo('value')).toBe('0');
					expect($comboMulti.rup_combo('value').join()).toBe('');
				});
			});
			describe('Método checkAll', () => {
				beforeEach(() => {
					$comboMulti.rup_combo('checkAll');
				});
				afterEach(() => {
					$comboMulti.rup_combo('refresh');
				});
				it('Debe estar todo seleccionado', () => {
					expect($comboMulti.rup_combo('value').length).toBe($comboMulti[0].options.length);
				});
			});
			describe('Métodos enableOpt y disableOpt', () => {
				describe('Método disableOpt: ', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('disableOpt', '3');
					});
					it('La option debe estar deshabilitada', () => {
						let val = $comboMulti.children('[disabled="disabled"]').attr('value');
						expect(val).toBe('3');
					});
				});
				describe('Método enableOpt', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('enableOpt', '3');
					});
					it('No debe haber ninguna option deshabilitada', () => {
						let selector = $comboMulti.children('[disabled="disabled"]');
						expect(selector.length).toBe(0);
					});
				});
			});
			describe('Métodos enableOptArr y disableOptArr', () => {
				describe('Método disableOpt: ', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('disableOptArr', ['3', '4']);
					});
					it('La option debe estar deshabilitada', () => {
						let res = $comboMulti.children('[disabled="disabled"]').map((idx, cur) => {return $(cur).attr('value')});
						let vals = [];
						for(let i = 0; i < res.length; i++) {
							vals.push(res[i]);
						}
						expect(vals).toEqual(['3','4']);
					});
				});
				describe('Método enableOpt', () => {
					beforeEach(() => {
						$comboMulti.rup_combo('enableOptArr', ['3', '4']);
					});
					it('No debe haber ninguna option deshabilitada', () => {
						let selector = $comboMulti.children('[disabled="disabled"]');
							expect(selector.length).toBe(0);
					});
				});
			});
			describe('Método disableChild', () => {
				beforeEach(() => {
					$('#exampleComboPadre').rup_combo('disableChild');
				});
				it('Combo padre debe estar vacio y deshabilitado', () => {
					let length = $('#exampleComboPadre').children().length;
					expect(length).toBe(1);
					expect($('#exampleComboPadre')).toHaveClass('ui-state-disabled');
				});
				it('Los hijos deben estar vacíos y deshabilitados', () => {
					let length = $('#exampleComboHijo').children().length;
					expect(length).toBe(1);
					expect($('#exampleComboHijo')).toHaveClass('ui-state-disabled');
				});
			});
			describe('Método order', () => {
				//La documentcion no muestra la manera de usar este comando, las opciones que he probado no funcionan
			});
			describe('Método getRupValue:', () => {
				it('Devuelve un valor:', () => {
					expect($combo.rup_combo('getRupValue')).toBeDefined();
					expect($comboMulti.rup_combo('getRupValue')).toBeDefined();
				});
			});
			describe('Método setRupValue', () => {
				beforeEach(() => {
					$combo.rup_combo('setRupValue', '3');
					$comboMulti.rup_combo('setRupValue', ['2']);
				});
				it('Debe obtener el valor correcto', () => {
					expect($combo.rup_combo('getRupValue')).toBe('3');
					expect($comboMulti.rup_combo('getRupValue')).toBe(['2']);
				});
			});
			describe('Método disable', () => {
				beforeEach(() => {
					$combo.enable();
					$comboMulti.enable();
					$combo.rup_combo('disable');
					$comboMulti.rup_combo('disable');
				});
				it('Debe poder deshabilitarse', () => {
					expect($comboMulti.isDisabled()).toBeTruthy();
					expect($combo.isDisabled()).toBeTruthy();
				});
			});
			describe('Método enable', () => {
				beforeEach(() => {
					if($combo.is(':enabled')){
					    $combo.disable();
					}
					if($comboMulti.is(':enabled')){
					    $comboMulti.disable();
					}
					$combo.rup_combo('enable');
					$comboMulti.rup_combo('enable');
				});
				it('Debe poder habilitarse', () => {
					expect($combo).not.toBeDisabled();
					expect($comboMulti).not.toBeDisabled();
				});
			});
		});
});
*/