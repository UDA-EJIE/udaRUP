/* jslint multistr: true */
/* eslint-env jasmine, jquery */

import 'jasmine-jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'rup.tooltip';
import 'rup.select';

describe('Test Select > ', () => {
    var $select, $selectPadre, $selectHijo, $selectMulti, $selectGroup, $selectGroupVacio;
    var selectedLiteral;
    var $selectAbueloRemoto, $selectPadreRemoto, $selectHijoRemoto;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
    	return new Promise(function(resolve) {
    		setupselects(()=>{
                $select = $('#selectSimple');
                $selectMulti = $('#selectMulti');
                $selectPadre = $('#selectPadre');
                $selectHijo = $('#selectHijo');
                $selectGroup = $('#selectGroup');
                $selectGroupVacio = $('#selectGroupVacio');
                selectedLiteral = $.rup.i18n.base.rup_select.multiselect.selectedText;
                
                $selectAbueloRemoto = $('#selectAbueloRemoto');
                $selectPadreRemoto = $('#selectPadreRemoto');
                $selectHijoRemoto = $('#selectHijoRemoto');
                
                resolve();
            });
    	});
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creacion > ', () => {
        describe('select simple >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectSimple-container').text()).toBe('Opcion2');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($select.rup_select('getRupValue')).toBe('2');
            });
        });
        describe('select padre >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectPadre-container').text()).toBe('Opt1');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectPadre.rup_select('getRupValue')).toBe('1');
            });
        });
        describe('select hijo >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectHijo-container').text()).toBe('Subopt11');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectHijo.rup_select('getRupValue')).toBe('1.1');
            });
        });
        describe('Select multiple >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#selectMulti').next('span').text()).toMatch(/[1]\w*/);
            });
            it('Debe haber un unico valor seleccionado:', () => {
            	$('#selectMulti').select2('open');
                let checked = $('#select2-selectMulti-results li[aria-selected=true]');
                expect(checked.length).toBe(1);
            });
            it('El valor se debe corresponder a getRupValue:', () => {
            	let valor = $selectMulti.rup_select('getRupValue');
                expect(valor[0]).toEqual('2');
            });
        });
        describe('select optGroup', () => {
            it('Debe tener el valor por defecto:', () => {
                expect($('#select2-selectGroup-container').text()).toBe('Opt21');
            });
            it('El select debe disponer de 2 optGroups:', () => {
                expect($('optgroup', $selectGroup).length).toBe(2);
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectGroup.rup_select('getRupValue')).toBe('2.1');
            });
        });

    });
    describe('Métodos públicos > ', () => {
        describe('Métodos getRupValue y setRupValue > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                	$select.rup_select('setRupValue', '1');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#select2-selectSimple-container').text()).toBe('Opcion1');
                });
                it('Debe reflejarse en getRupValue: ', () => {
                    expect($select.rup_select('getRupValue')).toBe('1');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('setRupValue', '2');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                });
                it('Debe reflejarse en getRupValue: ', () => {
                    expect($selectPadre.rup_select('getRupValue')).toBe('2');
                });
                it('El cambio debe reflejarse en el select hijo:', () => {
                    expect($selectHijo.children()[1].value).toBe('2.1');
                    expect($selectHijo.children()[2].value).toBe('2.2');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('setRupValue', '1.2');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#select2-selectHijo-container').text()).toBe('Subopt12');
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectHijo.rup_select('getRupValue')).toBe('1.2');
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('setRupValue', ['3', '4']);
                });
                it('Debe actualizarse ', () => {
                	selectedLiteral = selectedLiteral.replace('{0}','2').replace('{1}','6');
                    expect($('#selectMulti').next('span').text()).toBe('' + selectedLiteral);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectMulti.rup_select('getRupValue')).toEqual(['3', '4']);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('setRupValue', '2.2');
                });
                it('Debe actualizarse:', () => {
                    expect($('#select2-selectGroup-container').text()).toBe('Opt22');
                });
                it('El método getRupValue debe devolver el valor establecido:', () => {
                    expect($selectGroup.rup_select('getRupValue')).toBe('2.2');
                });
            });
        });
        describe('Método clear > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectSimple-container').text())
                        .toBe($.rup.i18n.base.rup_select.blankNotDefined);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($select.rup_select('getRupValue')).toEqual('');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectPadre-container').text())
                        .toBe($.rup.i18n.base.rup_select.blankNotDefined);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectPadre.rup_select('getRupValue')).toEqual('');
                });
                it('El select hijo debe deshabilitarse:', () => {
                    expect($selectHijo.attr('disabled')).toBe('disabled');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectHijo-container').text()).toBe('[Selecciona Hijo]');
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectHijo.rup_select('getRupValue')).toEqual('0');
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                	selectedLiteral = selectedLiteral.replace('{0}','0').replace('{1}','0');
                    expect($('#selectMulti').next('span').text())
                        .toBe(selectedLiteral);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {//si crea placeHolder es '0' sino ''
                	let valor = $selectMulti.rup_select('getRupValue');
                	expect(valor[0]).toEqual(undefined);
                });
            });
            describe('select optGroup vacío > ', () => {
                beforeEach(() => {
                    $selectGroupVacio.rup_select('clear');
                });
                it('Debe actualizar la ui:', () => {
                    expect($('#select2-selectGroupVacio-container').text().trim())
                        .toBe('[Falta literal]');
                });
                it('El método getRupValue debe devolver vacio', () => {
                    expect($selectGroupVacio.rup_select('getRupValue')).toBe('');
                });
            });
            
            describe('select optGroup 0 > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('clear');
                });
                it('Debe actualizar la ui:', () => {
                    expect($('#select2-selectGroup-container').text())
                        .toBe('[Falta literal]');
                });
                it('El método getRupValue debe devolver 0', () => {
                    expect($selectGroup.rup_select('getRupValue')).toBe('');//si crea placeHolder es '0' sino ''
                });
            });
        });
        describe('Método change > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($select.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectPadre.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectHijo.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectMulti.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('change');
                });
                it('Debe aparecer la clase:', () => {
                    expect($selectGroup.hasClass('randomClass')).toBe(true);
                });
            });
        });
        describe('Método checkAll > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('checkAll');
            });
            it('Debe modificar el ui ', () => {
            	selectedLiteral = selectedLiteral.replace('{0}','6').replace('{1}','6');
                expect($('#selectMulti').next('span').text()).toBe(selectedLiteral);
            });
            it('Debe reflejarse en el getRupValue ', () => {
                expect($selectMulti.rup_select('getRupValue')).toEqual(['1', '2', '3', '4', '5', '6']);
            });
        });
        describe('Método select > ', () => {
            describe('select simple > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $select.rup_select('selectByLabel', 'Opcion1');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectSimple-container').text()).toBe('Opcion1');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($select.rup_select('getRupValue')).toBe('1');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $select.rup_select('select', 0);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectSimple-container').text()).toBe('Opcion1');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($select.rup_select('getRupValue')).toBe('1');
                    });
                });
            });
            describe('select padre > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectPadre.rup_select('selectByLabel', 'Opt2');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectPadre.rup_select('getRupValue')).toBe('2');
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                        expect($selectHijo.children()[1].value).toBe('2.1');
                        expect($selectHijo.children()[2].value).toBe('2.2');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectPadre.rup_select('select', 1);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectPadre.rup_select('getRupValue')).toBe('2');
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                        expect($selectHijo.children()[1].value).toBe('2.1');
                        expect($selectHijo.children()[2].value).toBe('2.2');
                    });
                });
            });
            describe('select hijo > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectHijo.rup_select('selectByLabel', 'Subopt12');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectHijo-container').text()).toBe('Subopt12');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectHijo.rup_select('getRupValue')).toBe('1.2');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectHijo.rup_select('select', 2);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectHijo-container').text()).toBe('Subopt12');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectHijo.rup_select('getRupValue')).toBe('1.2');
                    });
                });
            });
            describe('select multiple > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectMulti.rup_select('selectByLabel', ['Opcion4', 'Opcion5']);
                    });
                    it('Debe modificar la ui ', () => {
                    	selectedLiteral = selectedLiteral.replace('{0}','2').replace('{1}','6');
                        expect($('#selectMulti').next('span').text()).toBe(selectedLiteral);
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectMulti.rup_select('getRupValue')).toEqual(['4', '5']);
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectMulti.rup_select('select', [2, 3]);
                    });
                    it('Debe modificar la ui ', () => {
                    	selectedLiteral = selectedLiteral.replace('{0}','2').replace('{1}','6');
                        expect($('#selectMulti').next('span').text()).toBe(selectedLiteral);
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectMulti.rup_select('getRupValue')).toEqual(['3', '4']);
                    });
                });
            });
            describe('select optGroup > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectGroup.rup_select('selectByLabel', 'Opt11');
                    });
                    it('Debe cambiar la ui:', () => {
                        expect($('#select2-selectGroup-container').text()).toBe('Opt11');
                    });
                    it('Debe reflejarse en getRupValue:', () => {
                        expect($selectGroup.rup_select('getRupValue')).toBe('1.1');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectGroup.rup_select('select', 0);
                    });
                    it('Debe cambiar la ui:', () => {
                        expect($('#select2-selectGroup-container').text()).toBe('Opt11');
                    });
                    it('Debe reflejarse en getRupValue:', () => {
                        expect($selectGroup.rup_select('getRupValue')).toBe('1.1');
                    });
                });
            });
        });
        describe('Método value > ', () => {
            describe('select simple > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($select.rup_select('getRupValue')).toBe('2');
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectPadre.rup_select('getRupValue')).toBe('1');
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectHijo.rup_select('getRupValue')).toBe('1.1');
                });
            });
            describe('select multiple > ', () => {
                it('Debe devolver el valor del componente', () => {//Si es unico se devuelve tipo String
                    let valor = $selectMulti.rup_select('getRupValue');
                	expect(valor[0]).toEqual('2');
                });
            });
            describe('select optGroup > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectGroup.rup_select('getRupValue')).toEqual('2.1');
                });
            });
        });
        describe('Método label > ', () => {
            describe('select simple > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($select.rup_select('label')).toBe('Opcion2');
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectPadre.rup_select('label')).toBe('Opt1');
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectHijo.rup_select('label')).toBe('Subopt11');
                });
            });
            describe('select multiple > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectMulti.rup_select('label')).toEqual(['Opcion2']);
                });
            });
            describe('select optGroup > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectGroup.rup_select('label')).toBe('Opt21');
                });
            });
        });
        describe('Método index > ', () => {
            describe('select simple > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($select.rup_select('index')).toBe(2);
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectPadre.rup_select('index')).toBe(1);
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectHijo.rup_select('index')).toBe(1);
                });
            });
            describe('select multiple > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectMulti.rup_select('index')).toEqual([2]);
                });
            });
            describe('select optGroup > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectGroup.rup_select('index')).toBe(3);
                });
            });
        });
        describe('Método disable e isDisabled > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($select.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($select.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectPadre.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectPadre.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectHijo.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectHijo.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectMulti.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectMulti.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectGroup.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectGroup.rup_select('isDisabled')).toBe(true);
                });
            });
        });
        describe('Método enable e isDisabled > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('disable');
                    $select.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($select.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($select.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('disable');
                    $selectPadre.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectPadre.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectPadre.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('disable');
                    $selectHijo.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectHijo.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectHijo.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('disable');
                    $selectMulti.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectMulti.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectMulti.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('disable');
                    $selectGroup.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectGroup.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectGroup.rup_select('isDisabled')).toBe(false);
                });
            });
        });

        describe('Método disableOpt > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOpt', '4');
                $selectMulti.select2('open');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                expect($('li:contains("Opcion4")[aria-disabled=true]').length).toBe(1);
            });
        });
        describe('Método disableOptArr > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOptArr', ['4', '5']);
                $selectMulti.select2('open');
            });
            it('Deben deshabilitarse las opciones especificadas', () => {
            	expect($('li:contains("Opcion4")[aria-disabled=true]').length).toBe(1);
            	expect($('li:contains("Opcion5")[aria-disabled=true]').length).toBe(1);
            });
        });
        describe('Método enableOpt > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOpt', '4');
                $selectMulti.rup_select('enableOpt', '4');
                $selectMulti.select2('open');
            });
            it('Debe tener el atributo de deshabilitado', () => {
            	expect($('li:contains("Opcion4")[aria-disabled=true]').length).toBe(0);
            });
        });
        describe('Método enableOptArr > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOptArr', ['4', '5']);
                $selectMulti.rup_select('enableOptArr', ['4', '5']);
                $selectMulti.select2('open');
            });
            it('Deben deshabilitarse las opciones especificadas: ', () => {
            	expect($('li:contains("Opcion4")[aria-disabled=true]').length).toBe(0);
            	expect($('li:contains("Opcion5")[aria-disabled=true]').length).toBe(0);
            });
        });
        describe('Método refresh > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('addOption','Intruso', 'intruso_value');
                    $select.rup_select('refresh');
                    $select.select2('open');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#select2-selectSimple-results li:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectPadre.append(newOpt);
                    $selectPadre.rup_select('refresh');
                    $selectPadre.select2('open');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#select2-selectPadre-results li:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectHijo.append(newOpt);
                    $selectHijo.rup_select('refresh');
                    $selectHijo.select2('open');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#select2-selectHijo-results li:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectMulti.append(newOpt);
                    $selectMulti.rup_select('refresh');
                    $selectMulti.select2('open');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#select2-selectMulti-results li:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                	$selectGroup.rup_select('addOption','Intruso', 'intruso_value','Opt1');
                    $selectGroup.rup_select('refresh');
                    $selectGroup.select2('open');
                });
                it('Debe introducir el elemento', () => {
                	expect($('#select2-selectGroup-results li:contains("intruso_value")').not('[role=group]').length).toBe(1);
                });
                it('Debe introducir el elemento en el label padre indicado', () => {
                	expect($('#select2-selectGroup-results li').eq(3).text()).toBe('intruso_value');
                });
            });
        });
        describe('Método reload > ', () => {
            beforeEach((done) => {
                let html = '<select id="selectRemoto"></select>';
                $('body').append(html);
                var callback = () => {
                    $('#selectRemoto').on('selectFinish', () => {
                    	$('#selectRemoto').select2('open');
                    	done(); 
                    });
                    $('#selectRemoto').append('<option class="intruso">intruso</option>');
                    $('#selectRemoto').data('settings').selected = ''
                    $('#selectRemoto').rup_select('reload');                    
                };
                $('#selectRemoto').rup_select({
                    url: 'demo/selectSimple/remote',
                    sourceParam: {
                        text: 'descEu',
                        id: 'value',
                        style: 'css'
                    },
                    onLoadError: () => { fail('No se ha cargado el select'); },
                    onLoadSuccess: () => { callback(); },
                    selected:"1",
                });
               });
            it('Debe recuperar su estado anterior a los cambios, en li:', () => {
                expect($('#select2-selectRemoto-results li:contains("intruso_value")').not('[role=group]').length).toBe(0);
            });
            
            it('Debe recuperar su estado anterior a los cambios, en options:', () => {
            	expect($('#selectRemoto option:contains("intruso")').length).toBe(1);
            });
        });
        describe('Método order > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $select.append(newOpt);
                    $select.rup_select('order');
                    $select.select2('open');                    
                    
                   });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#select2-selectSimple-results li').eq(0).text()).toBe('Intruso');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectPadre.append(newOpt);
                    $selectPadre.rup_select('order');
                    $selectPadre.select2('open'); 
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#select2-selectPadre-results li').eq(0).text()).toBe('Intruso');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectHijo.append(newOpt);
                    $selectHijo.rup_select('order');
                    $selectHijo.select2('open');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#select2-selectHijo-results li').eq(1).text()).toBe('Intruso');
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectMulti.append(newOpt);
                    $selectMulti.rup_select('order');
                    $selectMulti.select2('open');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#select2-selectMulti-results li').eq(0).text()).toBe('Intruso');
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('addOption','intruso_value', 'Intruso','Opt1');
                    $selectGroup.rup_select('order',true);
                    $selectGroup.select2('open');
                });
                it('Debe introducir el elemento', () => {
                    expect($('#select2-selectGroup-results li').not('[role="group"]').eq(0).text()).toBe('Intruso');
                });
            });
        });
    });
});

describe('Test Select Remoto> ', () => {
    var $select, $selectPadre, $selectHijo, $selectMulti, $selectGroup, $selectGroupVacio;
    var selectedLiteral;
    var $selectAbueloRemoto, $selectPadreRemoto, $selectHijoRemoto;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach((done) => {

    	setupSelectsRemoto(done);
    	selectedLiteral = $.rup.i18n.base.rup_select.multiselect.selectedText;
        $selectAbueloRemoto = $('#selectAbueloRemoto');
        $selectPadreRemoto = $('#selectPadreRemoto');
        $selectHijoRemoto = $('#selectHijoRemoto');
        $selectHijoRemoto.on('selectAjaxSuccess', () => {
        	
        });
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creacion > ', () => {
         
        //Remoto
        describe('select abuelo remoto >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectAbueloRemoto-container').text()).toBe('Vizcaya');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectAbueloRemoto.rup_select('getRupValue')).toBe('2');
            });
        });
        
        describe('select padre remoto >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectPadreRemoto-container').text()).toBe('Enkarterri');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectPadreRemoto.rup_select('getRupValue')).toBe('4');
            });
        });
        
        describe('select hijo remoto >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#select2-selectHijoRemoto-container').text()).toBe('Balmaseda');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($selectHijoRemoto.rup_select('getRupValue')).toBe('11');
            });
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Métodos getRupValue y setRupValue remotos > ', () => {
            describe('select abuelo > ', () => {
                beforeEach(() => {
                	$selectAbueloRemoto.rup_select('setRupValue', '1');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#select2-selectAbueloRemoto-container').text()).toBe('Alava');
                });
                it('Debe reflejarse en getRupValue: ', () => {
                    expect($selectAbueloRemoto.rup_select('getRupValue')).toBe('1');
                });
            });
            describe('select padre > ', () => {
                beforeEach((done) => {
                	
                		$selectHijoRemoto.on('selectAjaxSuccess', () => {
                			done();
                   		});
            			$selectPadreRemoto.rup_select('setRupValue', '5');
                	
                });
                it('Debe actualizarse la ui: ', () => {
                	
                        expect($('#select2-selectPadreRemoto-container').text()).toBe('Durangaldea');
                	
                });
                it('Debe reflejarse en getRupValue: ', () => {
                	
                        expect($selectPadreRemoto.rup_select('getRupValue')).toBe('5');
                	
                });
                it('El cambio debe reflejarse en el select hijo:', () => {
                		
                    	$selectHijoRemoto.rup_select('open');
                        expect($('#select2-selectHijoRemoto-results li').text()).toBe('[Seleccionar]DurangoAmorebieta-EtxanoErmua');
                	
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                	$selectHijoRemoto.rup_select('setRupValue', '11');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#select2-selectHijoRemoto-container').text()).toBe('Balmaseda');
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectHijoRemoto.rup_select('getRupValue')).toBe('11');
                });
            });

        });
        describe('Método clear remotos> ', () => {
            describe('select abuelo > ', () => {
                beforeEach(() => {
                	$selectAbueloRemoto.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectAbueloRemoto-container').text())
                        .toBe($selectAbueloRemoto.data('settings').placeholder);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectAbueloRemoto.rup_select('getRupValue')).toEqual('');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                	$selectPadreRemoto.rup_select('clear');
                	$selectHijoRemoto.rup_select('open');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectPadreRemoto-container').text())
                        .toBe($selectPadreRemoto.data('settings').placeholder);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectPadreRemoto.rup_select('getRupValue')).toEqual('');
                });
                it('El select hijo debe deshabilitarse:', () => {
                    expect($selectHijoRemoto.attr('disabled')).toBe('disabled');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijoRemoto.rup_select('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#select2-selectHijoRemoto-container').text()).toBe('[Seleccionar]');
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectHijoRemoto.rup_select('getRupValue')).toEqual('');
                });
            });

        });
        describe('Método change Remotos > ', () => {
            describe('select abuelo > ', () => {
                beforeEach(() => {
                	$selectAbueloRemoto.data('settings').change = function cambio(){
                		$selectAbueloRemoto.addClass('randomClass');
                	}
                	$selectAbueloRemoto.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectAbueloRemoto.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                	$selectPadreRemoto.data('settings').change = function cambio(){
                		$selectPadreRemoto.addClass('randomClass');
                	}
                    $selectPadreRemoto.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectPadreRemoto.hasClass('randomClass')).toBe(true);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                	$selectHijoRemoto.data('settings').change = function cambio(){
                		$selectHijoRemoto.addClass('randomClass');
                	}
                    $selectHijoRemoto.rup_select('change');
                });
                it('Debe aparecer la clase ', () => {
                    expect($selectHijoRemoto.hasClass('randomClass')).toBe(true);
                });
            });

        });

        describe('Método select > ', () => {
            describe('select abuelo > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectAbueloRemoto.rup_select('selectByLabel', 'Gipuzcoa');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectAbueloRemoto-container').text()).toBe('Gipuzcoa');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectAbueloRemoto.rup_select('getRupValue')).toBe('3');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                    	$selectAbueloRemoto.rup_select('select', 1);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectAbueloRemoto-container').text()).toBe('Alava');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectAbueloRemoto.rup_select('getRupValue')).toBe('1');
                    });
                });
            });
            describe('select padre > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach((done) => {
                    	
                     		$selectHijoRemoto.on('selectAjaxSuccess', () => {
                     			done();
                       		});
                            $selectPadreRemoto.rup_select('selectByLabel', 'Durangaldea');
                    	
                    });
                    it('Debe modificar la ui ', () => {
                    	
                            expect($('#select2-selectPadreRemoto-container').text()).toBe('Durangaldea');
                    	
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                    	return Promise.resolve().then(function () {
                            expect($selectPadreRemoto.rup_select('getRupValue')).toBe('5');
                    	});
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                    	
                        	$selectHijoRemoto.rup_select('open');
                        	expect($('#select2-selectHijoRemoto-results li').text()).toBe('[Seleccionar]DurangoAmorebieta-EtxanoErmua');
                    	
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach((done) => {
                    	
                     		$selectHijoRemoto.on('selectAjaxSuccess', () => {
                     			done();
                       		});
                            $selectPadreRemoto.rup_select('select', 2);
                    	
                    });
                    it('Debe modificar la ui ', () => {
                    	return Promise.resolve().then(function () {
                            expect($('#select2-selectPadreRemoto-container').text()).toBe('Durangaldea');
                    	});
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                    	return Promise.resolve().then(function () {
                            expect($selectPadreRemoto.rup_select('getRupValue')).toBe('5');
                    	});
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                    	
                        	$selectHijoRemoto.rup_select('open');
                        	expect($('#select2-selectHijoRemoto-results li').text()).toBe('[Seleccionar]DurangoAmorebieta-EtxanoErmua');
                    	
                    });
                });
            });
            describe('select hijo > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectHijoRemoto.rup_select('selectByLabel', 'Gordexola');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectHijoRemoto-container').text()).toBe('Gordexola');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectHijoRemoto.rup_select('getRupValue')).toBe('12');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectHijoRemoto.rup_select('select', 3);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectHijoRemoto-container').text()).toBe('Gordexola');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectHijoRemoto.rup_select('getRupValue')).toBe('12');
                    });
                });
            });

        });
        describe('Método value > ', () => {
            describe('select abuelo > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectAbueloRemoto.rup_select('getRupValue')).toBe('2');
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectPadreRemoto.rup_select('getRupValue')).toBe('4');
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectHijoRemoto.rup_select('getRupValue')).toBe('11');
                });
            });

        });
        describe('Método label > ', () => {
            describe('select abuelo > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectAbueloRemoto.rup_select('label')).toBe('Vizcaya');
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectPadreRemoto.rup_select('label')).toBe('Enkarterri');
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($selectHijoRemoto.rup_select('label')).toBe('Balmaseda');
                });
            });

        });
        describe('Método index > ', () => {
            describe('select abuelo > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectAbueloRemoto.rup_select('index')).toBe(2);
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectPadreRemoto.rup_select('index')).toBe(1);
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver el indice de la seleccion', () => {
                    expect($selectHijoRemoto.rup_select('index')).toBe(2);
                });
            });

        });
        describe('Método disable e isDisabled > ', () => {
            describe('select abuelo > ', () => {
                beforeEach(() => {
                    $selectAbueloRemoto.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectAbueloRemoto.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectAbueloRemoto.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadreRemoto.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectPadreRemoto.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectPadreRemoto.rup_select('isDisabled')).toBe(true);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijoRemoto.rup_select('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectHijoRemoto.attr('disabled')).toBe('disabled');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($selectHijoRemoto.rup_select('isDisabled')).toBe(true);
                });
            });

        });
        describe('Método enable e isDisabled > ', () => {
            describe('select abuelo > ', () => {
                beforeEach(() => {
                    $selectAbueloRemoto.rup_select('disable');
                    $selectAbueloRemoto.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectAbueloRemoto.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectAbueloRemoto.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadreRemoto.rup_select('disable');
                    $selectPadreRemoto.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectPadreRemoto.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectPadreRemoto.rup_select('isDisabled')).toBe(false);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijoRemoto.rup_select('disable');
                    $selectHijoRemoto.rup_select('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($selectHijoRemoto.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver false', () => {
                    expect($selectHijoRemoto.rup_select('isDisabled')).toBe(false);
                });
            });

        });

        describe('Método reload > ', () => {
            beforeEach((done) => {
                let html = '<select id="selectRemoto"></select>';
                $('body').append(html);
                var callback = () => {
                    $('#selectRemoto').on('selectFinish', () => {
                    	$('#selectRemoto').select2('open');
                    	done(); 
                    });
                    $('#selectRemoto').append('<option class="intruso">intruso</option>');
                    $('#selectRemoto').data('settings').selected = ''
                    $('#selectRemoto').rup_select('reload');                    
                };
                $('#selectRemoto').rup_select({
                    url: 'demo/selectSimple/remote',
                    sourceParam: {
                        text: 'descEu',
                        id: 'value',
                        style: 'css'
                    },
                    onLoadError: () => { fail('No se ha cargado el select'); },
                    onLoadSuccess: () => { callback(); },
                    selected:"1",
                });
               });
            it('Debe recuperar su estado anterior a los cambios, en li:', () => {
                expect($('#select2-selectRemoto-results li:contains("intruso_value")').not('[role=group]').length).toBe(0);
            });
            
            it('Debe recuperar su estado anterior a los cambios, en options:', () => {
            	expect($('#selectRemoto option:contains("intruso")').length).toBe(1);
            });
        });
    });
});

function setupselects(done) {
    let html = '<select id="selectSimple"></select>\
		<select id="selectMulti"></select>\
		<select id="selectPadre"></select>\
		<select id="selectHijo"></select>\
    	<select id="selectAbueloRemoto"></select>\
    	<select id="selectPadreRemoto"></select>\
    	<select id="selectHijoRemoto"></select>\
    	<select id="selectGroupVacio"></select>\
		<select id="selectGroup"></select>';
    

    $('#content').append(html);

    let source = [{
        i18nCaption: 'Opcion1',
        id: '1'
    },
    {
        i18nCaption: 'Opcion2',
        id: '2'
    },
    {
        i18nCaption: 'Opcion3',
        id: '3'
    },
    {
        i18nCaption: 'Opcion4',
        id: '4'
    },
    {
        i18nCaption: 'Opcion5',
        id: '5'
    },
    {
        i18nCaption: 'Opcion6',
        id: '6'
    }
    ];
    let sourceGroup = [{
    	'text':'Opt1',
        'children': [{
            i18nCaption: 'Opt11',
            id: '1.1'
        },
        {
            i18nCaption: 'Opt12',
            id: '1.2'
        }
        ]
    },
    {
    	'text':'Opt2',
        'children': [{
            i18nCaption: 'Opt21',
            id: '2.1'
        },
        {
            i18nCaption: 'Opt22',
            id: '2.2'
        }
        ]
    }
    ];
    let optionsSimple = {
        change: () => {
            $('#selectSimple').addClass('randomClass');
        },
        data: source,
        blank:'0',
        selected: '2'
    };
    let optionsMulti = {
        change: () => {
            $('#selectMulti').addClass('randomClass');
        },
        data: source,
        selected: ['2'],
        multiple: true
    };
    let optionsPadre = {
        change: () => {
            $('#selectPadre').addClass('randomClass');
        },
        data: [{
            i18nCaption: 'Opt1',
            id: '1'
        },
        {
            i18nCaption: 'Opt2',
            id: '2'
        }
        ],
        blank: '0',
        selected: '1'
    };
    let optionsHijo = {
        change: () => {
            $('#selectHijo').addClass('randomClass');
        },
        parent: ['selectPadre'],
        data: {
            '1': [{
                i18nCaption: 'Subopt11',
                id: '1.1'
            }, {
                i18nCaption: 'Subopt12',
                id: '1.2'
            }],
            '2': [{
                i18nCaption: 'Subopt21',
                id: '2.1'
            }, {
                i18nCaption: 'Subopt22',
                id: '2.2'
            }]
        },
        blank:'0',
        placeholder: '[Selecciona Hijo]',
        selected: '1.1'
    };
    let optionsGroup = {
        change: () => {
            $('#selectGroup').addClass('randomClass');
        },
        dataGroups: sourceGroup,
        blank: '0',
        selected: '2.1',
        groups:true,
        tags:true
    };
    
    let optionsGroupVacio = {
            change: () => {
                $('#selectGroupVacio').addClass('randomClass');
            },
            dataGroups: sourceGroup,
            blank: '',
            selected: '2.1',
            groups:true
        };
    
    $('#selectSimple').rup_select(optionsSimple);
    $('#selectMulti').rup_select(optionsMulti);
    $('#selectPadre').rup_select(optionsPadre);
    $('#selectHijo').rup_select(optionsHijo);
    $('#selectGroup').rup_select(optionsGroup);
    $('#selectGroupVacio').rup_select(optionsGroupVacio);

    //Mete automaticamente randomClass asi que lo quitamos
    $('#selectSimple').removeClass('randomClass');
    $('#selectMulti').removeClass('randomClass');
    $('#selectPadre').removeClass('randomClass');
    $('#selectHijo').removeClass('randomClass');
    $('#selectGroup').removeClass('randomClass');
    $('#selectGroupVacio').removeClass('randomClass');
    
    setTimeout(done, 100);
}

function setupSelectsRemoto(done) {
    let html = '<select id="selectAbueloRemoto" name="provincia"></select>\
    	<select id="selectPadreRemoto" name="comarca"></select>\
		<select id="selectHijoRemoto"></select>';
    

    $('#content').append(html);

    //REMOTO
    let optionsAbueloRemoto = {
        url: '/demo/remoteEnlazadoProvincia/remote',
        placeholder: '[Seleccionar]',
        selected: '2',
        change: function () {
            console.log('selectAbueloRemoto:::Changed');
        }
    };
    
    let optionsPadreRemoto = {
        parent: ['selectAbueloRemoto'],
        url: '/demo/remoteEnlazadoComarca/remote',
        placeholder: '[Seleccionar]',
        selected: '4'
    };

    let optionsHijoRemoto = {
        parent: 'selectPadreRemoto',
        url: '/demo/remoteEnlazadoLocalidad/remote',
        placeholder: '[Seleccionar]',
        selected: '11'
    };


    
    $('#selectAbueloRemoto').rup_select(optionsAbueloRemoto);
   
    $('#selectPadreRemoto').rup_select(optionsPadreRemoto);
   
    $('#selectHijoRemoto').rup_select(optionsHijoRemoto);
    
    setTimeout(done, 200);
}