/* jslint esnext: true, multistr: true */

import '../../dist/css/rup-base.css';
import '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'rup.button';
import 'rup.toolbar';

const webRoot = "http://localhost:8081";

function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

function loadCss() {
    let css = '';
    $('head').append('<style></style>');
    var thenable = $.when($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then(() => {
            $('head > style').append(css);
        });
    return thenable;
}

$.when(loadCss())
    .done(testToolbar());

function testToolbar() {

    describe('Test Toolbar > ', () => {
        var $toolbar;
        beforeEach(() => {
            var handler = () => {
                // console.log('XXX');
            };
            let html = '<div id="exampleToolbar"></div>';
            let options = {
                buttons: [{
                        id: 'searchBtn',
                        css: 'fa fa-search',
                        i18nCaption: 'buscar',
                        click: handler
                    },
                    {
                        id: "mbutton1",
                        i18nCaption: "botones",
                        buttons: [{
                                id: 'searchMBtn',
                                i18nCaption: 'buscar',
                                click: handler
                            },
                            {
                                id: 'editMBtn',
                                i18nCaption: 'editar',
                                click: handler
                            },
                            {
                                id: 'copyMBtn',
                                i18nCaption: 'copiar',
                                click: handler
                            }
                        ]
                    }
                ]
            };
            $('#content').append(html);
            $('#exampleToolbar').rup_toolbar(options);
            $toolbar = $('#exampleToolbar');
        });
        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        describe('Creación > ', () => {
            it('Debe tener la clase adecuada', () => {
                expect($toolbar.hasClass('rup-toolbar ui-widget-header ui-widget ui-widget-content'))
                    .toBeTruthy();
            });
        });
        describe('Métodos públicos > ', () => {
            describe('Método addButton > ', () => {
                let buttonObj;
                beforeEach(() => {
                    buttonObj = {
                        id: 'addedButton',
                        i18nCaption: 'Added Button'
                    };
                    $toolbar.rup_toolbar('addButton', buttonObj);
                });
                it('Debe existir el boton', () => {
                    testTrace('body - html', $('body').html());

                    expect($('[id="exampleToolbar##addedButton"]').length).toBe(1);
                });
            });
            describe('Método addMButton > ', () => {
                let mButton;
                beforeEach(() => {
                    mButton = {
                        id: "addedMButton",
                        i18nCaption: "addedMButton",
                        buttons: [{
                                id: 'new',
                                i18nCaption: "nuevo",
                                css: "nuevo",
                                click: () => {
                                }
                            },
                            {
                                id: 'editar',
                                i18nCaption: "editar",
                                css: "editar",
                                click: () => {
                                }
                            },
                            {
                                id: 'cancelar',
                                i18nCaption: "cancelar",
                                css: "cancelar",
                                click: () => {
                                }
                            }
                        ]
                    };
                    $toolbar.rup_toolbar('addMButton', mButton);
                });

                it('Debe existir el mButton', () => {
                    expect($('[id="exampleToolbar##addedMButton"]').length).toBe(1);
                });
                it('Deben existir los botones hijos del MButton', () => {
                    expect($('[id="exampleToolbar##addedMButton##new"]').length).toBe(1);
                    expect($('[id="exampleToolbar##addedMButton##editar"]').length).toBe(1);
                    expect($('[id="exampleToolbar##addedMButton##cancelar"]').length).toBe(1);
                });
            });
            describe('Método addButtonsToMButton >', () => {
                beforeEach(() => {
                    let button = {
                        id: 'addedButton',
                        i18nCaption: 'boton',
                        click: () => {
                        }
                    };

                    $toolbar.rup_toolbar('addButtonsToMButton', 'mbutton1', [button]);
                });

                it('Debe existir el botón añadido', () => {
                    expect($('[id="exampleToolbar##mbutton1##addedButton"]').length).toBe(1);
                });
            });
            describe('Método showMButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('showMButton', 'mbutton1');
                });
                it('Debe tener la clase de "abierto" ', () => {
                    expect($toolbar.hasClass('rup-mbutton-open')).toBeTruthy();
                });
            });
            describe('Método disableButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('disableButton', 'searchBtn');
                });
                it('Debe tener las clases que lo deshabilitan', () => {
                    expect($('[id="exampleToolbar##searchBtn"]').hasClass('ui-button-disabled ui-state-disabled'))
                        .toBe(true);
                });
            });
            describe('Método enableButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('disableButton', 'searchBtn');
                    $toolbar.rup_toolbar('enableButton', 'searchBtn');
                });
                it('No debe tener las clases que lo deshabilitan', () => {
                    expect($('[id="exampleToolbar##searchBtn"]').hasClass('ui-button-disabled ui-state-disabled'))
                        .toBe(false);
                });
            });
            describe('Método pressButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('pressButton', 'searchBtn', 'pressed-button');
                });
                it('Debe tener la clase de presionado ', () => {
                    expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeTruthy();
                });
            });
            describe('Método unpressButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('pressButton', 'searchBtn', 'pressed-button');
                    $toolbar.rup_toolbar('unpressButton', 'searchBtn', 'pressed-button');
                });
                it('No debe tener la clase de presionado ', () => {
                    expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeFalsy();
                });
            });
            describe('Método tooglePressButton > ', () => {
                beforeEach(() => {
                    $toolbar.rup_toolbar('pressButton', 'searchBtn', 'pressed-button');
                    $toolbar.rup_toolbar('togglePressButton', 'searchBtn', 'pressed-button');
                });
                it('No debe tener la clase de presionado ', () => {
                    expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeFalsy();
                });
            });
            describe('Método refreshButton > ', () => {
                beforeEach(() => {
                    $('[id = "exampleToolbar##searchBtn"]').addClass('clase-anadida');
                    $toolbar.rup_toolbar('refreshButton', 'searchBtn');
                });

                it('Debe devolver el botón seleccionado al estado que presenta en la configuración', () => {
                    expect($('[id = "exampleToolbar##searchBtn"]').hasClass('clase-anadida')).toBeFalsy();
                });
            });
        });
    });
}