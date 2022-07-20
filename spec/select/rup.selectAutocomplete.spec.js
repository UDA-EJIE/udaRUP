/* jslint multistr: true */
/* eslint-env jasmine, jquery */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.autocomplete';


var $autocomplete, $autocomplete2, $autocomplete3, $autocompleteLabel, $autocompleteLabel2, $autocompleteLabel3;

function createAutocomplete(done) {
    let html = '<select id="exampleAutocomplete"></select>\
                <select id="exampleAutocompleteDos"></select>\
                <select id="exampleAutocompleteTres"></select>';

    $('#contentAutocomplete').append(html);

    let sourceJson = [
        {i18nCaption: 'ab', id: 'ab_value'},
        {i18nCaption: 'tc', id: 'tc_value'},
        {i18nCaption: 'ud', id: 'ud_value'},
        {i18nCaption: 'le', id: 'le_value'},
        {i18nCaption: 'af', id: 'af_value'},
        {i18nCaption: 'mg', id: 'mg_value'},
        {i18nCaption: 'ah', id: 'ah_value'},
        {i18nCaption: 'ui', id: 'ui_value'},
        {i18nCaption: 'uj', id: 'uj_value'},
        {i18nCaption: 'ak', id: 'ak_value'}
    ];

    $('#exampleAutocomplete').rup_select({
        data: sourceJson,
        defaultValue: 'a',
        contains: false,
        autocomplete:true,
        delay: 0
    });
    $('#exampleAutocompleteDos').rup_select({
        data: sourceJson,
        defaultValue: 'a',
        contains: true,
        autocomplete:true,
        delay: 0
    });
    $('#exampleAutocompleteTres').rup_select({
        data: 'demo/autocomplete/remote',
        sourceParam: {
            label: 'label',
            value: 'value'
        },
        autocomplete:true,
        minLength: 4
    });
    $autocomplete = $('#exampleAutocomplete');
    $autocomplete2 = $('#exampleAutocompleteDos');
    $autocomplete3 = $('#exampleAutocompleteTres');
    $autocompleteLabel = $('#exampleAutocomplete_label');
    $autocompleteLabel2 = $('#exampleAutocompleteDos_label');
    $autocompleteLabel3 = $('#exampleAutocompleteTres_label');

    setTimeout(done, 100);
}


describe('Test Autocomplete > ', () => {
    beforeAll((done) => {
        if ($('#contentAutocomplete').length == 0) {
            $('body').append('<div id="contentAutocomplete" class="container mt-4"></div>');
        }
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        createAutocomplete(done);
    });
    afterEach(() => {
        $('#contentAutocomplete').html('');
        $('#contentAutocomplete').nextAll().remove();
    });
    describe('Creación > ', () => {
        it('El elemento html debe presentar cambios', () => {
            expect($autocomplete.attr('ruptype')).toBe('select');
            expect($autocomplete.data('select2').$container.find('input').length == 1).toBeTruthy();
            expect($autocomplete2.attr('ruptype')).toBe('select');
            expect($autocomplete2.data('select2').$container.find('input').length == 1).toBeTruthy();
            expect($autocomplete3.attr('ruptype')).toBe('select');
            expect($autocomplete3.data('select2').$container.find('input').length == 1).toBeTruthy();
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método on > ', () => {
            describe('Autocomplete > ', () => {
                beforeEach(() => {
                    $('body').trigger('mousedown');
                    $autocomplete.rup_select('off');
                    $autocomplete.rup_select('on');
                    $autocomplete.rup_select('search', 'u');
                });
                it('Deben mostrarse el menu', () => {
                    expect($autocomplete.data('select2').$results).toBeTruthy();
                });
            });
            describe('Autocomplete2 > ', () => {
                beforeEach(() => {
                    $autocomplete2.rup_select('off');
                    $autocomplete2.rup_select('on');
                    $autocomplete2.rup_select('search', 'u');
                });
                it('Deben mostrarse el menu', () => {
                    expect($autocomplete2.data('select2').$results).toBeTruthy();
                });

            });
            describe('Autocomplete3 > ', () => {
                beforeEach(() => {
                    $autocomplete3.rup_select('off');
                    $autocomplete3.rup_select('on');
                    $autocomplete3.rup_select('search', 'ul');
                });
                it('No deben mostrarse el menu', () => {
                    expect($autocomplete3.data('select2').$results.find('li[role=option]').length).toBe(0);
                });
                
            });
            
            describe('Autocomplete3 > ', () => {
                beforeEach(() => {
                    $autocomplete3.rup_select('off');
                    $autocomplete3.rup_select('on');
                    $autocomplete3.rup_select('search', 'o');
                });
                it('deben mostrarse el menu', () => {
                    expect($autocomplete3.data('select2').$results.find('li[role=option]').length).toBe(4);
                });
                
            });
        });

        describe('Método option > ', () => {
            describe('Autocomplete 1 > ', () => {
                beforeEach((done) => {
                    $autocomplete.on('selectFinish', () => {
                    	done(); 
                    });
                    $autocomplete.rup_select('option', 'combo', true);
                });
                it('No Debe tener la clase de combobox', () => {
                	expect($('#exampleAutocomplete').data('select2').$selection.find('span').hasClass('ui-autocomplete-input')).toBeFalsy();
                });
            });
            describe('Autocomplete 2 > ', () => {
                beforeEach((done) => {
                    $autocomplete2.on('selectFinish', () => {
                    	done(); 
                    });
                    $autocomplete2.rup_select('option', 'combo', true);
                });
                it('No Debe tener la clase de combobox', () => {
                	expect($('#exampleAutocompleteDos').data('select2').$selection.find('span').hasClass('ui-autocomplete-input')).toBeFalsy();
                });
            });
            describe('Autocomplete 3 > ', () => {
                beforeEach((done) => {
                    $autocomplete3.on('selectFinish', () => {
                    	done(); 
                    });
                    $autocomplete3.rup_select('option', 'combo', true);
                });
                it('No Debe tener la clase de combobox', () => {
                	expect($('#exampleAutocompleteTres').data('select2').$selection.find('span').hasClass('ui-autocomplete-input')).toBeFalsy();
                });
            });
        });
        describe('Método search > ', () => {
            describe('Empieza por una letra > ', () => {
                describe('Autocomplete > ', () => {
                    beforeEach(() => {
                        $autocomplete.rup_select('search', 'u');
                    });
                    it('Deben mostrarse autocomplete', () => {
                        expect($autocomplete.data('select2').$results.is(':visible')).toBe(true);
                    });
                });

                describe('Autocomplete2 > ', () => {
                    beforeEach(() => {
                        $autocomplete2.rup_select('search', 'u');
                    });
                    it('Deben mostrarse autocomplete', () => {
                        expect($autocomplete2.data('select2').$results.is(':visible')).toBe(true);
                    });
                });

                describe('Autocomplete3 > ', () => {
                    beforeEach(() => {
                        $autocomplete3.rup_select('search', 'ul');
                    });
                    it('Deben no mostrarse autocomplete', () => {
                    	expect($autocomplete3.data('select2').$results.find('li[role=option]').length).toBe(0);
                    });
                });
            });
            describe('Contiene una letra > ', () => {
                beforeEach(() => {
                    $('body').trigger('mousedown');

                    $autocomplete.rup_select('search', 'a');
                    $autocomplete2.rup_select('search', 'j');
                });
                it('Solo debe mostrarse el segundo autocomplete:', () => {
                    expect($autocomplete.data('select2').$results.is(':visible')).toBe(false);
                    expect($autocomplete2.data('select2').$results.is(':visible')).toBe(true);
                });
            });
        });
        describe('Método close > ', () => {
            beforeEach(() => {
                $autocomplete.rup_select('close');
            });
            it('Deben mostrarse la opciones', () => {
                expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
            });
        });

        describe('Método setRupValue y getRupValue > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocomplete.rup_select('setRupValue', 'ui_value');
            });
            it('Debe devolver el valor seleccionado', () => {
                expect($autocomplete.rup_select('getRupValue')).toBe('ui_value');
            });
        });
        describe('Método disable > ', () => {
            beforeEach(() => {
                $autocomplete.rup_select('disable');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                expect($autocomplete.attr('disabled')).toBe('disabled');
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                $autocomplete.rup_select('disable');
                $autocomplete.rup_select('enable');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                expect($autocomplete.attr('disabled')).toBeUndefined();
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                $autocomplete.rup_select('destroy');
                $autocomplete2.rup_select('destroy');
            });
            it('Intentar volver a destruir el objeto debe dar error', () => {
                expect(() => {
                    $autocomplete.rup_select('destroy');
                }).toThrowError();
                expect(() => {
                    $autocomplete2.rup_select('destroy');
                }).toThrowError();
            });
        });
    });
});