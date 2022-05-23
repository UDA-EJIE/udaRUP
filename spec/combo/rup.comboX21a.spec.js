/* jslint multistr: true */
/* eslint-env jasmine, jquery */

describe('Test Combo > ', () => {
    var $combo, $comboPadre, $comboHijo, $comboMulti, $comboGroup, $comboGroupVacio;
    var selectedLiteral;

    beforeAll((done) => {
        loadCss(done);
    });

    beforeEach(() => {
        setupCombos();

        $combo = $('#comboSimple');
        $comboMulti = $('#comboMulti');
        $comboPadre = $('#comboPadre');
        $comboHijo = $('#comboHijo');
        $comboGroup = $('#comboGroup');
        $comboGroupVacio = $('#comboGroupVacio');
        selectedLiteral = $.rup.i18n.base.rup_combo.multiselect.selectedText;
        selectedLiteral = selectedLiteral.split('#')[1].trim();
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creacion > ', () => {
        describe('Combo simple >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#comboSimple-button > span.ui-selectmenu-status').text()).toBe('Opcion2');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($combo.rup_combo('getRupValue')).toBe('2');
            });
        });
        describe('Combo padre >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt1');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($comboPadre.rup_combo('getRupValue')).toBe('1');
            });
        });
        describe('Combo hijo >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#comboHijo-button > span.ui-selectmenu-status').text()).toBe('Subopt11');
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($comboHijo.rup_combo('getRupValue')).toBe('1.1');
            });
        });
        describe('Combo multiple >', () => {
            it('Debe tener el valor por defecto: ', () => {
                expect($('#comboMulti-button > span:not([class])').text()).toMatch(/[1]\w*/);
            });
            it('Debe haber un unico valor seleccionado:', () => {
                let checked = $('#rup-multiCombo_comboMulti > ul > li > label > input:checked');
                expect(checked.length).toBe(1);
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($comboMulti.rup_combo('getRupValue')).toEqual(['2']);
            });
        });
        describe('Combo optGroup', () => {
            it('Debe tener el valor por defecto:', () => {
                expect($('#comboGroup-button > span.ui-selectmenu-status').text()).toBe('Opt21');
            });
            it('El combo debe disponer de 2 optGroups:', () => {
                expect($('optgroup', $comboGroup).length).toBe(2);
            });
            it('El valor se debe corresponder a getRupValue:', () => {
                expect($comboGroup.rup_combo('getRupValue')).toBe('2.1');
            });
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Métodos getRupValue y setRupValue > ', () => {
            describe('Combo simple > ', () => {
                beforeEach(() => {
                    $combo.rup_combo('setRupValue', '1');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#comboSimple-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
                });
                it('Debe reflejarse en getRupValue: ', () => {
                    expect($combo.rup_combo('getRupValue')).toBe('1');
                });
            });
            describe('Combo padre > ', () => {
                beforeEach(() => {
                    $comboPadre.rup_combo('setRupValue', '2');
                });
                it('Debe actualizarse la ui: ', () => {
                    expect($('#comboPadre-button > span.ui-selectmenu-status').text()).toBe('Opt2');
                });
                it('Debe reflejarse en getRupValue: ', () => {
                    expect($comboPadre.rup_combo('getRupValue')).toBe('2');
                });
                it('El cambio debe reflejarse en el combo hijo:', () => {
                    expect($comboHijo.children()[2].value).toBe('2.1');
                    expect($comboHijo.children()[3].value).toBe('2.2');
                });
            });
            describe('Combo hijo > ', () => {
                beforeEach(() => {
                    $comboHijo.rup_combo('setRupValue', '1.2');
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
                    expect($('#comboMulti-button > span:not([class])').text()).toBe('2 ' + selectedLiteral);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($comboMulti.rup_combo('getRupValue')).toEqual(['3', '4']);
                });
            });
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('setRupValue', '2.2');
                });
                it('Debe actualizarse:', () => {
                    expect($('#comboGroup-button > span.ui-selectmenu-status').text()).toBe('Opt22');
                });
                it('El método getRupValue debe devolver el valor establecido:', () => {
                    expect($comboGroup.rup_combo('getRupValue')).toBe('2.2');
                });
            });
        });
        describe('Método clear > ', () => {
            describe('Combo simple > ', () => {
                beforeEach(() => {
                    $combo.rup_combo('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#comboSimple-button > span.ui-selectmenu-status').text())
                        .toBe($.rup.i18n.base.rup_combo.blankNotDefined);
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
                    expect($('#comboPadre-button > span.ui-selectmenu-status').text())
                        .toBe($.rup.i18n.base.rup_combo.blankNotDefined);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($comboPadre.rup_combo('getRupValue')).toEqual('0');
                });
                it('El combo hijo debe deshabilitarse:', () => {
                    expect($comboHijo.hasClass('ui-selectmenu-disabled ui-state-disabled')).toBe(true);
                });
            });
            describe('Combo hijo > ', () => {
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
            describe('Combo multiple > ', () => {
                beforeEach(() => {
                    $comboMulti.rup_combo('clear');
                });
                it('Debe actualizar la ui ', () => {
                    expect($('#comboMulti-button > span:not([class])').text())
                        .toBe($.rup.i18n.base.rup_combo.multiselect.noneSelectedText);
                });
                it('El método getRupValue debe devolver el valor establecido', () => {
                    expect($comboMulti.rup_combo('getRupValue')).toEqual([]);
                });
            });
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('clear');
                });
                it('Debe actualizar la ui:', () => {
                    expect($('#comboGroup-button > span.ui-selectmenu-status').text())
                        .toBe($.rup.i18n.base.rup_combo.blankNotDefined);
                });
                it('El método getRupValue debe devolver 0', () => {
                    expect($comboGroup.rup_combo('getRupValue')).toBe('0');
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
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('change');
                });
                it('Debe aparecer la clase:', () => {
                    expect($comboGroup.hasClass('randomClass')).toBe(true);
                });
            });
        });
        describe('Método checkAll > ', () => {
            beforeEach(() => {
                $comboMulti.rup_combo('checkAll');
            });
            it('Debe modificar el ui ', () => {
                expect($('#comboMulti-button > span:not([class])').text()).toBe('6 ' + selectedLiteral);
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
                        expect($('#comboSimple-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
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
                        expect($('#comboSimple-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
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
                    it('Debe reflejarse en el combo Hijo:', () => {
                        expect($comboHijo.children()[2].value).toBe('2.1');
                        expect($comboHijo.children()[3].value).toBe('2.2');
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
                    it('Debe reflejarse en el combo Hijo:', () => {
                        expect($comboHijo.children()[2].value).toBe('2.1');
                        expect($comboHijo.children()[3].value).toBe('2.2');
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
                        expect($('#comboMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
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
                        expect($('#comboMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
                    });
                    it('Debe reflejarse en el método getRupValue', () => {
                        expect($comboMulti.rup_combo('getRupValue')).toEqual(['2', '3', '4']);
                    });
                });
            });
            describe('Combo optGroup > ', () => {
                describe('Selección por valor > ', () => {
                    beforeEach(() => {
                        $comboGroup.rup_combo('select', '1.1');
                    });
                    it('Debe cambiar la ui:', () => {
                        expect($('#comboGroup-button > span.ui-selectmenu-status').text()).toBe('Opt11');
                    });
                    it('Debe reflejarse en getRupValue:', () => {
                        expect($comboGroup.rup_combo('getRupValue')).toBe('1.1');
                    });
                });
                describe('Selección por índice > ', () => {
                    beforeEach(() => {
                        $comboGroup.rup_combo('select', 2);
                    });
                    it('Debe cambiar la ui:', () => {
                        expect($('#comboGroup-button > span.ui-selectmenu-status').text()).toBe('Opt11');
                    });
                    it('Debe reflejarse en getRupValue:', () => {
                        expect($comboGroup.rup_combo('getRupValue')).toBe('1.1');
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
                    expect($('#comboSimple-button > span.ui-selectmenu-status').text()).toBe('Opcion1');
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
                it('Debe reflejarse en el combo Hijo:', () => {
                    expect($comboHijo.children()[2].value).toBe('2.1');
                    expect($comboHijo.children()[3].value).toBe('2.2');
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
                    expect($('#comboMulti-button > span:not(class)').text()).toBe('3 ' + selectedLiteral);
                });
                it('Debe reflejarse en el método getRupValue', () => {
                    expect($comboMulti.rup_combo('getRupValue')).toEqual(['2', '3', '4']);
                });
            });
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('selectLabel', 'Opt11');
                });
                it('Debe cambiar la ui:', () => {
                    expect($('#comboGroup-button > span.ui-selectmenu-status').text()).toBe('Opt11');
                });
                it('Debe reflejarse en getRupValue:', () => {
                    expect($comboGroup.rup_combo('getRupValue')).toBe('1.1');
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
            describe('Combo optGroup > ', () => {
                it('Debe devolver el valor del componente', () => {
                    expect($comboGroup.rup_combo('value')).toEqual('2.1');
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
            describe('Combo optGroup > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($comboGroup.rup_combo('label')).toBe('Opt21');
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
            describe('Combo optGroup > ', () => {
                it('Debe devolver la label de la seleccion', () => {
                    expect($comboGroup.rup_combo('index')).toBe(4);
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
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('disable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($comboGroup.attr('aria-disabled')).toBe('true');
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($comboGroup.rup_combo('isDisabled')).toBe(true);
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
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    $comboGroup.rup_combo('disable');
                    $comboGroup.rup_combo('enable');
                });
                it('Debe tener las clases de deshabilitado', () => {
                    expect($comboGroup.attr('disabled')).toBe(undefined);
                });
                it('El metodo isDisabled debe devolver true', () => {
                    expect($comboGroup.rup_combo('isDisabled')).toBe(false);
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
                $comboMulti.rup_combo('disableOptArr', ['4', '5']);
            });
            it('Deben deshabilitarse las opciones especificadas', () => {
                let labels = ['Opcion4', 'Opcion5'];
                labels
                    .map(x => $('#rup-multiCombo_comboMulti > ul > li > label:contains("' + x + '")'))
                    .forEach(cur => {
                        expect($('input[disabled="disabled"]', cur).length).toBe(1);
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
                let labels = ['Opcion4', 'Opcion5'];

                labels
                    .map(x => $('#rup-multiCombo_comboMulti > ul > li > label:contains("' + x + '")'))
                    .forEach(cur => {
                        expect($('input[disabled="disabled"]', cur).length).toBe(0);
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
                    expect($('#comboSimple-menu > li > a:contains("Intruso")').length).toBe(1);
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
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $('optgroup[label="Opt1"]', $comboGroup).append(newOpt);
                    $comboGroup.rup_combo('refresh');
                });
                it('Debe introducir el elemento', () => {
                    expect($($('#comboGroup-menu > li > ul > li')[2]).text()).toBe('Intruso');
                });
            });
        });
        describe('Método reload > ', () => {
            beforeEach((done) => {
                let html = '<select id="comboRemoto"></select>';
                $('body').append(html);
                var callback = () => {
                    $('#comboRemoto').data('settings').onLoadSuccess = () => { done(); };
                    $('#comboRemoto').append('<option class="intruso">intruso</option>');
                    $('#comboRemoto').rup_combo('refresh');
                    $('#comboRemoto').rup_combo('reload');
                };
                $('#comboRemoto').rup_combo({
                    source: '/x21aAppWar/patrones/comboSimple/remote' + '',
                    sourceParam: {
                        label: 'descEu',
                        value: 'code',
                        style: 'css'
                    },
                    onLoadError: () => { fail('No se ha cargado el combo'); },
                    onLoadSuccess: () => { callback(); }
                });
            });
            it('Debe recuperar su estado anterior a los cambios:', () => {
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
                    expect($('#comboSimple-menu > li').eq(1).text()).toBe('Intruso');
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
            describe('Combo optGroup > ', () => {
                beforeEach(() => {
                    let newOpt = new Option('Intruso', 'intruso_value');
                    $('optgroup[label="Opt1"]', $comboGroup).append(newOpt);
                    $comboGroup.rup_combo('refresh');
                    $comboGroup.rup_combo('order');
                });
                it('Debe introducir el elemento', () => {
                    expect($($('#comboGroup-menu > li > ul > li')[0]).text()).toBe('Intruso');
                });
            });
        });
    });
});

function setupCombos() {
    let html = '<select id="comboSimple"></select>\
		<select id="comboMulti"></select>\
		<select id="comboPadre"></select>\
		<select id="comboHijo"></select>\
    	<select id="comboGroupVacio"></select>\
		<select id="comboGroup"></select>';

    $('#content').append(html);

    let source = [{
        i18nCaption: 'Opcion1',
        value: '1'
    },
    {
        i18nCaption: 'Opcion2',
        value: '2'
    },
    {
        i18nCaption: 'Opcion3',
        value: '3'
    },
    {
        i18nCaption: 'Opcion4',
        value: '4'
    },
    {
        i18nCaption: 'Opcion5',
        value: '5'
    },
    {
        i18nCaption: 'Opcion6',
        value: '6'
    }
    ];
    let sourceGroup = [{
        'Opt1': [{
            i18nCaption: 'Opt11',
            value: '1.1'
        },
        {
            i18nCaption: 'Opt12',
            value: '1.2'
        }
        ]
    },
    {
        'Opt2': [{
            i18nCaption: 'Opt21',
            value: '2.1'
        },
        {
            i18nCaption: 'Opt22',
            value: '2.2'
        }
        ]
    }
    ];
    let optionsSimple = {
        change: () => {
            $('#comboSimple').addClass('randomClass');
        },
        source: source,
        blank:'0',
        selected: '2'
    };
    let optionsMulti = {
        change: () => {
            $('#comboMulti').addClass('randomClass');
        },
        source: source,
        selected: ['2'],
        multiselect: true
    };
    let optionsPadre = {
        change: () => {
            $('#comboPadre').addClass('randomClass');
        },
        source: [{
            i18nCaption: 'Opt1',
            value: '1'
        },
        {
            i18nCaption: 'Opt2',
            value: '2'
        }
        ],
        blank: '0',
        selected: '1'
    };
    let optionsHijo = {
        change: () => {
            $('#comboHijo').addClass('randomClass');
        },
        parent: ['comboPadre'],
        source: {
            '1': [{
                i18nCaption: 'Subopt11',
                value: '1.1'
            }, {
                i18nCaption: 'Subopt12',
                value: '1.2'
            }],
            '2': [{
                i18nCaption: 'Subopt21',
                value: '2.1'
            }, {
                i18nCaption: 'Subopt22',
                value: '2.2'
            }]
        },
        blank:'0',
        selected: '1.1'
    };
    let optionsGroup = {
        change: () => {
            $('#comboGroup').addClass('randomClass');
        },
        sourceGroup: sourceGroup,
        blank: '0',
        selected: '2.1'
    };
    
    let optionsGroupVacio = {
            change: () => {
                $('#comboGroupVacio').addClass('randomClass');
            },
            sourceGroup: sourceGroup,
            blank: '',
            selected: '2.1'
        };

    $('#comboSimple').rup_combo(optionsSimple);
    $('#comboMulti').rup_combo(optionsMulti);
    $('#comboPadre').rup_combo(optionsPadre);
    $('#comboHijo').rup_combo(optionsHijo);
    $('#comboGroup').rup_combo(optionsGroup);
    $('#comboGroupVacio').rup_combo(optionsGroupVacio);


    //Mete automaticamente randomClass asi que lo quitamos
    $('#comboSimple').removeClass('randomClass');
    $('#comboMulti').removeClass('randomClass');
    $('#comboPadre').removeClass('randomClass');
    $('#comboHijo').removeClass('randomClass');
    $('#comboGroup').removeClass('randomClass');
    $('#comboGroupVacio').removeClass('randomClass');
}