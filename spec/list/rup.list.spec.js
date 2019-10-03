/* eslint-env jquery,jasmine */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.combo';
import 'rup.form';
import 'rup.list';
import * as testutils from '../common/specCommonUtils.js';
import * as listGen from './listCreator';


function clearList () {
    $('#content').html('');
    $('#rup_list').rup_list('destroy');
}
describe('Test rup_list > ', () => {
    beforeAll((done) => {
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        listGen.createList('rup-list', done);
    });
    afterEach(() => {
        clearList();
    });

    describe('Creación > ',() => {
        it('Debe tener header y footer : ', () => {
            expect($('#rup-list-header').length).toBe(1);
            expect($('#rup-list-footer').length).toBe(1);
        });
        it('El cuerpo de la lista debe estar vacío : ', () => {
            expect($('#rup-list').children().length).toBe(0);
        });
    });
    describe('Funcionamiento > ', () => {
        describe('Filtrado > ', () => {
            beforeEach((done) => {
                $('#rup-list').on('load', () => {
                    done();
                });
                $('#listFilterEdad').val(40);
                $('#listFilterAceptar').click();
            });
            it('Filtra correctamente : ', () => {
                expect($('#rup-list').children().length).toBe(2);
                expect($('#usuario_value_10').text()).toBe('user10');
                expect($('#usuario_value_4').text()).toBe('user4');
            });
        });
        describe('Ordenación > ', () => {
            beforeEach((done) => {
                $('#rup-list').on('load',done);
                $('#rup-list-header-sidx').rup_combo('setRupValue','EDAD');
            });
            it('Aparecen ordenados por el campo especificado :', () => {
                expect($('#rup-list > div:eq(0)').is('#rup-list-itemTemplate_12')).toBeTruthy();
                expect($('#rup-list > div:eq(1)').is('#rup-list-itemTemplate_2')).toBeTruthy();
                expect($('#rup-list > div:eq(2)').is('#rup-list-itemTemplate_8')).toBeTruthy();
                expect($('#rup-list > div:eq(3)').is('#rup-list-itemTemplate_1')).toBeTruthy();
                expect($('#rup-list > div:eq(4)').is('#rup-list-itemTemplate_11')).toBeTruthy();
            });
            describe(' Se invierte la ordenación mediante el botón definido para ello > ', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('#rup-list-header-sord').click();
                });
                it('La ordenacion se invierte: ', () => {
                    expect($('#rup-list > div:eq(0)').is('#rup-list-itemTemplate_10')).toBeTruthy();
                    expect($('#rup-list > div:eq(1)').is('#rup-list-itemTemplate_4')).toBeTruthy();
                    expect($('#rup-list > div:eq(2)').is('#rup-list-itemTemplate_9')).toBeTruthy();
                    expect($('#rup-list > div:eq(3)').is('#rup-list-itemTemplate_3')).toBeTruthy();
                    expect($('#rup-list > div:eq(4)').is('#rup-list-itemTemplate_5')).toBeTruthy();
                });
            });
        });
        describe('Paginación > ', () => {
            beforeEach((done) => {
                $('#rup-list').on('load', done);
                $('#rup-list').rup_list('filter');
            });
            describe('Página siguiente > ',() => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('#rup-list-header-page-next').click();
                });
                it('Ha cambiado la página activa en la navegación:', () => {
                    expect($('.page.active').attr('data-page')).toBe('2');
                });
                it('Se activa la opción de página anterior', () => {
                    expect($('#rup-list-header-page-prev').is('.disabled')).toBeFalsy();
                });
                it('Están los registros esperados:', () => {
                    expect($('#rup-list-itemTemplate_3').length).toBe(1);
                    expect($('#rup-list-itemTemplate_4').length).toBe(1);
                    expect($('#rup-list-itemTemplate_5').length).toBe(1);
                    expect($('#rup-list-itemTemplate_6').length).toBe(1);
                    expect($('#rup-list-itemTemplate_7').length).toBe(1);
                });
                describe('Funcionalidad en la última página > ', () => {
                    beforeEach(() => {});
                    it('El control para ir a la página siguiente está deshabilitado:', () => {
                        expect($('#rup-list-header-page-next').is('.disabled')).toBeFalsy();
                    });
                });
            });
            describe('Página anterior > ', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', () => {
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', done);
                        $('#rup-list-header-page-prev').click();
                    });
                    $('#rup-list-header-page-next').click();
                });
                it('Cambia la página activa en el nav: ', () => {
                    expect($('.page.active').attr('data-page')).toBe('1');
                });
                it('Están los registros esperados:', () => {
                    expect($('#rup-list-itemTemplate_1').length).toBe(1);
                    expect($('#rup-list-itemTemplate_10').length).toBe(1);
                    expect($('#rup-list-itemTemplate_11').length).toBe(1);
                    expect($('#rup-list-itemTemplate_12').length).toBe(1);
                    expect($('#rup-list-itemTemplate_2').length).toBe(1);
                });
                describe('Funcionamiento primera página > ', () => {
                    it('Se desactiva la opción de página anterior', () => {
                        expect($('#rup-list-header-page-prev').is('.disabled')).toBeTruthy();
                    });
                });
            });
            describe('Acceso directo a página desde el nav > ', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('.page[data-page="2"]').click();
                });
                it('Se marca la página correcta en el nav', () => {
                    it('Ha cambiado la página activa en la navegación:', () => {
                        expect($('.page.active').attr('data-page')).toBe('2');
                    });
                });
                it('Se activa la opción de página anterior > ',() => {
                    expect($('#rup-list-header-page-prev').is('.disabled')).toBeFalsy();
                });
            });
        });
        describe('Elementos por página > ', () => {
            beforeEach((done) => {
                $('#rup-list').on('load', done);
                $('#rup-list-header-rowNum').rup_combo('setRupValue', '10');
            });
            it('Varía el número de elementos por página:', () => {
                expect($('#rup-list').children().length).toBe(10);
            });
            it('Varía el número de páginas: ', () => {
                expect($('.page', $('#rup-list-header')).length).toBe(2);
            });
            describe('Elementos por página > Navegamos a la siguiente página > ', () => {
                beforeEach((done) => {
                    setTimeout(() => {
                        $('#rup-list').on('load', () => {
                            done();
                        });
                        $('#rup-list-header-page-next').click();
                    }, 250);
                });
                it('Hay el número de elementos esperados:', () => {
                    expect($('#rup-list').children().length).toBe(2);
                });
            });
        });
    });
});