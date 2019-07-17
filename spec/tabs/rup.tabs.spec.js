/* jslint multistr: true */
/* eslint-env jasmine, jquery */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.tabs';


describe('Test Tabs > ', () => {
    var $tabs;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

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
    describe('Callback load > ', () => {
        beforeEach((done) => {
            let html = '<div id="mockTab"></div>';
            $('#content').append(html);
            $('#mockTab').on('load', () => {
                $('#mockTab').addClass('foo-class');
                done();
            });
            $('#mockTab').rup_tabs({
                tabs: [{
                    i18nCaption: 'Tab1',
                    layer: '#cont1'
                }]
            });
        });
        it('Debe ejecutarse el load: ', () => {
            expect($('#mockTab').hasClass('foo-class')).toBe(true);
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
                    tabs: [{
                        i18nCaption: 'Tab1',
                        layer: '#cont1'
                    }]
                });
                $('#mockTab').rup_tabs('addTab', {
                    idTab: 'mockTab',
                    label: 'Tab3',
                    position: 1,
                    url: testutils.DEMO + '/fragmento3'
                });
                $('#mockTab > ul > li > a:contains(Tab3)').click();
                $('#mockTab').on('afterTabDataLoad', () => {
                    $('#mockTab').on('afterTabDataLoad', () => {
                        done();
                    });
                    $('#mockTab > ul > li > a:contains(Tab1)').click();
                    $('#mockTab').rup_tabs('loadTab', {
                        idTab: 'mockTab',
                        position: 1,
                        url: testutils.DEMO + '/tab3Fragment'
                    });
                    $('#mockTab > ul > li > a:contains(Tab3)').click();
                });
            });
            it('Debe añadir contenido a la tab:', () => {
                let tabContent = $('[aria-labelledby = "'+$('#mockTab > ul > li > a:contains(Tab3)').attr('id')+'"]');
                expect($('div.jvc0w1.clearfix', tabContent).length).toBe(1);
            });
        });
        describe('Método changeUrlTab > ', () => {
            beforeEach((done) => {
                let html = '<div id="mockTab"></div>';
                $('#content').append(html);
                $('#mockTab').rup_tabs({
                    tabs: [{
                        i18nCaption: 'Tab1',
                        layer: '#cont1'
                    }]
                });
                $('#mockTab').rup_tabs('addTab', {
                    idTab: 'mockTab',
                    label: 'Tab3',
                    position: 1,
                    url: testutils.DEMO + '/fragmento3'
                });
                $('#mockTab > ul > li > a:contains(Tab3)').click();
                $('#mockTab').on('afterTabDataLoad', () => {
                    $('#mockTab').on('afterTabDataLoad', () => {
                        done();
                    });
                    $('#mockTab > ul > li > a:contains(Tab1)').click();
                    $('#mockTab').rup_tabs('changeUrlTab', {
                        idTab: 'mockTab',
                        position: 1,
                        url: testutils.DEMO + '/tab3Fragment'
                    });
                    $('#mockTab > ul > li > a:contains(Tab3)').click();
                });
            });
            it('Debe añadir contenido a la tab:', () => {
                let tabContent = $('[aria-labelledby = "'+$('#mockTab > ul > li > a:contains(Tab3)').attr('id')+'"]');
                expect($('div.jvc0w1.clearfix', tabContent).length).toBe(1);
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
                $('#mockTab').on('afterTabDataLoad', () => {
                    done();
                });
                $('#mockTab').rup_tabs({
                    tabs: [{
                        i18nCaption: 'Tab1',
                        layer: '#cont1'
                    }]
                });
                $('#mockTab').rup_tabs('addTab', {
                    idTab: 'mockTab',
                    label: 'Tab3',
                    position: 1,
                    url: testutils.DEMO + '/fragmento3'
                });
                $('#mockTab > ul > li > a:contains(Tab3)').click();
            });
            it('Debe crear la tab:', () => {
                expect($('#mockTab > ul > li > a[href="' + testutils.DEMO + '/fragmento3"]').length).toBe(1);
                expect($('#mockTab > ul > li > a[href="' + testutils.DEMO + '/fragmento3"]').text()).toBe('Tab3');
            });
            it('Debe añadir contenido a la tab:', () => {
                let controlador = $('#mockTab > ul > li > a[href="' + testutils.DEMO + '/fragmento3"]').parent().attr('aria-controls');
                expect($('[id="' + controlador + '"]').html()).not.toBe('');
            });
        });
    });
});