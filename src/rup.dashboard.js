/**
 * @fileOverview
 * @author EJIE
 * @version 1.0.0
 */
 ;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
      "./templates",
      "./model/dashboardItemModel",
			// "jquery-ui",
			"./rup.base",

      "gridstack",
      "./rup.widget",
      "./rup.widget.welcome",
      "./rup.widget.template",
      "./rup.widget.xhr"

		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function($, Rup, DashboardItem) {

    /**
    * Componente Dashboard.
    *
    * @namespace rup.dashboard
    * @property {jQuery} $ui.$btnResizeSmall - Referencia al botón de minimizar el widget.
    */


     /**
     * Objeto utilizado para configurar y definir los elementos que se muestran en el dashboard.
     *
     * @typedef {Object} rup.dashboard~DashboardItem
     * @property {Integer} x - Posición del item en el eje x dentro del dashboard.
     * @property {Integer} y - Posición del item en el eje y dentro del dashboard.
     * @property {Integer} width - Unidades de ancho con los que se visualiza el item.
     * @property {Integer} height - Unidades de altura con los que se visualiza el item.
     * @property {Integer} minWidth - Unidades de ancho mínimas a las que podrá redimensionarse un item.
     * @property {Integer} minHeight - Unidades de altura mínimas a las que podrá redimensionarse un item.
     * @property {Boolean} [overflowX=true] - Determina si se debe mostrar scroll horizontal en caso de que el contenido del widget sobrepase la anchura del item.
     * @property {Boolean} [overflowY=true] - Determina si se debe mostrar scroll vertical en caso de que el contenido del widget sobrepase la altura del item.
     * @property {String} type - Identificador del tipo de item que se corresponde con la naturaleza del elemento que se va a visualizar.
     * @property {object} widgetOptions - Objeto de configuración empleado para la inicialización del elemento correspondiente a crear dentro del dashboard.
     */

     $.widget("rup.dashboard", {

        //Options to be used as defaults
        options: {
            url: null,
            cellHeight:30,
            draggable:{
                handle: ".widget-header"
            }
        },

        /**
        * El método _create de ejecuta automáticamente la primera vez que se invoca el widget.
        *
        * @name rup.dashboard#_create
        * @function
        * @private
        *
        */
        _create: function () {
            var $self = this,
                $el = $self.element;

            $el.gridstack($self.options);
            $el.addClass("rup_dashboard");

            $self._itemTemplate = Rup.Templates.rup.dashboard.item;

            $self.$gridstack = $el.data("gridstack");
        },
        /**
        * Elimina el widget instanciado así como las modificaciones realizadas en el DOM.
        *
        * @name rup.dashboard#destroy
        * @function
        *
        */
        destroy: function () {
            $.Widget.prototype.destroy.call( this );
        },
        /**
        * Agrega un widget al dashboard.
        *
        * @name rup.dashboard#addWidget
        * @function
        * @param {rup.dashboard~DashboardItem} dashboardItem - Objeto de configuración del elemento que se desea agregar al dashboard.
        */
        addWidget: function (dashboardItem) {
            var $self= this,
                widgetName,
                $widget,
                classArray=[],
                $gridStackItem,
                options;

            // Configuración de los valores que se van a incluir en la propiedad class del contenido del item.
            classArray.push("grid-stack-item-content");

            if (dashboardItem.overflowX===false){
                classArray.push("no-scroll-x");
            }

            if (dashboardItem.overflowY===false){
                classArray.push("no-scroll-y");
            }
            dashboardItem.itemClass = classArray.join(" ");

            // Se crea el item a partir de la template y las opciones de configuración
            $gridStackItem = $($self._itemTemplate(dashboardItem));

            // Se obtiene la referencia del item-content
            $widget = $gridStackItem.find(".grid-stack-item-content");

            // Callbacks de los eventos generados por el rup.widget insertado
            $widget.on({
              "rup.widget.closed rup.widget.removed": function(){
                $self.removeWidget($(this).parent());
              },
              "widgetConfigured.widget.rup": function(event, configData){
                $self.element.trigger("rup.dashboard.widget.configured", this, configData)
              },
              "rup.widget.resize": function(event, width, height){
                $self.resize($(this).parent(), width, height);
              },
              "rup.widget.minHeight": function(event, val){
                $self.minHeight($(this).parent(), val);
              },
              "rup.widget.getDashboardWidgetOptions": function(event){
                return $self.getWidgetOptions($(this).parent());
              },
              "rup.widget.execFunction": function(event, arguments){
                $self.execFunction($(this).parent(), arguments);
              }
            });

            // Inicialización del rup.widget correspondiente. En el caso de que se especifique un tipo de item se configura el tipo correspondiente de rup_widget que se va a configurar
            widgetType = dashboardItem.type?"rup_widget_"+dashboardItem.type:"rup_widget";
            $.proxy($widget, widgetType)(dashboardItem.widgetOptions);
            options = $widget.data("rupWidget_"+dashboardItem.type).options;

            // Se invoca al plugin subyacente GridStack para que agregue el widget
            $self.$gridstack.addWidget($gridStackItem, options.x, options.y, options.width, options.height, options.autoPosition, options.minWidth, options.maxWidth, options.minHeight, options.maxHeight, options.id);

            $gridStackItem.data("options", dashboardItem);

        },
        execFunction: function($el, arguments){
            debugger;
            return this.$gridstack.resize($el, width, height);
        },
        getWidgetOptions: function($el){

          var $self = this, retNode;

          retNode = $.grep($self.$gridstack.grid.nodes, function(node){
              return $el.is(node.el);
          });

          return retNode.length === 1? retNode[0]:undefined;
        },
        resize: function($el, width, height){
            this.$gridstack.resize($el, width, height);
        },
        minHeight: function($el, val){
            this.$gridstack.minHeight($el, val);
        },
        removeWidget: function($el){
            this.$gridstack.removeWidget($el);

            this.element.trigger("rup.dashboard.widget.removed", $el);
        },
        removeAll: function($el){
            this.$gridstack.remove_all();
        },
        /**
        * Devuelve un array de objetos que determina la configuración del dashboard y los items mostrados en el.
        *
        * @name rup.dashboard#serialize
        * @function
        * @returns {Array.<rup.dashboard~DashboardItem>} - Resultado de la serialización del dashboard y sus items.
        * @example
        * $("#selector").rup_dashboard("serialize");
        */
        serialize: function () {
            var widgetName;
            var res = $.map($('.grid-stack .grid-stack-item:visible'), function (el) {
                var dashboardItem = new DashboardItem();
                dashboardItem.setFromElement($(el));
                return dashboardItem;
            });
            return res;

        },
        serializeAsArray: function (event, options ) {
            return JSON.stringify(this.serialize());
        },
        loadFromArray: function(arr){

            var $self = this;
            $self.$gridstack.batch_update();

            if (arr!==null){
                jQuery.each(arr, function(index, obj){
                    $self.addWidget(obj);
                });
            }
            $self.$gridstack.commit();
        },

        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch ( key ) {
            case "someValue":
                // this.options.someValue = doSomethingWith( value );
                break;
            default:
                // this.options[ key ] = value;
                break;
            }

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });
    $.widget.bridge( "rup_dashboard", $.rup.dashboard );
}));
