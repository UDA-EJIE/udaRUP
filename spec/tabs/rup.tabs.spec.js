/* jslint esnext: true, multistr: true */

import '../../dist/css/rup-base.css';
import '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'rup.tabs';

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
    .done(testTab());

function testTab() {
    describe('Test Tabs > ', () => {
        var $tabs;
        beforeEach(() => {
            var html = '<div id="exampleTabs">\
                        <div id="cont1" style="display:none;">Contenido 1</div>\
                        <div id="cont2" style="display:none;">Contenido 2</div>\
                        <div id="cont3" style="display:none;">Contenido 3</div>\
                    </div>';
            $('#content').append(html);
            var opts = {
                tabs: [{
                        i18nCaption: 'Tab1',
                        layer: '#cont1'
                    },
                    {
                        i18nCaption: 'Tab2',
                        layer: '#cont2'
                    }
                ]
            };
            $('#exampleTabs').rup_tabs(opts);
            $tabs = $('#exampleTabs');
        });
        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });
        describe('Creacion >', () => {
            it('El contenedor debe tener las classes apropiadas', () => {
                expect($tabs.hasClass('rup-tabs_container ui-tabs ui-corner-all ui-widget ui-widget-content')).toBeTruthy();
            });
            it('Por defecto debe estar seleccionado el primer tab', () => {
                let context = $('#exampleTabs > ul > li.ui-tabs-active.ui-state-active');
                expect($('a > div.rup-tabs_title', context).text()).toBe('Tab1');
            });
        });
        describe('Métodos Públicos > ', () => {
            describe('Métodos enableTabs y disableTabs > ', () => {
                describe('Método disableTabs > ', () => {
                    beforeEach(() => {
                        $tabs.rup_tabs('enableTabs', {
                            idTab: 'exampleTabs',
                            position: 1
                        });
                        $tabs.rup_tabs('disableTabs', {
                            idTab: 'exampleTabs',
                            position: 1
                        });
                    });
                    it('Debe tener la clase que deshabilita la pestaña', () => {
                        expect($('li[aria-labelledby="Tab2"]').hasClass('ui-state-disabled')).toBeTruthy();
                    });
                });
                describe('Método enableTabs > ', () => {
                    beforeEach(() => {
                        $tabs.rup_tabs('disableTabs', {
                            idTab: 'exampleTabs',
                            position: 1
                        });
                        $tabs.rup_tabs('enableTabs', {
                            idTab: 'exampleTabs',
                            position: 1
                        });
                    });
                    it('No debe tener la clase que deshabilita la pestaña', () => {
                        expect($('li[aria-labelledby="Tab2"]').hasClass('ui-state-disabled')).toBeFalsy();
                    });
                });
            });
            describe('Método loadTab > ', () => {
                beforeEach((done) => {
                    let html = '<div id="mockTab"></div>';
                    $('#content').append(html);
                    $('#mockTab').rup_tabs({
                        load: () => {done();},
                        tabs:[{
                            i18nCaption: 'Tab1',
                            layer: '#cont1'
                        }]
                    });
                    $('#mockTab').rup_tabs('addTab', {
                        idTab: 'mockTab',
                        label: 'Tab3',
                        position: 1,
                        url: 'http://localhost:8081/demo/fragmento3'
                    });
                    $('#mockTab').rup_tabs('selectTab', {
                        idTab:'mockTab',
                        position: 0
                    });
                    $('#mockTab').rup_tabs('loadTab', {
                        idTab:'mockTab',
                        position: 0,
                        url: 'http://localhost:8081/demo/tab3Fragment'
                    });
                });
                it('Debe añadir contenido a la tab:', () => {
                    let controlador = $('#mockTab > ul > li > a[href="http://localhost:8081/demo/tab3Fragment"]')
                        .parent().attr('aria-controls');
                    expect($('[id="' + controlador + '"].jvc0w1.clearfix').length).toBe(1);
                });
            });
            describe('Método changeUrlTab > ', () => {
                beforeEach(() => {
                    let html = '<div id="mockTab"></div>';
                    $('#content').append(html);
                    $('#mockTab').rup_tabs({
                        load: () => {done();},
                        tabs:[{
                            i18nCaption: 'Tab1',
                            layer: '#cont1'
                        }]
                    });
                    $('#mockTab').rup_tabs('addTab', {
                        idTab: 'mockTab',
                        label: 'Tab3',
                        position: 1,
                        url: 'http://localhost:8081/demo/fragmento3'
                    });
                    $('#mockTab').rup_tabs('selectTab', {
                        idTab:'mockTab',
                        position: 0
                    });
                    $('#mockTab').rup_tabs('changeUrlTab', {
                        idTab:'mockTab',
                        position: 0,
                        url: 'http://localhost:8081/demo/tab3Fragment'
                    });
                });
                it('Debe añadir contenido a la tab:', () => {
                    let controlador = $('#mockTab > ul > li > a[href="http://localhost:8081/demo/tab3Fragment"]')
                        .parent().attr('aria-controls');
                    expect($('[id="' + controlador + '"].jvc0w1.clearfix').length).toBe(1);
                });
            });
            describe('Método changeLayerTab > ', () => {
                beforeEach(() => {
                    $tabs.rup_tabs('changeLayerTab', {
                        idTab: 'exampleTabs',
                        position: 0,
                        layer: '#cont3'
                    });
                });
                it('Debe cambiar el contenido de Tab1', () => {
                    expect($('div[aria-labelledBy="Tab1"] > div').text()).toBe('Contenido 3');
                });
            });
            describe('Método selectTab > ', () => {
                beforeEach(() => {
                    $tabs.rup_tabs('selectTab', {
                        idTab: 'exampleTabs',
                        position: 1
                    });
                });
                it('Debe cambiar la selección', () => {
                    let context = $('#exampleTabs > ul > li.ui-tabs-active.ui-state-active');
                    expect($('a > div.rup-tabs_title', context).text()).toBe('Tab2');
                });
            });
            describe('Método addTab > ', () => {
                beforeEach((done) => {
                    let html = '<div id="mockTab"></div>';
                    $('#content').append(html);
                    $('#mockTab').rup_tabs({
                        load: () => {done();},
                        tabs:[{
                            i18nCaption: 'Tab1',
                            layer: '#cont1'
                        }]
                    });
                    $('#mockTab').rup_tabs('addTab', {
                        idTab: 'mockTab',
                        label: 'Tab3',
                        position: 1,
                        url: 'http://localhost:8081/demo/fragmento3'
                    });
                    $('#mockTab').rup_tabs('selectTab', {
                        idTab:'mockTab',
                        position: 0
                    });
                });
                it('Debe crear la tab:', () => {
                    expect($('#mockTab > ul > li > a[href="http://localhost:8081/demo/fragmento3"]').length).toBe(1);
                    expect($('#mockTab > ul > li > a[href="http://localhost:8081/demo/fragmento3"]').text()).toBe('Tab3');
                });
                it('Debe añadir contenido a la tab:', () => {
                    let controlador = $('#mockTab > ul > li > a[href="http://localhost:8081/demo/fragmento3"]').parent().attr('aria-controls');
                    expect($('[id="' + controlador + '"]').html()).not.toBe('');
                });
            });
        });
    });
}