
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
        