<a name="module_rup_table/responsive"></a>

## rup_table/responsive
Proporciona al componente RUP Table ciertas funcionalidades responsive.

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["responsive"],	responsive:{		// Propiedades de configuración del plugin responsive	}});
```

* [rup_table/responsive](#module_rup_table/responsive)
    * [~options](#module_rup_table/responsive..options)
    * [~preConfigureResponsive(settings)](#module_rup_table/responsive..preConfigureResponsive)
    * [~postConfigureResponsive(settings)](#module_rup_table/responsive..postConfigureResponsive)
    * [~getRwdColConfig()](#module_rup_table/responsive..getRwdColConfig) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_rup_table/responsive..options"></a>

### rup_table/responsive~options
Propiedades de configuración del plugin responsive del componente RUP Table.

**Kind**: inner property of [<code>rup_table/responsive</code>](#module_rup_table/responsive)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fluid] | <code>object</code> | Parametros de configuración |
| [excludeColumns] | <code>Array.&lt;string&gt;</code> | Determina las columnas que van a ser excluidas de la generación del informe. |
| [sendPostDataParams] | <code>Array.&lt;string&gt;</code> | Parámetros del jqGrid que van a ser enviados en la petición de generación del informe. |

<a name="module_rup_table/responsive..preConfigureResponsive"></a>

### rup_table/responsive~preConfigureResponsive(settings)
Metodo que realiza la pre-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/responsive</code>](#module_rup_table/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/responsive..postConfigureResponsive"></a>

### rup_table/responsive~postConfigureResponsive(settings)
Metodo que realiza la post-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/responsive</code>](#module_rup_table/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/responsive..getRwdColConfig"></a>

### rup_table/responsive~getRwdColConfig() ⇒ <code>Array.&lt;object&gt;</code>
Obtiene a partir de la configuración del colModel, la información correspondiente al comportamiento responsive de las columnas.

**Kind**: inner method of [<code>rup_table/responsive</code>](#module_rup_table/responsive)  
**Returns**: <code>Array.&lt;object&gt;</code> - - Configuración responsive para las columnas de la tabla.  
