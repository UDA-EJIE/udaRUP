<a name="module_rup_language"></a>

## rup_language
El componente de idioma esta diseñado para permitir al usuario elegir, de forma intuitiva, el idioma en el que se presenta la aplicación.

**Summary**: Componente RUP Language.  
**Example**  
```js
var properties={  // Propiedades de configuración};$("#idlanguage").rup_language(properties);
```

* [rup_language](#module_rup_language)
    * [~defaults](#module_rup_language..defaults)
    * [~destroy()](#module_rup_language..destroy)

<a name="module_rup_language..defaults"></a>

### rup_language~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup_language</code>](#module_rup_language)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| languages | <code>object</code> | Conjunto de idiomas que serán gestionados con el componente. El listado de los mismos, por configuración general, se gestiona a través de la variable jQuery “$.rup.AVAILABLE_LANGS_ARRAY”. Para mas información, consultar el documento “Anexo-Gestion_idiomatica.doc” de la documentación de UDA. |
| [modo] | <code>string</code> | Determina el tipo de maquetación que utilizara el componente para presentar las diferentes opciones idiomáticas. Si el valor especificado es “portal”, los idiomas se presentaran en un listado horizontal separado por barras (ver ejemplo visual del capítulo/Sección “2. Ejemplo”). En cualquier otro caso, se mostrara el modo por defecto (ver ejemplo visual del capítulo/Sección “2. Ejemplo”). |

<a name="module_rup_language..destroy"></a>

### rup_language~destroy()
Elimina el componente.

**Kind**: inner method of [<code>rup_language</code>](#module_rup_language)  
**Example**  
```js
$("#idlanguage").rup_language("destroy");
```
