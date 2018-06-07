/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.autocomplete';

describe('Test Autocomplete > ', () => {
    var $autocomplete, $autocomplete2, $autocompleteLabel, $autocompleteLabel2;
    beforeEach(() => {
        let html = '<input type="text" id="exampleAutocomplete">\
                    <input type="text" id="exampleAutocompleteDos">\
                    <input type="text" id="exampleAutocompleteTres">';
        $('body').append(html);
        let sourceJson = [
            {i18nCaption: 'ab', value: 'ab_value'},
            {i18nCaption: 'tc', value: 'tc_value'},
            {i18nCaption: 'ud', value: 'ud_value'},
            {i18nCaption: 'le', value: 'le_value'},
            {i18nCaption: 'af', value: 'af_value'},
            {i18nCaption: 'mg', value: 'mg_value'},
            {i18nCaption: 'ah', value: 'ah_value'},
            {i18nCaption: 'ui', value: 'ui_value'},
            {i18nCaption: 'uj', value: 'uj_value'},
            {i18nCaption: 'ak', value: 'ak_value'}
        ];
        $('#exampleAutocomplete').rup_autocomplete({
            source: sourceJson,
            defaultValue: 'a',
            contains: false,
            delay: 0
        });
        $('#exampleAutocompleteDos').rup_autocomplete({
            source: sourceJson,
            defaultValue: 'a',
            contains: true,
            delay: 0
        });
        $('#exampleAutocompleteTres').rup_autocomplete({
            source: 'api/autocomplete/remote',
            sourceParam: {
                label: 'descEs',
                value: 'code'
            },
            minLength: 4
        });
        $autocomplete = $('#exampleAutocomplete');
        $autocomplete2 = $('#exampleAutocompleteDos');
        $autocomplete3 = $('#exampleAutocompleteTres');
        $autocompleteLabel = $('#exampleAutocomplete_label');
        $autocompleteLabel2 = $('#exampleAutocompleteDos_label');
        $autocompleteLabel3 = $('#exampleAutocompleteTres_label');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('El elemento html debe presentar cambios', () => {
            expect($autocomplete.attr('ruptype')).toBe('autocomplete');
            expect($autocomplete.prev().hasClass('rup-autocomplete_label ui-autocomplete-input')).toBeTruthy();
            expect($autocomplete2.attr('ruptype')).toBe('autocomplete');
            expect($autocomplete2.prev().hasClass('rup-autocomplete_label ui-autocomplete-input')).toBeTruthy();
            expect($autocomplete3.attr('ruptype')).toBe('autocomplete');
            expect($autocomplete3.prev().hasClass('rup-autocomplete_label ui-autocomplete-input')).toBeTruthy();
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método on > ', () => {
            beforeEach(() => {
                //setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('off');
                    $autocompleteLabel.rup_autocomplete('on');
                    $autocompleteLabel.rup_autocomplete('search', 'u');
                    $autocompleteLabel2.rup_autocomplete('close');
                    $autocompleteLabel2.rup_autocomplete('off');
                    $autocompleteLabel2.rup_autocomplete('on');
                    $autocompleteLabel2.rup_autocomplete('search', 'u');
                    $autocompleteLabel3.rup_autocomplete('close');
                    $autocompleteLabel3.rup_autocomplete('off');
                    $autocompleteLabel3.rup_autocomplete('on');
                    $autocompleteLabel3.rup_autocomplete('search', 'u');
                //}, 1500);
            });
            it('Debe mostrarse el menu', () => {
                //setTimeout(() => {
                    expect($('#exampleAutocomplete_menu').is(':visible')).toBeTruthy();
                    expect($('#exampleAutocompleteDos_menu').is(':visible')).toBeTruthy();
                    expect($('#exampleAutocompleteTres_menu').is(':visible')).toBeTruthy();
                //}, 1500);
            });
        });
        describe('Método off > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('on');
                    $autocompleteLabel.rup_autocomplete('off');
                    $autocompleteLabel.rup_autocomplete('search', 'u');
                    $autocompleteLabel2.rup_autocomplete('close');
                    $autocompleteLabel2.rup_autocomplete('on');
                    $autocompleteLabel2.rup_autocomplete('off');
                    $autocompleteLabel2.rup_autocomplete('search', 'u');
                }, 1500);
            });
            it('Debe mostrarse el menu', () => {
                setTimeout(() => {
                    expect($('#exampleAutocomplete_menu').is(':visible')).toBeFalsy();
                    expect($('#exampleAutocompleteDos_menu').is(':visible')).toBeFalsy();
                }, 1500);
            });
        });
        describe('Método option > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('option', 'combobox', true);
                    $autocompleteLabel2.rup_autocomplete('close');
                    $autocompleteLabel2.rup_autocomplete('option', 'combobox', true);
                }, 1500);
            });
            it('Debe tener la clase de combobox', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.hasClass('rup-combobox-input')).toBeTruthy();
                    expect($autocompleteLabel2.hasClass('rup-combobox-input')).toBeTruthy();
                }, 1500);
            });
        });
        describe('Método search > ', () => {
            describe('Empieza por una letra > ', () => {
                beforeEach(() => {
                    setTimeout(() => {
                        $autocomplete.rup_autocomplete('close');
                        $autocomplete.rup_autocomplete('search', 'u');
                        $autocomplete2.rup_autocomplete('close');
                        $autocomplete2.rup_autocomplete('search', 'u');
                    }, 1500);
                });
                it('Deben mostrarse ambos autocomplete:', () => {
                    setTimeout(() => {
                        expect($('#exampleAutocomplete_menu').is(':visible')).toBe(true);
                        expect($('#exampleAutocompleteDos_menu').is(':visible')).toBe(true);
                    }, 1500);
                });
            });
            describe('Contiene una letra > ', () => {
                beforeEach(() => {
                    setTimeout(() => {
                        $autocomplete.rup_autocomplete('close');
                        $autocomplete.rup_autocomplete('search', 'j');
                        $autocomplete2.rup_autocomplete('close');
                        $autocomplete2.rup_autocomplete('search', 'j');
                    }, 1500);
                });
                it('Solo debe mostrarse el segundo autocomplete:', () => {
                    setTimeout(() => {
                        expect($('#exampleAutocomplete_menu').is(':visible')).toBe(false);
                        expect($('#exampleAutocompleteDos_menu').is(':visible')).toBe(true);
                    }, 1500);
                });
            });
        });
        describe('Método close > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                }, 1500);
            });
            it('Deben mostrarse la opciones', () => {
                setTimeout(() => {
                    expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
                }, 1500);
            });
        });
        describe('Método val > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('search', 'ui');
                }, 1500);
            });
            it('Debe devolver el valor seleccionado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.rup_autocomplete('val')).toBe('ui_value');
                }, 1500);
            });
        });
        describe('Método set > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('set', 'ui', 'ui_value');
                }, 1500);
            });
            it('Debe devolver el valor seleccionado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.rup_autocomplete('val')).toBe('ui_value');
                }, 1500);
            });
        });
        describe('Método getRupValue > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('set', 'ui', 'ui_value');
                }, 1500);
            });
            it('Debe devolver el valor seleccionado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.rup_autocomplete('getRupValue')).toBe('ui_value');
                }, 1500);
            });
        });
        describe('Método setRupValue > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('close');
                    $autocompleteLabel.rup_autocomplete('setRupValue', 'ui_value');
                }, 1500);
            });
            it('Debe devolver el valor seleccionado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.rup_autocomplete('getRupValue')).toBe('ui_value');
                }, 1500);
            });
        });
        describe('Método disable > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('disable');
                }, 1500);
            });
            it('Debe tener el atributo de deshabilitado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.attr('disabled')).toBe('disabled');
                }, 1500);
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocompleteLabel.rup_autocomplete('disable');
                    $autocompleteLabel.rup_autocomplete('enable');
                }, 1500);
            });
            it('Debe tener el atributo de deshabilitado', () => {
                setTimeout(() => {
                    expect($autocompleteLabel.attr('disabled')).toBeUndefined();
                }, 1500);
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $autocomplete.rup_autocomplete('destroy');
                    $autocomplete2.rup_autocomplete('destroy');
                }, 1500);
            });
            it('Intentar volver a destruir el objeto debe dar error', () => {
                setTimeout(() => {
                    expect(() => {
                        $autocomplete.rup_autocomplete('destroy');
                    }).toThrowError();
                    expect(() => {
                        $autocomplete2.rup_autocomplete('destroy');
                    }).toThrowError();
                }, 1500);
            });
        });
    });
});