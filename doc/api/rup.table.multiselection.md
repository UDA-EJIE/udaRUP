<a name="module_rup_table/multiselection"></a>

## rup_table/multiselection
Permite realizar una selección múltiple de los registros que se muestran en la tabla.

**Summary**: Plugin de multiselection del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["multiselection"],	multiselection:{		// Propiedades de configuración del plugin multiselection	}});
```

* [rup_table/multiselection](#module_rup_table/multiselection)
    * [~preConfigureMultiselection(settings)](#module_rup_table/multiselection..preConfigureMultiselection)
    * [~postConfigureMultiselection(settings)](#module_rup_table/multiselection..postConfigureMultiselection)

<a name="module_rup_table/multiselection..preConfigureMultiselection"></a>

### rup_table/multiselection~preConfigureMultiselection(settings)
Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/multiselection</code>](#module_rup_table/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/multiselection..postConfigureMultiselection"></a>

### rup_table/multiselection~postConfigureMultiselection(settings)
Metodo que realiza la post-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/multiselection</code>](#module_rup_table/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

