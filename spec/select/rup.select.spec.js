/* jslint multistr: true */
/* eslint-env jasmine, jquery */

import 'jasmine-jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'rup.tooltip';
import 'rup.select';
import 'rup.select';

describe('Test Select > ', () => {
    var $select, $selectPadre, $selectHijo, $selectMulti, $selectGroup, $selectGroupVacio;
    var selectedLiteral;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach((done) => {
        setupselects(()=>{
            $select = $('#selectSimple');
            $selectMulti = $('#selectMulti');
            $selectPadre = $('#selectPadre');
            $selectHijo = $('#selectHijo');
            $selectGroup = $('#selectGroup');
            $selectGroupVacio = $('#selectGroupVacio');
            selectedLiteral = $.rup.i18n.base.rup_select.multiselect.selectedText;

            done();
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
                expect($selectMulti.rup_select('getRupValue')).toEqual('2');
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
                    expect($selectHijo.children()[0].value).toBe('2.1');
                    expect($selectHijo.children()[1].value).toBe('2.2');
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
                    expect($('#selectMulti').next('span').text()).toBe(' ' + selectedLiteral);
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
                    expect($selectHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
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
                    expect($('#selectMulti').next('span').text())
                        .toBe($.rup.i18n.base.rup_select.multiselect.noneSelectedText);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($selectMulti.rup_select('getRupValue')).toEqual([]);
                });
            });
            describe('select optGroup vacío > ', () => {
                beforeEach(() => {
                    $selectGroupVacio.rup_select('clear');
                });
                it('Debe actualizar la ui:', () => {
                    expect($('#select2-selectGroupVacio-container').text().trim())
                        .toBe('');
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
                        .toBe('0');
                });
                it('El método getRupValue debe devolver 0', () => {
                    expect($selectGroup.rup_select('getRupValue')).toBe('0');
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
                expect($('#selectMulti').next('span').text()).toBe('6 ' + selectedLiteral);
            });
            it('Debe reflejarse en el getRupValue ', () => {
                expect($selectMulti.rup_select('getRupValue')).toEqual(['1', '2', '3', '4', '5', '6']);
            });
        });
        describe('Método select > ', () => {
            describe('select simple > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $select.rup_select('select', '1');
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
                        $select.rup_select('select', 1);
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
                        $selectPadre.rup_select('select', '2');
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectPadre.rup_select('getRupValue')).toBe('2');
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                        expect($selectHijo.children()[2].value).toBe('2.1');
                        expect($selectHijo.children()[3].value).toBe('2.2');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectPadre.rup_select('select', 2);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectPadre.rup_select('getRupValue')).toBe('2');
                    });
                    it('Debe reflejarse en el select Hijo:', () => {
                        expect($selectHijo.children()[2].value).toBe('2.1');
                        expect($selectHijo.children()[3].value).toBe('2.2');
                    });
                });
            });
            describe('select hijo > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectHijo.rup_select('select', '1.2');
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
                        $selectMulti.rup_select('select', ['3', '4']);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#selectMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectMulti.rup_select('getRupValue')).toEqual(['2', '3', '4']);
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $selectMulti.rup_select('select', [2, 3]);
                    });
                    it('Debe modificar la ui ', () => {
                        expect($('#selectMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($selectMulti.rup_select('getRupValue')).toEqual(['2', '3', '4']);
                    });
                });
            });
            describe('select optGroup > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $selectGroup.rup_select('select', '1.1');
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
                        $selectGroup.rup_select('select', 1);
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
        describe('Método selectLabel > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    $select.rup_select('selectLabel', 'Opcion1');
                });
                it('Debe modificar la ui ', () => {
                    expect($('#select2-selectSimple-container').text()).toBe('Opcion1');
                });
                it('Debe reflejarse en el método getRupValue', () => {
                    expect($select.rup_select('getRupValue')).toBe('1');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    $selectPadre.rup_select('selectLabel', 'Opt2');
                });
                it('Debe modificar la ui ', () => {
                    expect($('#select2-selectPadre-container').text()).toBe('Opt2');
                });
                it('Debe reflejarse en el método getRupValue', () => {
                    expect($selectPadre.rup_select('getRupValue')).toBe('2');
                });
                it('Debe reflejarse en el select Hijo:', () => {
                    expect($selectHijo.children()[2].value).toBe('2.1');
                    expect($selectHijo.children()[3].value).toBe('2.2');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    $selectHijo.rup_select('selectLabel', 'Subopt12');
                });
                it('Debe modificar la ui ', () => {
                    expect($('#selectHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt12');
                });
                it('Debe reflejarse en el método getRupValue', () => {
                    expect($selectHijo.rup_select('getRupValue')).toBe('1.2');
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    $selectMulti.rup_select('selectLabel', ['Opcion3', 'Opcion4']);
                });
                it('Debe modificar la ui ', () => {
                    expect($('#selectMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
                });
                it('Debe reflejarse en el método getRupValue', () => {
                    expect($selectMulti.rup_select('getRupValue')).toEqual(['2', '3', '4']);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    $selectGroup.rup_select('selectLabel', 'Opt11');
                });
                it('Debe cambiar la ui:', () => {
                    expect($('#select2-selectGroup-container').text()).toBe('Opt11');
                });
                it('Debe reflejarse en getRupValue:', () => {
                    expect($selectGroup.rup_select('getRupValue')).toBe('1.1');
                });
            });
        });
        describe('Método value > ', () => {
            describe('select simple > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($select.rup_select('value')).toBe('2');
                });
            });
            describe('select padre > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectPadre.rup_select('value')).toBe('1');
                });
            });
            describe('select hijo > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectHijo.rup_select('value')).toBe('1.1');
                });
            });
            describe('select multiple > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectMulti.rup_select('value')).toEqual(['2']);
                });
            });
            describe('select optGroup > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($selectGroup.rup_select('value')).toEqual('2.1');
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
                    expect($selectMulti.rup_select('index')).toEqual([1]);
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
                    expect($select.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
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
                    expect($selectPadre.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
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
                    expect($selectHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
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
                    expect($selectGroup.attr('aria-disabled')).toBe('true');
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
                    expect($select.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
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
                    expect($selectPadre.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
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
                    expect($selectHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(false);
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
        describe('Método disableChild > ', () => {
            beforeEach(() => {
                $selectPadre.rup_select('disableChild');
            });
            it('Debe deshabilitar el select padre', () => {
                expect($selectPadre.rup_select('isDisabled')).toBe(true);
            });
            it('Debe deshabilitar el select hijo', () => {
                expect($selectHijo.rup_select('isDisabled')).toBe(true);
            });
        });
        describe('Método disableOpt > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOpt', '4');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                let context = $('#rup-multiselect_selectMulti > ul > li > label:contains("Opcion4")');
                expect($('input[disabled="disabled"]', context).length).toBe(1);
            });
        });
        describe('Método disableOptArr > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOptArr', ['4', '5']);
            });
            it('Deben deshabilitarse las opciones especificadas', () => {
                let labels = ['Opcion4', 'Opcion5'];
                labels
                    .map(x => $('#rup-multiselect_selectMulti > ul > li > label:contains("' + x + '")'))
                    .forEach(cur => {
                        expect($('input[disabled="disabled"]', cur).length).toBe(1);
                    });
            });
        });
        describe('Método enableOpt > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOpt', '4');
                $selectMulti.rup_select('enableOpt', '4');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                let context = $('#rup-multiselect_selectMulti > ul > li > label:contains("Opcion4")');
                expect($('input[disabled="disabled"]', context).length).toBe(0);
            });
        });
        describe('Método enableOptArr > ', () => {
            beforeEach(() => {
                $selectMulti.rup_select('disableOptArr', ['4', '5']);
                $selectMulti.rup_select('enableOptArr', ['4', '5']);
            });
            it('Deben deshabilitarse las opciones especificadas: ', () => {
                let labels = ['Opcion4', 'Opcion5'];

                labels
                    .map(x => $('#rup-multiselect_selectMulti > ul > li > label:contains("' + x + '")'))
                    .forEach(cur => {
                        expect($('input[disabled="disabled"]', cur).length).toBe(0);
                    });
            });
        });
        describe('Método refresh > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $select.append(newOpt);
                    $select.rup_select('refresh');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#selectSimple-menu > li > a:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectPadre.append(newOpt);
                    $selectPadre.rup_select('refresh');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#selectPadre-menu > li > a:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectHijo.append(newOpt);
                    $selectHijo.rup_select('refresh');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#selectHijo-menu > li > a:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectMulti.append(newOpt);
                    $selectMulti.rup_select('refresh');
                });
                it('Debe haber metido el elemento:', () => {
                    expect($('#rup-multiselect_selectMulti > ul > li > label > span:contains("Intruso")').length).toBe(1);
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $('optgroup[label="Opt1"]', $selectGroup).append(newOpt);
                    $selectGroup.rup_select('refresh');
                });
                it('Debe introducir el elemento', () => {
                    expect($($('#selectGroup-menu > li > ul > li')[2]).text()).toBe('Intruso');
                });
            });
        });
        describe('Método reload > ', () => {
            beforeEach((done) => {
                let html = '<select id="selectRemoto"></select>';
                $('body').append(html);
                var callback = () => {
                    $('#selectRemoto').data('settings').onLoadSuccess = () => { done(); };
                    $('#selectRemoto').append('<option class="intruso">intruso</option>');
                    $('#selectRemoto').rup_select('refresh');
                    $('#selectRemoto').rup_select('reload');
                };
                $('#selectRemoto').rup_select({
                    source: testutils.DEMO + '/selectSimple/remote',
                    sourceParam: {
                        label: 'descEu',
                        value: 'value',
                        style: 'css'
                    },
                    onLoadError: () => { fail('No se ha cargado el select'); },
                    onLoadSuccess: () => { callback(); }
                });
            });
            it('Debe recuperar su estado anterior a los cambios:', () => {
                expect($('#selectRemoto-menu > li > a:contains("intruso")').length).toBe(0);
            });
        });
        describe('Método order > ', () => {
            describe('select simple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $select.append(newOpt);
                    $select.rup_select('refresh');
                    $select.rup_select('order');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#selectSimple-menu > li').eq(1).text()).toBe('Intruso');
                });
            });
            describe('select padre > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectPadre.append(newOpt);
                    $selectPadre.rup_select('refresh');
                    $selectPadre.rup_select('order');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#selectPadre-menu > li').eq(1).text()).toBe('Intruso');
                });
            });
            describe('select hijo > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectHijo.append(newOpt);
                    $selectHijo.rup_select('refresh');
                    $selectHijo.rup_select('order');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#selectHijo-menu > li').eq(1).text()).toBe('Intruso');
                });
            });
            describe('select multiple > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $selectMulti.append(newOpt);
                    $selectMulti.rup_select('refresh');
                    $selectMulti.rup_select('order');
                });
                it('Intruso debe ser la primera opcion', () => {
                    expect($('#rup-multiselect_selectMulti > ul > li').eq(0).text()).toBe('Intruso');
                });
            });
            describe('select optGroup > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $('optgroup[label="Opt1"]', $selectGroup).append(newOpt);
                    $selectGroup.rup_select('refresh');
                    $selectGroup.rup_select('order');
                });
                it('Debe introducir el elemento', () => {
                    expect($($('#selectGroup-menu > li > ul > li')[0]).text()).toBe('Intruso');
                });
            });
        });
    });
});

function setupselects(done) {
    let html = '<select id="selectSimple"></select>\
		<select id="selectMulti"></select>\
		<select id="selectPadre"></select>\
		<select id="selectHijo"></select>\
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
        selected: '1.1'
    };
    let optionsGroup = {
        change: () => {
            $('#selectGroup').addClass('randomClass');
        },
        dataGroups: sourceGroup,
        blank: '0',
        selected: '2.1',
        groups:true
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