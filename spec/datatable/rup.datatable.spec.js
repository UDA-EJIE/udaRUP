import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.dialog';
import 'rup.contextMenu'
import 'rup.table';
import 'datatable/rup.datatable';
import * as testutils from '../common/specCommonUtils.js';
import * as consts from './datatable.html';

function generateFormEditDatatable(done){
    let opts = {
        "urlBase": "http://localhost:8081/demo/datatable/remote",
        "pageLength": 5,
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
        },
        'initComplete': () => {
            setTimeout(function () {
                debugger;
                done();
            }, 300);
        }
    };

    if ($('#content').length == 0) {
        $('body').append('<div id="content"></div>');
    }
    $('#content').append(consts.html);
    debugger;
    $('#example').rup_datatable(opts);
}
function generateInlineFormDatatable(done){
    //Eliminamos la datatable
    clearDatatable();
    //Creamos la nueva datatable
    let opts = {
        "urlBase": "http://localhost:8081/demo/datatable/remote",
        "pageLength": 5,
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
        "inlineForm":{},
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
        },
        'initComplete': () => {
            setTimeout(function () {
                done();
            }, 300);
        }
    };
    if ($('#content').length == 0) {
        $('body').append('<div id="content"></div>');
    }
    $('#content').append(consts.html);
    $('#example').rup_datatable(opts);
}

function clearDatatable(dt){
    dt.destroy(true);
    delete $.fn.DataTable.seeker; //FIXME: Pendiente de corrección de rup_datatable
    $('#content').html('');
    $('#content').nextAll().remove();
}

function testDatatable() {
    describe('Test DataTable > ', () => {
        var $datatable = $('#example');
        var dt = $datatable.DataTable();

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        beforeEach((done) => {
            generateFormEditDatatable(done);
        });

        afterEach(() => {
            debugger;
            clearDatatable(dt);
        });

        describe('Funcionamiento > ', () => {
            describe('Menú contextual > ', () => {
                beforeEach(() => {
                    $('tbody > tr:eq(0) > td:eq(1)', $datatable).contextmenu();
                });
                it('asd', () => {
                    expect(1).toBe(1);
                });
            });
            describe('Filtrado > ', () => {
                beforeEach((done) => {
                    $datatable.on('draw.dt', () => {
                        setTimeout(() => {
                            done();
                        }, 300);
                    });
                    $('#id_filter_table').val('4');
                    $('#example_filter_filterButton').click();
                });
                it('Debe haberse completado el filtrado:', () => {
                    expect($('tbody > tr').length).toBe(1);
                    expect($('tbody > tr > td:eq(1)').text()).toBe('4');
                });
            });

            describe('Búsqueda > ', () => {
                beforeEach(() => {
                    $('#searchCollapsLabel_example').click();
                });
                describe('Aparición del seeker > ', () => {
                    it('Se muestra el formulario de búsqueda:', () => {
                        expect($('#id_seeker').is(':visible')).toBeTruthy();
                        expect($('#nombre_seeker').is(':visible')).toBeTruthy();
                        expect($('#apellidos_seeker').is(':visible')).toBeTruthy();
                        expect($('#edad_seeker').is(':visible')).toBeTruthy();
                    });
                });
                describe('Funcionalidad del seeker > ', () => {
                    beforeEach((done) => {
                        $('#nombre_seeker').val('E');
                        $('#search_nav_button_example').click();
                        $datatable.on('searchDone.rup.dt', () => {
                            done();
                        });
                    });
                    it('Se selecciona y marca el resultado de la selección: ', () => {
                        let ctx = $('td:contains(4)').parent();
                        expect($('td > span.ui-icon-search', ctx).length).toBe(1);

                        ctx = $('td:contains(5)').parent();
                        expect($('td > span.ui-icon-search', ctx).length).toBe(1);
                    });
                });
            });
            describe('Paginación > ', () => {
                describe('Página siguiente > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("2");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(6)').length).toBe(1);
                        expect($('tr > td:contains(7)').length).toBe(1);
                        expect($('tr > td:contains(8)').length).toBe(1);
                        expect($('tr > td:contains(9)').length).toBe(1);
                        expect($('tr > td:contains(10)').length).toBe(1);
                    });
                });
                describe('Página anterior > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    describe('Realizacion de pruebas > ', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('#example_previous').click();
                        });
                        it('Cambia el número de página:', () => {
                            expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
                        });
                        it('Los registros deben cambiar:', () => {
                            expect($('tr > td:contains(1)').length).toBe(1);
                            expect($('tr > td:contains(2)').length).toBe(1);
                            expect($('tr > td:contains(3)').length).toBe(1);
                            expect($('tr > td:contains(4)').length).toBe(1);
                            expect($('tr > td:contains(5)').length).toBe(1);
                        });
                    });
                    
                });
                describe('Página primera > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_next').click();
                    });
                    describe('Realizacion de pruebas', () => {
                        beforeEach((done) => {
                            $datatable.on('page.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('#example_first').click();
                        });
                        it('Cambia el número de página:', () => {
                            expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
                        });
                        it('Los registros deben cambiar:', () => {
                            expect($('tr > td:contains(1)').length).toBe(1);
                            expect($('tr > td:contains(2)').length).toBe(1);
                            expect($('tr > td:contains(3)').length).toBe(1);
                            expect($('tr > td:contains(4)').length).toBe(1);
                            expect($('tr > td:contains(5)').length).toBe(1);
                        });
                    });
                });
                describe('Página última > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('#example_last').click();
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(11)').length).toBe(1);
                        expect($('tr > td:contains(12)').length).toBe(1);
                        expect($('tr > td:contains(13)').length).toBe(1);
                        expect($('tr > td:contains(14)').length).toBe(1);
                        expect($('tr > td:contains(15)').length).toBe(1);
                    });
                });
                describe('Página desde input > ', () => {
                    beforeEach((done) => {
                        $datatable.on('page.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('.ui-pg-input').val(3);
                        $('.ui-pg-input').trigger($.Event( 'keypress', { keyCode: 13, which: 13 } ));
                    });
                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
                    });
                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(11)').length).toBe(1);
                        expect($('tr > td:contains(12)').length).toBe(1);
                        expect($('tr > td:contains(13)').length).toBe(1);
                        expect($('tr > td:contains(14)').length).toBe(1);
                        expect($('tr > td:contains(15)').length).toBe(1);
                    });
                });
            });
            describe('Variacion de número de registros por página > ', () => {
                beforeEach((done) => {
                    $datatable.on('draw.dt', () => {
                        done();
                    });
                    $('[name="example_length"]').val(10);
                    $('[name="example_length"]').trigger('change')
                });
                it('Debe haber recibido los registros indicados:', () => {
                    expect($('tbody > tr', $datatable).length).toBe(10);
                });
                it('Deben haber únicamente 2 páginas disponibles:', () => {
                    expect($('.pageSearch.searchPaginator:contains(" de 2")', $('#example_wrapper')).length).toBe(1);
                });
            });
            describe('Ordenación > ', () => {
                describe('Ordenación por nombre ascendente > ', () => {
                    beforeEach((done) => {
                        $datatable.on('draw.dt', () => {
                            setTimeout(() => {
                                done();
                            }, 300);
                        });
                        $('th.sorting[data-col-prop="nombre"]').click();
                    });
                    it('Comprobamos que haya cambiado el orden:', () => {
                        expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('5');
                        expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
                        expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('3');
                        expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('2');
                    });
                });
                describe('Ordenación por nombre descendente:', () => {
                    describe('Ordenacion por nombre descendente', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                setTimeout(() => {
                                    done();
                                }, 300);
                            });
                            $('th[data-col-prop="nombre"]').click();
                        });
                        it('Comprobamos que haya cambiado el orden:', () => {
                            expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('2');
                            expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('3');
                            expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
                            expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('5');
                            expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('1');
                        });
                    });
                    
                });                
            });
            describe('Botonera > ', () => {
                describe('Aparecen los botones por defecto > ', () => {
                    it('Botones por defecto existen:', () => {
                        expect($('.dt-buttons > .btn-primary').length).toBe(5);
                    });
                    it('Solo el botón add está habilitado:', () => {
                        expect($('.datatable_toolbar_btnAdd').hasClass('disabledDatatable')).toBeFalsy();
                        expect($('.datatable_toolbar_btnEdit').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.datatable_toolbar_btnClone').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.datatable_toolbar_btnDelete').hasClass('disabledDatatable')).toBeTruthy();
                        expect($('.buttons-collection').hasClass('disabledDatatable')).toBeTruthy();
                    });
                });
                // TODO: Añadir botón extra
            });
            describe('Edición con formulario > ', () => {
                describe('Edición de elementos existentes > ', () => {
                    beforeEach(() => {
                        $('tbody > tr > td:contains(2)').dblclick();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example_detail_div').is(':visible')).toBeTruthy();
                    });
                    describe('Funcionalidad del boton "guardar y continuar" > ', () => {
                        beforeEach((done) => {
                            $('#edad_detail_table').val(11);
                            $('#example_detail_button_save_repeat').click();
                            setTimeout(() => {
                                done();
                            },1000);
                        });
                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(2)').parent();
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });
                        it('No ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                        });
                    });
                    describe('Funcionalidad del botón "guardar" > ', () => {
                        beforeEach((done) => {
                            $('#edad_detail_table').val(11);
                            $('#example_detail_button_save').click();
                            setTimeout(() => {
                                done();
                            },1000);
                        });
                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(2)').parent();
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });
                        it('Ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeFalsy();
                        });
                    });
                });
                /*describe('Añadido de nuevos elementos > ', () => {
                    beforeEach(() => {
                        $('.datatable_toolbar_btnAdd').click();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example_detail_div').is(':visible')).toBeTruthy();
                    });
                    describe('Funcionalidad del boton "guardar y continuar" > ', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                done();
                            });
                            $('#id_detailForm_table').val(345);
                            $('#nombre_detail_table').val('name');
                            $('#apellidos_detail_table').val('lastname');
                            $('#edad_detail_table').val(11);
                            $('#example_detail_button_save_repeat').click();
                        });
                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(345)').parent();
                            expect($('td:contains(name)', ctx).length).toBe(1);
                            expect($('td:contains(lastname)', ctx).length).toBe(1);
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });
                        it('No ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                        });
                    });
                    describe('Funcionalidad del botón "guardar" > ', () => {
                        beforeEach((done) => {
                            $datatable.on('draw.dt', () => {
                                done();
                            });
                            $('#id_detailForm_table').val(345);
                            $('#nombre_detail_table').val('name');
                            $('#apellidos_detail_table').val('lastname');
                            $('#edad_detail_table').val(11);
                            $('#example_detail_button_save').click();
                        });
                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(345)').parent();
                            expect($('td:contains(name)', ctx).length).toBe(1);
                            expect($('td:contains(lastname)', ctx).length).toBe(1);
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });
                        it('Ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeFalsy();
                        });
                    });
                });*/
            });
            describe('Edición en línea > ', () => {
                beforeEach((done) => {
                    generateInlineFormDatatable(done);
                    debugger;
                });
                it('asd',() => {
                    expect(1).toBe(1);
                });
            });
            describe('Multiseleccion > ', () => {});
        });
    });
}
testDatatable();