<a name="module_rup_table/fluid"></a>

## rup_table/fluid
Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido

**Summary**: Plugin de diseño líquido del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["fluid"],       	fluid:{       		// Propiedades de configuración del plugin de diseño líquido       	}});
```

* [rup_table/fluid](#module_rup_table/fluid)
    * [~options](#module_rup_table/fluid..options)
    * [~postConfigureFluid(settings)](#module_rup_table/fluid..postConfigureFluid)

<a name="module_rup_table/fluid..options"></a>

### rup_table/fluid~options
Parámetros de configuración para el plugin fluid.

**Kind**: inner property of <code>[rup_table/fluid](#module_rup_table/fluid)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| baseLayer | <code>string</code> | Identificador de la capa que contiene al componente. Se tomará como base para redimensionar las diferentes partes de la tabla. En caso de no indicarse se tomará por defecto una generada con el patrón identificadorTabla+”_div”. |
| maxWidth | <code>number</code> | Determina la anchura máxima a la que se va a redimensionar la capa. |
| minWidth | <code>number</code> | Determina la anchura mínima a la que se va a redimensionar la capa. |
| fluidOffset | <code>number</code> | Desplazamiento que se aplica a la capa redimensionada. |

<a name="module_rup_table/fluid..postConfigureFluid"></a>

### rup_table/fluid~postConfigureFluid(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/fluid](#module_rup_table/fluid)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

