define(['jquery', 'marionette',
    './tableTemplate.hbs',
    'rup_table/rup.table',
    'rup.validate'
], function ($, Marionette, TableTestTemplate) {
    var TableTestView = Marionette.View.extend({
        template: TableTestTemplate,
        onAttach: fncOnAttach,
        initialize: function () {}
    });

    function fncOnAttach() {
        global.$ = $;

        $('#example').rup_table({
            initComplete: () => {
                $('#example_detail_div').remove();
            },
            urlBase: '/demo/table/remote',
            el: 'td',
            multiSelect: {
                style: 'multi'
            },
            columnDefs: [{
                'targets': [2],
                'className': 'never'
            }],
            colModel: [{
                name: 'id',
                index: 'id',
                editable: true
            }, {
                name: 'nombre',
                index: 'nombre',
                editable: true
            }, {
                name: 'apellidos',
                index: 'apellidos',
                editable: true
            }, {
                name: 'edad',
                index: 'edad',
                editable: true
            }],
            buttons: {
                activate: true
            },
            filter: {
                id: 'example_filter_form',
                filterToolbar: 'example_filter_toolbar',
                collapsableLayerId: 'example_filter_fieldset',
                rules: {
                    'nombre': {
                        required: true
                    }
                }
            },
            seeker: {
                activate: true
            },
            select: {
                activate: true
            },
            inlineEdit: {
                deselect: true,
                validate: {
                    rules: {
                        id: {
                            required: true
                        },
                        nombre: {
                            required: true
                        }
                    }
                }
            }
        });
    }

    return TableTestView;
});