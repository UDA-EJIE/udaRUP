<a name="jQuery.module_rup_utils"></a>

## rup\_utils
Módulo de utilidades comunes a todos los componentes RUP. <br/><br/>Implementa métodos para la manipulación de JSON, formularios, formatos...

**Summary**: Librería de utilidades para los componentes RUP.  

* [rup_utils](#jQuery.module_rup_utils)
    * [~normalize(texto)](#jQuery.module_rup_utils..normalize) ⇒ <code>string</code>
    * [~isNumeric(field)](#jQuery.module_rup_utils..isNumeric) ⇒ <code>boolean</code>
    * [~deleteMulticomboLabelFromObject(obj, container)](#jQuery.module_rup_utils..deleteMulticomboLabelFromObject)
    * [~deleteAutocompleteLabelFromObject(obj)](#jQuery.module_rup_utils..deleteAutocompleteLabelFromObject)
    * [~flattenJSON(originalObj, flattenedObj, extraKey)](#jQuery.module_rup_utils..flattenJSON) ⇒ <code>object</code>
    * [~isHdiv(id)](#jQuery.module_rup_utils..isHdiv) ⇒ <code>boolean</code>
    * [~getStaticHdivID(id)](#jQuery.module_rup_utils..getStaticHdivID) ⇒ <code>string</code>
    * [~getHDIV_STATE(hasMoreParams, $form)](#jQuery.module_rup_utils..getHDIV_STATE) ⇒ <code>string</code>
    * [~resetAutocomplete(type, obj)](#jQuery.module_rup_utils..resetAutocomplete)

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
<a name="jQuery.module_rup_utils..isNumeric"></a>

### rup_utils~isNumeric(field) ⇒ <code>boolean</code>
Comprueba si el parámetro es un número. Sustituye al método isNumeric de jQuery que fue deprecado en la versión 3.3.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>boolean</code> - Parámetro HDIV_STATE.  
**Since**: UDA 5.1.0  

| Param | Type | Description |
| --- | --- | --- |
| field | <code>number</code> \| <code>string</code> \| <code>boolean</code> \| <code>object</code> | Campo a comprobar. |

**Example**  
```js
$.rup_utils.isNumeric(6);
```
<a name="jQuery.module_rup_utils..deleteMulticomboLabelFromObject"></a>

### rup_utils~deleteMulticomboLabelFromObject(obj, container)
Elimina el campo autogenerado por el componente combo de un objeto. Dicho campo sólo sirve para gestión interna, por lo tanto, es seguro y recomendable eliminarlo.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Since**: UDA 4.2.2  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Objeto del que se quiere eliminar el campo autogenerado. |
| container | <code>object</code> | Contenedor del componente. |

<a name="jQuery.module_rup_utils..deleteAutocompleteLabelFromObject"></a>

### rup_utils~deleteAutocompleteLabelFromObject(obj)
Elimina el campo autogenerado por el componente autocomplete de un objeto. Dicho campo sólo sirve para gestión interna, por lo tanto, es seguro y recomendable eliminarlo.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Since**: UDA 4.2.2  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Objeto del que se quiere eliminar el campo autogenerado. |

<a name="jQuery.module_rup_utils..flattenJSON"></a>

### rup_utils~flattenJSON(originalObj, flattenedObj, extraKey) ⇒ <code>object</code>
Convierte un JSON con múltiples niveles en un JSON con un único nivel.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>object</code> - Objeto con un único nivel.  
**Since**: UDA 5.0.2  

| Param | Type | Description |
| --- | --- | --- |
| originalObj | <code>object</code> | Objeto con varios niveles (admite también un único nivel, pero no tiene sentido llamar a la función en ese caso). |
| flattenedObj | <code>object</code> | Objeto con un único nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma. |
| extraKey | <code>string</code> | Clave necesaria cuando hay más de un nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma. |

<a name="jQuery.module_rup_utils..isHdiv"></a>

### rup_utils~isHdiv(id) ⇒ <code>boolean</code>
Comprueba si el parámetro ha sido cifrado por Hdiv.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>boolean</code> - Verdadero si el parámetro ha sido cifrado por Hdiv.  
**Since**: UDA 5.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador de la entidad. |

<a name="jQuery.module_rup_utils..getStaticHdivID"></a>

### rup_utils~getStaticHdivID(id) ⇒ <code>string</code>
Procesa el identificador recibido para poder devolver la parte que no altera su cifrado entre peticiones.Es útil cuando se necesita comparar identificadores cifrados.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>string</code> - Identificador de la entidad con la parte dinámica del cifrado eliminada.  
**Since**: UDA 5.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador de la entidad. |

<a name="jQuery.module_rup_utils..getHDIV_STATE"></a>

### rup_utils~getHDIV\_STATE(hasMoreParams, $form) ⇒ <code>string</code>
Obtiene el parámetro HDIV_STATE de la URL o de un formulario.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Returns**: <code>string</code> - Parámetro HDIV_STATE.  
**Since**: UDA 5.0.0  

| Param | Type | Description |
| --- | --- | --- |
| hasMoreParams | <code>boolean</code> | Parámetro necesario para peticiones GET. Se utilizará para saber si el parámetro HDIV_STATE es el único existente en la URL. |
| $form | <code>object</code> | Formulario del que extraer el parámetro HDIV_STATE. Este parámetro tiene prioridad respecto a hasMoreParams, por lo tanto, si se recibe será el que se use. |

<a name="jQuery.module_rup_utils..resetAutocomplete"></a>

### rup_utils~resetAutocomplete(type, obj)
Reinicia por completo los autocomplete de un formulario para que no sigan filtrando.

**Kind**: inner method of [<code>rup\_utils</code>](#jQuery.module_rup_utils)  
**Since**: UDA 4.2.2  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | Valor del atributo type. |
| obj | <code>object</code> | Formulario del que obtener los autocompletes a reiniciar. |

