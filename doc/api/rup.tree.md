<a name="module_rup_tree"></a>

## rup\_tree
Permite al usuario mostrar y ocultar de manera selectiva, información mostrada en una estructura jerárquica.

**Summary**: Componente RUP Tree.  
**See**: El componente está basado en el plugin [jsTree](https://www.jstree.com). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](https://www.jstree.com/api).  
**Example**  
```js
$("#ejemploArbolDiv").rup_tree(properties);
```

* [rup_tree](#module_rup_tree)
    * [~defaults](#module_rup_tree..defaults)
    * [~getRupValue()](#module_rup_tree..getRupValue) ⇒ <code>string</code> \| <code>number</code>
    * [~setRupValue(values)](#module_rup_tree..setRupValue)
    * [~setFocus()](#module_rup_tree..setFocus)
    * [~unsetFocus()](#module_rup_tree..unsetFocus)
    * [~isFocused()](#module_rup_tree..isFocused) ⇒ <code>boolean</code>
    * [~destroy([keep_html])](#module_rup_tree..destroy)
    * [~createPrototypeNode()](#module_rup_tree..createPrototypeNode) ⇒ <code>DOMElement</code>
    * [~getContainer()](#module_rup_tree..getContainer) ⇒ <code>jQuery</code>
    * [~getNode(obj, as_dom)](#module_rup_tree..getNode) ⇒ <code>Object</code> \| <code>jQuery</code>
    * [~getPath(obj, glue, ids)](#module_rup_tree..getPath) ⇒ <code>string</code> \| <code>Array</code>
    * [~getNextDom(obj, strict)](#module_rup_tree..getNextDom) ⇒ <code>jQuery</code>
    * [~getPrevDom(obj, strict)](#module_rup_tree..getPrevDom) ⇒ <code>jQuery</code>
    * [~getParent(obj)](#module_rup_tree..getParent) ⇒ <code>string</code>
    * [~getChildrenDom(obj)](#module_rup_tree..getChildrenDom) ⇒ <code>jQuery</code> \| <code>boolean</code>
    * [~isParent(obj)](#module_rup_tree..isParent) ⇒ <code>boolean</code>
    * [~isLoaded(obj)](#module_rup_tree..isLoaded) ⇒ <code>boolean</code>
    * [~isLoading(obj)](#module_rup_tree..isLoading) ⇒ <code>boolean</code>
    * [~isOpen(obj)](#module_rup_tree..isOpen) ⇒ <code>boolean</code>
    * [~isClosed(obj)](#module_rup_tree..isClosed) ⇒ <code>boolean</code>
    * [~isLeaf(obj)](#module_rup_tree..isLeaf) ⇒ <code>boolean</code>
    * [~loadNode(obj, callback)](#module_rup_tree..loadNode) ⇒ <code>boolean</code>
    * [~loadAll([obj], callback)](#module_rup_tree..loadAll)
    * [~redraw(full)](#module_rup_tree..redraw)
    * [~openNode(obj, callback, animation)](#module_rup_tree..openNode)
    * [~closeNode(obj, animation)](#module_rup_tree..closeNode)
    * [~toggleNode(obj)](#module_rup_tree..toggleNode)
    * [~openAll(obj, animation, original_obj)](#module_rup_tree..openAll)
    * [~closeAll(obj, animation)](#module_rup_tree..closeAll)
    * [~isDisabled(obj)](#module_rup_tree..isDisabled) ⇒ <code>boolean</code>
    * [~enableNode(obj)](#module_rup_tree..enableNode)
    * [~disableNode(obj)](#module_rup_tree..disableNode)
    * [~isHidden(obj)](#module_rup_tree..isHidden) ⇒ <code>boolean</code>
    * [~hideNode(obj, skip_redraw)](#module_rup_tree..hideNode)
    * [~showNode(obj, skip_redraw)](#module_rup_tree..showNode)
    * [~hideAll()](#module_rup_tree..hideAll)
    * [~showAll()](#module_rup_tree..showAll)
    * [~selectNode(obj, supress_event, prevent_open)](#module_rup_tree..selectNode)
    * [~deselectNode(obj, supress_event)](#module_rup_tree..deselectNode)
    * [~selectAll(supress_event)](#module_rup_tree..selectAll)
    * [~deselectAll(supress_event)](#module_rup_tree..deselectAll)
    * [~isSelected(obj)](#module_rup_tree..isSelected) ⇒ <code>boolean</code>
    * [~getSelected(full)](#module_rup_tree..getSelected) ⇒ <code>Array</code>
    * [~getTopSelected(full)](#module_rup_tree..getTopSelected) ⇒ <code>Array</code>
    * [~getBottomSelected(full)](#module_rup_tree..getBottomSelected) ⇒ <code>Array</code>
    * [~refresh(skip_loading, forget_state)](#module_rup_tree..refresh)
    * [~refreshNode(obj)](#module_rup_tree..refreshNode)
    * [~setId(obj, id)](#module_rup_tree..setId) ⇒ <code>boolean</code>
    * [~getText(obj)](#module_rup_tree..getText) ⇒ <code>string</code>
    * [~getJson(obj, options)](#module_rup_tree..getJson) ⇒ <code>Object</code>
    * [~createNode(par, node, [pos], callback, is_loaded)](#module_rup_tree..createNode) ⇒ <code>string</code>
    * [~renameNode(obj, val)](#module_rup_tree..renameNode) ⇒ <code>boolean</code>
    * [~deleteNode(obj)](#module_rup_tree..deleteNode) ⇒ <code>boolean</code>
    * [~lastError()](#module_rup_tree..lastError) ⇒ <code>Object</code>
    * [~moveNode(obj, par, [pos], callback, is_loaded, skip_redraw, instance)](#module_rup_tree..moveNode)
    * [~copyNode(obj, par, [pos], callback, is_loaded, skip_redraw, instance)](#module_rup_tree..copyNode)
    * [~cut(obj)](#module_rup_tree..cut)
    * [~copy(obj)](#module_rup_tree..copy)
    * [~getBuffer()](#module_rup_tree..getBuffer) ⇒ <code>Object</code>
    * [~canPaste()](#module_rup_tree..canPaste) ⇒ <code>boolean</code>
    * [~paste(obj, [pos])](#module_rup_tree..paste)
    * [~clearBuffer()](#module_rup_tree..clearBuffer)
    * [~edit(obj, default_text, callback)](#module_rup_tree..edit)
    * [~setTheme(theme_name, theme_url)](#module_rup_tree..setTheme)
    * [~getTheme()](#module_rup_tree..getTheme) ⇒ <code>string</code>
    * [~setThemeVariant(variant_name)](#module_rup_tree..setThemeVariant)
    * [~getThemeVariant()](#module_rup_tree..getThemeVariant) ⇒ <code>string</code>
    * [~showStripes()](#module_rup_tree..showStripes)
    * [~hideStripes()](#module_rup_tree..hideStripes)
    * [~toggleStripes()](#module_rup_tree..toggleStripes)
    * [~showDots()](#module_rup_tree..showDots)
    * [~hideDots()](#module_rup_tree..hideDots)
    * [~toggleDots()](#module_rup_tree..toggleDots)
    * [~showIcons()](#module_rup_tree..showIcons)
    * [~hideIcons()](#module_rup_tree..hideIcons)
    * [~toggleIcons()](#module_rup_tree..toggleIcons)
    * [~showEllipsis()](#module_rup_tree..showEllipsis)
    * [~hideEllipsis()](#module_rup_tree..hideEllipsis)
    * [~toggleEllipsis()](#module_rup_tree..toggleEllipsis)
    * [~setIcon(obj, icon)](#module_rup_tree..setIcon)
    * [~getIcon(obj)](#module_rup_tree..getIcon) ⇒ <code>string</code>
    * [~hideIcon(obj)](#module_rup_tree..hideIcon)
    * [~showIcon(obj)](#module_rup_tree..showIcon)
    * [~getUndetermined(full)](#module_rup_tree..getUndetermined) ⇒ <code>Array</code>
    * [~showCheckboxes()](#module_rup_tree..showCheckboxes)
    * [~hideCheckboxes()](#module_rup_tree..hideCheckboxes)
    * [~toggleCheckboxes()](#module_rup_tree..toggleCheckboxes)
    * [~isUndetermined(obj)](#module_rup_tree..isUndetermined) ⇒ <code>boolean</code>
    * [~disableCheckbox(obj)](#module_rup_tree..disableCheckbox)
    * [~enableCheckbox(obj)](#module_rup_tree..enableCheckbox)
    * [~getCheckedDescendants(id)](#module_rup_tree..getCheckedDescendants) ⇒ <code>Array</code>
    * [~checkNode(obj)](#module_rup_tree..checkNode)
    * [~uncheckNode(obj)](#module_rup_tree..uncheckNode)
    * [~checkAll()](#module_rup_tree..checkAll)
    * [~uncheckAll()](#module_rup_tree..uncheckAll)
    * [~isChecked(obj)](#module_rup_tree..isChecked) ⇒ <code>boolean</code>
    * [~getChecked(full)](#module_rup_tree..getChecked) ⇒ <code>Array</code>
    * [~getTopChecked(full)](#module_rup_tree..getTopChecked) ⇒ <code>Array</code>
    * [~getBottomChecked(full)](#module_rup_tree..getBottomChecked) ⇒ <code>Array</code>
    * [~showContextmenu(obj, x, y)](#module_rup_tree..showContextmenu)
    * [~search(str, skip_async, show_only_matches, [inside], append)](#module_rup_tree..search)
    * [~clearSearch()](#module_rup_tree..clearSearch)
    * [~saveState()](#module_rup_tree..saveState)
    * [~restoreState()](#module_rup_tree..restoreState)
    * [~clearState()](#module_rup_tree..clearState)
    * [~getRules(obj)](#module_rup_tree..getRules) ⇒ <code>Object</code>
    * [~getType(obj, rules)](#module_rup_tree..getType) ⇒ <code>string</code> \| <code>Object</code>
    * [~setType(obj, type)](#module_rup_tree..setType)

<a name="module_rup_tree..defaults"></a>

### rup_tree~defaults
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_tree</code>](#module_rup_tree)  
**See**: Para mas información consulte la documentación acerca de las opciones de configuración del plugin [jsTree](https://www.jstree.com/api).  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| defaults | <code>Object</code> |  | Preferencias por defecto ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults)). |
| [defaults.plugins] | <code>Object.&lt;Array.&lt;string&gt;&gt;</code> | <code>[]</code> | Plugins del componente  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.plugins)). |
| defaults.core | <code>Object</code> |  | Preferencias del núcleo ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core)). |
| [defaults.core.data] | <code>\*</code> | <code>false</code> | Configuración de los datos ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.data)). |
| [defaults.core.strings] | <code>boolean</code> \| <code>Object</code> | <code>false</code> | Configura las múltiples cadenas que son usados en el componente  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.strings)). |
| [defaults.core.check_callback] | <code>boolean</code> | <code>true</code> | Determina qué sucede cuando un usuario trata de modificar la estructura del árbol  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.check_callback)). |
| defaults.core.error | <code>function</code> |  | Callback llamado con un único argumento compuesto por un objecto simple cuando algo falla   ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.error)). |
| [defaults.core.animation] | <code>number</code> \| <code>boolean</code> | <code>200</code> | Duración en milisegundos de la acción de apertura y cierre. Es posible deshabilitar la  animación si se define a `false` ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.animation)). |
| [defaults.core.multiple] | <code>boolean</code> | <code>false</code> | Indica si es posible seleccionar múltiples nodos  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.multiple)). |
| defaults.core.themes | <code>Object</code> |  | Preferencias del tema ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes)). |
| [defaults.core.themes.name] | <code>boolean</code> \| <code>string</code> | <code>false</code> | Nombre del tema a usar  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.name)). |
| [defaults.core.themes.url] | <code>boolean</code> \| <code>string</code> | <code>false</code> | Ubicación del CSS del tema a aplicar. Si el fichero es incluido manualmente,  se debe definir a `false`. Para cargarlo automáticamente del directorio establecido en `defaults.core.themes.dir`, será necesario fijarlo a `true`.  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.url)). |
| [defaults.core.themes.dir] | <code>boolean</code> \| <code>string</code> | <code>false</code> | Ubicación de los temas del componente. Solamente se debe usar si `defaults.core.themes.dir`  es definido a `true` ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.dir)). |
| [defaults.core.themes.dots] | <code>boolean</code> | <code>false</code> | Permite mostrar los puntos conectores entre nodos  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.dots)). |
| [defaults.core.themes.icons] | <code>boolean</code> | <code>true</code> | Permite mostrar los iconos en los nodos  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.icons)). |
| [defaults.core.themes.ellipsis] | <code>boolean</code> | <code>false</code> | Indica si se debe mostrar la elipsis de los nodos  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.ellipsis)). |
| [defaults.core.themes.stripes] | <code>boolean</code> | <code>false</code> | Indica si se deben mostrar las líneas de fondo en el contenedor  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.stripes)). |
| [defaults.core.themes.variant] | <code>boolean</code> \| <code>string</code> | <code>&#x27;default&#x27;</code> | Especifica la variante a usar del tema actual  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.variant)). |
| [defaults.core.themes.responsive] | <code>boolean</code> | <code>true</code> | Especifica si se debería usar la versión responsiva de los temas en las pantallas pequeñas  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.themes.responsive)). |
| [defaults.core.expand_selected_onload] | <code>boolean</code> | <code>false</code> | Si se define a `true` todos los padres de nodos seleccionados serán desplegados  una vez el árbol haya sido cargado ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.expand_selected_onload)). |
| [defaults.core.worker] | <code>boolean</code> | <code>false</code> | Permite utilizar "web workers" para parsear el JSON recibido sin bloquear la interfaz  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.worker)). |
| [defaults.core.force_text] | <code>boolean</code> | <code>false</code> | Fuerza el texto del nodo a texto plano y a escapar el HTML  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.force_text)). |
| [defaults.core.dblclick_toggle] | <code>boolean</code> | <code>true</code> | Indica si el nodo tendría que ser alternado entre abierto y cerrado si se hace una doble  pulsación sobre él ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.dblclick_toggle)). |
| [defaults.core.loaded_state] | <code>boolean</code> | <code>false</code> | Indica si los nodos cargados deberían formar parte del estado  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.loaded_state)). |
| [defaults.core.restore_focus] | <code>boolean</code> | <code>true</code> | Permite devolver el foco al último nodo que lo tuvo antes de perderlo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.restore_focus)). |
| [defaults.core.compute_elements_positions] | <code>boolean</code> | <code>false</code> | Fuerza la computación y el establecimiento de `aria-setsize` y `aria-posinset` de manera  explícita para cada ítem del árbol ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.compute_elements_positions)). |
| defaults.core.keyboard | <code>Object</code> |  | Permite definir atajos de teclado  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.core.keyboard)). |
| defaults.checkbox | <code>Object</code> |  | Preferencias para los checkbox ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox)). |
| [defaults.checkbox.visible] | <code>boolean</code> | <code>true</code> | Define la visibilidad de los checkbox  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox)). |
| [defaults.checkbox.three_state] | <code>boolean</code> | <code>true</code> | Define si al seleccionar un nodo padre deberían de marcarse también sus hijos y dejarlos con un  estado indeterminado ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.three_state)). |
| [defaults.checkbox.whole_node] | <code>boolean</code> | <code>true</code> | Permite seleccionar el nodo cuando se pulsa sobre cualquier parte de él, haciéndolo actuar como  si se pulsara sobre el checkbox ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.whole_node)). |
| [defaults.checkbox.cascade] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Controla cómo se aplican los cambios en cascada y la indeterminación  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade)). |
| [defaults.checkbox.tie_selection] | <code>boolean</code> | <code>true</code> | Controla si los checkbox están vinculados a la selección general del árbol o a un array interno  mantenido por el plugin del checkbox ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.tie_selection)). |
| [defaults.checkbox.cascade_to_disabled] | <code>boolean</code> | <code>true</code> | Controla si los cambios en cascada afectan a los checkbox deshabilitados  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade_to_disabled)). |
| [defaults.checkbox.cascade_to_hidden] | <code>boolean</code> | <code>true</code> | Controla si los cambios en cascada afectan a los checkbox ocultos  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.checkbox.cascade_to_hidden)). |
| [defaults.conditionalselect] | <code>boolean</code> | <code>true</code> | Define un callback que recibe dos parámetros (el nodo y el evento) para permitir o prevenir la interacción con  los nodos por parte del usuario. También es posible definirlo a `false` para prevenir la interacción del usuario con los nodos o a `true` para permitirlo a través  de la invocación a `activate_node`. |
| defaults.contextmenu | <code>Object</code> |  | Preferencias del menú contextual ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu)). |
| [defaults.contextmenu.select_node] | <code>boolean</code> | <code>true</code> | Indica si el nodo puede ser seleccionado cuando el menú contextual ha sido invocado sobre él  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.select_node)). |
| [defaults.contextmenu.show_at_node] | <code>boolean</code> | <code>true</code> | Indica si el menú contextual debería de ser mostrado alineado con el nodo. Si no se habilita, se usan  las coordenadas del ratón para ubicarlo ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.show_at_node)). |
| defaults.contextmenu.items | <code>Object</code> |  | Permite definir múltiples características del menú contextual  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.contextmenu.items)). |
| defaults.dnd | <code>Object</code> |  | Preferencias de "drag'n'drop" ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd)). |
| [defaults.dnd.copy] | <code>boolean</code> | <code>true</code> | Habilita la copia mientras se mueve un nodo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.copy)). |
| [defaults.dnd.open_timeout] | <code>number</code> | <code>500</code> | Número que indica cuánto tiempo es necesario para empezar a mover un nodo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.open_timeout)). |
| [defaults.dnd.is_draggable] | <code>boolean</code> \| <code>function</code> | <code>true</code> | Función invocada cada vez que un nodo vaya a ser movido. Recibe como parámetros el nodo  a mover (en un array) y el evento que comenzó el movimiento ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.is_draggable)). |
| [defaults.dnd.check_while_dragging] | <code>boolean</code> | <code>true</code> | Indica si se deberían de realizar comprobaciones de manera constante mientras el usuario esté  moviendo un nodo ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.check_while_dragging)). |
| [defaults.dnd.always_copy] | <code>boolean</code> | <code>false</code> | Indica si los nodos de un árbol solo pueden ser copiados mediante el movimiento de arrastre  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.always_copy)). |
| [defaults.dnd.inside_pos] | <code>number</code> \| <code>string</code> | <code>0</code> | Este ajuste indica cuando se mueve un nodo dentro de otro, en qué posición debería de ir el nuevo nodo.  Además de marcar la posición números, también se pueden usar las cadenas `first` (primera posición) y `last` (última posición)  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.inside_pos)). |
| [defaults.dnd.drag_selection] | <code>boolean</code> | <code>true</code> | Cuando se comienza a mover un nodo que está seleccionado, este ajuste controla si se deberían mover todos  los nodos seleccionados o únicamente el que se está moviendo ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.drag_selection)). |
| [defaults.dnd.touch] | <code>boolean</code> \| <code>string</code> | <code>true</code> | Permite habilitar el movimiento de nodos en pantallas táctiles y también cómo se comporta en caso de  habilitiarlo ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.touch)). |
| [defaults.dnd.large_drop_target] | <code>boolean</code> | <code>false</code> | Controla si los items pueden ser soltados en cualquier parte del nodo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.large_drop_target)). |
| [defaults.dnd.large_drag_target] | <code>boolean</code> | <code>false</code> | Controla si el movimiento de un nodo puede ser comenzado desde cualquier parte de él o únicamente  desde el texto o icono ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.large_drag_target)). |
| [defaults.dnd.use_html5] | <code>boolean</code> | <code>true</code> | Permite usar la API de HTML5 en lugar de la clásica  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.dnd.use_html5)). |
| defaults.massload | <code>Object</code> \| <code>function</code> |  | Configuración de carga masiva ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.massload)). |
| defaults.search | <code>Object</code> |  | Configuración de la búsqueda ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search)). |
| [defaults.search.ajax] | <code>boolean</code> \| <code>Object</code> \| <code>function</code> | <code>false</code> | Permite configurar AJAX  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.ajax)). |
| [defaults.search.fuzzy] | <code>boolean</code> | <code>false</code> | Indica si la búsqueda debería ser menos estricta  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.fuzzy)). |
| [defaults.search.case_sensitive] | <code>boolean</code> | <code>false</code> | Indica si la búsqueda debe distinguir entre mayúsculas y minúsculas  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.case_sensitive)). |
| [defaults.search.show_only_matches] | <code>boolean</code> | <code>false</code> | Indica si el árbol debería de ser filtrado por defecto para que solo muestre los nodos que  coinciden ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches)). |
| [defaults.search.show_only_matches_children] | <code>boolean</code> | <code>false</code> | Permite indicar si los hijos de los nodos coincidentes serán mostrados  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.show_only_matches_children)). |
| [defaults.search.close_opened_onclear] | <code>boolean</code> | <code>true</code> | Indica si todos los nodos que se encuentren abiertos mostrando el resultado de la búsqueda  deberían de ser cerrados una vez la búsqueda haya sido borrada o realizada de nuevo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.close_opened_onclear)). |
| [defaults.search.search_leaves_only] | <code>boolean</code> | <code>false</code> | Configura si los nodos hoja deberían de ser los únicos nodos mostrados en las búsquedas  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.search_leaves_only)). |
| [defaults.search.search_callback] | <code>boolean</code> | <code>false</code> | Permite lanzar un callback por cada nodo que haya en la estructura una vez se realiza  una búsqueda ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.search.search_callback)). |
| defaults.sort | <code>number</code> |  | Configuración de la ordenación ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.sort)). |
| defaults.state | <code>Object</code> |  | Preferencias del estado ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state)). |
| [defaults.state.key] | <code>string</code> | <code>&quot;&#x27;jstree&#x27;&quot;</code> | Cadena a usar en la clave cuando se guarde el estado del árbol. Debería cambiarse cuando se utilicen  múltiples árboles en una misma vista ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state.key)). |
| [defaults.state.events] | <code>string</code> | <code>&quot;&#x27;changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree&#x27;&quot;</code> | Lista de eventos separados  por un espacio que desencadenan un guardado de estado ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state.events)). |
| [defaults.state.ttl] | <code>boolean</code> \| <code>number</code> | <code>false</code> | Tiempo en milisegundos hasta que el estado expire  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state.ttl)). |
| [defaults.state.filter] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Función que se ejecuta antes de restaurar el estado y recibe el estado como parámetro  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state.filter)). |
| [defaults.state.preserve_loaded] | <code>boolean</code> | <code>false</code> | Indica si los nodos cargados deberían de ser restaurados  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.state.preserve_loaded)). |
| defaults.types | <code>Object</code> |  | Preferencias de tipos ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.types)). |
| defaults.unique | <code>Object</code> |  | Preferencias de exclusividad ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.unique)). |
| [defaults.unique.case_sensitive] | <code>boolean</code> | <code>false</code> | Indica si la comparación debe distinguir entre mayúsculas y minúsculas  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.case_sensitive)). |
| [defaults.unique.trim_whitespace] | <code>boolean</code> | <code>false</code> | Indica si se deben eliminar los espacios en blanco antes de la comparación  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.trim_whitespace)). |
| defaults.unique.duplicate | <code>function</code> |  | Callback a ejecutar cuando un nuevo nodo es creado y el nombre ya está siendo usado por otro nodo  ([API jsTree](https://www.jstree.com/api/#/?f=$.jstree.defaults.unique.duplicate)). |

<a name="module_rup_tree..getRupValue"></a>

### rup_tree~getRupValue() ⇒ <code>string</code> \| <code>number</code>
Método utilizado para obtener el valor del componente.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> \| <code>number</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$(selector).rup_tree("getRupValue");
```
<a name="module_rup_tree..setRupValue"></a>

### rup_tree~setRupValue(values)
Método utilizado para asignar el valor al componente.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>string</code> \| <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#selector").rup_tree("setRupValue", value);
```
<a name="module_rup_tree..setFocus"></a>

### rup_tree~setFocus()
Establece el foco sobre el componente.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("setFocus");
```
<a name="module_rup_tree..unsetFocus"></a>

### rup_tree~unsetFocus()
Quita el foco del componente.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("unsetFocus");
```
<a name="module_rup_tree..isFocused"></a>

### rup_tree~isFocused() ⇒ <code>boolean</code>
Comprueba si el componente tiene el foco.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Confirma si el componente tiene el foco.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("isFocused");
```
<a name="module_rup_tree..destroy"></a>

### rup_tree~destroy([keep_html])
Destruye la instancia.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| [keep_html] | <code>boolean</code> | Permite mantener la estructura en el DOM. |

**Example**  
```js
$("#selector").rup_tree("destroy");
```
<a name="module_rup_tree..createPrototypeNode"></a>

### rup_tree~createPrototypeNode() ⇒ <code>DOMElement</code>
Crea un nodo prototipo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("createPrototypeNode");
```
<a name="module_rup_tree..getContainer"></a>

### rup_tree~getContainer() ⇒ <code>jQuery</code>
Devuelve el contenedor de la instancia.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>jQuery</code> - - Contenedor de la instancia.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("getContainer");
```
<a name="module_rup_tree..getNode"></a>

### rup_tree~getNode(obj, as_dom) ⇒ <code>Object</code> \| <code>jQuery</code>
Obtiene la representación en JSON del nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Object</code> \| <code>jQuery</code> - - Representación del nodo.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| as_dom | <code>boolean</code> | Permite definir si devolverá un nodo de jQuery. |

**Example**  
```js
$("#selector").rup_tree("getNode", obj, as_dom);
```
<a name="module_rup_tree..getPath"></a>

### rup_tree~getPath(obj, glue, ids) ⇒ <code>string</code> \| <code>Array</code>
Obtiene la ruta a un nodo utilizando el texto de los nodos o sus identificadores.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> \| <code>Array</code> - - Ruta del nodo.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| glue | <code>string</code> | Cuando se requiera la ruta en string, se debe de pasar el "pegamento" como argumento (ej. `/`).  En los demás casos, se devolerá un array. |
| ids | <code>boolean</code> | En caso verdadero se devolverá la ruta usando el identificador, de lo contrario, se usará el texto del nodo. |

**Example**  
```js
$("#selector").rup_tree("getPath", obj, glue, ids);
```
<a name="module_rup_tree..getNextDom"></a>

### rup_tree~getNextDom(obj, strict) ⇒ <code>jQuery</code>
Devuelve el siguiente nodo visible que esté por debajo del nodo pasado como argumento.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>jQuery</code> - - Siguiente nodo visible.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| strict | <code>boolean</code> | En caso verdadero solo se devolverán los nodos hermanos. |

**Example**  
```js
$("#selector").rup_tree("getNextDom", obj, strict);
```
<a name="module_rup_tree..getPrevDom"></a>

### rup_tree~getPrevDom(obj, strict) ⇒ <code>jQuery</code>
Devuelve el anterior nodo visible que esté por encima del nodo pasado como argumento.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>jQuery</code> - - Anterior nodo visible.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| strict | <code>boolean</code> | En caso verdadero solo se devolverán los nodos hermanos. |

**Example**  
```js
$("#selector").rup_tree("getPrevDom", obj, strict);
```
<a name="module_rup_tree..getParent"></a>

### rup_tree~getParent(obj) ⇒ <code>string</code>
Devuelve el identificador del nodo padre.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - Identificador del nodo padre.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("getParent", obj);
```
<a name="module_rup_tree..getChildrenDom"></a>

### rup_tree~getChildrenDom(obj) ⇒ <code>jQuery</code> \| <code>boolean</code>
Devuelve una colección de los hijos de un nodo (deben de ser visibles).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>jQuery</code> \| <code>boolean</code> - - Colección de hijos o booleano falso (significa que algo fue mal).  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("getChildrenDom", obj);
```
<a name="module_rup_tree..isParent"></a>

### rup_tree~isParent(obj) ⇒ <code>boolean</code>
Comprueba si un nodo tiene hijos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Devuelve si es o no padre.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isParent", obj);
```
<a name="module_rup_tree..isLoaded"></a>

### rup_tree~isLoaded(obj) ⇒ <code>boolean</code>
Comprueba si un nodo ha sido cargado (los hijos han de estar disponibles).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si ha sido cargado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isLoaded", obj);
```
<a name="module_rup_tree..isLoading"></a>

### rup_tree~isLoading(obj) ⇒ <code>boolean</code>
Comprueba si un nodo está siendo cargado (los hijos han de cargándose).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo está siendo cargado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isLoading", obj);
```
<a name="module_rup_tree..isOpen"></a>

### rup_tree~isOpen(obj) ⇒ <code>boolean</code>
Comprueba si un nodo está desplegado.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo se encuentra desplegado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isOpen", obj);
```
<a name="module_rup_tree..isClosed"></a>

### rup_tree~isClosed(obj) ⇒ <code>boolean</code>
Comprueba si un nodo está contraído.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo se encuentra contraído.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isClosed", obj);
```
<a name="module_rup_tree..isLeaf"></a>

### rup_tree~isLeaf(obj) ⇒ <code>boolean</code>
Comprueba si un nodo no tiene hijos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo no tiene hijos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isLeaf", obj);
```
<a name="module_rup_tree..loadNode"></a>

### rup_tree~loadNode(obj, callback) ⇒ <code>boolean</code>
Carga un nodo (obtiene los hijos mediante el ajuste `core.data`). Es posible cargar múltiples nodos pasando un array como argumento.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si la carga fue realizada.  
**Emits**: <code>load\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a cargar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| callback | <code>function</code> | Función a ejecutar cuando la carga del nodo haya sido completada. Se ejecuta en  el ámbito de la instancia y recibe dos parámetros, el nodo y un estado de tipo booleano. |

**Example**  
```js
$("#selector").rup_tree("loadNode", obj, callback);
```
<a name="module_rup_tree..loadAll"></a>

### rup_tree~loadAll([obj], callback)
Carga todos los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>load\_all.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| [obj] | <code>\*</code> | Nodo a cargar de forma recursiva. De omitirlo, se cargarían todos los nodos del árbol. |
| callback | <code>function</code> | Función a ejecutar cuando la carga de los nodos haya sido completada. |

**Example**  
```js
$("#selector").rup_tree("loadAll", obj, callback);
```
<a name="module_rup_tree..redraw"></a>

### rup_tree~redraw(full)
Vuelve a dibujar los nodos que así lo requieran.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, todos los nodos del árbol volverán a ser dibujados. |

**Example**  
```js
$("#selector").rup_tree("redraw", full);
```
<a name="module_rup_tree..openNode"></a>

### rup_tree~openNode(obj, callback, animation)
Vuelve a dibujar los nodos que así lo requieran.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>open\_node.jstree, after\_open.jstree, before\_open.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a abrir. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| callback | <code>function</code> | Función a ejecutar cuando el nodo haya sido abierto. |
| animation | <code>number</code> \| <code>boolean</code> | Duración de la animación de apertura del nodo en milisegundos (sobrescribe el ajuste `core.animation`). Utilizar `false` para deshabilitar la animación. |

**Example**  
```js
$("#selector").rup_tree("openNode", obj, callback, animation);
```
<a name="module_rup_tree..closeNode"></a>

### rup_tree~closeNode(obj, animation)
Cierra el nodo, ocultando sus hijos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>close\_node.jstree, after\_close.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a cerrar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| animation | <code>number</code> \| <code>boolean</code> | Duración de la animación de apertura del nodo en milisegundos (sobrescribe el ajuste `core.animation`). Utilizar `false` para deshabilitar la animación. |

**Example**  
```js
$("#selector").rup_tree("closeNode", obj, animation);
```
<a name="module_rup_tree..toggleNode"></a>

### rup_tree~toggleNode(obj)
Alterna el estado de un nodo, cerrándolo si está abierto o abriéndolo si está cerrado.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("toggleNode", obj);
```
<a name="module_rup_tree..openAll"></a>

### rup_tree~openAll(obj, animation, original_obj)
Abre todos los nodos que se encuentren dentro de un nodo o de un árbol y a su vez muestra todos sus hijos.Si el nodo no ha sido cargado previamente, será cargado y abierto una vez esté listo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>open\_all.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a abrir de forma recursiva. Permite usar el elemento del DOM, el identificador, el selector, etc. Si se omite, se abrirán todos los nodos del árbol. |
| animation | <code>number</code> \| <code>boolean</code> | Duración de la animación de apertura del nodo en milisegundos (sobrescribe el ajuste `core.animation`). Utilizar `false` para deshabilitar la animación. |
| original_obj | <code>jQuery</code> | Referencia al nodo que inició el proceso (uso interno del componente subyacente). |

**Example**  
```js
$("#selector").rup_tree("openAll", obj, animation, original_obj);
```
<a name="module_rup_tree..closeAll"></a>

### rup_tree~closeAll(obj, animation)
Cierra todos los nodos que se encuentren dentro de un nodo o de un árbol.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>close\_all.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a cerrar de forma recursiva. Permite usar el elemento del DOM, el identificador, el selector, etc. Si se omite, se cerrarán todos los nodos del árbol. |
| animation | <code>number</code> \| <code>boolean</code> | Duración de la animación de apertura del nodo en milisegundos (sobrescribe el ajuste `core.animation`). Utilizar `false` para deshabilitar la animación. |

**Example**  
```js
$("#selector").rup_tree("closeAll", obj, animation);
```
<a name="module_rup_tree..isDisabled"></a>

### rup_tree~isDisabled(obj) ⇒ <code>boolean</code>
Comprueba si el nodo está desactivado (no es seleccionable).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo está desactivado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isDisabled", obj);
```
<a name="module_rup_tree..enableNode"></a>

### rup_tree~enableNode(obj)
Habilita un nodo para permitir su selección.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>enable\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a habilitar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("enableNode", obj);
```
<a name="module_rup_tree..disableNode"></a>

### rup_tree~disableNode(obj)
Deshabilita un nodo para no permitir su selección.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>disable\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a deshabilitar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("disableNode", obj);
```
<a name="module_rup_tree..isHidden"></a>

### rup_tree~isHidden(obj) ⇒ <code>boolean</code>
Determina si un nodo está oculto.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo está oculto.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isHidden", obj);
```
<a name="module_rup_tree..hideNode"></a>

### rup_tree~hideNode(obj, skip_redraw)
Oculta un nodo. Permanecerá en la estructura pero no será visible.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a ocultar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| skip_redraw | <code>boolean</code> | Argumento interno del componente subyacente que controla si se llama o no al método `redraw`. |

**Example**  
```js
$("#selector").rup_tree("hideNode", obj, skip_redraw);
```
<a name="module_rup_tree..showNode"></a>

### rup_tree~showNode(obj, skip_redraw)
Muestra un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a mostrar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| skip_redraw | <code>boolean</code> | Argumento interno del componente subyacente que controla si se llama o no al método `redraw`. |

**Example**  
```js
$("#selector").rup_tree("showNode", obj, skip_redraw);
```
<a name="module_rup_tree..hideAll"></a>

### rup_tree~hideAll()
Oculta todos los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_all.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideAll");
```
<a name="module_rup_tree..showAll"></a>

### rup_tree~showAll()
Muestra todos los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_all.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showAll");
```
<a name="module_rup_tree..selectNode"></a>

### rup_tree~selectNode(obj, supress_event, prevent_open)
Selecciona un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>select\_node.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a seleccionar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| supress_event | <code>boolean</code> | Si se define a `true`, el evento `changed.jstree` no será lanzado. |
| prevent_open | <code>boolean</code> | Si se define a `true`, los padres del nodo seleccionado no serán abiertos. |

**Example**  
```js
$("#selector").rup_tree("selectNode", obj, supress_event, prevent_open);
```
<a name="module_rup_tree..deselectNode"></a>

### rup_tree~deselectNode(obj, supress_event)
Deselecciona un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>deselect\_node.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a deseleccionar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| supress_event | <code>boolean</code> | Si se define a `true`, el evento `changed.jstree` no será lanzado. |

**Example**  
```js
$("#selector").rup_tree("deselectNode", obj, supress_event);
```
<a name="module_rup_tree..selectAll"></a>

### rup_tree~selectAll(supress_event)
Selecciona todos los nodos del árbol.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>select\_all.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| supress_event | <code>boolean</code> | Si se define a `true`, el evento `changed.jstree` no será lanzado. |

**Example**  
```js
$("#selector").rup_tree("selectAll", supress_event);
```
<a name="module_rup_tree..deselectAll"></a>

### rup_tree~deselectAll(supress_event)
Deselecciona todos los nodos seleccionados.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>deselect\_all.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| supress_event | <code>boolean</code> | Si se define a `true`, el evento `changed.jstree` no será lanzado. |

**Example**  
```js
$("#selector").rup_tree("deselectAll", supress_event);
```
<a name="module_rup_tree..isSelected"></a>

### rup_tree~isSelected(obj) ⇒ <code>boolean</code>
Comprueba si un nodo se encuentra seleccionado.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo se encuentra seleccionado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isSelected", obj);
```
<a name="module_rup_tree..getSelected"></a>

### rup_tree~getSelected(full) ⇒ <code>Array</code>
Permite obtener un array de todos los nodos seleccionados.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos seleccionados.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getSelected", full);
```
<a name="module_rup_tree..getTopSelected"></a>

### rup_tree~getTopSelected(full) ⇒ <code>Array</code>
Permite obtener un array de todos los nodos de alto nivel que estén seleccionados (ignora los hijos seleccionados).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos de alto nivel seleccionados.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getTopSelected", full);
```
<a name="module_rup_tree..getBottomSelected"></a>

### rup_tree~getBottomSelected(full) ⇒ <code>Array</code>
Permite obtener un array de todos los nodos de bajo nivel que estén seleccionados (ignora los padres seleccionados).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos de alto nivel seleccionados.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getBottomSelected", full);
```
<a name="module_rup_tree..refresh"></a>

### rup_tree~refresh(skip_loading, forget_state)
Refresca el árbol. Todos los nodos son recargados con llamadas a `load_node`.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>refresh.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| skip_loading | <code>boolean</code> | Opción para evitar mostrar el indicador de carga. |
| forget_state | <code>boolean</code> \| <code>function</code> | Si se define a `true` el estado no volverá a ser aplicado, en cambio,  si se define una función que reciba el estado actual como parámetro, el resultado de esa función será usado como estado. |

**Example**  
```js
$("#selector").rup_tree("refresh", skip_loading, forget_state);
```
<a name="module_rup_tree..refreshNode"></a>

### rup_tree~refreshNode(obj)
Refresca un nodo del árbol incluyendo sus hijos. Todos los nodos hijos que estén desplegados son recargados con llamadas a `load_node`.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>refresh\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("refreshNode", obj);
```
<a name="module_rup_tree..setId"></a>

### rup_tree~setId(obj, id) ⇒ <code>boolean</code>
Establece (cambia) el identificador de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el proceso termina con éxito o no.  
**Emits**: <code>set\_id.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| id | <code>string</code> | El nuevo identificador a definir. |

**Example**  
```js
$("#selector").rup_tree("setId", obj, id);
```
<a name="module_rup_tree..getText"></a>

### rup_tree~getText(obj) ⇒ <code>string</code>
Obtiene el texto de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - Texto del nodo.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("getText", obj);
```
<a name="module_rup_tree..getJson"></a>

### rup_tree~getJson(obj, options) ⇒ <code>Object</code>
Obtiene una representación en JSON del nodo o incluso del árbol completo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Object</code> - - Representación en JSON.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| options | <code>Object</code> | Objeto con propiedades a usar para la obtención del JSON. |
| options.no_state | <code>boolean</code> | Para evitar la devolución de la información del estado. |
| options.no_id | <code>boolean</code> | Para evitar la devolución del identificador. |
| options.no_children | <code>boolean</code> | Para evitar la inclusión de los hijos. |
| options.no_data | <code>boolean</code> | Para evitar la inclusión de los datos del nodo. |
| options.no_li_attr | <code>boolean</code> | Para evitar la devolución de los atributos del elemento `li`. |
| options.no_a_attr | <code>boolean</code> | Para evitar la devolución de los atributos del elemento `a`. |
| options.flat | <code>boolean</code> | Para devolver un JSON plano en vez de anidado. |

**Example**  
```js
$("#selector").rup_tree("getJson", obj, options);
```
<a name="module_rup_tree..createNode"></a>

### rup_tree~createNode(par, node, [pos], callback, is_loaded) ⇒ <code>string</code>
Crea un nuevo nodo (no confundir con `load_node`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - El identificador del nodo recién creado.  
**Emits**: <code>model.jstree, create\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| par | <code>string</code> |  | El nodo padre. Para crear un nodo raíz se puede utilizar tanto `#` como `null`. |
| node | <code>Object</code> \| <code>string</code> |  | Los datos para el nuevo nodo. Tiene que ser un objeto JSON válido, o una cadena simple que contenga el nombre. |
| [pos] | <code>number</code> \| <code>string</code> | <code>&quot;last&quot;</code> | Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer),  también es posible usar las cadenas `first` y `last` o `before` y `after`. |
| callback | <code>function</code> |  | Función a ejecutar cuando el nodo haya sido creado. |
| is_loaded | <code>boolean</code> |  | Argumento interno del componente subyacente que indica si la carga del nodo padre es satisfactoria. |

**Example**  
```js
$("#selector").rup_tree("createNode", par, node, pos, callback, is_loaded);
```
<a name="module_rup_tree..renameNode"></a>

### rup_tree~renameNode(obj, val) ⇒ <code>boolean</code>
Establece el texto de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el proceso termina con éxito o no.  
**Emits**: <code>rename\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Es posible utilizar un array para renombrar múltiples nodos a la vez. |
| val | <code>string</code> | El nuevo texto. |

**Example**  
```js
$("#selector").rup_tree("renameNode", obj, val);
```
<a name="module_rup_tree..deleteNode"></a>

### rup_tree~deleteNode(obj) ⇒ <code>boolean</code>
Elimina un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el proceso termina con éxito o no.  
**Emits**: <code>delete\_node.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a eliminar. Es posible utilizar un array para eliminar múltiples nodos a la vez. |

**Example**  
```js
$("#selector").rup_tree("deleteNode", obj, val);
```
<a name="module_rup_tree..lastError"></a>

### rup_tree~lastError() ⇒ <code>Object</code>
Obtener el último error.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Object</code> - - Contiene el error.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("lastError");
```
<a name="module_rup_tree..moveNode"></a>

### rup_tree~moveNode(obj, par, [pos], callback, is_loaded, skip_redraw, instance)
Mueve el nodo a un nuevo padre.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>move\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>\*</code> |  | Nodo a mover. Es posible utilizar un array para mover múltiples nodos a la vez. |
| par | <code>\*</code> |  | El nuevo padre. |
| [pos] | <code>number</code> \| <code>string</code> | <code>0</code> | Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer),  también es posible usar las cadenas `first` y `last` o `before` y `after`. |
| callback | <code>function</code> |  | Función a ejecutar cuando la migración haya sido completada. Recibe tres parámetros, el nodo, el nuevo padre y la posición. |
| is_loaded | <code>boolean</code> |  | Parámetro interno que indica si el nodo padre ha sido cargado. |
| skip_redraw | <code>boolean</code> |  | Parámetro interno que indica si el árbol debería de ser repintado. |
| instance | <code>boolean</code> |  | Parámetro interno que indica si el nodo viene de otra instancia. |

**Example**  
```js
$("#selector").rup_tree("moveNode", obj, par, pos, callback, is_loaded, skip_redraw, instance);
```
<a name="module_rup_tree..copyNode"></a>

### rup_tree~copyNode(obj, par, [pos], callback, is_loaded, skip_redraw, instance)
Copia el nodo a un nuevo padre.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>model.jstree, copy\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>\*</code> |  | Nodo a copiar. Es posible utilizar un array para copiar múltiples nodos a la vez. |
| par | <code>\*</code> |  | El nuevo padre. |
| [pos] | <code>number</code> \| <code>string</code> | <code>0</code> | Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer),  también es posible usar las cadenas `first` y `last` o `before` y `after`. |
| callback | <code>function</code> |  | Función a ejecutar cuando la migración haya sido completada. Recibe tres parámetros, el nodo, el nuevo padre y la posición. |
| is_loaded | <code>boolean</code> |  | Parámetro interno que indica si el nodo padre ha sido cargado. |
| skip_redraw | <code>boolean</code> |  | Parámetro interno que indica si el árbol debería de ser repintado. |
| instance | <code>boolean</code> |  | Parámetro interno que indica si el nodo viene de otra instancia. |

**Example**  
```js
$("#selector").rup_tree("copyNode", obj, par, pos, callback, is_loaded, skip_redraw, instance);
```
<a name="module_rup_tree..cut"></a>

### rup_tree~cut(obj)
Corta un nodo que podrá ser pegado llamando al método `paste(obj)`.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>cut.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a cortar. Es posible utilizar un array para cortar múltiples nodos a la vez. |

**Example**  
```js
$("#selector").rup_tree("cut", obj);
```
<a name="module_rup_tree..copy"></a>

### rup_tree~copy(obj)
Copia un nodo que podrá ser pegado llamando al método `paste(obj)`.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>copy.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a copiar. Es posible utilizar un array para copiar múltiples nodos a la vez. |

**Example**  
```js
$("#selector").rup_tree("copy", obj);
```
<a name="module_rup_tree..getBuffer"></a>

### rup_tree~getBuffer() ⇒ <code>Object</code>
Obtiene el buffer actual (nodos a la espera de ser pegados).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Object</code> - - Contiene el tipo de operación en la propiedad `mode` y puede contener `copy_node` o `move_node`.También alberga un array de objetos con los nodos en cola en la propiedad `node` y la instancia en la propiedad `inst`.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("getBuffer");
```
<a name="module_rup_tree..canPaste"></a>

### rup_tree~canPaste() ⇒ <code>boolean</code>
Comprueba en el buffer si existe algún nodo que pueda ser pegado.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Indica si la operación de pegado puede ser o no realizada.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("canPaste");
```
<a name="module_rup_tree..paste"></a>

### rup_tree~paste(obj, [pos])
Copia o mueve los nodos cortados o copiados previamente a un nuevo padre.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>paste.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>\*</code> |  | El nuevo padre. |
| [pos] | <code>number</code> \| <code>string</code> | <code>0</code> | Índice en el que insertar el nodo. Además de soportar la posición de forma numérica (integer),  también es posible usar las cadenas `first` y `last`. |

**Example**  
```js
$("#selector").rup_tree("paste", obj, pos);
```
<a name="module_rup_tree..clearBuffer"></a>

### rup_tree~clearBuffer()
Limpia el buffer de elementos copiados o cortados.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>clear\_buffer.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("clearBuffer");
```
<a name="module_rup_tree..edit"></a>

### rup_tree~edit(obj, default_text, callback)
Activa el modo de edición sobre un nodo (genera un campo de texto para renombrar el nodo).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| default_text | <code>string</code> | Valor a cargar en el campo de texto. Si se omite o define a un valor que no sea de tipo string, se usará el valor que contenga el nodo. |
| callback | <code>function</code> | Función a ejecutar cuando el campo de texto pierda el foco. Es llamado en el ámbito de la instancia y recibe como parámetros el nodo, el estado (con valor `true` si el renombrado es exitoso, de lo contrario con valor `false`),  un booleano que indica si el usuario canceló la edición y el valor original sin escapar provisto por el usuario. |

**Example**  
```js
$("#selector").rup_tree("edit", obj, default_text, callback);
```
<a name="module_rup_tree..setTheme"></a>

### rup_tree~setTheme(theme_name, theme_url)
Cambia el tema.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>set\_theme.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| theme_name | <code>string</code> | Nombre del tema a aplicar. |
| theme_url | <code>boolean</code> \| <code>string</code> | Ubicación del CSS del tema a aplicar. Si el fichero ha sido incluido manualmente, se debe omitir el argumento o definirlo a `false`. Para cargarlo automáticamente del directorio establecido en `core.themes.dir`, será necesario fijarlo a `true`. |

**Example**  
```js
$("#selector").rup_tree("setTheme", theme_name, theme_url);
```
<a name="module_rup_tree..getTheme"></a>

### rup_tree~getTheme() ⇒ <code>string</code>
Obtiene el nombre del tema en uso.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - Nombre del tema.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("getTheme");
```
<a name="module_rup_tree..setThemeVariant"></a>

### rup_tree~setThemeVariant(variant_name)
Cambia la variante del tema en uso (si el tema dispone de variantes).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| variant_name | <code>string</code> \| <code>boolean</code> | Variante a aplicar. Si se define a `false` la variante actual es eliminada. |

**Example**  
```js
$("#selector").rup_tree("setThemeVariant", variant_name);
```
<a name="module_rup_tree..getThemeVariant"></a>

### rup_tree~getThemeVariant() ⇒ <code>string</code>
Obtiene la variante del tema en uso.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - Variante del tema.  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("get_theme_variant");
```
<a name="module_rup_tree..showStripes"></a>

### rup_tree~showStripes()
Muestra líneas de fondo en el contenedor (solo si el tema en uso lo soporta).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_stripes.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showStripes");
```
<a name="module_rup_tree..hideStripes"></a>

### rup_tree~hideStripes()
Oculta las líneas de fondo del contenedor.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_stripes.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideStripes");
```
<a name="module_rup_tree..toggleStripes"></a>

### rup_tree~toggleStripes()
Alterna entre mostrar u ocultar las líneas de fondo del contenedor.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("toggleStripes");
```
<a name="module_rup_tree..showDots"></a>

### rup_tree~showDots()
Muestra los puntos conectores entre nodos (solo si el tema en uso lo soporta).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_dots.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showDots");
```
<a name="module_rup_tree..hideDots"></a>

### rup_tree~hideDots()
Oculta los puntos conectores entre nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_dots.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideDots");
```
<a name="module_rup_tree..toggleDots"></a>

### rup_tree~toggleDots()
Alterna entre mostrar u ocultar los puntos conectores entre nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("toggleDots");
```
<a name="module_rup_tree..showIcons"></a>

### rup_tree~showIcons()
Muestra iconos en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_icons.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showIcons");
```
<a name="module_rup_tree..hideIcons"></a>

### rup_tree~hideIcons()
Oculta los iconos en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_icons.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideIcons");
```
<a name="module_rup_tree..toggleIcons"></a>

### rup_tree~toggleIcons()
Alterna entre mostrar u ocultar los iconos en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("toggleIcons");
```
<a name="module_rup_tree..showEllipsis"></a>

### rup_tree~showEllipsis()
Muestra la elipsis de los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_ellipsis.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showEllipsis");
```
<a name="module_rup_tree..hideEllipsis"></a>

### rup_tree~hideEllipsis()
Oculta la elipsis de los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>hide\_ellipsis.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideEllipsis");
```
<a name="module_rup_tree..toggleEllipsis"></a>

### rup_tree~toggleEllipsis()
Alterna entre mostrar u ocultar la elipsis de los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("toggleEllipsis");
```
<a name="module_rup_tree..setIcon"></a>

### rup_tree~setIcon(obj, icon)
Define el icono a usar en un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| icon | <code>string</code> | El nuevo icono. Puede ser definida una ruta o una clase. Si se define una ruta a una imagen  que esté en el mismo directorio, se ha de usar el prefijo `./`, de lo contrario, se interpretará como una clase. |

**Example**  
```js
$("#selector").rup_tree("setIcon", obj, icon);
```
<a name="module_rup_tree..getIcon"></a>

### rup_tree~getIcon(obj) ⇒ <code>string</code>
Obtener el icono en uso en un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> - - Icono en uso.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("getIcon", obj);
```
<a name="module_rup_tree..hideIcon"></a>

### rup_tree~hideIcon(obj)
Oculta el icono de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("hideIcon", obj);
```
<a name="module_rup_tree..showIcon"></a>

### rup_tree~showIcon(obj)
Muestra el icono de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("showIcon", obj);
```
<a name="module_rup_tree..getUndetermined"></a>

### rup_tree~getUndetermined(full) ⇒ <code>Array</code>
Obtener un array de todos los nodos con un estado "indeterminado".

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos obtenidos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getUndetermined", full);
```
<a name="module_rup_tree..showCheckboxes"></a>

### rup_tree~showCheckboxes()
Muestra los iconos checkbox en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("showCheckboxes");
```
<a name="module_rup_tree..hideCheckboxes"></a>

### rup_tree~hideCheckboxes()
Oculta los iconos checkbox en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("hideCheckboxes");
```
<a name="module_rup_tree..toggleCheckboxes"></a>

### rup_tree~toggleCheckboxes()
Alterna entre mostrar u ocultar los iconos checkbox en los nodos.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("toggleCheckboxes");
```
<a name="module_rup_tree..isUndetermined"></a>

### rup_tree~isUndetermined(obj) ⇒ <code>boolean</code>
Comprueba si el nodo está en un estado "indeterminado".

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Informa si el estado del nodo es "indeterminado".  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isUndetermined", obj);
```
<a name="module_rup_tree..disableCheckbox"></a>

### rup_tree~disableCheckbox(obj)
Deshabilita el checkbox de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>disable\_checkbox.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible  cargar múltiples nodos pasando un array. |

**Example**  
```js
$("#selector").rup_tree("disableCheckbox", obj);
```
<a name="module_rup_tree..enableCheckbox"></a>

### rup_tree~enableCheckbox(obj)
Habilita el checkbox de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>enable\_checkbox.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible  cargar múltiples nodos pasando un array. |

**Example**  
```js
$("#selector").rup_tree("enableCheckbox", obj);
```
<a name="module_rup_tree..getCheckedDescendants"></a>

### rup_tree~getCheckedDescendants(id) ⇒ <code>Array</code>
Obtiene los identificadores de los nodos seleccionados en la rama del árbol (no incluye el identificador del nodo pasado como argumento).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los identificadores de los nodos obtenidos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del nodo. |

**Example**  
```js
$("#selector").rup_tree("getCheckedDescendants", id);
```
<a name="module_rup_tree..checkNode"></a>

### rup_tree~checkNode(obj)
Marca el checkbox de un nodo (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, se recurrirá a `select_node`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>check\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible  marcar los checkbox de múltiples nodos pasando un array. |

**Example**  
```js
$("#selector").rup_tree("checkNode", obj);
```
<a name="module_rup_tree..uncheckNode"></a>

### rup_tree~uncheckNode(obj)
Desmarca el checkbox de un nodo (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, se recurrirá a `deselect_node`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>uncheck\_node.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. También es posible  desmarcar los checkbox de múltiples nodos pasando un array. |

**Example**  
```js
$("#selector").rup_tree("uncheckNode", obj);
```
<a name="module_rup_tree..checkAll"></a>

### rup_tree~checkAll()
Marca todos los checkbox de un árbol (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, se recurrirá a `select_all`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>check\_all.jstree, changed.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("checkAll");
```
<a name="module_rup_tree..uncheckAll"></a>

### rup_tree~uncheckAll()
Desmarca todos los checkbox de un árbol (solo si en los ajustes del checkbox `tie_selection` contiene un valor `false`, de lo contrario, se recurrirá a `deselect_all`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>uncheck\_all.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("uncheckAll");
```
<a name="module_rup_tree..isChecked"></a>

### rup_tree~isChecked(obj) ⇒ <code>boolean</code>
Comprueba si el checkbox de un nodo está marcado (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, este método devolerá lo mismo que `is_selected`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>boolean</code> - - Notifica si el nodo se encuentra marcado.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("isChecked", obj);
```
<a name="module_rup_tree..getChecked"></a>

### rup_tree~getChecked(full) ⇒ <code>Array</code>
Obtiene un array de todos los nodos marcados (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, este método devolerá lo mismo que `get_selected`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos obtenidos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getChecked", full);
```
<a name="module_rup_tree..getTopChecked"></a>

### rup_tree~getTopChecked(full) ⇒ <code>Array</code>
Obtiene un array de todos los nodos de alto nivel que estén marcados (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, este método devolerá lo mismo que `get_top_selected`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos obtenidos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getTopChecked", full);
```
<a name="module_rup_tree..getBottomChecked"></a>

### rup_tree~getBottomChecked(full) ⇒ <code>Array</code>
Obtiene un array de todos los nodos de bajo nivel que estén marcados (si en los ajustes del checkbox `tie_selection` contiene un valor `true`, este método devolerá lo mismo que `get_bottom_selected`).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Array</code> - - Contiene los nodos obtenidos.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| full | <code>boolean</code> | Si se define a `true`, el array devuelto contendrá los objetos completos de los nodos,  de lo contrario, solo tendrá los identificadores. |

**Example**  
```js
$("#selector").rup_tree("getBottomChecked", full);
```
<a name="module_rup_tree..showContextmenu"></a>

### rup_tree~showContextmenu(obj, x, y)
Prepara y muestra el menú contextual de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>show\_contextmenu.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| x | <code>number</code> | Coordenada del eje x relativa al documento donde se mostrará el menú contextual. |
| y | <code>number</code> | Coordenada del eje y relativa al documento donde se mostrará el menú contextual. |

**Example**  
```js
$("#selector").rup_tree("showContextmenu", obj, x, y);
```
<a name="module_rup_tree..search"></a>

### rup_tree~search(str, skip_async, show_only_matches, [inside], append)
Busca entre los nodos del árbol la cadena proporcionada.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>search.event:jstree</code>  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | La cadena a usar para la búsqueda. |
| skip_async | <code>boolean</code> | Si se define a `true`, no se hará la petición al servidor, aunque así esté configurado. |
| show_only_matches | <code>boolean</code> | Si se define a `true`, solo se mostrarán los nodos que coincidan (hay que tener en cuenta  que esta opción puede ser muy lenta en árboles grandes o navegadores antiguos). |
| [inside] | <code>\*</code> | Nodo opcional sobre el que limitar la búsqueda (sobre sus hijos). |
| append | <code>boolean</code> | Si se define a `true`, los resultados de la búsqueda serán añadidos a los de la anterior consulta. |

**Example**  
```js
$("#selector").rup_tree("search", str, skip_async, show_only_matches, inside, append);
```
<a name="module_rup_tree..clearSearch"></a>

### rup_tree~clearSearch()
Limpia los resultados de la última búsqueda (elimina las clases y muestra todos los nodos si el filtrado está habilitado).

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Emits**: <code>clear\_search.event:jstree</code>  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("clearSearch");
```
<a name="module_rup_tree..saveState"></a>

### rup_tree~saveState()
Guarda el estado.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("saveState");
```
<a name="module_rup_tree..restoreState"></a>

### rup_tree~restoreState()
Restaura el estado desde el ordenador del usuario.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("restoreState");
```
<a name="module_rup_tree..clearState"></a>

### rup_tree~clearState()
Limpia el estado en el ordenador del usuario.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  
**Example**  
```js
$("#selector").rup_tree("clearState");
```
<a name="module_rup_tree..getRules"></a>

### rup_tree~getRules(obj) ⇒ <code>Object</code>
Obtiene las reglas del plugin `type` de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>Object</code> - - Contiene las reglas obtenidas.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |

**Example**  
```js
$("#selector").rup_tree("getRules", obj);
```
<a name="module_rup_tree..getType"></a>

### rup_tree~getType(obj, rules) ⇒ <code>string</code> \| <code>Object</code>
Obtiene del nodo el tipo o los ajustes en un objecto.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> \| <code>Object</code> - - Contiene las reglas obtenidas.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a tratar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| rules | <code>boolean</code> \| <code>string</code> | Si se pasa un booleano con valor `true` en vez de una cadena, se devolerá  un objecto que contenga los ajustes. |

**Example**  
```js
$("#selector").rup_tree("getType", obj, rules);
```
<a name="module_rup_tree..setType"></a>

### rup_tree~setType(obj, type)
Cambia el tipo de un nodo.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | Nodo a cambiar. Permite usar el elemento del DOM, el identificador, el selector, etc. |
| type | <code>string</code> | Nuevo tipo a definir. |

**Example**  
```js
$("#selector").rup_tree("setType", obj, type);
```
