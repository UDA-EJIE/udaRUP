<a name="module_rup_jqtable/jerarquia"></a>

## rup_jqtable/jerarquia
El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.

**Summary**: Plugin de edición en línea del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["jerarquia"],	jerarquia:{		// Propiedades de configuración del plugin jerarquia	}});
```

* [rup_jqtable/jerarquia](#module_rup_jqtable/jerarquia)
    * [~options](#module_rup_jqtable/jerarquia..options)
    * [~preConfigurejerarquia(settings)](#module_rup_jqtable/jerarquia..preConfigurejerarquia)
    * [~postConfigurejerarquia(settings)](#module_rup_jqtable/jerarquia..postConfigurejerarquia)
    * [~reset()](#module_rup_jqtable/jerarquia..reset)

<a name="module_rup_jqtable/jerarquia..options"></a>

### rup_jqtable/jerarquia~options
Propiedades de configuración del plugin jerarquia del componente RUP Table.

**Kind**: inner property of [<code>rup_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [treedatatype] | <code>string</code> | <code>&quot;json&quot;</code> | Determina el tipo de dato empleado para obtener la representación jerárquica. |
| [token] | <code>string</code> |  | Carácter separador utilizado para concatenar diferentes identificadores de los registros mostrados en la jerarquía. (por defecto “/”). |
| [icons] | <code>object</code> |  | Estilos utilizados para cada uno de los elementos visuales de la jerarquía. |
| icons.plus | <code>object</code> |  | Icono para expandir el nodo. |
| icons.minus | <code>object</code> |  | Icono para contraer el nodo. |
| icons.leaf | <code>object</code> |  | Icono correspondiente a un nodo hoja. |
| icons.filter | <code>object</code> |  | Icono para indicar que el nodo satisface los parámetros de filtrado. |
| [parentNodesTooltip] | <code>boolean</code> | <code>true</code> | Determina si se debe de mostrar un tooltip para cada nodo, en el cual se representa la jerarquía que ocupa respecto a los padres. |
| [parentNodesTooltipFnc] | <code>function</code> | <code></code> | Función de callback que permite personalizar el tooltip a mostrar. |
| [contextMenu] | <code>boolean</code> | <code>true</code> | Determina si se muestra el menú contextual para cada nodo. |

<a name="module_rup_jqtable/jerarquia..preConfigurejerarquia"></a>

### rup_jqtable/jerarquia~preConfigurejerarquia(settings)
Metodo que realiza la pre-configuración del plugin jerarquia del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/jerarquia..postConfigurejerarquia"></a>

### rup_jqtable/jerarquia~postConfigurejerarquia(settings)
Metodo que realiza la post-configuración del plugin jerarquia del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/jerarquia..reset"></a>

### rup_jqtable/jerarquia~reset()
Colapsa los nodos que han sido expandidos.

**Kind**: inner method of [<code>rup_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  
**Example**  
```js
$("#idTable").rup_jqtable("reset");
```
