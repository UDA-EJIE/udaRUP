<a name="module_rup_tree"></a>

## rup\_tree
Permite al usuario mostrar y ocultar de manera selectiva, información mostrada en una estructura jerárquica.

**Summary**: Componente RUP Tree.  
**See**: El componente está basado en el plugin [jstree](https://www.jstree.com/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](https://old.jstree.com/documentation).  
**Example**  
```js
$("#ejemploArbolDiv").rup_tree(properties);
```

* [rup_tree](#module_rup_tree)
    * [~options](#module_rup_tree..options)
    * [~getRupValue()](#module_rup_tree..getRupValue) ⇒ <code>string</code> \| <code>number</code>
    * [~setRupValue(param)](#module_rup_tree..setRupValue)

<a name="module_rup_tree..options"></a>

### rup_tree~options
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_tree</code>](#module_rup_tree)  
**See**: Para mas información consulte la documentación acerca de las opciones de configuración del plugin [jstree](https://old.jstree.com/documentation).  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [getValue] | <code>function</code> |  | Permite especificar una función de callback para implementar el dato a emplear a la hora de ejecutar los métodos getRupValue y setRupValue. |
| [readAsString] | <code>boolean</code> | <code>false</code> | Permite asignar elementos seleccionados indicados mediante un string de identificadores separados por comas. |
| [submitAsJSON] | <code>boolean</code> | <code>false</code> | Determina que los elementos seleccionados se enviarán representados mediante un objeto JSON. |
| [submitAsString] | <code>boolean</code> | <code>false</code> | Determina que los elementos seleccionados se enviarán representados mediante un string de identificadores separados por comas. |

<a name="module_rup_tree..getRupValue"></a>

### rup_tree~getRupValue() ⇒ <code>string</code> \| <code>number</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la  obtención del valor del Autocomplete

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  
**Returns**: <code>string</code> \| <code>number</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$(selector).rup_tree("getRupValue");
```
<a name="module_rup_tree..setRupValue"></a>

### rup_tree~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado porel resto de componentes RUP para estandarizar la asignación del valor al Autocomplete.

**Kind**: inner method of [<code>rup\_tree</code>](#module_rup_tree)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#selector").rup_tree("setRupValue", value);
```
