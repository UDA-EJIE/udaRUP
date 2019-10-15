<a name="module_rup_menu"></a>

## rup_menu
Menú de la aplicación mantenido a lo largo de todas las páginas de forma consistente que muestra entradas directas a secciones clave de la aplicación.

**Summary**: Componente RUP Menu.  
**Example**  
```js
var properties={  // Propiedades de configuración};$("#idMenu").rup_menu(properties);
```

* [rup_menu](#module_rup_menu)
    * [~defaults](#module_rup_menu..defaults)
    * [~disable(entryMenuId)](#module_rup_menu..disable)
    * [~enable(entryMenuId)](#module_rup_menu..enable)

<a name="module_rup_menu..defaults"></a>

### rup_menu~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup_menu</code>](#module_rup_menu)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [verticalWidth] | <code>string</code> |  | Valor asociado a cada menú que determinara la anchura vertical del mismo. Este parámetro tiene cabida, tanto, en menús verticales, como, en menús horizontales (al fin y al cabo los dos tienen partes verticales). En caso de no especificar ningún valor, cada uno de los submenús verticales se ajustara al ancho máximo de sus literales. |
| [display] | <code>string</code> | <code>&quot;horizontal&quot;</code> | Orientación del menú: horizontal o vertical. |
| [i18nId] | <code>string</code> |  | Indica el identificador del objeto JSON para la resolución de los literales del componente. En caso de no definirse se tomará el ID del objeto sobre el que se crea el componente. |
| [menus] | <code>string</code> | <code>&quot;ul&quot;</code> | Parámetro que determina el tag de html que hará de padre para determinar las entradas del menú (tanto para las entradas normales como para las de los submenús). |
| [forceAbs] | <code>boolean</code> | <code>false</code> | Parámetro de configuración que activa el uso de la función relToAbsUrl. Dicha función hace que todas las llamadas relativas se transformen a absolutas. El uso de este parámetro responde a situaciones en el que el navegador, por diferentes cuestiones funcionales, no gestiona bien las urls relativas (se tratan todas las urls relativas como urls absolutas para evitar el posible problema. Por ejemplo: problemas con portales). Este parámetro se puede aplicar tanto a nivel de entrada como a nivel general del menú. |
| [menu] | <code>object</code> |  | Estructura del menú se define mediante un array en notación JSON cuyo nombre será el mismo que el identificador del elemento sobre el que se aplica el componente. No se limita el número de submenús. Por coherencia se ha decidido que los elementos que contengan submenús no serán enlaces y viceversa. |
| menu.i18nCaption | <code>string</code> |  | Define la ruta (url) a seguir cuando se pulse sobre el elemento, en caso de no tener submenú. La especificación de las rutas (urls), se puede hacer de forma relativa o de forma absoluta. (véase el capítulo 11. Formato de las urls). |
| menu.submenu | <code>object</code> |  | Define una estructura JSON submenú. |
| [menu.newWindow] | <code>boolean</code> | <code>false</code> | Si el valor es true, el enlace del menú se abrirá en una nueva ventana del navegador, en caso contrario (false), se aplicará sobre la ventana que alberga el menu. Todas las entradas de este tipo, serán indicadas mediante el icono “external link”. |
| [menu.divider] | <code>boolean</code> | <code>false</code> | Parámetro encargado de indicar si la entrada del menú es un elemento de división o un objeto del menú. Cuando el valor de “divider” sea true, la entrada en cuestión, es un divisor. Existen dos tipos de divisores que se diferencian en la presencia del parámetro "i18nCaption". En caso de no tenerlo, el divisor es únicamente una línea divisora de entradas. En caso contrario, el divisor es una cabecera. En ambos casos, el resto de parámetros no tienen importancia y no serán tomados en cuanta a la hora de componer el menú. Su valor por defecto es false. |
| menu.disabled | <code>boolean</code> |  | Determina si la entrada del menú esta habilitada o deshabilitada. El valor por defecto del campo es false. Dicho estado puede ser variado mediante las funciones enable y disable del componente. |
| menu.icon | <code>string</code> |  | Especifica el class que tiene asociado el icono que regirá la entrada de menú. |

<a name="module_rup_menu..disable"></a>

### rup_menu~disable(entryMenuId)
Deshabilita una opción de menú.

**Kind**: inner method of [<code>rup_menu</code>](#module_rup_menu)  

| Param | Type | Description |
| --- | --- | --- |
| entryMenuId | <code>string</code> | Identificador de la opción de menú que se desea deshabilitar. |

**Example**  
```js
$("#idlanguage").rup_menu("disable","opAdmin);
```
<a name="module_rup_menu..enable"></a>

### rup_menu~enable(entryMenuId)
Habilita una opción de menú.

**Kind**: inner method of [<code>rup_menu</code>](#module_rup_menu)  

| Param | Type | Description |
| --- | --- | --- |
| entryMenuId | <code>string</code> | Identificador de la opción de menú que se desea habilitar. |

**Example**  
```js
$("#idlanguage").rup_menu("enable","opAdmin);
```
