import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';

describe('Test Combo', () => {
    var $combo;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<select id="exampleCombo"></select>';
            $('body').append(html);
            var options = {
                source: [
                    {
                        i18nCaption: 'OpcionUno',
                        value: '1'
                    },
                    {
                        i18nCaption: 'OpcionDos',
                        value: '2'
                    },
                    {
                        i18nCaption: 'OpcionTres',
                        value: '3'
                    }
                ],
                blank: '0',
                selected: '2'
            }
            $('#exampleCombo').rup_combo(options);
            $combo = $('#exampleCombo');
            $combo.on('change', () => {
                return 'Event';
            });
        });
        it('Debe tener la clase rup_combo', () => {
            expect($('#exampleCombo').hasClass('rup_combo')).toBeTruthy();
        });
    });
    describe('Métodos públicos', () => {
        describe('Método change', () => {
            //Lanza el evento change
            expect($combo.rup_combo('change')).toBe('Event');
        });
        describe('Métodos select, selectLabel y reset', () => {
            //select: selecciona uno de los elementos
            //reset: devuelve el combo a su estado inicial
            beforeAll(() => {
                $combo.rup_combo('select', '1');
            });
            afterAll(() => {
                $combo.rup_combo('reset');
            });
            describe('Método select', () => {
                it('comprobamos que se ha seleccionado correctamente el campo', () => {
                    expect($combo.val()).toBe('1');
                });
            });
            describe('Método reset', () => {
                beforeAll(() => {
                    $combo.rup_combo('reset');
                });
                it('Comprobamos que esta en su estado inicial (val = 2)', () => {
                    expect($combo.val()).toBe('2');
                });
            });
            describe('Método selectLabel', () => {
                beforeAll(() => {
                    $combo.rup_combo('selectLabel', 'opcion1');
                });
                it('Comprobamos que haya cambiado la seleccion', () => {
                    expect($combo.val()).toBe('1');
                });
            });
        });
        describe('Métodos value, label e index',() => {
            it('Debe devolver el valor actual',() => {
                expect($combo.rup_combo('value')).toBe('2');
            });
            it('Debe devolver la label del valor actual',() => {
                expect($combo.rup_combo('label')).toBe('OpcionDos');
            });
            it('Debe devolver el index del valor actual',() => {
                expect($combo.rup_combo('index')).toBe(1);
            });
        });
        describe('Método isDisabled',() => {
            beforeAll(() => {
                $combo.rup_combo('disable');
            });
            it('Debe devolver si esta deshabilitado', () => {
                expect($combo.rup_combo('isDisabled')).toBeTruthy();
            });
        });
        describe('Método reload', () => {
            //Ejecutar este método hace que se deshabilite el combo
        });
        describe('Método refresh', () => {
            //Actualiza los valores del combo
        });
        describe('Método order', () => {
            //La documentcion no muestra la manera de usar este comando, las opciones que he probado no funcionan
        });

        generalFunc($combo,'rup_combo',['getRupValue','setRupValue','enable','disable']);
    });
});
/**
 * POR IMPLEMENTAR:
 * - checkAll
 * - select      -> Para combos Múltiples
 * - selectLabel -> Para combos Múltiples
 * - disableChild
 * - disableOpt
 * - disableOptArr
 * - enableOpt
 * - enableOptArr
 */