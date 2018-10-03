import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.dialog';
import 'rup.message';
import 'rup.contextMenu'
import 'rup.table';
import 'datatable/rup.datatable';
import * as testutils from '../common/specCommonUtils.js';
import * as dtGen from './datatableCreator';

function clearDatatable(){
    $('.context-menu, .context-menu-active').rup_contextMenu('destroy');
    $.contextMenu('destroy');
    $('.dataTable').DataTable().destroy();
    $('#content').html('');
    $('#content').nextAll().remove();
}

describe('Test Maestro-Detalle > ', () => {
    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach((done) => {
        dtGen.createDatatable1(1,() => {dtGen.createDatatable2(done);});
    });
    afterEach(() => {
        clearDatatable();
    });

    describe('Creación > ',  () => {
        it('La datatable filtro debe contener elementos y la de resultados estar vacía:', () => {
            expect($('#example1 > tbody > tr').length).toBe(5);
            expect($('#example2 > tbody > tr').length).toBe(0);
        });
    });
    describe('Filtrado intertabla > ', () => {
        beforeEach((done) => {
            let api = $('#example1').DataTable();
            $('#example2').on('draw.dt', () => {
                setTimeout(() => {
                    done();
                }, 300);
            });
            $('#example1').on('select.dt', (e, dt, type, indexes) => {
                let data = api.rows( indexes ).data();
                $('#example2_filter_fieldset').find('#id_filter_table').val(data.pluck('id')[0]);
                $('#example2_filter_fieldset').find('#nombre_filter_table').val(data.pluck('nombre')[0]);
                $('#example2_filter_fieldset').find('#apellidos_filter_table').val(data.pluck('apellidos')[0]);
                $('#example2_filter_fieldset').find('#edad_filter_table').val(data.pluck('edad')[0]);
                $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
            });
            $('#example1 > tbody > tr:eq(0) > td:eq(0)').click();
        });
        it('La fila seleccionada debe aparecer en la tabla de detalle:', () => {
            expect($('#example2 > tbody > tr').length).toBe(1);
            expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
            expect($('#example2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe('Ana');
            expect($('#example2 > tbody > tr:eq(0) > td:eq(3)').text()).toBe('García Vázquez');
            expect($('#example2 > tbody > tr:eq(0) > td:eq(4)').text()).toBe('7');
        });
    });
    describe('Funcionamiento independiente > ', () => {
        describe('Filtrado independiente > ', () => {
            describe('Tabla maestro > ', () => {
                beforeEach((done) => {
                    $('#example1').on('draw.dt', () => {
                        setTimeout(() => {
                            done();
                        },500);
                    });
                    $('#example1_filter_fieldset').find('#id_filter_table').val(1);
                    $('#example1_filter_fieldset').find('#example1_filter_filterButton').click();
                });
                it('Se debe de haber filtrado #example1:', () => {
                    let ctx = $('#example1 > tbody > tr');
                    expect(ctx.length).toBe(1);
                    expect($('td:eq(1)', ctx).text()).toBe('1');
                    expect($('td:eq(2)', ctx).text()).toBe('Ana');
                    expect($('td:eq(3)', ctx).text()).toBe('García Vázquez');
                    expect($('td:eq(4)', ctx).text()).toBe('7');
                });
                it('No debe haber cambios en #example2:', ()  => {
                    let ctx = $('#example2 > tbody > tr');
                    expect(ctx.length).toBe(0);
                });
            });
            describe('Tabla detalle > ', () => {
                beforeEach(() => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(() => {
                            done();
                        },500);
                    });
                    $('#example2_filter_fieldset').find('#id_filter_table').val(1);
                    debugger;
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                it('asd', () => {
                    expect(1).toBe(1);
                });
                // it('Se debe de haber filtrado #example2:', () => {
                //     let ctx = $('#example2 > tbody > tr');
                //     expect(ctx.length).toBe(1);
                //     expect($('td:eq(1)', ctx).text()).toBe('1');
                //     expect($('td:eq(2)', ctx).text()).toBe('Ana');
                //     expect($('td:eq(3)', ctx).text()).toBe('García Vázquez');
                //     expect($('td:eq(4)', ctx).text()).toBe('7');
                // });
                // it('No debe haber cambios en #example1:', ()  => {
                //     let ctx = $('#example1 > tbody > tr');
                //     expect(ctx.length).toBe(0);
                // });
            });
        });
        describe('Búsqueda independiente > ', () => {
            describe('Tabla maestro > ', () => {
                beforeEach(() => {
                    $('#example1').find('#searchCollapsLabel_example').click();
                });
                it('asd', () => {
                    expect(1).toBe(1);
                });
            });
            describe('Tabla detalle > ', () => {
                beforeEach(() => {
                    $('#example2').find('#searchCollapsLabel_example').click();
                });
                it('asd', () => {
                    expect(1).toBe(1);
                });
            });
        });
        describe('Formularios independientes > ', () => {});
    });
});