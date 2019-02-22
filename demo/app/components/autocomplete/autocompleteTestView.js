define(['marionette',
	'./autocompleteTestTemplate.hbs',
	'rup.autocomplete','rup.button'], function(Marionette, AutocompleteTestTemplate){

	var AutocompleteTestView = Marionette.LayoutView.extend({
		template: AutocompleteTestTemplate,
		ui:{
			autocompleteLocal: '#autocomplete',
			autocompleteRemote: '#patron',
			comboboxLocal: '#comboboxLocal',
			comboboxRemote: '#comboboxRemoto',
		},
		languageList:[],
		initialize: fncInitialize,
		onAttach: fncOnAttach

	});

	function fncInitialize(){
		this.languageList = [
			{i18nCaption: 'asp', value:'asp_value'},
			{i18nCaption: 'c', value:'c_value'},
			{i18nCaption: 'c++', value:'c++_value'},
			{i18nCaption: 'coldfusion', value:'coldfusion_value'},
			{i18nCaption: 'groovy', value:'groovy_value'},
			{i18nCaption: 'haskell', value:'haskell_value'},
			{i18nCaption: 'java', value:'java_value'},
			{i18nCaption: 'javascript', value:'javascript_value'},
			{i18nCaption: 'perl', value:'perl_value'},
			{i18nCaption: 'php', value:'php_value'},
			{i18nCaption: 'python', value:'python_value'},
			{i18nCaption: 'ruby', value:'ruby_value'},
			{i18nCaption: 'scala', value:'scala_value'}
		];
	}

	function fncOnAttach(){

		this.ui.autocompleteLocal.rup_autocomplete({
			source : this.languageList,
			defaultValue : 'java',
			contains : false,
			menuMaxHeight: 40
		});

		this.ui.autocompleteRemote.rup_autocomplete({
			source : 'api/autocomplete/remote',
			sourceParam : {
				label:'desc'+$.rup_utils.capitalizedLang(),
				value:'code'
			},
			minLength: 4
		});

		this.ui.comboboxLocal.rup_autocomplete({
			source : this.languageList,
			contains : false,
			combobox: true,
			minLength:0
		});

		this.ui.comboboxRemote.rup_autocomplete({
			source : 'api/autocomplete/remote',
			sourceParam : {label:'desc'+$.rup_utils.capitalizedLang(), value:'code'},
			minLength: 4,
			combobox: true
		});
	}


	return AutocompleteTestView;
});
