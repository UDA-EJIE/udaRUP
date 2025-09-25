<a name="module_rup_language"></a>

## rup\_language
El componente de idioma esta diseñado para permitir al usuario elegir, de forma intuitiva, el idioma en el que se presenta la aplicación.

**Summary**: Componente RUP Language.  
**Example**  
```js
var properties={  // Propiedades de configuración};$("#idlanguage").rup_language(properties);
```

* [rup_language](#module_rup_language)
    * [~destroy()](#module_rup_language..destroy)
    * [~getLocaleChangeUrl(newLocale)](#module_rup_language..getLocaleChangeUrl) ⇒ <code>string</code>
    * [~changeLocale(newLocale)](#module_rup_language..changeLocale)

<a name="module_rup_language..destroy"></a>

### rup_language~destroy()
Elimina el componente.

**Kind**: inner method of [<code>rup\_language</code>](#module_rup_language)  
**Example**  
```js
$("#idlanguage").rup_language("destroy");
```
<a name="module_rup_language..getLocaleChangeUrl"></a>

### rup_language~getLocaleChangeUrl(newLocale) ⇒ <code>string</code>
Método público para obtener URL de cambio de idioma.

**Kind**: inner method of [<code>rup\_language</code>](#module_rup_language)  
**Returns**: <code>string</code> - La URL completa con todos los parámetros preservados  

| Param | Type | Description |
| --- | --- | --- |
| newLocale | <code>string</code> | El nuevo idioma a establecer |

**Example**  
```js
var spanishUrl = $("#idlanguage").rup_language("getLocaleChangeUrl", "es");
```
<a name="module_rup_language..changeLocale"></a>

### rup_language~changeLocale(newLocale)
Método público para cambiar idioma programáticamente.

**Kind**: inner method of [<code>rup\_language</code>](#module_rup_language)  

| Param | Type | Description |
| --- | --- | --- |
| newLocale | <code>string</code> | El nuevo idioma a establecer |

**Example**  
```js
$("#idlanguage").rup_language("changeLocale", "es");
```
