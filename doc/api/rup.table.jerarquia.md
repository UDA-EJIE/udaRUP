<a name="module_rup_table/jerarquia"></a>

## rup_table/jerarquia
El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.

**Summary**: Plugin de jerarquia del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["jerarquia"],       	jerarquia:{       		// Propiedades de configuración del plugin jerarquia       	}});
```

* [rup_table/jerarquia](#module_rup_table/jerarquia)
    * [~options](#module_rup_table/jerarquia..options)
    * [~preConfigurejerarquia(settings)](#module_rup_table/jerarquia..preConfigurejerarquia)
    * [~postConfigurejerarquia(settings)](#module_rup_table/jerarquia..postConfigurejerarquia)
    * [~reset()](#module_rup_table/jerarquia..reset)

<a name="module_rup_table/jerarquia..options"></a>

### rup_table/jerarquia~options
Parámetros de configuración para la jerarquía.

**Kind**: inner property of <code>[rup_table/jerarquia](#module_rup_table/jerarquia)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> | <code>&quot;/&quot;</code> | Carácter separador utilizado para concatenar diferentes identificadores de los registros mostrados en la jerarquía. |
| icons | <code>string</code> |  | plus: Icono para expandir el nodo.	minus: Icono para contraer el nodo. leaf: Icono correspondiente a un nodo hoja. filter: Icono para indicar que el nodo satisface los parámetros de filtrado |
| parentNodesTooltip | <code>boolean</code> |  | Determina si se debe de mostrar un tooltip para cada nodo, en el cual se representa la jerarquía que ocupa respecto a los padres. |
| parentNodesTooltipFnc | <code>function</code> |  | Función de callback que permite personalizar el tooltip a mostrar. |
| contextMenu | <code>boolean</code> |  | Determina si se muestra el menú contextual para cada nodo. |

<a name="module_rup_table/jerarquia..preConfigurejerarquia"></a>

### rup_table/jerarquia~preConfigurejerarquia(settings)
Metodo que realiza la pre-configuración del plugin jerarquia del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/jerarquia](#module_rup_table/jerarquia)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/jerarquia..postConfigurejerarquia"></a>

### rup_table/jerarquia~postConfigurejerarquia(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/jerarquia](#module_rup_table/jerarquia)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/jerarquia..reset"></a>

### rup_table/jerarquia~reset()
Colapsa los nodos que han sido expandidos.

**Kind**: inner method of <code>[rup_table/jerarquia](#module_rup_table/jerarquia)</code>  
**Example**  
```js
$("#idComponente").rup_table("reset");
```
