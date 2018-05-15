import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';

describe('Test Combo > ', () => {
	beforeEach(() => {});
	describe('Creacion > ', () => {});
	describe('Funcionamiento > ', () => {});
	describe('Métodos públicos > ', () => {
		describe('Métodos getRupValue y setRupValue > ', () => {});
		describe('Método clear > ', () => {});
		describe('Método change > ', () => {});
		describe('Método checkAll > ', () => {});
		describe('Método select > ', () => {});
		describe('Método selectLabel > ', () => {});
		describe('Método value > ', () => {});
		describe('Método label > ', () => {});
		describe('Método index > ', () => {});
		describe('Método disable > ', () => {});
		describe('Método enable > ', () => {});
		describe('Método isDisabled > ', () => {});
		describe('Método disableChild > ', () => {});
		describe('Método disableOpt > ', () => {});
		describe('Método disableOptArr > ', () => {});
		describe('Método enableOpt > ', () => {});
		describe('Método enableOptArr > ', () => {});
		describe('Método refresh > ', () => {});
		describe('Método reload > ', () => {});
		describe('Método order > ', () => {});
	});
});


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