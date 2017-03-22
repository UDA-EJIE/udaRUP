<a name="module_rup_time"></a>

## rup_time
El usuario puede introducir y seleccionar una hora tanto de forma manual como visual, moviéndose fácilmente por las horas y los minutos, recibiendo ayudas y sugerencias para minimizar las posibilidades de introducir una hora incorrecta.

**Summary**: Componente RUP Time.  
**Example**  
```js
var properties = {  labelMaskId : "hora-mask",  showSecond : true,  timeFormat: 'hh:mm:ss',  showButtonPanel: true};$("#idTime").rup_time(properties);
```

* [rup_time](#module_rup_time)
    * _instance_
        * ["onSelect"](#module_rup_time+event_onSelect)
        * ["onClose"](#module_rup_time+event_onClose)
    * _inner_
        * [~defaults](#module_rup_time..defaults)
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

<a name="module_rup_time+event_onSelect"></a>

### "onSelect"
Permite asociar una función que se ejecutará cuando se modifique alguno de los valores del desplegable (hora, minutos o segundos). Los parámetros recibidos son la hora seleccionada (texto) y la instancia del componente

**Kind**: event emitted by <code>[rup_time](#module_rup_time)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_time({ onSelect: function(dateText, inst){...} });
```
<a name="module_rup_time+event_onClose"></a>

### "onClose"
Permite asociar una función que se ejecutará cuando se oculte el desplegable. Los parámetros recibidos son la hora seleccionada (texto) y la instancia del componente

**Kind**: event emitted by <code>[rup_time](#module_rup_time)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_time({ onClose: function(dateText, inst){...} });
```
<a name="module_rup_time..defaults"></a>

### rup_time~defaults
Propiedades de configuración del componente.

**Kind**: inner property of <code>[rup_time](#module_rup_time)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | <code>boolean</code> | <code>false</code> | Indica si el componente debe aparecer deshabilitado o no. |
| labelMaskId | <code>string</code> |  | Identificador del label que contendrá la máscara que indica el formato de la hora. |
| timeFormat | <code>string</code> | <code>&quot;hh:mm&quot;</code> | Formato en el que se muestra la hora. Los posibles modificadores son: <ul><li> h: modificador relativo a las horas. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (hh). </li><li> m: modificador relativo a los minutos. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (mm). </li><li>s: modificador relativo a los segundos. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (ss). </li></ul> |
| hour | <code>Integer</code> | <code>0</code> | Valor con el que se carga inicialmente las horas del componente.. |
| minute | <code>Integer</code> | <code>0</code> | Valor con el que se carga inicialmente los minutos del componente. |
| second | <code>Integer</code> | <code>0</code> | Valor con el que se carga inicialmente los segundos del componente. |
| hourMin | <code>Integer</code> | <code>0</code> | Valor mínimo seleccionable en las horas del componente. |
| hourMax | <code>Integer</code> | <code>23</code> | Valor máximo seleccionable en las horas del componente. |
| minuteMin | <code>Integer</code> | <code>0</code> | Valor mínimo seleccionable en los minutos del componente. |
| minuteMax | <code>Integer</code> | <code>59</code> | Valor máximo seleccionable en los minutos del componente. |
| secondMin | <code>Integer</code> | <code>0</code> | Valor mínimo seleccionable en los segundos del componente. |
| secondMax | <code>Integer</code> | <code>59</code> | Valor mínimo seleccionable en los segundos del componente. |
| showHour | <code>boolean</code> | <code>true</code> | Indica si se muestran o no las horas. |
| showMinute | <code>boolean</code> | <code>true</code> | Indica si se muestran o no los minutos. |
| showSecond | <code>boolean</code> | <code>false</code> | Indica si se muestran o no los segundos. |
| stepHour | <code>Integer</code> | <code>1</code> | Establece el incremento de la barra de scroll relativa a las horas. |
| stepMinute | <code>Integer</code> | <code>1</code> | Establece el incremento de la barra de scroll relativa a los minutos. |
| stepSecond | <code>Integer</code> | <code>1</code> | establece el incremento de la barra de scroll relativa a los segundos. |
| hourGrid | <code>Integer</code> | <code>0</code> | Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a las horas. Al pinchar sobre dichos números se selecciona ese valor. |
| minuteGrid | <code>Integer</code> | <code>0</code> | Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a los minutos. Al pinchar sobre dichos números se selecciona ese valor. |
| secondGrid | <code>Integer</code> | <code>0</code> | Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a los segundos. Al pinchar sobre dichos números se selecciona ese valor. |
| showTime | <code>boolean</code> | <code>true</code> | Determina si se desea mostrar o no la fecha en el desplegable. |
| ampm | <code>boolean</code> | <code>false</code> | Determina si en lugar de mostrar la hora en formato 0-24 se muestra con el literal am/pm. |
| showButtonPanel | <code>boolean</code> | <code>false</code> | Indica si se muestran los botones de la parte inferior (ahora y cerrar). |
| mask | <code>string</code> |  | Texto empleado para la máscara de la fecha. Su valor por defecto se obtiene del fichero de idioma. |
| buttonText | <code>string</code> |  | Texto alternativo de la imagen que se muestra junto al campo de la fecha. Su valor por defecto se obtiene del fichero de idioma. |
| closeText | <code>string</code> |  | Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para cerrar el desplegable. Su valor por defecto se obtiene del fichero de idioma.. |
| currentText | <code>string</code> |  | Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para seleccionar la hora actual en el desplegable. Su valor por defecto se obtiene del fichero de idioma. |
| timeOnlyTitle | <code>string</code> |  | Texto que aparece en la cabecera del desplegable. Su valor por defecto se obtiene del fichero de idioma. |
| timeText | <code>string</code> |  | Texto que aparece delante de la hora seleccionada (en caso de que esté activo el atributo showTime). Su valor por defecto se obtiene del fichero de idioma. |
| hourText | <code>string</code> |  | Texto que aparece delante de la barra de scroll de selección de horas. Su valor por defecto se obtiene del fichero de idioma. |
| minuteText | <code>string</code> |  | Texto que aparece delante de la barra de scroll de selección de minutos. Su valor por defecto se obtiene del fichero de idioma. |
| secondText | <code>string</code> |  | Texto que aparece delante de la barra de scroll de selección de segundos. Su valor por defecto se obtiene del fichero de idioma. |

<a name="module_rup_time..getRupValue"></a>

### rup_time~getRupValue() ⇒ <code>string</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Returns**: <code>string</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$("#idTime").rup_time("getRupValue");
```
<a name="module_rup_time..setRupValue"></a>

### rup_time~setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  

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

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("destroy");
```
<a name="module_rup_time..disable"></a>

### rup_time~disable()
Deshabilita el componente en pantalla no pudiendo introducirse ninguna hora ni se despliega el calendario.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("disable");
```
<a name="module_rup_time..enable"></a>

### rup_time~enable()
Habilita el componente permitiendo introducir la hora tanto mediante teclado como mediante el desplegable.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("enable");
```
<a name="module_rup_time..isDisabled"></a>

### rup_time~isDisabled() ⇒ <code>boolean</code>
Indica si el componente se encuentra deshabilitado o no.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Returns**: <code>boolean</code> - - Determina si el componente está deshabilitado o no.  
**Example**  
```js
$("#idTime").rup_time("isDisabled");
```
<a name="module_rup_time..hide"></a>

### rup_time~hide()
Oculta el desplegable para seleccionar una hora.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("hide");
```
<a name="module_rup_time..show"></a>

### rup_time~show()
Muestra el desplegable para seleccionar una hora.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("show");
```
<a name="module_rup_time..getTime"></a>

### rup_time~getTime() ⇒ <code>string</code>
Devuelve la hora seleccionada, si no se ha seleccionado nada devuelve vacío.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Returns**: <code>string</code> - - Devuelve la hora seleccionada por el usuario utilizando.  
**Example**  
```js
$("#idTime").rup_time("getTime");
```
<a name="module_rup_time..setTime"></a>

### rup_time~setTime() ⇒ <code>date</code>
Establece la hora del componente.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Returns**: <code>date</code> - time - Hora que se desea asignar al componente.  
**Example**  
```js
$("#idTime").rup_time("setTime", time);
```
<a name="module_rup_time..refresh"></a>

### rup_time~refresh()
Refresca el calendario desplegado por si ha habido algún cambio.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  
**Example**  
```js
$("#idTime").rup_time("refresh");
```
<a name="module_rup_time..option"></a>

### rup_time~option(optionName, [value])
Permite consultar y modificar la configuración del componente.

**Kind**: inner method of <code>[rup_time](#module_rup_time)</code>  

| Param | Type | Description |
| --- | --- | --- |
| optionName | <code>string</code> &#124; <code>object</code> | Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades. |
| [value] | <code>\*</code> | Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro. |

**Example**  
```js
// Consultar una propiedad$("#idTime").rup_time("option", "showSecond");// Establecer una propiedad$("#idTime").rup_time("option", "showSecond", true);// Establecer varias propiedad$("#idTime").rup_time("option", {showSecond: true, showButtonPanel: true});
```
