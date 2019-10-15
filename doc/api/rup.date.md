<a name="module_rup_date"></a>

## rup_date
Permite al usuario introducir y seleccionar una fecha, tanto de forma manual como visual, moviéndose fácilmente por días, meses y años. Además, para minimizar las posibilidades de introducir una fecha incorrecta, ofrece al usuario ayudas y sugerencias de formato. <br/><br/> Además, este sistema permite la introducción de fechas independiente de dispositivo y flexible, ya que tanto los usuarios avanzados como los novatos podrán utilizarlo sin problemas.

**Summary**: Componente RUP Date.  
**See**: El componente está basado en el plugin [jQuery UI DatePicker](http://jqueryui.com/datepicker/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/datepicker/).  
**Example**  
```js
// Ejemplo de selector de fecha simple.$("#fecha").rup_date({	labelMaskId : "fecha-mask",	showButtonPanel : true,	showOtherMonths : true,	noWeekend : true});// Ejemplo de selector de fecha simple que permite seleccionar tres fechas.$("#fecha_multi").rup_date({	multiSelect: 3,	labelMaskId : "fecha_multi-mask",	buttonImage : "/rup/css/images/exclamation.png"});// Ejemplo de selectores de fecha desde y hasta$.rup_date({	from: "desde",	to: "hasta",	//Resto igual que en date	labelMaskId : "intervalo-mask",	numberOfMonths: 3});
```

* [rup_date](#module_rup_date)
    * _instance_
        * ["create"](#module_rup_date+event_create)
        * ["beforeShow"](#module_rup_date+event_beforeShow)
        * ["onChangeMonthYear"](#module_rup_date+event_onChangeMonthYear)
        * ["onSelect"](#module_rup_date+event_onSelect)
        * ["onClose"](#module_rup_date+event_onClose)
    * _inner_
        * [~options](#module_rup_date..options)
        * [~getRupValue()](#module_rup_date..getRupValue) ⇒ <code>string</code> \| <code>array</code>
        * [~setRupValue(param)](#module_rup_date..setRupValue)
        * [~destroy()](#module_rup_date..destroy)
        * [~disable()](#module_rup_date..disable)
        * [~enable()](#module_rup_date..enable)
        * [~isDisabled()](#module_rup_date..isDisabled) ⇒ <code>boolean</code>
        * [~hide()](#module_rup_date..hide)
        * [~show()](#module_rup_date..show)
        * [~getDate()](#module_rup_date..getDate) ⇒ <code>date</code>
        * [~setDate()](#module_rup_date..setDate)
        * [~refresh()](#module_rup_date..refresh)
        * [~option(optionName, [value])](#module_rup_date..option)

<a name="module_rup_date+event_create"></a>

### "create"
Función que se lanza cuando se crea el calendario. La invocación es automática por parte del componente

**Kind**: event emitted by [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$(selector).rup_date({ create: function(){...} });
```
<a name="module_rup_date+event_beforeShow"></a>

### "beforeShow"
Permite asociar una función que se ejecutará antes de que se muestre el calendario. Los parámetros recibidos son el campo del calendario y la instancia del componente.

**Kind**: event emitted by [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$(selector).rup_date({ beforeShow: function(input, inst){...} });
```
<a name="module_rup_date+event_onChangeMonthYear"></a>

### "onChangeMonthYear"
Permite asociar una función que se ejecutará cuando se cambie de mes o de año en el calendario. Los parámetros recibidos son el año y mes seleccionados así como la instancia del componente

**Kind**: event emitted by [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$(selector).rup_date({onChangeMonthYear: function(y,m,inst){...} });
```
<a name="module_rup_date+event_onSelect"></a>

### "onSelect"
Permite asociar una función que se ejecutará cuando se seleccione un valor del calendario. Los parámetros recibidos son la fecha seleccionada (texto) y la instancia del componente.

**Kind**: event emitted by [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$(selector).rup_date({ onSelect: function(dateText, inst){...} });
```
<a name="module_rup_date+event_onClose"></a>

### "onClose"
Permite asociar una función que se ejecutará cuando se oculte el calendario. Los parámetros recibidos son la fecha seleccionada (texto) y la instancia del componente.

**Kind**: event emitted by [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$(selector).rup_date({ onClose: function(dateText, inst){...} });
```
<a name="module_rup_date..options"></a>

### rup_date~options
A continuación se muestran los posibles parámetros de configuración que recibe el componente.

**Kind**: inner property of [<code>rup_date</code>](#module_rup_date)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [datetimepicker] | <code>boolean</code> | <code>false</code> | Indica si el componente permite introducir la hora además de la fecha |
| [disabled] | <code>boolean</code> | <code>false</code> | Indica si el componente debe aparecer deshabilitado o no. |
| altField | <code>string</code> |  | Identificador de un campo adicional para que muestre la fecha en otro formato. |
| altFormat | <code>string</code> |  | Formato que debe seguir la fecha en el campo adicional |
| appendText | <code>string</code> |  | Texto que se puede añadir detrás de cada campo de fecha. Se recomienda el uso del atributo “labelMaskId” que se detalla a continuación en lugar de este atributo. |
| labelMaskId | <code>string</code> |  | Identificador del label que contendrá la máscara que indica el formato de la fecha. |
| mask | <code>string</code> |  | Texto empleado para la máscara de la fecha. Su valor por defecto se obtiene del fichero de idioma. |
| [autoSize] | <code>boolean</code> | <code>false</code> | Booleano que indica si el campo para la fecha se tiene que redimensionar automáticamente para adaptares al texto introducido |
| buttonImage | <code>string</code> |  | Ruta a la imagen que se muestra junto al campo de la fecha y que sirve para desplegar el calendario pulsando sobre ella. Por defecto se muestra una imagen incluida en los ficheros de RUP. |
| buttonText | <code>string</code> |  | Texto alternativo de la imagen que se muestra junto al campo de la fecha. Su valor por defecto se obtiene del fichero de idioma. |
| [changeMonth] | <code>boolean</code> | <code>true</code> | Indica si se muestra un combo que en la cabecera que facilita el cambio de mes |
| [changeYear] | <code>boolean</code> | <code>true</code> | indica si se muestra un combo que en la cabecera que facilita el cambio de año |
| [closeText] | <code>string</code> |  | Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para cerrar el calendario. Su valor por defecto se obtiene del fichero de idioma. |
| currentText | <code>string</code> |  | Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para seleccionar la fecha actual en el calendario. Su valor por defecto se obtiene del fichero de idioma. |
| dateFormat | <code>string</code> |  | Formato de la fecha a introducir (ej: dd/mm/yy para 20/01/2011). Su valor por defecto se obtiene del fichero de idioma. |
| dayNames | <code>array</code> |  | Literales para los días [array]. Su valor por defecto se obtiene del fichero de idioma. |
| dayNamesMin | <code>array</code> |  | Literales para los días (mínimos) [array]. Su valor por defecto se obtiene del fichero de idioma. |
| dayNamesShort | <code>array</code> |  | Literales para los días (corto) [array]. Su valor por defecto se obtiene del fichero de idioma. |
| defaultDate | <code>date</code> \| <code>string</code> \| <code>number</code> |  | fecha que se muestra por defecto destacada cuando se abre el calendario y no hay ninguna fecha escrita. El tipo de parámetro puede ser Date, String o Number (ver la explicación al final de este apartado). Por defecto se destaca la fecha del día. |
| [duration] | <code>string</code> \| <code>number</code> | <code>&quot;normal&quot;</code> | Velocidad a la que aparece el calendario en pantalla (animación). Sus posibles valores son: ‘slow’, ‘normal’ y ‘fast’ o un valor numérico (milisegundos). |
| firstDay | <code>number</code> |  | Número que indica en qué día de la semana debe empezar el calendario. El valor 0 equivale al domingo, el 1 al lunes y así sucesivamente. |
| [hideIfNoPrevNext] | <code>boolean</code> | <code>false</code> | Oculta los enlaces de siguiente/anterior mes cuando no se puede navegar. En caso contrario, los enlaces se deshabilitan |
| maxDate | <code>date</code> \| <code>string</code> \| <code>number</code> |  | Fecha máxima que se puede seleccionar (límite superior). Por defecto no hay límite. |
| minDate | <code>date</code> \| <code>string</code> \| <code>number</code> |  | Fecha mínima que se puede seleccionar (límite inferior). Por defecto no hay límite. |
| monthNames | <code>array</code> |  | Literales para los meses [array]. Su valor por defecto se obtiene del fichero de idioma. |
| monthNamesShort | <code>array</code> |  | Literales para los meses (corto) [array]. Su valor por defecto se obtiene del fichero de idioma. |
| nextText | <code>string</code> |  | Literal a mostrar en el enlace de siguiente. Su valor por defecto se obtiene del fichero de idioma. |
| [numberOfMonths] | <code>number</code> \| <code>array</code> | <code>1</code> | Puede definirse como un numérico (ej. 2) o como un array indicando filas y columnas (ej. [2, 3]). |
| prevText | <code>string</code> |  | Literal a mostrar en el enlace de anterior. Su valor por defecto se obtiene del fichero de idioma. |
| [selectOtherMonths] | <code>boolean</code> | <code>false</code> | Permite seleccionar los días del meses anterior/posterior del que se muesta. Requiere que estén activos dichos días mediante el parámetro showOtherMonths |
| [showAnim] | <code>string</code> | <code>&quot;show&quot;</code> | Indica el tipo de animación que se emplea para mostrar el calendario en pantalla. |
| [showButtonPanel] | <code>boolean</code> | <code>false</code> | Indica si se muestran los botones de la parte inferior (hoy y cerrar). |
| [showCurrentAtPos] | <code>number</code> | <code>0</code> | Cuando se muestra más de un mes, indica la posición que ocupa el mes actual. |
| showMonthAfterYear | <code>boolean</code> |  | Intercambia la posición del mes y del año en la cabecera del calendario. |
| showOptions | <code>object</code> |  | Objeto que determina las propiedades de la animación del calendario. Para más información ver la siguiente  [página](http://api.jqueryui.com/datepicker/#option-showAnim) . |
| [showWeek] | <code>boolean</code> | <code>false</code> | Indica si se debe mostrar el número de semana. |
| stepMonths | <code>number</code> |  | Indica el número de meses que se avanzan al pulsar los enlaces anterior/siguiente. |
| weekHeader | <code>string</code> |  | Literal que aparece sobre los números de semana. Su valor por defecto se obtiene del fichero de idioma. |
| yearRange | <code>string</code> |  | Determina el rango de años a mostrar en el combo de la cabecera del calendario. No implica que sea el límite de años a seleccionar. Se debe definir como un literal que indique el inicio y el fin separado por dos puntos ej. 2001:2011. Puede usarse el la letra c como valor actual restándole y sumándole un numérico ej. c-10:c+10. Su valor por defecto es c-10:c+10 |
| yearSuffix | <code>string</code> |  | Texto adicional a mostrar en la cabecera del calendario junto al año. |
| [noWeekend] | <code>booelan</code> | <code>false</code> | Indica si se muestran o no los días del fin de semana (sábado y domingo). |
| from | <code>string</code> |  | Indica el selector del campo inicial en los intervalos de fechas |
| to | <code>string</code> |  | Indica el selector del campo final en los intervalos de fechas |
| multiselect | <code>array</code> \| <code>number</code> |  | Atributo que indica si se permite la multiselección de fechas y el modo en el que se aplica. |
| [autoFillToField] | <code>boolean</code> | <code>true</code> | Atributo que indica si se auto rellena el campo hasta |
| [autoFillFromField] | <code>boolean</code> | <code>true</code> | Atributo que indica si se auto rellena el campo desde |

<a name="module_rup_date..getRupValue"></a>

### rup_date~getRupValue() ⇒ <code>string</code> \| <code>array</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor del componente fecha.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Returns**: <code>string</code> \| <code>array</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$("#idDate").rup_date("getRupValue");
```
<a name="module_rup_date..setRupValue"></a>

### rup_date~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor al componente fecha.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>array</code> | Valor que se va a asignar al componente. En caso de tratarse  de uan configuración en la que se permite seleccionar varias fechas se indicará mediante un array. |

**Example**  
```js
// Fecha simple$("#idDate").rup_date("setRupValue", "21/06/2015");// Varias fechas$("#idDate").rup_date("setRupValue", ["21/06/2015", "22/06/2015"]);
```
<a name="module_rup_date..destroy"></a>

### rup_date~destroy()
Elimina el componente de la pantalla. En caso de tener máscara también se restaura el label con un texto vacío

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("destroy");
```
<a name="module_rup_date..disable"></a>

### rup_date~disable()
Deshabilita el componente en pantalla no pudiendo introducirse ninguna fecha ni se despliega el calendario.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("disable");
```
<a name="module_rup_date..enable"></a>

### rup_date~enable()
Habilita el componente permitiendo introducir la fecha tanto mediante teclado como mediante el desplegable del calendario

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("enable");
```
<a name="module_rup_date..isDisabled"></a>

### rup_date~isDisabled() ⇒ <code>boolean</code>
Indica si el componente se encuentra deshabilitado o no.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Returns**: <code>boolean</code> - - Devuelve si el componente está deshabilitado o no.  
**Example**  
```js
$("#idDate").rup_date("isDisabled");
```
<a name="module_rup_date..hide"></a>

### rup_date~hide()
Oculta el calendario para seleccionar una fecha.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("hide");
```
<a name="module_rup_date..show"></a>

### rup_date~show()
Muestra el calendario para seleccionar una fecha.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("show");
```
<a name="module_rup_date..getDate"></a>

### rup_date~getDate() ⇒ <code>date</code>
Devuelve la fecha seleccionada, si no se ha seleccionado nada devuelve vacío.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Returns**: <code>date</code> - - Fecha seleccionada.  
**Example**  
```js
$("#idDate").rup_date("getDate");
```
<a name="module_rup_date..setDate"></a>

### rup_date~setDate()
Establece la fecha del componente. El parámetro debe ser un objeto date.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  

| Type | Description |
| --- | --- |
| <code>date</code> | Fecha que se desea asignar. |

**Example**  
```js
$("#idDate").rup_date("setDate", new Date());
```
<a name="module_rup_date..refresh"></a>

### rup_date~refresh()
Refresca el calendario desplegado por si ha habido algún cambio.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  
**Example**  
```js
$("#idDate").rup_date("refresh");
```
<a name="module_rup_date..option"></a>

### rup_date~option(optionName, [value])
Permite consultar y modificar la configuración del componente.

**Kind**: inner method of [<code>rup_date</code>](#module_rup_date)  

| Param | Type | Description |
| --- | --- | --- |
| optionName | <code>string</code> \| <code>object</code> | Nombre de la propiedad que se desea gestionar o objeto de  compuesto de varias propiedades. |
| [value] |  | Corresponde al valor de la propiedad en caso de haberse especificado el nombre  de la misma en el primér parámetro. |

**Example**  
```js
// Consultar una propiedad$("#idCombo").rup_date("option", "multiselect");// Establecer una propiedad$("#idCombo").rup_date("option", "multiselect", 2);// Establecer varias propiedad$("#idCombo").rup_date("option", {datetimepicker:true, multiselect:3});
```
