
        ( function( factory ) {
         if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( ["handlebars" ], factory );
         } else {

            // Browser globals
            factory( Handlebars );
         }
        } ( function( Handlebars ) {
          this["Rup"] = this["Rup"] || {};
this["Rup"]["Templates"] = this["Rup"]["Templates"] || {};
this["Rup"]["Templates"]["rup"] = this["Rup"]["Templates"]["rup"] || {};
this["Rup"]["Templates"]["rup"]["button"] = this["Rup"]["Templates"]["rup"]["button"] || {};
this["Rup"]["Templates"]["rup"]["button"]["dropdownButton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\" type=\"button\">\n  <i class=\"mdi mdi-menu-down\" aria-hidden=\"true\"></i>\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton-container"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\">\n  <ul role=\"menu\" aria-activedescendant=\"active-menuitem\" aria-labelledby=\"active-menuitem\">\n    <li style=\"display: block;\">\n      <button type=\"button\" class=\"btn-material btn-material-primary-high-emphasis rup-toolbar_button rup-button rup-toolbar_menuButtonElement\" id=\"toolbar##mbuton1##nuevo\">\n        <span class=\"mdi mdi-plus\"></span>\n        <span class=\"rup-ui-button-text\">\n        	"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_button.new",{"name":"i18n","hash":{},"data":data}))
    + "\n        </span>\n      </button>\n    </li>\n  </ul>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n  class=\"btn-material btn-material-primary-high-emphasis rup-toolbar_menuButton rup-toolbar_menuButtonSlided\"\n  role=\"button\"\n  href=\"#\">\n  	"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\n  	<span class=\"mdi "
    + alias4(((helper = (helper = helpers.iconClasses || (depth0 != null ? depth0.iconClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconClasses","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=\"true\"></span>\n</button>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["dashboard"] = this["Rup"]["Templates"]["rup"]["dashboard"] || {};
this["Rup"]["Templates"]["rup"]["dashboard"]["item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-gs-min-width=\""
    + container.escapeExpression(((helper = (helper = helpers.minWidth || (depth0 != null ? depth0.minWidth : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"minWidth","hash":{},"data":data}) : helper)))
    + "\" ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-gs-max-width=\""
    + container.escapeExpression(((helper = (helper = helpers.maxWidth || (depth0 != null ? depth0.maxWidth : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"maxWidth","hash":{},"data":data}) : helper)))
    + "\" ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-gs-min-height=\""
    + container.escapeExpression(((helper = (helper = helpers.minHeight || (depth0 != null ? depth0.minHeight : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"minHeight","hash":{},"data":data}) : helper)))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " data-gs-max-height=\""
    + container.escapeExpression(((helper = (helper = helpers.maxHeight || (depth0 != null ? depth0.maxHeight : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"maxHeight","hash":{},"data":data}) : helper)))
    + "\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"grid-stack-item\"  \n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.minWidth : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.maxWidth : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.minHeight : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.maxHeight : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n     data-rup-widget-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\n\n    <div class=\""
    + alias4(((helper = (helper = helpers.itemClass || (depth0 != null ? depth0.itemClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemClass","hash":{},"data":data}) : helper)))
    + "\" >\n\n    </div>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"] = this["Rup"]["Templates"]["rup"]["datatable"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"] = this["Rup"]["Templates"]["rup"]["datatable"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\n  <i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\n  <span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\n    "
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\n  </span>\n</div>\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\n  </div>\n  <div class=\"rup-table-detail-separator separador\"></div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"]["material"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\n	<i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\n  	<span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\n    	"
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\n  	</span>\n</div>\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\n </div>\n<div class=\"rup-table-detail-separator separador\"></div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["pager"] = this["Rup"]["Templates"]["rup"]["datatable"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i></td>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"]["material"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button type=\"button\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\">\n	<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\n	<span>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "<span>\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"] = this["Rup"]["Templates"]["rup"]["table"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"] = this["Rup"]["Templates"]["rup"]["table"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\n  <i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\n  <span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\n    "
    + alias4(((helper = (helper = helpers.numResult || (depth0 != null ? depth0.numResult : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numResult","hash":{},"data":data}) : helper)))
    + "\n  </span>\n</div>\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\n  </div>\n  <div class=\"rup-table-detail-separator separador\"></div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"] = this["Rup"]["Templates"]["rup"]["table"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n  <div id=\"pg_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "_pager\" class=\"ui-pager-control rup_jqtable_pager\" role=\"group\">\n    <div id=\""
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "_left\" class=\"pager_left\"></div>\n    <div id=\""
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "_center\" class=\"pager_center\">\n      <div id=\"first_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.firstPageText || (depth0 != null ? depth0.firstPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstPageText","hash":{},"data":data}) : helper)))
    + "</a>\n      </div>\n      <div id=\"prev_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.prevPageText || (depth0 != null ? depth0.prevPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prevPageText","hash":{},"data":data}) : helper)))
    + "</a>\n      </div>\n      <div id=\"next_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.nextPageText || (depth0 != null ? depth0.nextPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nextPageText","hash":{},"data":data}) : helper)))
    + "</a>\n      </div>\n      <div id=\"last_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.lastPageText || (depth0 != null ? depth0.lastPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastPageText","hash":{},"data":data}) : helper)))
    + "</a>\n      </div>\n\n    </div>\n    <div id=\""
    + alias4(((helper = (helper = helpers.table_pager || (depth0 != null ? depth0.table_pager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"table_pager","hash":{},"data":data}) : helper)))
    + "_right\" class=\"pager_right\">\n      <div class=\"ui-paging-info\">"
    + alias4(((helper = (helper = helpers.resultText || (depth0 != null ? depth0.resultText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultText","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n  </div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"]["jqueryui"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"table_pager\" class=\"ui-state-default ui-jqgrid-pager ui-corner-bottom\" dir=\"ltr\" style=\"width: 100%; height: auto;\">\n  <div id=\"pg_table_pager\" class=\"ui-pager-control\" role=\"group\">\n    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"ui-pg-table\" style=\"width:100%;table-layout:fixed;height:100%;\" role=\"row\">\n      <tbody>\n        <tr>\n          <td id=\"table_pager_left\" align=\"left\" class=\"pager_left\"></td>\n          <td id=\"table_pager_center\" align=\"center\" style=\"white-space: pre; width: 305px;\" class=\"pager_center\">\n            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"table-layout:auto;\" class=\"ui-pg-table\">\n              <tbody>\n                <tr>\n                  <td id=\"first_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Primera Página</a>\n                  </td>\n                  <td id=\"prev_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Anterior</a>\n                  </td>\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\n                    <span class=\"ui-separator\"></span>\n                  </td>\n                  <td dir=\"ltr\" class=\"pagControls\">\n                    Página\n                    <input class=\"ui-pg-input\" type=\"text\" size=\"2\" maxlength=\"7\" value=\"0\" role=\"textbox\" data-hasqtip=\"1\" oldtitle=\"Página actual\" title=\"\" aria-describedby=\"qtip-1\"> de <span id=\"sp_1_table_pager\">100</span>\n                  </td>\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\n                    <span class=\"ui-separator\"></span>\n                  </td>\n                  <td id=\"next_table_pager\" class=\"ui-corner-all pagControls\">\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Siguiente</a>\n                  </td>\n                  <td id=\"last_table_pager\" class=\"ui-corner-all pagControls\">\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Última Página</a>\n                  </td>\n                  <td dir=\"ltr\" class=\"pagControls\">\n                    <select class=\"ui-pg-selbox\" role=\"listbox\" data-hasqtip=\"0\" oldtitle=\"Número de elementos por página\" title=\"\" aria-describedby=\"qtip-0\">\n                      <option role=\"option\" value=\"10\" selected=\"selected\">10</option>\n                      <option role=\"option\" value=\"20\">20</option>\n                      <option role=\"option\" value=\"30\">30</option>\n                    </select>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n          <td id=\"table_pager_right\" align=\"right\" class=\"pager_right\">\n            <div dir=\"ltr\" style=\"text-align:right\" class=\"ui-paging-info\">Mostrando 1 - 10 de 1.000</div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i></td>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"] = this["Rup"]["Templates"]["rup"]["tabs"] || {};
this["Rup"]["Templates"]["rup"]["tabs"]["container"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul>\n\n</ul>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["subtab"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id="
    + alias4(((helper = (helper = helpers.rupRandomLayerId || (depth0 != null ? depth0.rupRandomLayerId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupRandomLayerId","hash":{},"data":data}) : helper)))
    + " class=\"rupRandomLayerId ssss\">\n  <div id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " actualTab=\""
    + alias4(((helper = (helper = helpers.actualTab || (depth0 != null ? depth0.actualTab : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actualTab","hash":{},"data":data}) : helper)))
    + "\">\n\n  </div>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["tab"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\n  <a  id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\n      href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\"\n      rupLevel=\""
    + alias4(((helper = (helper = helpers.rupLevel || (depth0 != null ? depth0.rupLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupLevel","hash":{},"data":data}) : helper)))
    + "\"\n      title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"\n      alt=\""
    + alias4(((helper = (helper = helpers.alt || (depth0 != null ? depth0.alt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data}) : helper)))
    + "\">\n\n      <div class=\"rup-tabs_title\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</div>\n      <span class=\"rup-tabs_loading\"> </span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnClose : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </a>\n\n</li>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"] = this["Rup"]["Templates"]["rup"]["toolbar"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"] = this["Rup"]["Templates"]["rup"]["toolbar"]["button"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<button type=\"button\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-button\">\n		<i class=\""
    + alias4(((helper = (helper = helpers.css || (depth0 != null ? depth0.css : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=\"true\"></i>\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n</button>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["jqueryui"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"rup-toolbar_button\">\n    <span class=\"ui-button-icon ui-icon "
    + alias4(((helper = (helper = helpers.css || (depth0 != null ? depth0.css : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data}) : helper)))
    + "\"></span>\n    <span class=\"ui-button-icon-space\"> </span>\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n</button>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] = this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-mbutton-group\" class=\"rup-mbutton "
    + alias4(((helper = (helper = helpers.groupClasses || (depth0 != null ? depth0.groupClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupClasses","hash":{},"data":data}) : helper)))
    + "\">\n		<button type=\"button\" data-mbutton=\"true\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-mbutton=\"true\" class=\"btn-material btn-material btn-material-primary-high-emphasis rup-button\">\n			<i class=\"mdi mdi-settings\" aria-hidden=\"true\"></i>\n			<span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\n		</button>\n		<ul id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-mbutton-container\" class=\"rup-mbutton-container\" aria-labelledby=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n\n		</ul>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"] = this["Rup"]["Templates"]["rup"]["upload"] || {};
this["Rup"]["Templates"]["rup"]["upload"]["downloadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"list-group-item template-download "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n      <div class=\"row\">\n\n\n          <div class=\"col-xs-6 col-md-3\">\n            <p class=\"name text-xs-left\"><b>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "</b></p>\n            <span class=\"name text-xs-left\"><span class=\"type\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span></span>\n\n            <p class=\"name text-xs-left error-text error\">"
    + alias4(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\n\n          </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "      </div>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "error";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)));
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>";
},"8":function(container,depth0,helpers,partials,data) {
    return "\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\n				<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n               		<span  class=\"btn btn-primary download\">\n                		<i class=\"mdi mdi-download\" aria-hidden=\"true\"></i>\n                		<span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.openUploaded",{"name":"i18n","hash":{},"data":data}))
    + "</span>\n                	</span>\n                </a>\n                <span class=\"btn-material btn-material-secondary-high-emphasis delete\" data-type=\""
    + alias4(((helper = (helper = helpers.delete_type || (depth0 != null ? depth0.delete_type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_type","hash":{},"data":data}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = helpers.delete_url || (depth0 != null ? depth0.delete_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_url","hash":{},"data":data}) : helper)))
    + "\">\n                	<i class=\"mdi mdi-delete\" aria-hidden=\"true\"></i>\n                	<span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.deleteUploaded",{"name":"i18n","hash":{},"data":data}))
    + "</span>\n                </span>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"]["uploadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"list-group-item template-upload\">\n      <div class=\"row\">\n        <div class=\"col-xs-6 col-md-3\">\n          <p class=\"name text-xs-left\"><b>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</b></p>\n          <span class=\"name text-xs-left\"><span class=\"type-text type\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span><span class=\"name text-xs-left size-text size\">"
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "</span></span>\n          <p class=\"name text-xs-left error-text error\"></p>\n\n\n        </div>\n\n        <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depths[1] != null ? depths[1].notSubmitInForm : depths[1]),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                <button class=\"btn-material btn-material-secondary-high-emphasis cancel\">\n                    <i class=\"mdi mdi-close-circle\" aria-hidden=\"true\"></i>\n                    <span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.cancelUpload",{"name":"i18n","hash":{},"data":data}))
    + "</span>\n                </button>\n        </div>\n\n      </div>\n\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"btn-material btn-material-primary-high-emphasis start\" disabled=\"true\">\n                    <i class=\"mdi mdi-upload\" aria-hidden=\"true\"></i>\n                    <span>"
    + container.escapeExpression((helpers.i18n || (depth0 && depth0.i18n) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"rup_upload.startUpload",{"name":"i18n","hash":{},"data":data}))
    + "</span>\n                </button>\n\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
this["Rup"]["Templates"]["rup"]["widget"] = this["Rup"]["Templates"]["rup"]["widget"] || {};
this["Rup"]["Templates"]["rup"]["widget"]["base"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetClose-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-delete\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetReload-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-refresh\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.refrescar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetResizeFull-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-window-maximize\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.maximizar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetConfig-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-settings\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data}))
    + "\" ></span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <span id=\"widgetInfo-"
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-comment-question-outline\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + alias4(((helper = (helper = helpers.infoTextNew || (depth0 != null ? depth0.infoTextNew : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoTextNew","hash":{},"data":data}) : helper)))
    + "\" tttt=\""
    + alias4(((helper = (helper = helpers.infoText || (depth0 != null ? depth0.infoText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoText","hash":{},"data":data}) : helper)))
    + "\"></span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetShow-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-toggle-switch\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.mostrarOcultar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"widget rssBottom\" id=\""
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"widget-header\">\n        <div>\n          <span class=\"widget-header-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n        </div>\n        <div class=\"widget-header-controls\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnClose : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnReload : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnResizeFull : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          <span id=\"widgetResizeSmall-"
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-window-minimize\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.minimizar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnConfig : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.infoText : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnShow : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"widget-feedback\">\n    </div>\n    <div class=\"widget-body\">\n\n    </div>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["close"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["configRequired"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<br/>"
    + ((stack1 = ((helper = (helper = helpers.urlConsulta || (depth0 != null ? depth0.urlConsulta : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"urlConsulta","hash":{},"data":data}) : helper))) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.idModal || (depth0 != null ? depth0.idModal : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idModal","hash":{},"data":data}) : helper)))
    + "\" class=\"config-required-modal\">\n    <div>\n        <div>\n            <span>"
    + alias4(((helper = (helper = helpers.titulo || (depth0 != null ? depth0.titulo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titulo","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.urlConsulta : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span><br>\n            <button id=\"btnConfigRequired\" type=\"button\" class=\"btn btn-primary\">\n                <span class=\"mdi mdi-settings\" aria-hidden=\"true\"></span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data}))
    + "</button>\n            <button id=\"btnDelete\" type=\"button\" class=\"btn btn-danger\">\n                <span class=\"mdi mdi-delete\" aria-hidden=\"true\"></span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data}))
    + "</button>\n            \n        </div>\n    </div>\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["help"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "\n<p class=\"help_widget_intro\">"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.parrafo1",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n\n<div class=\"help_block add_widget_action\">\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.addWidget",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.addWidgetText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_block config_widget_action\">\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.configura",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.configuraText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_block help_widget_action\">\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.ayuda",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.ayudaText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["rss"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"list-group-item\" data-source=\""
    + alias4(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"source","hash":{},"data":data}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" data-comments=\""
    + alias4(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n            <h5 class=\"list-group-item-heading\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = helpers.pubDate || (depth0 != null ? depth0.pubDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubDate","hash":{},"data":data}) : helper)))
    + "</p>\n          </a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.channel : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form>\n    <div class=\"form-group\">\n        <label for=\""
    + alias4(((helper = (helper = helpers.fieldId || (depth0 != null ? depth0.fieldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data}) : helper)))
    + "\" class=\"control-label\">"
    + alias4(((helper = (helper = helpers.fieldLabel || (depth0 != null ? depth0.fieldLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldLabel","hash":{},"data":data}) : helper)))
    + "</label>\n        <input type=\"text\" class=\"form-control\" id=\""
    + alias4(((helper = (helper = helpers.fieldId || (depth0 != null ? depth0.fieldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = helpers.fieldPlaceholder || (depth0 != null ? depth0.fieldPlaceholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"form-group\">\n        <button type=\"button\" class=\"btn btn-default\">\n            <span class=\"mdi mdi-magnify\"></span>\n            Consultar</button>\n        <button type=\"button\" class=\"btn btn-primary\">\n            <span class=\"mdi mdi-settings\"></span>\n            Tramitar</button>\n    </div>\n</form> \n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["welcome"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.parrafo1",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.parrafo2",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n\n\n<div class=\"help_herramienta bienvenida_1 noborder_widget\">\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.seleccionActivo",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.seleccionActivoText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_herramienta bienvenida_2\">\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.opcionConfiguracion",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.opcionConfiguracionText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_herramienta bienvenida_3\">\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.addWidget",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.addWidgetText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_herramienta bienvenida_4\">\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.accesoFamilias",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.accesoFamiliasText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n<div class=\"help_herramienta bienvenida_5\">\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.herramientas",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.herramientasText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\n</div>\n\n";
},"useData":true});
          return this['Rup'];
        }
        ));
        