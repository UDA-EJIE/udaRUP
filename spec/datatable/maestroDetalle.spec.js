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
            //No reconoce el evento select.
            //let api = $('#example1').DataTable();
            $('#example1').on('select.dt', (e, dt, type, indexes) => {
                let data = api.rows( indexes ).data();
                $('#example2_filter_fieldset').find('#id_filter_table').val(data.pluck('id'));
                $('#example2_filter_fieldset').find('#nombre_filter_table').val(data.pluck('nombre'));
                $('#example2_filter_fieldset').find('#apellidos_filter_table').val(data.pluck('apellidos'));
                $('#example2_filter_fieldset').find('#edad_filter_table').val(data.pluck('edad'));
                $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                done();
            });
            $('#example1 > tbody > tr:eq(0) > td:eq(0)').click();
        });
        it('asd', () => {
            debugger;
            expect(1).toBe(1);
        });
    });
    describe('Funcionamiento independiente > ', () => {});
});