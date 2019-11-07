/* eslint-env jquery,jasmine */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.combo';
import 'rup.form';
import 'rup.list';
import 'bootstrap';
import * as testutils from '../common/specCommonUtils.js';
import * as listGen from './listCreator';


function clearList () {
    $('#content').html('');
    $('.rup_list-multiorder-dialog').remove();
    $('.ui-dialog').remove();
    $('#rup_list').rup_list('destroy');
}


describe('Test rup_list', () => {

    beforeAll((done) => {
        if ($('#content').length == 0) {
            $('body').append('<div id="content" class="container mt-4"></div>');
        }
        testutils.loadCss(done);
    });
    
    afterEach(() => {
        clearList();
    });


    describe('> Creación',() => {
        beforeEach((done) => {
            listGen.createList('rup-list', done);
        });
        it('Debe tener header y footer : ', () => {
            expect($('#rup-list-header').length).toBe(1);
            expect($('#rup-list-footer').length).toBe(1);
        });
        it('El cuerpo de la lista debe estar vacío : ', () => {
            expect($('#rup-list').children().length).toBe(0);
        });
    });


    describe('> Funcionamiento', () => {

        describe('> Filtrado', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load', () => {
                        done();
                    });
                    $('#listFilterEdad').val(25);
                    $('#listFilterAceptar').click();
                });
            });
            it('Filtra correctamente : ', () => {
                expect($('#rup-list').children().length).toBe(3);
                expect($('#usuario_value_25').text()).toBe('user25');
                expect($('#usuario_value_15').text()).toBe('user15');
                expect($('#usuario_value_5').text()).toBe('user5');
            });
        });


        describe('> Ordenación', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load',done);
                    $('#rup-list-header-sidx').rup_combo('setRupValue','EDAD');
                });
            });
            it('Aparecen ordenados por el campo especificado :', () => {
                expect($('#rup-list > div:eq(0)').is('#rup-list-itemTemplate_12')).toBeTruthy();
                expect($('#rup-list > div:eq(1)').is('#rup-list-itemTemplate_2')).toBeTruthy();
                expect($('#rup-list > div:eq(2)').is('#rup-list-itemTemplate_8')).toBeTruthy();
                expect($('#rup-list > div:eq(3)').is('#rup-list-itemTemplate_1')).toBeTruthy();
                expect($('#rup-list > div:eq(4)').is('#rup-list-itemTemplate_21')).toBeTruthy();
            });
            describe('>  Se invierte la ordenación mediante el botón definido para ello', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('#rup-list-header-sord').click();
                });
                it('La ordenacion se invierte: ', () => {
                    expect($('#rup-list > div:eq(0)').is('#rup-list-itemTemplate_10')).toBeTruthy();
                    expect($('#rup-list > div:eq(1)').is('#rup-list-itemTemplate_4')).toBeTruthy();
                    expect($('#rup-list > div:eq(2)').is('#rup-list-itemTemplate_9')).toBeTruthy();
                    expect($('#rup-list > div:eq(3)').is('#rup-list-itemTemplate_3')).toBeTruthy();
                    expect($('#rup-list > div:eq(4)').is('#rup-list-itemTemplate_23')).toBeTruthy();
                });
            });
        });


        describe('> Paginación', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
            });
            describe('> Página siguiente',() => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('#rup-list-header-page-next').click();
                });
                it('Ha cambiado la página activa en la navegación:', () => {
                    expect($('.page.active').attr('data-page')).toBe('2');
                });
                it('Se activa la opción de página anterior', () => {
                    expect($('#rup-list-header-page-prev').is('.disabled')).toBeFalsy();
                });
                it('Están los registros esperados:', () => {
                    expect($('#rup-list-itemTemplate_14').length).toBe(1);
                    expect($('#rup-list-itemTemplate_15').length).toBe(1);
                    expect($('#rup-list-itemTemplate_16').length).toBe(1);
                    expect($('#rup-list-itemTemplate_17').length).toBe(1);
                    expect($('#rup-list-itemTemplate_18').length).toBe(1);
                });
                describe('> Funcionalidad en la última página', () => {
                    beforeEach(() => {});
                    it('El control para ir a la página siguiente está deshabilitado:', () => {
                        expect($('#rup-list-header-page-next').is('.disabled')).toBeFalsy();
                    });
                });
            });
            describe('> Página anterior', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', () => {
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', done);
                        $('#rup-list-header-page-prev').click();
                    });
                    $('#rup-list-header-page-next').click();
                });
                it('Cambia la página activa en el nav: ', () => {
                    expect($('.page.active').attr('data-page')).toBe('1');
                });
                it('Están los registros esperados:', () => {
                    expect($('#rup-list-itemTemplate_1').length).toBe(1);
                    expect($('#rup-list-itemTemplate_10').length).toBe(1);
                    expect($('#rup-list-itemTemplate_11').length).toBe(1);
                    expect($('#rup-list-itemTemplate_12').length).toBe(1);
                    expect($('#rup-list-itemTemplate_13').length).toBe(1);
                });
                describe('> Funcionamiento primera página', () => {
                    it('Se desactiva la opción de página anterior', () => {
                        expect($('#rup-list-header-page-prev').is('.disabled')).toBeTruthy();
                    });
                });
            });
            describe('> Acceso directo a página desde el nav', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('.page[data-page="2"]',$('#rup-list-header')).click();
                });
                describe('> Se marca la página correcta en el nav', () => {
                    it('Ha cambiado la página activa en la navegación:', () => {
                        expect($('.page.active').attr('data-page')).toBe('2');
                    });
                });
                it('Se activa la opción de página anterior',() => {
                    expect($('#rup-list-header-page-prev').is('.disabled')).toBeFalsy();
                });
            });
        });


        describe('> Elementos por página', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load', ()=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', done);
                        $('#rup-list-header-rowNum').rup_combo('setRupValue', '10');
                    });
                    $('#rup-list').rup_list('filter');
                });
            });
            it('Varía el número de elementos por página:', () => {
                expect($('#rup-list').children().length).toBe(10);
            });
            it('Varía el número de páginas: ', () => {
                expect($('.page:last', $('#rup-list-header')).attr('data-page')).toBe('4');
            });
            describe('> Navegamos a la última página', () => {
                beforeEach((done) => {
                    setTimeout(() => {
                        $('#rup-list').on('load', () => {
                            done();
                        });
                        $('.page[data-page="4"]',$('#rup-list-header')).click();
                    }, 250);
                });
                it('Hay el número de elementos esperados:', () => {
                    expect($('#rup-list').children().length).toBe(2);
                });
            });
        });


        describe('> Aparición de los separadores ("...") en la paginación',() => {
            beforeEach((done)=>{
                listGen.createList('rup-list', done);
            });

            describe('> Separador del inicio', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', () => {
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', done);
                        $('.page[data-page="7"]', $('#rup-list-header')).click();
                    });
                    $('#rup-list').rup_list('filter');
                });
                it('No aparece el separador del final: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(-4).text()).toBe('6');
                });
                it('Aparece el separador del inicio: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(2).text()).toBe('...');
                });
            });
            describe('> Separador del final', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
                it('Aparece el separador del final: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(-3).text()).toBe('...');
                });
                it('No aparece el separador del inicio: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(3).text()).toBe('2');
                });
            });
            describe('> Ambos separadores', () => {
                beforeEach((done) => {
                    $('#rup-list').on('load', () => {
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', () => {
                            $('#rup-list').off('load');
                            $('#rup-list').on('load', done);
                            $('.page[data-page="4"]', $('#rup-list-header')).click();
                        });
                        $('.page[data-page="3"]', $('#rup-list-header')).click();
                    });
                    $('#rup-list').rup_list('filter');
                });
                it('Aparece el separador del final: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(-3).text()).toBe('...');
                });
                it('Aparece el separador del inicio: ', () => {
                    expect($('.pagination',$('#rup-list-header-nav')).children().eq(2).text()).toBe('...');
                });
            });
        });


        describe('> Control de errores', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load', () => {
                        done();
                    });
                    $('#listFilterUsuario').val('user20');
                    $('#listFilterAceptar').click();
                });
            });
            it('Aparece el feedback con el error:', () => {
                expect($('#rup-list-feedback').hasClass('rup-feedback_image_error')).toBeTruthy();
                expect($('#rup-list-feedback').text()).toBe('Error de prueba');
            });
            it('No se muestra el componente de listado:', () => {
                expect($('#rup-list-header').css('display')).toBe('none');
                expect($('#rup-list').css('display')).toBe('none');
                expect($('#rup-list-footer').css('display')).toBe('none');
            });
        });


        describe('> Selección y multiselección', () => {
            beforeEach((done) => {
                listGen.createList('rup-list', ()=>{
                    $('#rup-list').on('load', done);
                    $('#rup-list').rup_list('filter');
                });
            });
            describe('> Creación y funcionamiento del groupButton', () => {
                it('Se crea el botón:', () => {
                    expect($('button#rup-list-display-selectables', $('#rup-list-header')).length).toBe(1);
                    expect($('button#rup-list-display-selectables', $('#rup-list-header')).text()).toBe('Opciones de seleccion:');
                    expect($('button#rup-list-display-selectables', $('#rup-list-footer')).length).toBe(1);
                    expect($('button#rup-list-display-selectables', $('#rup-list-footer')).text()).toBe('Opciones de seleccion:');
                });
                describe('> Funcionamiento del botón', () => {
                    beforeEach(() => {
                        $('#rup-list-display-selectables', $('#rup-list-header')).click();
                    });
                    it('Deben mostrarse las opciones de selección:', () => {
                        expect($('.dropdown-menu[aria-labelledby="rup-list-display-selectables"]', $('#rup-list-header')).is(':visible')).toBeTruthy();
                    });
                });
            });
            describe('> Funcionalidad de las opciones', () => {
                beforeEach(() => {
                    $('#rup-list-display-selectables', $('#rup-list-header')).click();
                });
                describe('> Opción Seleccionar página', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('listAfterMultiselection', done);
                        $('.selectable-selectPage', $('#rup-list-header')).click();
                    });
                    it('Los elementos de la pagina se han seleccionado:', () => {
                        $('#rup-list').children().toArray().forEach((elem) => {
                            expect($(elem).hasClass('list-item-selected')).toBeTruthy();
                        });
                    });
                    describe('> Si vamos a la página siguiente', () => {
                        beforeEach((done) => {
                            $('#rup-list').on('load', done);
                            $('#rup-list-header-page-next', $('#rup-list-header')).click();
                        });
                        it('Los elementos no están seleccionados', () => {
                            $('#rup-list').children().toArray().forEach((elem) => {
                                expect($(elem).hasClass('list-item-selected')).toBeFalsy();
                            });
                        });
                        describe('> Si volvemos a la pagina anterior', () => {
                            beforeEach((done) => {
                                $('#rup-list').on('load', done);
                                $('#rup-list-header-page-prev', $('#rup-list-header')).click();
                            });
                            it('Los elementos de la pagina siguen estando seleccionados', () => {
                                $('#rup-list').children().toArray().forEach((elem) => {
                                    expect($(elem).hasClass('list-item-selected')).toBeTruthy();
                                });
                            });
                        });
                    });
                });
                describe('> Opción Deseleccionar página', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('listAfterMultiselection', () => {
                            $('#rup-list').off('listAfterMultiselection');
                            $('#rup-list').on('listAfterMultiselection', done);
                            $('.selectable-deselectPage', $('#rup-list-header')).click();
                        });
                        $('.selectable-selectPage', $('#rup-list-header')).click();
                    });
                    it('Los elementos no están seleccionados', () => {
                        $('#rup-list').children().toArray().forEach((elem) => {
                            expect($(elem).hasClass('list-item-selected')).toBeFalsy();
                        });
                    });
                });
                describe('> Opción Seleccionar todo', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('listAfterMultiselection', done);
                        $('.selectable-selectAll', $('#rup-list-header')).click();
                    });
                    it('Los elementos de la pagina se han seleccionado:', () => {
                        $('#rup-list').children().toArray().forEach((elem) => {
                            expect($(elem).hasClass('list-item-selected')).toBeTruthy();
                        });
                    });
                    describe('> Si deseleccionamos la página', () => {
                        beforeEach((done) => {
                            $('#rup-list').on('listAfterMultiselection', done);
                            $('.selectable-deselectPage', $('#rup-list-header')).click();
                        });
                        it('Los elementos estan deseleccionados', () => {
                            $('#rup-list').children().toArray().forEach((e) => {
                                expect($(e).hasClass('list-item-selected')).toBeFalsy();
                            });
                        });
                        describe('> Y filtramos', () => {
                            beforeEach((done) => {
                                $('#rup-list').on('load', done);
                                $('#rup-list').rup_list('filter');
                            });
                            it('Los elementos deben estar deseleccionados:', () => {
                                $('#rup-list').children().toArray().forEach((e) => {
                                    expect($(e).hasClass('list-item-selected')).toBeFalsy();
                                });
                            });
                        });
                    });
                    describe('> Si vamos a la página siguiente', () => {
                        beforeEach((done) => {
                            $('#rup-list').on('load', done);
                            $('#rup-list-header-page-next', $('#rup-list-header')).click();
                        });
                        it('Los elementos no están seleccionados', () => {
                            $('#rup-list').children().toArray().forEach((elem) => {
                                expect($(elem).hasClass('list-item-selected')).toBeTruthy();
                            });
                        });
                    });
                });
                describe('> Opción Deseleccionar todo', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('listAfterMultiselection', () => {
                            $('#rup-list').off('listAfterMultiselection');
                            $('#rup-list').on('listAfterMultiselection', done);
                            $('.selectable-deselectAll', $('#rup-list-header')).click();
                        });
                        $('.selectable-selectAll', $('#rup-list-header')).click();
                    });
                    it('Los elementos de la pagina se han seleccionado:', () => {
                        $('#rup-list').children().toArray().forEach((elem) => {
                            expect($(elem).hasClass('list-item-selected')).toBeFalsy();
                        });
                    });
                    describe('> Si vamos a la página siguiente', () => {
                        beforeEach((done) => {
                            $('#rup-list').on('load', done);
                            $('#rup-list-header-page-next', $('#rup-list-header')).click();
                        });
                        it('Los elementos no están seleccionados', () => {
                            $('#rup-list').children().toArray().forEach((elem) => {
                                expect($(elem).hasClass('list-item-selected')).toBeFalsy();
                            });
                        });
                    });
                });
            });
        });


        describe('> Multiordenación', () => {
            beforeEach((done) => {
                listGen.createListMultiorder('rup-list', done);
            });

            describe('> Creación del summary y el botón de edición de la ordenación', () => {
                it('Debe crear el summary con los dos valores por defecto:', () => {
                    let sum = $('.rup_list-multiorder-summary').toArray();
                    sum.forEach((elem) => {
                        let children = $('.badge', $(elem)).toArray();
                        expect(children.length).toBe(2);
                        expect($(children[0]).text().trim()).toBe('Edad');
                        expect($('span.mdi-chevron-up', $(children[0])).length).toBe(1);
                        expect($(children[1]).text().trim()).toBe('Usuario');
                        expect($('span.mdi-chevron-down', $(children[1])).length).toBe(1);
                    });

                });
                it('Debe crear el botón:', () => {
                    let ctx = $('.rup_list-mord-dialogbtn:first').toArray();

                    ctx.forEach((elem) => {
                        expect($(elem).hasClass('mdi-pencil')).toBeTruthy();
                    });
                });
            });
            describe('> Funcionamiento del dialogo de edición de la ordenación', () => {
                beforeEach((done) => {
                    $('#rup-list').on('rup_list-mord-dialogOpen', () => {
                        setTimeout(done, 500);
                    });
                    $('#rup-list').on('load', ()=>{
                        $('.rup_list-mord-dialogbtn:first').click();
                    });
                    $('#rup-list').rup_list('filter');
                });

                it('Se muestra el dialogo:', () => {
                    expect($('.rup_list-mord-dialog').is(':visible')).toBeTruthy();
                });
                it('Los campos de la ordenación por defecto están convertidos a líneas:', () => {
                    let ctx = $('.rup_list-ord-line').toArray();
                    expect($(ctx[0]).data('ordvalue')).toBe('EDAD');
                    expect($('.rup_list-mord', $(ctx[0])).data('direction')).toBe('asc');
                    expect($(ctx[1]).data('ordvalue')).toBe('USUARIO');
                    expect($('.rup_list-mord', $(ctx[1])).data('direction')).toBe('desc');
                });

                describe('> Los botones se convierten en líneas', () => {
                    beforeEach(() => {
                        $('button[data-ordvalue="CODCLIENTE"]').click();
                    });
                    it('Desaparece el botón:', () => {
                        expect($('button[data-ordvalue="CODCLIENTE"]').length).toBe(0);
                    });
                    it('Aparece la línea: ', () => {
                        expect($('.rup_list-ord-line[data-ordvalue="CODCLIENTE"]').length).toBe(1);
                    });
                    it('Los cambios se reflejan en el summary:', () => {
                        let ctx = $('.rup_list-multiorder-summary').toArray();
                        ctx.forEach((menu) => {
                            expect($('.badge:contains(Codigo cliente)', $(menu)).length).toBe(1);
                        });
                    });
                });
                describe('> Las lineas se convierten en botones', () => {
                    beforeEach(() => {
                        $('.mdi-cancel', $('[ord-value="USUARIO"]')).click();
                    });
                    it('Desaparece la línea: ', () => {
                        expect($('.rup_list-ord-line[ord-value="USUARIO"]').length).toBe(0);
                    });
                    it('Aparece el botón: ', () => {
                        expect($('button[ord-value="USUARIO"]').length).toBe(1);
                    });
                    it('Los cambios se reflejan en el summary:', () => {
                        let ctx = $('.rup_list-multiorder-summary').toArray();
                        ctx.forEach((menu) => {
                            expect($('.badge:contains(Usuario)', $(menu)).length).toBe(0);
                        });
                    });
                });
            });
            describe('> Funcionamiento del multiSort', () => {
                describe('> Ordenación con el valor por defecto', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('load', done);
                        $('#listFilterAceptar').click();
                    });
                    it('Deben aparecer los resultados esperados:', () => {
                        let cards = $('#rup-list').children().toArray();
                        expect(cards[0].id).toBe('rup-list-itemTemplate_12');
                        expect(cards[1].id).toBe('rup-list-itemTemplate_2');
                        expect(cards[2].id).toBe('rup-list-itemTemplate_8');
                        expect(cards[3].id).toBe('rup-list-itemTemplate_1');
                        expect(cards[4].id).toBe('rup-list-itemTemplate_11');
                    });
                });
                describe('> Ordenación con todos los valores de ordenación', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('load', done);
                        $('.rup_list-mord-dialogbtn:first').click();
                        $('button[ord-value="CODCLIENTE"]').click();
                        $('.ui-dialog-buttonset > button').click();
                    });
                    it('Deben aparecer los resultados esperados:', () => {
                        let cards = $('#rup-list').children().toArray();
                        expect(cards[0].id).toBe('rup-list-itemTemplate_12');
                        expect(cards[1].id).toBe('rup-list-itemTemplate_2');
                        expect(cards[2].id).toBe('rup-list-itemTemplate_8');
                        expect(cards[3].id).toBe('rup-list-itemTemplate_1');
                        expect(cards[4].id).toBe('rup-list-itemTemplate_11');
                    });
                });
                describe('> Ordenación con un valor ascendente y otro descendente', () => {
                    beforeEach((done) => {
                        $('#rup-list').on('load', done);
                        $('.rup_list-mord-dialogbtn:first').click();
                        $('.rup_list-multi-sord', $('[ord-value="EDAD"]')).click();
                        $('.ui-dialog-buttonset > button').click();
                    });
                    it('Deben aparecer los resultados esperados:', () => {
                        let cards = $('#rup-list').children().toArray();
                        expect(cards[0].id).toBe('rup-list-itemTemplate_10');
                        expect(cards[1].id).toBe('rup-list-itemTemplate_4');
                        expect(cards[2].id).toBe('rup-list-itemTemplate_9');
                        expect(cards[3].id).toBe('rup-list-itemTemplate_3');
                        expect(cards[4].id).toBe('rup-list-itemTemplate_23');
                    });
                });
            });
        });
    });
});
