<a name="module_rup_table/report"></a>

## rup_table/report
Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla

**Summary**: Plugin de report del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["report"],       	report:{       		// Propiedades de configuración del plugin report       	}});
```

* [rup_table/report](#module_rup_table/report)
    * _instance_
        * ["rupTable_serializeReportData"](#module_rup_table/report+event_rupTable_serializeReportData)
    * _inner_
        * [~options](#module_rup_table/report..options)
        * [~preConfigureReport(settings)](#module_rup_table/report..preConfigureReport)
        * [~postConfigureReport(settings)](#module_rup_table/report..postConfigureReport)

<a name="module_rup_table/report+event_rupTable_serializeReportData"></a>

### "rupTable_serializeReportData"
Permite asociar un manejador al evento que se produce en el momento en el que se construye el objeto que se envía al servidor para solicitar la generación del informe. Permite la modificación del objeto postData para añadir, modificar o eliminar los parámetros que van a ser enviados.

**Kind**: event emitted by <code>[rup_table/report](#module_rup_table/report)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_serializeReportData" ,function(event, postData){   });
```
<a name="module_rup_table/report..options"></a>

### rup_table/report~options
Parámetros de configuración para el plugin report.

**Kind**: inner property of <code>[rup_table/report](#module_rup_table/report)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| columns | <code>array</code> | Permite especificar mediante un array, los identificadores de las columnas que van a ser mostradas en el informe. |
| buttons | <code>object</code> | Esta propiedad permite especificar los controles mediante los cuales se van a exportar los datos en los diferentes formatos. |

<a name="module_rup_table/report..preConfigureReport"></a>

### rup_table/report~preConfigureReport(settings)
Metodo que realiza la pre-configuración del plugin report del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/report](#module_rup_table/report)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/report..postConfigureReport"></a>

### rup_table/report~postConfigureReport(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/report](#module_rup_table/report)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

