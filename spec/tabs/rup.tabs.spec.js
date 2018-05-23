import 'jquery';
import 'jasmine-jquery';
import 'rup.tabs';

describe('Test Tabs > ', () => {
    var $tabs;
    beforeEach(() => {
        var html = '<div id="exampleTabs">\
                        <div id="cont1" style="display:none;">Contenido 1</div>\
                        <div id="cont2" style="display:none;">Contenido 2</div>\
                        <div id="cont3" style="display:none;">Contenido 3</div>\
                    </div>';
        $('body').append(html);
        var opts = {
            tabs:[
                {i18nCaption:'Tab1', layer:'#cont1'},
                {i18nCaption:'Tab2', layer:'#cont2'}
            ]
        };
        $('#exampleTabs').rup_tabs(opts);
        $tabs = $('#exampleTabs');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creacion >',  () => {
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
                    $tabs.rup_tabs('enableTabs',{
                        idTab:'exampleTabs',
                        position: 1
                    });
                    $tabs.rup_tabs('disableTabs',{
                        idTab:'exampleTabs',
                        position: 1
                    });
                });
                it('Debe tener la clase que deshabilita la pestaña', () => {
                    expect($('li[aria-labelledby="Tab2"]').hasClass('ui-state-disabled')).toBeTruthy();
                });
            });
            describe('Método enableTabs > ', () => {
                beforeEach(() => {
                    $tabs.rup_tabs('disableTabs',{
                        idTab:'exampleTabs',
                        position: 1
                    });
                    $tabs.rup_tabs('enableTabs',{
                        idTab:'exampleTabs',
                        position: 1
                    });
                });
                it('No debe tener la clase que deshabilita la pestaña', () => {
                    expect($('li[aria-labelledby="Tab2"]').hasClass('ui-state-disabled')).toBeFalsy();
                });
            });
        });
        describe('Método loadTab > ', () => {
            //Requiere recarga desde servidor
        });
        describe('Método changeUrlTab > ', () => {
            //Requiere llamadas xhr
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
                $tabs.rup_tabs('selectTab', { idTab:'exampleTabs', position:1});
            });
            it('Debe cambiar la selección', () => {
                let context = $('#exampleTabs > ul > li.ui-tabs-active.ui-state-active');
                expect($('a > div.rup-tabs_title', context).text()).toBe('Tab2');
            });
        });
        describe('Método addTab > ', () => {
            beforeEach(() => {
                $tabs.rup_tabs('addTab', {
                    idTab:'exampleTabs',
                    label: 'Tab3',
                    position: 2,
                    url: '/demo/fragmento3'
                });
            });
            it('Debe crear la tab:', () => {
                expect($('#exampleTabs > ul > li > a[href="/demo/fragmento3"]').length).toBe(1);
                expect($('#exampleTabs > ul > li > a[href="/demo/fragmento3"]').text()).toBe('Tab3');
            });
            it('Debe añadir contenido a la tab:', () => {
                let controlador = $('#exampleTabs > ul > li > a[href="/demo/fragmento3"]').parent().attr('aria-controls');
                console.info($('[id="' + controlador + '"]').html());
                expect($('[id="' + controlador + '"]').html()).not.toBe('');
            });
        });
    });
});