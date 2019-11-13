<a name="module_rup_breadCrumb"></a>

## rup\_breadCrumb
El componente de migas muestra a los usuarios la ruta de navegación que ha seguido por la aplicación permitiéndoles volver hacia niveles superiores hasta la página de inicio.

**Summary**: Componente RUP BeadCrumb.  
**Example**  
```js
var properties = {  logOutUrl: "/x21aAppWar/logout",  breadCrumb: {      "patrones" : {          // Literal		    "i18nCaption" : "patrones",		    "tabsMixto" : {"i18nCaption":"tabsMixto"},		    "grid" : { "i18nCaption" : "grid" },		    // Submenu		    "subLevel":[			   {"i18nCaption":"all", "url": "/x21aAppWar/patrones/all" },			   {"i18nCaption":"accordion", "url": "/x21aAppWar/patrones/accordion" }		    ]	     },	     "experimental" : {		    // Literal		    "i18nCaption" : "experimental",		    "maestro_detalle" : { "i18nCaption" : "maestro_detalle" },		    "mant_multi_entidad": { "i18nCaption" : "mant_multi_entidad" },"       }	}};jQuery("#x21aAppWar_migas").rup_breadCrumb(properties);
```

* [rup_breadCrumb](#module_rup_breadCrumb)
    * [~options](#module_rup_breadCrumb..options)
    * [~destroy()](#module_rup_breadCrumb..destroy)
    * [~breadCrumb](#module_rup_breadCrumb..breadCrumb)
    * [~sublevel](#module_rup_breadCrumb..sublevel)

<a name="module_rup_breadCrumb..options"></a>

### rup_breadCrumb~options
Opciones por defecto de configuración del widget.

**Kind**: inner property of [<code>rup\_breadCrumb</code>](#module_rup_breadCrumb)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showSpeed] | <code>string</code> | <code>&quot;fast&quot;</code> | Propiedad que indica la velocidad de despliegue del subnivel en milisegundos o en términos de jQuery (posibles valores: “normal”,”slow”).. |
| [hideSpeed] | <code>string</code> | <code>&quot;&#x27;&#x27;&quot;</code> | Propiedad que indica la velocidad de colapso del subnivel en milisegundos o en términos de jQuery (posibles valores: “normal”,”slow”).. |
| [collapsible] | <code>boolean</code> | <code>false</code> | Propiedad que indica si el primer nivel es plegable. |
| [collapsedWidth] | <code>Number</code> | <code>10</code> | Propiedad de indica el tamaño del texto cuando está colapsado (en pixeles). |
| breadCrumb | [<code>breadCrumb</code>](#module_rup_breadCrumb..breadCrumb) |  | La estructura de las migas se define mediante un array en notación json cuyo nombre será el mismo que el identificador del elemento sobre el que se aplica el componente. |
| [initURL] | <code>string</code> |  | Define la ruta a seguir cuando se pulse sobre el primer elemento (ej. “Inicio”). Tomará como valor la ruta del contexto (contextPath) y le concatenará el literal indicado. El literal se definirá sin barra ‘/’ inicial. |
| [i18nId] | <code>string</code> |  | Indica el identificador del objeto JSON para la resolución de los literales del componente. En caso de no definirse se tomará el ID del objeto sobre el que se crea el componente. |

<a name="module_rup_breadCrumb..destroy"></a>

### rup_breadCrumb~destroy()
Elimina los componenes visuales generados para el widget así como las estructuras internas.

**Kind**: inner method of [<code>rup\_breadCrumb</code>](#module_rup_breadCrumb)  
**Example**  
```js
// Elimina el feedbackjQuery("#breadCrumb").rup_breadCrumb("destroy");
```
<a name="module_rup_breadCrumb..breadCrumb"></a>

### rup_breadCrumb~breadCrumb
Configuración de la estructura de las migas

**Kind**: inner typedef of [<code>rup\_breadCrumb</code>](#module_rup_breadCrumb)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [i18nCaption] | <code>string</code> | Texto que se mostrará como miga. Obtenido del fichero de literales de la aplicación. |
| [literal] | <code>string</code> | Submiga (mapeada mediante la URL). Internamente tendrá una estructura definida con los atributos i18nCaption, literales (submigas) y sublevel. |
| [sublevel] | [<code>sublevel</code>](#module_rup_breadCrumb..sublevel) | Define un submenú para la miga a la que se asocia. |

<a name="module_rup_breadCrumb..sublevel"></a>

### rup_breadCrumb~sublevel
Define un submenú para la miga a la que se asocia.

**Kind**: inner typedef of [<code>rup\_breadCrumb</code>](#module_rup_breadCrumb)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [i18nCaption] | <code>string</code> | Texto que se mostrará como elemento del menú obtenido del fichero de literales de la aplicación. |
| [url] | <code>string</code> | Define la ruta a seguir cuando se pulse sobre el elemento. |

