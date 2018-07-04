<a name="module_buttons.custom"></a>

## buttons.custom
Establece el tipo de llamada necesario para obtener los datos según lo seleccionadoe inicia la gestión para finalmente obtenerlos

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [buttons.custom](#module_buttons.custom)
    * [~_reportsCopyData(dt, that, config)](#module_buttons.custom.._reportsCopyData)
    * [~_reportsTypeOfCopy(dt, type, multiselection, selectedAll, [deselectedIds])](#module_buttons.custom.._reportsTypeOfCopy) ⇒ <code>object</code>
    * [~_reportsPrepareRequestData(ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, [deselectedIds], [selectedIds])](#module_buttons.custom.._reportsPrepareRequestData) ⇒ <code>object</code>
    * [~_reportsRequestData(ajaxOptions)](#module_buttons.custom.._reportsRequestData) ⇒ <code>object</code>
    * [~_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea)](#module_buttons.custom.._reportsOpenMessage)
    * [~_reportsCopyDataToClipboard(dt, that, exportDataRows, hiddenDiv, textarea)](#module_buttons.custom.._reportsCopyDataToClipboard)

<a name="module_buttons.custom.._reportsCopyData"></a>

### buttons.custom~_reportsCopyData(dt, that, config)
Establece el tipo de llamada necesario para obtener los datos según lo seleccionadoe inicia la gestión para finalmente obtenerlos

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del datatable |
| that | <code>object</code> | Objeto del boton |
| config | <code>object</code> | Configuracion del boton |

<a name="module_buttons.custom.._reportsTypeOfCopy"></a>

### buttons.custom~_reportsTypeOfCopy(dt, type, multiselection, selectedAll, [deselectedIds]) ⇒ <code>object</code>
Según el tipo de función de copia solicitada, realiza unas u otras comprobacionesantes de solicitar los datos al servidor

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del datatable |
| type | <code>string</code> | Tipo de funcion de copia a ejecutar |
| multiselection | <code>object</code> | Propiedades de la multiseleccion |
| selectedAll | <code>boolean</code> | Cuando es true significa que todas las filas estan marcadas |
| [deselectedIds] | <code>array</code> | ID's de las filas deseleccionadas |

<a name="module_buttons.custom.._reportsPrepareRequestData"></a>

### buttons.custom~_reportsPrepareRequestData(ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, [deselectedIds], [selectedIds]) ⇒ <code>object</code>
Se encarga de generar las opciones de configuración con las que se llamara a la API

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ajaxOptions | <code>object</code> | Parametros de la llamada Ajax |
| urlAjax | <code>string</code> | Parametro para la URL |
| typeAjax | <code>string</code> | Tipo de llamada a la API |
| contentTypeAjax | <code>string</code> | Formato de datos enviados |
| dataTypeAjax | <code>string</code> | Formato de datos esperados |
| ctx | <code>object</code> | Contexto |
| selectedAll | <code>boolean</code> | Cuando es true significa que todas las filas estan marcadas |
| [deselectedIds] | <code>array</code> | ID's de las filas deseleccionadas |
| [selectedIds] | <code>array</code> | ID's de las filas seleccionadas |

<a name="module_buttons.custom.._reportsRequestData"></a>

### buttons.custom~_reportsRequestData(ajaxOptions) ⇒ <code>object</code>
Se encarga de llamar a la API y de devolver los datos recibidos

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ajaxOptions | <code>object</code> | Parametros de la llamada Ajax |

<a name="module_buttons.custom.._reportsOpenMessage"></a>

### buttons.custom~_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea)
Gestiona la apertura/cierre del mensaje de confirmación de copia

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del datatable |
| ctx | <code>object</code> | Contexto |
| that | <code>object</code> | Objeto del boton |
| exportDataRows | <code>int</code> | Numero de filas a ser exportadas |
| hiddenDiv | <code>object</code> | Elemento del DOM |
| textarea | <code>object</code> | Elemento del DOM |

<a name="module_buttons.custom.._reportsCopyDataToClipboard"></a>

### buttons.custom~_reportsCopyDataToClipboard(dt, that, exportDataRows, hiddenDiv, textarea)
Copia los datos recibidos al portapapeles

**Kind**: inner method of [<code>buttons.custom</code>](#module_buttons.custom)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia del datatable |
| that | <code>object</code> | Objeto del boton |
| exportDataRows | <code>int</code> | Numero de filas a ser exportadas |
| hiddenDiv | <code>object</code> | Elemento del DOM |
| textarea | <code>object</code> | Elemento del DOM |

