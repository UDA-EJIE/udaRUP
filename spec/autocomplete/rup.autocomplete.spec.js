import 'jquery';
import 'jasmine-jquery';
import 'rup.autocomplete';

describe('Test Autocomplete > ', () => {
    var $autocomplete;
    beforeEach(() => {
		let html = '<input type="text" id="exampleAutocomplete">';
		$('body').append(html);
        let sourceJson = [
            { i18nCaption:'ab', value:'ab_value' },
            { i18nCaption:'tc', value:'tc_value' },
            { i18nCaption:'ud', value:'ud_value' },
            { i18nCaption:'le', value:'le_value' },
            { i18nCaption:'af', value:'af_value' },
            { i18nCaption:'mg', value:'mg_value' },
            { i18nCaption:'ah', value:'ah_value' },
            { i18nCaption:'ui', value:'ui_value' },
            { i18nCaption:'uj', value:'uj_value' },
            { i18nCaption:'ak', value:'ak_value' }
        ];
		$('#exampleAutocomplete').rup_autocomplete({
			source: sourceJson,
			defaultValue: 'a',
			contains: false,
			delay:0
		});
		$autocomplete = $('#exampleAutocomplete');
		$autocompleteLabel = $('exampleAutocomplete_label');
    });
    afterEach(() => {
      	$('body').html('');
    });
    describe('Creación > ', () => {
		it('El elemento html debe presentar cambios', () => {
			setTimeout(() => {
				expect($autocomplete.attr('ruptype')).toBe('autocomplete');
				expect($autocomplete.hasClass('rup-autocomplete_label ui-autocomplete-input')).toBeTruthy();
			}, 1500);
		});
    });
    describe('Métodos públicos > ', () => {
        describe('Método on > ', () => {
            beforeEach(() => {
				setTimeout(() => {
					$autocompleteLabel.rup_autocomplete('close');
					$autocompleteLabel.rup_autocomplete('off');
					$autocompleteLabel.rup_autocomplete('on');
					$autocompleteLabel.rup_autocomplete('search','u');
				}, 1500);
            });
            it('Debe mostrarse el menu', () => {
				setTimeout(() => {
					expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
				}, 1500);
            });
        });
        describe('Método off > ', () => {
            beforeEach(() => {
				setTimeout(() => {
					$autocomplete.rup_autocomplete('close');
					$autocomplete.rup_autocomplete('on');
					$autocomplete.rup_autocomplete('off');
					$autocomplete.rup_autocomplete('search','u');
				}, 1500);
            });
            it('Debe mostrarse el menu', () => {
                expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
            });
        });
        describe('Método option > ', () => {
            beforeEach(() => {
				setTimeout(() => {
					$autocompleteLabel.rup_autocomplete('close');
                	$autocompleteLabel.rup_autocomplete('option', 'combobox', true);
				}, 1500);
            });
            it('Debe tener la clase de combobox', () => {
				setTimeout(() => {
					expect($autocompleteLabel.hasClass('rup-combobox-input')).toBeTruthy();
				}, 1500);
            });
        });
        describe('Método search > ', () => {
            beforeEach(() => {
				setTimeout(() => {
					$autocompleteLabel.rup_autocomplete('close');
                	$autocompleteLabel.rup_autocomplete('search', 'u');
				}, 1500);
            });
            it('Deben mostrarse la opciones', () => {
				setTimeout(() => {
					expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
				}, 1500);
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
            beforeEach(()=> {
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
            beforeEach(()=> {
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
            beforeEach(()=> {
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
            beforeEach(()=> {
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
					$autocompleteLabel.rup_autocomplete('destroy');
				}, 1500);
            });
            it('Intentar volver a destruir el objeto debe dar error', () => {
                expect(() => {
                    $autocompleteLabel.rup_autocomplete('destroy');
                }).toThrowError();
            });
        });
    });
});
