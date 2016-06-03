App.Views = App.Views || {};

App.Views.Autocomplete = Backbone.View.extend({
    el: '#container',
    render: renderAutocompleteView,
    languageList: [],
    initialize: function(){
        this.languageList = [
			{i18nCaption: "asp", value:"asp_value"},
			{i18nCaption: "c", value:"c_value"},
			{i18nCaption: "c++", value:"c++_value"},
			{i18nCaption: "coldfusion", value:"coldfusion_value"},
			{i18nCaption: "groovy", value:"groovy_value"},
			{i18nCaption: "haskell", value:"haskell_value"},
			{i18nCaption: "java", value:"java_value"},
			{i18nCaption: "javascript", value:"javascript_value"},
			{i18nCaption: "perl", value:"perl_value"},
			{i18nCaption: "php", value:"php_value"},
			{i18nCaption: "python", value:"python_value"},
			{i18nCaption: "ruby", value:"ruby_value"},
			{i18nCaption: "scala", value:"scala_value"}
		];
    }
});

function renderAutocompleteView(){
    
    var template = App.Templates["app/components/autocomplete/autocomplete.hbs"];
    this.$el.html(template({}));

    $("#autocomplete").rup_autocomplete({
		source : this.languageList,
		defaultValue : "java",
		contains : false
	});
	
	$("#patron").rup_autocomplete({
		source : "autocomplete/remote",
		sourceParam : {
            label:"desc"+$.rup_utils.capitalizedLang(), 
            value:"code"
        },
		minLength: 4
	});
	
	$("#comboboxLocal").rup_autocomplete({
		source : this.languageList,
		contains : false,
		combobox: true,
		minLength:0
	});

	
}