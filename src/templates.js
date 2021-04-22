
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
this["Rup"]["Templates"]["rup"]["button"]["dropdownButton"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":18}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"classes") || (depth0 != null ? lookupProperty(depth0,"classes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":38}}}) : helper)))
    + "\" type=\"button\">\r\n  <i class=\"mdi mdi-menu-down\" aria-hidden=\"true\"></i>\r\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton-container"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":15}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"classes") || (depth0 != null ? lookupProperty(depth0,"classes") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"classes","hash":{},"data":data,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":35}}}) : helper)))
    + "\">\r\n  <ul role=\"menu\" aria-activedescendant=\"active-menuitem\" aria-labelledby=\"active-menuitem\">\r\n    <li style=\"display: block;\">\r\n      <button type=\"button\" class=\"btn-material btn-material-primary-high-emphasis rup-toolbar_button rup-button rup-toolbar_menuButtonElement\" id=\"toolbar##mbuton1##nuevo\">\r\n        <span class=\"mdi mdi-plus\"></span>\r\n        <span class=\"rup-ui-button-text\">\r\n        	"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"rup_button.new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":9},"end":{"line":7,"column":34}}}))
    + "\r\n        </span>\r\n      </button>\r\n    </li>\r\n  </ul>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["button"]["mbutton"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":18}}}) : helper)))
    + "\"\r\n  class=\"btn-material btn-material-primary-high-emphasis rup-toolbar_menuButton rup-toolbar_menuButtonSlided\"\r\n  role=\"button\"\r\n  href=\"#\">\r\n  	"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":12}}}) : helper)))
    + "\r\n  	<span class=\"mdi "
    + alias4(((helper = (helper = lookupProperty(helpers,"iconClasses") || (depth0 != null ? lookupProperty(depth0,"iconClasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"iconClasses","hash":{},"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":6,"column":35}}}) : helper)))
    + "\" aria-hidden=\"true\"></span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["dashboard"] = this["Rup"]["Templates"]["rup"]["dashboard"] || {};
this["Rup"]["Templates"]["rup"]["dashboard"]["item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-gs-min-width=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"minWidth") || (depth0 != null ? lookupProperty(depth0,"minWidth") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"minWidth","hash":{},"data":data,"loc":{"start":{"line":2,"column":41},"end":{"line":2,"column":53}}}) : helper)))
    + "\" ";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-gs-max-width=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"maxWidth") || (depth0 != null ? lookupProperty(depth0,"maxWidth") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"maxWidth","hash":{},"data":data,"loc":{"start":{"line":3,"column":41},"end":{"line":3,"column":53}}}) : helper)))
    + "\" ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-gs-min-height=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"minHeight") || (depth0 != null ? lookupProperty(depth0,"minHeight") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"minHeight","hash":{},"data":data,"loc":{"start":{"line":4,"column":43},"end":{"line":4,"column":56}}}) : helper)))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-gs-max-height=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"maxHeight") || (depth0 != null ? lookupProperty(depth0,"maxHeight") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"maxHeight","hash":{},"data":data,"loc":{"start":{"line":5,"column":43},"end":{"line":5,"column":56}}}) : helper)))
    + "\" ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"grid-stack-item\"  \r\n     "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"minWidth") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":5},"end":{"line":2,"column":62}}})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"maxWidth") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":62}}})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"minHeight") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":65}}})) != null ? stack1 : "")
    + "\r\n     "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"maxHeight") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":5},"end":{"line":5,"column":65}}})) != null ? stack1 : "")
    + "\r\n     data-rup-widget-type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":6,"column":27},"end":{"line":6,"column":35}}}) : helper)))
    + "\">\r\n\r\n    <div class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"itemClass") || (depth0 != null ? lookupProperty(depth0,"itemClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"itemClass","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":29}}}) : helper)))
    + "\" >\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["jqtable"] = this["Rup"]["Templates"]["rup"]["jqtable"] || {};
this["Rup"]["Templates"]["rup"]["jqtable"]["detail"] = this["Rup"]["Templates"]["rup"]["jqtable"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["jqtable"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["jqtable"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["jqtable"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":33}}}) : helper)))
    + "\" class=\"rup-jqtable-detail-info\">\r\n  <i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"resultNumText") || (depth0 != null ? lookupProperty(depth0,"resultNumText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data,"loc":{"start":{"line":2,"column":57},"end":{"line":2,"column":74}}}) : helper)))
    + "\"></i>\r\n  <span id=\"rup_jqtable_selectedElements_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":3,"column":41},"end":{"line":3,"column":54}}}) : helper)))
    + "\" class=\"rup-jqtable-detail-currentElement\" >\r\n    "
    + alias4(((helper = (helper = lookupProperty(helpers,"numResult") || (depth0 != null ? lookupProperty(depth0,"numResult") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numResult","hash":{},"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":4,"column":17}}}) : helper)))
    + "\r\n  </span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":7,"column":13},"end":{"line":7,"column":26}}}) : helper)))
    + "\" class=\"rup-jqtable-detail-navigation\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":49}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":88},"end":{"line":8,"column":102}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":104},"end":{"line":8,"column":118}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":9,"column":35},"end":{"line":9,"column":48}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":87},"end":{"line":9,"column":100}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":102},"end":{"line":9,"column":115}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":10,"column":38},"end":{"line":10,"column":51}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":90},"end":{"line":10,"column":103}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":105},"end":{"line":10,"column":118}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = lookupProperty(helpers,"jqtableId") || (depth0 != null ? lookupProperty(depth0,"jqtableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jqtableId","hash":{},"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":48}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":87},"end":{"line":11,"column":100}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":102},"end":{"line":11,"column":115}}}) : helper)))
    + "</button>\r\n  </div>\r\n  <div class=\"rup-jqtable-detail-separator separador\"></div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["jqtable"]["pager"] = this["Rup"]["Templates"]["rup"]["jqtable"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["jqtable"]["pager"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n  <div id=\"pg_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":20}}}) : helper)))
    + "_pager\" class=\"ui-pager-control rup_jqtable_pager\" role=\"group\">\r\n    <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":3,"column":13},"end":{"line":3,"column":24}}}) : helper)))
    + "_left\" class=\"pager_left\"></div>\r\n    <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":4,"column":13},"end":{"line":4,"column":24}}}) : helper)))
    + "_center\" class=\"pager_center\">\r\n      <div id=\"first_"
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":5,"column":21},"end":{"line":5,"column":32}}}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstPageText") || (depth0 != null ? lookupProperty(depth0,"firstPageText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstPageText","hash":{},"data":data,"loc":{"start":{"line":6,"column":60},"end":{"line":6,"column":77}}}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"prev_"
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":31}}}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"prevPageText") || (depth0 != null ? lookupProperty(depth0,"prevPageText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"prevPageText","hash":{},"data":data,"loc":{"start":{"line":9,"column":60},"end":{"line":9,"column":76}}}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"next_"
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":11,"column":20},"end":{"line":11,"column":31}}}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"nextPageText") || (depth0 != null ? lookupProperty(depth0,"nextPageText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nextPageText","hash":{},"data":data,"loc":{"start":{"line":12,"column":60},"end":{"line":12,"column":76}}}) : helper)))
    + "</a>\r\n      </div>\r\n      <div id=\"last_"
    + alias4(((helper = (helper = lookupProperty(helpers,"idPager") || (depth0 != null ? lookupProperty(depth0,"idPager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idPager","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":31}}}) : helper)))
    + "\">\r\n        <a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastPageText") || (depth0 != null ? lookupProperty(depth0,"lastPageText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastPageText","hash":{},"data":data,"loc":{"start":{"line":15,"column":60},"end":{"line":15,"column":76}}}) : helper)))
    + "</a>\r\n      </div>\r\n\r\n    </div>\r\n    <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"table_pager") || (depth0 != null ? lookupProperty(depth0,"table_pager") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"table_pager","hash":{},"data":data,"loc":{"start":{"line":19,"column":13},"end":{"line":19,"column":28}}}) : helper)))
    + "_right\" class=\"pager_right\">\r\n      <div class=\"ui-paging-info\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"resultText") || (depth0 != null ? lookupProperty(depth0,"resultText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultText","hash":{},"data":data,"loc":{"start":{"line":20,"column":34},"end":{"line":20,"column":48}}}) : helper)))
    + "</div>\r\n    </div>\r\n  </div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["jqtable"]["pager"]["jqueryui"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"table_pager\" class=\"ui-state-default ui-jqgrid-pager ui-corner-bottom\" dir=\"ltr\" style=\"width: 100%; height: auto;\">\r\n  <div id=\"pg_table_pager\" class=\"ui-pager-control\" role=\"group\">\r\n    <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"ui-pg-table\" style=\"width:100%;table-layout:fixed;height:100%;\" role=\"row\">\r\n      <tbody>\r\n        <tr>\r\n          <td id=\"table_pager_left\" align=\"left\" class=\"pager_left\"></td>\r\n          <td id=\"table_pager_center\" align=\"center\" style=\"white-space: pre; width: 305px;\" class=\"pager_center\">\r\n            <table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"table-layout:auto;\" class=\"ui-pg-table\">\r\n              <tbody>\r\n                <tr>\r\n                  <td id=\"first_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Primera Página</a>\r\n                  </td>\r\n                  <td id=\"prev_table_pager\" class=\"ui-corner-all pagControls ui-state-disabled\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Anterior</a>\r\n                  </td>\r\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\r\n                    <span class=\"ui-separator\"></span>\r\n                  </td>\r\n                  <td dir=\"ltr\" class=\"pagControls\">\r\n                    Página\r\n                    <input class=\"ui-pg-input\" type=\"text\" size=\"2\" maxlength=\"7\" value=\"0\" role=\"textbox\" data-hasqtip=\"1\" oldtitle=\"Página actual\" title=\"\" aria-describedby=\"qtip-1\"> de <span id=\"sp_1_table_pager\">100</span>\r\n                  </td>\r\n                  <td class=\"ui-pg-button ui-state-disabled pagControls\" style=\"width:4px;\">\r\n                    <span class=\"ui-separator\"></span>\r\n                  </td>\r\n                  <td id=\"next_table_pager\" class=\"ui-corner-all pagControls\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Siguiente</a>\r\n                  </td>\r\n                  <td id=\"last_table_pager\" class=\"ui-corner-all pagControls\">\r\n                    <a href=\"javascript:void(0)\" class=\"linkPaginacion\">Última Página</a>\r\n                  </td>\r\n                  <td dir=\"ltr\" class=\"pagControls\">\r\n                    <select class=\"ui-pg-selbox\" role=\"listbox\" data-hasqtip=\"0\" oldtitle=\"Número de elementos por página\" title=\"\" aria-describedby=\"qtip-0\">\r\n                      <option role=\"option\" value=\"10\" selected=\"selected\">10</option>\r\n                      <option role=\"option\" value=\"20\">20</option>\r\n                      <option role=\"option\" value=\"30\">30</option>\r\n                    </select>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </td>\r\n          <td id=\"table_pager_right\" align=\"right\" class=\"pager_right\">\r\n            <div dir=\"ltr\" style=\"text-align:right\" class=\"ui-paging-info\">Mostrando 1 - 10 de 1.000</div>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["jqtable"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["jqtable"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["jqtable"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":1,"column":52},"end":{"line":1,"column":61}}}) : helper)))
    + "</a>\r\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":2,"column":25},"end":{"line":2,"column":33}}}) : helper)))
    + "\"></i></td>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"] = this["Rup"]["Templates"]["rup"]["table"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"] = this["Rup"]["Templates"]["rup"]["table"]["detail"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] = this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"] || {};
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":31}}}) : helper)))
    + "\" class=\"col-sm-4 text-center text-sm-left\">\r\n  	<i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"resultNumText") || (depth0 != null ? lookupProperty(depth0,"resultNumText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data,"loc":{"start":{"line":2,"column":58},"end":{"line":2,"column":75}}}) : helper)))
    + "\"></i>\r\n  	<span id=\"rup_table_selectedElements_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":3,"column":40},"end":{"line":3,"column":51}}}) : helper)))
    + "\" class=\"ml-1\" >\r\n    	"
    + alias4(((helper = (helper = lookupProperty(helpers,"resultNumText") || (depth0 != null ? lookupProperty(depth0,"resultNumText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data,"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":22}}}) : helper)))
    + "\r\n  	</span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":7,"column":13},"end":{"line":7,"column":24}}}) : helper)))
    + "\" class=\"col-sm-8 text-center text-sm-right mt-3 mt-sm-0\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":47}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":86},"end":{"line":8,"column":100}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":102},"end":{"line":8,"column":116}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":9,"column":35},"end":{"line":9,"column":46}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":85},"end":{"line":9,"column":98}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":100},"end":{"line":9,"column":113}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":10,"column":38},"end":{"line":10,"column":49}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":88},"end":{"line":10,"column":101}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":103},"end":{"line":10,"column":116}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":46}}}) : helper)))
    + "\" class=\"btn-sm btn-outline-dark\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":85},"end":{"line":11,"column":98}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":100},"end":{"line":11,"column":113}}}) : helper)))
    + "</button>\r\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["detail"]["navigation"]["material"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"pagination_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":31}}}) : helper)))
    + "\" class=\"col-sm-4 text-center text-sm-left\">\r\n	<i class=\"mdi mdi-view-list\" aria-hidden=\"true\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"resultNumText") || (depth0 != null ? lookupProperty(depth0,"resultNumText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data,"loc":{"start":{"line":2,"column":56},"end":{"line":2,"column":73}}}) : helper)))
    + "\"></i>\r\n  	<span id=\"rup_table_selectedElements_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":3,"column":40},"end":{"line":3,"column":51}}}) : helper)))
    + "\" class=\"ml-1\" >\r\n    	"
    + alias4(((helper = (helper = lookupProperty(helpers,"resultNumText") || (depth0 != null ? lookupProperty(depth0,"resultNumText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"resultNumText","hash":{},"data":data,"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":22}}}) : helper)))
    + "\r\n  	</span>\r\n</div>\r\n<div id=\"pag_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":7,"column":13},"end":{"line":7,"column":24}}}) : helper)))
    + "\" class=\"col-sm-8 text-center text-sm-right mt-3 mt-sm-0\">\r\n    <button type=\"button\" id=\"first_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":47}}}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":127},"end":{"line":8,"column":141}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelFirst") || (depth0 != null ? lookupProperty(depth0,"labelFirst") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelFirst","hash":{},"data":data,"loc":{"start":{"line":8,"column":143},"end":{"line":8,"column":157}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"back_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":9,"column":35},"end":{"line":9,"column":46}}}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":126},"end":{"line":9,"column":139}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelPrev") || (depth0 != null ? lookupProperty(depth0,"labelPrev") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelPrev","hash":{},"data":data,"loc":{"start":{"line":9,"column":141},"end":{"line":9,"column":154}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"forward_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":10,"column":38},"end":{"line":10,"column":49}}}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":129},"end":{"line":10,"column":142}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelNext") || (depth0 != null ? lookupProperty(depth0,"labelNext") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelNext","hash":{},"data":data,"loc":{"start":{"line":10,"column":144},"end":{"line":10,"column":157}}}) : helper)))
    + "</button>\r\n    <button type=\"button\" id=\"last_"
    + alias4(((helper = (helper = lookupProperty(helpers,"tableId") || (depth0 != null ? lookupProperty(depth0,"tableId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tableId","hash":{},"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":46}}}) : helper)))
    + "\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":126},"end":{"line":11,"column":139}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"labelLast") || (depth0 != null ? lookupProperty(depth0,"labelLast") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelLast","hash":{},"data":data,"loc":{"start":{"line":11,"column":141},"end":{"line":11,"column":154}}}) : helper)))
    + "</button>\r\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"] = this["Rup"]["Templates"]["rup"]["table"]["pager"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] = this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"] || {};
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"javascript:void(0)\" class=\"linkPaginacion\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":1,"column":52},"end":{"line":1,"column":61}}}) : helper)))
    + "</a>\r\n<i class=\"iconPaginacion "
    + alias4(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":2,"column":25},"end":{"line":2,"column":33}}}) : helper)))
    + "\"></i></td>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["table"]["pager"]["link"]["material"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button type=\"button\" class=\"btn-material btn-material-sm btn-material-secondary-low-emphasis\">\r\n	<i class=\"iconPaginacion "
    + alias4(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":2,"column":26},"end":{"line":2,"column":34}}}) : helper)))
    + "\"></i>\r\n	<span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":3,"column":7},"end":{"line":3,"column":16}}}) : helper)))
    + "<span>\r\n</button>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"] = this["Rup"]["Templates"]["rup"]["tabs"] || {};
this["Rup"]["Templates"]["rup"]["tabs"]["container"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul>\r\n\r\n</ul>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["subtab"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"rupRandomLayerId") || (depth0 != null ? lookupProperty(depth0,"rupRandomLayerId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupRandomLayerId","hash":{},"data":data,"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":28}}}) : helper)))
    + " class=\"rupRandomLayerId ssss\">\r\n  <div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":10},"end":{"line":2,"column":16}}}) : helper)))
    + " actualTab=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"actualTab") || (depth0 != null ? lookupProperty(depth0,"actualTab") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actualTab","hash":{},"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":41}}}) : helper)))
    + "\">\r\n\r\n  </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["tabs"]["tab"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "        <span class=\"ui-icon ui-icon-close\" role=\"presentation\">Remove Tab</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li>\r\n  <a  id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":10},"end":{"line":2,"column":16}}}) : helper)))
    + "\"\r\n      href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"href") || (depth0 != null ? lookupProperty(depth0,"href") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":20}}}) : helper)))
    + "\"\r\n      rupLevel=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"rupLevel") || (depth0 != null ? lookupProperty(depth0,"rupLevel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rupLevel","hash":{},"data":data,"loc":{"start":{"line":4,"column":16},"end":{"line":4,"column":28}}}) : helper)))
    + "\"\r\n      title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":22}}}) : helper)))
    + "\"\r\n      alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"alt") || (depth0 != null ? lookupProperty(depth0,"alt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":18}}}) : helper)))
    + "\">\r\n\r\n      <div class=\"rup-tabs_title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":8,"column":34},"end":{"line":8,"column":43}}}) : helper)))
    + "</div>\r\n      <span class=\"rup-tabs_loading\"> </span>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"btnClose") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":12,"column":13}}})) != null ? stack1 : "")
    + "  </a>\r\n\r\n</li>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"] = this["Rup"]["Templates"]["rup"]["toolbar"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"] = this["Rup"]["Templates"]["rup"]["toolbar"]["button"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<button type=\"button\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":26},"end":{"line":2,"column":32}}}) : helper)))
    + "\" class=\"rup-button\">\r\n		<i class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"css") || (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":19}}}) : helper)))
    + "\" aria-hidden=\"true\"></i>\r\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":4,"column":37},"end":{"line":4,"column":46}}}) : helper)))
    + "</span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["jqueryui"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<button id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":12},"end":{"line":1,"column":18}}}) : helper)))
    + "\" type=\"button\" class=\"rup-toolbar_button\">\r\n    <span class=\"ui-button-icon ui-icon "
    + alias4(((helper = (helper = lookupProperty(helpers,"css") || (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":47}}}) : helper)))
    + "\"></span>\r\n    <span class=\"ui-button-icon-space\"> </span>\r\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":4,"column":37},"end":{"line":4,"column":46}}}) : helper)))
    + "</span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["button"]["material"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<button type=\"button\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":26},"end":{"line":2,"column":32}}}) : helper)))
    + "\" class=\"btn-material btn-material-primary-high-emphasis rup-button\">\r\n	<i class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"css") || (depth0 != null ? lookupProperty(depth0,"css") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"css","hash":{},"data":data,"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":18}}}) : helper)))
    + "\" aria-hidden=\"true\"></i>\r\n    <span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":4,"column":37},"end":{"line":4,"column":46}}}) : helper)))
    + "</span>\r\n</button>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] = this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"] || {};
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"]["bootstrap"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":15}}}) : helper)))
    + "-mbutton-group\" class=\"rup-mbutton "
    + alias4(((helper = (helper = lookupProperty(helpers,"groupClasses") || (depth0 != null ? lookupProperty(depth0,"groupClasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupClasses","hash":{},"data":data,"loc":{"start":{"line":1,"column":50},"end":{"line":1,"column":66}}}) : helper)))
    + "\">\r\n		<button type=\"button\" data-mbutton=\"true\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":48},"end":{"line":2,"column":54}}}) : helper)))
    + "\" data-mbutton=\"true\" class=\"ui-button ui-corner-all ui-widget rup-button\">\r\n			<i class=\"mdi mdi-settings\" aria-hidden=\"true\"></i>\r\n			<span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":4,"column":36},"end":{"line":4,"column":45}}}) : helper)))
    + "</span>\r\n		</button>\r\n		<ul id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":10},"end":{"line":6,"column":16}}}) : helper)))
    + "-mbutton-container\" class=\"rup-mbutton-container\" aria-labelledby=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":83},"end":{"line":6,"column":89}}}) : helper)))
    + "\">\r\n\r\n		</ul>\r\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["toolbar"]["mbutton"]["material"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":15}}}) : helper)))
    + "-mbutton-group\" class=\"rup-mbutton "
    + alias4(((helper = (helper = lookupProperty(helpers,"groupClasses") || (depth0 != null ? lookupProperty(depth0,"groupClasses") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groupClasses","hash":{},"data":data,"loc":{"start":{"line":1,"column":50},"end":{"line":1,"column":66}}}) : helper)))
    + "\">\r\n		<button type=\"button\" data-mbutton=\"true\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":48},"end":{"line":2,"column":54}}}) : helper)))
    + "\" data-mbutton=\"true\" class=\"btn-material btn-material-primary-high-emphasis rup-button\">\r\n			<i class=\"mdi mdi-settings\" aria-hidden=\"true\"></i>\r\n			<span class=\"rup-ui-button-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":4,"column":36},"end":{"line":4,"column":45}}}) : helper)))
    + "</span>\r\n		</button>\r\n		<ul id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":10},"end":{"line":6,"column":16}}}) : helper)))
    + "-mbutton-container\" class=\"rup-mbutton-container\" aria-labelledby=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":83},"end":{"line":6,"column":89}}}) : helper)))
    + "\">\r\n\r\n		</ul>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"] = this["Rup"]["Templates"]["rup"]["upload"] || {};
this["Rup"]["Templates"]["rup"]["upload"]["downloadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"list-group-item template-download "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":49},"end":{"line":4,"column":74}}})) != null ? stack1 : "")
    + "\">\r\n      <div class=\"row\">\r\n\r\n\r\n          <div class=\"col-xs-6 col-md-3\">\r\n            <p class=\"name text-xs-left\"><b>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":9,"column":44},"end":{"line":9,"column":110}}})) != null ? stack1 : "")
    + "</b></p>\r\n            <span class=\"name text-xs-left\"><span class=\"type\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":10,"column":63},"end":{"line":10,"column":71}}}) : helper)))
    + "</span></span>\r\n\r\n            <p class=\"name text-xs-left error-text error\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"error") || (depth0 != null ? lookupProperty(depth0,"error") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"error","hash":{},"data":data,"loc":{"start":{"line":12,"column":58},"end":{"line":12,"column":67}}}) : helper)))
    + "</p>\r\n\r\n          </div>\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"error") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":16,"column":10},"end":{"line":31,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "error";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":57},"end":{"line":9,"column":65}}}) : helper)));
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":9,"column":82},"end":{"line":9,"column":89}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":91},"end":{"line":9,"column":99}}}) : helper)))
    + "</a>";
},"8":function(container,depth0,helpers,partials,data) {
    return "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\r\n				<a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":20,"column":13},"end":{"line":20,"column":20}}}) : helper)))
    + "\">\r\n               		<span  class=\"btn-material btn-material-primary-high-emphasis download\">\r\n                		<i class=\"mdi mdi-download\" aria-hidden=\"true\"></i>\r\n                		<span>"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"rup_upload.openUploaded",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":24},"end":{"line":23,"column":58}}}))
    + "</span>\r\n                	</span>\r\n                </a>\r\n                <span class=\"btn-material btn-material-secondary-high-emphasis delete\" data-type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"delete_type") || (depth0 != null ? lookupProperty(depth0,"delete_type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_type","hash":{},"data":data,"loc":{"start":{"line":26,"column":98},"end":{"line":26,"column":113}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"delete_url") || (depth0 != null ? lookupProperty(depth0,"delete_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delete_url","hash":{},"data":data,"loc":{"start":{"line":26,"column":125},"end":{"line":26,"column":139}}}) : helper)))
    + "\">\r\n                	<i class=\"mdi mdi-delete\" aria-hidden=\"true\"></i>\r\n                	<span>"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"rup_upload.deleteUploaded",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":23},"end":{"line":28,"column":59}}}))
    + "</span>\r\n                </span>\r\n            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":34,"column":11}}})) != null ? stack1 : "");
},"useData":true});
this["Rup"]["Templates"]["rup"]["upload"]["uploadTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"list-group-item template-upload\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-6 col-md-3\">\r\n          <p class=\"name text-xs-left\"><b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":42},"end":{"line":7,"column":50}}}) : helper)))
    + "</b></p>\r\n          <span class=\"name text-xs-left\"><span class=\"type-text type\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":8,"column":71},"end":{"line":8,"column":79}}}) : helper)))
    + "</span><span class=\"name text-xs-left size-text size\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"size") || (depth0 != null ? lookupProperty(depth0,"size") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data,"loc":{"start":{"line":8,"column":133},"end":{"line":8,"column":141}}}) : helper)))
    + "</span></span>\r\n          <p class=\"name text-xs-left error-text error\"></p>\r\n\r\n\r\n        </div>\r\n\r\n        <div class=\"col-xs-6 col-md-4 fileupload-buttonbar\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"notSubmitInForm") : depths[1]),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":21,"column":19}}})) != null ? stack1 : "")
    + "\r\n                <button class=\"btn-material btn-material-secondary-high-emphasis cancel\">\r\n                    <i class=\"mdi mdi-close-circle\" aria-hidden=\"true\"></i>\r\n                    <span>"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"rup_upload.cancelUpload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":26},"end":{"line":25,"column":60}}}))
    + "</span>\r\n                </button>\r\n        </div>\r\n\r\n      </div>\r\n\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button class=\"btn-material btn-material-primary-high-emphasis start\" disabled=\"true\">\r\n                    <i class=\"mdi mdi-upload\" aria-hidden=\"true\"></i>\r\n                    <span>"
    + container.escapeExpression((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"rup_upload.startUpload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":26},"end":{"line":18,"column":59}}}))
    + "</span>\r\n                </button>\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"files") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":32,"column":11}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
this["Rup"]["Templates"]["rup"]["widget"] = this["Rup"]["Templates"]["rup"]["widget"] || {};
this["Rup"]["Templates"]["rup"]["widget"]["base"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetClose-"
    + alias3(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":8,"column":32},"end":{"line":8,"column":40}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-delete\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":145},"end":{"line":8,"column":170}}}))
    + "\"></span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetReload-"
    + alias3(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":11,"column":33},"end":{"line":11,"column":41}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-refresh\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.refrescar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":147},"end":{"line":11,"column":173}}}))
    + "\"></span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetResizeFull-"
    + alias3(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":14,"column":37},"end":{"line":14,"column":45}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-window-maximize\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.maximizar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":159},"end":{"line":14,"column":185}}}))
    + "\"></span>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetConfig-"
    + alias3(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":18,"column":33},"end":{"line":18,"column":41}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-settings\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":148},"end":{"line":18,"column":178}}}))
    + "\" ></span>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetInfo-"
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":21,"column":31},"end":{"line":21,"column":39}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-comment-question-outline\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"infoTextNew") || (depth0 != null ? lookupProperty(depth0,"infoTextNew") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoTextNew","hash":{},"data":data,"loc":{"start":{"line":21,"column":165},"end":{"line":21,"column":180}}}) : helper)))
    + "\" tttt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"infoText") || (depth0 != null ? lookupProperty(depth0,"infoText") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"infoText","hash":{},"data":data,"loc":{"start":{"line":21,"column":188},"end":{"line":21,"column":200}}}) : helper)))
    + "\"></span>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <span id=\"widgetShow-"
    + alias3(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":24,"column":31},"end":{"line":24,"column":39}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-toggle-switch\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.mostrarOcultar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":151},"end":{"line":24,"column":182}}}))
    + "\"></span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"widget rssBottom\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":1,"column":34},"end":{"line":1,"column":42}}}) : helper)))
    + "\">\r\n    <div class=\"widget-header\">\r\n        <div>\r\n          <span class=\"widget-header-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":44},"end":{"line":4,"column":53}}}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"widget-header-controls\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"buttons") : depth0)) != null ? lookupProperty(stack1,"btnClose") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":10},"end":{"line":9,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"buttons") : depth0)) != null ? lookupProperty(stack1,"btnReload") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":10},"end":{"line":12,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"buttons") : depth0)) != null ? lookupProperty(stack1,"btnResizeFull") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":10},"end":{"line":15,"column":17}}})) != null ? stack1 : "")
    + "          <span id=\"widgetResizeSmall-"
    + alias4(((helper = (helper = lookupProperty(helpers,"uuid") || (depth0 != null ? lookupProperty(depth0,"uuid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uuid","hash":{},"data":data,"loc":{"start":{"line":16,"column":38},"end":{"line":16,"column":46}}}) : helper)))
    + "\" class=\"widget-icon widget-icon-right mdi mdi-window-minimize\" data-toggle=\"tooltip\" data-placement=\"top\" title=\""
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.minimizar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":160},"end":{"line":16,"column":186}}}))
    + "\"></span>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"buttons") : depth0)) != null ? lookupProperty(stack1,"btnConfig") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":10},"end":{"line":19,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"infoText") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":10},"end":{"line":22,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"buttons") : depth0)) != null ? lookupProperty(stack1,"btnShow") : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":10},"end":{"line":25,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n    <div class=\"widget-feedback\">\r\n    </div>\r\n    <div class=\"widget-body\">\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["close"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["configRequired"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<br/>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"urlConsulta") || (depth0 != null ? lookupProperty(depth0,"urlConsulta") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"urlConsulta","hash":{},"data":data,"loc":{"start":{"line":4,"column":52},"end":{"line":4,"column":69}}}) : helper))) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"idModal") || (depth0 != null ? lookupProperty(depth0,"idModal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idModal","hash":{},"data":data,"loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":20}}}) : helper)))
    + "\" class=\"config-required-modal\">\r\n    <div>\r\n        <div>\r\n            <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"titulo") || (depth0 != null ? lookupProperty(depth0,"titulo") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titulo","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":28}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"urlConsulta") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":28},"end":{"line":4,"column":76}}})) != null ? stack1 : "")
    + "</span><br>\r\n            <button id=\"btnConfigRequired\" type=\"button\" class=\"btn-material btn-material-primary-high-emphasis\">\r\n                <span class=\"mdi mdi-settings\" aria-hidden=\"true\"></span>"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.configuracion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":73},"end":{"line":6,"column":103}}}))
    + "</button>\r\n            <button id=\"btnDelete\" type=\"button\" class=\"btn-material btn-material-warning-dark-high-emphasis\">\r\n                <span class=\"mdi mdi-delete\" aria-hidden=\"true\"></span>"
    + alias4((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"title.eliminar",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":71},"end":{"line":8,"column":96}}}))
    + "</button>\r\n            \r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["help"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<p class=\"help_widget_intro\">"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.parrafo1",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":53}}}))
    + "</p>\r\n\r\n<div class=\"help_block add_widget_action\">\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.addWidget",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":28}}}))
    + "</p>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.addWidgetText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":32}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_block config_widget_action\">\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.configura",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":3},"end":{"line":10,"column":28}}}))
    + "</p>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.configuraText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":3},"end":{"line":11,"column":32}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_block help_widget_action\">\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.ayuda",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":3},"end":{"line":15,"column":24}}}))
    + "</p>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"help.ayudaText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":3},"end":{"line":16,"column":28}}}))
    + "</p>\r\n</div>\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["rss"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"list-group\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":7},"end":{"line":9,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":4,"column":19},"end":{"line":4,"column":27}}}) : helper)))
    + "\" class=\"list-group-item\" data-source=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"source") || (depth0 != null ? lookupProperty(depth0,"source") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"source","hash":{},"data":data,"loc":{"start":{"line":4,"column":66},"end":{"line":4,"column":76}}}) : helper)))
    + "\" data-url=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":4,"column":88},"end":{"line":4,"column":96}}}) : helper)))
    + "\" data-comments=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"comments") || (depth0 != null ? lookupProperty(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data,"loc":{"start":{"line":4,"column":113},"end":{"line":4,"column":125}}}) : helper)))
    + "\" target=\"_blank\">\r\n            <h5 class=\"list-group-item-heading\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":5,"column":48},"end":{"line":5,"column":57}}}) : helper)))
    + "</h5>\r\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":6,"column":44},"end":{"line":6,"column":55}}}) : helper)))
    + "</p>\r\n            <p class=\"list-group-item-text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"pubDate") || (depth0 != null ? lookupProperty(depth0,"pubDate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pubDate","hash":{},"data":data,"loc":{"start":{"line":7,"column":44},"end":{"line":7,"column":55}}}) : helper)))
    + "</p>\r\n          </a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channel") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":11,"column":9}}})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["search"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form>\r\n    <div class=\"form-group\">\r\n        <label for=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldId") || (depth0 != null ? lookupProperty(depth0,"fieldId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data,"loc":{"start":{"line":3,"column":20},"end":{"line":3,"column":31}}}) : helper)))
    + "\" class=\"control-label\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldLabel") || (depth0 != null ? lookupProperty(depth0,"fieldLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldLabel","hash":{},"data":data,"loc":{"start":{"line":3,"column":55},"end":{"line":3,"column":69}}}) : helper)))
    + "</label>\r\n        <input type=\"text\" class=\"form-control\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldId") || (depth0 != null ? lookupProperty(depth0,"fieldId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldId","hash":{},"data":data,"loc":{"start":{"line":4,"column":52},"end":{"line":4,"column":63}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldPlaceholder") || (depth0 != null ? lookupProperty(depth0,"fieldPlaceholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data,"loc":{"start":{"line":4,"column":78},"end":{"line":4,"column":98}}}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <button type=\"button\" class=\"btn-material btn-material-primary-high-emphasis\">\r\n            <span class=\"mdi mdi-magnify\"></span>\r\n            Consultar</button>\r\n        <button type=\"button\" class=\"btn-material btn-material-primary-high-emphasis\">\r\n            <span class=\"mdi mdi-settings\"></span>\r\n            Tramitar</button>\r\n    </div>\r\n</form> \r\n";
},"useData":true});
this["Rup"]["Templates"]["rup"]["widget"]["welcome"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.parrafo1",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":1,"column":3},"end":{"line":1,"column":30}}}))
    + "</p>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.parrafo2",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":3},"end":{"line":2,"column":30}}}))
    + "</p>\r\n\r\n\r\n<div class=\"help_herramienta bienvenida_1 noborder_widget\">\r\n<h2>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.seleccionActivo",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":6,"column":38}}}))
    + "</h2>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.seleccionActivoText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":3},"end":{"line":7,"column":41}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_2\">\r\n<h2>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.opcionConfiguracion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":11,"column":42}}}))
    + "</h2>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.opcionConfiguracionText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":12,"column":45}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_3\">\r\n<h2>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.addWidget",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":16,"column":32}}}))
    + "</h2>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.addWidgetText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":3},"end":{"line":17,"column":35}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_4\">\r\n<h2>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.accesoFamilias",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":4},"end":{"line":21,"column":37}}}))
    + "</h2>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.accesoFamiliasText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":3},"end":{"line":22,"column":40}}}))
    + "</p>\r\n</div>\r\n\r\n<div class=\"help_herramienta bienvenida_5\">\r\n<h2>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.herramientas",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":4},"end":{"line":26,"column":35}}}))
    + "</h2>\r\n<p>"
    + alias3((lookupProperty(helpers,"i18n")||(depth0 && lookupProperty(depth0,"i18n"))||alias2).call(alias1,"welcome.herramientasText",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":3},"end":{"line":27,"column":38}}}))
    + "</p>\r\n</div>\r\n\r\n";
},"useData":true});
          return this['Rup'];
        }
        ));
        