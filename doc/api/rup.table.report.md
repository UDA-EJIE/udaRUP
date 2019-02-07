<a name="module_rup_table/report"></a>

## rup_table/report
Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.

**Summary**: Plugin de reporting del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["report"],	report:{		// Propiedades de configuración del report inlineEdit	}});
```

* [rup_table/report](#module_rup_table/report)
    * [~options](#module_rup_table/report..options)
    * [~preConfigureReport(settings)](#module_rup_table/report..preConfigureReport)
    * [~postConfigureReport(settings)](#module_rup_table/report..postConfigureReport)

<a name="module_rup_table/report..options"></a>

### rup_table/report~options
Propiedades de configuración del plugin report del componente RUP Table.

**Kind**: inner property of [<code>rup_table/report</code>](#module_rup_table/report)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [columns] | <code>object</code> | Permite especificar mediante un array, los identificadores de las columnas que van a ser mostradas en el informe. |
| [excludeColumns] | <code>Array.&lt;string&gt;</code> | Determina las columnas que van a ser excluidas de la generación del informe. |
| [sendPostDataParams] | <code>Array.&lt;string&gt;</code> | Parámetros del jqGrid que van a ser enviados en la petición de generación del informe. |

<a name="module_rup_table/report..preConfigureReport"></a>

### rup_table/report~preConfigureReport(settings)
Metodo que realiza la pre-configuración del plugin report del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/report</code>](#module_rup_table/report)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/report..postConfigureReport"></a>

### rup_table/report~postConfigureReport(settings)
Metodo que realiza la post-configuración del plugin report del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/report</code>](#module_rup_table/report)  
**Emits**: [<code>rupTable_serializeReportData</code>](#module_rup_table+event_rupTable_serializeReportData)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

