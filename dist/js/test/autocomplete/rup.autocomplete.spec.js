/* jslint multistr: true */
/* eslint-env jasmine, jquery */



var $autocomplete, $autocomplete2, $autocomplete3, $autocompleteLabel, $autocompleteLabel2, $autocompleteLabel3;

function createAutocomplete(done) {
    let html = '<input type="text" id="exampleAutocomplete">\
                <input type="text" id="exampleAutocompleteDos">\
                <input type="text" id="exampleAutocompleteTres">';

    $('#content').append(html);

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
        source: 'demo/autocomplete/remote',
        sourceParam: {
            label: 'label',
            value: 'value'
        },
        minLength: 4
    });
    $autocomplete = $('#exampleAutocomplete');
    $autocomplete2 = $('#exampleAutocompleteDos');
    $autocomplete3 = $('#exampleAutocompleteTres');
    $autocompleteLabel = $('#exampleAutocomplete_label');
    $autocompleteLabel2 = $('#exampleAutocompleteDos_label');
    $autocompleteLabel3 = $('#exampleAutocompleteTres_label');

    done();
}


describe('Test Autocomplete > ', () => {
    beforeAll((done) => {
        if ($('#content').length == 0) {
            $('body').append('<div id="content" class="container mt-4"></div>');
        }
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        createAutocomplete(done);
    });
    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
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
            describe('Autocomplete > ', () => {
                beforeEach(() => {
                    $('body').trigger('mousedown');
                    $autocomplete.rup_autocomplete('off');
                    $autocomplete.rup_autocomplete('on');
                    $autocomplete.rup_autocomplete('search', 'u');
                });
                it('Deben mostrarse el menu', () => {
                    expect($('#exampleAutocomplete_menu').is(':visible')).toBeTruthy();
                });
            });
            describe('Autocomplete2 > ', () => {
                beforeEach(() => {
                    $autocomplete2.rup_autocomplete('off');
                    $autocomplete2.rup_autocomplete('on');
                    $autocomplete2.rup_autocomplete('search', 'u');
                });
                it('Deben mostrarse el menu', () => {
                    expect($('#exampleAutocompleteDos_menu').is(':visible')).toBeTruthy();
                });

            });
            describe('Autocomplete3 > ', () => {
                beforeEach(() => {
                    $autocomplete3.rup_autocomplete('off');
                    $autocomplete3.rup_autocomplete('on');
                    $autocomplete3.rup_autocomplete('search', 'u');
                });
                it('No deben mostrarse el menu', () => {
                    expect($('#exampleAutocompleteTres_menu').is(':visible')).toBeFalsy();
                });
                
            });
        });
        describe('Método off > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocompleteLabel.rup_autocomplete('off');
                $autocompleteLabel.rup_autocomplete('search', 'u');

                $autocomplete2.rup_autocomplete('off');
                $autocomplete2.rup_autocomplete('search', 'u');

                $autocomplete3.rup_autocomplete('off');
                $autocomplete3.rup_autocomplete('search', 'u');
            });
            it('Debe mostrarse el menu', () => {
                expect($('#exampleAutocomplete_menu').is(':visible')).toBeFalsy();
                expect($('#exampleAutocompleteDos_menu').is(':visible')).toBeFalsy();
                expect($('#exampleAutocompleteTres_menu').is(':visible')).toBeFalsy();
            });
        });
        describe('Método option > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocomplete.rup_autocomplete('option', 'combobox', true);
                $autocomplete2.rup_autocomplete('option', 'combobox', true);
                $autocomplete3.rup_autocomplete('option', 'combobox', true);
            });
            it('Debe tener la clase de combobox', () => {
                expect($autocompleteLabel.hasClass('rup-combobox-input')).toBeTruthy();
                expect($autocompleteLabel2.hasClass('rup-combobox-input')).toBeTruthy();
                expect($autocompleteLabel3.hasClass('rup-combobox-input')).toBeTruthy();
            });
        });
        describe('Método search > ', () => {
            describe('Empieza por una letra > ', () => {
                describe('Autocomplete > ', () => {
                    beforeEach(() => {
                        $autocomplete.rup_autocomplete('search', 'u');
                    });
                    it('Deben mostrarse autocomplete', () => {
                        expect($('#exampleAutocomplete_menu').is(':visible')).toBe(true);
                    });
                });

                describe('Autocomplete2 > ', () => {
                    beforeEach(() => {
                        $autocomplete2.rup_autocomplete('search', 'u');
                    });
                    it('Deben mostrarse autocomplete', () => {
                        expect($('#exampleAutocompleteDos_menu').is(':visible')).toBe(true);
                    });
                });

                describe('Autocomplete3 > ', () => {
                    beforeEach(() => {
                        $autocomplete3.rup_autocomplete('search', 'u');
                    });
                    it('Deben no mostrarse autocomplete', () => {
                        expect($('#exampleAutocompleteTres_menu').is(':visible')).toBe(false);
                    });
                });
            });
            describe('Contiene una letra > ', () => {
                beforeEach(() => {
                    $('body').trigger('mousedown');

                    $autocomplete.rup_autocomplete('search', 'a');
                    $autocomplete2.rup_autocomplete('search', 'j');
                });
                it('Solo debe mostrarse el segundo autocomplete:', () => {
                    expect($('#exampleAutocomplete_menu').is(':visible')).toBe(false);
                    expect($('#exampleAutocompleteDos_menu').is(':visible')).toBe(true);
                });
            });
        });
        describe('Método close > ', () => {
            beforeEach(() => {
                $autocomplete.rup_autocomplete('close');
            });
            it('Deben mostrarse la opciones', () => {
                expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
            });
        });
        describe('Método val > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocompleteLabel.rup_autocomplete('search', 'ui');
                $autocompleteLabel.blur();
            });
            it('Debe devolver el valor seleccionado', () => {
                expect($('#exampleAutocomplete').rup_autocomplete('val')).toBe('ui_value');
            });
        });
        describe('Método set > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocomplete.rup_autocomplete('set', 'ui_value', 'ui');
            });
            it('Debe devolver el valor seleccionado', () => {
                expect($autocomplete.rup_autocomplete('val')).toBe('ui_value');
            });
        });
        describe('Método setRupValue y getRupValue > ', () => {
            beforeEach(() => {
                $('body').trigger('mousedown');
                $autocomplete.rup_autocomplete('setRupValue', 'ui_value');
            });
            it('Debe devolver el valor seleccionado', () => {
                expect($autocomplete.rup_autocomplete('getRupValue')).toBe('ui_value');
            });
        });
        describe('Método disable > ', () => {
            beforeEach(() => {
                $autocomplete.rup_autocomplete('disable');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                expect($autocompleteLabel.attr('disabled')).toBe('disabled');
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                $autocomplete.rup_autocomplete('disable');
                $autocomplete.rup_autocomplete('enable');
            });
            it('Debe tener el atributo de deshabilitado', () => {
                expect($autocomplete.attr('disabled')).toBeUndefined();
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                $autocomplete.rup_autocomplete('destroy');
                $autocomplete2.rup_autocomplete('destroy');
            });
            it('Intentar volver a destruir el objeto debe dar error', () => {
                expect(() => {
                    $autocomplete.rup_autocomplete('destroy');
                }).toThrowError();
                expect(() => {
                    $autocomplete2.rup_autocomplete('destroy');
                }).toThrowError();
            });
        });
    });
});