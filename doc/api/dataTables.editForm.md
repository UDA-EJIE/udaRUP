<a name="module_dataTables.editForm"></a>

## dataTables.editForm
Módulo que habilita la edicción mediante un formulario.

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [dataTables.editForm](#module_dataTables.editForm)
    * [~init(dt)](#module_dataTables.editForm..init)
    * [~init(ctx)](#module_dataTables.editForm..init)
    * [~openSaveDialog(actionType, dt, idRow)](#module_dataTables.editForm..openSaveDialog)
    * [~openSaveDialog(actionType, dt, row, idRow, continuar, idTableDetail, url)](#module_dataTables.editForm..openSaveDialog)
    * [~callFeedbackOk(ctx, feedback, msgFeedBack, type)](#module_dataTables.editForm..callFeedbackOk)
    * [~returnCheckEmpty(idForm, values)](#module_dataTables.editForm..returnCheckEmpty)
    * [~updateDetailPagination(ctx, currentRowNum, totalRowNum)](#module_dataTables.editForm..updateDetailPagination)
    * [~callNavigatorBar(dt)](#module_dataTables.editForm..callNavigatorBar)
    * [~getRowSelected(dt, actionType)](#module_dataTables.editForm..getRowSelected) ⇒
    * [~getNextPageSelected(ctx, pageInit, orden)](#module_dataTables.editForm..getNextPageSelected) ⇒
    * [~getLineByPageSelected(ctx, lineInit)](#module_dataTables.editForm..getLineByPageSelected) ⇒
    * [~getLineByPageSelectedReverse(ctx, lineInit)](#module_dataTables.editForm..getLineByPageSelectedReverse) ⇒
    * [~deleteAllSelects(dt)](#module_dataTables.editForm..deleteAllSelects)

<a name="module_dataTables.editForm..init"></a>

### dataTables.editForm~init(dt)
Se inicializa el componente editForm

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |

<a name="module_dataTables.editForm..init"></a>

### dataTables.editForm~init(ctx)
Initialisation of a new table. Attach event handlers and callbacks to allowSelect to operate correctly.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered, if there is ajax data

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.settings</code> | Settings object to operate on |

<a name="module_dataTables.editForm..openSaveDialog"></a>

### dataTables.editForm~openSaveDialog(actionType, dt, idRow)
Función que lleva todo el comportamiento para abrir el dialog y editar un resgistro.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| actionType | <code>string</code> | Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest. |
| dt | <code>object</code> | Es el objeto datatable. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |

<a name="module_dataTables.editForm..openSaveDialog"></a>

### dataTables.editForm~openSaveDialog(actionType, dt, row, idRow, continuar, idTableDetail, url)
Llamada al servidor con los datos de edición.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| actionType | <code>string</code> | Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest. |
| dt | <code>object</code> | Es el objeto datatable. |
| row | <code>object</code> | son los datos que se cargan. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |
| continuar | <code>boolean</code> | Si es true guarda la pagina y se queda en el dialog , si es false guarda y cierrar el dialog. |
| idTableDetail | <code>string</code> | Identificdor del detail de la table. |
| url | <code>string</code> | Url que se añade para llmar  al controller. |

<a name="module_dataTables.editForm..callFeedbackOk"></a>

### dataTables.editForm~callFeedbackOk(ctx, feedback, msgFeedBack, type)
Llamada para crear el feedback detro del dialog.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| feedback | <code>object</code> | Div donde se va ejecutar el feedback. |
| msgFeedBack | <code>string</code> | Mensaje para el feedback. |
| type | <code>string</code> | Tipos del feedback, mirar en el rup.feedback.. |

<a name="module_dataTables.editForm..returnCheckEmpty"></a>

### dataTables.editForm~returnCheckEmpty(idForm, values)
Se verifican los check vacios dentro de un formulario.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| idForm | <code>object</code> | Identificador del formulario. |
| values | <code>string</code> | Values ya añadidos al formulario. |

<a name="module_dataTables.editForm..updateDetailPagination"></a>

### dataTables.editForm~updateDetailPagination(ctx, currentRowNum, totalRowNum)
Actualiza la navegación del dialogo.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| currentRowNum | <code>integer</code> | Número de la posción actual del registro selecionado. |
| totalRowNum | <code>integer</code> | Número total de registros seleccionados. |

<a name="module_dataTables.editForm..callNavigatorBar"></a>

### dataTables.editForm~callNavigatorBar(dt)
Constructor de la barra de navegación.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |

<a name="module_dataTables.editForm..getRowSelected"></a>

### dataTables.editForm~getRowSelected(dt, actionType) ⇒
Metodo que obtiene la fila siguiente seleccionada.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Returns**: object que contiene  el identificador, la pagina y la linea de la fila seleccionada  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| actionType | <code>string</code> | Es el objeto datatable. |

<a name="module_dataTables.editForm..getNextPageSelected"></a>

### dataTables.editForm~getNextPageSelected(ctx, pageInit, orden) ⇒
Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Returns**: integer - devuele la página  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| pageInit | <code>integer</code> | Página a partir de la cual hay que mirar, en general serà la 1. |
| orden | <code>string</code> | Pueder ser pre o next, en función de si necesitar ir hacia adelante o hacia atrás. |

<a name="module_dataTables.editForm..getLineByPageSelected"></a>

### dataTables.editForm~getLineByPageSelected(ctx, lineInit) ⇒
Metodo que obtiene la linea siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Returns**: integer - devuele la linea  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| lineInit | <code>integer</code> | Linea a partir de la cual hay que mirar, en general serà la 1. |

<a name="module_dataTables.editForm..getLineByPageSelectedReverse"></a>

### dataTables.editForm~getLineByPageSelectedReverse(ctx, lineInit) ⇒
Metodo que obtiene la última linea siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Returns**: integer - devuele la linea  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| lineInit | <code>integer</code> | Linea a partir de la cual hay que mirar. |

<a name="module_dataTables.editForm..deleteAllSelects"></a>

### dataTables.editForm~deleteAllSelects(dt)
Metodo que elimina todos los registros seleccionados.

**Kind**: inner method of [<code>dataTables.editForm</code>](#module_dataTables.editForm)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |

