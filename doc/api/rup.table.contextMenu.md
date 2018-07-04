<a name="module_rup_table/contextMenu"></a>

## rup_table/contextMenu
Tiene como objetivo proporcionar al componente RUP Table de las funcionalidades que ofrece el uso de un menú contextual.

**Summary**: Plugin de menú contextual del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["contextMenu"],	contextMenu:{		// Propiedades de configuración del plugin contextMenu	}});
```

* [rup_table/contextMenu](#module_rup_table/contextMenu)
    * [~options](#module_rup_table/contextMenu..options)
    * [~preConfigureContextMenu(settings)](#module_rup_table/contextMenu..preConfigureContextMenu)
    * [~postConfigureContextMenu(settings)](#module_rup_table/contextMenu..postConfigureContextMenu)

<a name="module_rup_table/contextMenu..options"></a>

### rup_table/contextMenu~options
Propiedades de configuración del plugin contextMenu del componente RUP Table.

**Kind**: inner property of [<code>rup_table/contextMenu</code>](#module_rup_table/contextMenu)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| colNames | <code>Array.&lt;string&gt;</code> | <code></code> | Mediante un array se puede configurar las columnas para las cuales se va a mostrar el menú contextual. En caso de especificar el valor null se mostrará en todas las columnas. |
| createDefaultRowOperations | <code>boolean</code> | <code>true</code> | Propiedad que indica si el componente va a mostrar las operaciones por defecto como opciones dentro del menú contextual. |
| tbodySelector | <code>string</code> | <code>&quot;&#x27;tbody:first tr[role&#x3D;\\&#x27;row\\&#x27;].jqgrow&#x27;&quot;</code> | Selector de jQuery que identifica el tbody de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de tabla. |
| tbodyTdSelector | <code>string</code> | <code>&quot;&#x27;tbody:first tr.jqgrow td&#x27;&quot;</code> | Selector de jQuery que identifica las columnas de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de columna. |
| theadThSelector | <code>string</code> | <code>&quot;&#x27;thead:first th&#x27;&quot;</code> | Selector de jQuery que identifica las cabeceras de las columnas de la tabla. |
| items | <code>object</code> | <code>{}}</code> | Se especifica la configuración de los diferentes items que se van a mostrar en el menú contextual para los registros. |
| showOperations | <code>Array.&lt;rup_table~Operations&gt;</code> |  | Permite indicar que operaciones definidas de manera global van a ser mostradas como opciones en el menú contextual. |

<a name="module_rup_table/contextMenu..preConfigureContextMenu"></a>

### rup_table/contextMenu~preConfigureContextMenu(settings)
Metodo que realiza la pre-configuración del plugin contextMenu del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/contextMenu</code>](#module_rup_table/contextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/contextMenu..postConfigureContextMenu"></a>

### rup_table/contextMenu~postConfigureContextMenu(settings)
Metodo que realiza la post-configuración del plugin contextMenu del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/contextMenu</code>](#module_rup_table/contextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

