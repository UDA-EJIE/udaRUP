<a name="module_rup_jqtable/masterDetail"></a>

## rup_jqtable/masterDetail
Permite relacionar dos tablas de modo que tengan una relación maestro-detalle. De este modo, los resultados de la tabla detalle se muestran a partir del seleccionado en la tabla maestro.

**Summary**: Plugin de edición en línea del componente RUP Table.  
**Example**  
```js
$("#idComponenteMaestro").rup_jqtable({	url: "../jqGridUsuarioMaestro",});$("#idComponente").rup_jqtable({	url: "../jqGridUsuarioDetalle",	usePlugins:["masterDetail"],	inlineEdit:{		master: "#idComponenteMaestro"		// Propiedades de configuración del plugin inlineEdit	}});
```

* [rup_jqtable/masterDetail](#module_rup_jqtable/masterDetail)
    * [~options](#module_rup_jqtable/masterDetail..options)
    * [~preConfigureMasterDetail(settings)](#module_rup_jqtable/masterDetail..preConfigureMasterDetail)
    * [~getMasterTablePkObject(options)](#module_rup_jqtable/masterDetail..getMasterTablePkObject) ⇒ <code>object</code>

<a name="module_rup_jqtable/masterDetail..options"></a>

### rup_jqtable/masterDetail~options
Propiedades de configuración del plugin masterDetail del componente RUP Table.

**Kind**: inner property of [<code>rup_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| master | <code>string</code> | Selector jQuery que referencia al componente maestro. |
| masterPrimaryKey | <code>string</code> | Clave primaria del componente maestro. |

<a name="module_rup_jqtable/masterDetail..preConfigureMasterDetail"></a>

### rup_jqtable/masterDetail~preConfigureMasterDetail(settings)
Metodo que realiza la pre-configuración del plugin masterDetail del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/masterDetail..getMasterTablePkObject"></a>

### rup_jqtable/masterDetail~getMasterTablePkObject(options) ⇒ <code>object</code>
Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.

**Kind**: inner method of [<code>rup_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  
**Returns**: <code>object</code> - - Objeto json con la clave primaria del registro correspondiente de la tabla maestra  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración de la acción de inserción. |

**Example**  
```js
$("#idTable").rup_jqtable("getMasterTablePkObject");
```
