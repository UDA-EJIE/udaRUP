<a name="module_dataTables.buttons"></a>

## dataTables.buttons
Genera los botones del datatable

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.5.1  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [dataTables.buttons](#module_dataTables.buttons)
    * [~Buttons(dt, config)](#module_dataTables.buttons..Buttons)
    * [~action(node, action)](#module_dataTables.buttons..action) ⇒ <code>Buttons</code>
    * [~action(Button)](#module_dataTables.buttons..action) ⇒ <code>function</code>
    * [~active(node, [flag])](#module_dataTables.buttons..active) ⇒ <code>Buttons</code>
    * [~add(config, [idx])](#module_dataTables.buttons..add) ⇒ <code>Buttons</code>
    * [~container()](#module_dataTables.buttons..container) ⇒ <code>jQuery</code>
    * [~disable(node)](#module_dataTables.buttons..disable) ⇒ <code>Buttons</code>
    * [~destroy()](#module_dataTables.buttons..destroy) ⇒ <code>Buttons</code>
    * [~enable(node, [flag])](#module_dataTables.buttons..enable) ⇒ <code>Buttons</code>
    * [~name()](#module_dataTables.buttons..name) ⇒ <code>string</code>
    * [~node(node)](#module_dataTables.buttons..node) ⇒ <code>jQuery</code>
    * [~processing(flag)](#module_dataTables.buttons..processing) ⇒ <code>boolean</code> \| <code>Buttons</code>
    * [~remove(node)](#module_dataTables.buttons..remove) ⇒ <code>Buttons</code>
    * [~text(node, label)](#module_dataTables.buttons..text) ⇒ <code>Buttons</code>
    * [~text(node)](#module_dataTables.buttons..text) ⇒ <code>string</code>
    * [~_constructor()](#module_dataTables.buttons.._constructor)
    * [~_addKey(conf)](#module_dataTables.buttons.._addKey)
    * [~_draw([container], [buttons])](#module_dataTables.buttons.._draw)
    * [~_expandButton(attachTo, button, inCollection)](#module_dataTables.buttons.._expandButton)
    * [~_buildButton(config, inCollection)](#module_dataTables.buttons.._buildButton) ⇒ <code>jQuery</code>
    * [~_nodeToButton(node, [buttons])](#module_dataTables.buttons.._nodeToButton) ⇒ <code>object</code>
    * [~_nodeToHost(node, [buttons])](#module_dataTables.buttons.._nodeToHost) ⇒ <code>array</code>
    * [~_keypress(character, e)](#module_dataTables.buttons.._keypress)
    * [~_removeKey(conf)](#module_dataTables.buttons.._removeKey)
    * [~_resolveExtends(conf)](#module_dataTables.buttons.._resolveExtends) ⇒ <code>object</code>
    * [~_filename(config, incExtension)](#module_dataTables.buttons.._filename)
    * [~_stringOrFunction(option)](#module_dataTables.buttons.._stringOrFunction) ⇒ <code>null</code> \| <code>string</code>
    * [~_title(config)](#module_dataTables.buttons.._title)
    * [~_enableCollection(id)](#module_dataTables.buttons.._enableCollection)
    * [~_disableCollection(id)](#module_dataTables.buttons.._disableCollection)
    * [~_enableButtonAndContextMenuOption(id)](#module_dataTables.buttons.._enableButtonAndContextMenuOption)
    * [~_disableButtonAndContextMenuOption(id)](#module_dataTables.buttons.._disableButtonAndContextMenuOption)
    * [~_manageButtonsAndButtonsContextMenu(opts, numOfSelectedRows, collectionObject)](#module_dataTables.buttons.._manageButtonsAndButtonsContextMenu)

<a name="module_dataTables.buttons..Buttons"></a>

### dataTables.buttons~Buttons(dt, config)
Botones

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type |
| --- | --- |
| dt | <code>object</code> | 
| config | <code>object</code> | 

<a name="module_dataTables.buttons..action"></a>

### dataTables.buttons~action(node, action) ⇒ <code>Buttons</code>
Set the action of a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button element |
| action | <code>function</code> | Function to set |

<a name="module_dataTables.buttons..action"></a>

### dataTables.buttons~action(Button) ⇒ <code>function</code>
Get the action of a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| Button | <code>int</code> \| <code>string</code> | index |

<a name="module_dataTables.buttons..active"></a>

### dataTables.buttons~active(node, [flag]) ⇒ <code>Buttons</code>
Add an active class to the button to make to look active or get currentactive state.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining or boolean for getter  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button element |
| [flag] | <code>boolean</code> | Enable / disable flag |

<a name="module_dataTables.buttons..add"></a>

### dataTables.buttons~add(config, [idx]) ⇒ <code>Buttons</code>
Add a new button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration object, base string name or function |
| [idx] | <code>int</code> \| <code>string</code> | Button index for where to insert the button |

<a name="module_dataTables.buttons..container"></a>

### dataTables.buttons~container() ⇒ <code>jQuery</code>
Get the container node for the buttons

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>jQuery</code> - Buttons node  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
<a name="module_dataTables.buttons..disable"></a>

### dataTables.buttons~disable(node) ⇒ <code>Buttons</code>
Disable a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_dataTables.buttons..destroy"></a>

### dataTables.buttons~destroy() ⇒ <code>Buttons</code>
Destroy the instance, cleaning up event handlers and removing DOMelements

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
<a name="module_dataTables.buttons..enable"></a>

### dataTables.buttons~enable(node, [flag]) ⇒ <code>Buttons</code>
Enable / disable a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>node</code> |  | Button node |
| [flag] | <code>boolean</code> | <code>true</code> | Enable / disable flag |

<a name="module_dataTables.buttons..name"></a>

### dataTables.buttons~name() ⇒ <code>string</code>
Get the instance name for the button set selector

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>string</code> - Instance name  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
<a name="module_dataTables.buttons..node"></a>

### dataTables.buttons~node(node) ⇒ <code>jQuery</code>
Get a button's node

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>jQuery</code> - Button element  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_dataTables.buttons..processing"></a>

### dataTables.buttons~processing(flag) ⇒ <code>boolean</code> \| <code>Buttons</code>
Set / get a processing class on the selected button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>boolean</code> \| <code>Buttons</code> - Getter value or this if a setter.  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>boolean</code> | true to add, false to remove, undefined to get |

<a name="module_dataTables.buttons..remove"></a>

### dataTables.buttons~remove(node) ⇒ <code>Buttons</code>
Remove a button.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |

<a name="module_dataTables.buttons..text"></a>

### dataTables.buttons~text(node, label) ⇒ <code>Buttons</code>
Set the text for a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>Buttons</code> - Self for chaining  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>int</code> \| <code>string</code> \| <code>function</code> | Button index |
| label | <code>string</code> | Text |

<a name="module_dataTables.buttons..text"></a>

### dataTables.buttons~text(node) ⇒ <code>string</code>
Get the text for a button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>string</code> - Button text  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>int</code> \| <code>string</code> | Button index |

<a name="module_dataTables.buttons.._constructor"></a>

### dataTables.buttons~_constructor()
Buttons constructor

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
<a name="module_dataTables.buttons.._addKey"></a>

### dataTables.buttons~_addKey(conf)
Add a new button to the key press listener

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | Resolved button configuration object |

<a name="module_dataTables.buttons.._draw"></a>

### dataTables.buttons~_draw([container], [buttons])
Insert the buttons into the container. Call without parameters!

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| [container] | <code>node</code> | Recursive only - Insert point |
| [buttons] | <code>array</code> | Recursive only - Buttons array |

<a name="module_dataTables.buttons.._expandButton"></a>

### dataTables.buttons~_expandButton(attachTo, button, inCollection)
Create buttons from an array of buttons

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| attachTo | <code>array</code> | Buttons array to attach to |
| button | <code>object</code> | Button definition |
| inCollection | <code>boolean</code> | true if the button is in a collection |

<a name="module_dataTables.buttons.._buildButton"></a>

### dataTables.buttons~_buildButton(config, inCollection) ⇒ <code>jQuery</code>
Create an individual button

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>jQuery</code> - Created button node (jQuery)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Resolved button configuration |
| inCollection | <code>boolean</code> | `true` if a collection button |

<a name="module_dataTables.buttons.._nodeToButton"></a>

### dataTables.buttons~_nodeToButton(node, [buttons]) ⇒ <code>object</code>
Get the button object from a node (recursive)

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>object</code> - Button object  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |
| [buttons] | <code>array</code> | Button array, uses base if not defined |

<a name="module_dataTables.buttons.._nodeToHost"></a>

### dataTables.buttons~_nodeToHost(node, [buttons]) ⇒ <code>array</code>
Get container array for a button from a button node (recursive)

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>array</code> - Button's host array  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>node</code> | Button node |
| [buttons] | <code>array</code> | Button array, uses base if not defined |

<a name="module_dataTables.buttons.._keypress"></a>

### dataTables.buttons~_keypress(character, e)
Handle a key press - determine if any button's key configured matcheswhat was typed and trigger the action if so.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| character | <code>string</code> | The character pressed |
| e | <code>object</code> | Key event that triggered this call |

<a name="module_dataTables.buttons.._removeKey"></a>

### dataTables.buttons~_removeKey(conf)
Remove a key from the key listener for this instance (to be used when abutton is removed)

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | Button configuration |

<a name="module_dataTables.buttons.._resolveExtends"></a>

### dataTables.buttons~_resolveExtends(conf) ⇒ <code>object</code>
Resolve a button configuration

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>object</code> - Button configuration  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>string</code> \| <code>function</code> \| <code>object</code> | Button config to resolve |

<a name="module_dataTables.buttons.._filename"></a>

### dataTables.buttons~_filename(config, incExtension)
Get the file name for an exported file.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration |
| incExtension | <code>boolean</code> | Include the file name extension |

<a name="module_dataTables.buttons.._stringOrFunction"></a>

### dataTables.buttons~_stringOrFunction(option) ⇒ <code>null</code> \| <code>string</code>
Simply utility method to allow parameters to be given as a function

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Returns**: <code>null</code> \| <code>string</code> - Resolved value  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>undefined</code> \| <code>string</code> \| <code>function</code> | Option |

<a name="module_dataTables.buttons.._title"></a>

### dataTables.buttons~_title(config)
Get the title for an exported file.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | Button configuration |

<a name="module_dataTables.buttons.._enableCollection"></a>

### dataTables.buttons~_enableCollection(id)
Activa la coleccion

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_dataTables.buttons.._disableCollection"></a>

### dataTables.buttons~_disableCollection(id)
Desactiva la coleccion

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_dataTables.buttons.._enableButtonAndContextMenuOption"></a>

### dataTables.buttons~_enableButtonAndContextMenuOption(id)
Activa el boton y su opcion dentro del context menu

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_dataTables.buttons.._disableButtonAndContextMenuOption"></a>

### dataTables.buttons~_disableButtonAndContextMenuOption(id)
Desactiva el boton y su opcion dentro del context menu

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Id of the button |

<a name="module_dataTables.buttons.._manageButtonsAndButtonsContextMenu"></a>

### dataTables.buttons~_manageButtonsAndButtonsContextMenu(opts, numOfSelectedRows, collectionObject)
Gestiona la propiedad de activado/desactivado de los botones y de sus opcionesdentro del context menu.

**Kind**: inner method of [<code>dataTables.buttons</code>](#module_dataTables.buttons)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | Buttons properties |
| numOfSelectedRows | <code>int</code> | Number of selected rows |
| collectionObject | <code>null</code> \| <code>object</code> | Collection button properties |

