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
	  	console.log('Init CustomSelection');
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
	        let itemsData = {
	          selected: data || [],
	          all: this.$element.find("option") || []
	        };
	        // Pass selected and all items to display method
	        // which calls templateSelection
	        formatted = this.display(itemsData, $rendered);
	      }

	      $rendered.empty().append(formatted);
	      $rendered.prop('title', formatted);
	    };

	    return adapter;;
		    }
		);
  $.fn.select2.amd.define("CustomSelectAllAdapter",[
	  'select2/utils',
	  'select2/dropdown',
	  'select2/dropdown/attachBody'
	], function (Utils, Dropdown, AttachBody) {
	  function SelectAll() { }
	  
	  var SelectAll = Utils.Decorate(Dropdown, AttachBody);

	  SelectAll.prototype.render = function (decorated) {
		 console.log('Select all');
	    var $rendered = decorated.call(this);
	    var self = this;

	    var $selectAll = $(
	      '<button type="button">Select All</button>'
	    );

	    var checkOptionsCount = function()  {
	      var count = $('.select2-results__option').length;
	      $selectAll.prop('disabled', count > 25);
	    }
	    
	    
	    var $container = $('.select2-container');
	    $container.bind('keyup click', checkOptionsCount);

	    var $dropdown = $rendered.find('.select2-dropdown')

	    
	    $dropdown.prepend($selectAll);

	    $selectAll.on('click', function (e) {
	      var $results = $rendered.find('.select2-results__option[aria-selected=false]');
	      
	      // Get all results that aren't selected
	      $results.each(function () {
	        var $result = $(this);
	        
	        // Get the data object for it
	        var data = $result.data('data');
	        
	        // Trigger the select event
	        self.trigger('select', {
	          data: data
	        });
	      });
	      
	      self.trigger('close');
	    });
	    
	    return $rendered;
	  }; 
  });
  
  $.fn.extend({
	    select2MultiCheckboxes: function() {
	      var options = $.extend({
	        placeholder: 'Choose elements',
	        templateSelection: function(selected, total) {
	          return selected.length + ' > ' + total + ' total';
	        },
	        wrapClass: 'wrap',
	        minimumResultsForSearch: -1,
	        searchMatchOptGroups: true
	      }, arguments[0]);
	      options.templateSelection = function(datos, span) {
	          return  ' Seleccionado(s) '+datos.selected.length + ' de ' + datos.all.length;
	      };
	      //options.multiple = false;
	     
	      options.selectionAdapter = $.fn.select2.amd.require("CustomSelectionAdapter");
	      options.dropdownAdapter = $.fn.select2.amd.require("CustomSelectAllAdapter");

	      $('#' + options.id).select2(options);
	    }
	  });
  
})(jQuery);