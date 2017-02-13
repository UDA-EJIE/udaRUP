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
			"jquery-file-download",
			"jquery-ui/widget",
            "rup/widget",
            "rup/utils",
            "rup/table",
            "templates",
            "Chart",
            "utilidades"
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

    $.widget("rup.widget_custom", $.rup.widget, {
        options:{
            path: "widgets",
            widgetName: null,
            templateObj: null,
            require: null,
            jsonObj:null,
            reloadButton:false,
            defaultWidth:null,
            defaultHeight:null
        },
        _preInitializeContainer: function(){
            var $self = this,
                ops = $self.options;

            if (ops.require!==null){
                templateObj = $.rup_utils.getTemplateObj(ops.templateObj, require(ops.require));
            }else{
                templateObj = $.rup_utils.getTemplateObj(ops.templateObj);
            }

            $self._configure = $self._configure || {};

            $self._configure.template = templateObj[ops.widgetName+"/config/template"];

            $self._configure.data = $.rup_utils.getTemplateObj("Json")[ops.widgetName+"/config/data_"+$.rup.i18n.getLanguage()];

            $self._configure.script = ops.path+"/"+ops.widgetName+"/config/script.js";

//            $self._configure.script = $.rup_utils.getTemplateObj("Scripts")[ops.widgetName+"/config/script"];

//            this._getScript(ops.configScript, function(){
//                $.proxy(callback)($el);
//            });

        },
        _initializeBody: function(){
            var $self = this,
                $el = $self.element,
                ops = this.options,
                template,
                templateObj,
                i18nJson,
                script;


            if (ops.require!==null){
                templateObj = $.rup_utils.getTemplateObj(ops.templateObj, require(ops.require));
            }else{
                templateObj = $.rup_utils.getTemplateObj(ops.templateObj);
            }

            template = templateObj[ops.widgetName+"/template"];

            i18nJson = $.rup_utils.getTemplateObj("Json")[ops.widgetName+"/data_"+$.rup.i18n.getLanguage()];

            $self.$ui.$widgetBody.append(template(i18nJson));

            //script = $.rup_utils.getTemplateObj("Scripts")[ops.widgetName+"/script"];

//            $.proxy(script.callback, $self)($el, i18nJson);
            if (null!==ops.defaultHeight)
                $($el.parent()).attr("data-default-height",ops.defaultHeight);
            if (null!==ops.defaultWidth)
                $($el.parent()).attr("data-default-width",ops.defaultWidth);

            $self._getScript(ops.path+"/"+ops.widgetName+"/script.js").done(function(){
                $.proxy(callback)($el, i18nJson);
                delete callback;
            });
        }
    });


    $.widget.bridge("rup_widget_custom", $.rup.widget_custom);

}));
