/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */


/**
 * Permite al usuario mostrar y ocultar de manera selectiva, información mostrada en una estructura jerárquica.
 *
 * @summary Componente RUP Tree.
 * @module rup_tree
 * @see El componente está basado en el plugin {@link https://www.jstree.com|jsTree}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link https://www.jstree.com/api|aquí}.
 * @example
 * $("#ejemploArbolDiv").rup_tree(properties);
 *
 */

/*global define */
/*global jQuery */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './rup.base', 'jstree'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************

	var rup_tree = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	jQuery.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_tree', rup_tree));


	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	jQuery.fn.rup_tree('extend', {
		// Métodos públicos propios del componente.

		/**
		 * Método utilizado para obtener el valor del componente.
		 *
		 * @method
		 * @name getRupValue
		 * @return {string|number} - Devuelve el valor actual del componente seleccionado por el usuario.
		 * @example
		 * $(selector).rup_tree("getRupValue");
		 */
		getRupValue: function () {
			var $self = this,
			settings = $self.data('settings'),
			selectedItems, tmpId, name = $self.attr('name');

			if (jQuery.inArray('checkbox', settings.plugins) !== -1) {
				selectedItems = $self.rup_tree('getChecked', false);
			} else {
				selectedItems = $self.rup_tree('getSelected', false);
			}

			var returnArray = jQuery.map(selectedItems, function (item) {
				const $item = jQuery('#' + item);

				if (typeof settings.core.getValue === "function") {
					return settings.core.getValue.bind($self)($item, $item.data());
				}

				return item ? item : $item.text();
			});

			if (settings.core.submitAsJSON) {
				return jQuery.rup_utils.getRupValueAsJson(name, returnArray);
			} else {

				if (settings.core.submitAsString) {
					return jQuery.rup_utils.getRupValueWrapped(name, returnArray.toString());
				} else {
					return jQuery.rup_utils.getRupValueWrapped(name, returnArray);
				}

			}
		},
		/**
		 * Método utilizado para asignar el valor al componente.
		 *
		 * @method
		 * @name setRupValue
		 * @param {string|number} values - Valor que se va a asignar al componente.
		 * @example
		 * $("#selector").rup_tree("setRupValue", value);
		 */
		setRupValue: function (values) {
			var $self = this,
			settings = $self.data('settings'),
			$items, $item, itemValue, tmpId, dataArray;


			if(jQuery.inArray('checkbox', settings.plugins) >= 0) {
				$self.rup_tree('uncheckAll');
				$items = $self.jstree().get_container_ul().find('li');
				dataArray = settings.core.readAsString === true ? values.split(',') : values;

				jQuery.each($items, function (index, item) {
					$item = jQuery(item);
					if (typeof settings.core.getValue === "function") {
						itemValue = settings.core.getValue.bind($self)($item, $item.data());
					} else {
						tmpId = $item.attr('id');
						itemValue = tmpId ? tmpId : $item.text();
					}
					if (jQuery.inArray(itemValue, dataArray) !== -1) {
						$self.rup_tree('checkNode', item);
					}
				});
			}
			else {
				if(typeof values !== 'string'){
					throw Error('Invalid Args (setRupValue)');
				}
				if($('li#'+values, $self).length === 1){
					$('li#'+values+' > a', $self).click();
				}
			}
		},
		/**
		 * Establece el foco sobre el componente.
		 *
		 * @method
		 * @name setFocus
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("setFocus");
		 */
		setFocus: function () {
			$(this).focus();
		},
		/**
		 * Quita el foco del componente.
		 *
		 * @method
		 * @name unsetFocus
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("unsetFocus");
		 */
		unsetFocus: function () {
			$(this).blur();
		},
		/**
		 * Comprueba si el componente tiene el foco.
		 *
		 * @method
		 * @name isFocused
		 * @since UDA 5.1.0
		 * @return {boolean} - Confirma si el componente tiene el foco.
		 * @example
		 * $("#selector").rup_tree("isFocused");
		 */
		isFocused: function () {
			return $(this).is(":focus");
		},

		// Métodos públicos del core.

		/**
		 * Destruye la instancia.
		 *
		 * @method
		 * @name destroy
		 * @since UDA 5.1.0
		 * @param {boolean} [keep_html] - Permite mantener la estructura en el DOM.
		 * @example
		 * $("#selector").rup_tree("destroy");
		 */
		destroy: function (keep_html) {
			$(this).jstree('destroy', keep_html);
		},
		/**
		 * Crea un nodo prototipo.
		 *
		 * @method
		 * @name createPrototypeNode
		 * @since UDA 5.1.0
		 * @return {DOMElement}
		 * @example
		 * $("#selector").rup_tree("createPrototypeNode");
		 */
		createPrototypeNode: function () {
			return $(this).jstree('_create_prototype_node');
		},
		/**
		 * Devuelve el contenedor de la instancia.
		 *
		 * @method
		 * @name getContainer
		 * @since UDA 5.1.0
		 * @return {jQuery} - Contenedor de la instancia.
		 * @example
		 * $("#selector").rup_tree("getContainer");
		 */
		getContainer: function () {
			return $(this).jstree('get_container');
		},
		/**
		 * Obtiene la representación en JSON del nodo.
		 *
		 * @method
		 * @name getNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} as_dom - Permite definir si devolverá un nodo de jQuery.
		 * @return {Object|jQuery} - Representación del nodo.
		 * @example
		 * $("#selector").rup_tree("getNode", obj, as_dom);
		 */
		getNode: function (obj, as_dom) {
			return $(this).jstree('get_node', obj, as_dom);
		},
		/**
		 * Obtiene la ruta a un nodo utilizando el texto de los nodos o sus identificadores.
		 *
		 * @method
		 * @name getPath
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {string} glue - Cuando se requiera la ruta en string, se debe de pasar el "pegamento" como argumento (ej. `/`). 
		 * En los demás casos, se devolerá un array.
		 * @param {boolean} ids - En caso verdadero se devolverá la ruta usando el identificador, de lo contrario, se usará el texto del nodo.
		 * @return {string|Array} - Ruta del nodo.
		 * @example
		 * $("#selector").rup_tree("getPath", obj, glue, ids);
		 */
		getPath: function (obj, glue, ids) {
			return $(this).jstree('get_path', obj, glue, ids);
		},
		/**
		 * Devuelve el siguiente nodo visible que esté por debajo del nodo pasado como argumento.
		 *
		 * @method
		 * @name getNextDom
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} strict - En caso verdadero solo se devolverán los nodos hermanos.
		 * @return {jQuery} - Siguiente nodo visible.
		 * @example
		 * $("#selector").rup_tree("getNextDom", obj, strict);
		 */
		getNextDom: function (obj, strict) {
			return $(this).jstree('get_next_dom', obj, strict);
		},
		/**
		 * Devuelve el anterior nodo visible que esté por encima del nodo pasado como argumento.
		 *
		 * @method
		 * @name getPrevDom
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} strict - En caso verdadero solo se devolverán los nodos hermanos.
		 * @return {jQuery} - Anterior nodo visible.
		 * @example
		 * $("#selector").rup_tree("getPrevDom", obj, strict);
		 */
		getPrevDom: function (obj, strict) {
			return $(this).jstree('get_prev_dom', obj, strict);
		},
		/**
		 * Devuelve el identificador del nodo padre.
		 *
		 * @method
		 * @name getParent
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {string} - Identificador del nodo padre.
		 * @example
		 * $("#selector").rup_tree("getParent", obj);
		 */
		getParent: function (obj) {
			return $(this).jstree('get_parent', obj);
		},
		/**
		 * Devuelve una colección de los hijos de un nodo (deben de ser visibles).
		 *
		 * @method
		 * @name getChildrenDom
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {jQuery|boolean} - Colección de hijos o booleano falso (significa que algo fue mal).
		 * @example
		 * $("#selector").rup_tree("getChildrenDom", obj);
		 */
		getChildrenDom: function (obj) {
			return $(this).jstree('get_children_dom', obj);
		},
		/**
		 * Comprueba si un nodo tiene hijos.
		 *
		 * @method
		 * @name isParent
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Devuelve si es o no padre.
		 * @example
		 * $("#selector").rup_tree("isParent", obj);
		 */
		isParent: function (obj) {
			return $(this).jstree('is_parent', obj);
		},
		/**
		 * Comprueba si un nodo ha sido cargado (los hijos han de estar disponibles).
		 *
		 * @method
		 * @name isLoaded
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si ha sido cargado.
		 * @example
		 * $("#selector").rup_tree("isLoaded", obj);
		 */
		isLoaded: function (obj) {
			return $(this).jstree('is_loaded', obj);
		},
		/**
		 * Comprueba si un nodo está siendo cargado (los hijos han de cargándose).
		 *
		 * @method
		 * @name isLoading
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo está siendo cargado.
		 * @example
		 * $("#selector").rup_tree("isLoading", obj);
		 */
		isLoading: function (obj) {
			return ($(this).jstree('is_loading', obj));
		},
		/**
		 * Comprueba si un nodo está desplegado.
		 *
		 * @method
		 * @name isOpen
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo se encuentra desplegado.
		 * @example
		 * $("#selector").rup_tree("isOpen", obj);
		 */
		isOpen: function (obj) {
			return $(this).jstree('is_open', obj);
		},
		/**
		 * Comprueba si un nodo está contraído.
		 *
		 * @method
		 * @name isClosed
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo se encuentra contraído.
		 * @example
		 * $("#selector").rup_tree("isClosed", obj);
		 */
		isClosed: function (obj) {
			return $(this).jstree('is_closed', obj);
		},
		/**
		 * Comprueba si un nodo no tiene hijos.
		 *
		 * @method
		 * @name isLeaf
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo no tiene hijos.
		 * @example
		 * $("#selector").rup_tree("isLeaf", obj);
		 */
		isLeaf: function (obj) {
			return $(this).jstree('is_leaf', obj);
		},
		/**
		 * Carga un nodo (obtiene los hijos mediante el ajuste `core.data`). 
		 * Es posible cargar múltiples nodos pasando un array como argumento.
		 *
		 * @method
		 * @name loadNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a cargar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {function} callback - Función a ejecutar cuando la carga del nodo haya sido completada. Se ejecuta en
		 *  el ámbito de la instancia y recibe dos parámetros, el nodo y un estado de tipo booleano.
		 * @return {boolean} - Notifica si la carga fue realizada.
		 * @fires load_node.jstree
		 * @example
		 * $("#selector").rup_tree("loadNode", obj, callback);
		 */
		loadNode: function (obj, callback) {
			return $(this).jstree('load_node', obj, callback);
		},
		/**
		 * Carga todos los nodos.
		 *
		 * @method
		 * @name loadAll
		 * @since UDA 5.1.0
		 * @param {*} [obj] - Nodo a cargar de forma recursiva. De omitirlo, se cargarían todos los nodos del árbol.
		 * @param {function} callback - Función a ejecutar cuando la carga de los nodos haya sido completada.
		 * @fires load_all.jstree
		 * @example
		 * $("#selector").rup_tree("loadAll", obj, callback);
		 */
		loadAll: function (obj, callback) {
			$(this).jstree('load_all', obj, callback);
		},
		/**
		 * Vuelve a dibujar los nodos que así lo requieran.
		 *
		 * @method
		 * @name redraw
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, todos los nodos del árbol volverán a ser dibujados.
		 * @example
		 * $("#selector").rup_tree("redraw", full);
		 */
		redraw: function (full) {
			$(this).jstree('redraw', full);
		},
		/**
		 * Vuelve a dibujar los nodos que así lo requieran.
		 *
		 * @method
		 * @name openNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a abrir. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {function} callback - Función a ejecutar cuando el nodo haya sido abierto.
		 * @param {number|boolean} animation - Duración de la animación de apertura del nodo en milisegundos (sobrescribe el
		 * ajuste `core.animation`). Utilizar `false` para deshabilitar la animación.
		 * @fires open_node.jstree, after_open.jstree, before_open.jstree
		 * @example
		 * $("#selector").rup_tree("openNode", obj, callback, animation);
		 */
		openNode: function (obj, callback, animation) {
			$(this).jstree('open_node', obj, callback, animation);
		},
		/**
		 * Cierra el nodo, ocultando sus hijos.
		 *
		 * @method
		 * @name closeNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a cerrar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {number|boolean} animation - Duración de la animación de apertura del nodo en milisegundos (sobrescribe el
		 * ajuste `core.animation`). Utilizar `false` para deshabilitar la animación.
		 * @fires close_node.jstree, after_close.jstree
		 * @example
		 * $("#selector").rup_tree("closeNode", obj, animation);
		 */
		closeNode: function (obj, animation) {
			$(this).jstree('close_node', obj, animation);
		},
		/**
		 * Alterna el estado de un nodo, cerrándolo si está abierto o abriéndolo si está cerrado.
		 *
		 * @method
		 * @name toggleNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @example
		 * $("#selector").rup_tree("toggleNode", obj);
		 */
		toggleNode: function (obj) {
			$(this).jstree('toggle_node', obj);
		},
		/**
		 * Abre todos los nodos que se encuentren dentro de un nodo o de un árbol y a su vez muestra todos sus hijos.
		 * Si el nodo no ha sido cargado previamente, será cargado y abierto una vez esté listo.
		 *
		 * @method
		 * @name openAll
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a abrir de forma recursiva. Permite usar el elemento del DOM, el identificador, el selector, etc. Si se omite,
		 * se abrirán todos los nodos del árbol.
		 * @param {number|boolean} animation - Duración de la animación de apertura del nodo en milisegundos (sobrescribe el
		 * ajuste `core.animation`). Utilizar `false` para deshabilitar la animación.
		 * @param {jQuery} original_obj - Referencia al nodo que inició el proceso (uso interno del componente subyacente).
		 * @fires open_all.jstree
		 * @example
		 * $("#selector").rup_tree("openAll", obj, animation, original_obj);
		 */
		openAll: function (obj, animation, original_obj) {
			$(this).jstree('open_all', obj, animation, original_obj);
		},
		/**
		 * Cierra todos los nodos que se encuentren dentro de un nodo o de un árbol.
		 *
		 * @method
		 * @name closeAll
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a cerrar de forma recursiva. Permite usar el elemento del DOM, el identificador, el selector, etc. Si se omite,
		 * se cerrarán todos los nodos del árbol.
		 * @param {number|boolean} animation - Duración de la animación de apertura del nodo en milisegundos (sobrescribe el
		 * ajuste `core.animation`). Utilizar `false` para deshabilitar la animación.
		 * @fires close_all.jstree
		 * @example
		 * $("#selector").rup_tree("closeAll", obj, animation);
		 */
		closeAll: function (obj, animation) {
			$(this).jstree('close_all', obj, animation);
		},
		/**
		 * Comprueba si el nodo está desactivado (no es seleccionable).
		 *
		 * @method
		 * @name isDisabled
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo está desactivado.
		 * @example
		 * $("#selector").rup_tree("isDisabled", obj);
		 */
		isDisabled: function (obj) {
			return ($(this).jstree('is_disabled', obj));
		},
		/**
		 * Habilita un nodo para permitir su selección.
		 *
		 * @method
		 * @name enableNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a habilitar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @fires enable_node.jstree
		 * @example
		 * $("#selector").rup_tree("enableNode", obj);
		 */
		enableNode: function (obj) {
			$(this).jstree('enable_node', obj);
		},
		/**
		 * Deshabilita un nodo para no permitir su selección.
		 *
		 * @method
		 * @name disableNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a deshabilitar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @fires disable_node.jstree
		 * @example
		 * $("#selector").rup_tree("disableNode", obj);
		 */
		disableNode: function (obj) {
			$(this).jstree('disable_node', obj);
		},
		/**
		 * Determina si un nodo está oculto.
		 *
		 * @method
		 * @name isHidden
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo está oculto.
		 * @example
		 * $("#selector").rup_tree("isHidden", obj);
		 */
		isHidden: function (obj) {
			return $(this).jstree('is_hidden', obj);
		},
		/**
		 * Oculta un nodo. Permanecerá en la estructura pero no será visible.
		 *
		 * @method
		 * @name hideNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a ocultar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} skip_redraw - Argumento interno del componente subyacente que controla si se llama o no al método `redraw`.
		 * @fires hide_node.jstree
		 * @example
		 * $("#selector").rup_tree("hideNode", obj, skip_redraw);
		 */
		hideNode: function (obj, skip_redraw) {
			$(this).jstree('hide_node', obj, skip_redraw);
		},
		/**
		 * Muestra un nodo.
		 *
		 * @method
		 * @name showNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a mostrar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} skip_redraw - Argumento interno del componente subyacente que controla si se llama o no al método `redraw`.
		 * @fires show_node.jstree
		 * @example
		 * $("#selector").rup_tree("showNode", obj, skip_redraw);
		 */
		showNode: function (obj, skip_redraw) {
			$(this).jstree('show_node', obj, skip_redraw);
		},
		/**
		 * Oculta todos los nodos.
		 *
		 * @method
		 * @name hideAll
		 * @since UDA 5.1.0
		 * @fires hide_all.jstree
		 * @example
		 * $("#selector").rup_tree("hideAll");
		 */
		hideAll: function () {
			$(this).jstree('hide_all');
		},
		/**
		 * Muestra todos los nodos.
		 *
		 * @method
		 * @name showAll
		 * @since UDA 5.1.0
		 * @fires show_all.jstree
		 * @example
		 * $("#selector").rup_tree("showAll");
		 */
		showAll: function () {
			$(this).jstree('show_all');
		},
		/**
		 * Selecciona un nodo.
		 *
		 * @method
		 * @name selectNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a seleccionar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} supress_event - Si se define a `true`, el evento `changed.jstree` no será lanzado.
		 * @param {boolean} prevent_open - Si se define a `true`, los padres del nodo seleccionado no serán abiertos.
		 * @fires select_node.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("selectNode", obj, supress_event, prevent_open);
		 */
		selectNode: function (obj, supress_event, prevent_open) {
			$(this).jstree('select_node', obj, supress_event, prevent_open);
		},
		/**
		 * Deselecciona un nodo.
		 *
		 * @method
		 * @name deselectNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a deseleccionar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean} supress_event - Si se define a `true`, el evento `changed.jstree` no será lanzado.
		 * @fires deselect_node.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("deselectNode", obj, supress_event);
		 */
		deselectNode: function (obj, supress_event) {
			$(this).jstree('deselect_node', obj, supress_event);
		},
		/**
		 * Selecciona todos los nodos del árbol.
		 *
		 * @method
		 * @name selectAll
		 * @since UDA 5.1.0
		 * @param {boolean} supress_event - Si se define a `true`, el evento `changed.jstree` no será lanzado.
		 * @fires select_all.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("selectAll", supress_event);
		 */
		selectAll: function (supress_event) {
			$(this).jstree('select_all', supress_event);
		},
		/**
		 * Deselecciona todos los nodos seleccionados.
		 *
		 * @method
		 * @name deselectAll
		 * @since UDA 5.1.0
		 * @param {boolean} supress_event - Si se define a `true`, el evento `changed.jstree` no será lanzado.
		 * @fires deselect_all.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("deselectAll", supress_event);
		 */
		deselectAll: function (supress_event) {
			$(this).jstree('deselect_all', supress_event);
		},
		/**
		 * Comprueba si un nodo se encuentra seleccionado.
		 *
		 * @method
		 * @name isSelected
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo se encuentra seleccionado.
		 * @example
		 * $("#selector").rup_tree("isSelected", obj);
		 */
		isSelected: function (obj) {
			return ($(this).jstree('is_selected', obj));
		},
		/**
		 * Permite obtener un array de todos los nodos seleccionados.
		 *
		 * @method
		 * @name getSelected
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos seleccionados.
		 * @example
		 * $("#selector").rup_tree("getSelected", full);
		 */
		getSelected: function (full) {
			return ($(this).jstree('get_selected', full));
		},
		/**
		 * Permite obtener un array de todos los nodos de alto nivel que estén seleccionados (ignora los hijos seleccionados).
		 *
		 * @method
		 * @name getTopSelected
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos de alto nivel seleccionados.
		 * @example
		 * $("#selector").rup_tree("getTopSelected", full);
		 */
		getTopSelected: function (full) {
			return $(this).jstree('get_top_selected', full);
		},
		/**
		 * Permite obtener un array de todos los nodos de bajo nivel que estén seleccionados (ignora los padres seleccionados).
		 *
		 * @method
		 * @name getBottomSelected
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos de alto nivel seleccionados.
		 * @example
		 * $("#selector").rup_tree("getBottomSelected", full);
		 */
		getBottomSelected: function (full) {
			return $(this).jstree('get_bottom_selected', full);
		},
		/**
		 * Refresca el árbol. Todos los nodos son recargados con llamadas a `load_node`.
		 *
		 * @method
		 * @name refresh
		 * @since UDA 5.1.0
		 * @param {boolean} skip_loading - Opción para evitar mostrar el indicador de carga.
		 * @param {boolean|function} forget_state - Si se define a `true` el estado no volverá a ser aplicado, en cambio, 
		 * si se define una función que reciba el estado actual como parámetro, el resultado de esa función será usado como estado.
		 * @fires refresh.jstree
		 * @example
		 * $("#selector").rup_tree("refresh", skip_loading, forget_state);
		 */
		refresh: function (skip_loading, forget_state) {
			$(this).jstree('refresh', skip_loading, forget_state);
		},
		/**
		 * Refresca un nodo del árbol incluyendo sus hijos. Todos los nodos hijos que estén desplegados son recargados con llamadas a `load_node`.
		 *
		 * @method
		 * @name refreshNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @fires refresh_node.jstree
		 * @example
		 * $("#selector").rup_tree("refreshNode", obj);
		 */
		refreshNode: function (obj) {
			$(this).jstree('refresh_node', obj);
		},
		/**
		 * Establece (cambia) el identificador de un nodo.
		 *
		 * @method
		 * @name setId
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {string} id - El nuevo identificador a definir.
		 * @return {boolean} - Notifica si el proceso termina con éxito o no.
		 * @fires set_id.jstree
		 * @example
		 * $("#selector").rup_tree("setId", obj, id);
		 */
		setId: function (obj, id) {
			return $(this).jstree('set_id', obj, id);
		},
		/**
		 * Obtiene el texto de un nodo.
		 *
		 * @method
		 * @name getText
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {string} - Texto del nodo.
		 * @example
		 * $("#selector").rup_tree("getText", obj);
		 */
		getText: function (obj) {
			return $(this).jstree('get_text', obj);
		},
		/**
		 * Obtiene una representación en JSON del nodo o incluso del árbol completo.
		 *
		 * @method
		 * @name getJson
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {Object} options - Objeto con propiedades a usar para la obtención del JSON.
		 * @param {boolean} options.no_state - Para evitar la devolución de la información del estado.
		 * @param {boolean} options.no_id - Para evitar la devolución del identificador.
		 * @param {boolean} options.no_children - Para evitar la inclusión de los hijos.
		 * @param {boolean} options.no_data - Para evitar la inclusión de los datos del nodo.
		 * @param {boolean} options.no_li_attr - Para evitar la devolución de los atributos del elemento `li`.
		 * @param {boolean} options.no_a_attr - Para evitar la devolución de los atributos del elemento `a`.
		 * @param {boolean} options.flat - Para devolver un JSON plano en vez de anidado.
		 * @return {Object} - Representación en JSON.
		 * @example
		 * $("#selector").rup_tree("getJson", obj, options);
		 */
		getJson: function (obj, options) {
			return $(this).jstree('get_json', obj, options);
		},
		/**
		 * Crea un nuevo nodo (no confundir con `load_node`).
		 *
		 * @method
		 * @name createNode
		 * @since UDA 5.1.0
		 * @param {?string} par - El nodo padre. Para crear un nodo raíz se puede utilizar tanto `#` como `null`.
		 * @param {Object|string} node - Los datos para el nuevo nodo. Tiene que ser un objeto JSON válido, o una cadena simple que contenga el nombre.
		 * @param {number|string} [pos="last"] - Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer), 
		 * también es posible usar las cadenas `first` y `last` o `before` y `after`.
		 * @param {function} callback - Función a ejecutar cuando el nodo haya sido creado.
		 * @param {boolean} is_loaded - Argumento interno del componente subyacente que indica si la carga del nodo padre es satisfactoria.
		 * @return {string} - El identificador del nodo recién creado.
		 * @fires model.jstree, create_node.jstree
		 * @example
		 * $("#selector").rup_tree("createNode", par, node, pos, callback, is_loaded);
		 */
		createNode: function (par, node, pos, callback, is_loaded) {
			return $(this).jstree('create_node', par, node, pos, callback, is_loaded);
		},
		/**
		 * Establece el texto de un nodo.
		 *
		 * @method
		 * @name renameNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Es posible utilizar un array para renombrar múltiples nodos a la vez.
		 * @param {string} val - El nuevo texto.
		 * @return {boolean} - Notifica si el proceso termina con éxito o no.
		 * @fires rename_node.jstree
		 * @example
		 * $("#selector").rup_tree("renameNode", obj, val);
		 */
		renameNode: function (obj, val) {
			return $(this).jstree('rename_node', obj, val);
		},
		/**
		 * Elimina un nodo.
		 *
		 * @method
		 * @name deleteNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a eliminar. Es posible utilizar un array para eliminar múltiples nodos a la vez.
		 * @return {boolean} - Notifica si el proceso termina con éxito o no.
		 * @fires delete_node.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("deleteNode", obj, val);
		 */
		deleteNode: function (obj) {
			return $(this).jstree('delete_node', obj);
		},
		/**
		 * Obtener el último error.
		 *
		 * @method
		 * @name lastError
		 * @since UDA 5.1.0
		 * @return {Object} - Contiene el error.
		 * @example
		 * $("#selector").rup_tree("lastError");
		 */
		lastError: function () {
			return $(this).jstree('last_error');
		},
		/**
		 * Mueve el nodo a un nuevo padre.
		 *
		 * @method
		 * @name moveNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a mover. Es posible utilizar un array para mover múltiples nodos a la vez.
		 * @param {*} par - El nuevo padre.
		 * @param {number|string} [pos=0] - Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer), 
		 * también es posible usar las cadenas `first` y `last` o `before` y `after`.
		 * @param {function} callback - Función a ejecutar cuando la migración haya sido completada. Recibe tres parámetros, el nodo,
		 * el nuevo padre y la posición.
		 * @param {boolean} is_loaded - Parámetro interno que indica si el nodo padre ha sido cargado.
		 * @param {boolean} skip_redraw - Parámetro interno que indica si el árbol debería de ser repintado.
		 * @param {boolean} instance - Parámetro interno que indica si el nodo viene de otra instancia.
		 * @fires move_node.jstree
		 * @example
		 * $("#selector").rup_tree("moveNode", obj, par, pos, callback, is_loaded, skip_redraw, instance);
		 */
		moveNode: function (obj, par, pos, callback, is_loaded, skip_redraw, instance) {
			$(this).jstree('move_node', obj, par, pos, callback, is_loaded, skip_redraw, instance);
		},
		/**
		 * Copia el nodo a un nuevo padre.
		 *
		 * @method
		 * @name copyNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a copiar. Es posible utilizar un array para copiar múltiples nodos a la vez.
		 * @param {*} par - El nuevo padre.
		 * @param {number|string} [pos=0] - Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer), 
		 * también es posible usar las cadenas `first` y `last` o `before` y `after`.
		 * @param {function} callback - Función a ejecutar cuando la migración haya sido completada. Recibe tres parámetros, el nodo,
		 * el nuevo padre y la posición.
		 * @param {boolean} is_loaded - Parámetro interno que indica si el nodo padre ha sido cargado.
		 * @param {boolean} skip_redraw - Parámetro interno que indica si el árbol debería de ser repintado.
		 * @param {boolean} instance - Parámetro interno que indica si el nodo viene de otra instancia.
		 * @fires model.jstree, copy_node.jstree
		 * @example
		 * $("#selector").rup_tree("copyNode", obj, par, pos, callback, is_loaded, skip_redraw, instance);
		 */
		copyNode: function (obj, par, pos, callback, is_loaded, skip_redraw, instance) {
			$(this).jstree('copy_node', obj, par, pos, callback, is_loaded, skip_redraw, instance);
		},
		/**
		 * Corta un nodo que podrá ser pegado llamando al método `paste(obj)`.
		 *
		 * @method
		 * @name cut
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a cortar. Es posible utilizar un array para cortar múltiples nodos a la vez.
		 * @fires cut.jstree
		 * @example
		 * $("#selector").rup_tree("cut", obj);
		 */
		cut: function (obj) {
			$(this).jstree('cut', obj);
		},
		/**
		 * Copia un nodo que podrá ser pegado llamando al método `paste(obj)`.
		 *
		 * @method
		 * @name copy
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a copiar. Es posible utilizar un array para copiar múltiples nodos a la vez.
		 * @fires copy.jstree
		 * @example
		 * $("#selector").rup_tree("copy", obj);
		 */
		copy: function (obj) {
			$(this).jstree('copy', obj);
		},
		/**
		 * Obtiene el buffer actual (nodos a la espera de ser pegados).
		 *
		 * @method
		 * @name getBuffer
		 * @since UDA 5.1.0
		 * @return {Object} - Contiene el tipo de operación en la propiedad `mode` y puede contener `copy_node` o `move_node`.
		 * También alberga un array de objetos con los nodos en cola en la propiedad `node` y la instancia en la propiedad `inst`.
		 * @example
		 * $("#selector").rup_tree("getBuffer");
		 */
		getBuffer: function () {
			return $(this).jstree('get_buffer');
		},
		/**
		 * Comprueba en el buffer si existe algún nodo que pueda ser pegado.
		 *
		 * @method
		 * @name canPaste
		 * @since UDA 5.1.0
		 * @return {boolean} - Indica si la operación de pegado puede ser o no realizada.
		 * @example
		 * $("#selector").rup_tree("canPaste");
		 */
		canPaste: function () {
			return $(this).jstree('can_paste');
		},
		/**
		 * Copia o mueve los nodos cortados o copiados previamente a un nuevo padre.
		 *
		 * @method
		 * @name paste
		 * @since UDA 5.1.0
		 * @param {*} obj - El nuevo padre.
		 * @param {number|string} [pos=0] - Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer), 
		 * también es posible usar las cadenas `first` y `last`.
		 * @fires paste.jstree
		 * @example
		 * $("#selector").rup_tree("paste", obj, pos);
		 */
		paste: function (obj, pos) {
			$(this).jstree('paste', obj, pos);
		},
		/**
		 * Limpia el buffer de elementos copiados o cortados.
		 *
		 * @method
		 * @name clearBuffer
		 * @since UDA 5.1.0
		 * @fires clear_buffer.jstree
		 * @example
		 * $("#selector").rup_tree("clearBuffer");
		 */
		clearBuffer: function () {
			$(this).jstree('clear_buffer');
		},
		/**
		 * Activa el modo de edición sobre un nodo (genera un campo de texto para renombrar el nodo).
		 *
		 * @method
		 * @name edit
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {string} default_text - Valor a cargar en el campo de texto. Si se omite o define a un valor que no sea de tipo string,
		 * se usará el valor que contenga el nodo.
		 * @param {function} callback - Función a ejecutar cuando el campo de texto pierda el foco. Es llamado en el ámbito de la instancia
		 * y recibe como parámetros el nodo, el estado (con valor `true` si el renombrado es exitoso, de lo contrario con valor `false`), 
		 * un booleano que indica si el usuario canceló la edición y el valor original sin escapar provisto por el usuario.
		 * @example
		 * $("#selector").rup_tree("edit", obj, default_text, callback);
		 */
		edit: function (obj, default_text, callback) {
			$(this).jstree('edit', obj, default_text, callback);
		},
		/**
		 * Cambia el tema.
		 *
		 * @method
		 * @name setTheme
		 * @since UDA 5.1.0
		 * @param {string} theme_name - Nombre del tema a aplicar.
		 * @param {boolean|string} theme_url - Ubicación del CSS del tema a aplicar. Si el fichero ha sido incluido manualmente, se debe omitir el argumento
		 * o definirlo a `false`. Para cargarlo automáticamente del directorio establecido en `core.themes.dir`, será necesario fijarlo a `true`.
		 * @fires set_theme.jstree
		 * @example
		 * $("#selector").rup_tree("setTheme", theme_name, theme_url);
		 */
		setTheme: function (theme_name, theme_url) {
			$(this).jstree('set_theme', theme_name, theme_url);
		},
		/**
		 * Obtiene el nombre del tema en uso.
		 *
		 * @method
		 * @name getTheme
		 * @since UDA 5.1.0
		 * @return {string} - Nombre del tema.
		 * @example
		 * $("#selector").rup_tree("getTheme");
		 */
		getTheme: function () {
			return $(this).jstree('get_theme');
		},
		/**
		 * Cambia la variante del tema en uso (si el tema dispone de variantes).
		 *
		 * @method
		 * @name setThemeVariant
		 * @since UDA 5.1.0
		 * @param {string|boolean} variant_name - Variante a aplicar. Si se define a `false` la variante actual es eliminada.
		 * @example
		 * $("#selector").rup_tree("setThemeVariant", variant_name);
		 */
		setThemeVariant: function (variant_name) {
			$(this).jstree('set_theme_variant', variant_name);
		},
		/**
		 * Obtiene la variante del tema en uso.
		 *
		 * @method
		 * @name getThemeVariant
		 * @since UDA 5.1.0
		 * @return {string} - Variante del tema.
		 * @example
		 * $("#selector").rup_tree("get_theme_variant");
		 */
		getThemeVariant: function () {
			return $(this).jstree('get_theme_variant');
		},
		/**
		 * Muestra líneas de fondo en el contenedor (solo si el tema en uso lo soporta).
		 *
		 * @method
		 * @name showStripes
		 * @since UDA 5.1.0
		 * @fires show_stripes.jstree
		 * @example
		 * $("#selector").rup_tree("showStripes");
		 */
		showStripes: function () {
			$(this).jstree('show_stripes');
		},
		/**
		 * Oculta las líneas de fondo del contenedor.
		 *
		 * @method
		 * @name hideStripes
		 * @since UDA 5.1.0
		 * @fires hide_stripes.jstree
		 * @example
		 * $("#selector").rup_tree("hideStripes");
		 */
		hideStripes: function () {
			$(this).jstree('hide_stripes');
		},
		/**
		 * Alterna entre mostrar u ocultar las líneas de fondo del contenedor.
		 *
		 * @method
		 * @name toggleStripes
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("toggleStripes");
		 */
		toggleStripes: function () {
			$(this).jstree('toggle_stripes');
		},
		/**
		 * Muestra los puntos conectores entre nodos (solo si el tema en uso lo soporta).
		 *
		 * @method
		 * @name showDots
		 * @since UDA 5.1.0
		 * @fires show_dots.jstree
		 * @example
		 * $("#selector").rup_tree("showDots");
		 */
		showDots: function () {
			$(this).jstree('show_dots');
		},
		/**
		 * Oculta los puntos conectores entre nodos.
		 *
		 * @method
		 * @name hideDots
		 * @since UDA 5.1.0
		 * @fires hide_dots.jstree
		 * @example
		 * $("#selector").rup_tree("hideDots");
		 */
		hideDots: function () {
			$(this).jstree('hide_dots');
		},
		/**
		 * Alterna entre mostrar u ocultar los puntos conectores entre nodos.
		 *
		 * @method
		 * @name toggleDots
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("toggleDots");
		 */
		toggleDots: function () {
			$(this).jstree('toggle_dots');
		},
		/**
		 * Muestra iconos en los nodos.
		 *
		 * @method
		 * @name showIcons
		 * @since UDA 5.1.0
		 * @fires show_icons.jstree
		 * @example
		 * $("#selector").rup_tree("showIcons");
		 */
		showIcons: function () {
			$(this).jstree('show_icons');
		},
		/**
		 * Oculta los iconos en los nodos.
		 *
		 * @method
		 * @name hideIcons
		 * @since UDA 5.1.0
		 * @fires hide_icons.jstree
		 * @example
		 * $("#selector").rup_tree("hideIcons");
		 */
		hideIcons: function () {
			$(this).jstree('hide_icons');
		},
		/**
		 * Alterna entre mostrar u ocultar los iconos en los nodos.
		 *
		 * @method
		 * @name toggleIcons
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("toggleIcons");
		 */
		toggleIcons: function () {
			$(this).jstree('toggle_icons');
		},
		/**
		 * Muestra la elipsis de los nodos.
		 *
		 * @method
		 * @name showEllipsis
		 * @since UDA 5.1.0
		 * @fires show_ellipsis.jstree
		 * @example
		 * $("#selector").rup_tree("showEllipsis");
		 */
		showEllipsis: function () {
			$(this).jstree('show_ellipsis');
		},
		/**
		 * Oculta la elipsis de los nodos.
		 *
		 * @method
		 * @name hideEllipsis
		 * @since UDA 5.1.0
		 * @fires hide_ellipsis.jstree
		 * @example
		 * $("#selector").rup_tree("hideEllipsis");
		 */
		hideEllipsis: function () {
			$(this).jstree('hide_ellipsis');
		},
		/**
		 * Alterna entre mostrar u ocultar la elipsis de los nodos.
		 *
		 * @method
		 * @name toggleEllipsis
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("toggleEllipsis");
		 */
		toggleEllipsis: function () {
			$(this).jstree('toggle_ellipsis');
		},
		/**
		 * Define el icono a usar en un nodo.
		 *
		 * @method
		 * @name setIcon
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {string} icon - El nuevo icono. Puede ser definida una ruta o una clase. Si se define una ruta a una imagen 
		 * que esté en el mismo directorio, se ha de usar el prefijo `./`, de lo contrario, se interpretará como una clase.
		 * @example
		 * $("#selector").rup_tree("setIcon", obj, icon);
		 */
		setIcon: function (obj, icon) {
			$(this).jstree('set_icon', obj, icon);
		},
		/**
		 * Obtener el icono en uso en un nodo.
		 *
		 * @method
		 * @name getIcon
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {string} - Icono en uso.
		 * @example
		 * $("#selector").rup_tree("getIcon", obj);
		 */
		getIcon: function (obj) {
			return $(this).jstree('get_icon', obj);
		},
		/**
		 * Oculta el icono de un nodo.
		 *
		 * @method
		 * @name hideIcon
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @example
		 * $("#selector").rup_tree("hideIcon", obj);
		 */
		hideIcon: function (obj) {
			$(this).jstree('hide_icon', obj);
		},
		/**
		 * Muestra el icono de un nodo.
		 *
		 * @method
		 * @name showIcon
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @example
		 * $("#selector").rup_tree("showIcon", obj);
		 */
		showIcon: function (obj) {
			$(this).jstree('show_icon', obj);
		},

		// Métodos públicos del checkbox.
		
		/**
		 * Obtener un array de todos los nodos con un estado "indeterminado".
		 *
		 * @method
		 * @name getUndetermined
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos obtenidos.
		 * @example
		 * $("#selector").rup_tree("getUndetermined", full);
		 */
		getUndetermined: function (full) {
			return $(this).jstree('get_undetermined', full);
		},
		/**
		 * Muestra los iconos checkbox en los nodos.
		 *
		 * @method
		 * @name showCheckboxes
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("showCheckboxes");
		 */
		showCheckboxes: function () {
			$(this).jstree('show_checkboxes');
		},
		/**
		 * Oculta los iconos checkbox en los nodos.
		 *
		 * @method
		 * @name hideCheckboxes
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("hideCheckboxes");
		 */
		hideCheckboxes: function () {
			$(this).jstree('hide_checkboxes');
		},
		/**
		 * Alterna entre mostrar u ocultar los iconos checkbox en los nodos.
		 *
		 * @method
		 * @name toggleCheckboxes
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("toggleCheckboxes");
		 */
		toggleCheckboxes: function () {
			$(this).jstree('toggle_checkboxes');
		},
		/**
		 * Comprueba si el nodo está en un estado "indeterminado".
		 *
		 * @method
		 * @name isUndetermined
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Informa si el estado del nodo es "indeterminado".
		 * @example
		 * $("#selector").rup_tree("isUndetermined", obj);
		 */
		isUndetermined: function (obj) {
			return $(this).jstree('is_undetermined', obj);
		},
		/**
		 * Deshabilita el checkbox de un nodo.
		 *
		 * @method
		 * @name disableCheckbox
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible 
		 * cargar múltiples nodos pasando un array.
		 * @fires disable_checkbox.jstree
		 * @example
		 * $("#selector").rup_tree("disableCheckbox", obj);
		 */
		disableCheckbox: function (obj) {
			$(this).jstree('disable_checkbox', obj);
		},
		/**
		 * Habilita el checkbox de un nodo.
		 *
		 * @method
		 * @name enableCheckbox
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible 
		 * cargar múltiples nodos pasando un array.
		 * @fires enable_checkbox.jstree
		 * @example
		 * $("#selector").rup_tree("enableCheckbox", obj);
		 */
		enableCheckbox: function (obj) {
			$(this).jstree('enable_checkbox', obj);
		},
		/**
		 * Obtiene los identificadores de los nodos seleccionados en la rama del árbol (no incluye el identificador del nodo pasado 
		 * como argumento).
		 *
		 * @method
		 * @name getCheckedDescendants
		 * @since UDA 5.1.0
		 * @param {string} id - Identificador del nodo.
		 * @return {Array} - Contiene los identificadores de los nodos obtenidos.
		 * @example
		 * $("#selector").rup_tree("getCheckedDescendants", id);
		 */
		getCheckedDescendants: function (id) {
			return $(this).jstree('get_checked_descendants', id);
		},
		/**
		 * Marca el checkbox de un nodo (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, 
		 * se recurrirá a `select_node`).
		 *
		 * @method
		 * @name checkNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible 
		 * marcar los checkbox de múltiples nodos pasando un array.
		 * @fires check_node.jstree
		 * @example
		 * $("#selector").rup_tree("checkNode", obj);
		 */
		checkNode: function (obj) {
			$(this).jstree('check_node', obj);
		},
		/**
		 * Desmarca el checkbox de un nodo (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, 
		 * se recurrirá a `deselect_node`).
		 *
		 * @method
		 * @name uncheckNode
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible 
		 * desmarcar los checkbox de múltiples nodos pasando un array.
		 * @fires uncheck_node.jstree
		 * @example
		 * $("#selector").rup_tree("uncheckNode", obj);
		 */
		uncheckNode: function (obj) {
			$(this).jstree('uncheck_node', obj);
		},
		/**
		 * Marca todos los checkbox de un árbol (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, 
		 * de lo contrario, se recurrirá a `select_all`).
		 *
		 * @method
		 * @name checkAll
		 * @since UDA 5.1.0
		 * @fires check_all.jstree, changed.jstree
		 * @example
		 * $("#selector").rup_tree("checkAll");
		 */
		checkAll: function () {
			$(this).jstree('check_all');
		},
		/**
		 * Desmarca todos los checkbox de un árbol (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, 
		 * de lo contrario, se recurrirá a `deselect_all`).
		 *
		 * @method
		 * @name uncheckAll
		 * @since UDA 5.1.0
		 * @fires uncheck_all.jstree
		 * @example
		 * $("#selector").rup_tree("uncheckAll");
		 */
		uncheckAll: function () {
			$(this).jstree('uncheck_all');
		},
		/**
		 * Comprueba si el checkbox de un nodo está marcado (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, 
		 * este método devolerá lo mismo que `is_selected`).
		 *
		 * @method
		 * @name isChecked
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {boolean} - Notifica si el nodo se encuentra marcado.
		 * @example
		 * $("#selector").rup_tree("isChecked", obj);
		 */
		isChecked: function (obj) {
			return $(this).jstree('is_checked', obj);
		},
		/**
		 * Obtiene un array de todos los nodos marcados (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, 
		 * este método devolerá lo mismo que `get_selected`).
		 *
		 * @method
		 * @name getChecked
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos obtenidos.
		 * @example
		 * $("#selector").rup_tree("getChecked", full);
		 */
		getChecked: function (full) {
			return $(this).jstree('get_checked', full);
		},
		/**
		 * Obtiene un array de todos los nodos de alto nivel que estén marcados (si en los ajustes del checkbox `tie_selection` 
		 * contiene un valor `true`, este método devolerá lo mismo que `get_top_selected`).
		 *
		 * @method
		 * @name getTopChecked
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos obtenidos.
		 * @example
		 * $("#selector").rup_tree("getTopChecked", full);
		 */
		getTopChecked: function (full) {
			return $(this).jstree('get_top_checked', full);
		},
		/**
		 * Obtiene un array de todos los nodos de bajo nivel que estén marcados (si en los ajustes del checkbox `tie_selection` 
		 * contiene un valor `true`, este método devolerá lo mismo que `get_bottom_selected`).
		 *
		 * @method
		 * @name getBottomChecked
		 * @since UDA 5.1.0
		 * @param {boolean} full - Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos, 
		 * de lo contrario, solo tendrá los identificadores.
		 * @return {Array} - Contiene los nodos obtenidos.
		 * @example
		 * $("#selector").rup_tree("getBottomChecked", full);
		 */
		getBottomChecked: function (full) {
			return $(this).jstree('get_bottom_checked', full);
		},

		// Métodos públicos del contextmenu.

		/**
		 * Prepara y muestra el menú contextual de un nodo.
		 *
		 * @method
		 * @name showContextmenu
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {number} x - Coordenada del eje x relativa al documento donde se mostrará el menú contextual.
		 * @param {number} y - Coordenada del eje y relativa al documento donde se mostrará el menú contextual.
		 * @fires show_contextmenu.jstree
		 * @example
		 * $("#selector").rup_tree("showContextmenu", obj, x, y);
		 */
		showContextmenu: function (obj, x, y) {
			$(this).jstree('show_contextmenu', obj, x, y);
		},

		// Métodos públicos del search.

		/**
		 * Busca entre los nodos del árbol la cadena proporcionada.
		 *
		 * @method
		 * @name search
		 * @since UDA 5.1.0
		 * @param {string} str - La cadena a usar para la búsqueda.
		 * @param {boolean} skip_async - Si se define a `true`, no se hará la petición al servidor, aunque así esté configurado.
		 * @param {boolean} show_only_matches - Si se define a `true`, solo se mostrarán los nodos que coincidan (hay que tener en cuenta 
		 * que esta opción puede ser muy lenta en árboles grandes o navegadores antiguos).
		 * @param {*} [inside] - Nodo opcional sobre el que limitar la búsqueda (sobre sus hijos).
		 * @param {boolean} append - Si se define a `true`, los resultados de la búsqueda serán añadidos a los de la anterior consulta.
		 * @fires search.jstree
		 * @example
		 * $("#selector").rup_tree("search", str, skip_async, show_only_matches, inside, append);
		 */
		search: function (str, skip_async, show_only_matches, inside, append) {
			$(this).jstree('search', str, skip_async, show_only_matches, inside, append);
		},
		/**
		 * Limpia los resultados de la última búsqueda (elimina las clases y muestra todos los nodos si el filtrado está habilitado).
		 *
		 * @method
		 * @name clearSearch
		 * @since UDA 5.1.0
		 * @fires clear_search.jstree
		 * @example
		 * $("#selector").rup_tree("clearSearch");
		 */
		clearSearch: function () {
			$(this).jstree('clear_search');
		},

		// Métodos públicos del state.

		/**
		 * Guarda el estado.
		 *
		 * @method
		 * @name saveState
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("saveState");
		 */
		saveState: function () {
			$(this).jstree('save_state');
		},
		/**
		 * Restaura el estado desde el ordenador del usuario.
		 *
		 * @method
		 * @name restoreState
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("restoreState");
		 */
		restoreState: function () {
			$(this).jstree('restore_state');
		},
		/**
		 * Limpia el estado en el ordenador del usuario.
		 *
		 * @method
		 * @name clearState
		 * @since UDA 5.1.0
		 * @example
		 * $("#selector").rup_tree("clearState");
		 */
		clearState: function () {
			$(this).jstree('clear_state');
		},

		// Metodos públicos de la especificación de types.

		/**
		 * Obtiene las reglas del plugin `type` de un nodo.
		 *
		 * @method
		 * @name getRules
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @return {Object} - Contiene las reglas obtenidas.
		 * @example
		 * $("#selector").rup_tree("getRules", obj);
		 */
		getRules: function (obj) {
			return $(this).jstree('get_rules', obj);
		},
		/**
		 * Obtiene del nodo el tipo o los ajustes en un objecto.
		 *
		 * @method
		 * @name getType
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {boolean|string} rules -  Si se pasa un booleano con valor `true` en vez de una cadena, se devolerá 
		 * un objecto que contenga los ajustes.
		 * @return {string|Object} - Contiene las reglas obtenidas.
		 * @example
		 * $("#selector").rup_tree("getType", obj, rules);
		 */
		getType: function (obj, rules) {
			return $(this).jstree('get_type', obj, rules);
		},
		/**
		 * Cambia el tipo de un nodo.
		 *
		 * @method
		 * @name setType
		 * @since UDA 5.1.0
		 * @param {*} obj - Nodo a cambiar. Permite usar el elemento del DOM, el identificador, el selector, etc.
		 * @param {string} type -  Nuevo tipo a definir.
		 * @example
		 * $("#selector").rup_tree("setType", obj, type);
		 */
		setType: function (obj, type) {
			$(this).jstree('set_type', obj, type);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	jQuery.fn.rup_tree('extend', {
		_init: function (args) {
			global.initRupI18nPromise.then(() => {
				if (args.length > 1) {
					jQuery.rup.errorGestor(jQuery.rup.i18n.base.rup_global.initError + jQuery(this).attr('id'));
				} else {
					// Se recogen y cruzan las paremetrizaciones.
					if (args.length > 0) {
						if (args[0].select) {
							args[0].ui = args[0].select;
							delete args[0].select;
						}
						if (args[0].jQueryUIStyles) {
							args[0].themeroller = args[0].jQueryUIStyles;
							delete args[0].jQueryUIStyles;
						}
					}

					var settings = jQuery.extend(true, {}, jQuery.fn.rup_tree.defaults, args[0]),
					selectorSelf = this;

					// Guardar referencia al $self.
					settings.$self = $(this);
					settings.$self.attr('ruptype', 'tree');

					$(this).data('settings', settings);

					// Se tapa la creación del arbol para evitar visualizaciones inapropiadas. Es recomendable que inicialmente, 
					// el componente sea invisible. Para ello se dispone de la clase "rup_tree".
					selectorSelf.addClass('rup_tree');

					// Almacenar los ajustes en el data del elemento.
					selectorSelf.data('settings', settings);

					// Cración del árbol.
					selectorSelf.jstree(settings);

					// Evento de inicializacion.
					selectorSelf.on('ready.jstree', function () {
						// Una vez creados y cargados todos los nodos, se libera la visualización del componente.
						$(this).removeClass('rup_tree');
					});

					// Auditar el componente.
					$.rup.auditComponent('rup_tree', 'init');
				}
			}).catch((error) => {
				console.error('Error al inicializar el componente:\n', error);
			});
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	 * @description Propiedades de configuración del componente.
	 * @see Para mas información consulte la documentación acerca de las opciones de configuración del plugin {@link https://www.jstree.com/api|jsTree}.
	 * @name defaults
	 * @property {Object} defaults - Preferencias por defecto ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults|API jsTree}).
	 * @property {Object<Array<string>>} [defaults.plugins=[]] - Plugins del componente 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.plugins|API jsTree}).
	 * @property {Object} defaults.core - Preferencias del núcleo ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core|API jsTree}).
	 * @property {*} [defaults.core.data=false] - Configuración de los datos ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.data|API jsTree}).
	 * @property {boolean|Object} [defaults.core.strings=false] - Configura las múltiples cadenas que son usados en el componente 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.strings|API jsTree}).
	 * @property {boolean} [defaults.core.check_callback=true] - Determina qué sucede cuando un usuario trata de modificar la estructura del árbol 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.check_callback|API jsTree}).
	 * @property {function} defaults.core.error - Callback llamado con un único argumento compuesto por un objecto simple cuando algo falla  
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.error|API jsTree}).
	 * @property {number|boolean} [defaults.core.animation=200] - Duración en milisegundos de la acción de apertura y cierre. Es posible deshabilitar la 
	 * animación si se define a `false` ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.animation|API jsTree}).
	 * @property {boolean} [defaults.core.multiple=false] - Indica si es posible seleccionar múltiples nodos 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.multiple|API jsTree}).
	 * @property {Object} defaults.core.themes - Preferencias del tema ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes|API jsTree}).
	 * @property {boolean|string} [defaults.core.themes.name=false] - Nombre del tema a usar 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.name|API jsTree}).
	 * @property {boolean|string} [defaults.core.themes.url=false] - Ubicación del CSS del tema a aplicar. Si el fichero es incluido manualmente, 
	 * se debe definir a `false`. Para cargarlo automáticamente del directorio establecido en `defaults.core.themes.dir`, será necesario fijarlo a `true`. 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.url|API jsTree}).
	 * @property {boolean|string} [defaults.core.themes.dir=false] - Ubicación de los temas del componente. Solamente se debe usar si `defaults.core.themes.dir` 
	 * es definido a `true` ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.dir|API jsTree}).
	 * @property {boolean} [defaults.core.themes.dots=false] - Permite mostrar los puntos conectores entre nodos 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.dots|API jsTree}).
	 * @property {boolean} [defaults.core.themes.icons=true] - Permite mostrar los iconos en los nodos 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.icons|API jsTree}).
	 * @property {boolean} [defaults.core.themes.ellipsis=false] - Indica si se debe mostrar la elipsis de los nodos 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.ellipsis|API jsTree}).
	 * @property {boolean} [defaults.core.themes.stripes=false] - Indica si se deben mostrar las líneas de fondo en el contenedor 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.stripes|API jsTree}).
	 * @property {boolean|string} [defaults.core.themes.variant='default'] - Especifica la variante a usar del tema actual 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.variant|API jsTree}).
	 * @property {boolean} [defaults.core.themes.responsive=true] - Especifica si se debería usar la versión responsiva de los temas en las pantallas pequeñas 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.responsive|API jsTree}).
	 * @property {boolean} [defaults.core.expand_selected_onload=false] - Si se define a `true` todos los padres de nodos seleccionados serán desplegados 
	 * una vez el árbol haya sido cargado ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.expand_selected_onload|API jsTree}).
	 * @property {boolean} [defaults.core.worker=false] - Permite utilizar "web workers" para parsear el JSON recibido sin bloquear la interfaz 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.worker|API jsTree}).
	 * @property {boolean} [defaults.core.force_text=false] - Fuerza el texto del nodo a texto plano y a escapar el HTML 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.force_text|API jsTree}).
	 * @property {boolean} [defaults.core.dblclick_toggle=true] - Indica si el nodo tendría que ser alternado entre abierto y cerrado si se hace una doble 
	 * pulsación sobre él ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.dblclick_toggle|API jsTree}).
	 * @property {boolean} [defaults.core.loaded_state=false] - Indica si los nodos cargados deberían formar parte del estado 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.loaded_state|API jsTree}).
	 * @property {boolean} [defaults.core.restore_focus=true] - Permite devolver el foco al último nodo que lo tuvo antes de perderlo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.restore_focus|API jsTree}).
	 * @property {boolean} [defaults.core.compute_elements_positions=false] - Fuerza la computación y el establecimiento de `aria-setsize` y `aria-posinset` de manera 
	 * explícita para cada ítem del árbol ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.compute_elements_positions|API jsTree}).
	 * @property {Object} defaults.core.keyboard - Permite definir atajos de teclado 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.core.keyboard|API jsTree}).
	 * @property {Object} defaults.checkbox - Preferencias para los checkbox ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox|API jsTree}).
	 * @property {boolean} [defaults.checkbox.visible=true] - Define la visibilidad de los checkbox 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox|API jsTree}).
	 * @property {boolean} [defaults.checkbox.three_state=true] - Define si al seleccionar un nodo padre deberían de marcarse también sus hijos y dejarlos con un 
	 * estado indeterminado ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.three_state|API jsTree}).
	 * @property {boolean} [defaults.checkbox.whole_node=true] - Permite seleccionar el nodo cuando se pulsa sobre cualquier parte de él, haciéndolo actuar como 
	 * si se pulsara sobre el checkbox ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.whole_node|API jsTree}).
	 * @property {string} [defaults.checkbox.cascade=''] - Controla cómo se aplican los cambios en cascada y la indeterminación 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade|API jsTree}).
	 * @property {boolean} [defaults.checkbox.tie_selection=true] - Controla si los checkbox están vinculados a la selección general del árbol o a un array interno 
	 * mantenido por el plugin del checkbox ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.tie_selection|API jsTree}).
	 * @property {boolean} [defaults.checkbox.cascade_to_disabled=true] - Controla si los cambios en cascada afectan a los checkbox deshabilitados 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade_to_disabled|API jsTree}).
	 * @property {boolean} [defaults.checkbox.cascade_to_hidden=true] - Controla si los cambios en cascada afectan a los checkbox ocultos 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade_to_hidden|API jsTree}).
	 * @property {boolean} [defaults.conditionalselect=true] - Define un callback que recibe dos parámetros (el nodo y el evento) para permitir o prevenir la interacción con 
	 * los nodos por parte del usuario. También es posible definirlo a `false` para prevenir la interacción del usuario con los nodos o a `true` para permitirlo a través 
	 * de la invocación a `activate_node`.
	 * @property {Object} defaults.contextmenu - Preferencias del menú contextual ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu|API jsTree}).
	 * @property {boolean} [defaults.contextmenu.select_node=true] - Indica si el nodo puede ser seleccionado cuando el menú contextual ha sido invocado sobre él 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.select_node|API jsTree}).
	 * @property {boolean} [defaults.contextmenu.show_at_node=true] - Indica si el menú contextual debería de ser mostrado alineado con el nodo. Si no se habilita, se usan 
	 * las coordenadas del ratón para ubicarlo ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.show_at_node|API jsTree}).
	 * @property {Object} defaults.contextmenu.items - Permite definir múltiples características del menú contextual 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.items|API jsTree}).
	 * @property {Object} defaults.dnd - Preferencias de "drag'n'drop" ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd|API jsTree}).
	 * @property {boolean} [defaults.dnd.copy=true] - Habilita la copia mientras se mueve un nodo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.copy|API jsTree}).
	 * @property {number} [defaults.dnd.open_timeout=500] - Número que indica cuánto tiempo es necesario para empezar a mover un nodo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.open_timeout|API jsTree}).
	 * @property {boolean|function} [defaults.dnd.is_draggable=true] - Función invocada cada vez que un nodo vaya a ser movido. Recibe como parámetros el nodo 
	 * a mover (en un array) y el evento que comenzó el movimiento ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.is_draggable|API jsTree}).
	 * @property {boolean} [defaults.dnd.check_while_dragging=true] - Indica si se deberían de realizar comprobaciones de manera constante mientras el usuario esté 
	 * moviendo un nodo ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.check_while_dragging|API jsTree}).
	 * @property {boolean} [defaults.dnd.always_copy=false] - Indica si los nodos de un árbol solo pueden ser copiados mediante el movimiento de arrastre 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.always_copy|API jsTree}).
	 * @property {number|string} [defaults.dnd.inside_pos=0] - Este ajuste indica cuando se mueve un nodo dentro de otro, en qué posición debería de ir el nuevo nodo. 
	 * Además de marcar la posición números, también se pueden usar las cadenas `first` (primera posición) y `last` (última posición) 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.inside_pos|API jsTree}).
	 * @property {boolean} [defaults.dnd.drag_selection=true] - Cuando se comienza a mover un nodo que está seleccionado, este ajuste controla si se deberían mover todos 
	 * los nodos seleccionados o únicamente el que se está moviendo ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.drag_selection|API jsTree}).
	 * @property {boolean|string} [defaults.dnd.touch=true] - Permite habilitar el movimiento de nodos en pantallas táctiles y también cómo se comporta en caso de 
	 * habilitiarlo ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.touch|API jsTree}).
	 * @property {boolean} [defaults.dnd.large_drop_target=false] - Controla si los items pueden ser soltados en cualquier parte del nodo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.large_drop_target|API jsTree}).
	 * @property {boolean} [defaults.dnd.large_drag_target=false] - Controla si el movimiento de un nodo puede ser comenzado desde cualquier parte de él o únicamente 
	 * desde el texto o icono ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.large_drag_target|API jsTree}).
	 * @property {boolean} [defaults.dnd.use_html5=true] - Permite usar la API de HTML5 en lugar de la clásica 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.use_html5|API jsTree}).
	 * @property {Object|function} defaults.massload - Configuración de carga masiva ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.massload|API jsTree}).
	 * @property {Object} defaults.search - Configuración de la búsqueda ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search|API jsTree}).
	 * @property {boolean|Object|function} [defaults.search.ajax=false] - Permite configurar AJAX 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.ajax|API jsTree}).
	 * @property {boolean} [defaults.search.fuzzy=false] - Indica si la búsqueda debería ser menos estricta 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.fuzzy|API jsTree}).
	 * @property {boolean} [defaults.search.case_sensitive=false] - Indica si la búsqueda debe distinguir entre mayúsculas y minúsculas 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.case_sensitive|API jsTree}).
	 * @property {boolean} [defaults.search.show_only_matches=false] - Indica si el árbol debería de ser filtrado por defecto para que solo muestre los nodos que 
	 * coinciden ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches|API jsTree}).
	 * @property {boolean} [defaults.search.show_only_matches_children=false] - Permite indicar si los hijos de los nodos coincidentes serán mostrados 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children|API jsTree}).
	 * @property {boolean} [defaults.search.close_opened_onclear=true] - Indica si todos los nodos que se encuentren abiertos mostrando el resultado de la búsqueda 
	 * deberían de ser cerrados una vez la búsqueda haya sido borrada o realizada de nuevo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.close_opened_onclear|API jsTree}).
	 * @property {boolean} [defaults.search.search_leaves_only=false] - Configura si los nodos hoja deberían de ser los únicos nodos mostrados en las búsquedas 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.search_leaves_only|API jsTree}).
	 * @property {boolean} [defaults.search.search_callback=false] - Permite lanzar un callback por cada nodo que haya en la estructura una vez se realiza 
	 * una búsqueda ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.search.search_callback|API jsTree}).
	 * @property {number} defaults.sort - Configuración de la ordenación ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.sort|API jsTree}).
	 * @property {Object} defaults.state - Preferencias del estado ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state|API jsTree}).
	 * @property {string} [defaults.state.key='jstree'] - Cadena a usar en la clave cuando se guarde el estado del árbol. Debería cambiarse cuando se utilicen 
	 * múltiples árboles en una misma vista ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state.key|API jsTree}).
	 * @property {string} [defaults.state.events='changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree'] - Lista de eventos separados 
	 * por un espacio que desencadenan un guardado de estado ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state.events|API jsTree}).
	 * @property {boolean|number} [defaults.state.ttl=false] - Tiempo en milisegundos hasta que el estado expire 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state.ttl|API jsTree}).
	 * @property {boolean|function} [defaults.state.filter=false] - Función que se ejecuta antes de restaurar el estado y recibe el estado como parámetro 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state.filter|API jsTree}).
	 * @property {boolean} [defaults.state.preserve_loaded=false] - Indica si los nodos cargados deberían de ser restaurados 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.state.preserve_loaded|API jsTree}).
	 * @property {Object} defaults.types - Preferencias de tipos ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.types|API jsTree}).
	 * @property {Object} defaults.unique - Preferencias de exclusividad ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.unique|API jsTree}).
	 * @property {boolean} [defaults.unique.case_sensitive=false] - Indica si la comparación debe distinguir entre mayúsculas y minúsculas 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.case_sensitive|API jsTree}).
	 * @property {boolean} [defaults.unique.trim_whitespace=false] - Indica si se deben eliminar los espacios en blanco antes de la comparación 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.trim_whitespace|API jsTree}).
	 * @property {function} defaults.unique.duplicate - Callback a ejecutar cuando un nuevo nodo es creado y el nombre ya está siendo usado por otro nodo 
	 * ({@link https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.duplicate|API jsTree}).
	 */
	jQuery.fn.rup_tree.defaults = {
			'plugins': [],
			'core': {
				'data': false,
				'strings': false,
				'check_callback': true,
				'animation': 200,
				'multiple': false,
				'themes': {
					'name': false,
					'url': false,
					'dir': false,
					'dots': false,
					'icons': true,
					'ellipsis': false,
					'stripes': false,
					'variant': 'default',
					'responsive': true
				},
				'expand_selected_onload': false,
				'worker': false,
				'force_text': false,
				'dblclick_toggle': true,
				'loaded_state': false,
				'restore_focus': true,
				'compute_elements_positions': false
			},
			'checkbox': {
				'visible': true,
				'three_state': true,
				'whole_node': true,
				'keep_selected_style': true,
				'cascade': '',
				'tie_selection': true,
				'cascade_to_disabled': true,
				'cascade_to_hidden': true
			},
			'conditionalselect': true,
			'contextmenu': {
				'select_node': true,
				'show_at_node': true,
				'items': function (o, cb) { // Could be an object directly
					return {
						'create' : {
							'separator_before'	: false,
							'separator_after'	: true,
							'_disabled'			: false, //(this.check('create_node', data.reference, {}, 'last')),
							'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.create'),
							'action'			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								inst.create_node(obj, {}, 'last', function (new_node) {
									try {
										inst.edit(new_node);
									} catch (ex) {
										setTimeout(function () { inst.edit(new_node); },0);
									}
								});
							}
						},
						'rename' : {
							'separator_before'	: false,
							'separator_after'	: false,
							'_disabled'			: false, //(this.check('rename_node', data.reference, this.get_parent(data.reference), '')),
							'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.rename'),
							/*!
							'shortcut'			: 113,
							'shortcut_label'	: 'F2',
							'icon'				: 'glyphicon glyphicon-leaf',
							*/
							'action'			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								inst.edit(obj);
							}
						},
						'remove' : {
							'separator_before'	: false,
							'icon'				: false,
							'separator_after'	: false,
							'_disabled'			: false, //(this.check('delete_node', data.reference, this.get_parent(data.reference), '')),
							'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.remove'),
							'action'			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								if(inst.is_selected(obj)) {
									inst.delete_node(inst.get_selected());
								}
								else {
									inst.delete_node(obj);
								}
							}
						},
						'ccp' : {
							'separator_before'	: true,
							'icon'				: false,
							'separator_after'	: false,
							'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.ccp.label'),
							'action'			: false,
							'submenu' : {
								'cut' : {
									'separator_before'	: false,
									'separator_after'	: false,
									'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.ccp.cut'),
									'action'			: function (data) {
										var inst = $.jstree.reference(data.reference),
											obj = inst.get_node(data.reference);
										if(inst.is_selected(obj)) {
											inst.cut(inst.get_top_selected());
										}
										else {
											inst.cut(obj);
										}
									}
								},
								'copy' : {
									'separator_before'	: false,
									'icon'				: false,
									'separator_after'	: false,
									'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.ccp.copy'),
									'action'			: function (data) {
										var inst = $.jstree.reference(data.reference),
											obj = inst.get_node(data.reference);
										if(inst.is_selected(obj)) {
											inst.copy(inst.get_top_selected());
										}
										else {
											inst.copy(obj);
										}
									}
								},
								'paste' : {
									'separator_before'	: false,
									'icon'				: false,
									'_disabled'			: function (data) {
										return !$.jstree.reference(data.reference).can_paste();
									},
									'separator_after'	: false,
									'label'				: $.rup.i18nParse($.rup.i18n.base, 'rup_tree.ccp.paste'),
									'action'			: function (data) {
										var inst = $.jstree.reference(data.reference),
											obj = inst.get_node(data.reference);
										inst.paste(obj);
									}
								}
							}
						}
					}
				}
			},
			'dnd': {
				'copy': true,
				'open_timeout': 500,
				'is_draggable': true,
				'check_while_dragging': true,
				'always_copy': false,
				'inside_pos': 0,
				'drag_selection': true,
				'touch': true,
				'large_drop_target': false,
				'large_drag_target': false,
				'use_html5': true
			},
			'search': {
				'ajax': false,
				'fuzzy': false,
				'case_sensitive': false,
				'show_only_matches': false,
				'show_only_matches_children': false,
				'close_opened_onclear': true,
				'search_leaves_only': false,
				'search_callback': false
			},
			'state': {
				'key': 'jstree',
				'events': 'changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree',
				'ttl': false,
				'filter': false,
				'preserve_loaded': false
			},
			'unique': {
				'case_sensitive': false,
				'trim_whitespace': false
			}
	};
}));
