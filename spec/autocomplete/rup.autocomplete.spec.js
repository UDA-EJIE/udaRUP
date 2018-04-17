import 'jquery';
import Handlebars from 'handlebars';
import 'jasmine-jquery';
import 'rup.autocomplete';

describe('RUP Autocomplete Tests', function () {

  var source, template, $content, $autocomplete, idAutocomplete = 'autocomplete';

  beforeAll(function () {

    var sourceTemplate = '<input type="text" id="{{id}}" />';
    template = Handlebars.compile(sourceTemplate);
    $content = $('#content');

    var templateJson = {
      id: idAutocomplete
    };

    $content.html(template(templateJson));

    $autocomplete = $('#' + idAutocomplete);

    var sourceJson = [{
        i18nCaption: 'asp',
        value: 'asp_value'
      },
      {
        i18nCaption: 'c',
        value: 'c_value'
      },
      {
        i18nCaption: 'c++',
        value: 'c++_value'
      },
      {
        i18nCaption: 'coldfusion',
        value: 'coldfusion_value'
      },
      {
        i18nCaption: 'groovy',
        value: 'groovy_value'
      },
      {
        i18nCaption: 'haskell',
        value: 'haskell_value'
      },
      {
        i18nCaption: 'java',
        value: 'java_value'
      },
      {
        i18nCaption: 'javascript',
        value: 'javascript_value'
      },
      {
        i18nCaption: 'perl',
        value: 'perl_value'
      },
      {
        i18nCaption: 'php',
        value: 'php_value'
      },
      {
        i18nCaption: 'python',
        value: 'python_value'
      },
      {
        i18nCaption: 'ruby',
        value: 'ruby_value'
      },
      {
        i18nCaption: 'scala',
        value: 'scala_value'
      }
    ];

    $autocomplete.rup_autocomplete({
      source: sourceJson,
      defaultValue: 'java',
	  contains: false,
	  delay:0
    });

  });

  describe('Creación de un autocomplete local', function () {
    it('debe estar definido', () => {
      expect($autocomplete).toBeDefined();
    });
    it("debería de inicializarse el RUP Autocomplete", function () {
      expect($autocomplete).toHaveAttr("ruptype", "autocomplete");
      expect($autocomplete).toHaveClass("rup-autocomplete_label ui-autocomplete-input");
      expect($autocomplete.data("ui-autocomplete")).not.toBe(undefined);
    });

    it("deberia de tener un id con sufijo '_label'", function () {
      expect($autocomplete).toHaveId(idAutocomplete + "_label");
    });

    it("debería de generarse el hidden que contenga el value del RUP Autocomplete", function () {
      var $hiddenAutocomplete = $("#" + idAutocomplete);
      expect($hiddenAutocomplete).toExist();
      expect($hiddenAutocomplete).toEqual("input[type='hidden']");
    });

  });
  	describe('Test de métodos públicos', () => {
		describe('Métdodo on', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete('close');
				$autocomplete.rup_autocomplete('on');
				$autocomplete.rup_autocomplete('search', 'j');
			});
			it('Debe aparecer el autocomplete', () => {
				expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
			});
		  });
		  describe('Métdodo off', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete('close');
				$autocomplete.rup_autocomplete('off');
				$autocomplete.rup_autocomplete('search', 'j');
			});
			it('Debe aparecer el autocomplete', () => {
				expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
			});
	  	});

    	describe('Método option', () => {
			describe('Cambiar el valor de una propiedad', () => {
				let param = 'r';
				beforeAll(() => {
					$autocomplete.rup_autocomplete('close');
					$autocomplete.rup_autocomplete("option", "minLegth", 2);
				});
				it('No debe mostrar el menu', () => {
					$autocomplete.rup_autocomplete('search', 'r');
					expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
				});
				it('Debe mostrar el menu', () => {
					$autocomplete.rup_autocomplete('search', 'ru');
					expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
				});
			});
      		describe('cambia el valor de varias propiedades: ', () => {
				let options;
				beforeAll(() => {
					options = {
					minLegth: 1,
					contains: false
					};
					$autocomplete.rup_autocomplete('option', options);
					$autocomplete.rup_autocomplete('search', 'j');
				});
				it('Los cambios deben haber hecho efecto',() => {
					console.log($autocomplete.val());
					expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
				});
      		});
    	});

    	describe('Método search:', () => {
			beforeAll(() => {
          		$autocomplete.rup_autocomplete('search', 'ruby');
        	});
      		it('Abre el menú de resultados de búsqueda', () => {
        		expect($('#autocomplete_menu').is(':visible')).toBeTruthy();
      		});
    	});

    	describe('Método close:', () => {
      		beforeAll(() => {
        		$autocomplete.rup_autocomplete('search', 'ru');
        		$autocomplete.rup_autocomplete('close');
      		});
      		it('Cierra el menú de resultados de búsqueda', () => {
        		expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
      		});
   		});

    	describe('Método val', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete("search", "ru");
			});
			it('Debe devolver el valor del elemento seleccionado', () => {
				expect($autocomplete.rup_autocomplete('val')).toBe($autocomplete.val());
			});
    	});

    	describe('Método set', () => {
      		beforeAll(() => {
        		$autocomplete.rup_autocomplete("set", "ruby", "ruby_value");
      		});
      		it('Debe establecer el valor indicado', () => {
        		expect($autocomplete.val()).toBe('ruby');
      		});
    	});

		describe('Método getRupValue:', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete("search", "ruby");
			});
			it('Debe obtener el valor establecido', () => {
				expect($autocomplete.rup_autocomplete('getRupValue')).toBe('ruby');
			});
		});

		describe('Método setRupValue', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete('setRupValue', 'asp');
			});
			it('Debe actualizar el valor:', () => {
				expect($autocomplete.rup_autocomplete('getRupValue')).toBe('asp');
			});
		});

		describe('Método disable', () => {
			beforeAll(() => {
				if ($autocomplete.is(':disabled')) {
					$autocomplete.enable();
				}
				$autocomplete.rup_autocomplete('disable');
			});
			it('Debe poder deshabilitarse', () => {
				expect($autocomplete.is(':disabled')).toBeTruthy();
			});
		});

		describe('Método enable', () => {
			beforeAll(() => {
				if ($autocomplete.is(':enabled')) {
					$autocomplete.disable();
				}
				$autocomplete.rup_autocomplete('enable');
			});
			it('Debe poder habilitarse', () => {
				expect($autocomplete.is('disabled')).toBeFalsy();
			});
		});

		describe('Método destroy', () => {
			beforeAll(() => {
				$autocomplete.rup_autocomplete('destroy');
				$autocomplete.rup_autocomplete('search', 'p');
			});
			it('No debe existir', () => {
				expect($('#autocomplete_menu').is(':visible')).toBeFalsy();
			});
		});
  });

});
