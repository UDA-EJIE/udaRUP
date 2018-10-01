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
        dtGen.createDatatable1(dtGen.createDatatable2(done));
    });
    afterEach(() => {
        clearDatatable();
    });

    describe('Creación > ',  () => {});
    describe('Filtrado intertabla > ', () => {});
    describe('Funcionamiento independiente > ', () => {});
});