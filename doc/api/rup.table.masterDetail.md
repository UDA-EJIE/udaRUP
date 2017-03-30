<a name="module_rup_table/masterDetail"></a>

## rup_table/masterDetail
Permite relacionar dos tablas de modo que tengan una relación maestro-detalle. De este modo, los resultados de la tabla detalle se muestran a partir del seleccionado en la tabla maestro.

**Summary**: Plugin de masterDetail del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["masterDetail"],       	masterDetail:{       		// Propiedades de configuración del plugin masterDetail       		master: "#idComponenteMaestro"       	}});
```

* [rup_table/masterDetail](#module_rup_table/masterDetail)
    * [~options](#module_rup_table/masterDetail..options)
    * [~preConfigureMasterDetail(settings)](#module_rup_table/masterDetail..preConfigureMasterDetail)
    * [~getMasterTablePkObject()](#module_rup_table/masterDetail..getMasterTablePkObject)

<a name="module_rup_table/masterDetail..options"></a>

### rup_table/masterDetail~options
Parámetros de configuración  del plugin masterDetail

**Kind**: inner property of <code>[rup_table/masterDetail](#module_rup_table/masterDetail)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| master | <code>string</code> | Selector jQuery que referencia al componente maestro |
| masterPrimaryKey | <code>string</code> | Clave primaria del componente maestro. |

<a name="module_rup_table/masterDetail..preConfigureMasterDetail"></a>

### rup_table/masterDetail~preConfigureMasterDetail(settings)
Metodo que realiza la pre-configuración del plugin masterDetail del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/masterDetail](#module_rup_table/masterDetail)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/masterDetail..getMasterTablePkObject"></a>

### rup_table/masterDetail~getMasterTablePkObject()
Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.

**Kind**: inner method of <code>[rup_table/masterDetail](#module_rup_table/masterDetail)</code>  
**Example**  
```js
$("#idComponente").rup_table("getMasterTablePkObject");
```
