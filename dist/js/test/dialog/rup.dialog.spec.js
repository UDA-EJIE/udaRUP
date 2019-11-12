/* jslint multistr: true */
/* eslint-env jasmine, jquery */



$.when(testDialogType($.rup.dialog.TEXT))
    .done(testDialogType($.rup.dialog.DIV))
    .done(testDialogType($.rup.dialog.AJAX));

function testDialogType(type) {
    var d = new $.Deferred();

    describe('Test Dialog ' + type + ' > ', () => {
        var $dialogo;

        beforeAll((done) => {
            testutils.loadCss(done);
        });

        beforeEach(() => {
            let html, opciones;
            if (type == $.rup.dialog.TEXT) {
                html = '<div id="exampleDialogo"></div>';
                opciones = {
                    open: () => {
                        $('#exampleDialogo').addClass('randomClass');
                    },
                    onBeforeClose: () => {
                        $('#exampleDialogo').removeClass('randomClass');
                    },
                    type: type,
                    autoOpen: false,
                    width: 200,
                    title: 'TituloDialogo',
                    message: 'MensajeDialogo',
                    buttons: [{
                        text: 'boton',
                        click: () => {}
                    }]
                };
            }
            if (type == $.rup.dialog.DIV) {
                html = '<div id="exampleDialogo">MensajeDialogo</div>';
                opciones = {
                    open: () => {
                        $('#exampleDialogo').addClass('randomClass');
                    },
                    onBeforeClose: () => {
                        $('#exampleDialogo').removeClass('randomClass');
                        return false;
                    },
                    type: type,
                    autoOpen: false,
                    width: 200,
                    title: 'TituloDialogo',
                    resizable: false,
                    modal: true,
                    buttons: [{
                        text: 'boton',
                        click: () => {}
                    }]
                };
            }
            if (type == $.rup.dialog.AJAX) {
                html = '<div id="exampleDialogo">MensajeDialogo</div>';
                opciones = {
                    open: () => {
                        $('#exampleDialogo').addClass('randomClass');
                    },
                    onBeforeClose: () => {
                        $('#exampleDialogo').removeClass('randomClass');
                    },
                    type: type,
                    url: testutils.DEMO + '/demo-idx.html',
                    autoOpen: false,
                    width: 200,
                    title: 'TituloDialogo',
                    resizable: false,
                    buttons: [{
                        text: 'boton',
                        click: () => {}
                    }]
                };
            }

            $('#content').append(html);
            $('#exampleDialogo').rup_dialog(opciones);

            $dialogo = $('#exampleDialogo');
        });
        afterEach(() => {
            $dialogo.rup_dialog('destroy');
            $dialogo = undefined;
            $('#content').nextAll().remove();
            $('#content').html('');
        });
        afterAll(() => {
            d.resolve();
        });
        describe('Creación > ', () => {
            it('Debe crearse el contenedor del dialogo:', () => {
                if (type == $.rup.dialog.TEXT) {
                    expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.ui-resizable.rup-dialog')
                        .length).toBe(1);
                }
                if (type == $.rup.dialog.DIV) {
                    let selector = $('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog');
                    expect(selector.length).toBe(1);
                    expect(selector.hasClass('ui-resizable')).toBe(false);
                }
                if (type == $.rup.dialog.AJAX) {
                    let selector = $('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog');
                    expect(selector.length).toBe(1);
                    expect(selector.hasClass('ui-resizable')).toBe(false);
                }
            });
            it('El contenedor no debe ser visible:', () => {
                expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                    .is(':visible')).toBe(false);
            });
            it('Debe contener el texto establecido:', () => {
                expect($dialogo.text()).toBe('MensajeDialogo');
            });
        });
        describe('Métodos públicos > ', () => {
            describe('Método open e isOpen > ', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('open');
                });
                it('Debe ser visible:', () => {
                    expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                        .is(':visible')).toBe(true);
                });
                it('Debe devolver correctamente el resultado de isOpen:', () => {
                    expect($dialogo.rup_dialog('isOpen')).toBe(true);
                });
                it('El foco debe estar en el primer botón:', () => {
                    expect($('button:contains(boton)')).toEqual($(document.activeElement));
                });
            });
            describe('Método close e isOpen > ', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('open');
                    $dialogo.rup_dialog('close');
                });
                it('Debe ser visible:', () => {
                    if (type === $.rup.dialog.DIV) {
                        expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                            .is(':visible')).toBe(true);
                    } else {
                        expect($('div.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                            .is(':visible')).toBe(false);
                    }
                });
                it('Debe devolver correctamente el resultado de isOpen:', () => {
                    if (type === $.rup.dialog.DIV) {
                        expect($dialogo.rup_dialog('isOpen')).toBe(true);
                    } else {
                        expect($dialogo.rup_dialog('isOpen')).toBe(false);
                    }
                });
            });
            describe('Métodos disable y enable > ', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('disable');
                    $dialogo.rup_dialog('open');
                });
                it('Los métodos no deberían funcionar:', () => {
                    expect($dialogo.rup_dialog('isOpen')).toBeFalsy();
                });
            });
            describe('Método moveToTop ' + type + ' > ', () => {
                beforeEach(() => {
                    let aux = '<div id="auxDialog"></div>';
                    $('body').append(aux);
                    let opts = {
                        type: $.rup.dialog.TEXT,
                        autoOpen: true,
                        width: 200,
                        title: 'TituloDialogo',
                        message: 'MensajeDialogoAux'
                    };
                    $dialogo.rup_dialog('open');
                    $('#auxDialog').rup_dialog(opts);
                    $('#auxDialog').rup_dialog('open');
                    $dialogo.rup_dialog('moveToTop');
                });
                it('El dialog debe estar encima del aux:', () => {
                    //No existe la propiedad z-index.
                    expect($dialogo.parent().css('z-index'))
                        .toBeGreaterThan($('#auxDialog').parent().css('z-index'));
                });
            });
            describe('Método getOption > ', () => {
                it('Debe devolver los valores esperados:', () => {
                    expect($dialogo.rup_dialog('getOption', 'width')).toBe(200);
                    expect($dialogo.rup_dialog('getOption', 'type')).toBe(type);
                });
            });
            describe('Método setOption > ', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('setOption', 'width', 400);
                    $dialogo.rup_dialog('setOption', 'draggable', false);
                });
                it('Debe devolver los valores esperados:', () => {
                    expect($dialogo.rup_dialog('getOption', 'width')).toBe(400);
                    expect($dialogo.rup_dialog('getOption', 'draggable')).toBe(false);
                });
            });
            describe('Método createBtnLinks > ', () => {
                beforeEach(() => {
                    let btnObj = {
                        text: 'boton2',
                        click: () => {}
                    };
                    $dialogo.rup_dialog('createBtnLinks', btnObj, 'exampleDialogo');
                    $dialogo.rup_dialog('open');
                });
                it('Debe crear un enlace en el dialog:', () => {
                    expect($('button.btn-material:contains(boton2)').length).toBe(1);
                });
            });
        });
        describe('Test Eventos > ', () => {
            describe('Evento onOpen', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('open');
                });
                it('Debe de haberse ejecutado el evento:', () => {
                    expect($dialogo.hasClass('randomClass')).toBe(true);
                });
            });
            describe('Evento onBeforeClose > ', () => {
                beforeEach(() => {
                    $dialogo.rup_dialog('open');
                    $dialogo.rup_dialog('close');
                });
                it('Debe ejecutrarse el evento:', () => {
                    if (type === $.rup.dialog.DIV) {
                        expect($dialogo.rup_dialog('isOpen')).toBe(true);
                    } else {
                        expect($dialogo.hasClass('randomClass')).toBe(false);
                        expect($dialogo.rup_dialog('isOpen')).toBe(false);
                    }
                });
            });
        });
    });

}