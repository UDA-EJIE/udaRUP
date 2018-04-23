import 'jquery';
import 'jasmine-jquery';
import 'rup.tabs';

describe('Test Tabs > ', () => {
    var $tabs;
    beforeAll(() => {
        var html = '<div id="exampleTabs"></div>'
                 + '<div id="cont1" style="display:none;">Contenido 1</div>'
                 + '<div id="cont2" style="display:none;">Contenido 2</div>'
                 + '<div id="cont3" style="display:none;">Contenido 3</div>';
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
    describe('Creacion >', () => () => {
        it('El contenedor debe tener las classes apropiadas', () => {
            expect($tabs.hasClass('rup-tabs_container ui-tabs ui-corner-all ui-widget ui-widget-content')).toBeTruthy();
        });
    });
    describe('Métodos Públicos > ', () => {
        describe('Métodos enableTabs y disableTabs > ', () => {
            describe('Método disableTabs > ', () => {
                beforeAll(() => {
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
                    expect($('li[aria-labelledby="Tab2"').hasClass('ui-state-disabled')).toBeTruthy();
                });
            });
            describe('Método enableTabs > ', () => {
                beforeAll(() => {
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
                    expect($('li[aria-labelledby="Tab2"').hasClass('ui-state-disabled')).toBeFalsy();
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
            //No funciona en ejie.eus
        });
        describe('Método selectTab > ', () => {
            //No funciona en ejie.eus
        });
        describe('Método addTab > ', () => {
            //No funciona en ejie.eus
        });
    });
});