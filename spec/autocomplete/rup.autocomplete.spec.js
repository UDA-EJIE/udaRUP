//
//
// (function (factory) {
//       if (typeof define === "function" && define.amd) {
//
//           // AMD. Register as an anonymous module.
//           define(['jquery','handlebars','rup.autocomplete'], factory);
//       } else {
//
//           // Browser globals
//           factory(jQuery);
//       }
//   }(function ($, Handlebars) {


	import 'jquery';
	import Handlebars from 'handlebars';
	import 'jasmine-jquery';
	import 'rup.autocomplete';

	describe('RUP Autocomplete Tests', function(){

		var source, template, $content, $autocomplete, idAutocomplete='autocomplete';

		beforeAll(function(){

			var sourceTemplate = '<input type="text" id="{{id}}" />';
			template = Handlebars.compile(sourceTemplate);
			$content = $('#content');

			var templateJson={
				id:idAutocomplete
			};

			$content.html(template(templateJson));

			$autocomplete = $('#idAutocomplete');

			var sourceJson = [
				{i18nCaption: 'asp',        value:'asp_value'},
				{i18nCaption: 'c',          value:'c_value'},
				{i18nCaption: 'c++',        value:'c++_value'},
				{i18nCaption: 'coldfusion', value:'coldfusion_value'},
				{i18nCaption: 'groovy',     value:'groovy_value'},
				{i18nCaption: 'haskell',    value:'haskell_value'},
				{i18nCaption: 'java',       value:'java_value'},
				{i18nCaption: 'javascript', value:'javascript_value'},
				{i18nCaption: 'perl',       value:'perl_value'},
				{i18nCaption: 'php',        value:'php_value'},
				{i18nCaption: 'python',     value:'python_value'},
				{i18nCaption: 'ruby',       value:'ruby_value'},
				{i18nCaption: 'scala',      value:'scala_value'}
			];

			$autocomplete.rup_autocomplete({
				source :       sourceJson,
				defaultValue : 'java',
				contains :     false
			});

		});

		describe('Creación de un autocomplete local', function(){
			it('debe estar definido', () => {
				expect($autocomplete).toBeDefined();
			});
			it("debería de inicializarse el RUP Autocomplete", function(){
			  expect($autocomplete).toHaveAttr("ruptype","autocomplete");
			  expect($autocomplete).toHaveClass("rup-autocomplete_label ui-autocomplete-input");
			  expect($autocomplete.data("ui-autocomplete")).not.toBe(undefined);
			});

			it("deberia de tener un id con sufijo '_label'", function(){
			  expect($autocomplete).toHaveId(idAutocomplete+"_label");
			});

			it("debería de generarse el hidden que contenga el value del RUP Autocomplete", function(){
			  var $hiddenAutocomplete = $("#"+idAutocomplete);
			  expect($hiddenAutocomplete).toExist();
			  expect($hiddenAutocomplete).toEqual("input[type='hidden']");
			});

		});
		describe('Test de métodos públicos', () => {
			generalFunc($autocomplete,[
				'getRupValue',
				'setRupValue',
				'destroy',
				'enable',
				'disable'
			]);
			describe('Metodos On y Off', () => {
				it('metodo off no debe lanzar excepcion', () => {
					expect($autocomplete.rup_autocomplete('off')).not.toThrowError();
				});
				it('metodo on no debe lanzar excepcion', () => {
					expect($autocomplete.rup_autocomplete('off')).not.toThrowError();
				});
			});
			describe('Método option', () => {
				it('cambia el valor de una propiedad: ', () => {
					expect($autocomplete.rup_autocomplete("option", "minLegth", 2)).not.toThrowError();
				});
				it('cambia el valor de varias propiedades: ', () => {
					let options = {minLegth:2, delay:1000};
					expect($autocomplete.rup_autocomplete("option", options)).not.toThrowError();
				});
			});
			describe('Método search:', () => {
				let searchVal;
				beforeAll( () => {
					searchVal = 'ruby';
					$autocomplete.rup_autocomplete('search', searchVal);
				});
				it('Selecciona correctamente el valor indicado', () => {
					expect($autocomplete.val()).toBe(searchVal);
				});
			});
			describe('Método close:', () => {
				it('No debe dar error', () => {
					expect($autocomplete.rup_autocomplete('close')).not.toThrowError();
				});
			});
			describe('Método val', () => {
				beforeAll( () => {
					$autocomplete.rup_autocomplete('search', 'ruby');
				});
				it('Debe devolver el valor especificado', () => {
					expect($autocomplete.rup_autocomplete('val')).toBe('ruby');
				});
			});
			describe('Método set', () => {
				beforeAll( () => {
					$autocomplete.rup_autocomplete('set', '6', 'Otr');
				});
				it('Debe establecer el valor indicado', () => {
					expect($autocomplete.val()).toBe('Otr');
				});
			});
		});

	});
	// }));
