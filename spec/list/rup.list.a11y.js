/* eslint-env jquery,jasmine */
import 'jquery';
import 'jasmine-jquery';
import 'rup.feedback';
import 'rup.combo';
import 'rup.form';
import 'rup.list';
import 'rup.dialog';
import 'rup.button';
import 'rup.autocomplete';
import 'bootstrap';
import * as listGen from './listCreator';

export function describes() {

    describe('> Accesibilidad', () => {
        let createList = (callback) => {
            beforeEach((done) => {
                listGen.createListNoSelectable('rup-list', 'listFilterForm', () => {
                    if(callback){
                        callback(done);
                    } else {
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        
                        $('#rup-list').rup_list('filter');
                    }
                });
            });
        };
        let createListNum = (num, callback) => {
            beforeEach((done) => {
                listGen.createListNoSelectableNum('rup-list', 'listFilterForm', num, () => {
                    if(callback){
                        callback(done);
                    } else {
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('#rup-list').rup_list('filter');
                    }
                });
            });
        };
        let createListSelectable = (callback) => {
            beforeEach((done) => {
                listGen.createListSelectableSimple('rup-list', 'listFilterForm', () => {
                    if(callback){
                        callback(done);
                    } else {
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('#rup-list').rup_list('filter');
                    }
                });
            });
        };
        let createListMultiselectable = (callback) => {
            beforeEach((done) => {
                listGen.createList('rup-list', 'listFilterForm', () => {
                    if(callback){
                        callback(done);
                    } else {
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('#rup-list').rup_list('filter');
                    }
                });
            });
        };
        let createListMultiorder = (callback) => {
            beforeEach((done) => {
                listGen.createListMultiorder('rup-list', 'listFilterForm', () => {
                    if(callback){
                        callback(done);
                    } else {
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('#rup-list').rup_list('filter');
                    }
                });
            });
        };

        describe('> Inicializar y filtrar el listado', () => {
            describe('> Lista sin selección', () => {
                createList();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('false');
                });
            });
            describe('> Lista con selección simple', () => {
                createListSelectable();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('false');
                });
            });
            describe('> Lista con selección múltiple', () => {
                createListMultiselectable();
                it('Los contextos son correctos', () => {
                    expect($('#rup-list').attr('role')).toBe('listbox');
                    expect($('#rup-list').attr('aria-live')).toBe('polite');
                    expect($('#rup-list').attr('aria-multiselectable')).toBe('true');
                });
            });
        });

        let testHeaderFooter = (isFooter) => {
            let v = isFooter?'footer':'header';

            describe('> Ordenación', () => {
                createList();
                it('Botón de tipo de selección tiene el contexto correcto', () => {
                    expect($(`#rup-list-${v}-sord`).attr('aria-controls')).toBe('rup-list');
                    expect($(`#rup-list-${v}-sord`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.sort.asc);
                });
                describe('> Se cambia a descendente', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                       	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $(`#rup-list-${v}-sord`).click();
                    });
                    it('Botón de tipo de selección tiene el contexto correcto', () => {
                        expect($(`#rup-list-${v}-sord`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.sort.desc);
                    });
                });
            });

            describe('> Navegación', () => {
                describe('> Inicializacióon', ()=>{
                    createList();
                    it('Los contextos son correctos', () => {
                        expect($(`#rup-list-${v}-nav`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-nav`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginacion);
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaAnterior);
                        expect($(`#rup-list-${v}-page-prev`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-disabled')).toBe('true');
                        expect($(`#rup-list-${v}-page-prev`).attr('tabindex')).toBe('-1');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaSiguiente);
                        expect($(`#rup-list-${v}-page-next`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-next`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-nav .page-separator[aria-hidden="true"]`).length)
                            .toBe($(`#rup-list-${v}-nav .page-separator`).not(':visible').length, 'Separadores ocultos sin aria-hidden');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-controls="rup-list"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin aria-controls');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[tabindex="0"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin tabindex');
                        $(`#rup-list-${v}-nav .rup_list-page-item`).each((i,e)=>{
                            expect($(e).attr('aria-label'))
                                .toBe($.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', $(e).data('page'), $(`#rup-list-${v}-nav .rup_list-page-item:last`).text()),
                                    'Botones de página con aria-label incorrecto');
                        });
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-current="true"]`).length).toBe(1, 'Más de una página está marcada como la actual');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item.active`).attr('aria-current')).toBe('true', 'La página activa no está marcada como actual');
                    });
                });
                describe('> Navegación a página intermedia sin separadores', () => {
                    createListNum(7, (done)=>{
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                           	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('#rup-list').rup_list('page', 2);
                        });
                        $('#rup-list').rup_list('filter');
                    });
                    it('Los contextos son correctos', () => {
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaAnterior);
                        expect($(`#rup-list-${v}-page-prev`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-prev`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaSiguiente);
                        expect($(`#rup-list-${v}-page-next`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-next`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-nav .page-separator[aria-hidden="true"]`).length)
                            .toBe($(`#rup-list-${v}-nav .page-separator`).not(':visible').length, 'Separadores ocultos sin aria-hidden');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-controls="rup-list"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin aria-controls');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[tabindex="0"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin tabindex');
                        $(`#rup-list-${v}-nav .rup_list-page-item`).each((i,e)=>{
                            expect($(e).attr('aria-label'))
                                .toBe($.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', $(e).data('page'), $(`#rup-list-${v}-nav .rup_list-page-item:last`).text()),
                                    'Botones de página con aria-label incorrecto');
                        });
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-current="true"]`).length).toBe(1, 'Más de una página está marcada como la actual');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item.active`).attr('aria-current')).toBe('true', 'La página activa no está marcada como actual');
                    });
                });
                describe('> Navegación a página intermedia con separadores', () => {
                    createListNum(3, (done)=>{
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                           	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('#rup-list').rup_list('page', 4);
                        });
                        $('#rup-list').rup_list('filter');
                    });
                    it('Los contextos son correctos', () => {
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaAnterior);
                        expect($(`#rup-list-${v}-page-prev`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-prev`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaSiguiente);
                        expect($(`#rup-list-${v}-page-next`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-next`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-nav .page-separator[aria-hidden="true"]`).length)
                            .toBe($(`#rup-list-${v}-nav .page-separator`).not(':visible').length, 'Separadores ocultos sin aria-hidden');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-controls="rup-list"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin aria-controls');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[tabindex="0"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin tabindex');
                        $(`#rup-list-${v}-nav .rup_list-page-item`).each((i,e)=>{
                            expect($(e).attr('aria-label'))
                                .toBe($.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', $(e).data('page'), $(`#rup-list-${v}-nav .rup_list-page-item:last`).text()),
                                    'Botones de página con aria-label incorrecto');
                        });
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-current="true"]`).length).toBe(1, 'Más de una página está marcada como la actual');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item.active`).attr('aria-current')).toBe('true', 'La página activa no está marcada como actual');
                    });
                });
                describe('> Navegación a última página', () => {
                    createList((done)=>{
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                          	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('#rup-list').rup_list('page', 7);
                        });
                        $('#rup-list').rup_list('filter');
                    });
                    it('Los contextos son correctos', () => {
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaAnterior);
                        expect($(`#rup-list-${v}-page-prev`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-prev`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaSiguiente);
                        expect($(`#rup-list-${v}-page-next`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-disabled')).toBe('true');
                        expect($(`#rup-list-${v}-page-next`).attr('tabindex')).toBe('-1');
                        expect($(`#rup-list-${v}-nav .page-separator[aria-hidden="true"]`).length)
                            .toBe($(`#rup-list-${v}-nav .page-separator`).not(':visible').length, 'Separadores ocultos sin aria-hidden');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-controls="rup-list"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin aria-controls');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[tabindex="0"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin tabindex');
                        $(`#rup-list-${v}-nav .rup_list-page-item`).each((i,e)=>{
                            expect($(e).attr('aria-label'))
                                .toBe($.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', $(e).data('page'), $(`#rup-list-${v}-nav .rup_list-page-item:last`).text()),
                                    'Botones de página con aria-label incorrecto');
                        });
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-current="true"]`).length).toBe(1, 'Más de una página está marcada como la actual');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item.active`).attr('aria-current')).toBe('true', 'La página activa no está marcada como actual');
                    });
                });
                describe('> Navegación a primera página', () => {
                    createList((done)=>{
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                            $('#rup-list').on('load', ()=>{
                                $('#rup-list').off('load');
                              	$('#rup-list').on('load', () => {
                            		done();
                            	});
                                $('#rup-list').rup_list('page', 1);
                            });
                            $('#rup-list').rup_list('page', 7);
                        });
                        $('#rup-list').rup_list('filter');
                    });
                    it('Los contextos son correctos', () => {
                        expect($(`#rup-list-${v}-nav`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-nav`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginacion);
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaAnterior);
                        expect($(`#rup-list-${v}-page-prev`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-prev`).attr('aria-disabled')).toBe('true');
                        expect($(`#rup-list-${v}-page-prev`).attr('tabindex')).toBe('-1');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-label')).toBe($.rup.i18n.base.rup_list.paginaSiguiente);
                        expect($(`#rup-list-${v}-page-next`).attr('role')).toBe('button');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-controls')).toBe('rup-list');
                        expect($(`#rup-list-${v}-page-next`).attr('aria-disabled')).toBe('false');
                        expect($(`#rup-list-${v}-page-next`).attr('tabindex')).toBe('0');
                        expect($(`#rup-list-${v}-nav .page-separator[aria-hidden="true"]`).length)
                            .toBe($(`#rup-list-${v}-nav .page-separator`).not(':visible').length, 'Separadores ocultos sin aria-hidden');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-controls="rup-list"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin aria-controls');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[tabindex="0"]`).length)
                            .toBe($(`#rup-list-${v}-nav .rup_list-page-item`).length, 'Botones de página sin tabindex');
                        $(`#rup-list-${v}-nav .rup_list-page-item`).each((i,e)=>{
                            expect($(e).attr('aria-label'))
                                .toBe($.rup.i18nTemplate($.rup.i18n.base.rup_list, 'paginaLabel', $(e).data('page'), $(`#rup-list-${v}-nav .rup_list-page-item:last`).text()),
                                    'Botones de página con aria-label incorrecto');
                        });
                        expect($(`#rup-list-${v}-nav .rup_list-page-item[aria-current="true"]`).length).toBe(1, 'Más de una página está marcada como la actual');
                        expect($(`#rup-list-${v}-nav .rup_list-page-item.active`).attr('aria-current')).toBe('true', 'La página activa no está marcada como actual');
                    });
                });
            });
        };

        describe('> Header', () => {
            testHeaderFooter(false);
        });

        describe('> Footer', () => {
            testHeaderFooter(true);
        });

        describe('> Diálogo de multiordenación', () => {
            createListMultiorder();
            it('Los contextos son correctos', () => {
                expect($('#rup-list-header-mord-edit').attr('aria-haspopup')).toBe('true');
                expect($('#rup-list-header-mord-edit').attr('aria-expanded')).toBe('false');
                expect($('#rup-list-header-mord-edit').attr('aria-label')).toBe($.rup.i18n.base.rup_list.openMordDialog);
                expect($('#rup-list-footer-mord-edit').attr('aria-haspopup')).toBe('true');
                expect($('#rup-list-footer-mord-edit').attr('aria-expanded')).toBe('false');
                expect($('#rup-list-footer-mord-edit').attr('aria-label')).toBe($.rup.i18n.base.rup_list.openMordDialog);

                $('#rup-list-header-mord-edit').click();

                expect($('#rup-list-header-mord-edit').attr('aria-expanded')).toBe('true');
                expect($('#rup-list-footer-mord-edit').attr('aria-expanded')).toBe('true');
            });
            describe('> Se añade un campo nuevo a la ordenación', () => {
                beforeEach((done)=>{
                    
                   	$('#rup-list').on('rup_list-mord-dialogOpen', () => {
                		setTimeout(done, 200);
                	});
                    $('#rup-list-header-mord-edit').click();
                });
                describe('> Único campo en ordenación', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                            $('#rup-list').on('load', ()=>{
                                $('#rup-list').off('load');
                              	$('#rup-list').on('load', () => {
                            		done();
                            	});
                                $('.rup_list-mord-field:first').click();
                            });
                            $('.rup_list-mord-remove:first').click();
                        });
                        $('.rup_list-mord-remove:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBe(1, 'No hay un único campo de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Codigo cliente, Orden ascendente', 'label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'Atrasar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'Atrasar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'aria-controls del botón de quitar campo incorrecto');
                    });
                });
                describe('> Múltiples campos en ordenación', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                     	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('.rup_list-mord-field:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBeGreaterThan(2, 'No hay más de dos campos de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                       
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Edad, Orden ascendente', 'CAMPO 1º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 1º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 1º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 1º - Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'CAMPO 1º - Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 1º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 1º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 1º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 1º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 1º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 1º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 1º - aria-controls del botón de quitar campo incorrecto');

                        expect($('.rup_list-ord-line:nth-child(2)').attr('aria-label'))
                            .toBe('Usuario, Orden descendente', 'CAMPO 2º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 2º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 2º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Adelantar campo no tiene tabindex');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 2º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 2º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 2º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 2º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 2º - aria-controls del botón de quitar campo incorrecto'); 

                        expect($('.rup_list-ord-line:last').attr('aria-label'))
                            .toBe('Codigo cliente, Orden ascendente', 'CAMPO 3º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 3º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 3º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 3º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 3º - Adelantar campo tiene tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 3º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 3º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 3º - Atrasar campo no tiene aria-disabled true');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'CAMPO 3º - Atrasar campo no sale del tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 3º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 3º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 3º - aria-controls del botón de quitar campo incorrecto');
                    });
                });
            });
            describe('> Se elimina un campo de la ordenación', () => {
                beforeEach((done)=>{
                 	$('#rup-list').on('rup_list-mord-dialogOpen', () => {
                		done();
                	});
                    $('#rup-list-header-mord-edit').click();
                });
                describe('> No queden campos en ordenación', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                         	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('.rup_list-mord-remove:first').click();
                        });
                        $('.rup_list-mord-remove:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('#rup-list-mord-dialog-orderfields').children().length)
                            .toBe(3, 'No están todos los campos posibles para añadir');
                        expect($('#rup-list-mord-dialog-ordersort').children().length)
                            .toBe(0, 'Quedan campos de ordenación por quitar');
                        expect($('#rup-list-mord-dialog-ordersort').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.ariaSummaryEmpty, 'Label del resumen incorrecto');
                    });
                });
                describe('> Quede un campo en ordenación', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                     	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('.rup_list-mord-remove:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBe(1, 'No hay un único campo de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Usuario, Orden descendente', 'label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'Atrasar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'Atrasar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'aria-controls del botón de quitar campo incorrecto');
                    });
                });
                describe('> Queden dos campos en ordenación', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load', ()=>{
                            $('#rup-list').off('load');
                        	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('.rup_list-mord-remove:first').click();
                        });
                        $('.rup_list-mord-field:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBe(2, 'No hay dos campos de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                       
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Usuario, Orden descendente', 'CAMPO 1º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 1º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 1º - Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'CAMPO 1º - Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 1º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 1º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 1º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 1º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 1º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 1º - aria-controls del botón de quitar campo incorrecto');

                        expect($('.rup_list-ord-line:last').attr('aria-label'))
                            .toBe('Codigo cliente, Orden ascendente', 'CAMPO 2º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 2º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 2º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Adelantar campo tiene tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 2º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 2º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 2º - Atrasar campo no tiene aria-disabled true');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'CAMPO 2º - Atrasar campo no sale del tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 2º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 2º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 2º - aria-controls del botón de quitar campo incorrecto');
                    });
                });
            });
            describe('> Ordenación de campos', () => {
                beforeEach((done)=>{
                    
                 	$('#rup-list').on('rup_list-mord-dialogOpen', () => {
                		done();
                	});
                    $('#rup-list-header-mord-edit').click();
                });
                describe('> Entre dos campos', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('.rup_list-mord-down:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBe(2, 'No hay dos campos de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                       
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Usuario, Orden descendente', 'CAMPO 1º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 1º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 1º - Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'CAMPO 1º - Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 1º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 1º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 1º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 1º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 1º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 1º - aria-controls del botón de quitar campo incorrecto');

                        expect($('.rup_list-ord-line:last').attr('aria-label'))
                            .toBe('Edad, Orden ascendente', 'CAMPO 2º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 2º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 2º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Adelantar campo tiene tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 2º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 2º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 2º - Atrasar campo no tiene aria-disabled true');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'CAMPO 2º - Atrasar campo no sale del tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 2º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 2º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 2º - aria-controls del botón de quitar campo incorrecto');
                    });
                });
                describe('> Entre tres campos', () => {
                    beforeEach((done)=>{
                        $('#rup-list').off('load');
                        $('#rup-list').on('load',  ()=>{
                            $('#rup-list').off('load');
                        	$('#rup-list').on('load', () => {
                        		done();
                        	});
                            $('.rup_list-mord-down:first').click();
                        });
                        $('.rup_list-mord-field:first').click();
                    });
                    it('Los contextos son correctos', () => {
                        expect($('.rup_list-ord-line').length)
                            .toBeGreaterThan(2, 'No hay más de dos campos de ordenación');
                        expect($('.rup_list-ord-line:first').attr('aria-controls'))
                            .toBe('rup-list', 'No se define aria-controls en la toolbar');
                        expect($('.rup_list-ord-line:first').attr('role'))
                            .toBe('toolbar', 'No se define el rol de toolbar en la toolbar');
                       
                        expect($('.rup_list-ord-line:first').attr('aria-label'))
                            .toBe('Usuario, Orden descendente', 'CAMPO 1º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 1º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 1º - Adelantar campo no tiene aria-disabled');
                        expect($('.rup_list-ord-line:first .rup_list-mord-up').attr('tabindex'))
                            .toBe('-1', 'CAMPO 1º - Adelantar campo no salde del tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 1º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-USUARIO', 'CAMPO 1º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 1º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:first .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 1º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:first .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 1º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 1º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:first .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 1º - aria-controls del botón de quitar campo incorrecto');

                        expect($('.rup_list-ord-line:nth-child(2)').attr('aria-label'))
                            .toBe('Edad, Orden ascendente', 'CAMPO 2º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 2º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 2º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Adelantar campo no tiene tabindex');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 2º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-EDAD', 'CAMPO 2º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 2º - Atrasar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-down').attr('tabindex'))
                            .toBe('0', 'CAMPO 2º - Atrasar campo tiene tabindex');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 2º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 2º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:nth-child(2) .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 2º - aria-controls del botón de quitar campo incorrecto'); 

                        expect($('.rup_list-ord-line:last').attr('aria-label'))
                            .toBe('Codigo cliente, Orden ascendente', 'CAMPO 3º - label de la toolbar incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordSubir, 'CAMPO 3º - Label de adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 3º - aria-controls de la adelantar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('aria-disabled'))
                            .toBe('false', 'CAMPO 3º - Adelantar campo no tiene aria-disabled false');
                        expect($('.rup_list-ord-line:last .rup_list-mord-up').attr('tabindex'))
                            .toBe('0', 'CAMPO 3º - Adelantar campo tiene tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.mordBajar, 'CAMPO 3º - Label de atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-controls'))
                            .toBe('rup-list rup-list-mord-dialog-ord-line-CODCLIENTE', 'CAMPO 3º - aria-controls de la atrasar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('aria-disabled'))
                            .toBe('true', 'CAMPO 3º - Atrasar campo no tiene aria-disabled true');
                        expect($('.rup_list-ord-line:last .rup_list-mord-down').attr('tabindex'))
                            .toBe('-1', 'CAMPO 3º - Atrasar campo no sale del tabindex');
                        expect($('.rup_list-ord-line:last .rup_list-mord-label').attr('aria-hidden'))
                            .toBe('true', 'CAMPO 3º - El texto de la toolbar no tiene aria-hidden para que se pueda leer el label');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-label'))
                            .toBe($.rup.i18n.base.rup_list.quitarCampoOrden, 'CAMPO 3º - Label del botón de quitar campo incorrecto');
                        expect($('.rup_list-ord-line:last .rup_list-mord-remove').attr('aria-controls'))
                            .toBe('rup-list', 'CAMPO 3º - aria-controls del botón de quitar campo incorrecto');
                    });
                });
            });
            describe('> Cambio de tipo de orden asc/desc', () => {
                beforeEach((done)=>{
                    $('#rup-list').on('rup_list-mord-dialogOpen', ()=>{
                        $('#rup-list').off('load');
                    	$('#rup-list').on('load', () => {
                    		done();
                    	});
                        $('.rup_list-mord:first').click();
                    });
                    $('#rup-list-header-mord-edit').click();
                });
                it('Los contextos son correctos', () => {
                    expect($('#rup-list-mord-dialog-ordersort').attr('aria-label'))
                        .toBe('Las opciones de ordenación actuales son: Edad, Orden descendente; Usuario, Orden descendente; ', 'Label del resumen incorrecto');
                    expect($('.rup_list-ord-line:first').attr('aria-label'))
                        .toBe('Edad, Orden descendente', 'label de la toolbar incorrecto');
                    expect($('.rup_list-ord-line:first .rup_list-mord').attr('aria-label'))
                        .toBe($.rup.i18n.base.rup_list.sort.desc, 'label del botón de tipo de orden incorrecto');
                });

            });
        });
    });
}