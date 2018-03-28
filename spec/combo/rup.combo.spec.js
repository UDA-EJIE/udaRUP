import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';

describe('Test Combo', () => {
    var $combo, $comboMulti;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<select id="exampleCombo"></select>'
                    +  '<select id="exampleComboMulti"></select>';
            var source = [
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
                    },
                    {
                        i18nCaption: 'OpcionCuatro',
                        value: '4'
                    },
                    {
                        i18nCaption: 'OpcionCinco',
                        value: '5'
                    },
                    {
                        i18nCaption: 'OpcionSeis',
                        value: '6'
                    }
                ]
            $('body').append(html);
            var optionsSimple = {
                source: source,
                blank: '0',
                selected: '2'
            }
            var optionsMulti = {
                source: source,
                blank: '0',
                selected: ['2'],
                multiselect:true
            }
            $('#exampleCombo').rup_combo(optionsSimple);
            $('#exampleComboMulti').rup_combo(optionsMulti);
            $combo = $('#exampleCombo');
            $comboMulti = $('#exampleComboMulti');
            $combo.on('change', () => {
                return 'Event';
            });
            $comboMulti.on('change', () => {
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
            it('Debe devolver el valor definido en el evento', () => {
                expect($combo.rup_combo('change')).toBe('Event');
                expect($combo.rup_combo('change')).toBe('Event');
            });
        });
        describe('Métodos select, selectLabel y reset', () => {
            //select: selecciona uno de los elementos
            //reset: devuelve el combo a su estado inicial
            beforeAll(() => {
                $combo.rup_combo('select', '1');
                $comboMulti.rup_combo('select', ['1','2']);
            });
            afterAll(() => {
                $combo.rup_combo('reset');
                $comboMulti.rup_combo('reset');
            });
            describe('Método select', () => {
                it('comprobamos que se ha seleccionado correctamente el campo', () => {
                    expect($combo.val()).toBe('1');
                    expect($comboMulti.val()).toBe(['1','2']);
                });
            });
            describe('Método reset', () => {
                beforeAll(() => {
                    $combo.rup_combo('reset');
                });
                it('Comprobamos que esta en su estado inicial (val = 2)', () => {
                    expect($combo.val()).toBe('2');
                    expect($comboMulti.val()).toBe(['2']);
                });
            });
            describe('Método selectLabel', () => {
                beforeAll(() => {
                    $combo.rup_combo('selectLabel', 'Opcion1');
                    $comboMulti.rup_combo('selectLabel', ['OpcionUno','OpcionDos']);
                });
                afterAll(() => {
                    $combo.rup_combo('reset');
                    $comboMulti.rup_combo('reset');
                });
                it('Comprobamos que haya cambiado la seleccion', () => {
                    expect($combo.val()).toBe('1');
                    expect($comboMulti.val()).toBe(['1','2']);
                });
            });
        });
        describe('Métodos value, label e index',() => {
            beforeAll(() => {
                $comboMulti.rup_combo('select',['1','2']);
            });
            it('Debe devolver el valor actual',() => {
                expect($combo.rup_combo('value')).toBe('2');
                expect($comboMulti.rup_combo('value')).toBe(['1', '2']);
            });
            it('Debe devolver la label del valor actual',() => {
                expect($combo.rup_combo('label')).toBe('OpcionDos');
                expect($comboMulti.rup_combo('label')).toBe(['Opcion1','OpcionDos']);
            });
            it('Debe devolver el index del valor actual',() => {
                expect($combo.rup_combo('index')).toBe(1);
                expect($comboMulti.rup_combo('index')).toBe([0, 1]);
            });
        });
        describe('Método isDisabled',() => {
            beforeAll(() => {
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
            beforeAll(() => {
                $combo.append(new Option('IntrusoZ','XXXZ'));
                $comboMulti.append(new Option('MazingerZ','AAAZ'));
                $combo.rup_combo('refresh');
                $comboMulti.rup_combo('refresh');
            });
            it('Debe tener el valor añadido', () => {
                let ok = false;
                let okMulti = false;
                let opts = $combo[0].options.concat($comboMulti[0].options);
                $.each(opts, (cur) => {
                    if(opts[cur].innerText === 'IntrusoZ') {
                        ok = true;
                    }
                    if(opts[cur].innerText === 'IntrusoZ') {
                        okMulti = true;
                    }
                });
                expect(ok).toBeTruthy();
                expect(okMulti).toBeTruthy();
            });
        });
        describe('Método clear', () => {
            beforeAll(() => {
                $combo.rup_combo('clear');
                $comboMulti.rup_combo('clear');
            });
            afterAll(() => {
                $combo.rup_combo('refesh');
                $comboMulti.rup_combo('refresh');
            });
            it('Deben estar vacios', () => {
                expect($combo.rup_combo('value')).toBe('0');
                expect($comboMulti.rup_combo('value')).toBe('0');
            });
        });
        describe('Método checkAll', () => {
            beforeAll(() => {
                $comboMulti.rup_combo('checkAll');
            });
            afterAll(() => {
                $comboMulti.rup_combo('refresh');
            });
            it('Debe estar todo seleccionado', () => {
                expect($comboMulti.rup_combo('value').length).toBe($comboMulti[0].options.length);
            });
        });
        describe('Métodos enableOpt y disableOpt', () => {
            describe('Método disableOpt: ', () => {
                beforeAll(() => {
                    $comboMulti.rup_combo('disableOpt', '3');
                });
                it('La option debe estar deshabilitada', () => {
                    let valor = $comboMulti.children('[disabled="disabled"]').attr('value');
                    expect(val).toBe('3');
                });
            });
            describe('Método enableOpt', () => {
                beforeAll(() => {
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
                beforeAll(() => {
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
                beforeAll(() => {
                    $comboMulti.rup_combo('enableOptArr', ['3', '4']);
                });
                it('No debe haber ninguna option deshabilitada', () => {
                    let selector = $comboMulti.children('[disabled="disabled"]');
                    expect(selector.length).toBe(0);
                });
            });
        });
        describe('Método order', () => {
            //La documentcion no muestra la manera de usar este comando, las opciones que he probado no funcionan
        });

        generalFunc($combo,'rup_combo',['getRupValue','setRupValue','enable','disable']);
        generalFunc($comboMulti,'rup_combo',['getRupValue','setRupValue','enable','disable']);
    });
});
/**
 * POR IMPLEMENTAR:
 * - disableChild
 */