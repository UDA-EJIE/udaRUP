<a name="module_rup_select"></a>

## rup\_select
Permite al usuario recuperar un elemento de una gran lista de elementos o devarias listas dependientes de forma sencilla y ocupando poco espacio en lainterfaz.

**Summary**: Componente RUP Select.  
**See**: El componente está basado en el plugin     [Select2](https://select2.org//). Para mas información acerca de     las funcionalidades y opciones de configuración pinche     [aquí](https://select2.org//).  
**Example**  
```js
$("#idSelect").rup_select({ source : "selectSimple/remote",         sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(),         value:"code", style:"css"} });
```

* [rup_select](#module_rup_select)
    * [~defaults](#module_rup_select..defaults)
    * [~getRupValue()](#module_rup_select..getRupValue) ⇒ <code>string</code> \| <code>number</code>
    * [~setRupValue(param)](#module_rup_select..setRupValue)
    * [~clear()](#module_rup_select..clear)
    * [~change()](#module_rup_select..change)
    * [~checkAll()](#module_rup_select..checkAll)
    * [~selectByLabel(param)](#module_rup_select..selectByLabel)
    * [~label()](#module_rup_select..label) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [~index()](#module_rup_select..index) ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code>
    * [~disable()](#module_rup_select..disable)
    * [~enable()](#module_rup_select..enable)
    * [~isDisabled()](#module_rup_select..isDisabled)
    * [~reload()](#module_rup_select..reload)
    * [~setSource(source)](#module_rup_select..setSource)

<a name="module_rup_select..defaults"></a>

### rup_select~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup\_select</code>](#module_rup_select)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [onLoadError] | [<code>onLoadError</code>](#jQuery.rup_select..onLoadError) |  | Función de           callback a ejecutar en caso de que se produzca un error en la           petición de obtención de la lista de elementos a mostrar. |
| [width] | <code>string</code> | <code>&quot;&#x27;100%&#x27;&quot;</code> | Determina el tamaño del componente            tanto en píxeles como en porcentaje. Su valor por defecto es '100%'. |
| [blank] | <code>string</code> | <code>null</code> | Se utiliza para declarar un valor           independiente de la lógica de negocio y en ocasiones se           representa como "Seleccione un elemento". Permite establecer un           mensaje independiente por cada select haciendo uso de           $.rup.i18n.app.id._blank (sustituyendo id por el propio de cada           select) o uno genérico por aplicación haciendo uso de           $.rup.i18n.app.rup_select.blank. En caso de no definir ninguno,           se usará el genérico de UDA,           $.rup.i18n.base.rup_select.blankNotDefined. |
| [token] | <code>string</code> | <code>&quot;\&quot;|\&quot;&quot;</code> | Define el separador a utilizar cuando se           muestra el valor asociado al select concatenado al literal. |
| [multiValueToken] | <code>string</code> | <code>&quot;\&quot;##\&quot;&quot;</code> | Define el separador a           utilizar en selects enlazados locales. |
| [ordered] | <code>boolean</code> | <code>true</code> | Indica si el select debe ordenarse. |
| [orderedByValue] | <code>boolean</code> | <code>false</code> | Indica si el la ordenación           del seelct debe realizarse por el valor de los elementos en           lugar de por el texto. |
| [onLoadSuccess] | [<code>onLoadSuccess</code>](#jQuery.rup_select..onLoadSuccess) | <code></code> | Función           de callback a ejecutar en el caso de que la petición de carga           de datos se haya producido correctamente. |
| [loadFromSelect] | <code>boolean</code> | <code>false</code> | Determina si se debe de           utilizar los elementos option del elemento html sobre el que se           inicializa el componente para inicializar los datos del           elemento. |
| [multiOptgroupIconText] | <code>boolean</code> | <code>false</code> | Indica si se desea           que en la selección múltiple con grupos, el nombre del grupo           tenga descripción en los iconos para seleccionar/deseleccionar           los elementos del grupo. |
| [submitAsString] | <code>boolean</code> | <code>false</code> | Indica si el envío de los           elementos seleccionados en la selección múltiple se realiza           como un literal separados por coma. |
| [submitAsJSON] | <code>boolean</code> | <code>false</code> | Indica si el envío de los           elementos seleccionados en la selección múltiple se realiza           como un array JSON donde el nombre del mapa será el nombre del           select. En el caso de que el nombre contenga notación dot se           tomará el último literal. Ej: [{id:1}, {id:2}, …]. |
| [readAsString] | <code>boolean</code> | <code>false</code> | Determina si la asignación de           un valor inicial se va a realizar a partir de un string con los           ids de los elementos separados por comas en vez de un array de           json. |
| [rowStriping] | <code>boolean</code> | <code>false</code> | Indica si se debe aplicar un           estilo diferente a las filas pares e impares para poder           distinguirlas mediante un color diferente. |
| [typeAhead] | <code>number</code> | <code>false</code> | Especifica en milisegundos el           tiempo de espera que toma el componente antes de procesar los           eventos de escritura realizados por el usuario. |
| [legacyWrapMode] | <code>number</code> | <code>false</code> | Determina si se emplea el           método obsoleto a la hora de empaquetar en objetos json los           elementos seleccionados. Su propósito es mantener la           retrocompatibilidad. |

<a name="module_rup_select..getRupValue"></a>

### rup_select~getRupValue() ⇒ <code>string</code> \| <code>number</code>
Método utilizado para obtener el valor del componente. Este método esel utilizado por el resto de componentes RUP para estandarizar laobtención del valor del select.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Returns**: <code>string</code> \| <code>number</code> - - Devuelve el valor actual del componente        seleccionado por el usuario.  
**Example**  
```js
$("#idSelect").rup_select("getRupValue");
```
<a name="module_rup_select..setRupValue"></a>

### rup_select~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método esel utilizado por el resto de componentes RUP para estandarizar laasignación del valor al Select.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#idSelect").rup_select('setRupValue', 'Si');
```
<a name="module_rup_select..clear"></a>

### rup_select~clear()
Método que limpia el valor seleccionado en el select. En el caso deselección múltiple los valores seleccionados.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("clear");
```
<a name="module_rup_select..change"></a>

### rup_select~change()
Método que lanza el evento change del componente.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("change");
```
<a name="module_rup_select..checkAll"></a>

### rup_select~checkAll()
Selecciona todos los elementos en el caso de tratarse de un selectmultilesección.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("checkAll");
```
<a name="module_rup_select..selectByLabel"></a>

### rup_select~selectByLabel(param)
Selecciona el elemento del select que contiene como texto elindicado. En caso de no existir el texto a buscar el se no sufrirácambios En el caso de selección múltiple el parámetro será un array.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Parámetro utilzado para determinar los            elementos a seleccionar. |

**Example**  
```js
// Simple $("#idSelect").rup_select("selectByLabel", "No"); //         Multiple $("#idSelect").rup_select("selectByLabel",         ["No","Si"]);
```
<a name="module_rup_select..label"></a>

### rup_select~label() ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
Método que devuelve el label asociado al valor seleccionado en elselect. En el caso de la selección múltiple se devolverá un array.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - - Texto del elemento o elementos        seleccionado.  
**Example**  
```js
$("#idSelect").rup_select("label");
```
<a name="module_rup_select..index"></a>

### rup_select~index() ⇒ <code>number</code> \| <code>Array.&lt;number&gt;</code>
Devuelve el índice de la opción seleccionada en el select (empezandoen 1). En el caso de la selección múltiple se devolverá un array.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Returns**: <code>number</code> \| <code>Array.&lt;number&gt;</code> - - Índice del elemento o elementos        seleccionados.  
**Example**  
```js
$("#idSelect").rup_select("index");
```
<a name="module_rup_select..disable"></a>

### rup_select~disable()
Deshabilita el select.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("disable");
```
<a name="module_rup_select..enable"></a>

### rup_select~enable()
Habilita el select.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("enable");
```
<a name="module_rup_select..isDisabled"></a>

### rup_select~isDisabled()
Indica si el select está deshabilitado o no.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  

| Type | Description |
| --- | --- |
| <code>boolean</code> | Devuelve si el select está deshabilitado o no. |

**Example**  
```js
$("#idSelect").rup_select("isDisabled");
```
<a name="module_rup_select..reload"></a>

### rup_select~reload()
Realiza una recarga de los select.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  
**Example**  
```js
$("#idSelect").rup_select("reload");
```
<a name="module_rup_select..setSource"></a>

### rup_select~setSource(source)
Cambia el source del select y recarga el componente para que estecomience a usarlo.

**Kind**: inner method of [<code>rup\_select</code>](#module_rup_select)  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Source desde el cual se obtendran los datos a            mostrar. |

**Example**  
```js
$("#idSelect").rup_select("setSource", source);
```
