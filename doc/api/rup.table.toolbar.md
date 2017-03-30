<a name="module_rup_table/toolbar"></a>

## rup_table/toolbar
Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["toolbar"],       	toolbar:{       		// Propiedades de configuración del plugin toolbar       	}});
```

* [rup_table/toolbar](#module_rup_table/toolbar)
    * [~options](#module_rup_table/toolbar..options)
    * [~preConfigureToolbar(settings)](#module_rup_table/toolbar..preConfigureToolbar)
    * [~postConfigureToolbar(settings)](#module_rup_table/toolbar..postConfigureToolbar)

<a name="module_rup_table/toolbar..options"></a>

### rup_table/toolbar~options
Parámetros de configuración para el plugin toolbar.

**Kind**: inner property of <code>[rup_table/toolbar](#module_rup_table/toolbar)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | En caso de que se vaya a utilizar un identificador diferente al esperado por defecto, se deberá de indicar mediante esta propiedad. |
| createDefaultToolButtons | <code>boolean</code> |  | Determina (true/false) si se deben visualizar los botones correspondientes a las operaciones por defecto del componente. |
| showOperations | <code>boolean</code> | <code>true</code> | Permite indicar que operaciones definidas de manera global van a ser mostradas como botones |
| buttons | <code>object</code> |  | : Permite definir nuevos botones que se mostrarán en la toolbar. Los nuevos botones se especificarán del mismo modo que se describe en el componente rup_toolbar |

<a name="module_rup_table/toolbar..preConfigureToolbar"></a>

### rup_table/toolbar~preConfigureToolbar(settings)
Metodo que realiza la pre-configuración del plugin toolbar del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/toolbar](#module_rup_table/toolbar)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/toolbar..postConfigureToolbar"></a>

### rup_table/toolbar~postConfigureToolbar(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/toolbar](#module_rup_table/toolbar)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

