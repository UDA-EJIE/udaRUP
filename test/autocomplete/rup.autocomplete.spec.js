describe("RUP Autocomplete Tests", function(){

  var source, template, $content, $autocomplete;

  beforeAll(function(){
    source = $("#autocompleteTemplate").html();
    template = Handlebars.compile(source);
    $content = $("#content");

    var templateJson={};

    $content.html(template(templateJson));

    $autocomplete = $("#autocomplete");

    $autocomplete.rup_autocomplete({});

  });

  describe("Creación de un autocomplete local", function(){

    beforeAll(function(){
      var source = [
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

      $autocomplete.rup_autocomplete({
    		source : source,
    		defaultValue : "java",
    		contains : false
    	});
    });

    it("debería de inicializarse el RUP Autocomplete", function(){
      debugger;
    });



  });


});
