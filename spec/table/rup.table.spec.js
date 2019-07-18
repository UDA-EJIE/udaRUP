/* eslint-disable no-undef */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.dialog';
import 'rup.message';
import 'rup.contextMenu';
import 'rup_table/rup.table';
import * as testutils from '../common/specCommonUtils.js';
import * as dtGen from './tableCreator';

function generateFormEditDatatable(callback) {
    dtGen.createDatatable1(0, callback);
}

function clearDatatable(done) {
    if ($('[id*="contextMenu"], [id*="context-menu"]').length > 0) {
        $('.context-menu, .context-menu-active').rup_contextMenu('destroy');
        $.contextMenu('destroy');
    }

    $('.dataTable').on('destroy.dt', () => {
        $('#content').html('');
        $('#content').nextAll().remove();
        setTimeout(() => {
            done();
        }, 500);
    });

    $('.dataTable').DataTable().destroy();

    $('#content').html('');
    $('#content').nextAll().remove();
}

function testDatatable() {
    describe('Test DataTable > ', () => {

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        beforeEach((done) => {
            generateFormEditDatatable(done);
        });

        afterEach((done) => {
            clearDatatable(done);
        });

        describe('Funcionamiento > ', () => {
            describe('Menú contextual > ', () => {
                beforeEach(() => {
                    $('tbody > tr:eq(0) > td:eq(1)', $('#example')).contextmenu();
                });
                
                it('Debe mostrarse el menú contextual:', () => {
                    expect($('#contextMenu2').is(':visible')).toBeTruthy();
                });

                it('Debe tener los items esperados y solo el add debe estar habilitado:', () => {
                    expect($('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').length)
                        .toBe(1);
                    expect($('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar.disabledButtonsTable').length)
                        .toBe(1);
                    expect($('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar.disabledButtonsTable').length)
                        .toBe(1);
                    expect($('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar.disabledButtonsTable').length)
                        .toBe(1);
                    expect($('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar.disabledButtonsTable').length)
                        .toBe(1);
                });

                it('Los items deben ser visibles:', () => {
                    expect($('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
                    expect($('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
                    expect($('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
                    expect($('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
                    expect($('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
                });

                describe('Funcionalidades de los items de contextMenu > ', () => {
                    describe('Item añadir > ', () => {
                        beforeEach(() => {
                            $('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').mouseup();
                        });

                        it('Debe aparecer el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                        });
                    });

                    describe('Item editar > ', () => {
                        beforeEach((done) => {
                            $('#example_detail_div').on('rupDialog_open', () => {
                                done();
                            });
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar').mouseup();
                        });

                        it('Debe aparecer el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                            expect($('#id_detailForm_table').val()).toBe('1');
                            expect($('#nombre_detail_table').val()).toBe('Ana');
                            expect($('#apellidos_detail_table').val()).toBe('García Vázquez');
                            expect($('#edad_detail_table').val()).toBe('7');
                        });
                    });

                    describe('Item clone > ', () => {
                        beforeEach(() => {
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar').mouseup();
                        });

                        it('Debe aparecer el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                            expect($('#id_detailForm_table').val()).toBe('1');
                            expect($('#nombre_detail_table').val()).toBe('Ana');
                            expect($('#apellidos_detail_table').val()).toBe('García Vázquez');
                            expect($('#edad_detail_table').val()).toBe('7');
                        });
                    });

                    describe('Item delete > ', () => {
                        beforeEach((done) => {
                            $('#example').on('tableEditFormAfterDelete', () => {
                                $('#example').on('tableFilterSearch',() => {
                                    done();
                                });
                            });
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar').mouseup();
                            $('.ui-dialog-buttonset > button.btn-material:contains(Aceptar)').click();
                        });

                        it('Debe eliminar la línea:', () => {
                            expect($('#example > tbody > tr:eq(0) > td:eq(1):contains(1)').length).toBe(0);
                        });
                    });

                    describe('Item copy > ', () => {
                        beforeEach(() => {
                            $('#content').append('<textarea rows="5" cols="100" id="testutilInput"></textarea>');
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar').mouseup();
                            $('div.ui-dialog-buttonset > button:contains("' + $.rup.i18n.base.rup_global.aceptar + '")').click();
                        });

                        it('Debe haber el contenido de la primera fila contenido la zona de copiado', () => {
                            expect($('#table_buttons_info textarea').val()).toBe('id\tnombre\tapellidos\tedad\n1\tAna\tGarcía Vázquez\t7\n');
                        });
                    });
                });
            });

            // describe('Edición con formulario > ', () => {
            //     describe('Edición de elementos existentes > ', () => {
            //         beforeEach(() => {
            //             $('tbody > tr > td:contains(2)').dblclick();
            //         });

            //         it('El formulario debe mostrarse:', () => {
            //             expect($('#example_detail_div').is(':visible')).toBeTruthy();
            //         });

            //         describe('Funcionalidad del boton "guardar y continuar" > ', () => {
            //             beforeEach((done) => {
            //                 $('#edad_detail_table').val(11);
            //                 $('#example').on('tableEditFormCompleteCallSaveAjax', done);
            //                 $('#example_detail_button_save_repeat').click();
            //             });

            //             it('Se ha actualizado la tabla:', () => {
            //                 let ctx = $('tbody > tr > td:contains(2)').parent();
            //                 expect($('td:contains(11)', ctx).length).toBe(1);
            //             });

            //             it('No ha desaparecido el formulario:', () => {
            //                 expect($('#example_detail_div').is(':visible')).toBeTruthy();
            //             });
            //         });

            //         describe('Funcionalidad del botón "guardar" > ', () => {
            //             beforeEach((done) => {
            //                 $('#edad_detail_table').val(11);
            //                 $('#example').on('tableEditFormCompleteCallSaveAjax', done);
            //                 $('#example_detail_button_save').click();
            //             });

            //             it('Se ha actualizado la tabla:', () => {
            //                 let ctx = $('tbody > tr > td:contains(2)').parent();
            //                 expect($('td:contains(11)', ctx).length).toBe(1);
            //             });

            //             it('Ha desaparecido el formulario:', () => {
            //                 expect($('#example_detail_div').is(':visible')).toBeFalsy();
            //             });
            //         });
            //     });

            //     describe('Añadido de nuevos elementos > ', () => {
            //         beforeEach(() => {
            //             $('.table_toolbar_btnAdd').click();
            //         });

            //         it('El formulario debe mostrarse:', () => {
            //             expect($('#example_detail_div').is(':visible')).toBeTruthy();
            //         });

            //         describe('Funcionalidad del boton "guardar y continuar" > ', () => {
            //             beforeEach((done) => {
            //                 $('#id_detailForm_table').val(345);
            //                 $('#nombre_detail_table').val('name');
            //                 $('#apellidos_detail_table').val('lastname');
            //                 $('#edad_detail_table').val(11);
            //                 $('#example').on('tableEditFormCompleteCallSaveAjax', done);
            //                 $('#example_detail_button_save_repeat').click();
            //             });

            //             it('Se ha actualizado la tabla:', () => {
            //                 let ctx = $('tbody > tr > td:contains(345)').parent();
            //                 expect($('td:contains(name)', ctx).length).toBe(2);
            //                 expect($('td:contains(lastname)', ctx).length).toBe(1);
            //                 expect($('td:contains(11)', ctx).length).toBe(1);
            //             });

            //             it('No ha desaparecido el formulario:', () => {
            //                 expect($('#example_detail_div').is(':visible')).toBeTruthy();
            //             });
            //         });

            //         describe('Funcionalidad del botón "guardar" > ', () => {
            //             beforeEach((done) => {
            //                 $('#id_detailForm_table').val(345);
            //                 $('#nombre_detail_table').val('name');
            //                 $('#apellidos_detail_table').val('lastname');
            //                 $('#edad_detail_table').val(11);
            //                 $('#example').on('tableEditFormCompleteCallSaveAjax', done);
            //                 $('#example_detail_button_save').click();
            //             });

            //             it('Se ha actualizado la tabla:', () => {
            //                 let ctx = $('tbody > tr > td:contains(345)').parent();
            //                 expect($('td:contains(name)', ctx).length).toBe(2);
            //                 expect($('td:contains(lastname)', ctx).length).toBe(1);
            //                 expect($('td:contains(11)', ctx).length).toBe(1);
            //             });

            //             it('Ha desaparecido el formulario:', () => {
            //                 expect($('#example_detail_div').is(':visible')).toBeFalsy();
            //             });
            //         });
            //     });
            // });

            // describe('Filtrado > ', () => {
            //     beforeEach((done) => {
            //         $('#example').on('draw.dt', () => {
            //             setTimeout(() => {
            //                 done();
            //             }, 300);
            //         });
            //         $('#id_filter_table').val('4');
            //         $('#example_filter_filterButton').click();
            //     });

            //     it('Debe haberse completado el filtrado:', (done) => {
            //         expect($('tbody > tr').length).toBe(1);
            //         expect($('tbody > tr > td:eq(1)').text()).toBe('4');
            //         done();
            //     });
            // });

            // describe('Búsqueda > ', () => {
            //     beforeEach(() => {
            //         $('#searchCollapsLabel_example').click();
            //     });

            //     describe('Aparición del seeker > ', () => {
            //         it('Se muestra el formulario de búsqueda:', () => {
            //             expect($('#id_seeker').is(':visible')).toBeTruthy();
            //             expect($('#nombre_seeker').is(':visible')).toBeTruthy();
            //             expect($('#apellidos_seeker').is(':visible')).toBeTruthy();
            //             expect($('#edad_seeker').is(':visible')).toBeTruthy();
            //         });
            //     });

            //     describe('Funcionalidad del seeker > ', () => {
            //         beforeEach((done) => {
            //             $('#nombre_seeker').val('E');
            //             $('#search_nav_button_example').click();
            //             $('#example').on('tableSeekerSearchComplete', done);
            //         });

            //         it('Se selecciona y marca el resultado de la selección: ', () => {
            //             let ctx = $('td:contains(4)').parent();
            //             expect($('td > span.ui-icon-search', ctx).length).toBe(1);

            //             ctx = $('td:contains(5)').parent();
            //             expect($('td > span.ui-icon-search', ctx).length).toBe(1);
            //         });
            //     });
            // });

            // describe('Paginación > ', () => {
            //     describe('Página siguiente > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('draw.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('#example_next').click();
            //         });

            //         it('Cambia el número de página:', () => {
            //             expect($('li.pageSearch.searchPaginator > input').val()).toBe("2");
            //         });

            //         it('Los registros deben cambiar:', () => {
            //             expect($('tr > td:contains(6)').length).toBe(1);
            //             expect($('tr > td:contains(7)').length).toBe(1);
            //             expect($('tr > td:contains(8)').length).toBe(1);
            //             expect($('tr > td:contains(9)').length).toBe(1);
            //             expect($('tr > td:contains(10)').length).toBe(1);
            //         });
            //     });

            //     describe('Página anterior > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('draw.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('#example_next').click();
            //         });

            //         describe('Realizacion de pruebas > ', () => {
            //             beforeEach((done) => {
            //                 $('#example').on('draw.dt', () => {
            //                     setTimeout(() => {
            //                         done();
            //                     }, 300);
            //                 });
            //                 $('#example_previous').click();
            //             });

            //             it('Cambia el número de página:', () => {
            //                 expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
            //             });

            //             it('Los registros deben cambiar:', () => {
            //                 expect($('tr > td:contains(1)').length).toBe(1);
            //                 expect($('tr > td:contains(2)').length).toBe(1);
            //                 expect($('tr > td:contains(3)').length).toBe(1);
            //                 expect($('tr > td:contains(4)').length).toBe(1);
            //                 expect($('tr > td:contains(5)').length).toBe(1);
            //             });
            //         });
            //     });

            //     describe('Página primera > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('page.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('#example_next').click();
            //         });

            //         describe('Realizacion de pruebas', () => {
            //             beforeEach((done) => {
            //                 $('#example').on('page.dt', () => {
            //                     setTimeout(() => {
            //                         done();
            //                     }, 300);
            //                 });
            //                 $('#example_first').click();
            //             });

            //             it('Cambia el número de página:', () => {
            //                 expect($('li.pageSearch.searchPaginator > input').val()).toBe("1");
            //             });

            //             it('Los registros deben cambiar:', () => {
            //                 expect($('tr > td:contains(1)').length).toBe(1);
            //                 expect($('tr > td:contains(2)').length).toBe(1);
            //                 expect($('tr > td:contains(3)').length).toBe(1);
            //                 expect($('tr > td:contains(4)').length).toBe(1);
            //                 expect($('tr > td:contains(5)').length).toBe(1);
            //             });
            //         });
            //     });

            //     describe('Página última > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('page.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('#example_last').click();
            //         });

            //         it('Cambia el número de página:', () => {
            //             expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
            //         });

            //         it('Los registros deben cambiar:', () => {
            //             expect($('tr > td:contains(11)').length).toBe(1);
            //             expect($('tr > td:contains(12)').length).toBe(1);
            //             expect($('tr > td:contains(13)').length).toBe(1);
            //             expect($('tr > td:contains(14)').length).toBe(1);
            //             expect($('tr > td:contains(15)').length).toBe(1);
            //         });
            //     });

            //     describe('Página desde input > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('page.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('.ui-pg-input').val(3);
            //             $('.ui-pg-input').trigger($.Event('keypress', {
            //                 keyCode: 13,
            //                 which: 13
            //             }));
            //         });

            //         it('Cambia el número de página:', () => {
            //             expect($('li.pageSearch.searchPaginator > input').val()).toBe("3");
            //         });

            //         it('Los registros deben cambiar:', () => {
            //             expect($('tr > td:contains(11)').length).toBe(1);
            //             expect($('tr > td:contains(12)').length).toBe(1);
            //             expect($('tr > td:contains(13)').length).toBe(1);
            //             expect($('tr > td:contains(14)').length).toBe(1);
            //             expect($('tr > td:contains(15)').length).toBe(1);
            //         });
            //     });
            // });

            // describe('Variacion de número de registros por página > ', () => {
            //     beforeEach((done) => {
            //         $('#example').on('draw.dt', () => {
            //             done();
            //         });
            //         $('[name="example_length"]').val(10);
            //         $('[name="example_length"]').trigger('change');
            //     });

            //     it('Debe haber recibido los registros indicados:', () => {
            //         expect($('tbody > tr', $('#example')).length).toBe(10);
            //     });

            //     it('Deben haber únicamente 2 páginas disponibles:', () => {
            //         expect($('.pageSearch.searchPaginator:contains(" de 2")', $('#example_wrapper')).length).toBe(1);
            //     });
            // });

            // describe('Ordenación > ', () => {
            //     describe('Ordenación por nombre ascendente > ', () => {
            //         beforeEach((done) => {
            //             $('#example').on('draw.dt', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });
            //             $('th.sorting[data-col-prop="nombre"]').click();
            //         });

            //         it('Comprobamos que haya cambiado el orden:', () => {
            //             expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
            //             expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('5');
            //             expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
            //             expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('3');
            //             expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('2');
            //         });
            //     });

            //     describe('Ordenación por nombre descendente:', () => {
            //         describe('Ordenacion por nombre descendente', () => {
            //             beforeEach((done) => {
            //                 $('#example').on('draw.dt', () => {
            //                     setTimeout(() => {
            //                         done();
            //                     }, 300);
            //                 });
            //                 $('th[data-col-prop="nombre"]').click();
            //             });

            //             it('Comprobamos que haya cambiado el orden:', () => {
            //                 expect($('#example > tbody > tr:eq(0) > td:eq(1)').text()).toBe('2');
            //                 expect($('#example > tbody > tr:eq(1) > td:eq(1)').text()).toBe('3');
            //                 expect($('#example > tbody > tr:eq(2) > td:eq(1)').text()).toBe('4');
            //                 expect($('#example > tbody > tr:eq(3) > td:eq(1)').text()).toBe('5');
            //                 expect($('#example > tbody > tr:eq(4) > td:eq(1)').text()).toBe('1');
            //             });
            //         });

            //     });
            // });

            // describe('Botonera > ', () => {
            //     describe('Aparecen los botones por defecto > ', () => {
            //         it('Botones por defecto existen:', () => {
            //             expect($('.dt-buttons > .btn-primary').length).toBe(5);
            //         });

            //         it('Solo el botón add está habilitado:', () => {
            //             expect($('.table_toolbar_btnAdd').hasClass('disabledButtonsTable')).toBeFalsy();
            //             expect($('.table_toolbar_btnEdit').hasClass('disabledButtonsTable')).toBeTruthy();
            //             expect($('.table_toolbar_btnClone').hasClass('disabledButtonsTable')).toBeTruthy();
            //             expect($('.table_toolbar_btnDelete').hasClass('disabledButtonsTable')).toBeTruthy();
            //             expect($('.buttons-collection').hasClass('disabledButtonsTable')).toBeTruthy();
            //         });
            //     });
            //     // TODO: Añadir botón extra
            // });

            // // describe('Edición en línea > ', () => {
            // //     beforeEach((done) => {
            // //         clearDatatable($('#example').DataTable());
            // //         generateInlineFormDatatable(done());
            // //     });
            // //     it('asd',() => {
            // //         expect(1).toBe(1);
            // //     });
            // // });

            // describe('Multiseleccion > ', () => {
            //     beforeEach(() => {
            //         $('#linkSelectTableHeadexample').click();
            //     });

            //     it('Debe mostrarse el contextMenu:', () => {
            //         expect($('ul:contains(Marcar visibles)').is(':visible')).toBeTruthy();
            //     });

            //     describe('Funcionalidad de las opciones multiselect > ', () => {
            //         describe('Marcar visibles > ', () => {
            //             beforeEach((done) => {
            //                 $('ul > li:contains(Marcar visibles)').mouseup();
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });

            //             it('Debe añadirlo al contexto:', () => {
            //                 expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
            //                     .toEqual(['2', '3', '4', '5', '1']);
            //             });

            //             it('Debe marcar con highlight los elementos seleccionados:', () => {
            //                 $('#example > tbody > tr').each((i, e) => {
            //                     expect($(e).hasClass('selected tr-highlight')).toBeTruthy();
            //                 });
            //             });

            //             it('Debe mostrar el número de elementos seleccionados:', () => {
            //                 expect(
            //                     $('#example_info > span.select-info:contains(5 filas seleccionadas)').length
            //                 ).toBe(1);
            //             });
            //         });

            //         describe('Desmarcar visibles > ', () => {
            //             beforeEach((done) => {
            //                 $('ul > li:contains(Marcar visibles)').mouseup();
            //                 setTimeout(() => {
            //                     $('ul > li:contains(Desmarcar visibles)').mouseup();
            //                     setTimeout(() => {
            //                         done();
            //                     }, 300);
            //                 }, 300);
            //             });

            //             it('Debe añadirlo al contexto:', () => {
            //                 expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
            //                     .toEqual([]);
            //             });

            //             it('Debe desmarcar con highlight los elementos:', () => {
            //                 $('#example > tbody > tr').each((i, e) => {
            //                     expect($(e).hasClass('selected tr-highlight')).toBeFalsy();
            //                 });
            //             });

            //             it('No se debe mostrar el span con la informacion de los seleccionados:', () => {
            //                 expect(
            //                     $('#example_info > span.select-info').length
            //                 ).toBe(0);
            //             });
            //         });

            //         describe('Marcar todo > ', () => {
            //             beforeEach((done) => {
            //                 $('ul > li:contains(Marcar todo)').mouseup();
            //                 setTimeout(() => {
            //                     done();
            //                 }, 300);
            //             });

            //             it('Debe añadirlo al contexto:', () => {
            //                 expect($('#example').DataTable().settings()[0].multiselection.selectedAll)
            //                     .toBeTruthy();
            //             });

            //             it('Debe marcar con highlight los elementos seleccionados:', () => {
            //                 $('#example > tbody > tr').each((i, e) => {
            //                     expect($(e).hasClass('selected tr-highlight')).toBeTruthy();
            //                 });
            //             });

            //             it('Debe mostrar el número de elementos seleccionados:', () => {
            //                 expect(
            //                     $('#example_info > span.select-info:contains(15 filas seleccionadas)').length
            //                 ).toBe(1);
            //             });
            //         });

            //         describe('Desmarcar todo > ', () => {
            //             beforeEach((done) => {
            //                 $('ul > li:contains(Marcar todo)').mouseup();
            //                 setTimeout(() => {
            //                     $('ul > li:contains(Desmarcar todo)').mouseup();
            //                     setTimeout(() => {
            //                         done();
            //                     }, 300);
            //                 }, 300);
            //             });

            //             it('Debe añadirlo al contexto:', () => {
            //                 expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
            //                     .toEqual([]);
            //             });

            //             it('Debe desmarcar con highlight los elementos:', () => {
            //                 $('#example > tbody > tr').each((i, e) => {
            //                     expect($(e).hasClass('selected tr-highlight')).toBeFalsy();
            //                 });
            //             });

            //             it('No se debe mostrar el span con la informacion de los seleccionados:', () => {
            //                 expect(
            //                     $('#example_info > span.select-info').length
            //                 ).toBe(0);
            //             });
            //         });
            //     });
            // });

            // describe('Validación de formulario > ', () => {
            //     beforeEach((done) => {
            //         $('#example_detail_feedback').on('rupFeedback_show', () => {
            //             done();
            //         });
            //         $('#example > tbody > tr:contains(Irene) > td:eq(0)').click();
            //         $('#exampleeditButton_1').click();
            //         $('div[aria-describedby="example_detail_div"]')
            //             .find('#nombre_detail_table').val('');
            //         $('#example_detail_button_save').click();
            //     });
            //     it('Debe mostrar el feedback del formulario:', () => {
            //         expect($('#example_detail_feedback').is(':visible')).toBeTruthy();
            //         expect($('#example_detail_feedback')
            //             .is(':contains(Se han producido los siguientes errores:Nombre:Campo obligatorio.)'))
            //             .toBeTruthy();
            //     });
            // });

            // describe('Gestión de errores > ', () => {
            //     describe('Errores al filtrar > ', () => {
            //         var setup;
            //         beforeEach(() => {
            //             setup = (callback) => {
            //                 $('#example').on('xhr.dt', () => {
            //                     callback();
            //                 });
            //                 $('#id_filter_table').val('6');
            //                 $('#example_filter_filterButton').click();
            //             };
            //         });
            //         it('No da error:', (done) => {
            //             expect(() => {setup(done);}).not.toThrowError();
            //         });
            //         describe('Tests > ', ()=> {
            //             beforeEach((done) => {setup(done);});
            //             it('El feedback debe mostrarse:', () => {
            //                 expect($('#rup_feedback_example_ok').height()).toBeGreaterThan(0);
            //             });
            //             it('Debe contener el mensaje esperado:', () => {
            //                 expect($('#rup_feedback_example_ok').text()).toBe('KABOOM!');
            //             });
            //         });
            //     });
            //     describe('Errores al guardar > ', () => {
            //         beforeEach((done) => {
            //             //El evento no funciona (Tambien se ha probado con #example_detail_feedback)
            //             // $('#example_detail_feedback_ok').on('rupFeedback_show', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 },500);
            //             // });
            //             $('#example > tbody > tr:contains(Ana) > td:eq(1)').dblclick();
            //             $('#edad_detail_table').val('asd');
            //             $('#example_detail_button_save').click();
            //         });
            //         it('El feedback debe mostrarse:', () => {
            //             expect($('#example_detail_feedback_ok').height()).toBeGreaterThan(0);
            //         });
            //         it('Debe contener el mensaje esperado:', () => {
            //             expect($('#example_detail_feedback_ok').text()).toBe('KABOOM!');
            //         });
            //     });
            //     describe('Errores al buscar > ', () => {
            //         beforeEach((done) => {
            //             $('#searchCollapsLabel_example').click();
            //             $('#edad_seeker').val('asd');
            //             $('#search_nav_button_example').click();
            //             $('#example').on('tableSeekerSearchComplete', () => {
            //                 setTimeout(() => {
            //                     done();
            //                 },500);
            //             });
            //         });
            //         it('El feedback debe mostrarse:', () => {
            //             expect($('#rup_feedback_example').height()).toBeGreaterThan(0);
            //         });
            //         it('Debe contener el mensaje esperado:', () => {
            //             expect($('#rup_feedback_example').text()).toBe('KABOOM!');
            //         });
            //     });
            // });
        });
    });
}

testDatatable();