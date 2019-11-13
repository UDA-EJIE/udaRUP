<a name="module_rup_jqtable/responsive"></a>

## rup\_jqtable/responsive
Proporciona al componente RUP Table ciertas funcionalidades responsive.

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["responsive"],	responsive:{		// Propiedades de configuración del plugin responsive	}});
```

* [rup_jqtable/responsive](#module_rup_jqtable/responsive)
    * [~options](#module_rup_jqtable/responsive..options)
    * [~preConfigureResponsive(settings)](#module_rup_jqtable/responsive..preConfigureResponsive)
    * [~postConfigureResponsive(settings)](#module_rup_jqtable/responsive..postConfigureResponsive)
    * [~getRwdColConfig()](#module_rup_jqtable/responsive..getRwdColConfig) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_rup_jqtable/responsive..options"></a>

### rup_jqtable/responsive~options
Propiedades de configuración del plugin responsive del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fluid] | <code>object</code> | Parametros de configuración |
| [excludeColumns] | <code>Array.&lt;string&gt;</code> | Determina las columnas que van a ser excluidas de la generación del informe. |
| [sendPostDataParams] | <code>Array.&lt;string&gt;</code> | Parámetros del jqGrid que van a ser enviados en la petición de generación del informe. |

<a name="module_rup_jqtable/responsive..preConfigureResponsive"></a>

### rup_jqtable/responsive~preConfigureResponsive(settings)
Metodo que realiza la pre-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/responsive..postConfigureResponsive"></a>

### rup_jqtable/responsive~postConfigureResponsive(settings)
Metodo que realiza la post-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/responsive..getRwdColConfig"></a>

### rup_jqtable/responsive~getRwdColConfig() ⇒ <code>Array.&lt;object&gt;</code>
Obtiene a partir de la configuración del colModel, la información correspondiente al comportamiento responsive de las columnas.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  
**Returns**: <code>Array.&lt;object&gt;</code> - - Configuración responsive para las columnas de la tabla.  
