# Componentes RUP – Árbol

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1 Introducción](#1-introducción)
   - [2 Ejemplo](#2-ejemplo)
   - [3 Casos de uso](#3-casos-de-uso)
   - [4 Infraestructura](#4-infraestructura)
      - [4.1 Ficheros](#4.1-ficheros)
      - [4.2 Dependencias](#4.2-dependencias)
      - [4.3 Versión minimizada](#4.3-versión-minimizada)
   - [5 Invocación](#5-invocación)
   - [6 Obtención de los datos](#6-obtención-de-los-datos)
      - [6.1 HTML](#6.1-html)
      - [6.2 JSON](#6.2-json)
      - [6.3 Carga mediante Ajax](#6.3-carga-mediante-ajax)
   - [7 Plugins](#7-plugins)
      - [7.1 Core](#7.1-core)
      - [7.2 Changed](#7.2-changed)
      - [7.3 Checkbox](#7.3-checkbox)
      - [7.4 Conditionalselect](#7.4-conditionalselect)
      - [7.5 Contextmenu](#7.5-contextmenu)
      - [7.6 Drag'n'drop](#7.6-drag'n'drop)
      - [7.7 Massload](#7.7-massload)
      - [7.8 Search](#7.8-search)
      - [7.9 Sort](#7.9-sort)
      - [7.10 State](#7.10-state)
      - [7.11 Types](#7.11-types)
      - [7.12 Unique](#7.12-unique)
      - [7.13 Wholerow](#7.13-wholerow)
   - [8 Sobreescritura del theme](#8-sobreescritura-del-theme)

<!-- /MDTOC -->

## 1 Introducción
La descripción del **Componente Árbol**, visto desde el punto de vista de RUP, es la siguiente:

*Permite al usuario mostrar y ocultar de manera selectiva, información mostrada en una estructura jerárquica.*

## 2 Ejemplo
Se presenta a continuación un ejemplo de este componente:

![rup.tree](img/rup.tree_1.png)

## 3 Casos de uso
Se aconseja la utilización de este componente:

- Cuando sea necesario mostrar información jerarquizada.

## 4 Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

- Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados Ficheros y Dependencias.

### 4.1 Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.tree-x.y.z.js**
Ruta theme: rup/css/
Fichero CSS del theme: **theme.rup.tree-x.y.z.css**

### 4.2	Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript jQuery, es necesaria la inclusión del esta.

•	**jQuery 3.6.1**: http://jquery.com/
	La gestión de la ciertas partes visuales de los componentes, se han realizado mediante el plugin jQuery UI que se basa en jQuery y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros.

•	**jsTree 3.3.12**: https://www.jstree.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:
	- jquery-3.6.1.js
	- jstree.js
	- rup.tree-x.y.z.js

###	4.3 Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.

Los ficheros minimizados de RUP son los siguientes:
	- rup/scripts/min/rup.min-x.y.z.js
	- rup/css/rup.min-x.y.z.css

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

## 5 Invocación
El componente árbol se invoca sobre un elemento html existente en la jsp. Dicho elemento servirá de contenedor del arbol.
Un contenedor válido puede ser un simple tag div:

```html
<div id="ejemploArbolDiv"></div>
```

La invocación del componente sobre el contenedor se realiza del siguiente modo:
```javascript
var properties = {
	// Propiedades de configuración		
};
$('#ejemploArbolDiv').rup_tree(properties);
```

Como ya se profundizará mas adelante, mediante las propiedades indicadas en la invocación del componente, se realiza la configuración del mismo.

## 6 Obtención de los datos
El componente permite inicializar los nodos que componen el árbol a partir de diferentes tipos de datos. Es posible utilizar información en formato html, xml o json.

###	6.1 HTML
El componente permite inicializar los datos del árbol a partir de una lista html compuesta por los elementos ul y li.
Un ejemplo de una estructura html sería la siguiente:

```html
<div id="tree_example" class="tree_example_code">
	<ul>
		<li id="node1">
			<a href="#">Padre 1</a>
			<ul>
				<li id="node11">
					<a href="#">Padre 1.1</a>
					<ul>
						<li id="node111">
							<a href="#">Hoja 1.1.1</a>
						</li>
						<li id="node112">
							<a href="#">Padre 1.1.2</a>
							<ul>
								<li id="node1121">
									<a href="#">Hoja 1.1.2.1</a>
								</li>
								<li id="node1122">
									<a href="#">Hoja 1.1.2.2</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li id="node12">
					<a href="#">Hoja 1.2></a>
				</li>
			</ul>
		</li>
	</ul>
</div>
```

La invocación necesaria al componente para la creación del árbol a partir del html anterior sería:
```javascript
$('#tree_example').rup_tree({});
```

El componente toma como opción por defecto la inicialización del árbol a partir del html del objeto sobre el que se inicializa, de modo que no sería necesario indicar ningún parámetro adicional.

Las propiedades con las que se puede parametrizar la inicialización del componente árbol mediante html se detallan en la [API](https://www.jstree.com/api) del plugin subyacente jsTree.

###	6.2 JSON
El componente permite inicializar los datos que se muestran en el árbol a partir de la información existente en un objeto JSON.
Al no obtener los datos a partir de un html el objeto sobre el que se inicializa se simplifica:

```html
<div id="tree_example" class="tree_example_code"></div>
```

El objeto JSON se indicaría en la inicialización del componente árbol (las claves "**data**" y "**children**" han de llamarse obligatoriamente así):

```javascript
$('#tree_example').rup_tree({
	'core': {
		'data': [{
			'text': 'Padre 1',
			'children': [{
					'text': 'Padre 1.1',
					'children': [{
							'text': 'Hoja 1.1.1'
						},
						{
							'text': 'Padre 1.1.2',
							'children': ['Hoja 1.1.2.1', 'Hoja 1.1.2.2']
						}
					]
				},
				{
					'text': 'Hoja 1.2'
				}
			]
		}]
	}
});
```

Las propiedades con las que se puede parametrizar la inicialización del componente árbol mediante json se detallan en la [API](https://www.jstree.com/api) del plugin subyacente jsTree.

###	6.3 Carga mediante Ajax
El componente permite inicializar los datos del árbol a partir de la respuesta de una petición AJAX. En la API del plugin jsTree se detalla la configuración necesaria para inicializar el árbol mediante una petición AJAX que devuelva datos en formato html, json o xml.

Como ejemplo, vamos a detallar la implementación necesaria para inicializar un árbol mediante un objeto json que es devuelto por una petición AJAX.

El contenedor del árbol definido en la jsp sería:
```html
<div id="tree_example" class="tree_example_code" name="nombre_de_la_propiedad"></div>
```

El objeto JSON se indicaría en la inicialización del componente árbol:
```javascript
$('#tree_example').rup_tree({
	'core': {
		'data': {
			'url': 'url_peticion_ajax'
		}
	}
});
```
Desde el controller que escucha la petición se devolverá el json correspondiente a la representación de elementos que se quiere visualizar en el árbol.

```java
@RequestMapping(value = "url_peticion_ajax", method = RequestMethod.GET)
public Object getTreeAjax(Model model, HttpServletResponse response) {
	// Se crea y retorna el objeto json
}
```
El formato del objeto json es idéntico que en el caso de proporcionarse en la inicialización del componente.

## 7 Plugins
El diseño del componente árbol sigue el mismo modelo modular que el plugin subyacente en el que se basa. De este modo las diferentes funcionalidades se implementan en forma de módulos o plugins.

Los plugins existentes son los siguientes:

###	7.1 Core
Proporciona las propiedades de configuración para las funcionalidades comunes:
```javascript
$('#ejemploArbolDiv').rup_tree({
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
	}
});
```

###	7.2 Changed
Añade más información al evento `changed.jstree`. Los nuevos datos están contenidos en la propiedad de datos del evento `changed`, y contiene una lista de nodos `selected` y `deselected`:
```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['changed'],
	'changed': function (options, parent) {
		var last = [];
		this.trigger = function (ev, data) {
			var i, j;
			if(!data) {
				data = {};
			}
			if(ev.replace('.jstree','') === 'changed') {
				data.changed = { selected : [], deselected : [] };
				var tmp = {};
				for(i = 0, j = last.length; i < j; i++) {
					tmp[last[i]] = 1;
				}
				for(i = 0, j = data.selected.length; i < j; i++) {
					if(!tmp[data.selected[i]]) {
						data.changed.selected.push(data.selected[i]);
					}
					else {
						tmp[data.selected[i]] = 2;
					}
				}
				for(i = 0, j = last.length; i < j; i++) {
					if(tmp[last[i]] === 1) {
						data.changed.deselected.push(last[i]);
					}
				}
				last = data.selected.slice();
			}
			parent.trigger.call(this, ev, data);
		};
		this.refresh = function (skip_loading, forget_state) {
			last = [];
			return parent.refresh.apply(this, arguments);
		};
	}
});
```

###	7.3 Checkbox
Muestra iconos de casillas de verificación delante de cada nodo, lo que facilita la selección múltiple. También soporta el comportamiento de tri-estado, lo que significa que, si un nodo tiene algunos de sus hijos marcados, se renderizará como indeterminado, propagándose su estado hacia arriba:

![checkbox](img/rup.tree_2.png)

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['checkbox'],
	'checkbox': {
		'visible': true,
		'three_state': true,
		'whole_node': true,
		'keep_selected_style': true,
		'cascade': '',
		'tie_selection': true,
		'cascade_to_disabled': true,
		'cascade_to_hidden': true
	}
});
```

###	7.4	Conditionalselect
Define un callback para permitir o denegar la selección de nodos mediante la entrada del usuario (método de activación de nodos):

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['conditionalselect'],
	'conditionalselect': function () {
		return this.get_selected().length < 2;
	}
});
```

###	7.5	Contextmenu
Muestra un menú contextual cuando se hace clic con el botón derecho en un nodo:

![contextmenu](img/rup.tree_3.png)

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['contextmenu'],
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
	}
});
```

###	7.6	Drag'n'drop
Permite arrastrar y soltar nodos en el árbol, dando lugar a operaciones de movimiento o copia:
 ```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['dnd'],
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
	}
});
```

###	7.7	Massload
Añade la funcionalidad de carga masiva para que se puedan cargar varios nodos en una sola petición (solo es útil con la carga diferida):

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['massload'],
	'massload': function (options, parent) {
		this.init = function (el, options) {
			this._data.massload = {};
			parent.init.call(this, el, options);
		};
		this._load_nodes = function (nodes, callback, is_callback, force_reload) {
			var s = this.settings.massload,				
				toLoad = [],
				m = this._model.data,
				i, j, dom;
			if (!is_callback) {
				for(i = 0, j = nodes.length; i < j; i++) {
					if(!m[nodes[i]] || ( (!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || force_reload) ) {
						toLoad.push(nodes[i]);
						dom = this.get_node(nodes[i], true);
						if (dom && dom.length) {
							dom.addClass("jstree-loading").attr('aria-busy',true);
						}
					}
				}
				this._data.massload = {};
				if (toLoad.length) {
					if($.vakata.is_function(s)) {
						return s.call(this, toLoad, function (data) {
							var i, j;
							if(data) {
								for(i in data) {
									if(data.hasOwnProperty(i)) {
										this._data.massload[i] = data[i];
									}
								}
							}
							for(i = 0, j = nodes.length; i < j; i++) {
								dom = this.get_node(nodes[i], true);
								if (dom && dom.length) {
									dom.removeClass("jstree-loading").attr('aria-busy',false);
								}
							}
							parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
						}.bind(this));
					}
					if(typeof s === 'object' && s && s.url) {
						s = $.extend(true, {}, s);
						if($.vakata.is_function(s.url)) {
							s.url = s.url.call(this, toLoad);
						}
						if($.vakata.is_function(s.data)) {
							s.data = s.data.call(this, toLoad);
						}
						return $.ajax(s)
							.done(function (data,t,x) {
									var i, j;
									if(data) {
										for(i in data) {
											if(data.hasOwnProperty(i)) {
												this._data.massload[i] = data[i];
											}
										}
									}
									for(i = 0, j = nodes.length; i < j; i++) {
										dom = this.get_node(nodes[i], true);
										if (dom && dom.length) {
											dom.removeClass("jstree-loading").attr('aria-busy',false);
										}
									}
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}.bind(this))
							.fail(function (f) {
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}.bind(this));
					}
				}
			}
			return parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
		};
		this._load_node = function (obj, callback) {
			var data = this._data.massload[obj.id],
				rslt = null, dom;
			if(data) {
				rslt = this[typeof data === 'string' ? '_append_html_data' : '_append_json_data'](
					obj,
					typeof data === 'string' ? $($.parseHTML(data)).filter(function () { return this.nodeType !== 3; }) : data,
					function (status) { callback.call(this, status); }
				);
				dom = this.get_node(obj.id, true);
				if (dom && dom.length) {
					dom.removeClass("jstree-loading").attr('aria-busy',false);
				}
				delete this._data.massload[obj.id];
				return rslt;
			}
			return parent._load_node.call(this, obj, callback);
		};
	}
});
```

###	7.8	Search
Añade la función de búsqueda:

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['search'],
	'search': {
		'ajax': false,
		'fuzzy': false,
		'case_sensitive': false,
		'show_only_matches': false,
		'show_only_matches_children': false,
		'close_opened_onclear': true,
		'search_leaves_only': false,
		'search_callback': false
	}
});
```

###	7.9 Sort
Ordena automáticamente todos los nodos del árbol según una función de ordenación:

![sort](img/rup.tree_4.png)

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['sort'],
	'sort': function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this.element
				.on("model.jstree", function (e, data) {
						this.sort(data.parent, true);
					}.bind(this))
				.on("rename_node.jstree create_node.jstree", function (e, data) {
						this.sort(data.parent || data.node.parent, false);
						this.redraw_node(data.parent || data.node.parent, true);
					}.bind(this))
				.on("move_node.jstree copy_node.jstree", function (e, data) {
						this.sort(data.parent, false);
						this.redraw_node(data.parent, true);
					}.bind(this));
		};
		this.sort = function (obj, deep) {
			var i, j;
			obj = this.get_node(obj);
			if(obj && obj.children && obj.children.length) {
				obj.children.sort(this.settings.sort.bind(this));
				if(deep) {
					for(i = 0, j = obj.children_d.length; i < j; i++) {
						this.sort(obj.children_d[i], false);
					}
				}
			}
		};
	}
});
```

###	7.10 State
Guarda el estado del árbol (nodos seleccionados, nodos abiertos) en el ordenador del usuario utilizando las opciones disponibles (localStorage, cookies, etc.):

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['state'],
	'state': {
		'key': 'jstree',
		'events': 'changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree',
		'ttl': false,
		'filter': false,
		'preserve_loaded': false
	}
});
```

###	7.11 Types
Permite añadir tipos predefinidos para grupos de nodos, que permiten controlar fácilmente las reglas de anidamiento y el icono de cada grupo:

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['types'],
	'types': {
		'valid_children' : ['tasks'],
		'tasks' : {
			'icon' : $.rup.STATICS+'/x21a/images/PendingWorks.png',
			'valid_children' : ['forms', 'invoice', 'repair', 'suppliers', 'transportation']
		},
		'forms' : {
			'icon' : $.rup.STATICS+'/x21a/images/forms.png',
			'valid_children' : ['job']
		},
		'invoice' : {
			'icon' : $.rup.STATICS+'/x21a/images/invoice.png',
			'valid_children' : ['job']
		},
		'repair' : {
			'icon' : $.rup.STATICS+'/x21a/images/repair.png',
			'valid_children' : ['job']
		},
		'job' : {
			'icon' : $.rup.STATICS+'/x21a/images/job.png',
			'valid_children' : ['none']
		},
		'suppliers' : {
			'icon' : $.rup.STATICS+'/x21a/images/suppliers.png',
			'valid_children' : ['job']
		},
		'transportation' : {
			'icon' : $.rup.STATICS+'/x21a/images/transportation.png',
			'valid_children' : ['job']
		}
	}
});
```

###	7.12 Unique
Se encarga de que no puedan coexistir nodos hermanos con el mismo nombre:

![unique](img/rup.tree_5.png)

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['unique'],
	'unique': {
		'case_sensitive': false,
		'trim_whitespace': false
	}
});
```

###	7.13 Wholerow
Provoca que cada nodo aparezca a nivel de bloque. Facilita la selección. Puede causar una ralentización de los árboles grandes en los navegadores antiguos:

```javascript
$('#ejemploArbolDiv').rup_tree({
	'plugins': ['wholerow'],
	'wholerow': function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			this.element
				.on('ready.jstree set_state.jstree', function () {
						this.hide_dots();
					}.bind(this))
				.on("init.jstree loading.jstree ready.jstree", function () {
						//div.style.height = this._data.core.li_height + 'px';
						this.get_container_ul().addClass('jstree-wholerow-ul');
					}.bind(this))
				.on("deselect_all.jstree", function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
					}.bind(this))
				.on("changed.jstree", function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
						var tmp = false, i, j;
						for(i = 0, j = data.selected.length; i < j; i++) {
							tmp = this.get_node(data.selected[i], true);
							if(tmp && tmp.length) {
								tmp.children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
							}
						}
					}.bind(this))
				.on("open_node.jstree", function (e, data) {
						this.get_node(data.node, true).find('.jstree-clicked').parent().children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
					}.bind(this))
				.on("hover_node.jstree dehover_node.jstree", function (e, data) {
						if(e.type === "hover_node" && this.is_disabled(data.node)) { return; }
						this.get_node(data.node, true).children('.jstree-wholerow')[e.type === "hover_node"?"addClass":"removeClass"]('jstree-wholerow-hovered');
					}.bind(this))
				.on("contextmenu.jstree", ".jstree-wholerow", function (e) {
						if (this._data.contextmenu) {
							e.preventDefault();
							var tmp = $.Event('contextmenu', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey, pageX : e.pageX, pageY : e.pageY });
							$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp);
						}
					}.bind(this))
				/*!
				.on("mousedown.jstree touchstart.jstree", ".jstree-wholerow", function (e) {
						if(e.target === e.currentTarget) {
							var a = $(e.currentTarget).closest(".jstree-node").children(".jstree-anchor");
							e.target = a[0];
							a.trigger(e);
						}
					})
				*/
				.on("click.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					})
				.on("dblclick.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('dblclick', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					})
				.on("click.jstree", ".jstree-leaf > .jstree-ocl", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					}.bind(this))
				.on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", function (e) {
						e.stopImmediatePropagation();
						if(!this.is_disabled(e.currentTarget)) {
							this.hover_node(e.currentTarget);
						}
						return false;
					}.bind(this))
				.on("mouseleave.jstree", ".jstree-node", function (e) {
						this.dehover_node(e.currentTarget);
					}.bind(this));
		};
		this.teardown = function () {
			if(this.settings.wholerow) {
				this.element.find(".jstree-wholerow").remove();
			}
			parent.teardown.call(this);
		};
		this.redraw_node = function(obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if(obj) {
				var tmp = div.cloneNode(true);
				//tmp.style.height = this._data.core.li_height + 'px';
				if($.inArray(obj.id, this._data.core.selected) !== -1) { tmp.className += ' jstree-wholerow-clicked'; }
				if(this._data.core.focused && this._data.core.focused === obj.id) { tmp.className += ' jstree-wholerow-hovered'; }
				obj.insertBefore(tmp, obj.childNodes[0]);
			}
			return obj;
		};
	}
});
```

##	8 Sobreescritura del theme
El componente árbol se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.tree-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.
