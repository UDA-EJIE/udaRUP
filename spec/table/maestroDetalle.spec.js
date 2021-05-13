/* eslint-env jquery,jasmine */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.dialog';
import 'rup.message';
import 'rup.contextMenu';
import 'rup_table/rup.table';
import * as testutils from '../common/specCommonUtils.js';
import * as dtGen from './tableCreator';
// import {
//     doesNotReject
// } from 'assert';

var selected = {};

function clearDatatable(done) {
    if ($('[id*="contextMenu"], [id*="context-menu"]').length > 0) {
        $('.context-menu, .context-menu-active').rup_contextMenu('destroy');
        $.contextMenu('destroy');
    }

    $('.rup-dialog').each((i,e)=>{
        $('#'+$(e).attr('aria-describedby')).rup_dialog('destroy');
    });

    $('.dataTable').on('destroy.dt', () => {
        $('#content').html('');
        $('#content').nextAll().remove();
        setTimeout(done, 100);
    });

    $('.dataTable').DataTable().destroy();
}

function relacionMaestroDetalle(callback) {
    let api = $('#example1').DataTable();
    $('#example1').on('select.dt', (e, dt, type, indexes) => {
        let data = api.rows(indexes).data();
        selected.id = data.pluck('id')[0];
        selected.nombre = data.pluck('nombre')[0];
        selected.apellidos = data.pluck('apellidos')[0];
        selected.edad = data.pluck('edad')[0];

        $('#example2_filter_fieldset').find('#id_filter_table').val(selected.id);
        $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();

    });
    callback();
}

function buscarAceptar(){
	var boton = $('.ui-dialog-buttonset button').filter(function() {
		  return $(this).text().trim() === 'Aceptar';
		});
	return boton[0];
}

function relacionMaestroDetalleF2I(callback) {
    let api = $('#example1').DataTable();
    $('#example1').on('select.dt', (e, dt, type, indexes) => {
        let data = api.rows(indexes).data();
        selected.id = data.pluck('id')[0];
        selected.nombre = data.pluck('nombre')[0];
        selected.apellidos = data.pluck('apellidos')[0];
        selected.edad = data.pluck('edad')[0];

        $('#inline2_filter_fieldset').find('#id_filter_table').val(selected.id);
        $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();

    });
    callback();
}

function relacionMaestroDetalleI2F(callback) {
    let api = $('#inline1').DataTable();
    $('#inline1').on('select.dt', (e, dt, type, indexes) => {
        let data = api.rows(indexes).data();
        selected.id = data.pluck('id')[0];
        selected.nombre = data.pluck('nombre')[0];
        selected.apellidos = data.pluck('apellidos')[0];
        selected.edad = data.pluck('edad')[0];

        $('#example2_filter_fieldset').find('#id_filter_table').val(selected.id);
        $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();

    });
    callback();
}

function relacionMaestroDetalleI2I(callback) {
    let api = $('#inline1').DataTable();
    $('#inline1').on('select.dt', (e, dt, type, indexes) => {
        let data = api.rows(indexes).data();
        selected.id = data.pluck('id')[0];
        selected.nombre = data.pluck('nombre')[0];
        selected.apellidos = data.pluck('apellidos')[0];
        selected.edad = data.pluck('edad')[0];

        $('#inline2_filter_fieldset').find('#id_filter_table').val(selected.id);
        $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();

    });
    callback();
}

function testForm2Form(defer) {
    describe('Test Table Master-Detail Form2Form >', () => {
        beforeAll((done) => {
            testutils.loadCss(done);
            window.onerror = (event) => {
                testutils.testTrace('Evento de error detectado en el window', 
                    'namespace: ' + event.namespace +
                    'target: ' + event.target.id);
            };
        });
        beforeEach((done) => {
            dtGen.createDatatable1(1, () => {
                dtGen.createDatatable2(() => {
                    relacionMaestroDetalle(done);
                });
            });
        });
        afterEach((done) => {
            clearDatatable(() => {
                $.get('/demo/table/reset', done);
            });
        });
        afterAll(() => {
            defer.resolve();
        });

        describe('Creación > ', () => {
            it('El table filtro debe contener elementos y la de resultados estar vacía:', () => {
                expect($('#example1 > tbody > tr').length).toBe(10);
                expect($('#example2 > tbody > tr').length).toBe(0);
            });
        });

        describe('Filtrado intertabla > ', () => {
            beforeEach((done) => {
                $('#example2').on('draw.dt', done);
                $('#example1 > tbody > tr:eq(3) > td:eq(0)').click();
            });
            it('La fila seleccionada debe aparecer en la tabla de detalle:', () => {
                expect($('#example2 > tbody > tr').length).toBe(1);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe(selected.id);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(selected.nombre);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(3)').text()).toBe(selected.apellidos);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(4)').text()).toBe(selected.edad);
            });
        });

        describe('Funcionamiento independiente > ', () => {
            describe('Filtrado independiente > ', () => {
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', done);
                        $('#example1_filter_fieldset').find('#id_filter_table').val(4);
                        $('#example1_filter_fieldset').find('#example1_filter_filterButton').click();
                    });
                    it('Se debe de haber filtrado #example1:', () => {
                        let ctx = $('#example1 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber cambios en #example2:', () => {
                        let ctx = $('#example2 > tbody > tr');
                        expect(ctx.length).toBe(0);
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', done);
                        $('#example2_filter_fieldset').find('#id_filter_table').val(4);
                        $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                    });
                    it('Se debe de haber filtrado #example2:', () => {
                        let ctx = $('#example2 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber filtrado en #example1:', () => {
                        let ctx = $('#example1 > tbody > tr');
                        expect(ctx.length).toBe(10);
                    });
                });
            });
            describe('Búsqueda independiente > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_example1').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #example1:', () => {
                            expect($('#example1').find('#id_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#nombre_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#apellidos_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#edad_example1_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #example2', () => {
                            expect($('#example2').find('#id_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#nombre_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#apellidos_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#edad_example2_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableSeekerAfterSearch', done);
                            $('#example1').find('#nombre_example1_seeker').val('E');
                            $('#search_nav_button_example1').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#example1 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            ctx = $('#example1 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);
                        });
                        it('No se selecciona nada en #example2:', () => {
                            expect($('#example2 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_example2').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #example2:', () => {
                            expect($('#example2').find('#id_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#nombre_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#apellidos_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#edad_example2_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #example2', () => {
                            expect($('#example1').find('#id_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#nombre_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#apellidos_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#edad_example1_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableSeekerAfterSearch', done);
                            $('#example2').find('#nombre_example2_seeker').val('E');
                            $('#search_nav_button_example2').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#example2 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            let ctx2 = $('#example2 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx2).length).toBe(1);
                        });
                        it('No se selecciona nada en #example1:', () => {
                            expect($('#example1 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
            });
            describe('Formularios independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('tableEditFormAfterFillData', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1 > tbody > tr:eq(0)').dblclick();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example1_detail_div').is(':visible')).toBeTruthy();
                    });
                    it('El formulario #example2 no debe mostrarse:', () => {
                        expect($('#example2_detail_div').is(':visible')).toBeFalsy();
                    });
                    describe('Funcionamiento del formulario', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableEditFormSuccessCallSaveAjax', done);
                            $('#example1_detail_div').find('#edad_detail_table').val(11);
                            $('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe actualizar la línea en #example1 sin modificar #example2:', () => {
                            let ctx = $('#example1 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(1);
                            ctx = $('#example2 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('tableEditFormAfterFillData', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2 > tbody > tr:eq(0)').dblclick();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example2_detail_div').is(':visible')).toBeTruthy();
                    });
                    it('El formulario #example1 no debe mostrarse:', () => {
                        expect($('#example1_detail_div').is(':visible')).toBeFalsy();
                    });
                    describe('Funcionamiento del formulario', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableEditFormCompleteCallSaveAjax', () => {
                                setTimeout(done, 350);
                            });
                            $('#example2_detail_div').find('#edad_detail_table').val(12);
                            $('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe actualizar la línea en #example1 sin modificar #example2:', () => {
                            let ctx = $('#example2 > tbody > tr:eq(0)');
                            expect($('td:contains(12)', ctx).length).toBe(1);

                            ctx = $('#example1 > tbody > tr:eq(0)');
                            expect($('td:contains(12)', ctx).length).toBe(0);
                        });
                    });
                });
            });
            describe('Ordenación independiente > ', () => {
                beforeEach((done) => {
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                    setTimeout(done, 100);
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#example1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1').find('th:contains(Id)').click();
                    });

                    it('Debe haber cambiado el orden de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#example1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#example1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#example1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#example1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#example2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#example2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#example2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#example2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#example2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2').find('th:contains(Id)').click();
                    });
                    it('Debe haber cambiado el orden de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#example2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#example2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#example2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#example2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#example1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#example1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#example1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#example1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
            });
            describe('Paginación independiente > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', done);
                        $('#example1_next').click();
                    });
                    it('Cambia el número de página de #example1:', () => {
                        expect($('.pagination input', $('#example1_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #example2:', () => {
                        expect($('.pagination input', $('#example2_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', done);
                        $('#example2_next').click();
                    });
                    it('Cambia el número de página de #example2:', () => {
                        expect($('.pagination input', $('#example2_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #example1:', () => {
                        expect($('.pagination input', $('#example1_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
            });
            describe('Botonera y feedback independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#example1_containerToolbar');
                        expect($('#example1addButton_1', contx).length).toBe(1);
                        expect($('#example1editButton_1', contx).length).toBe(1);
                        expect($('#example1cloneButton_1', contx).length).toBe(1);
                        expect($('#example1deleteButton_1', contx).length).toBe(1);
                        expect($('#example1informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_example1').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#example1 > tbody > tr:eq(2) > td:eq(1)').click();
                            $('#example1editButton_1').click();
                            $('div[aria-describedby="example1_detail_div"]')
                                .find('#nombre_detail_table').val('Anabelle');
                            $('div[aria-describedby="example1_detail_div"]')
                                .find('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe aparecer el feedback de #example1:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_example1')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #example2:', () => {
                            expect($('#rup_feedback_example2').is('visible')).toBeFalsy();
                            expect($('#rup_feedback_example2').text()).toBe('');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#example2_containerToolbar');
                        expect($('#example2addButton_1', contx).length).toBe(1);
                        expect($('#example2editButton_1', contx).length).toBe(1);
                        expect($('#example2cloneButton_1', contx).length).toBe(1);
                        expect($('#example2deleteButton_1', contx).length).toBe(1);
                        expect($('#example2informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_example2').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#example2 > tbody > tr:eq(2) > td:eq(0)').click();
                            $('#example2editButton_1').click();
                            $('div[aria-describedby="example2_detail_div"]')
                                .find('#nombre_detail_table').val('Arlene');
                            $('div[aria-describedby="example2_detail_div"]')
                                .find('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe aparecer el feedback de #example2:', () => {
                            expect($('#rup_feedback_example2').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_example2')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #example1:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_example1').text()).toBe('');
                        });
                    });
                });
            });
            describe('Validaciones de formulario independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1_detail_feedback').on('rupFeedback_show', () => {
                            done();
                        });
                        $('#example1 > tbody > tr:contains(Irene) > td:eq(0)').click();
                        $('#example1editButton_1').click();
                        $('div[aria-describedby="example1_detail_div"]')
                            .find('#nombre_detail_table').val('');
                        $('#example1_detail_button_save').click();
                        $(buscarAceptar()).click();//boton confirmar cambios
                    });
                    it('Debe mostrar el feedback del formulario de #example1:', () => {
                        expect($('#example1_detail_feedback').is(':visible')).toBeTruthy();
                        expect($('#example1_detail_feedback').text()).toBe('Se han producido los siguientes errores:Nombre:Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #example2:', () => {
                        expect($('#example2_detail_feedback').is(':visible')).toBeFalsy();
                        expect($('#example2_detail_feedback').text()).toBe('');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2_detail_feedback').on('rupFeedback_show', () => {
                            done();
                        });
                        $('#example2 > tbody > tr:contains(Irene) > td:eq(0)').click();
                        $('#example2editButton_1').click();
                        $('div[aria-describedby="example2_detail_div"]')
                            .find('#nombre_detail_table').val('');
                        $('#example2_detail_button_save').click();
                        $(buscarAceptar()).click();//boton confirmar cambios
                    });
                    it('Debe mostrar el feedback del formulario de #example2:', () => {
                        expect($('#example2_detail_feedback').is(':visible')).toBeTruthy();
                        expect($('#example2_detail_feedback').text()).toBe('Se han producido los siguientes errores:Nombre:Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #example1:', () => {
                        expect($('#example1_detail_feedback').is(':visible')).toBeFalsy();
                        expect($('#example1_detail_feedback').text()).toBe('');
                    });
                });
            });
            describe('Gestión de errores > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#id_filter_table', $('#example1_filter_form')).val('6');
                            $('#example1_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=example1 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableEditFormErrorCallSaveAjax', done);
                            $('#example1 > tbody > tr:contains(Ana) > td:eq(1)').dblclick();
                            $('#edad_detail_table', $('#example1_detail_div')).val('asd');
                            $('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#example1_detail_feedback_ok').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#example1_detail_feedback_ok').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_example1').click();
                            $('#edad_example1_seeker', $('#example1')).val('asd');
                            $('#search_nav_button_example1').click();
                            $('#example1').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_example1').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#example2_filter_form').find('[id="id_filter_table"]').val('6');
                            $('#example2_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=example2 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableEditFormErrorCallSaveAjax', done);
                            $('#example2 > tbody > tr:contains(Ana) > td:eq(1)').dblclick();
                            $('#edad_detail_table', $('#example2_detail_div')).val('asd');
                            $('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#example2_detail_feedback_ok').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#example2_detail_feedback_ok').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_example2').click();
                            $('#edad_example2_seeker', $('#example2')).val('asd');
                            $('#search_nav_button_example2').click();
                            $('#example2').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_example2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_example2').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
            });
        });
    });
    return defer;
}

function testForm2Inline(defer) {
    describe('Test Table Master-Detail Form2Inline >', () => {
        beforeAll((done) => {
            testutils.loadCss(done);
            window.onerror = (event) => {
                testutils.testTrace('Evento de error detectado en el window', 
                    'namespace: ' + event.namespace +
                    'target: ' + event.target.id);
            };
        });
        beforeEach((done) => {
            dtGen.createDatatable1(1, () => {
                dtGen.createDatatableInlineEdit(() => {
                    relacionMaestroDetalleF2I(done);
                }, 'inline2');
            });
        });
        afterEach((done) => {
            clearDatatable(() => {
                $.get('/demo/table/reset', done);
            });
        });
        afterAll(() => {
            defer.resolve();
        });

        describe('Creación > ', () => {
            it('El table filtro debe contener elementos y la de resultados estar vacía:', () => {
                expect($('#example1 > tbody > tr').length).toBe(10);
                expect($('#inline2 > tbody > tr').length).toBe(0);
            });
        });
        describe('Filtrado intertabla > ', () => {
            beforeEach((done) => {
                $('#inline2').on('draw.dt', done);
                $('#example1 > tbody > tr:eq(3) > td:eq(0)').click();
            });
            it('La fila seleccionada debe aparecer en la tabla de detalle:', () => {
                expect($('#inline2 > tbody > tr').length).toBe(1);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe(selected.id);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(selected.nombre);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(3)').text()).toBe(selected.apellidos);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(4)').text()).toBe(selected.edad);
            });
        });
        describe('Funcionamiento independiente > ', () => {
            describe('Filtrado independiente > ', () => {
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', done);
                        $('#example1_filter_fieldset').find('#id_filter_table').val(4);
                        $('#example1_filter_fieldset').find('#example1_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#example1_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #example1:', () => {
                        let ctx = $('#example1 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber cambios en #example2:', () => {
                        let ctx = $('#inline2 > tbody > tr');
                        expect(ctx.length).toBe(0);
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', done);
                        $('#inline2_filter_fieldset').find('#id_filter_table').val(4);
                        $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#inline2_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #example2:', () => {
                        let ctx = $('#inline2 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber filtrado en #example1:', () => {
                        let ctx = $('#example1 > tbody > tr');
                        expect(ctx.length).toBe(10);
                    });
                });
            });
            describe('Búsqueda independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_example1').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #example1:', () => {
                            expect($('#example1').find('#id_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#nombre_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#apellidos_example1_seeker').is(':visible')).toBeTruthy();
                            expect($('#example1').find('#edad_example1_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #inline2', () => {
                            expect($('#inline2').find('#id_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#nombre_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#apellidos_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#edad_inline2_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableSeekerAfterSearch', done);
                            $('#example1').find('#nombre_example1_seeker').val('E');
                            $('#search_nav_button_example1').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#example1 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            ctx = $('#example1 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);
                        });
                        it('No se selecciona nada en #inline2:', () => {
                            expect($('#inline2 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_inline2').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #inline2:', () => {
                            expect($('#inline2').find('#id_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#nombre_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#apellidos_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#edad_inline2_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #example1', () => {
                            expect($('#example1').find('#id_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#nombre_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#apellidos_example1_seeker').is(':visible')).toBeFalsy();
                            expect($('#example1').find('#edad_example1_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#inline2').on('tableSeekerAfterSearch', done);
                            $('#inline2').find('#nombre_inline2_seeker').val('E');
                            $('#search_nav_button_inline2').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#inline2 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            let ctx2 = $('#inline2 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx2).length).toBe(1);
                        });
                        it('No se selecciona nada en #example1:', () => {
                            expect($('#example1 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
            });
            describe('Ordenación independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                    setTimeout(done, 100);
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#example1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1').find('th:contains(Id)').click();
                    });

                    it('Debe haber cambiado el orden de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#example1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#example1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#example1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#example1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#inline2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#inline2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#inline2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#inline2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline2').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline2').find('th:contains(Id)').click();
                    });
                    it('Debe haber cambiado el orden de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#inline2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#inline2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#inline2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#inline2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#example1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#example1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#example1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#example1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
            });
            describe('Paginación independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('draw.dt', done);
                        $('#example1_next').click();
                    });
                    it('Cambia el número de página de #example1:', () => {
                        expect($('.pagination input', $('#example1_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#example1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#example1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #inline2:', () => {
                        expect($('.pagination input', $('#inline2_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', done);
                        $('#inline2_next').click();
                    });
                    it('Cambia el número de página de #inline2:', () => {
                        expect($('.pagination input', $('#inline2_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #example1:', () => {
                        expect($('.pagination input', $('#example1_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #example1:', () => {
                        expect($('#example1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
            });
            describe('Formularios independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1').on('tableEditFormAfterFillData', () => {
                            setTimeout(done, 100);
                        });
                        $('#example1 > tbody > tr:eq(0)').dblclick();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example1_detail_div').is(':visible')).toBeTruthy();
                    });
                    describe('Funcionamiento del formulario', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableEditFormSuccessCallSaveAjax', done);
                            $('#example1_detail_div').find('#edad_detail_table').val(11);
                            $('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe actualizar la línea en #example1 sin modificar #inline2:', () => {
                            let ctx = $('#example1 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(1);
                            ctx = $('#inline2 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    let nameEdit = 'Ane';
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            done();
                        });
                        $('#inline2').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val(nameEdit);
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                        });
                        $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Se ha actualizado el valor: ', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(nameEdit);
                    });
                });
            });
            describe('Botonera y feedback independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#example1_containerToolbar');
                        expect($('#example1addButton_1', contx).length).toBe(1);
                        expect($('#example1editButton_1', contx).length).toBe(1);
                        expect($('#example1cloneButton_1', contx).length).toBe(1);
                        expect($('#example1deleteButton_1', contx).length).toBe(1);
                        expect($('#example1informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_example1').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#example1 > tbody > tr:eq(2) > td:eq(1)').click();
                            $('#example1editButton_1').click();
                            $('div[aria-describedby="example1_detail_div"]')
                                .find('#nombre_detail_table').val('Anabelle');
                            $('div[aria-describedby="example1_detail_div"]')
                                .find('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe aparecer el feedback de #example1:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_example1')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #example2:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_inline2').text()).toBe('');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#inline2_containerToolbar');
                        expect($('#inline2addButton_1', contx).length).toBe(1);
                        expect($('#inline2editButton_1', contx).length).toBe(1);
                        expect($('#inline2cloneButton_1', contx).length).toBe(1);
                        expect($('#inline2deleteButton_1', contx).length).toBe(1);
                        expect($('#inline2informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_inline2').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#inline2').on('tableEditInlineClickRow', () => {
                                $('#nombre_inline').val('Ane');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                            });
                            $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });
                        it('Debe aparecer el feedback de #inline2:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_inline2')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #example1:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_example1').text()).toBe('');
                        });
                    });
                });
            });
            describe('Validaciones de formulario independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#example1_detail_feedback').on('rupFeedback_show', () => {
                            done();
                        });
                        $('#example1 > tbody > tr:contains(Irene) > td:eq(0)').click();
                        $('#example1editButton_1').click();
                        $('div[aria-describedby="example1_detail_div"]')
                            .find('#nombre_detail_table').val('');
                        $('#example1_detail_button_save').click();
                        $(buscarAceptar()).click();//boton confirmar cambios
                    });
                    it('Debe mostrar el feedback del formulario de #example1:', () => {
                        expect($('#example1_detail_feedback').is(':visible')).toBeTruthy();
                        expect($('#example1_detail_feedback').text()).toBe('Se han producido los siguientes errores:Nombre:Campo obligatorio.');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val('');
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                            setTimeout(done,100);
                        });
                        $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Debe mostrar el feedback del formulario de #inline2:', () => {
                        expect($('#nombre_inline').hasClass('error')).toBeTruthy();
                        expect($('.error[for="nombre_inline"]').text()).toBe('Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #example1:', () => {
                        expect($('#example1_detail_feedback').is(':visible')).toBeFalsy();
                        expect($('#example1_detail_feedback').text()).toBe('');
                    });
                });
            });
            describe('Gestión de errores > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#id_filter_table', $('#example1_filter_form')).val('6');
                            $('#example1_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=example1 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#example1').on('tableEditFormErrorCallSaveAjax', () => {
                                done();
                            });
                            $('#example1 > tbody > tr:eq(0) > td:eq(1)').dblclick();
                            $('#edad_detail_table', $('#example1_detail_div')).val('asd');
                            $('#example1_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#example1_detail_feedback_ok').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#example1_detail_feedback_ok').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_example1').click();
                            $('#edad_example1_seeker', $('#example1')).val('asd');
                            $('#search_nav_button_example1').click();
                            $('#example1').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_example1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_example1').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#inline2_filter_form').find('[id="id_filter_table"]').val('6');
                            $('#inline2_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=inline2 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#inline2').on('tableEditInlineClickRow', () => {
                                $('#edad_inline').val('asd');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                                setTimeout(done, 400);
                            });
                            $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });

                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline2').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_inline2').click();
                            $('#edad_inline2_seeker', $('#inline2')).val('asd');
                            $('#search_nav_button_inline2').click();
                            $('#inline2').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline2').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
            });
        });

    });
    return defer;
}

function testInline2Form(defer) {
    describe('Test Table Master-Detail Inline2Form >', () => {
        beforeAll((done) => {
            testutils.loadCss(done);
            window.onerror = (event) => {
                testutils.testTrace('Evento de error detectado en el window',
                    'namespace: ' + event.namespace +
                    'target: ' + event.target.id);
            };
        });
        beforeEach((done) => {
            dtGen.createDatatableInlineEdit(() => {
                dtGen.createDatatable2(() => {
                    relacionMaestroDetalleI2F(done);
                });
            }, 'inline1');
        });
        afterEach((done) => {
            clearDatatable(() => {
                $.get('/demo/table/reset', done);
            });
        });
        afterAll(() => {
            defer.resolve();
        });

        describe('Creación > ', () => {
            it('El table filtro debe contener elementos y la de resultados estar vacía:', () => {
                expect($('#inline1 > tbody > tr').length).toBe(10);
                expect($('#example2 > tbody > tr').length).toBe(0);
            });
        });
        describe('Filtrado intertabla > ', () => {
            beforeEach((done) => {
                $('#example2').on('draw.dt', (done));
                $('#inline1 > tbody > tr:eq(3) > td:eq(0)').click();
            });
            it('La fila seleccionada debe aparecer en la tabla de detalle:', () => {
                expect($('#example2 > tbody > tr').length).toBe(1);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe(selected.id);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(selected.nombre);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(3)').text()).toBe(selected.apellidos);
                expect($('#example2 > tbody > tr:eq(0) > td:eq(4)').text()).toBe(selected.edad);
            });
        });
        describe('Funcionamiento independiente > ', () => {
            describe('Filtrado independiente > ', () => {
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', done);
                        $('#inline1_filter_fieldset').find('#id_filter_table').val(4);
                        $('#inline1_filter_fieldset').find('#inline1_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#inline1_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #inline1:', () => {
                        let ctx = $('#inline1 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber cambios en #example2:', () => {
                        let ctx = $('#example2 > tbody > tr');
                        expect(ctx.length).toBe(0);
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', done);
                        $('#example2_filter_fieldset').find('#id_filter_table').val(4);
                        $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#example2_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #example2:', () => {
                        let ctx = $('#example2 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber filtrado en #inline1:', () => {
                        let ctx = $('#inline1 > tbody > tr');
                        expect(ctx.length).toBe(10);
                    });
                });
            });
            describe('Búsqueda independiente > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_inline1').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #inline1:', () => {
                            expect($('#inline1').find('#id_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#nombre_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#apellidos_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#edad_inline1_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #example2', () => {
                            expect($('#example2').find('#id_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#nombre_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#apellidos_example2_seeker').is(':visible')).toBeFalsy();
                            expect($('#example2').find('#edad_example2_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#inline1').on('tableSeekerAfterSearch', done);
                            $('#inline1').find('#nombre_inline1_seeker').val('E');
                            $('#search_nav_button_inline1').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#inline1 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            ctx = $('#inline1 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);
                        });
                        it('No se selecciona nada en #example2:', () => {
                            expect($('#example2 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_example2').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #example2:', () => {
                            expect($('#example2').find('#id_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#nombre_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#apellidos_example2_seeker').is(':visible')).toBeTruthy();
                            expect($('#example2').find('#edad_example2_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #inline1', () => {
                            expect($('#inline1').find('#id_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#nombre_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#apellidos_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#edad_inline1_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableSeekerAfterSearch', done);
                            $('#example2').find('#nombre_example2_seeker').val('E');
                            $('#search_nav_button_example2').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#example2 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            let ctx2 = $('#example2 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx2).length).toBe(1);
                        });
                        it('No se selecciona nada en #inline1:', () => {
                            expect($('#inline1 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
            });
            describe('Ordenación independiente > ', () => {
                beforeEach((done) => {
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                    setTimeout(done, 100);
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline1').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline1').find('th:contains(Id)').click();
                    });

                    it('Debe haber cambiado el orden de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#inline1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#inline1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#inline1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#inline1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#example2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#example2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#example2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#example2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#example2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2').find('th:contains(Id)').click();
                    });
                    it('Debe haber cambiado el orden de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#example2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#example2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#example2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#example2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#example2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#inline1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#inline1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#inline1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#inline1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
            });
            describe('Paginación independiente > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', done);
                        $('#inline1_next').click();
                    });
                    it('Cambia el número de página de #example1:', () => {
                        expect($('.pagination input', $('#inline1_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #example2:', () => {
                        expect($('.pagination input', $('#example2_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('draw.dt', done);
                        $('#example2_next').click();
                    });
                    it('Cambia el número de página de #inline2:', () => {
                        expect($('.pagination input', $('#example2_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #example2:', () => {
                        expect($('#example2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#example2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#example2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#example2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#example2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #inline1:', () => {
                        expect($('.pagination input', $('#inline1_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
            });
            describe('Formularios independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    let nameEdit = 'Ane';
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            done();
                        });
                        $('#inline1').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val(nameEdit);
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                        });
                        $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Se ha actualizado el valor: ', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(nameEdit);
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2').on('tableEditFormAfterFillData', () => {
                            setTimeout(done, 100);
                        });
                        $('#example2 > tbody > tr:eq(0)').dblclick();
                    });
                    it('El formulario debe mostrarse:', () => {
                        expect($('#example2_detail_div').is(':visible')).toBeTruthy();
                    });
                    describe('Funcionamiento del formulario', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableEditFormSuccessCallSaveAjax', done);
                            $('#example2_detail_div').find('#edad_detail_table').val(11);
                            $('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe actualizar la línea en #example2 sin modificar #inline1:', () => {
                            let ctx = $('#example2 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(1);
                            ctx = $('#inline1 > tbody > tr:eq(0)');
                            expect($('td:contains(11)', ctx).length).toBe(0);
                        });
                    });
                });
            });
            describe('Botonera y feedback independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', done);
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#inline1_containerToolbar');
                        expect($('#inline1addButton_1', contx).length).toBe(1);
                        expect($('#inline1editButton_1', contx).length).toBe(1);
                        expect($('#inline1cloneButton_1', contx).length).toBe(1);
                        expect($('#inline1deleteButton_1', contx).length).toBe(1);
                        expect($('#inline1informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_inline1').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#inline1').on('tableEditInlineClickRow', () => {
                                $('#nombre_inline').val('Ane');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                            });
                            $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });
                        it('Debe aparecer el feedback de #inline1:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_inline1')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #example2:', () => {
                            expect($('#rup_feedback_example2').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_example2').text()).toBe('');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#example2_containerToolbar');
                        expect($('#example2addButton_1', contx).length).toBe(1);
                        expect($('#example2editButton_1', contx).length).toBe(1);
                        expect($('#example2cloneButton_1', contx).length).toBe(1);
                        expect($('#example2deleteButton_1', contx).length).toBe(1);
                        expect($('#example2informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_example2').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#example2 > tbody > tr:eq(2) > td:eq(1)').click();
                            $('#example2editButton_1').click();
                            $('div[aria-describedby="example2_detail_div"]')
                                .find('#nombre_detail_table').val('Anabelle');
                            $('div[aria-describedby="example2_detail_div"]')
                                .find('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('Debe aparecer el feedback de #example2:', () => {
                            expect($('#rup_feedback_example2').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_example2')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #inline1:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_inline1').text()).toBe('');
                        });
                    });
                });
            });
            describe('Validaciones de formulario independientes > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val('');
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                            setTimeout(done, 100);
                        });
                        $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Debe mostrar el feedback del formulario de #inline1:', () => {
                        expect($('#nombre_inline').hasClass('error')).toBeTruthy();
                        expect($('.error[for="nombre_inline"]').text()).toBe('Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #example2:', () => {
                        expect($('#example2_detail_feedback').is(':visible')).toBeFalsy();
                        expect($('#example2_detail_feedback').text()).toBe('');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#example2_detail_feedback').on('rupFeedback_show', () => {
                            done();
                        });
                        $('#example2 > tbody > tr:contains(Irene) > td:eq(0)').click();
                        $('#example2editButton_1').click();
                        $('div[aria-describedby="example2_detail_div"]')
                            .find('#nombre_detail_table').val('');
                        $('#example2_detail_button_save').click();
                        $(buscarAceptar()).click();//boton confirmar cambios
                    });
                    it('Debe mostrar el feedback del formulario de #example2:', () => {
                        expect($('#example2_detail_feedback').is(':visible')).toBeTruthy();
                        expect($('#example2_detail_feedback').text()).toBe('Se han producido los siguientes errores:Nombre:Campo obligatorio.');
                    });
                });
            });
            describe('Gestión de errores > ', () => {
                beforeEach((done) => {
                    $('#example2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#example2_filter_fieldset').find('#example2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#inline1_filter_form').find('[id="id_filter_table"]').val('6');
                            $('#inline1_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=inline1 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#inline1').on('tableEditInlineClickRow', () => {
                                $('#edad_inline').val('asd');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                                setTimeout(done, 400);
                            });
                            $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });

                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline1').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_inline1').click();
                            $('#edad_inline1_seeker', $('#inline1')).val('asd');
                            $('#search_nav_button_inline1').click();
                            $('#inline1').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline1').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#id_filter_table', $('#example2_filter_form')).val('6');
                            $('#example2_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=example2 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#example2').on('tableEditFormErrorCallSaveAjax', () => {
                                done();
                            });
                            $('#example2 > tbody > tr:eq(0) > td:eq(1)').dblclick();
                            $('#edad_detail_table', $('#example2_detail_div')).val('asd');
                            $('#example2_detail_button_save').click();
                            $(buscarAceptar()).click();//boton confirmar cambios
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#example2_detail_feedback_ok').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#example2_detail_feedback_ok').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_example2').click();
                            $('#edad_example2_seeker', $('#example2')).val('asd');
                            $('#search_nav_button_example2').click();
                            $('#example2').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_example2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_example2').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
            });
        });

    });
    return defer;
}

function testInline2Inline(defer) {
    describe('Test Table Master-Detail Inline2Inline >', () => {
        beforeAll((done) => {
            testutils.loadCss(done);
            window.onerror = (event) => {
                testutils.testTrace('Evento de error detectado en el window',
                    'namespace: ' + event.namespace +
                    'target: ' + event.target.id);
            };
        });
        beforeEach((done) => {
            dtGen.createDatatableInlineEdit(() => {
                dtGen.createDatatableInlineEdit(() => {
                    relacionMaestroDetalleI2I(done);
                }, 'inline2');
            }, 'inline1');
        });
        afterEach((done) => {
            clearDatatable(() => {
                $.get('/demo/table/reset', done);
            });
        });
        afterAll(() => {
            defer.resolve();
        });

        describe('Creación > ', () => {
            it('El table filtro debe contener elementos y la de resultados estar vacía:', () => {
                expect($('#inline1 > tbody > tr').length).toBe(10);
                expect($('#inline2 > tbody > tr').length).toBe(0);
            });
        });
        describe('Filtrado intertabla > ', () => {
            beforeEach((done) => {
                $('#inline2').on('draw.dt', (done));
                $('#inline1 > tbody > tr:eq(3) > td:eq(0)').click();
            });
            it('La fila seleccionada debe aparecer en la tabla de detalle:', () => {
                expect($('#inline2 > tbody > tr').length).toBe(1);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe(selected.id);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(selected.nombre);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(3)').text()).toBe(selected.apellidos);
                expect($('#inline2 > tbody > tr:eq(0) > td:eq(4)').text()).toBe(selected.edad);
            });
        });
        describe('Funcionamiento independiente > ', () => {
            describe('Filtrado independiente > ', () => {
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', done);
                        $('#inline1_filter_fieldset').find('#id_filter_table').val(4);
                        $('#inline1_filter_fieldset').find('#inline1_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#inline1_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #inline1:', () => {
                        let ctx = $('#inline1 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber cambios en #inline2:', () => {
                        let ctx = $('#inline2 > tbody > tr');
                        expect(ctx.length).toBe(0);
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', done);
                        $('#inline2_filter_fieldset').find('#id_filter_table').val(4);
                        $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                    });
                    afterEach(() => {
                        $('#inline2_filter_cleanButton').click();
                    });
                    it('Se debe de haber filtrado #inline2:', () => {
                        let ctx = $('#inline2 > tbody > tr:eq(0)');
                        expect(ctx.length).toBe(1);
                        expect($('td:eq(1)', ctx).text()).toBe('4');
                        expect($('td:eq(2)', ctx).text()).toBe('Erlantz');
                        expect($('td:eq(3)', ctx).text()).toBe('Carrasson Pando');
                        expect($('td:eq(4)', ctx).text()).toBe('23');
                    });
                    it('No debe haber filtrado en #inline1:', () => {
                        let ctx = $('#inline1 > tbody > tr');
                        expect(ctx.length).toBe(10);
                    });
                });
            });
            describe('Búsqueda independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_inline1').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #inline1:', () => {
                            expect($('#inline1').find('#id_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#nombre_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#apellidos_inline1_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline1').find('#edad_inline1_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #inline2', () => {
                            expect($('#inline2').find('#id_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#nombre_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#apellidos_inline2_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline2').find('#edad_inline2_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#inline1').on('tableSeekerAfterSearch', done);
                            $('#inline1').find('#nombre_inline1_seeker').val('E');
                            $('#search_nav_button_inline1').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#inline1 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            ctx = $('#inline1 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);
                        });
                        it('No se selecciona nada en #inline2:', () => {
                            expect($('#inline2 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach(() => {
                        $('#searchCollapsLabel_inline2').click();
                    });
                    describe('Aparición del seeker > ', () => {
                        it('Se muestra el formulario de búsqueda en #inline2:', () => {
                            expect($('#inline2').find('#id_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#nombre_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#apellidos_inline2_seeker').is(':visible')).toBeTruthy();
                            expect($('#inline2').find('#edad_inline2_seeker').is(':visible')).toBeTruthy();
                        });
                        it('No se debe mostrar el formulario de búsqueda en #inline1', () => {
                            expect($('#inline1').find('#id_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#nombre_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#apellidos_inline1_seeker').is(':visible')).toBeFalsy();
                            expect($('#inline1').find('#edad_inline1_seeker').is(':visible')).toBeFalsy();
                        });
                    });
                    describe('Funcionalidad del seeker > ', () => {
                        beforeEach((done) => {
                            $('#inline2').on('tableSeekerAfterSearch', done);
                            $('#inline2').find('#nombre_inline2_seeker').val('E');
                            $('#search_nav_button_inline2').click();
                        });
                        it('Se selecciona y marca el resultado de la selección: ', () => {
                            let ctx = $('#inline2 > tbody').find('tr:eq(3)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx).length).toBe(1);

                            let ctx2 = $('#inline2 > tbody').find('tr:eq(4)');
                            expect($('td > i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row', ctx2).length).toBe(1);
                        });
                        it('No se selecciona nada en #inline1:', () => {
                            expect($('#inline1 > tbody').find('i.mdi.mdi-magnify.ui-icon-rupInfoCol.filtered-row').length).toBe(0);
                        });
                    });
                });
            });
            describe('Ordenación independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                    setTimeout(done, 100);
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline1').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline1').find('th:contains(Id)').click();
                    });

                    it('Debe haber cambiado el orden de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#inline1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#inline1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#inline1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#inline1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#inline2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#inline2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#inline2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#inline2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline2').find('th:contains(Nombre)').click();
                    });
                    afterEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            setTimeout(done, 100);
                        });
                        $('#inline2').find('th:contains(Id)').click();
                    });
                    it('Debe haber cambiado el orden de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('6');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('5');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('9');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('4');
                        expect($('#inline2 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('3');
                        expect($('#inline2 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('10');
                        expect($('#inline2 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline2 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('7');
                        expect($('#inline2 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('2');
                    });
                    it('No debe haber cambiado el orden de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('4');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('5');
                        expect($('#inline1 > tbody > tr:eq(5) > td:eq(1)').text()).toBe('6');
                        expect($('#inline1 > tbody > tr:eq(6) > td:eq(1)').text()).toBe('7');
                        expect($('#inline1 > tbody > tr:eq(7) > td:eq(1)').text()).toBe('8');
                        expect($('#inline1 > tbody > tr:eq(8) > td:eq(1)').text()).toBe('9');
                        expect($('#inline1 > tbody > tr:eq(9) > td:eq(1)').text()).toBe('10');
                    });
                });
            });
            describe('Paginación independiente > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', done);
                        $('#inline1_next').click();
                    });
                    it('Cambia el número de página de #inline1:', () => {
                        expect($('.pagination input', $('#inline1_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#inline1 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#inline1 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #inline2:', () => {
                        expect($('.pagination input', $('#inline2_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', done);
                        $('#inline2_next').click();
                    });
                    it('Cambia el número de página de #inline2:', () => {
                        expect($('.pagination input', $('#inline2_wrapper')).val()).toBe('2');
                    });
                    it('Debe haber cambiado la página de #inline2:', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('11');
                        expect($('#inline2 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('12');
                        expect($('#inline2 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('13');
                        expect($('#inline2 > tbody > tr:eq(3) > td:eq(1)').text()).toBe('14');
                        expect($('#inline2 > tbody > tr:eq(4) > td:eq(1)').text()).toBe('15');
                    });
                    it('No cambia el número de página de #inline1:', () => {
                        expect($('.pagination input', $('#inline1_wrapper')).val()).toBe('1');
                    });
                    it('No debe haber cambiado la página de #inline1:', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(1)').text()).toBe('1');
                        expect($('#inline1 > tbody > tr:eq(1) > td:eq(1)').text()).toBe('2');
                        expect($('#inline1 > tbody > tr:eq(2) > td:eq(1)').text()).toBe('3');
                    });
                });
            });
            describe('Formularios independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    let nameEdit = 'Ane';
                    beforeEach((done) => {
                        $('#inline1').on('draw.dt', () => {
                            done();
                        });
                        $('#inline1').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val(nameEdit);
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                        });
                        $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Se ha actualizado el valor: ', () => {
                        expect($('#inline1 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(nameEdit);
                    });
                });
                describe('Tabla detalle > ', () => {
                    let nameEdit = 'Ane';
                    beforeEach((done) => {
                        $('#inline2').on('draw.dt', () => {
                            done();
                        });
                        $('#inline2').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val(nameEdit);
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                        });
                        $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Se ha actualizado el valor: ', () => {
                        expect($('#inline2 > tbody > tr:eq(0) > td:eq(2)').text()).toBe(nameEdit);
                    });
                });
            });
            describe('Botonera y feedback independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', done);
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#inline1_containerToolbar');
                        expect($('#inline1addButton_1', contx).length).toBe(1);
                        expect($('#inline1editButton_1', contx).length).toBe(1);
                        expect($('#inline1cloneButton_1', contx).length).toBe(1);
                        expect($('#inline1deleteButton_1', contx).length).toBe(1);
                        expect($('#inline1informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_inline1').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#inline1').on('tableEditInlineClickRow', () => {
                                $('#nombre_inline').val('Ane');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                            });
                            $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });
                        it('Debe aparecer el feedback de #inline1:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_inline1')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #inline2:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_inline2').text()).toBe('');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    it('Debe tener su propia botonera:', () => {
                        let contx = $('#inline2_containerToolbar');
                        expect($('#inline2addButton_1', contx).length).toBe(1);
                        expect($('#inline2editButton_1', contx).length).toBe(1);
                        expect($('#inline2cloneButton_1', contx).length).toBe(1);
                        expect($('#inline2deleteButton_1', contx).length).toBe(1);
                        expect($('#inline2informes_01', contx).length).toBe(1);
                    });
                    describe('Feedback > ', () => {
                        beforeEach((done) => {
                            $('#rup_feedback_inline2').on('rupFeedback_show', () => {
                                done();
                            });
                            $('#inline2').on('tableEditInlineClickRow', () => {
                                $('#nombre_inline').val('Ane');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                            });
                            $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });
                        it('Debe aparecer el feedback de #inline2:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                            expect($('#rup_feedback_inline2')
                                .is(':contains(El elemento se ha modificado correctamente.)')).toBeTruthy();
                        });
                        it('No debe aparecer el feedback de #inline1:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeFalsy();
                            expect($('#rup_feedback_inline1').text()).toBe('');
                        });
                    });
                });
            });
            describe('Validaciones de formulario independientes > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    beforeEach((done) => {
                        $('#inline1').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val('');
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                            setTimeout(done, 100);
                        });
                        $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Debe mostrar el feedback del formulario de #inline1:', () => {
                        expect($('#nombre_inline', $('#inline1')).hasClass('error')).toBeTruthy();
                        expect($('.error[for="nombre_inline"]', $('#inline1')).text()).toBe('Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #inline2:', () => {
                        expect($('#nombre_inline', $('#inline2')).hasClass('error')).toBeFalsy();
                    });
                });
                describe('Tabla detalle > ', () => {
                    beforeEach((done) => {
                        $('#inline2').on('tableEditInlineClickRow', () => {
                            $('#nombre_inline').val('');
                            var ev = $.Event('keydown');
                            ev.keyCode = 13;
                            $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                            setTimeout(done, 100);
                        });
                        $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                    });
                    it('Debe mostrar el feedback del formulario de #inline2:', () => {
                        expect($('#nombre_inline', $('#inline2')).hasClass('error')).toBeTruthy();
                        expect($('.error[for="nombre_inline"]', $('#inline2')).text()).toBe('Campo obligatorio.');
                    });
                    it('No debe mostrar el feedback del formulario de #inline1:', () => {
                        expect($('#nombre_inline', $('#inline1')).hasClass('error')).toBeFalsy();
                    });
                });
            });
            describe('Gestión de errores > ', () => {
                beforeEach((done) => {
                    $('#inline2').on('draw.dt', () => {
                        setTimeout(done, 100);
                    });
                    $('#inline2_filter_fieldset').find('#inline2_filter_filterButton').click();
                });
                describe('Tabla maestro > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#inline1_filter_form').find('[id="id_filter_table"]').val('6');
                            $('#inline1_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=inline1 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#inline1').on('tableEditInlineClickRow', () => {
                                $('#edad_inline').val('asd');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline1 > tbody > tr:eq(0)').trigger(ev);
                                setTimeout(done, 400);
                            });
                            $('#inline1 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });

                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline1').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_inline1').click();
                            $('#edad_inline1_seeker', $('#inline1')).val('asd');
                            $('#search_nav_button_inline1').click();
                            $('#inline1').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline1').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline1').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
                describe('Tabla detalle > ', () => {
                    describe('Errores al filtrar > ', () => {
                        beforeEach((done) => {
                            $('#inline2_filter_form').find('[id="id_filter_table"]').val('6');
                            $('#inline2_filter_filterButton').click();
                            setTimeout(done, 350);
                        });

                        it('El feedback debe comportarse de la manera esperada:', () => {
                            expect($('.rup-message-alert').height()).toBeGreaterThan(0);
                            expect($('.rup-message-alert').find('#rup_msgDIV_msg').text())
                                .toBe('DataTables warning: table id=inline2 - Ajax error. For more information about this error, please see http://datatables.net/tn/7');
                        });
                    });
                    describe('Errores en guardado > ', () => {
                        beforeEach((done) => {
                            $('#inline2').on('tableEditInlineClickRow', () => {
                                $('#edad_inline').val('asd');
                                var ev = $.Event('keydown');
                                ev.keyCode = 13;
                                $('#inline2 > tbody > tr:eq(0)').trigger(ev);
                                setTimeout(done, 400);
                            });
                            $('#inline2 > tbody > tr:eq(0) > td:eq(0)').dblclick();
                        });

                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline2').text()).toBe('KABOOM!');
                        });
                    });
                    describe('Errores en búsqueda > ', () => {
                        beforeEach((done) => {
                            $('#searchCollapsLabel_inline2').click();
                            $('#edad_inline2_seeker', $('#inline2')).val('asd');
                            $('#search_nav_button_inline2').click();
                            $('#inline2').on('tableSeekerSearchError', done);
                        });
                        it('El feedback debe mostrarse:', () => {
                            expect($('#rup_feedback_inline2').is(':visible')).toBeTruthy();
                        });
                        it('Debe contener el mensaje esperado:', () => {
                            expect($('#rup_feedback_inline2').text()).toBe('Not Acceptable: KABOOM');
                        });
                    });
                });
            });
        });

    });
    return defer;
}

var runF2F = $.Deferred();
var runF2I = $.Deferred();
var runI2F = $.Deferred();
var runI2I = $.Deferred();

testForm2Form(runF2F)
    .then(testInline2Inline(runI2I)
        .then(testForm2Inline(runF2I)
            .then(testInline2Form(runI2F))));