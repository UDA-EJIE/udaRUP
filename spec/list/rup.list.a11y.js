/* eslint-env jquery,jasmine */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.combo';
import 'rup.form';
import 'rup.list';
import 'rup.dialog';
import 'rup.button';
import 'rup.autocomplete';
import 'bootstrap';
import * as listGen from './listCreator';

export function describes() {

    describe('> Accesibilidad', () => {
        let createList = () => {
            beforeEach((done) => {
                listGen.createListNoSelectable('rup-list', 'listFilterForm', () => {
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
            });
        };
        let createListSelectable = () => {
            beforeEach((done) => {
                listGen.createListSelectableSimple('rup-list', 'listFilterForm', () => {
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
            });
        };
        let createListMultiselectable = () => {
            beforeEach((done) => {
                listGen.createList('rup-list', 'listFilterForm', () => {
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
            });
        };

        describe('> Inicializar y filtrar el listado', () => {
            describe('> Lista sin selección', () => {
                createList();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('false');
                });
            });
            describe('> Lista con selección simple', () => {
                createListSelectable();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('false');
                });
            });
            describe('> Lista con selección múltiple', () => {
                createListMultiselectable();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('true');
                });
            });
        });

        let testHeaderFooter = (isFooter) => {
            let v = isFooter?'footer':'header';

            describe('> Ordenación', () => {
                it('Botón de tipo de selección tiene el contexto correcto', () => {
                    expect($(`#rup-list-${v}-sord`).attr('aria-controls')).toBe('rup-list');
                    expect($(`#rup-list-${v}-sord`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.sort.asc);
                });
                describe('> Se cambia a descendente', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', done);
                        $(`#rup-list-${v}-sord`).click();
                    });
                    it('Botón de tipo de selección tiene el contexto correcto', () => {
                        expect($(`#rup-list-${v}-sord`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.sort.desc);
                    });
                });
            });

            describe('> Navegación', () => {
                it('Los contextos son correctos', () => {
                    fail('Not implemented');
                });
                describe('> Navegación a página intermedia sin separadores', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Navegación a página intermedia con separadores', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Navegación a última página', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Navegación a primera página', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
            });
        };

        describe('> Header', () => {
            createList();
            testHeaderFooter(false);
        });

        describe('> Footer', () => {
            createList();
            testHeaderFooter(true);
        });

        describe('> Diálogo de multiordenación', () => {
            createList();
            it('Los contextos son correctos', () => {
                fail('Not implemented');
            });
            describe('> Se añade un campo nuevo a la ordenación', () => {
                describe('> Único campo en ordenación', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Múltiples campos en ordenación', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
            });
            describe('> Se elimina un campo de la ordenación', () => {
                describe('> No queden campos en ordenación', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Quede un campo en ordenación', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Queden dos campos en ordenación', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
            });
            describe('> Ordenación de campos', () => {
                describe('> Entre dos campos', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
                describe('> Entre tres campos', () => {
                    it('Los contextos son correctos', () => {
                        fail('Not implemented');
                    });
                });
            });
            describe('> Cambio de tipo de orden asc/desc', () => {
                it('Los contextos son correctos', () => {
                    fail('Not implemented');
                });
            });
        });
    });
};