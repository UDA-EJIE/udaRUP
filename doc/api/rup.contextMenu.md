<a name="module_rup_contextMenu"></a>

## rup_contextMenu
Un menú contextual consta de un menú dentro de una interfaz gráfica que se muestra a partir de una interacción del usuario. El menú contextual muestra una serie de opciones disponibles en el contexto o estado actual de la aplicación.

**Summary**: Componente RUP ContextMenu.  
**Example**  
```js
var properties = { items : {      "edit": {name: "Edit", icon: "edit"},      "cut": {name: "Cut", icon: "cut"},      "copy": {name: "Copy", icon: "copy"},      "paste": {name: "Paste", icon: "paste"},      "delete": {name: "Delete", icon: "delete"},      "sep1": "---------",      "quit": {name: "Quit", icon: "quit"}  }};$('#contextMenu').rup_contextMenu(properties);
```

* [rup_contextMenu](#module_rup_contextMenu)
    * [~defaults](#module_rup_contextMenu..defaults)
    * [~show()](#module_rup_contextMenu..show)
    * [~enable()](#module_rup_contextMenu..enable)
    * [~disable()](#module_rup_contextMenu..disable)
    * [~destroy()](#module_rup_contextMenu..destroy)

<a name="module_rup_contextMenu..defaults"></a>

### rup_contextMenu~defaults
Propiedades de configuración del componente.

**Kind**: inner property of <code>[rup_contextMenu](#module_rup_contextMenu)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| items | <code>object</code> |  | Objeto que define los elementos que van a mostrarse en el menú contextual. En el siguiente apartado se explicará más en detalle como realizar esta definición. |
| appendTo | <code>string</code> |  | Selector de jQuery que identifica el elemento del DOM a partir del cual se va a añadir el menú contextual generado. |
| trigger | <code>string</code> |  | Determina el evento que va a lanzar la visualización del menú contextual. ("right","left", "hover", "none"). |
| reposition | <code>boolean</code> |  | Determina si un menú debe ser reposicionado (true) o reconstruido (false) en el caso de que el evento que lanza la visualización del menú contextual se ejecute por segunda vez. |
| delay | <code>number</code> | <code>200</code> | Determina el tiempo de retardo antes de mostrar el menú contextual. Solo se aplica sobre el evento “hover”. |
| autoHide | <code>boolean</code> | <code>false</code> | Indica si el menú contextual debe de ocultarse automáticamente cuando el cursor del ratón abandona la posición del menú contextual y el elemento que lo lanza. |
| zIndex | <code>number</code> | <code>1</code> | Especifica el desplazamiento de zIndex que se aplica al calculado. |
| className | <code>string</code> |  | Nombres de clases adicionales que se van a aplicar al menú contextual. |
| animation | <code>object</code> |  | Determina la animación que se va a aplicar a la hora de mostrar/ocultar el menúcontextual. La configuración es la misma que la que utiliza para realizar la de los métodos show y hide de jQuery. |
| events | <code>object</code> |  | Los eventos show y hide se ejecutan antes de el menú se muestre o se oculte. Mediante esta propiedad es posible indicar funciones de callback para ser ejecutadas en estos casos. Permiten devolver false para evitar continuar con el evento. |
| events.show | <code>[onShowEvent](#jQuery.rup_contextMenu..onShowEvent)</code> |  | Función a ejecutar antes de que se muestre el menú. |
| events.hide | <code>[onHideEvent](#jQuery.rup_contextMenu..onHideEvent)</code> |  | Función a ejecutar antes de que se oculte el menú. |
| position | <code>[position](#jQuery.rup_contextMenu..position)</code> |  | Función de callback que se ejecuta a partir de los eventos indicados en la propiedad trigger. |
| determinePosition | <code>string</code> |  | Determina la posición del menú contextual de acuerdo al elemento disparador. |
| callback | <code>[callback](#jQuery.rup_contextMenu..callback)</code> |  | Esta propiedad permite especificar una función de callback por defecto para aquellos ítems que no hayan especificado una función propia. |
| build | <code>[build](#jQuery.rup_contextMenu..build)</code> |  | Función de callback que devuelve el objeto de configuración del componente. En caso de especificar una función para la propiedad build la creación del menú no se realiza inicialmente sino que se demora hasta que se ejecuta el evento que lo muestra. |
| showCursor | <code>boolean</code> | <code>true</code> | Determina si se va a modificar el estilo del puntero del ratón al posicionarse sobre el elemento que dispone de menú contextual. El tipo de puntero se determina mediante la clase CSS context-menu-cursor. |
| msieCursorCss | <code>string</code> | <code>&quot;\&quot;url(\&quot;+$.rup.RUP+\&quot;/basic-theme/cursors/context-menu.cur),default\&quot;&quot;</code> | Esta propiedad se emplea para poder modificar la apariencia del cursor en Internet Explorer al posicionarse sobre un elemento que dispone de un menú contextual. Esto es debido a que el modo en el que hay que realizar la asignación del nuevo cursor no se puede realizar mediante un class |

<a name="module_rup_contextMenu..show"></a>

### rup_contextMenu~show()
Muestra el menú contextual.

**Kind**: inner method of <code>[rup_contextMenu](#module_rup_contextMenu)</code>  
**Example**  
```js
$("#contextMenu").rup_contextMenu("show");
```
<a name="module_rup_contextMenu..enable"></a>

### rup_contextMenu~enable()
Habilita el menú contextual. El menú se mostrará al lanzarse el evento asociado.

**Kind**: inner method of <code>[rup_contextMenu](#module_rup_contextMenu)</code>  
**Example**  
```js
$("#contextMenu").rup_contextMenu("enable");
```
<a name="module_rup_contextMenu..disable"></a>

### rup_contextMenu~disable()
Deshabilita el menú contextual. El menú no se mostrará aunque se lance el evento asociado.

**Kind**: inner method of <code>[rup_contextMenu](#module_rup_contextMenu)</code>  
**Example**  
```js
$("#contextMenu").rup_contextMenu("disable");
```
<a name="module_rup_contextMenu..destroy"></a>

### rup_contextMenu~destroy()
Elimina el menú contextual.

**Kind**: inner method of <code>[rup_contextMenu](#module_rup_contextMenu)</code>  
**Example**  
```js
$("#contextMenu").rup_contextMenu("destroy");
```
