import 'jquery';
import 'jasmine-jquery';
import 'rup.datatable';
import * as consts from'./datatable.html';

var plugins = [
    {
        name:'multiselect',
        opts:{
            useplugins:['multiselection'],
            multiselect:{}
        }
    }
];

function testDatatable(plugin){
    describe('Test DataTable ' + plugin.name + ' > ', () => {
        var $datatable;
        beforeEach(() => {
            $('#content').append(consts.html);
            $('#exampleDatatable').rup_datatable({
                fixedHeader: {
                    footer: false,
                    header: true
                },
                filter:{
                    filterToolbarId: 'exampleDatatable_filter_toolbar'
                }
            });
        });
        describe('Creacion > ', () => {});
        describe('Pruebas plugins > ',() => {});
    });
}