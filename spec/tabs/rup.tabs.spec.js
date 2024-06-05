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

    beforeEach((done) => {
        var html = '<div id="tabs">\
                        <div id="cont1" style="display:none;">Contenido 1</div>\
                        <div id="cont2" style="display:none;">Contenido 2</div>\
                        <div id="cont3" style="display:none;">Contenido 3</div>\
                    </div>';
        $('#content').append(html);
        var opts = {
            tabs: [{
                i18nCaption: 'pestana1',
                layer: '#cont1'
            },
            {
                i18nCaption: 'pestana2',
                layer: '#cont2'
            }
            ]
        };
        $('#tabs').rup_tabs(opts);
        $tabs = $('#tabs');
        setTimeout(done, 200);
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
            let context = $('#tabs > ul > li.ui-tabs-active.ui-state-active');
            expect($('a > div.rup-tabs_title', context).text()).toBe('Tab 1');
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
                    i18nCaption: 'pestana1',
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
                        idTab: 'tabs',
                        position: 1
                    });
                    $tabs.rup_tabs('disableTabs', {
                        idTab: 'tabs',
                        position: 1
                    });
                });
                it('Debe tener la clase que deshabilita la pestaña', () => {
                    expect($('li[aria-labelledby="pestana2"]').hasClass('ui-state-disabled')).toBeTruthy();
                });
            });
            describe('Método enableTabs > ', () => {
                beforeEach(() => {
                    $tabs.rup_tabs('disableTabs', {
                        idTab: 'tabs',
                        position: 1
                    });
                    $tabs.rup_tabs('enableTabs', {
                        idTab: 'tabs',
                        position: 1
                    });
                });
                it('No debe tener la clase que deshabilita la pestaña', () => {
                    expect($('li[aria-labelledby="pestana2"]').hasClass('ui-state-disabled')).toBeFalsy();
                });
            });
        });
        describe('Método loadTab > ', () => {
            beforeEach((done) => {
                let html = '<div id="tabs"></div>';
                $('#content').append(html);
                $('#tabs').rup_tabs({
                    tabs: [{
                        i18nCaption: 'pestana1',
                        layer: '#cont1'
                    }]
                });
                $('#tabs').rup_tabs('addTab', {
                    idTab: 'tabs',
                    label: 'Tab3',
                    position: 1,
                    url: testutils.DEMO + '/fragmento3'
                });
                $('#tabs').on('afterTabDataLoad', () => {
                    done();
                });
                $('#tabs').rup_tabs('loadTab', {
                    idTab: 'tabs',
                    position: 1,
                    url: testutils.DEMO + '/tab3Fragment'
                });
                $('#tabs > ul > li > a:contains(Tab3)').click();
            });
            it('Debe añadir contenido a la tab:', () => {
                let tabContent = $('[aria-labelledby = "'+$('#tabs > ul > li > a:contains(Tab3)').attr('id')+'"]');
                expect($('div.jvc0w1.clearfix', tabContent).length).toBe(1);
            });
        });
        describe('Método changeUrlTab > ', () => {
            beforeEach((done) => {
                let html = '<div id="tabs"></div>';
                $('#content').append(html);
                $('#tabs').rup_tabs({
                    tabs: [{
                        i18nCaption: 'pestana1',
                        layer: '#cont1'
                    }]
                });
                $('#tabs').rup_tabs('addTab', {
                    idTab: 'tabs',
                    label: 'Tab3',
                    position: 1,
                    url: testutils.DEMO + '/fragmento3'
                });
                $('#tabs').on('afterTabDataLoad', () => {
                    done();
                });
                $('#tabs').rup_tabs('changeUrlTab', {
                    idTab: 'tabs',
                    position: 1,
                    url: testutils.DEMO + '/tab3Fragment'
                });
                $('#tabs > ul > li > a:contains(Tab3)').click();
            });
            it('Debe añadir contenido a la tab:', () => {
                let tabContent = $('[aria-labelledby = "'+$('#tabs > ul > li > a:contains(Tab3)').attr('id')+'"]');
                expect($('div.jvc0w1.clearfix', tabContent).length).toBe(1);
            });
        });
        describe('Método changeLayerTab > ', () => {
            beforeEach(() => {
                $tabs.rup_tabs('changeLayerTab', {
                    idTab: 'tabs',
                    position: 0,
                    layer: '#cont3'
                });
            });
            it('Debe cambiar el contenido de Tab 1', () => {
                expect($('div[aria-labelledBy="pestana1"] > div').text()).toBe('Contenido 3');
            });
        });
        describe('Método selectTab > ', () => {
            beforeEach(() => {
                $tabs.rup_tabs('selectTab', {
                    idTab: 'tabs',
                    position: 1
                });
            });
            it('Debe cambiar la selección', () => {
                let context = $('#tabs > ul > li.ui-tabs-active.ui-state-active');
                expect($('a > div.rup-tabs_title', context).text()).toBe('Tab 2');
            });
        });
        describe('Método addTab > ', () => {
            beforeEach((done) => {
                let html = '<div id="mockTab"></div>';
                $('#content').append(html);
                $('#mockTab').on('afterTabDataLoad', () => {
                    done();
                });
				$('#mockTab').on('load', () => {
					$('#mockTab').rup_tabs('addTab', {
						idTab: 'mockTab',
						label: 'Tab3',
						position: 1,
						url: testutils.DEMO + '/fragmento3'
					});
					$('#mockTab > ul > li > a:contains(Tab3)').click();
				});
                $('#mockTab').rup_tabs({
                    tabs: [{
                        i18nCaption: 'pestana1',
                        layer: '#cont1'
                    }]
                });
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