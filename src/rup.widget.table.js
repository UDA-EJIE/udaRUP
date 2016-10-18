/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */
 
 
;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"jquery-ui/widget",
            "rup/widget",
            "rup/table"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function($) {
 
    // define our widget under a namespace of your choice
    // with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );
 
    $.widget("rup.widget_table", $.rup.widget, {
        options:{
            url: "http://desarrollo.jakina.ejiedes.net:7001/y52bInteraccionWar/solicitudes/filter"    
        },
        _initializeBody: function(){
            var $self = this, $tableContainer = $("<div>");
            
            $self.showLoading();
            
            this.element.find(".widget-body").append($tableContainer);
            
            $tableContainer.rup_table();
            
            $tableContainer.on("ajaxLoaded", function(){
                $self.hideLoading();
            });
        }
    });
    
    $.widget.bridge("rup_widget_table", $.rup.widget_table);
    
}));