<a name="module_rup.table.buttons"></a>

## rup.table.buttons
Genera los botones del table

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.5.1  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table.buttons](#module_rup.table.buttons)
    * [~Buttons(dt, config)](#module_rup.table.buttons..Buttons)
    * [~action(node, action)](#module_rup.table.buttons..action) ⇒ <code>Buttons</code>
    * [~active(node, [flag])](#module_rup.table.buttons..active) ⇒ <code>Buttons</code>
    * [~add(config, [idx])](#module_rup.table.buttons..add) ⇒ <code>Buttons</code>
    * [~container()](#module_rup.table.buttons..container) ⇒ <code>jQuery</code>
    * [~disable(node)](#module_rup.table.buttons..disable) ⇒ <code>Buttons</code>
    * [~destroy()](#module_rup.table.buttons..destroy) ⇒ <code>Buttons</code>
    * [~enable(node, [flag])](#module_rup.table.buttons..enable) ⇒ <code>Buttons</code>
    * [~name()](#module_rup.table.buttons..name) ⇒ <code>string</code>
    * [~node(node)](#module_rup.table.buttons..node) ⇒ <code>jQuery</code>
    * [~processing(flag)](#module_rup.table.buttons..processing) ⇒ <code>boolean</code> \| <code>Buttons</code>
    * [~remove(node)](#module_rup.table.buttons..remove) ⇒ <code>Buttons</code>
    * [~text(node, label)](#module_rup.table.buttons..text) ⇒ <code>Buttons</code>
    * [~_constructor()](#module_rup.table.buttons.._constructor)
    * [~_addKey(conf)](#module_rup.table.buttons.._addKey)
    * [~_draw([container], [buttons])](#module_rup.table.buttons.._draw)
    * [~_expandButton(attachTo, button, inCollection)](#module_rup.table.buttons.._expandButton)
    * [~_buildButton(config, inCollection)](#module_rup.table.buttons.._buildButton) ⇒ <code>jQuery</code>
    * [~_nodeToButton(node, [buttons])](#module_rup.table.buttons.._nodeToButton) ⇒ <code>object</code>
    * [~_nodeToHost(node, [buttons])](#module_rup.table.buttons.._nodeToHost) ⇒ <code>array</code>
    * [~_keypress(character, e)](#module_rup.table.buttons.._keypress)
    * [~_removeKey(conf)](#module_rup.table.buttons.._removeKey)
    * [~_resolveExtends(conf)](#module_rup.table.buttons.._resolveExtends) ⇒ <code>object</code>
    * [~_filename(config, incExtension)](#module_rup.table.buttons.._filename)
    * [~_stringOrFunction(option)](#module_rup.table.buttons.._stringOrFunction) ⇒ <code>null</code> \| <code>string</code>
    * [~_title(config)](#module_rup.table.buttons.._title)
    * [~_enableCollection(id)](#module_rup.table.buttons.._enableCollection)
    * [~_disableCollection(id)](#module_rup.table.buttons.._disableCollection)
    * [~_enableButtonAndContextMenuOption(id)](#module_rup.table.buttons.._enableButtonAndContextMenuOption)
    * [~_disableButtonAndContextMenuOption(id)](#module_rup.table.buttons.._disableButtonAndContextMenuOption)
    * [~_manageButtonsAndButtonsContextMenu(opts, numOfSelectedRows, collectionObject)](#module_rup.table.buttons.._manageButtonsAndButtonsContextMenu)
    * [~_reports(dt, that, config)](#module_rup.table.buttons.._reports)
    * [~ConvertToTabulador(reportsExportAllColumns, columns, objArray, true)](#module_rup.table.buttons..ConvertToTabulador) ⇒ <code>object</code>
    * [~_reportsTypeOfCopy(dt, type, request, multiselection, selectedAll, [deselectedIds])](#module_rup.table.buttons.._reportsTypeOfCopy) ⇒ <code>object</code>
    * [~_reportsPrepareRequestData(dt, ajaxOptions, request, ctx, selectedAll, [deselectedIds], [selectedIds])](#module_rup.table.buttons.._reportsPrepareRequestData) ⇒ <code>object</code>
    * [~_loadDefinedColums(dt, ctx, request)](#module_rup.table.buttons.._loadDefinedColums) ⇒ <code>object</code>
    * [~_reportsRequestData(ajaxOptions, ctx)](#module_rup.table.buttons.._reportsRequestData) ⇒ <code>object</code>
    * [~_reportsRequestFile(ctx, ajaxOptions, that)](#module_rup.table.buttons.._reportsRequestFile) ⇒ <code>object</code>
    * [~_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea)](#module_rup.table.buttons.._reportsOpenMessage)
    * [~_reportsToClipboard(dt, that, exportDataRows, hiddenDiv, textarea)](#module_rup.table.buttons.._reportsToClipboard)
    * [~_deleteAllSelects(dt)](#module_rup.table.buttons.._deleteAllSelects)
    * [~_initButtons(ctx, opts)](#module_rup.table.buttons.._initButtons)

<a name="module_rup.table.buttons..Buttons"></a>

### rup.table.buttons~Buttons(dt, config)
Botones

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type |
| --- | --- |
| dt | <code>object</code> | 
| config | <code>object</code> | 

<a name="module_rup.table.buttons..action"></a>

### rup.table.buttons~action(node, action) ⇒ <code>Buttons</code>
Set the action of a button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button element |
| action | <code>function</code> | Function to set |

<a name="module_rup.table.buttons..active"></a>

### rup.table.buttons~active(node, [flag]) ⇒ <code>Buttons</code>
Add an active class to the button to make to look active or get currentactive state.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining or boolean for getter  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button element |
| [flag] | <code>boolean</code> | Enable / disable flag |

<a name="module_rup.table.buttons..add"></a>

### rup.table.buttons~add(config, [idx]) ⇒ <code>Buttons</code>
Add a new button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration object, base string name or function |
| [idx] | <code>int</code> \| <code>string</code> | Button index for where to insert the button |

<a name="module_rup.table.buttons..container"></a>

### rup.table.buttons~container() ⇒ <code>jQuery</code>
Get the container node for the buttons

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>jQuery</code> - Buttons node  
**Since**: UDA 3.4.0 // Table 1.0.0  
<a name="module_rup.table.buttons..disable"></a>

### rup.table.buttons~disable(node) ⇒ <code>Buttons</code>
Disable a button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_rup.table.buttons..destroy"></a>

### rup.table.buttons~destroy() ⇒ <code>Buttons</code>
Destroy the instance, cleaning up event handlers and removing DOMelements

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  
<a name="module_rup.table.buttons..enable"></a>

### rup.table.buttons~enable(node, [flag]) ⇒ <code>Buttons</code>
Enable / disable a button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>node</code> |  | Button node |
| [flag] | <code>boolean</code> | <code>true</code> | Enable / disable flag |

<a name="module_rup.table.buttons..name"></a>

### rup.table.buttons~name() ⇒ <code>string</code>
Get the instance name for the button set selector

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>string</code> - Instance name  
**Since**: UDA 3.4.0 // Table 1.0.0  
<a name="module_rup.table.buttons..node"></a>

### rup.table.buttons~node(node) ⇒ <code>jQuery</code>
Get a button's node

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>jQuery</code> - Button element  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_rup.table.buttons..processing"></a>

### rup.table.buttons~processing(flag) ⇒ <code>boolean</code> \| <code>Buttons</code>
Set / get a processing class on the selected button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>boolean</code> \| <code>Buttons</code> - Getter value or this if a setter.  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | true to add, false to remove, undefined to get |

<a name="module_rup.table.buttons..remove"></a>

### rup.table.buttons~remove(node) ⇒ <code>Buttons</code>
Remove a button.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_rup.table.buttons..text"></a>

### rup.table.buttons~text(node, label) ⇒ <code>Buttons</code>
Set the text for a button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>int</code> \| <code>string</code> \| <code>function</code> | Button index |
| label | <code>string</code> | Text |

<a name="module_rup.table.buttons.._constructor"></a>

### rup.table.buttons~\_constructor()
Buttons constructor

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  
<a name="module_rup.table.buttons.._addKey"></a>

### rup.table.buttons~\_addKey(conf)
Add a new button to the key press listener

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | Resolved button configuration object |

<a name="module_rup.table.buttons.._draw"></a>

### rup.table.buttons~\_draw([container], [buttons])
Insert the buttons into the container. Call without parameters!

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| [container] | <code>node</code> | Recursive only - Insert point |
| [buttons] | <code>array</code> | Recursive only - Buttons array |

<a name="module_rup.table.buttons.._expandButton"></a>

### rup.table.buttons~\_expandButton(attachTo, button, inCollection)
Create buttons from an array of buttons

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| attachTo | <code>array</code> | Buttons array to attach to |
| button | <code>object</code> | Button definition |
| inCollection | <code>boolean</code> | true if the button is in a collection |

<a name="module_rup.table.buttons.._buildButton"></a>

### rup.table.buttons~\_buildButton(config, inCollection) ⇒ <code>jQuery</code>
Create an individual button

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>jQuery</code> - Created button node (jQuery)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Resolved button configuration |
| inCollection | <code>boolean</code> | `true` if a collection button |

<a name="module_rup.table.buttons.._nodeToButton"></a>

### rup.table.buttons~\_nodeToButton(node, [buttons]) ⇒ <code>object</code>
Get the button object from a node (recursive)

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>object</code> - Button object  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |
| [buttons] | <code>array</code> | Button array, uses base if not defined |

<a name="module_rup.table.buttons.._nodeToHost"></a>

### rup.table.buttons~\_nodeToHost(node, [buttons]) ⇒ <code>array</code>
Get container array for a button from a button node (recursive)

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>array</code> - Button's host array  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |
| [buttons] | <code>array</code> | Button array, uses base if not defined |

<a name="module_rup.table.buttons.._keypress"></a>

### rup.table.buttons~\_keypress(character, e)
Handle a key press - determine if any button's key configured matcheswhat was typed and trigger the action if so.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| character | <code>string</code> | The character pressed |
| e | <code>object</code> | Key event that triggered this call |

<a name="module_rup.table.buttons.._removeKey"></a>

### rup.table.buttons~\_removeKey(conf)
Remove a key from the key listener for this instance (to be used when abutton is removed)

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | Button configuration |

<a name="module_rup.table.buttons.._resolveExtends"></a>

### rup.table.buttons~\_resolveExtends(conf) ⇒ <code>object</code>
Resolve a button configuration

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>object</code> - Button configuration  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>string</code> \| <code>function</code> \| <code>object</code> | Button config to resolve |

<a name="module_rup.table.buttons.._filename"></a>

### rup.table.buttons~\_filename(config, incExtension)
Get the file name for an exported file.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration |
| incExtension | <code>boolean</code> | Include the file name extension |

<a name="module_rup.table.buttons.._stringOrFunction"></a>

### rup.table.buttons~\_stringOrFunction(option) ⇒ <code>null</code> \| <code>string</code>
Simply utility method to allow parameters to be given as a function

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Returns**: <code>null</code> \| <code>string</code> - Resolved value  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>undefined</code> \| <code>string</code> \| <code>function</code> | Option |

<a name="module_rup.table.buttons.._title"></a>

### rup.table.buttons~\_title(config)
Get the title for an exported file.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration |

<a name="module_rup.table.buttons.._enableCollection"></a>

### rup.table.buttons~\_enableCollection(id)
Activa la coleccion

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_rup.table.buttons.._disableCollection"></a>

### rup.table.buttons~\_disableCollection(id)
Desactiva la coleccion

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_rup.table.buttons.._enableButtonAndContextMenuOption"></a>

### rup.table.buttons~\_enableButtonAndContextMenuOption(id)
Activa el boton y su opcion dentro del context menu

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_rup.table.buttons.._disableButtonAndContextMenuOption"></a>

### rup.table.buttons~\_disableButtonAndContextMenuOption(id)
Desactiva el boton y su opcion dentro del context menu

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_rup.table.buttons.._manageButtonsAndButtonsContextMenu"></a>

### rup.table.buttons~\_manageButtonsAndButtonsContextMenu(opts, numOfSelectedRows, collectionObject)
Gestiona la propiedad de activado/desactivado de los botones y de sus opcionesdentro del context menu.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Buttons properties |
| numOfSelectedRows | <code>int</code> | Number of selected rows |
| collectionObject | <code>null</code> \| <code>object</code> | Collection button properties |

<a name="module_rup.table.buttons.._reports"></a>

### rup.table.buttons~\_reports(dt, that, config)
Establece el tipo de llamada necesario para obtener los datos según lo seleccionadoe inicia la gestión para finalmente obtenerlos

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| that | <code>object</code> | Objeto del boton |
| config | <code>object</code> | Configuracion del boton |

<a name="module_rup.table.buttons..ConvertToTabulador"></a>

### rup.table.buttons~ConvertToTabulador(reportsExportAllColumns, columns, objArray, true) ⇒ <code>object</code>
Se encarga de mapear los datos de json a datos separados por el tabulador.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| reportsExportAllColumns | <code>boolean</code> | true en caso de querer mostrar todas las columnas (incluidas las ocultas) |
| columns | <code>object</code> | Objeto que contiene las columnas a mostrar |
| objArray | <code>object</code> | Objeto que contiene los datos a exportar |
| true | <code>boolean</code> | en caso de querer que se mueste la cabecera |

<a name="module_rup.table.buttons.._reportsTypeOfCopy"></a>

### rup.table.buttons~\_reportsTypeOfCopy(dt, type, request, multiselection, selectedAll, [deselectedIds]) ⇒ <code>object</code>
Según el tipo de función de copia solicitada, realiza unas u otras comprobacionesantes de solicitar los datos al servidor

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| type | <code>string</code> | Tipo de funcion de copia a ejecutar |
| request | <code>object</code> | Contiene todos los parametros de la petición AJAX |
| multiselection | <code>object</code> | Propiedades de la multiseleccion |
| selectedAll | <code>boolean</code> | Cuando es true significa que todas las filas estan marcadas |
| [deselectedIds] | <code>array</code> | ID's de las filas deseleccionadas |

<a name="module_rup.table.buttons.._reportsPrepareRequestData"></a>

### rup.table.buttons~\_reportsPrepareRequestData(dt, ajaxOptions, request, ctx, selectedAll, [deselectedIds], [selectedIds]) ⇒ <code>object</code>
Se encarga de generar las opciones de configuración con las que se llamara a la API

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| ajaxOptions | <code>object</code> | Parametros de la llamada AJAX |
| request | <code>object</code> | Contiene todos los parametros de la petición ajax |
| ctx | <code>object</code> | Contexto |
| selectedAll | <code>boolean</code> | Cuando es true significa que todas las filas estan marcadas |
| [deselectedIds] | <code>array</code> | ID's de las filas deseleccionadas |
| [selectedIds] | <code>array</code> | ID's de las filas seleccionadas |

<a name="module_rup.table.buttons.._loadDefinedColums"></a>

### rup.table.buttons~\_loadDefinedColums(dt, ctx, request) ⇒ <code>object</code>
Se encarga de devolver las columnas

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 4.2.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| ctx | <code>object</code> | Contexto |
| request | <code>object</code> | Contiene todos los parametros de la petición AJAX |

<a name="module_rup.table.buttons.._reportsRequestData"></a>

### rup.table.buttons~\_reportsRequestData(ajaxOptions, ctx) ⇒ <code>object</code>
Se encarga de llamar a la API y de devolver los datos recibidos

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ajaxOptions | <code>object</code> | Parametros de la llamada AJAX |
| ctx | <code>object</code> | Contexto |

<a name="module_rup.table.buttons.._reportsRequestFile"></a>

### rup.table.buttons~\_reportsRequestFile(ctx, ajaxOptions, that) ⇒ <code>object</code>
Se encarga de llamar a la API y de devolver el fichero recibido

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 4.2.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto |
| ajaxOptions | <code>object</code> | Parametros de la llamada AJAX |
| that | <code>object</code> | Api de llamdas |

<a name="module_rup.table.buttons.._reportsOpenMessage"></a>

### rup.table.buttons~\_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea)
Gestiona la apertura/cierre del mensaje de confirmación de copia

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| ctx | <code>object</code> | Contexto |
| that | <code>object</code> | Objeto del boton |
| exportDataRows | <code>int</code> | Numero de filas a ser exportadas |
| hiddenDiv | <code>object</code> | Elemento del DOM |
| textarea | <code>object</code> | Elemento del DOM |

<a name="module_rup.table.buttons.._reportsToClipboard"></a>

### rup.table.buttons~\_reportsToClipboard(dt, that, exportDataRows, hiddenDiv, textarea)
Copia los datos recibidos al portapapeles

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del table |
| that | <code>object</code> | Objeto del boton |
| exportDataRows | <code>int</code> | Numero de filas a ser exportadas |
| hiddenDiv | <code>object</code> | Elemento del DOM |
| textarea | <code>object</code> | Elemento del DOM |

<a name="module_rup.table.buttons.._deleteAllSelects"></a>

### rup.table.buttons~\_deleteAllSelects(dt)
Metodo que elimina todos los registros seleccionados.

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 4.2.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.buttons.._initButtons"></a>

### rup.table.buttons~\_initButtons(ctx, opts)
Inicializa los botones

**Kind**: inner method of [<code>rup.table.buttons</code>](#module_rup.table.buttons)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on |
| opts | <code>List.&lt;object&gt;</code> | Lista de botones |

