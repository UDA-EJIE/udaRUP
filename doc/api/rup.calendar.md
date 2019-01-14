<a name="module_rup_calendar"></a>

## rup_calendar
Componente de calendario para la visualización de eventos sobre una interfaz dinámica y personalizable.

**Summary**: Componente RUP Calendar.  
**Example**  
```js
var properties = { day: 'now',	classes: {		months: {			inmonth: 'cal-day-inmonth',			outmonth: 'cal-day-outmonth',			saturday: 'cal-day-weekend',			sunday: 'cal-day-weekend',			holidays: 'cal-day-holiday',			today: 'cal-day-today'		},		week: {			workday: 'cal-day-workday',			saturday: 'cal-day-weekend',			sunday: 'cal-day-weekend',			holidays: 'cal-day-holiday',			today: 'cal-day-today'		} }, weekbox: true};$('#calendar').rup_calendar(properties);
```

* [rup_calendar](#module_rup_calendar)
    * [~getYear](#module_rup_calendar..getYear) ⇒ <code>number</code>
    * [~getMonth](#module_rup_calendar..getMonth) ⇒ <code>number</code>
    * [~getWeek](#module_rup_calendar..getWeek) ⇒ <code>number</code>
    * [~getDay](#module_rup_calendar..getDay) ⇒ <code>string</code>
    * [~defaults](#module_rup_calendar..defaults)
    * [~classes](#module_rup_calendar..classes)
    * [~views](#module_rup_calendar..views)
    * [~navigate(navigation)](#module_rup_calendar..navigate)
    * [~isToday()](#module_rup_calendar..isToday) ⇒ <code>boolean</code>
    * [~instance()](#module_rup_calendar..instance) ⇒ <code>object</code>
    * [~setView(viewmode)](#module_rup_calendar..setView)
    * [~getView()](#module_rup_calendar..getView) ⇒ <code>string</code>
    * [~getTitle()](#module_rup_calendar..getTitle) ⇒ <code>string</code>
    * [~getStartDate()](#module_rup_calendar..getStartDate) ⇒ <code>Date</code>
    * [~getEndDate()](#module_rup_calendar..getEndDate) ⇒ <code>Date</code>
    * [~option(opción, value)](#module_rup_calendar..option)
    * [~getEventsBetween(fechaDesde, fechaHasta)](#module_rup_calendar..getEventsBetween) ⇒ <code>Array</code>
    * [~showCell(fecha)](#module_rup_calendar..showCell) ⇒ <code>boolean</code>
    * [~hideCells()](#module_rup_calendar..hideCells)
    * [~refresh()](#module_rup_calendar..refresh)
    * [~destroy()](#module_rup_calendar..destroy)

<a name="module_rup_calendar..getYear"></a>

### rup_calendar~getYear ⇒ <code>number</code>
Obtiene el año del calendario

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>number</code> - el año del calendario  
**Example**  
```js
$('#calendar').rup_calendar('getYear');
```
<a name="module_rup_calendar..getMonth"></a>

### rup_calendar~getMonth ⇒ <code>number</code>
Obtiene el mes del calendario (1 - 12)

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>number</code> - el mes del calendario  
**Example**  
```js
$('#calendar').rup_calendar('getMonth');
```
<a name="module_rup_calendar..getWeek"></a>

### rup_calendar~getWeek ⇒ <code>number</code>
Obtiene la semana del calendario

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>number</code> - la semana del calendario  
**Example**  
```js
$('#calendar').rup_calendar('getWeek');
```
<a name="module_rup_calendar..getDay"></a>

### rup_calendar~getDay ⇒ <code>string</code>
Obtiene el día de la semana (Lunes - Domingo)

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>string</code> - el día de la semana  
**Example**  
```js
$('#calendar').rup_calendar('getDay');
```
<a name="module_rup_calendar..defaults"></a>

### rup_calendar~defaults
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| tooltip_container | <code>string</code> | Container al que se le añade el tooltip. |
| events_source | <code>string</code> \| <code>function</code> \| <code>object</code> | Origen de los eventos a añadir en el calendario. |
| width | <code>string</code> | Ancho que ocupara el calendario. |
| view | <code>string</code> | vista que se mostrara por defecto (year/month/week/day). |
| day | <code>string</code> | Punto de inicio del calendario. puede ser 'now' o una fecha en formato (yyyy-mm-dd). |
| time_start | <code>string</code> | La hora a la que empieza la vista de día. |
| time_end | <code>string</code> | La hora a la que acaba la vista de day. |
| time_split | <code>string</code> | Cada cuantos minutos se muestra un separador en la vista de día. |
| format12 | <code>boolean</code> | Especifica si se usa o no el formato de 12H en lugar del de 24H. |
| am_suffix | <code>string</code> | En el formato de 12H especifica el sufijo para la mañana (default: AM). |
| pm_suffix | <code>string</code> | En el formato de 12H especifica el sufijo para la tarde (default: PM). |
| tmpl_path | <code>string</code> | Path a la ubicación de las tempaltes de calendar (Debe terminar en '/'). |
| tmpl_cache | <code>boolean</code> | Indica si cachea o no las templates (default: true). |
| classes | <code>object</code> | Establece las clases para cada celda en funcion de la vista. |
| modal | <code>string</code> \| <code>null</code> | ID de la ventana modal. Si se establece las url en los eventos se abrirán en la modal. |
| modal_type | <code>string</code> | Modo en el que aparece el modal (iframe/ajax/template). |
| modal_title | <code>function</code> | Función para establecer el título del modal. Recibe el evento como parámetro. |
| views | <code>object</code> | configuración de las vistas. |
| merge_holidays | <code>boolean</code> | Añade al calendario algunas festividades como año nuevo o el día de la independencia americana. |
| display_week_numbers | <code>boolean</code> | Determina si se muestra el número de la semana. |
| weekbox | <code>boolean</code> | Determina si se muestra o no un div con el número de la semana en la vista de mes. |
| headers | <code>object</code> | Cabeceras para las llamadas ajax realizadas desde el calendario. |
| cell_navigation | <code>boolean</code> | Determina si se cambia la vista al día o mes haciendo doble click en la celda o click en el número de dia o nombre de mes. |
| date_range_start | <code>number</code> | Indica la fecha mínima (en milisegundos) del rango de operación permitido del calendario. Para retirar esta opcion mediante el método 'options' hay que pasar el valor null. |
| date_range_end | <code>number</code> | Indica la fecha máxima (en milisegundos) del rango de operación permitido del calendario. Para retirar esta opcion mediante el método 'options' hay que padar el valor null. |
| onAfterEventsLoad | <code>function</code> | Callback que se ejecuta tras cargar los eventos (Recibe los eventos como parámetros). |
| onBeforeEventsLoad | <code>function</code> | Callback que se ejecuta antes de cargar los eventos. |
| onAfterViewLoad | <code>function</code> | Callback que se ejecuta tras cargar una nueva vista (Recibe la vista como parámetro). |
| onAfterModalShow | <code>function</code> | Callback que se ejecuta tras mostrar el modal (Recibe los eventos como parámetros). |
| onAfterModalHidden | <code>function</code> | Callback que se ejecuta tras esconder el modal.(Recibe los eventos como parámetros). |

<a name="module_rup_calendar..classes"></a>

### rup_calendar~classes
Propiedades del objeto 'classes'

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| classes.month | <code>object</code> | Establece las clases en la vista de mes. |
| classes.month.inmonth | <code>string</code> | Establece las clases para las celdas que representan días del mes actual. |
| classes.month.outmonth | <code>string</code> | Establece las clases para las celdas que representan días ajenos al mes actual. |
| classes.month.saturday | <code>string</code> | Establece las clases para las celdas que representan los sábados. |
| classes.month.sunday | <code>string</code> | Establece las clases para las celdas que representan los domingos. |
| classes.month.holidays | <code>string</code> | Establece las clases para las celdas que representan los festivos. |
| classes.month.today | <code>string</code> | Establece las clases para la celda que representan el día actual. |
| classes.week | <code>object</code> | Establece las clases en la vista de semana. |
| classes.week.workday | <code>string</code> | Establece las clases para las celdas que representan días entre semana. |
| classes.week.saturday | <code>string</code> | Establece las clases para las celdas que representan los sábados. |
| classes.week.sunday | <code>string</code> | Establece las clases para las celdas que representan los domingos. |
| classes.week.holidays | <code>string</code> | Establece las clases para las celdas que representan los festivos. |
| classes.week.today | <code>string</code> | Establece las clases para la celda que representan el día actual. |

<a name="module_rup_calendar..views"></a>

### rup_calendar~views
Propiedades del objeto 'views'

**Kind**: inner property of [<code>rup_calendar</code>](#module_rup_calendar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| views.year | <code>object</code> | Establece las opciones para la vista anual. |
| views.year.slide_events | <code>integer</code> | Si el valor es 1 permite desplegar los eventos desde las celdas. |
| views.year.enable | <code>integer</code> | Si el valor es 1 habilita la vista. |
| views.month | <code>object</code> | Establece las opciones para la vista mensual. |
| views.month.slide_events | <code>integer</code> | Si el valor es 1 permite desplegar los eventos desde las celdas. |
| views.month.enable | <code>integer</code> | Si el valor es 1 habilita la vista. |
| views.week | <code>object</code> | Establece las opciones para la vista semanal. |
| views.week.enable | <code>integer</code> | Si el valor es 1 habilita la vista. |
| views.day | <code>object</code> | Establece las opciones para la vista diaria. |
| views.day.enable | <code>integer</code> | Si el valor es 1 habilita la vista. |

<a name="module_rup_calendar..navigate"></a>

### rup_calendar~navigate(navigation)
Navega en el calendario al punto especificado

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  

| Param | Type | Description |
| --- | --- | --- |
| navigation | <code>string</code> \| <code>Date</code> | Hacia dónde navegar |

**Example**  
```js
$("#calendar").rup_calendar('navigate','next');
```
<a name="module_rup_calendar..isToday"></a>

### rup_calendar~isToday() ⇒ <code>boolean</code>
Confirma si en la vista está el día actual.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>boolean</code> - true si el dia actual está en la vista. false en caso contrario  
**Example**  
```js
$("#calendar").rup_calendar('isToday');
```
<a name="module_rup_calendar..instance"></a>

### rup_calendar~instance() ⇒ <code>object</code>
Devuelve la instancia del subyacente bootstrap-calendar

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>object</code> - instancia del calendar subyacente  
**Example**  
```js
$("#calendar").rup_calendar('instance');
```
<a name="module_rup_calendar..setView"></a>

### rup_calendar~setView(viewmode)
Oculta el menú contextual.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  

| Param | Type | Description |
| --- | --- | --- |
| viewmode | <code>string</code> | El modo de visualizacion a establecer |

**Example**  
```js
$("#calendar").rup_calendar('setView','day');
```
<a name="module_rup_calendar..getView"></a>

### rup_calendar~getView() ⇒ <code>string</code>
Obtiene el modo de visualización actual.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>string</code> - modo de visualización  
**Example**  
```js
$('#calendar').rup_calendar('getView');
```
<a name="module_rup_calendar..getTitle"></a>

### rup_calendar~getTitle() ⇒ <code>string</code>
Obtiene el título de la vista de calendario.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>string</code> - título de la vista  
**Example**  
```js
$("#calendar").rup_calendar("getTitle");
```
<a name="module_rup_calendar..getStartDate"></a>

### rup_calendar~getStartDate() ⇒ <code>Date</code>
Obtiene la fecha desde la que se muestra el calendario

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>Date</code> - fecha  
**Example**  
```js
$("#calendar").rup_calendar("getStartDate");
```
<a name="module_rup_calendar..getEndDate"></a>

### rup_calendar~getEndDate() ⇒ <code>Date</code>
Obtiene la fecha hasta la que se muestra el calendario

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>Date</code> - fecha  
**Example**  
```js
$("#calendar").rup_calendar("getEndDate");
```
<a name="module_rup_calendar..option"></a>

### rup_calendar~option(opción, value)
Método que establece y recarga las opciones

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  

| Param | Type | Description |
| --- | --- | --- |
| opción | <code>string</code> \| <code>object</code> | Opcion a consultar/establecer u objeto para establecer las propiedades |
| value | <code>any</code> | Si el primer parametro asigna este valor a la opción especificada |

**Example**  
```js
$('#calendar').rup_calendar('weekbox', true);$('#calendar').rup_calendar({weekbox:true, view:'month'});
```
<a name="module_rup_calendar..getEventsBetween"></a>

### rup_calendar~getEventsBetween(fechaDesde, fechaHasta) ⇒ <code>Array</code>
Devuelve un listado de eventos entre las dos fechas introducidas

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>Array</code> - listado de Eventos entre las fechas  

| Param | Type |
| --- | --- |
| fechaDesde | <code>Date</code> | 
| fechaHasta | <code>Date</code> | 

<a name="module_rup_calendar..showCell"></a>

### rup_calendar~showCell(fecha) ⇒ <code>boolean</code>
Muestra los eventos de la casilla con la fecha especificada.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Returns**: <code>boolean</code> - true si había eventos. false en caso contrario.  

| Param | Type | Description |
| --- | --- | --- |
| fecha | <code>Date</code> | fecha a consultar |

**Example**  
```js
$('#calendar').rup_calendar('showCell');
```
<a name="module_rup_calendar..hideCells"></a>

### rup_calendar~hideCells()
Oculta el div con los eventos si está desplegado

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Example**  
```js
$('#calendar').rup_calendar('hideCells');
```
<a name="module_rup_calendar..refresh"></a>

### rup_calendar~refresh()
Recarga los eventos y aplica las opciones cambiadas

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Example**  
```js
$('#calendar').rup_calendar('refresh');
```
<a name="module_rup_calendar..destroy"></a>

### rup_calendar~destroy()
Elimina el calendario y retorna a la estructura HTML anterior a la creación del calendario.

**Kind**: inner method of [<code>rup_calendar</code>](#module_rup_calendar)  
**Example**  
```js
$("#contextMenu").rup_calendar("destroy");
```
