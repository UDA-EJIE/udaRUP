//# sourceURL=select2Multicheckboxes.js
/**
 * jQuery Select2 Multi checkboxes
 * - allow to select multi values via normal dropdown control
 *
 * License     : MIT
 */
(function($) {

  
  $.fn.select2.amd.define("CustomSelectionAdapter",
		    [
		    	"select2/utils",
		        "select2/selection/multiple",
		        "select2/selection/placeholder",
		        "select2/selection/eventRelay",
		        "select2/selection/single",
		    ],
		    function (Utils, MultipleSelection, Placeholder, EventRelay, SingleSelection) {
		        // Here goes the code of this custom adapter
	 // Decorates MultipleSelection with Placeholder
	    let adapter = Utils.Decorate(MultipleSelection, Placeholder);
	    // Decorates adapter with EventRelay - ensures events will continue to fire
	    // e.g. selected, changed
	    adapter = Utils.Decorate(adapter, EventRelay);

	    adapter.prototype.render = function() {
	      // Use selection-box from SingleSelection adapter
	      // This implementation overrides the default implementation
	      let $selection = SingleSelection.prototype.render.call(this);
	      return $selection;
	    };

	    adapter.prototype.update = function(data) {
	      // copy and modify SingleSelection adapter
	      this.clear();

	      let $rendered = this.$selection.find('.select2-selection__rendered');
	      let noItemsSelected = data.length === 0;
	      let formatted = "";

	      if (noItemsSelected) {
	        formatted = this.options.get("placeholder") || "";
	      } else {
	    	let itemsData = {};
	    	if(this.options.options.url != null || this.$element.find("option").length == 0){//remoto
		        itemsData = {
			  	          selected: data || [],
			  	          all: this.container.$results.find('li') || []
			  	        };
	    	}  else{
		        itemsData = {
		  	          selected: data || [],
		  	          all: this.$element.find("option") || []
		  	        };
	    	}

	        // Pass selected and all items to display method
	        // which calls templateSelection
	        formatted = this.display(itemsData, $rendered);
	      }

	      $rendered.empty().append(formatted);
	      $rendered.prop('title', formatted);
	    };

	    return adapter;
		    }
		);
  
  $.fn.select2.amd.define("AutocompleteSelectionAdapter",
		    [
		    	"select2/utils",
		        "select2/selection/multiple",
		        "select2/selection/placeholder",
		        "select2/selection/eventRelay",
		        "select2/selection/single",
		        "select2/selection/search",
		    ],
		    function (Utils, MultipleSelection, Placeholder, EventRelay, SingleSelection, Search) {
		        // Here goes the code of this custom adapter
	 // Decorates MultipleSelection with Placeholder
	    let adapter = Utils.Decorate(MultipleSelection, Placeholder);
	    // Decorates adapter with EventRelay - ensures events will continue to fire
	    // e.g. selected, changed
	    adapter = Utils.Decorate(adapter, EventRelay);

	    adapter.prototype.render = function() {
		      // Use selection-box from SingleSelection adapter
		      // This implementation overrides the default implementation
		      let $selection = SingleSelection.prototype.render.call(this);
		      return $selection;
		    };

	    adapter.prototype.update = function(data) {
	      // copy and modify SingleSelection adapter
	      let textoSearch = this.$selection.find('input').val();
	      this.clear();
	      let $options = this.options;
	      let $rendered = this.$selection.find('.select2-selection__rendered');
	      let $arrow = this.$selection.find('.select2-selection__arrow');
	      let sumador = 0;
	      if(data[0] != undefined && (data[0].id == '' || data[0].id == this.options.options.blank)){
	    	  sumador = 1;
	      }
	      let noItemsSelected = data.length - sumador === 0;
	      let formatted = "";
	      
	      //Construir
	      this.$selection.off('click');
	      $arrow.off('click');
	      if($options.options.combo){
	    	  let $container = this.container.$container;
		      $arrow.on('click', function(){
				  if($container.hasClass('select2-container--open')){
					  $('#'+$options.options.id).select2('close'); 
				  }else{
					  $('#'+$options.options.id).select2('open');
					  $('input.select2-search__field').addClass('d-none');
				  }
			   });
	      }else{
	    	  $arrow.addClass('rup-autocomplete_label ui-autocomplete-input');
	    	  let $bold = this.$selection.find('b');
	    	  $bold.addClass('d-none');
	      }
	      
	      if (noItemsSelected) {
	        formatted = "";
	      } else {
	    	let itemsData = {};
	    	if(this.options.options.url != null || this.$element.find("option").length == 0){//remoto
		        itemsData = {
			  	          selected: data || [],
			  	          all: this.container.$results.find('li') || []
			  	        };
	    	}  else{
		        itemsData = {
		  	          selected: data || [],
		  	          all: this.$element.find("option") || []
		  	        };
	    	}

	        // Pass selected and all items to display method
	        // which calls templateSelection
	        formatted = this.display(itemsData, $rendered);
	      }
	      
		  let input = $("<input/>", {
			  type: "text",
   			  placeholder: $options.options.placeholder,
   			  class: "border-0"
			});
		  if(textoSearch != undefined && textoSearch != ''){
			  input.val(textoSearch);
		  }else{
			  input.val(formatted);
		  }
		  input.off('keyup');
		  input.on('keyup',delay(function(){
			  if(this.value.length >= $options.options.minimumResultsForSearch || (this.value.length == 0 && $options.options.searchZero)){
				  let openLast = false;
				  if($('#' + $options.options.id).select2('isOpen')){
					  openLast = true;
				  }
				 
				  $('#'+$options.options.id).select2('open');
				  $('input.select2-search__field').addClass('d-none');
				  $('input.select2-search__field').val(this.value);
				  if($options.options.url == null || ($options.options.url != null && openLast)){//Si es local
					  $('input.select2-search__field').trigger('keyup');
				  }
				  
			  }
		   },500));
		  
	      $rendered.empty().append(input);
	      input.focus();
	      $rendered.prop('title', formatted);
	    };

	    return adapter;
		    }
		);
  
  $.fn.extend({
	    select2MultiCheckboxes: function() {
	      var options = $.extend({
	        wrapClass: 'wrap'}, arguments[0]);
	      if(!options.autocomplete){
	    	  options = $.extend({
	  	        wrapClass: 'wrap',
	  	        minimumResultsForSearch: -1,
	  	        searchMatchOptGroups: true
	  	      }, arguments[0]);
	    	  options.templateSelection = function(datos, span) {
	    		  let cadena = getBlankLabel(options.id,options);
	    		  return cadena.replace('{0}',datos.selected.length).replace('{1}',datos.all.length);
	    	  };
	    	  options.selectionAdapter = $.fn.select2.amd.require("CustomSelectionAdapter");
	          if (options.placeholder == undefined || options.placeholder == '') {
	               // si es vació se asigna el label
	        	  options.placeholder = options.templateSelection({selected:[],all:[]});
	          }
	      }else if(options.autocomplete){
	    	  if(options.minimumResultsForSearch == undefined || options.minimumResultsForSearch == Infinity){
	    		  options.minimumResultsForSearch = 3;
	      	  }
	    	  options.selectionAdapter = $.fn.select2.amd.require("AutocompleteSelectionAdapter"); 
	    	  options.templateSelection = function(datos, span) {
	    		  if(!options.multiple){
	    			  return datos.selected[0].text;
	    		  }
	    		  return  ' Seleccionado(s) '+datos.selected.length + ' de ' + datos.all.length;
	          
	    	  };
	      }

	      $('#' + options.id).select2(options);
	    }
	  });
  function delay(callback, ms) {
	  var timer = 0;
	  return function() {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      callback.apply(context, args);
	    }, ms || 0);
	  };
	} 
  
  function getBlankLabel(id, options) {
      var app = $.rup.i18n.app;
      // Comprueba si el select tiene su propio texto personalizado
      if (app[id] && app[id]._blank) {
          return app[id]._blank;
      }
      // Comprueba si la aplicacion tiene un texto definido para todos los
		// blank
      else if (app.rup_select && app.rup_select.blank) {
          return app.rup_select.blank;
      }
      // Si no hay textos definidos para los blank obtiene el por defecto
		// de UDA
      if(options != undefined && options.multiple){
    	  return $.rup.i18n.base.rup_select.multiselect.selectedText;
      }
      return $.rup.i18n.base.rup_select.blankNotDefined;
  }
  
})(jQuery);