## Objects

<dl>
<dt><a href="#jQuery">jQuery</a> : <code>object</code></dt>
<dd><p>jQuery definition to anchor JsDoc comments.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#i18nParse">i18nParse(properties, i18nCaption, defaultValue)</a> ⇒ <code>string</code></dt>
<dd><p>Método encargado de devolver el literal obtenido de estructura JSON (en caso de error devuelve el recurso establecido por defecto).</p>
</dd>
<dt><a href="#i18nTemplate">i18nTemplate(properties, i18nCaption)</a> ⇒ <code>string</code></dt>
<dd><p>Método encargado de devolver el literal obtenido de estructura JSON (en caso de error devuelve el recurso establecido por defecto).</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#File">File</a></dt>
<dd><p>The File interface provides information about files and allows to access their content.</p>
</dd>
<dt><a href="#Blob">Blob</a></dt>
<dd><p>A Blob object represents a file-like object of immutable, raw data. Blobs represent data that isn&#39;t necessarily in a JavaScript-native format.</p>
</dd>
<dt><a href="#jQuery">jQuery</a> : <code>object</code></dt>
<dd><p>jQuery object type.</p>
</dd>
<dt><a href="#Selector">Selector</a> : <code>object</code></dt>
<dd><p>Selector de jQuery para referenciar elementos del DOM.</p>
</dd>
<dt><a href="#Event">Event</a> : <code>object</code></dt>
<dd><p>jQuery Event type object.</p>
</dd>
<dt><a href="#Element">Element</a> : <code>object</code></dt>
<dd><p>Elemento del Document Object Model (DOM).</p>
</dd>
<dt><a href="#Integer">Integer</a> : <code>number</code></dt>
<dd><p>Tipo de dato entero.</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_String">String</a></dt>
<dd><p>The built in string object.</p>
</dd>
</dl>

<a name="jQuery"></a>

## jQuery : <code>object</code>
jQuery definition to anchor JsDoc comments.

**Kind**: global namespace  
**See**: http://jquery.com/  
<a name="i18nParse"></a>

## i18nParse(properties, i18nCaption, defaultValue) ⇒ <code>string</code>
Método encargado de devolver el literal obtenido de estructura JSON (en caso de error devuelve el recurso establecido por defecto).

**Kind**: global function  
**Returns**: <code>string</code> - Recurso idiomático.  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object.&lt;string, \*&gt;</code> | Objeto que contiene el recurso idiomático a obtener. |
| i18nCaption | <code>string</code> | Clave del recurso a obtener. |
| defaultValue | <code>string</code> | Valor por defecto a usar cuando no se pueda devolver el recurso solicitado. |

<a name="i18nTemplate"></a>

## i18nTemplate(properties, i18nCaption) ⇒ <code>string</code>
Método encargado de devolver el literal obtenido de estructura JSON (en caso de error devuelve el recurso establecido por defecto).

**Kind**: global function  
**Returns**: <code>string</code> - Recurso idiomático.  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object.&lt;string, \*&gt;</code> | Objeto que contiene el recurso idiomático a procesar. |
| i18nCaption | <code>string</code> | Clave del recurso a procesar. |

<a name="File"></a>

## File
The File interface provides information about files and allows to access their content.

**Kind**: global typedef  
**See**: [File](https://developer.mozilla.org/en-US/docs/Web/API/File)  
<a name="Blob"></a>

## Blob
A Blob object represents a file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format.

**Kind**: global typedef  
**See**: [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)  
<a name="jQuery"></a>

## jQuery : <code>object</code>
jQuery object type.

**Kind**: global typedef  
<a name="Selector"></a>

## Selector : <code>object</code>
Selector de jQuery para referenciar elementos del DOM.

**Kind**: global typedef  
**See**: [Selector](http://api.jquery.com/Types/#Selector)  
<a name="Event"></a>

## Event : <code>object</code>
jQuery Event type object.

**Kind**: global typedef  
<a name="Element"></a>

## Element : <code>object</code>
Elemento del Document Object Model (DOM).

**Kind**: global typedef  
<a name="Integer"></a>

## Integer : <code>number</code>
Tipo de dato entero.

**Kind**: global typedef  
<a name="external_String"></a>

## String
The built in string object.

**Kind**: global external  
**See**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)  
