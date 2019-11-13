<a name="module_rup_jqtable/multifilter"></a>

## rup_jqtable/multifilter
Gestiona las operaciones de filtrado múltiple de datos sobre el origen de datos que utiliza el componente.

**Summary**: Plugin de filtrado múltiple del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["multifilter"],	filter:{		// Propiedades de configuración del plugin multifilter	}});
```

* [rup_jqtable/multifilter](#module_rup_jqtable/multifilter)
    * [~options](#module_rup_jqtable/multifilter..options)
    * [~preConfigureMultifilter(settings)](#module_rup_jqtable/multifilter..preConfigureMultifilter)
    * [~postConfigureMultifilter(settings)](#module_rup_jqtable/multifilter..postConfigureMultifilter)
    * [~getMultifilterDialogTemplate(settings)](#module_rup_jqtable/multifilter..getMultifilterDialogTemplate) ⇒ <code>object</code>
    * [~configureMultifilter(settings)](#module_rup_jqtable/multifilter..configureMultifilter)
    * [~addFilter(filter)](#module_rup_jqtable/multifilter..addFilter)
    * [~deleteFilter(filter)](#module_rup_jqtable/multifilter..deleteFilter)

<a name="module_rup_jqtable/multifilter..options"></a>

### rup_jqtable/multifilter~options
Propiedades de configuración del plugin multifilter del componente RUP Table.

**Kind**: inner property of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [idFilter] | <code>string</code> |  | Permite asignar un identificador al filtro. Debe ser único para toda la aplicación. En caso de no asignar un id, se asigna el selector del rup_jqtable. |
| labelSize | <code>string</code> |  | Permite especificar el tamaño máximo permitido para el nombre del filtro. Es una propiedad obligatoria. |
| [userFilter] | <code>string</code> |  | En caso de que la aplicación donde se tiene que implementar el multifiltro no implemente la variable LOGGED_USER, para conservar el usuario identificado, con este parámetro permite asignar un identificador de usuario alternativo. |
| [getDefault] | <code>boolean</code> | <code>true</code> | Determina si el multifiltro debe de cargar el filtro por defecto al cargar la página. |

<a name="module_rup_jqtable/multifilter..preConfigureMultifilter"></a>

### rup_jqtable/multifilter~preConfigureMultifilter(settings)
Metodo que realiza la pre-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multifilter..postConfigureMultifilter"></a>

### rup_jqtable/multifilter~postConfigureMultifilter(settings)
Metodo que realiza la post-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Emits**: <code>module:rup_jqtable#event:rupTable_multifilter_fillForm</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multifilter..getMultifilterDialogTemplate"></a>

### rup_jqtable/multifilter~getMultifilterDialogTemplate(settings) ⇒ <code>object</code>
Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Returns**: <code>object</code> - - Objeto jQuery con el contenido html de la template.  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_jqtable("getMultifilterDialogTemplate", settings);
```
<a name="module_rup_jqtable/multifilter..configureMultifilter"></a>

### rup_jqtable/multifilter~configureMultifilter(settings)
Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_jqtable("configureMultifilter", settings);
```
<a name="module_rup_jqtable/multifilter..addFilter"></a>

### rup_jqtable/multifilter~addFilter(filter)
Función que añade un filtro al multifiltro

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Emits**: [<code>rupTable_multifilter_beforeAdd</code>](#module_rup_jqtable+event_rupTable_multifilter_beforeAdd)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a añadir. |

**Example**  
```js
$("#idComponente").rup_jqtable("addFilter", filter);
```
<a name="module_rup_jqtable/multifilter..deleteFilter"></a>

### rup_jqtable/multifilter~deleteFilter(filter)
Función que elimina un filtro del multifiltro.

**Kind**: inner method of [<code>rup_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a eliminar. |

**Example**  
```js
$("#idComponente").rup_jqtable("deleteFilter", filter);
```
