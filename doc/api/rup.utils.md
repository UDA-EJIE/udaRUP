<a name="jQuery.module_rup_utils"></a>

## rup\_utils
Módulo de utilidades comunes a todos los componentes RUP. <br/><br/>Implementa métodos para la manipulación de JSON, formularios, formatos...

**Summary**: Librería de utilidades para los componentes RUP.  

* [rup_utils](#jQuery.module_rup_utils)
    * [~normalize(texto)](#jQuery.module_rup_utils..normalize) ⇒ <code>string</code>
    * ~~[~editFormSerialize(idForm, [serializerSplitter])](#jQuery.module_rup_utils..editFormSerialize) ⇒ <code>string</code>~~
    * [~formDataToQueryString(idForm, options)](#jQuery.module_rup_utils..formDataToQueryString) ⇒ <code>string</code>
    * ~~[~escapeId()](#jQuery.module_rup_utils..escapeId)~~
    * [~isNumeric(field)](#jQuery.module_rup_utils..isNumeric) ⇒ <code>boolean</code>
    * ~~[~flattenJSON(originalObj, flattenedObj, extraKey)](#jQuery.module_rup_utils..flattenJSON) ⇒ <code>object</code>~~
    * [~flattenObject(originalObj, options)](#jQuery.module_rup_utils..flattenObject) ⇒ <code>object</code>
    * [~unflattenObject(originalObj, options)](#jQuery.module_rup_utils..unflattenObject) ⇒ <code>object</code>

<a name="jQuery.module_rup_utils..normalize"></a>

### rup_utils~normalize(texto) ⇒ <code>string</code>
Devuelve un string con los caracteres sencillos.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>string</code> - - Cadena de caracteres sin accentFolding.  
**Since**: UDA 3.3.0  

| Param | Type | Description |
| --- | --- | --- |
| texto | <code>string</code> | Cadena de caracteres inicial. |

**Example**  
```js
// Convierte los caracteres de la cadena "áéíóu" a "aeiou"$.rup_utils.normalize("áéíóu");
```
<a name="jQuery.module_rup_utils..editFormSerialize"></a>

### ~~rup_utils~editFormSerialize(idForm, [serializerSplitter]) ⇒ <code>string</code>~~
***Deprecated***

Método que transforma los datos de un formulario en un query string.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>string</code> - - Devuelve los datos del formulario en un query string.  
**Since**: UDA 6.2.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| idForm | <code>object</code> |  | Formulario que alberga los datos. |
| [serializerSplitter] | <code>string</code> | <code>&quot;&amp;&quot;</code> | Cadena a usar para separar los campos. |

<a name="jQuery.module_rup_utils..formDataToQueryString"></a>

### rup_utils~formDataToQueryString(idForm, options) ⇒ <code>string</code>
Método que transforma los datos de un formulario en un query string.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>string</code> - - Devuelve los datos del formulario en un query string.  
**Since**: UDA 6.2.0  

| Param | Type | Description |
| --- | --- | --- |
| idForm | <code>object</code> | Formulario que alberga los datos. |
| options | <code>object</code> | Opciones de configuración: https://github.com/sindresorhus/query-string?tab=readme-ov-file#stringifyobject-options |

<a name="jQuery.module_rup_utils..escapeId"></a>

### ~~rup_utils~escapeId()~~
***Deprecated***

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
<a name="jQuery.module_rup_utils..isNumeric"></a>

### rup_utils~isNumeric(field) ⇒ <code>boolean</code>
Comprueba si el parámetro es un número. Sustituye al método isNumeric de jQuery que fue deprecado en la versión 3.3.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>boolean</code> - Indica si es un número.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>number</code> \| <code>string</code> \| <code>boolean</code> \| <code>object</code> | Campo a comprobar. |

**Example**  
```js
$.rup_utils.isNumeric(6);
```
<a name="jQuery.module_rup_utils..flattenJSON"></a>

### ~~rup_utils~flattenJSON(originalObj, flattenedObj, extraKey) ⇒ <code>object</code>~~
***Deprecated***

Convierte un JSON con múltiples niveles en un JSON con un único nivel.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>object</code> - Objeto con un único nivel.  
**Since**: UDA 5.0.2  

| Param | Type | Description |
| --- | --- | --- |
| originalObj | <code>object</code> | Objeto con varios niveles (admite también un único nivel, pero no tiene sentido llamar a la función en ese caso). |
| flattenedObj | <code>object</code> | Objeto con un único nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma. |
| extraKey | <code>string</code> | Clave necesaria cuando hay más de un nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma. |

<a name="jQuery.module_rup_utils..flattenObject"></a>

### rup_utils~flattenObject(originalObj, options) ⇒ <code>object</code>
Convierte un objeto de JavaScript con múltiples niveles en un objeto con un único nivel.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>object</code> - Objeto con un único nivel.  
**Since**: UDA 6.2.0  

| Param | Type | Description |
| --- | --- | --- |
| originalObj | <code>object</code> | Objeto con varios niveles (admite también un único nivel, pero no tiene sentido llamar a la función en ese caso). |
| options | <code>object</code> | Opciones de configuración: https://github.com/hughsk/flat?tab=readme-ov-file#options |

<a name="jQuery.module_rup_utils..unflattenObject"></a>

### rup_utils~unflattenObject(originalObj, options) ⇒ <code>object</code>
Convierte un objeto de JavaScript con un único nivel en un objeto con múltiples niveles.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>object</code> - Objeto con múltiples niveles (siempre y cuando el objeto procesado los tuviese).  
**Since**: UDA 6.2.0  

| Param | Type | Description |
| --- | --- | --- |
| originalObj | <code>object</code> | Objeto plano con varios niveles (admite también un único nivel, pero no tiene sentido llamar a la función en ese caso). |
| options | <code>object</code> | Opciones de configuración: https://github.com/hughsk/flat?tab=readme-ov-file#options |

