import 'jquery';
import 'jasmine-jquery';
import 'rup.dialog';
import 'rup.table';
import 'datatable/rup.datatable';
import * as testutils from '../common/specCommonUtils.js';
import * as consts from './datatable.html';

var plugins = [{
    name: 'multiselect',
    opts: {
        useplugins: ['multiselection'],
        multiselect: {}
    }
}];

function testDatatable() {
    describe('Test DataTable > ', () => {

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        var $datatable;
        beforeEach(() => {
            let opts = {
                "fixedHeader": {
                    "footer": false,
                    "header": true
                },
                "filter": {
                    "id": "example_filter_form",
                    "filterToolbar": "example_filter_toolbar",
                    "collapsableLayerId": "example_filter_fieldset"
                },
                "multiSelect": {
                    "style": "multi"
                },
                "formEdit": {
                    "detailForm": "#example_detail_div",
                    "validate": {
                        "rules": {
                            "nombre": {
                                "required": true
                            },
                            "apellidos": {
                                "required": true
                            },
                            "edad": {
                                "required": true
                            }
                        }
                    },
                    "titleForm": "Modificar registro"
                },
                "buttons": {
                    "activate": true
                },
                "seeker": {
                    "colModel": [{
                            "name": "id",
                            "index": "id",
                            "editable": true,
                            "width": 80,
                            "formoptions": {
                                "rowpos": 1,
                                "colpos": 1
                            }
                        },
                        {
                            "name": "nombre",
                            "index": "nombre",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 2,
                                "colpos": 1
                            }
                        },
                        {
                            "name": "apellidos",
                            "index": "apellidos",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 3,
                                "colpos": 1
                            },
                            "classes": "ui-ellipsis"
                        },
                        {
                            "name": "edad",
                            "index": "edad",
                            "editable": true,
                            "formoptions": {
                                "rowpos": 4,
                                "colpos": 1
                            }
                        }
                    ]
                }
            };

            if ($('#content').length == 0) {
                $('body').append('<div id="content"></div>');
            }

            $('#content').append(consts.html);
            $('#example').rup_datatable(opts);
            $datatable = $('#example');
        });
        describe('Creacion > ', () => {
            beforeEach((done) => {
                $datatable.on('init.dt', () => {
                    done();
                });
            });
            it('asd', () => {
                debugger;
                expect('asd').toBe('asd');
            });
        });
        describe('Pruebas plugins > ', () => {});
    });
}
testDatatable();