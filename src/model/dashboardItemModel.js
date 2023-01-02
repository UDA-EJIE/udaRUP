/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

/*global jQuery */
/*global define */
/*global module */
/*global require */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals (Note: root is window)
		// root.returnExports = factory(root.myModule, root.myOtherModule);
		root.DashboardItem = factory(jQuery);
	}
}(this, function (jQuery) {

	function fncSetFromElement ($el){
		var node = $el.data('_gridstack_node'),
			ops = $el.data('options'),
			widgetName ='',
			type = '';
		if (undefined!==ops){
			widgetName = ops.type?'rup_widget_'+ops.type:'rup_widget';
			type = ops.type;
		}else{
			widgetName = 'rup_widget_rss';
			type = 'rss';
		}


		this.x = node.x;
		this.y = node.y;
		this.width = node.width;
		this.height = node.height;
		this.minWidth = node.min_width;
		this.minHeight = node.min_height;
		this.maxWidth = node.max_width;
		this.maxHeight = node.max_height;
		this.type = type;
		this.widgetOptions = $el.find('.grid-stack-item-content').bind(widgetName)('getOptions');
	}

	var DashboardItem = function DashboardItem(obj){
		var defaultsValues = {
				type: null,
				x: null,
				y: null,
				width: null,
				height: null,
				minWidth: 0,
				minHeight: 0,
				maxWidth: null,
				maxHeight: null,
				overflowX:true,
				overflowY:true,
				widgetOptions:{}
			}, initValues;

		if (arguments.length>0 && $.isPlainObject(arguments[0])){
			initValues = $.extend({}, defaultsValues, obj);
		}else{
			initValues = $.extend({},defaultsValues);
		}

		this.x = initValues.x;
		this.y = initValues.y;
		this.width = initValues.width;
		this.height = initValues.height;
		this.minWidth = initValues.minWidth;
		this.minHeight = initValues.minHeight;
		this.maxWidth = initValues.maxWidth;
		this.maxHeight = initValues.maxHeight;
		this.overflowX = initValues.overflowX;
		this.overflowY = initValues.overflowY;

	};

	DashboardItem.prototype.setFromElement = fncSetFromElement;

	return DashboardItem;

}));
