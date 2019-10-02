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
        describe('Filtrado > ', () => {});
        describe('Ordenación > ', () => {});
        describe('Paginación > ', () => {});
        describe('Elementos por página > ', () => {});
    });
});