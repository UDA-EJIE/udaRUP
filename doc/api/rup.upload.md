<a name="module_rup_upload"></a>

## rup_upload
Permite al usuario seleccionar uno o varios archivos de su equipo y subirlos a la aplicación.

**Summary**: Componente RUP Upload.  
**See**: El componente está basado en el plugin [jQuery File Upload](https://blueimp.github.io/jQuery-File-Upload/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](https://blueimp.github.io/jQuery-File-Upload/).  
**Example**  
```js
$("#idUpload").rup_upload({});
```

* [rup_upload](#module_rup_upload)
    * _instance_
        * ["fileuploadadd"](#module_rup_upload+event_fileuploadadd)
        * ["fileuploadsubmit"](#module_rup_upload+event_fileuploadsubmit) ⇒ <code>boolean</code>
        * ["fileuploadsend"](#module_rup_upload+event_fileuploadsend) ⇒ <code>boolean</code>
        * ["fileuploaddone"](#module_rup_upload+event_fileuploaddone)
        * ["fileuploadfail"](#module_rup_upload+event_fileuploadfail)
        * ["fileuploadalways"](#module_rup_upload+event_fileuploadalways)
        * ["fileuploadprogress"](#module_rup_upload+event_fileuploadprogress)
        * ["fileuploadprogressall"](#module_rup_upload+event_fileuploadprogressall)
        * ["fileuploadstart"](#module_rup_upload+event_fileuploadstart)
        * ["fileuploadstop"](#module_rup_upload+event_fileuploadstop)
    * _inner_
        * [~options](#module_rup_upload..options)
        * [~destroy()](#module_rup_upload..destroy)
        * [~enable()](#module_rup_upload..enable)
        * [~disable()](#module_rup_upload..disable)
        * [~add()](#module_rup_upload..add)

<a name="module_rup_upload+event_fileuploadadd"></a>

### "fileuploadadd"
Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadadd", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadsubmit"></a>

### "fileuploadsubmit" ⇒ <code>boolean</code>
Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Returns**: <code>boolean</code> - - Si la función retorna false el envío no se realiza.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadsubmit", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadsend"></a>

### "fileuploadsend" ⇒ <code>boolean</code>
Permite asociar una función que se ejecutará al iniciarse el envío de cada fichero.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Returns**: <code>boolean</code> - - Si la función retorna false el envío no se realiza.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadsend", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploaddone"></a>

### "fileuploaddone"
Permite asociar una función que se ejecutará al realizarse de manera satisfactoria el envío de los ficheros.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploaddone", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadfail"></a>

### "fileuploadfail"
Permite asociar una función que se ejecutará al producirse un error en el envío de los ficheros o al abortarse el envío.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadfail", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadalways"></a>

### "fileuploadalways"
Permite asociar una función que se ejecutará al producirse un envío correcto, erróneo o se aborte.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadalways", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadprogress"></a>

### "fileuploadprogress"
Permite asociar una función que se ejecutará al producirse un evento relacionado con el indicador de progreso del envío de ficheros.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadprogress", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadprogressall"></a>

### "fileuploadprogressall"
Permite asociar una función que se ejecutará al producirse un evento relacionado el indicador de progreso global de envío de ficheros.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información relativa a la subida de los ficheros. |

**Example**  
```js
$("#fileupload").on("fileuploadprogressall", function (e, data) {});
```
<a name="module_rup_upload+event_fileuploadstart"></a>

### "fileuploadstart"
Permite asociar una función que se ejecutará al inicio del envío de los ficheros.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#fileupload").on("fileuploadstart", function (e) {});
```
<a name="module_rup_upload+event_fileuploadstop"></a>

### "fileuploadstop"
Permite asociar una función que se ejecutará al detenerse el proceso de envío de ficheros.

**Kind**: event emitted by [<code>rup_upload</code>](#module_rup_upload)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#fileupload").on("fileuploadstop", function (e) {});
```
<a name="module_rup_upload..options"></a>

### rup_upload~options
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup_upload</code>](#module_rup_upload)  
**See**: Para mas información consulte la documentación acerca de las opciones de configuración del plugin [jQuery File Upload](https://github.com/blueimp/jQuery-File-Upload/wiki/Options).  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [namespace] | <code>string</code> |  | Se utiliza para asociar el capturador de eventos del dropZone y del fileInpurt. Por defecto toma el valor del widget (“fileupload”). |
| [dropZone] | <code>jQuery</code> | <code>$(document)</code> | Indica el objeto jQuery que representa el área de dropZone. Para deshabilitar el soporte drag & drop se deberá indicar el valor null. |
| [fileInput] | <code>jQuery</code> |  | Objeto jQuery sobre el cual se monitorizarán los eventos de cambio del mismo. En caso de no especificarse se tomarán los input de tipo file existentes dentro del objeto sobre el que se ha creado el componente upload. Para deshabilitar el capturador de eventos se deberá indicar el valor null. |
| [replaceFileInput] | <code>boolean</code> | <code>true</code> | Determinar si el campo file es reemplazado por un nuevo objeto a partir de un clone. |
| [paramName] | <code>string</code> |  | Indica el nombre del parámetro de la request mediante el cual se enviará la información del fichero. En caso de no especificarse, se tomará el valor de la propiedad name del campo file. En caso de no especificarse dicha propiedad se tomará el valor files[] por defecto. |
| [singleFileUploads] | <code>boolean</code> | <code>true</code> | Especifica si la subida de ficheros se realizar de manera individual, es decir, si se realiza una petición XHR por cada uno de los ficheros que se deben de enviar. |
| [limitMultiFileUploads] | <code>boolean</code> | <code>true</code> | Especifica el número de ficheros que pueden ser enviados en una única petición XHR. |
| [sequentialUploads] | <code>boolean</code> | <code>false</code> | Especifica si el envío de los ficheros se realizan de manera secuencial en vez de manera simultánea. |
| [limitConcurrentUploads] | <code>Integer</code> |  | Indica el número máximo de peticiones concurrentes para la subida de ficheros. |
| [forceIframeTransport] | <code>boolean</code> | <code>false</code> | Determina si se debe forzar el uso de iframe al realizar la subida de ficheros. Esta opción puede ser útil en caso de subida de ficheros entre diferentes dominios. |
| [multipart] | <code>boolean</code> | <code>true</code> | Indica si la subida de ficheros se realiza como multipart/form-data. |
| [recalculateProgress] | <code>boolean</code> | <code>true</code> | Por defecto, los envíos de ficheros erróneos o cancelados son excluidos del cálculo del progreso global de subida de ficheros. Para evitar el recálculo del progreso global se deberá de especificar esta opción como false. |
| [formData] | <code>object</code> \| <code>Array.&lt;object&gt;</code> \| <code>function</code> |  | Información adicional que se desea enviar al realizarse la subida de ficheros. El parámetro acepta lo siguiente: <ul><li>Array de objetos con propiedades</li><li>Objeto simple</li><li>Función que retorna uno de los tipos de datos especificados anteriormente.</li></ul> |

<a name="module_rup_upload..destroy"></a>

### rup_upload~destroy()
Elimina los objetos jQuery asociados al elemento identificado por el selector, durante el proceso de creación del componente upload

**Kind**: inner method of [<code>rup_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_combo("destroy");
```
<a name="module_rup_upload..enable"></a>

### rup_upload~enable()
**Kind**: inner method of [<code>rup_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_upload("enable");
```
<a name="module_rup_upload..disable"></a>

### rup_upload~disable()
Deshabilita el componente upload

**Kind**: inner method of [<code>rup_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_upload("disable");
```
<a name="module_rup_upload..add"></a>

### rup_upload~add()
Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente. muestre el desplegable del combo

**Kind**: inner method of [<code>rup_upload</code>](#module_rup_upload)  
