<a name="module_rup_time"></a>

## rup\_time
El usuario puede introducir y seleccionar una hora tanto de forma manual como visual, moviéndose fácilmente por las horas y los minutos, recibiendo ayudas y sugerencias para minimizar las posibilidades de introducir una hora incorrecta.

**Summary**: Componente RUP Time.  
**Example**  
```js
var properties = {  labelMaskId : "hora-mask",  showSecond : true,  timeFormat: 'hh:mm:ss',  showButtonPanel: true};$("#idTime").rup_time(properties);
```

* [rup_time](#module_rup_time)
    * [~getRupValue()](#module_rup_time..getRupValue) ⇒ <code>string</code>
    * [~setRupValue(param)](#module_rup_time..setRupValue)
    * [~destroy()](#module_rup_time..destroy)
    * [~disable()](#module_rup_time..disable)
    * [~enable()](#module_rup_time..enable)
    * [~isDisabled()](#module_rup_time..isDisabled) ⇒ <code>boolean</code>
    * [~hide()](#module_rup_time..hide)
    * [~show()](#module_rup_time..show)
    * [~getTime()](#module_rup_time..getTime) ⇒ <code>string</code>
    * [~setTime()](#module_rup_time..setTime) ⇒ <code>date</code>
    * [~refresh()](#module_rup_time..refresh)
    * [~option(optionName, [value])](#module_rup_time..option)

<a name="module_rup_time..getRupValue"></a>

### rup_time~getRupValue() ⇒ <code>string</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Returns**: <code>string</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$("#idTime").rup_time("getRupValue");
```
<a name="module_rup_time..setRupValue"></a>

### rup_time~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> | Valor que se va a asignar al componente. En caso de tratarse de uan configuración en la que se permite seleccionar varias fechas se indicará mediante un array. |

**Example**  
```js
$("#idTime").rup_time("setRupValue", "10:25:16");
```
<a name="module_rup_time..destroy"></a>

### rup_time~destroy()
Elimina el componente de la pantalla. En caso de tener máscara también se restaura el label con un texto vacío.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("destroy");
```
<a name="module_rup_time..disable"></a>

### rup_time~disable()
Deshabilita el componente en pantalla no pudiendo introducirse ninguna hora ni se despliega el calendario.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("disable");
```
<a name="module_rup_time..enable"></a>

### rup_time~enable()
Habilita el componente permitiendo introducir la hora tanto mediante teclado como mediante el desplegable.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("enable");
```
<a name="module_rup_time..isDisabled"></a>

### rup_time~isDisabled() ⇒ <code>boolean</code>
Indica si el componente se encuentra deshabilitado o no.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Returns**: <code>boolean</code> - - Determina si el componente está deshabilitado o no.  
**Example**  
```js
$("#idTime").rup_time("isDisabled");
```
<a name="module_rup_time..hide"></a>

### rup_time~hide()
Oculta el desplegable para seleccionar una hora.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("hide");
```
<a name="module_rup_time..show"></a>

### rup_time~show()
Muestra el desplegable para seleccionar una hora.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("show");
```
<a name="module_rup_time..getTime"></a>

### rup_time~getTime() ⇒ <code>string</code>
Devuelve la hora seleccionada, si no se ha seleccionado nada devuelve vacío.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Returns**: <code>string</code> - - Devuelve la hora seleccionada por el usuario utilizando.  
**Example**  
```js
$("#idTime").rup_time("getTime");
```
<a name="module_rup_time..setTime"></a>

### rup_time~setTime() ⇒ <code>date</code>
Establece la hora del componente.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Returns**: <code>date</code> - time - Hora que se desea asignar al componente.  
**Example**  
```js
$("#idTime").rup_time("setTime", time);
```
<a name="module_rup_time..refresh"></a>

### rup_time~refresh()
Refresca el calendario desplegado por si ha habido algún cambio.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  
**Example**  
```js
$("#idTime").rup_time("refresh");
```
<a name="module_rup_time..option"></a>

### rup_time~option(optionName, [value])
Permite consultar y modificar la configuración del componente.

**Kind**: inner method of [<code>rup\_time</code>](#module_rup_time)  

| Param | Type | Description |
| --- | --- | --- |
| optionName | <code>string</code> \| <code>object</code> | Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades. |
| [value] | <code>\*</code> | Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro. |

**Example**  
```js
// Consultar una propiedad$("#idTime").rup_time("option", "showSecond");// Establecer una propiedad$("#idTime").rup_time("option", "showSecond", true);// Establecer varias propiedad$("#idTime").rup_time("option", {showSecond: true, showButtonPanel: true});
```
