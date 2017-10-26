<a name="module_rup_autocomplete"></a>

## rup_autocomplete
Permite al usuario recuperar un elemento de una gran lista de elementos o de varias listas dependientes de forma sencilla y ocupando poco espacio en la interfaz.

**Summary**: Componente RUP Autocomplete.  
**See**: El componente está basado en el plugin [jQuery UI Autocomplete](https://jqueryui.com/autocomplete/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/autocomplete/).  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete({	source : "autocomplete/remote",	sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code"}});
```

* [rup_autocomplete](#module_rup_autocomplete)
    * _instance_
        * ["rupAutocomplete_loadComplete"](#module_rup_autocomplete+event_rupAutocomplete_loadComplete)
        * ["rupAutocomplete_change"](#module_rup_autocomplete+event_rupAutocomplete_change)
        * ["rupAutocomplete_select"](#module_rup_autocomplete+event_rupAutocomplete_select)
        * ["rupAutocomplete_beforeLoadComplete"](#module_rup_autocomplete+event_rupAutocomplete_beforeLoadComplete)
    * _inner_
        * [~defaults](#module_rup_autocomplete..defaults)
        * [~getRupValue()](#module_rup_autocomplete..getRupValue) ⇒ <code>string</code> \| <code>number</code>
        * [~setRupValue(param)](#module_rup_autocomplete..setRupValue)
        * [~destroy()](#module_rup_autocomplete..destroy)
        * [~off()](#module_rup_autocomplete..off)
        * [~on()](#module_rup_autocomplete..on)
        * [~disable()](#module_rup_autocomplete..disable)
        * [~enable()](#module_rup_autocomplete..enable)
        * [~option(optionName, [value], aux)](#module_rup_autocomplete..option)
        * [~search(term)](#module_rup_autocomplete..search)
        * [~close()](#module_rup_autocomplete..close)
        * [~val()](#module_rup_autocomplete..val)
        * [~set(value, label)](#module_rup_autocomplete..set)
        * [~success()](#module_rup_autocomplete..success)
        * [~onLoadError](#module_rup_autocomplete..onLoadError) : <code>function</code>

<a name="module_rup_autocomplete+event_rupAutocomplete_loadComplete"></a>

### "rupAutocomplete_loadComplete"
Permite asociar una función que se ejecutará cuando se complete la carga de los registros correspondientes al texto de búsqueda introducido.

**Kind**: event emitted by [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#autocomplete").on("rupAutocomplete_loadComplete", function(event, data){});
```
<a name="module_rup_autocomplete+event_rupAutocomplete_change"></a>

### "rupAutocomplete_change"
Permite asociar una función que se ejecutará cuando se produzca un cambio en el valor seleccionado del comonente

**Kind**: event emitted by [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#autocomplete").on("rupAutocomplete_change", function(event, data){});
```
<a name="module_rup_autocomplete+event_rupAutocomplete_select"></a>

### "rupAutocomplete_select"
Permite asociar una función que se ejecutará cuando se produzca la selección de un registro de entre la lista de resultados

**Kind**: event emitted by [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#autocomplete").on("rupAutocomplete_select", function(event, data){});
```
<a name="module_rup_autocomplete+event_rupAutocomplete_beforeLoadComplete"></a>

### "rupAutocomplete_beforeLoadComplete"
Permite manipular la respuesta del servidor antes de construir la lista de resultados.

**Kind**: event emitted by [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#autocomplete").on("rupAutocomplete_beforeLoadComplete", function(event, data){});
```
<a name="module_rup_autocomplete..defaults"></a>

### rup_autocomplete~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| onLoadError | [<code>onLoadError</code>](#module_rup_autocomplete..onLoadError) |  | Función de callback a ejecutar en caso de que se produzca un error en la petición de obtención de la lista de elementos a mostrar. |
| contains | <code>boolean</code> | <code>true</code> | Valor que determina si la búsqueda debe ser del tipo “contiene” (se buscarán elementos que contengan en cualquier posición el literal introducido) o del tipo “comienza por” (se buscarán elementos que comiencen por el literal introducido). |
| valueName | <code>string</code> | <code>null</code> | Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el identificador del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente. |
| labelName | <code>string</code> | <code>null</code> | Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el texto del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente, añadiéndole el sufijo “_label”. |
| getText | <code>boolean</code> | <code>false</code> | En caso de ser true el componente devolverá como resultado seleccionado el texto en vez del value del elemento. |
| combobox | <code>boolean</code> | <code>false</code> | Habilita/deshabilita el modo de funcionamiento combobox. |
| menuMaxHeight | <code>number</code> | <code>false</code> | Determina la altura máxima que podrá tener la capa del menú desplegable antes de mostrar scroll. |
| menuAppendTo | <code>object</code> | <code></code> | Permite especificar mediante un selector de jQuery el elemento del DOM al que se añadirá el menú desplegable. |
| disabled | <code>boolean</code> | <code>false</code> | Determina si se deshabilita el componente Autocomplete sobre el input al que se aplica. De tal modo que por mucho que se interactué con el elemento no se hará una búsqueda. |
| defaultValue | <code>string</code> |  | Valor que se cargará por defecto en el input y con el que se lanzará una búsqueda para mostrar valores propuestos |

<a name="module_rup_autocomplete..getRupValue"></a>

### rup_autocomplete~getRupValue() ⇒ <code>string</code> \| <code>number</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado
        por el resto de componentes RUP para estandarizar la obtención del valor del Autocomplete.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Returns**: <code>string</code> \| <code>number</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("getRupValue");
```
<a name="module_rup_autocomplete..setRupValue"></a>

### rup_autocomplete~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado por
el resto de componentes RUP para estandarizar la asignación del valor al Autocomplete.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#idAutocomplete").rup_autocomplete("setRupValue", "Si");
```
<a name="module_rup_autocomplete..destroy"></a>

### rup_autocomplete~destroy()
Elimina el autocomplete.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("destroy");
```
<a name="module_rup_autocomplete..off"></a>

### rup_autocomplete~off()
Deshabilita el autocomplete (solo la parte de sugerencias, el input sigue habilitado).

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("off");
```
<a name="module_rup_autocomplete..on"></a>

### rup_autocomplete~on()
Habilita el autocomplete (solo la parte de sugerencias).

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("on");
```
<a name="module_rup_autocomplete..disable"></a>

### rup_autocomplete~disable()
Deshabilita el autocomplete. Internamente invoca al método [off](#module_rup_autocomplete..off).

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("disable");
```
<a name="module_rup_autocomplete..enable"></a>

### rup_autocomplete~enable()
Habilita el autocomplete. Internamente invoca al método [on](#module_rup_autocomplete..on).

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("enable");
```
<a name="module_rup_autocomplete..option"></a>

### rup_autocomplete~option(optionName, [value], aux)
Permite consultar y modificar la configuración del componente.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  

| Param | Type | Description |
| --- | --- | --- |
| optionName | <code>string</code> \| <code>object</code> | Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades. |
| [value] | <code>\*</code> | Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro. |
| aux | <code>\*</code> | Parámetro extra de confirguración para la propiedad "source". |

**Example**  
```js
// Establecer una propiedad$("#idAutocomplete").rup_autocomplete("option", "minLegth", 2);// Establecer varias propiedad$("#idAutocomplete").rup_autocomplete("option", {minLegth:2, delay:1000});
```
<a name="module_rup_autocomplete..search"></a>

### rup_autocomplete~search(term)
Lanza una búsqueda en el autocomplete con el parámetro indicado y el foco va a parar al
input.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  

| Param | Type | Description |
| --- | --- | --- |
| term | <code>string</code> | Cadena de texto utilizada para realizar la búsqueda. |

**Example**  
```js
$("#idAutocomplete").rup_autocomplete("search", "java");
```
<a name="module_rup_autocomplete..close"></a>

### rup_autocomplete~close()
Oculta el autocomplete.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
$("#idAutocomplete").rup_autocomplete("close");
```
<a name="module_rup_autocomplete..val"></a>

### rup_autocomplete~val()
Devuelve el valor del autocomplete. Este es el valor que se guarda en el campo oculto antes descrito al final del apartado 7.Para obtener la descripción (dato que se muestra en el input) se invocará a la función estándar de jQuery.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Example**  
```js
// Recuperar el valor$("#idAutocomplete").rup_autocomplete("val");// Recuperar la descripción$("#idAutocomplete").val();
```
<a name="module_rup_autocomplete..set"></a>

### rup_autocomplete~set(value, label)
Método utilizado para asignar el valor y el literal al componente. El valor se almacena en el campo hidden creado por el componente. El contenido indicado en la propiedad label se mostrará en el campo input del componente.

**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | Valor que se va a almacenar en el campo hidden y que se corresponde con el value seleccionado. |
| label | <code>string</code> | Texto que se va a mostrar en el campo de texto del componente. |

**Example**  
```js
$("#idAutocomplete").rup_autocomplete("set", "48", "Bizkaia");
```
<a name="module_rup_autocomplete..success"></a>

### rup_autocomplete~success()
**Kind**: inner method of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  
**Emits**: <code>event:{[event]} rupAutocomplete_beforeLoadComplete [description]</code>  
<a name="module_rup_autocomplete..onLoadError"></a>

### rup_autocomplete~onLoadError : <code>function</code>
Función a ejecutar en caso de producirse un error a la hora de obtener los elementos a mostrar.

**Kind**: inner typedef of [<code>rup_autocomplete</code>](#module_rup_autocomplete)  

| Param | Type | Description |
| --- | --- | --- |
| xhr | <code>Object</code> | Objeto XHR que contiene la respuesta de la petición realizada. |
| textStatus | <code>string</code> | Texto que identifica el error producido. |
| errorThrown | <code>Object</code> | Objeto error que contiene las propiedades del error devuelto en la petición. |

