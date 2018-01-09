<a name="module_rup_table/fluid"></a>

## ~~rup_table/fluid~~
***Deprecated***

Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.

**Summary**: Plugin de filtrado múltiple del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["fuild"],	fuild:{		// Propiedades de configuración del plugin fuild	}});
```

* ~~[rup_table/fluid](#module_rup_table/fluid)~~
    * [~options](#module_rup_table/fluid..options)
    * [~postConfigureFluid(settings)](#module_rup_table/fluid..postConfigureFluid)

<a name="module_rup_table/fluid..options"></a>

### rup_table/fluid~options
Propiedades de configuración del plugin multifilter del componente RUP Table.

**Kind**: inner property of [<code>rup_table/fluid</code>](#module_rup_table/fluid)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| baseLayer | <code>string</code> |  | Identificador de la capa que contiene al componente. Se tomará como base para redimensionar las diferentes partes de la tabla. En caso de no indicarse se tomará por defecto una generada con el patrón identificadorTabla+”_div”. |
| minWidth | <code>integer</code> | <code>100</code> | Determina la anchura máxima a la que se va a redimensionar la capa. |
| maxWidth | <code>integer</code> | <code>2000</code> | Determina la anchura mínima a la que se va a redimensionar la capa. |
| fluidOffset | <code>integer</code> | <code>0</code> | Desplazamiento que se aplica a la capa redimensionada. |

<a name="module_rup_table/fluid..postConfigureFluid"></a>

### rup_table/fluid~postConfigureFluid(settings)
Metodo que realiza la post-configuración del plugin fuild del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/fluid</code>](#module_rup_table/fluid)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

