/* eslint-env jquery,jasmine */

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
        done();
    });

    $('.dataTable').DataTable().destroy();
}

function testDatatable() {
    describe('Test Datatable > ', () => {
        beforeAll((done) => {
            testutils.loadCss(done);

            window.onerror = (event) => {
                console.info('Evento de error detectado en el window...\n' +
                    'namespace: ' + event.namespace +
                    'target: ' + event.target.id);
            };
        });

        afterEach((done) => {
            clearDatatable(done);
        });

        describe('Edición inline datatable > ', () => {
            beforeAll((done) => {
                dtGen.createDatatableInlineEdit(done);
            });

            describe('Funcionamiento de la edición inline > ', () => {
                let nameEdit = 'Ane';
                beforeEach((done) => {
                    $('#exampleInline').on('draw.dt', () => {
                        done();
                    });
                    $('#exampleInline').on('tableEditInlineClickRow', () => {
                        $('#nombre_inline').val(nameEdit);
                        var ev = $.Event('keydown');
                        ev.keyCode = 13;
                        $('#exampleInline > tbody > tr:eq(0)').trigger(ev);
                    });
                    $('#exampleInline > tbody > tr:eq(0) > td:eq(0)').dblclick();
                });
                afterEach((done) => {
                    $.get('/demo/table/reset', done);
                });
                it('Se ha actualizado el valor: ', () => {
                    expect($('#exampleInline > tbody > tr:eq(0) > td:eq(2)').text()).toBe(nameEdit);
                });
            });
        });


        describe('Funcionamiento General > ', () => {
            beforeEach((done) => {
                generateFormEditDatatable(done);
            });

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
                            $('#example').on('tableEditFormSuccessCallSaveAjax', () => {
                                done();
                            });
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar').mouseup();
                            $('.ui-dialog-buttonset > button.btn-material:contains(Aceptar)').click();
                        });

                        afterEach(() => {
                            $.ajax('/demo/table/remote/deleteEnd', {
                                type: 'POST',
                                data: '{"foo":"bar"}'
                            });
                        });

                        it('Debe eliminar la línea:', () => {
                            expect($('#example > tbody > tr:eq(0) > td:eq(1):contains(1)').length).toBe(0);
                        });
                    });

                    describe('Item copy > ', () => {
                        beforeEach((done) => {
                            document.copied = '';
                            document.exC = document.execCommand;
                            document.execCommand = (param) => {
                                if (param === 'copy') {
                                    document.copied = window.getSelection().toString();
                                    return true;
                                } else {
                                    document.exC(param);
                                }
                            };
                            $('#example').on('rupTable_confirmMsgOpen', () => {
                                $('#example').on('rupTable_copied', () => {
                                    done();
                                });
                                $('div.ui-dialog-buttonset > button:contains("' + $.rup.i18n.base.rup_global.aceptar + '")').click();
                            });
                            $('#example > tbody > tr:eq(0) > td:eq(0)').click();
                            $('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar').mouseup();
                        });
                        afterEach(() => {
                            document.execCommand = document.exC;
                        });
                        it('Debe haber el contenido de la primera fila contenido la zona de copiado', () => {
                            expect(document.copied).toBe('id;nombre;apellidos;edad\n1;Ana;García Vázquez;7\n');
                        });
                    });
                });
            });
            describe('Edición con formulario > ', () => {
                describe('Edición de elementos existentes > ', () => {
                    beforeEach(() => {
                        $('tbody > tr:eq(0) > td:eq(1)').dblclick();
                    });

                    it('El formulario debe mostrarse:', () => {
                        expect($('#example_detail_div').is(':visible')).toBeTruthy();
                    });

                    describe('Funcionalidad del boton "guardar y continuar" > ', () => {
                        beforeEach((done) => {
                            $('#edad_detail_table').val(11);
                            $('#example').on('tableEditFormSuccessCallSaveAjax', () => {
                                done();
                            });
                            $('#example_detail_button_save_repeat').click();
                        });

                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr:eq(0)');
                            expect($('td:eq(4)', ctx).text()).toBe('11');
                        });

                        it('No ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                        });
                    });

                    describe('Funcionalidad del botón "guardar" > ', () => {
                        beforeEach((done) => {
                            $('#edad_detail_table').val(11);
                            $('#example').on('tableEditFormSuccessCallSaveAjax', done);
                            $('#example_detail_button_save').click();
                        });

                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr:eq(0)');
                            expect($('td:eq(4)', ctx).text()).toBe('11');
                        });

                        it('Ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeFalsy();
                        });
                    });
                });

                describe('Añadido de nuevos elementos > ', () => {
                    beforeEach(() => {
                        $('.table_toolbar_btnAdd').click();
                    });

                    it('El formulario debe mostrarse:', () => {
                        expect($('#example_detail_div').is(':visible')).toBeTruthy();
                    });

                    describe('Funcionalidad del boton "guardar y continuar" > ', () => {
                        beforeEach((done) => {
                            $('#id_detailForm_table').val(345);
                            $('#nombre_detail_table').val('Adriana');
                            $('#apellidos_detail_table').val('Moreno');
                            $('#edad_detail_table').val(11);
                            $('#example').on('tableEditFormCompleteCallSaveAjax', () => {
                                setTimeout(done, 600);
                            });
                            $('#example_detail_button_save_repeat').click();
                        });

                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(345)').parent();
                            expect($('td:contains(Adriana)', ctx).length).toBe(1);
                            expect($('td:contains(Moreno)', ctx).length).toBe(1);
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });

                        it('No ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeTruthy();
                        });
                    });

                    describe('Funcionalidad del botón "guardar" > ', () => {
                        beforeEach((done) => {
                            $('#id_detailForm_table').val(345);
                            $('#nombre_detail_table').val('Adriana');
                            $('#apellidos_detail_table').val('Moreno');
                            $('#edad_detail_table').val(11);
                            $('#example').on('tableEditFormCompleteCallSaveAjax', () => {
                                setTimeout(done, 600);
                            });
                            $('#example_detail_button_save').click();
                        });

                        it('Se ha actualizado la tabla:', () => {
                            let ctx = $('tbody > tr > td:contains(345)').parent();
                            expect($('td:contains(Adriana)', ctx).length).toBe(1);
                            expect($('td:contains(Moreno)', ctx).length).toBe(1);
                            expect($('td:contains(11)', ctx).length).toBe(1);
                        });

                        it('Ha desaparecido el formulario:', () => {
                            expect($('#example_detail_div').is(':visible')).toBeFalsy();
                        });
                    });
                });
            });
            describe('Filtrado > ', () => {
                beforeEach((done) => {
                    $('#example').on('draw.dt', () => {
                        done();
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
                        $('#example').on('tableSeekerAfterSearch', done);
                        $('#nombre_seeker').val('E');
                        $('#search_nav_button_example').click();
                    });

                    it('Se selecciona y marca el resultado de la selección: ', () => {
                        let ctx = $('td:contains(4)').parent();
                        expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                        ctx = $('td:contains(5)').parent();
                        expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);
                    });
                });
            });
            describe('Paginación > ', () => {
                describe('Página siguiente > ', () => {
                    beforeEach((done) => {
                        $('#example').on('draw.dt', () => {
                            done();
                        });
                        $('#example_next').click();
                    });

                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe('2');
                    });

                    it('Los registros deben cambiar:', () => {
                        expect($('tr > td:contains(11)').length).toBe(1);
                        expect($('tr > td:contains(12)').length).toBe(1);
                        expect($('tr > td:contains(13)').length).toBe(1);
                        expect($('tr > td:contains(14)').length).toBe(1);
                        expect($('tr > td:contains(15)').length).toBe(1);
                    });
                });

                describe('Página anterior > ', () => {
                    beforeEach((done) => {
                        var fnc = () => {
                            $('#example').off('draw.dt', fnc);
                            $('#example').on('draw.dt', () => {
                                done();
                            });
                            setTimeout(() => {
                                $('#example_previous').click();
                            }, 500);
                        };
                        // FIXME : El evento draw se ejecuta demasiado pronto. Lo que obliga a usar timeout.
                        $('#example').on('draw.dt', fnc);
                        $('#example_next').click();
                    });


                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe('1');
                    });

                    it('Los registros deben cambiar:', () => {
                        expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('345');
                        expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('1');
                        expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('2');
                        expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('3');
                        expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('tbody > tr:eq(5) > td:eq(1)').text()).toBe('5');
                        expect($('tbody > tr:eq(6) > td:eq(1)').text()).toBe('6');
                        expect($('tbody > tr:eq(7) > td:eq(1)').text()).toBe('7');
                        expect($('tbody > tr:eq(8) > td:eq(1)').text()).toBe('8');
                        expect($('tbody > tr:eq(9) > td:eq(1)').text()).toBe('9');
                    });
                });

                describe('Página primera > ', () => {
                    beforeEach((done) => {
                        var fnc = () => {
                            $('#example').off('draw.dt', fnc);
                            $('#example').on('draw.dt', () => {
                                done();
                            });
                            setTimeout(() => {
                                $('#example_first').click();
                            }, 500);
                        };
                        // FIXME : El evento draw se ejecuta demasiado pronto. Lo que obliga a usar timeout.
                        $('#example').on('draw.dt', fnc);
                        $('#example_next').click();
                    });


                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe('1');
                    });

                    it('Los registros deben cambiar:', () => {
                        expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('345');
                        expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('1');
                        expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('2');
                        expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('3');
                        expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('tbody > tr:eq(5) > td:eq(1)').text()).toBe('5');
                        expect($('tbody > tr:eq(6) > td:eq(1)').text()).toBe('6');
                        expect($('tbody > tr:eq(7) > td:eq(1)').text()).toBe('7');
                        expect($('tbody > tr:eq(8) > td:eq(1)').text()).toBe('8');
                        expect($('tbody > tr:eq(9) > td:eq(1)').text()).toBe('9');
                    });
                });

                describe('Página última > ', () => {
                    beforeEach((done) => {
                        $('#example').on('draw.dt', () => {
                            done();
                        });
                        $('#example_last').click();
                    });

                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe('2');
                    });

                    it('Los registros deben cambiar:', () => {
                        expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                });

                describe('Página desde input > ', () => {
                    beforeEach((done) => {
                        $('#example').on('draw.dt', () => {
                            done();
                        });
                        $('.ui-pg-input').val(2);
                        $('.ui-pg-input').trigger($.Event('keypress', {
                            keyCode: 13,
                            which: 13
                        }));
                    });

                    it('Cambia el número de página:', () => {
                        expect($('li.pageSearch.searchPaginator > input').val()).toBe('2');
                    });

                    it('Los registros deben cambiar:', () => {
                        expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                });
            });
            describe('Variacion de número de registros por página > ', () => {
                beforeEach((done) => {
                    $('#example').on('draw.dt', () => {
                        done();
                    });
                    $('[name="example_length"]').val(10);
                    $('[name="example_length"]').trigger('change');
                });

                it('Debe haber recibido los registros indicados:', () => {
                    expect($('tbody > tr', $('#example')).length).toBe(10);
                });

                it('Deben haber únicamente 2 páginas disponibles:', () => {
                    expect($('.pageSearch.searchPaginator:contains(" de 2")', $('#example_wrapper')).length).toBe(1);
                });
            });
            describe('Ordenación > ', () => {
                describe('Ordenación por nombre ascendente > ', () => {
                    beforeEach((done) => {
                        $('#example').on('draw.dt', done);
                        $('th.sorting[data-col-prop="nombre"]').click();
                    });

                    it('Comprobamos que haya cambiado el orden:', () => {
                        expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                });

                describe('Ordenación por nombre descendente:', () => {
                    describe('Ordenacion por nombre descendente', () => {
                        beforeEach((done) => {
                            $('#example').on('draw.dt', done);
                            $('th.sorting_asc[data-col-prop="nombre"]').click();
                        });

                        it('Comprobamos que haya cambiado el orden:', () => {
                            expect($('tbody > tr:eq(0) > td:eq(1)').text()).toBe('2');
                            expect($('tbody > tr:eq(1) > td:eq(1)').text()).toBe('7');
                            expect($('tbody > tr:eq(2) > td:eq(1)').text()).toBe('8');
                            expect($('tbody > tr:eq(3) > td:eq(1)').text()).toBe('10');
                            expect($('tbody > tr:eq(4) > td:eq(1)').text()).toBe('3');
                            expect($('tbody > tr:eq(5) > td:eq(1)').text()).toBe('4');
                            expect($('tbody > tr:eq(6) > td:eq(1)').text()).toBe('9');
                            expect($('tbody > tr:eq(7) > td:eq(1)').text()).toBe('5');
                            expect($('tbody > tr:eq(8) > td:eq(1)').text()).toBe('6');
                            expect($('tbody > tr:eq(9) > td:eq(1)').text()).toBe('1');
                        });
                    });

                });
            });
            describe('Botonera > ', () => {
                describe('Aparecen los botones por defecto > ', () => {
                    it('Botones por defecto existen:', () => {
                        expect($('.dt-buttons > .btn-material').length).toBe(5);
                    });

                    it('Solo el botón add está habilitado:', () => {
                        expect($('.table_toolbar_btnAdd').hasClass('disabledButtonsTable')).toBeFalsy();
                        expect($('.table_toolbar_btnEdit').hasClass('disabledButtonsTable')).toBeTruthy();
                        expect($('.table_toolbar_btnClone').hasClass('disabledButtonsTable')).toBeTruthy();
                        expect($('.table_toolbar_btnDelete').hasClass('disabledButtonsTable')).toBeTruthy();
                        expect($('.buttons-collection').hasClass('disabledButtonsTable')).toBeTruthy();
                    });
                });
                describe('Añadido de nuevo botón > ', () => {
                    beforeEach((done) => {
                        var btnObj = {
                            text: 'addedBtn',
                            action: () => {
                                alert('action');
                                setTimeout(done, 300);
                            },
                            classname: 'btn-material-primary-high-emphasis',
                            displayRegex: 1,
                            id: 'exampleaddedButton_1',
                            insideContextMenu: true
                        };
                        $('#example').rup_table('createButton', btnObj, 4);

                        $('.dt-buttons').children().eq(4).click();
                        $('tbody > tr:eq(0)').contextmenu();
                    });

                    it('Se añade el nuevo botón en la posicion y con la funcionalidad e id esperado: ', () => {
                        expect($('.dt-buttons').children().eq(4).text()).toBe('addedBtn');
                        expect($('.dt-buttons').children().eq(4).is('#exampleaddedButton_1')).toBe(true);
                        expect($('.rup-message-alert > .ui-dialog-content').text()).toBe('action');
                    });
                    it('Se añade la opcion al contextMenu: ', () => {
                        expect($('#contextMenu3 > li:contains(addedBtn)').length).toBe(1);
                    });
                });
            });
            describe('Multiseleccion > ', () => {
                beforeEach(() => {
                    $('#linkSelectTableHeadexample').click();
                });

                it('Debe mostrarse el contextMenu:', () => {
                    expect($('ul:contains(Marcar visibles)').is(':visible')).toBeTruthy();
                });

                describe('Funcionalidad de las opciones multiselect > ', () => {
                    describe('Marcar visibles > ', () => {
                        beforeEach((done) => {
                            $('ul > li:contains(Marcar visibles)').mouseup();
                            setTimeout(() => {
                                done();
                            }, 300);
                        });

                        it('Debe añadirlo al contexto:', () => {
                            expect($('#example').DataTable().settings()[0].multiselection.selectedAll)
                                .toBeFalsy();
                            expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
                                .toEqual(['2', '7', '8', '10', '3', '4', '9', '5', '6', '1']);
                        });

                        it('Debe marcar con highlight los elementos seleccionados:', () => {
                            $('#example > tbody > tr').each((i, e) => {
                                expect($(e).hasClass('selected tr-highlight')).toBeTruthy();
                            });
                        });

                        it('Debe mostrar el número de elementos seleccionados:', () => {
                            expect($('span.select-info').text()).toBe('10 filas seleccionadas');
                        });
                    });

                    describe('Desmarcar visibles > ', () => {
                        beforeEach((done) => {
                            $('ul > li:contains(Marcar visibles)').mouseup();
                            setTimeout(() => {
                                $('ul > li:contains(Desmarcar visibles)').mouseup();
                                setTimeout(() => {
                                    done();
                                }, 300);
                            }, 300);
                        });

                        it('Debe añadirlo al contexto:', () => {
                            expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
                                .toEqual([]);
                        });

                        it('Debe desmarcar con highlight los elementos:', () => {
                            $('#example > tbody > tr').each((i, e) => {
                                expect($(e).hasClass('selected tr-highlight')).toBeFalsy();
                            });
                        });

                        it('No se debe mostrar el span con la informacion de los seleccionados:', () => {
                            expect(
                                $('#example_info > span.select-info').length
                            ).toBe(0);
                        });
                    });

                    describe('Marcar todo > ', () => {
                        beforeEach((done) => {
                            $('ul > li:contains(Marcar todo)').mouseup();
                            setTimeout(() => {
                                done();
                            }, 300);
                        });

                        it('Debe añadirlo al contexto:', () => {
                            expect($('#example').DataTable().settings()[0].multiselection.selectedAll)
                                .toBeTruthy();
                        });

                        it('Debe marcar con highlight los elementos seleccionados:', () => {
                            $('#example > tbody > tr').each((i, e) => {
                                expect($(e).hasClass('selected tr-highlight')).toBeTruthy();
                            });
                        });

                        it('Debe mostrar el número de elementos seleccionados:', () => {
                            expect($('span.select-info').text()).toBe('15 filas seleccionadas');
                        });
                    });

                    describe('Desmarcar todo > ', () => {
                        beforeEach((done) => {
                            $('ul > li:contains(Marcar todo)').mouseup();
                            setTimeout(() => {
                                $('ul > li:contains(Desmarcar todo)').mouseup();
                                setTimeout(() => {
                                    done();
                                }, 300);
                            }, 300);
                        });

                        it('Debe añadirlo al contexto:', () => {
                            expect($('#example').DataTable().settings()[0].multiselection.selectedIds)
                                .toEqual([]);
                        });

                        it('Debe desmarcar con highlight los elementos:', () => {
                            $('#example > tbody > tr').each((i, e) => {
                                expect($(e).hasClass('selected tr-highlight')).toBeFalsy();
                            });
                        });

                        it('No se debe mostrar el span con la informacion de los seleccionados:', () => {
                            expect(
                                $('#example_info > span.select-info').length
                            ).toBe(0);
                        });
                    });
                });
            });
            describe('Validación de formulario > ', () => {
                beforeEach((done) => {
                    $('#example_detail_feedback').on('rupFeedback_show', done);
                    $('#example > tbody > tr:contains(Irene) > td:eq(0)').click();
                    $('#exampleeditButton_1').click();
                    $('div[aria-describedby="example_detail_div"]')
                        .find('#nombre_detail_table').val('');
                    $('#example_detail_button_save').click();
                });
                it('Debe mostrar el feedback del formulario:', () => {
                    expect($('#example_detail_feedback').is(':visible')).toBeTruthy();
                    expect($('#example_detail_feedback').text())
                        .toBe('Se han producido los siguientes errores:Nombre:Campo obligatorio.');
                });
            });
            describe('Gestión de errores > ', () => {
                describe('Errores al filtrar > ', () => {
                    beforeEach((done) => {
                        $('#id_filter_table').val('6');
                        $('#example_filter_filterButton').click();
                        setTimeout(done, 350);
                    });

                    it('El feedback debe comportarse de la manera esperada:', () => {
                        expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                        expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                            .toBe('DataTables warning: table id=example - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                    });
                });

                describe('Errores al guardar > ', () => {
                    beforeEach((done) => {
                        $('#example').on('tableEditFormErrorCallSaveAjax', () => {
                            done();
                        });
                        $('#example > tbody > tr:contains(Ana) > td:eq(1)').dblclick();
                        $('#edad_detail_table').val('asd');
                        $('#example_detail_button_save').click();
                    });
                    it('El feedback debe mostrarse:', () => {
                        expect($('#example_detail_feedback_ok').height()).toBeGreaterThan(0);
                    });
                    it('Debe contener el mensaje esperado:', () => {
                        expect($('#example_detail_feedback_ok').text()).toBe('KABOOM!');
                    });
                });

                describe('Errores al buscar > ', () => {
                    beforeEach((done) => {
                        $('#searchCollapsLabel_example').click();
                        $('#edad_seeker').val('asd');
                        $('#search_nav_button_example').click();
                        $('#example').on('tableSeekerSearchError', done);
                    });
                    it('El feedback debe mostrarse:', () => {
                        expect($('#rup_feedback_example').height()).toBeGreaterThan(0);
                    });
                    it('Debe contener el mensaje esperado:', () => {
                        expect($('#rup_feedback_example').text()).toBe('Not Acceptable: KABOOM');
                    });
                });
            });
        });

    });
}

testDatatable();