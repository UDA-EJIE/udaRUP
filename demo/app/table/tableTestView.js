define(['jquery','marionette',
    './tableTemplate.hbs',
    '../../../src/rup_table/rup.table.js'], function($,Marionette, TableTestTemplate){
    var TableTestView = Marionette.LayoutView.extend({
        template: TableTestTemplate
        , onAttach : fncOnAttach
        , initialize : function() {}
    });

    function fncOnAttach() {
        $('#example').rup_table({
            urlBase: '/demo/table/remote',
            multiSelect: {
                style: 'simple'
            },
            colModel: [{
                name: 'id',
                index: 'id',
                editable: true,
                width: 80,
                formoptions: {
                    rowpos: 1,
                    colpos: 1
                }
            }, {
                name: 'nombre',
                index: 'nombre',
                editable: true,
                formoptions: {
                    rowpos: 2,
                    colpos: 1
                }
            }, {
                name: 'apellidos',
                index: 'apellidos',
                editable: true,
                formoptions: {
                    rowpos: 3,
                    colpos: 1
                },
                classes: 'ui-ellipsis'
            }, {
                name: 'edad',
                index: 'edad',
                editable: true,
                formoptions: {
                    rowpos: 4,
                    colpos: 1
                }
            }],
            buttons : {
                activate:    true
            },
            filter: {
                id: 'example_filter_form',
                filterToolbar: 'example_filter_toolbar',
                collapsableLayerId: 'example_filter_fieldset'
            },
            formEdit: {
                detailForm: '#example_detail_div',
                titleForm: 'Modificar registro',
                saveContinueEdit: false
            },
            seeker: {
                activate: true
            },
            colReorder: {
                fixedColumnsLeft: 1
            }
        });
    }

    return TableTestView;
}
);