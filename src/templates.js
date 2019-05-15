
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
    + "\" type=\"button\">\r\n  <i class=\"mdi mdi-menu-down\" aria-hidden=\"true\"></i>\r\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton-container"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.classes || (depth0 != null ? depth0.classes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data}) : helper)))
    + "\">\r\n  <ul role=\"menu\" aria-activedescendant=\"active-menuitem\" aria-labelledby=\"active-menuitem\">\r\n    <li style=\"display: block;\">\r\n      <button type=\"button\" class=\"rup-toolbar_button ui-button ui-corner-all ui-widget rup-button rup-toolbar_menuButtonElement\" id=\"toolbar##mbuton1##nuevo\">\r\n        <span class=\"ui-button-icon ui-icon nuevo\"></span>\r\n        <span class=\"ui-button-icon-space\"></span>\r\n        <span class=\"rup-ui-button-text\">"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_button.new",{"name":"i18n","hash":{},"data":data}))
    + "</span>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n  class=\"rup-toolbar_menuButton ui-button ui-corner-all ui-widget rup-toolbar_menuButtonSlided\"\r\n  role=\"button\"\r\n  href=\"#\">\r\n  "
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "\r\n  <span class=\"ui-button-icon-space\"></span>\r\n  <span class=\""
    + alias4(((helper = (helper = helpers.iconClasses || (depth0 != null ? depth0.iconClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconClasses","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=\"true\"></span>\r\n</a>\r\n";
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

  return "<div class=\"grid-stack-item\"  \r\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.minWidth : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.maxWidth : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.minHeight : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.maxHeight : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n     data-rup-widget-type=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n    <div class=\""
    + alias4(((helper = (helper = helpers.itemClass || (depth0 != null ? depth0.itemClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemClass","hash":{},"data":data}) : helper)))
    + "\" >\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"] = this["Rup"]["Templates"]["rup"]["datatable"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"] = this["Rup"]["Templates"]["rup"]["datatable"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\r\n  <i class=\"fa fa-list-alt\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n  <span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\r\n    "
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\r\n  </span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\r\n  </div>\r\n  <div class=\"rup-table-detail-separator separador\"></div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["detail"]["navigation"]["material"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\r\n	<i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n  	<span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\r\n    	"
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\r\n  	</span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.datatableId || (depth0 != null ? depth0.datatableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datatableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\r\n </div>\r\n<div class=\"rup-table-detail-separator separador\"></div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["pager"] = this["Rup"]["Templates"]["rup"]["datatable"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\r\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i></td>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["datatable"]["pager"]["link"]["material"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button type=\"button\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\">\r\n	<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n	<span>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "<span>\r\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"] = this["Rup"]["Templates"]["rup"]["table"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"] = this["Rup"]["Templates"]["rup"]["table"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-info\">\r\n  <i class=\"fa fa-list-alt\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = helpers.resultNumText || (depth0 != null ? depth0.resultNumText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data}) : helper)))
    + "\"></i>\r\n  <span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-currentElement\" >\r\n    "
    + alias4(((helper = (helper = helpers.numResult || (depth0 != null ? depth0.numResult : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numResult","hash":{},"data":data}) : helper)))
    + "\r\n  </span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-table-detail-navigation\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelFirst || (depth0 != null ? depth0.labelFirst : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelPrev || (depth0 != null ? depth0.labelPrev : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelNext || (depth0 != null ? depth0.labelNext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = helpers.tableId || (depth0 != null ? depth0.tableId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.labelLast || (depth0 != null ? depth0.labelLast : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data}) : helper)))
    + "</button>\r\n  </div>\r\n  <div class=\"rup-table-detail-separator separador\"></div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"] = this["Rup"]["Templates"]["rup"]["table"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n  <div id=\"pg_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "_pager\" class=\"ui-pager-control rup_jqtable_pager\" role=\"group\">\r\n    <div id=\""
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "_left\" class=\"pager_left\"></div>\r\n    <div id=\""
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "_center\" class=\"pager_center\">\r\n      <div id=\"first_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.firstPageText || (depth0 != null ? depth0.firstPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstPageText","hash":{},"data":data}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"prev_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.prevPageText || (depth0 != null ? depth0.prevPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prevPageText","hash":{},"data":data}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"next_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.nextPageText || (depth0 != null ? depth0.nextPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nextPageText","hash":{},"data":data}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"last_"
    + alias4(((helper = (helper = helpers.idPager || (depth0 != null ? depth0.idPager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.lastPageText || (depth0 != null ? depth0.lastPageText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastPageText","hash":{},"data":data}) : helper)))
    + "</a>\r\n      </div>\r\n\r\n    </div>\r\n    <div id=\""
    + alias4(((helper = (helper = helpers.table_pager || (depth0 != null ? depth0.table_pager : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"table_pager","hash":{},"data":data}) : helper)))
    + "_right\" class=\"pager_right\">\r\n      <div class=\"ui-paging-info\">"
    + alias4(((helper = (helper = helpers.resultText || (depth0 != null ? depth0.resultText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultText","hash":{},"data":data}) : helper)))
    + "</div>\r\n    </div>\r\n  </div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"]["jqueryui"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"table_pager\" class=\"ui-state-default ui-jqgrid-pager ui-corner-bottom\" dir=\"ltr\" style=\"width: 100%; height: auto;\">\r\n  <div id=\"pg_table_pager\" class=\"ui-pager-control\" role=\"group\">\r\n    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"ui-pg-table\" style=\"width:100%;table-layout:fixed;height:100%;\" role=\"row\">\r\n      <tbody>\r\n        <tr>\r\n          <td id=\"table_pager_left\" align=\"left\" class=\"pager_left\"></td>\r\n          <td id=\"table_pager_center\" align=\"center\" style=\"white-space: pre; width: 305px;\" class=\"pager_center\">\r\n            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"table-layout:auto;\" class=\"ui-pg-table\">\r\n              <tbody>\r\n                <tr>\r\n                  <td id=\"first_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Primera Página</a>\r\n                  </td>\r\n                  <td id=\"prev_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Anterior</a>\r\n                  </td>\r\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\r\n                    <span class=\"ui-separator\"></span>\r\n                  </td>\r\n                  <td dir=\"ltr\" class=\"pagControls\">\r\n                    Página\r\n                    <input class=\"ui-pg-input\" type=\"text\" size=\"2\" maxlength=\"7\" value=\"0\" role=\"textbox\" data-hasqtip=\"1\" oldtitle=\"Página actual\" title=\"\" aria-describedby=\"qtip-1\"> de <span id=\"sp_1_table_pager\">100</span>\r\n                  </td>\r\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\r\n                    <span class=\"ui-separator\"></span>\r\n                  </td>\r\n                  <td id=\"next_table_pager\" class=\"ui-corner-all pagControls\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Siguiente</a>\r\n                  </td>\r\n                  <td id=\"last_table_pager\" class=\"ui-corner-all pagControls\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Última Página</a>\r\n                  </td>\r\n                  <td dir=\"ltr\" class=\"pagControls\">\r\n                    <select class=\"ui-pg-selbox\" role=\"listbox\" data-hasqtip=\"0\" oldtitle=\"Número de elementos por página\" title=\"\" aria-describedby=\"qtip-0\">\r\n                      <option role=\"option\" value=\"10\" selected=\"selected\">10</option>\r\n                      <option role=\"option\" value=\"20\">20</option>\r\n                      <option role=\"option\" value=\"30\">30</option>\r\n                    </select>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </td>\r\n          <td id=\"table_pager_right\" align=\"right\" class=\"pager_right\">\r\n            <div dir=\"ltr\" style=\"text-align:right\" class=\"ui-paging-info\">Mostrando 1 - 10 de 1.000</div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\r\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i></td>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"] = this["Rup"]["Templates"]["rup"]["tabs"] || {};
this["Rup"]["Templates"]["rup"]["tabs"]["container"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul>\r\n\r\n</ul>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["subtab"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id="
    + alias4(((helper = (helper = helpers.rupRandomLayerId || (depth0 != null ? depth0.rupRandomLayerId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupRandomLayerId","hash":{},"data":data}) : helper)))
    + " class=\"rupRandomLayerId ssss\">\r\n  <div id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + " actualTab=\""
    + alias4(((helper = (helper = helpers.actualTab || (depth0 != null ? depth0.actualTab : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actualTab","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n  </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["tab"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li>\r\n  <a  id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n      href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\"\r\n      rupLevel=\""
    + alias4(((helper = (helper = helpers.rupLevel || (depth0 != null ? depth0.rupLevel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupLevel","hash":{},"data":data}) : helper)))
    + "\"\r\n      title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"\r\n      alt=\""
    + alias4(((helper = (helper = helpers.alt || (depth0 != null ? depth0.alt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n      <div class=\"rup-tabs_title\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</div>\r\n      <span class=\"rup-tabs_loading\"> </span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnClose : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </a>\r\n\r\n</li>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"] = this["Rup"]["Templates"]["rup"]["toolbar"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"] = this["Rup"]["Templates"]["rup"]["toolbar"]["button"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n<button type=\"button\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"rup-button\">\r\n		<i class=\""
    + alias4(((helper = (helper = helpers.css || (depth0 != null ? depth0.css : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data}) : helper)))
    + "\" aria-hidden=\"true\"></i>\r\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["jqueryui"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" class=\"rup-toolbar_button\">\r\n    <span class=\"ui-button-icon ui-icon "
    + alias4(((helper = (helper = helpers.css || (depth0 != null ? depth0.css : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n    <span class=\"ui-button-icon-space\"> </span>\r\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] = this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"]["bootstrap"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-mbutton-group\" class=\"rup-mbutton "
    + alias4(((helper = (helper = helpers.groupClasses || (depth0 != null ? depth0.groupClasses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupClasses","hash":{},"data":data}) : helper)))
    + "\">\r\n		<button type=\"button\" data-mbutton=\"true\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-mbutton=\"true\" class=\"ui-button ui-corner-all ui-widget rup-button\">\r\n			<i class=\"fa fa-cog\" aria-hidden=\"true\"></i>\r\n			<span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span>\r\n		</button>\r\n		<ul id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "-mbutton-container\" class=\"rup-mbutton-container\" aria-labelledby=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n\r\n		</ul>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"] = this["Rup"]["Templates"]["rup"]["upload"] || {};
this["Rup"]["Templates"]["rup"]["upload"]["downloadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"list-group-item template-download "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n      <div class=\"row\">\r\n\r\n\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <p class=\"name text-xs-left\"><b>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "</b></p>\r\n            <span class=\"name text-xs-left\"><span class=\"type\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span></span>\r\n\r\n            <p class=\"name text-xs-left error-text error\">"
    + alias4(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"error","hash":{},"data":data}) : helper)))
    + "</p>\r\n\r\n          </div>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "      </div>\r\n    </li>\r\n";
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
    return "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\r\n                  <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <span  class=\"btn btn-primary download\">\r\n                        <i class=\"fa fa-download\" aria-hidden=\"true\"></i>\r\n                        <span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.openUploaded",{"name":"i18n","hash":{},"data":data}))
    + "</span>\r\n                    </span>\r\n                  </a>\r\n\r\n                    <span  class=\"btn btn-secondary delete\" data-type=\""
    + alias4(((helper = (helper = helpers.delete_type || (depth0 != null ? depth0.delete_type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_type","hash":{},"data":data}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = helpers.delete_url || (depth0 != null ? depth0.delete_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_url","hash":{},"data":data}) : helper)))
    + "\">\r\n                        <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\r\n                        <span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.deleteUploaded",{"name":"i18n","hash":{},"data":data}))
    + "</span>\r\n                    </span>\r\n            </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"]["uploadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"list-group-item template-upload\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-6 col-md-3\">\r\n          <p class=\"name text-xs-left\"><b>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</b></p>\r\n          <span class=\"name text-xs-left\"><span class=\"type-text type\">"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</span><span class=\"name text-xs-left size-text size\">"
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "</span></span>\r\n          <p class=\"name text-xs-left error-text error\"></p>\r\n\r\n\r\n        </div>\r\n\r\n        <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depths[1] != null ? depths[1].notSubmitInForm : depths[1]),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                <span class=\"btn btn-secondary cancel\">\r\n                    <i class=\"fa fa-times-circle\" aria-hidden=\"true\"></i>\r\n                    <span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"rup_upload.cancelUpload",{"name":"i18n","hash":{},"data":data}))
    + "</span>\r\n                </span>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"btn btn-primary start\" disabled=\"true\">\r\n                    <i class=\"fa fa-upload\" aria-hidden=\"true\"></i>\r\n                    <span>"
    + container.escapeExpression((helpers.i18n || (depth0 && depth0.i18n) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"rup_upload.startUpload",{"name":"i18n","hash":{},"data":data}))
    + "</span>\r\n                </button>\r\n\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.files : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
this["Rup"]["Templates"]["rup"]["widget"] = this["Rup"]["Templates"]["rup"]["widget"] || {};
this["Rup"]["Templates"]["rup"]["widget"]["base"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetClose-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-trash\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetReload-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-refresh\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.refrescar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetResizeFull-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-resize-full\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.maximizar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetConfig-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-cog\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data}))
    + "\" ></span>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <span id=\"widgetInfo-"
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-question-sign\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + alias4(((helper = (helper = helpers.infoTextNew || (depth0 != null ? depth0.infoTextNew : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoTextNew","hash":{},"data":data}) : helper)))
    + "\" tttt=\""
    + alias4(((helper = (helper = helpers.infoText || (depth0 != null ? depth0.infoText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoText","hash":{},"data":data}) : helper)))
    + "\"></span>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "          <span id=\"widgetShow-"
    + alias3(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-eye-close\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.mostrarOcultar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"widget rssBottom\" id=\""
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"widget-header\">\r\n        <div>\r\n          <span class=\"widget-header-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"widget-header-controls\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnClose : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnReload : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnResizeFull : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          <span id=\"widgetResizeSmall-"
    + alias4(((helper = (helper = helpers.uuid || (depth0 != null ? depth0.uuid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data}) : helper)))
    + "\" class=\"widget-icon widget-icon-right glyphicon glyphicon-resize-small\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.minimizar",{"name":"i18n","hash":{},"data":data}))
    + "\"></span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnConfig : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.infoText : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.buttons : depth0)) != null ? stack1.btnShow : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n    <div class=\"widget-feedback\">\r\n    </div>\r\n    <div class=\"widget-body\">\r\n\r\n    </div>\r\n</div>\r\n";
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
    + "\" class=\"config-required-modal\">\r\n    <div>\r\n        <div>\r\n            <span>"
    + alias4(((helper = (helper = helpers.titulo || (depth0 != null ? depth0.titulo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titulo","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.urlConsulta : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span><br>\r\n            <button id=\"btnConfigRequired\" type=\"button\" class=\"btn btn-primary\">\r\n                <span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data}))
    + "</button>\r\n            <button id=\"btnDelete\" type=\"button\" class=\"btn btn-danger\">\r\n                <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>"
    + alias4((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data}))
    + "</button>\r\n            \r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["help"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "\r\n<p class=\"help_widget_intro\">"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.parrafo1",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n\r\n<div class=\"help_block add_widget_action\">\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.addWidget",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.addWidgetText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_block config_widget_action\">\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.configura",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.configuraText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_block help_widget_action\">\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.ayuda",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"help.ayudaText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["rss"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"list-group\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n";
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
    + "\" target=\"_blank\">\r\n            <h5 class=\"list-group-item-heading\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\r\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = helpers.pubDate || (depth0 != null ? depth0.pubDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubDate","hash":{},"data":data}) : helper)))
    + "</p>\r\n          </a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.channel : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["search"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form>\r\n    <div class=\"form-group\">\r\n        <label for=\""
    + alias4(((helper = (helper = helpers.fieldId || (depth0 != null ? depth0.fieldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data}) : helper)))
    + "\" class=\"control-label\">"
    + alias4(((helper = (helper = helpers.fieldLabel || (depth0 != null ? depth0.fieldLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldLabel","hash":{},"data":data}) : helper)))
    + "</label>\r\n        <input type=\"text\" class=\"form-control\" id=\""
    + alias4(((helper = (helper = helpers.fieldId || (depth0 != null ? depth0.fieldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = helpers.fieldPlaceholder || (depth0 != null ? depth0.fieldPlaceholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <button type=\"button\" class=\"btn btn-default\">\r\n            <span class=\"glyphicon glyphicon-search\"></span>\r\n            Consultar</button>\r\n        <button type=\"button\" class=\"btn btn-primary\">\r\n            <span class=\"glyphicon glyphicon-cog\"></span>\r\n            Tramitar</button>\r\n    </div>\r\n</form> \r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["welcome"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.parrafo1",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.parrafo2",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n\r\n\r\n<div class=\"help_herramienta bienvenida_1 noborder_widget\">\r\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.seleccionActivo",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.seleccionActivoText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_2\">\r\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.opcionConfiguracion",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.opcionConfiguracionText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_3\">\r\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.addWidget",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.addWidgetText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_4\">\r\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.accesoFamilias",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.accesoFamiliasText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_5\">\r\n<h2>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.herramientas",{"name":"i18n","hash":{},"data":data}))
    + "</h2>\r\n<p>"
    + alias3((helpers.i18n || (depth0 && depth0.i18n) || alias2).call(alias1,"welcome.herramientasText",{"name":"i18n","hash":{},"data":data}))
    + "</p>\r\n</div>\r\n\r\n";
},"useData":true});
          return this['Rup'];
        }
        ));
        