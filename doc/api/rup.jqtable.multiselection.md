<a name="module_rup_jqtable/multiselection"></a>

## rup\_jqtable/multiselection
Permite realizar una selección múltiple de los registros que se muestran en la tabla.

**Summary**: Plugin de multiselection del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["multiselection"],	multiselection:{		// Propiedades de configuración del plugin multiselection	}});
```

* [rup_jqtable/multiselection](#module_rup_jqtable/multiselection)
    * [~preConfigureMultiselection(settings)](#module_rup_jqtable/multiselection..preConfigureMultiselection)
    * [~postConfigureMultiselection(settings)](#module_rup_jqtable/multiselection..postConfigureMultiselection)

<a name="module_rup_jqtable/multiselection..preConfigureMultiselection"></a>

### rup_jqtable/multiselection~preConfigureMultiselection(settings)
Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multiselection</code>](#module_rup_jqtable/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multiselection..postConfigureMultiselection"></a>

### rup_jqtable/multiselection~postConfigureMultiselection(settings)
Metodo que realiza la post-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multiselection</code>](#module_rup_jqtable/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

