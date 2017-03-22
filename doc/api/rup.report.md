<a name="module_rup_report"></a>

## rup_report
El objetivo principal del componente es mejorar la experiencia del usuario a la hora de generar informes mediante la presentación de diálogos de espera.

**Summary**: Componente RUP Report.  
**Example**  
```js
var properties={  // Propiedades de configuración};$.rup_report(properties);
```

* [rup_report](#module_rup_report)
    * [~options](#module_rup_report..options)
    * [~button](#module_rup_report..button)
    * [~columns](#module_rup_report..columns)
    * [~dialog](#module_rup_report..dialog)
    * [~customDialog](#module_rup_report..customDialog)

<a name="module_rup_report..options"></a>

### rup_report~options
Opciones por defecto de configuración del componente.

**Kind**: inner property of <code>[rup_report](#module_rup_report)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| appendTo | <code>string</code> | Identificador del elemento al que se añadirá el botón o botones. Puede ser una capa, una botonera o un mbutton. En el caso de ser un mbutton sólo podrán añadirse botones, no mbuttons. |
| buttons | <code>[array.&lt;button&gt;](#module_rup_report..button)</code> | Array de botones a añadir. Su declaración es similar a los del componente rup.toolbar pero tienen algunos parámetros extra |
| dialog | <code>[dialog](#module_rup_report..dialog)</code> | Objeto para sobrescribir los literales por defecto del diálogo del componente y asociar funciones de callback |
| customDialog | <code>[customDialog](#module_rup_report..customDialog)</code> | Objeto para definir los diálogos propios definidos por el usuario. Puede modificar simplemente los literales para un botón determinado o puede definir sus propias capas para sus diálogos completamente personalizados |

<a name="module_rup_report..button"></a>

### rup_report~button
**Kind**: inner typedef of <code>[rup_report](#module_rup_report)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| i18nCaption | <code>string</code> |  | Texto que se mostrará en el botón. Obtenido del fichero de literales de la aplicación. |
| json_i18n | <code>string</code> |  | Objeto JSON del que se obtienen los literales a mostrar. |
| css | <code>string</code> |  | Define el estilo a aplicar. Se utilizará para mostrar imágenes a la izquierda del botón. |
| click | <code>function</code> |  | Función javascript que se ejecutará cuando se pulse el botón al que se ha asociado. La función podrá recibir un parámetro “event” que contendrá el identificador y el texto del botón y se accederá a ellos mediante la sentencia “event.data.id” y “event.data.caption” respectivamente. |
| buttons | <code>[array.&lt;button&gt;](#module_rup_report..button)</code> |  | Array para definir sub-botones con lo que la definición se convierte en un mbutton. |
| url | <code>string</code> |  | Ruta al Controller encargado de generar el informe |
| columns | <code>[columns](#module_rup_report..columns)</code> |  | Objeto que define si se van a enviar los datos de las columnas (nombres y posiciones): |
| customDialog | <code>string</code> |  | Identificador del dialogo propio definido en el componente |
| isInline | <code>boolean</code> | <code>false</code> | Indica que el informe se genera en una pestaña nueva del navegador. Sólo soportado en PDF |

<a name="module_rup_report..columns"></a>

### rup_report~columns
Objeto que define si se van a enviar los datos de las columnas (nombres y posiciones):

**Kind**: inner typedef of <code>[rup_report](#module_rup_report)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| grid | <code>string</code> |  | identificador del grid del que obtener las columnas. |
| customNames | <code>array</code> |  | array que indica el nombre de las columnas a incluir (atributo name del grid). |
| hidden | <code>boolean</code> | <code>false</code> | Indica si se desean incluir las columnas ocultas. |

<a name="module_rup_report..dialog"></a>

### rup_report~dialog
Objeto para sobrescribir los literales por defecto del diálogo del componente y asociar funciones de callback

**Kind**: inner typedef of <code>[rup_report](#module_rup_report)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| wait | <code>object</code> | Objeto para definir el diálogo de espera mientras se genera el informe |
| wait.title | <code>string</code> | Título del diálogo |
| wait.msg | <code>string</code> | mensaje del diálogo |
| error | <code>object</code> | objeto para definir el diálogo que se muestra si se produce un error: |
| error.title | <code>string</code> | Título del diálogo |
| error.msg | <code>string</code> | mensaje del diálogo |
| successCallback | <code>function</code> | Función que se ejecuta cuando se genera correctamente el informe. |
| failCallback | <code>fucntion</code> | Función que se ejecuta cuando no se genera correctamente el informe |

<a name="module_rup_report..customDialog"></a>

### rup_report~customDialog
Objeto para definir los diálogos propios definidos por el usuario. Puede modificar simplemente los literales para un botón determinado o puede definir sus propias capas para sus diálogos completamente personalizados

**Kind**: inner typedef of <code>[rup_report](#module_rup_report)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| nombre | <code>string</code> | identificador del diálogo que se define en el botón |
| successCallback | <code>function</code> | Función que se ejecuta cuando se genera correctamente el informe. |
| failCallback | <code>fucntion</code> | Función que se ejecuta cuando no se genera correctamente el informe |
| wait | <code>object</code> | Objeto para definir el diálogo de espera mientras se genera el informe |
| wait.title | <code>string</code> | Título del diálogo |
| wait.msg | <code>string</code> | mensaje del diálogo |
| error | <code>object</code> | objeto para definir el diálogo que se muestra si se produce un error: |
| error.title | <code>string</code> | Título del diálogo |
| error.msg | <code>string</code> | mensaje del diálogo |
| waitDiv | <code>string</code> | Identificador de la tabla para el diálogo de espera. |
| errorDiv | <code>string</code> | Identificador de la capara para el diálogo de error    identificador de la capara para el diálogo de error |

