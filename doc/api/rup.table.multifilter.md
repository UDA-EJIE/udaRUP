<a name="module_rup_table/multifilter"></a>

## rup_table/multifilter
Permite la gestión de múltiples filtros para el componente rup_table.

**Summary**: Plugin de multifiltro del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["multifilter"],       	multifilter:{       		// Propiedades de configuración del plugin multifilter       	}});
```

* [rup_table/multifilter](#module_rup_table/multifilter)
    * _instance_
        * ["rupTable_multifilter_beforeAdd"](#module_rup_table/multifilter+event_rupTable_multifilter_beforeAdd)
        * ["rupTable_multifilter_fillForm"](#module_rup_table/multifilter+event_rupTable_multifilter_fillForm)
    * _inner_
        * [~options](#module_rup_table/multifilter..options)
        * [~preConfigureMultifilter(settings)](#module_rup_table/multifilter..preConfigureMultifilter)
        * [~postConfigureMultifilter(settings)](#module_rup_table/multifilter..postConfigureMultifilter)
        * [~addFilter(filter)](#module_rup_table/multifilter..addFilter)
        * [~deleteFilter(filter)](#module_rup_table/multifilter..deleteFilter)

<a name="module_rup_table/multifilter+event_rupTable_multifilter_beforeAdd"></a>

### "rupTable_multifilter_beforeAdd"
Evento lanzado justo antes de añadir un filtro

**Kind**: event emitted by <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_multifilter_beforeAdd", function(){   });
```
<a name="module_rup_table/multifilter+event_rupTable_multifilter_fillForm"></a>

### "rupTable_multifilter_fillForm"
Evento ejecutado cuando se rellenar el formulario del filtro. Cada vez que se cancela, limpia o se selecciona un filtro se lanza este evento.

**Kind**: event emitted by <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_multifilter_fillForm", function(){   });
```
<a name="module_rup_table/multifilter..options"></a>

### rup_table/multifilter~options
Parámetros de configuración para el plugin filter.

**Kind**: inner property of <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| idFilter | <code>string</code> |  | Permite asignar un identificador al filtro. Debe ser único para toda la aplicación. En caso de no asignar un id, se asigna el selector del rup_table. |
| labelSize | <code>number</code> |  | Permite especificar el tamaño máximo permitido para el nombre del filtro. Es una propiedad obligatoria. |
| userFilter | <code>string</code> |  | En caso de que la aplicación donde se tiene que implementar el multifiltro no implemente la variable LOGGED_USER, para conservar el usuario identificado, con este parámetro permite asignar un identificador de usuario alternativo. |
| getDefatult | <code>booelan</code> | <code>true</code> | Determina si el multifiltro debe de cargar el filtro por defecto al cargar la página |

<a name="module_rup_table/multifilter..preConfigureMultifilter"></a>

### rup_table/multifilter~preConfigureMultifilter(settings)
Metodo que realiza la pre-configuración del plugin multifilter del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/multifilter..postConfigureMultifilter"></a>

### rup_table/multifilter~postConfigureMultifilter(settings)
Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/multifilter..addFilter"></a>

### rup_table/multifilter~addFilter(filter)
Función que añade un filtro al multifiltro

**Kind**: inner method of <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto filtro a añadir |

**Example**  
```js
$("#table").rup_table("addFilter",filtro);
```
<a name="module_rup_table/multifilter..deleteFilter"></a>

### rup_table/multifilter~deleteFilter(filter)
Elimina un filtro del multifiltro.

**Kind**: inner method of <code>[rup_table/multifilter](#module_rup_table/multifilter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objecto filtro a eliminar |

**Example**  
```js
$("#table").rup_table("deleteFilter",filtro);
```
