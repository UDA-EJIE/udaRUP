<a name="module_rup.table.editForm"></a>

## rup.table.editForm
Módulo que habilita la edicción mediante un formulario.

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table.editForm](#module_rup.table.editForm)
    * [~preConfigure(dt)](#module_rup.table.editForm..preConfigure)
    * [~init(ctx)](#module_rup.table.editForm..init)
    * [~init(ctx)](#module_rup.table.editForm..init)
    * [~addValidation(ctx)](#module_rup.table.editForm..addValidation)
    * [~loadSaveDialogForm(ctx, actionType, row)](#module_rup.table.editForm..loadSaveDialogForm) ⇒ <code>object</code>
    * [~formInitializeRUP(ctx, row, form)](#module_rup.table.editForm..formInitializeRUP)
    * [~openSaveDialog(actionType, dt, idRow, customTitle)](#module_rup.table.editForm..openSaveDialog)
    * [~_callSaveAjax(actionType, dt, row, idRow, continuar, idTableDetail, url, isDeleting)](#module_rup.table.editForm.._callSaveAjax)
    * [~callFeedbackOk(ctx, feedback, msgFeedBack, type)](#module_rup.table.editForm..callFeedbackOk)
    * [~addListType(idForm, row)](#module_rup.table.editForm..addListType)
    * [~updateDetailPagination(ctx, currentRowNum, totalRowNum)](#module_rup.table.editForm..updateDetailPagination)
    * [~callNavigatorBar(dt)](#module_rup.table.editForm..callNavigatorBar)
    * [~callNavigatorSelectBar(dt)](#module_rup.table.editForm..callNavigatorSelectBar)
    * [~getRowSelected(dt, actionType)](#module_rup.table.editForm..getRowSelected) ⇒ <code>object</code>
    * [~getNextPageSelected(ctx, pageInit, orden)](#module_rup.table.editForm..getNextPageSelected) ⇒
    * [~getPrevPageSelected(ctx, pageInit)](#module_rup.table.editForm..getPrevPageSelected) ⇒
    * [~getLineByPageSelected(ctx, lineInit)](#module_rup.table.editForm..getLineByPageSelected) ⇒
    * [~getLineByPageSelectedReverse(ctx, lineInit)](#module_rup.table.editForm..getLineByPageSelectedReverse) ⇒
    * [~_deleteAllSelects(dt)](#module_rup.table.editForm.._deleteAllSelects)
    * [~_editFormSerialize(idForm)](#module_rup.table.editForm.._editFormSerialize) ⇒ <code>string</code>
    * [~_comprobarSeeker(row, ctx, idRow)](#module_rup.table.editForm.._comprobarSeeker)
    * [~_blockPKeditForm(ctx, actionType)](#module_rup.table.editForm.._blockPKeditForm)
    * [~_addChildIcons(ctx)](#module_rup.table.editForm.._addChildIcons)

<a name="module_rup.table.editForm..preConfigure"></a>

### rup.table.editForm~preConfigure(dt)
Configura el componente editForm para su inicialización

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 5.0.0 (backported) // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.editForm..init"></a>

### rup.table.editForm~init(ctx)
Inicializa el componente editForm

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |

<a name="module_rup.table.editForm..init"></a>

### rup.table.editForm~init(ctx)
Initialisation of a new table. Attach event handlers and callbacks to allowSelect to operate correctly.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered, if there is ajax data

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.settings</code> | Settings object to operate on |

<a name="module_rup.table.editForm..addValidation"></a>

### rup.table.editForm~addValidation(ctx)
Función que añade las validaciones a un formulario.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 5.0.0 (backported) // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |

<a name="module_rup.table.editForm..loadSaveDialogForm"></a>

### rup.table.editForm~loadSaveDialogForm(ctx, actionType, row) ⇒ <code>object</code>
Función que gestiona la carga del diálogo de añadir o editar.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 5.0.0 (backported) // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto de la tabla. |
| actionType | <code>string</code> | Acción a ajecutar en el formulario para ir al controller, basado en REST. |
| row | <code>object</code> | Datos para alimentar los campos del formulario. |

<a name="module_rup.table.editForm..formInitializeRUP"></a>

### rup.table.editForm~formInitializeRUP(ctx, row, form)
Detecta los componentes RUP del formulario y los inicializa.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 5.0.2 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto de la tabla. |
| row | <code>object</code> | Datos para alimentar los campos del formulario. |
| form | <code>object</code> | Formulario en el que hay que inicializar los componentes. |

<a name="module_rup.table.editForm..openSaveDialog"></a>

### rup.table.editForm~openSaveDialog(actionType, dt, idRow, customTitle)
Función que gestiona el comportamiento de abrir el dialog para añadir o editar un registro.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| actionType | <code>string</code> | Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest. |
| dt | <code>object</code> | Es el objeto table. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |
| customTitle | <code>string</code> | Título personalizado. |

<a name="module_rup.table.editForm.._callSaveAjax"></a>

### rup.table.editForm~\_callSaveAjax(actionType, dt, row, idRow, continuar, idTableDetail, url, isDeleting)
Llamada al servidor con los datos de edición.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| actionType | <code>string</code> | Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest. |
| dt | <code>object</code> | Es el objeto table. |
| row | <code>object</code> | Son los datos que se cargan. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |
| continuar | <code>boolean</code> | Si es true guarda la pagina y se queda en el dialog , si es false guarda y cierra el dialog. |
| idTableDetail | <code>string</code> | Identificdor del detail de la table. |
| url | <code>string</code> | Url que se añade para llamar  al controller. |
| isDeleting | <code>boolean</code> | Evita mostrar el diálogo de confirmación porque la función _deleteAllSelects() tiene el suyo propio. |

<a name="module_rup.table.editForm..callFeedbackOk"></a>

### rup.table.editForm~callFeedbackOk(ctx, feedback, msgFeedBack, type)
Llamada para crear el feedback dentro del dialog.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| feedback | <code>object</code> | Div donde se va ejecutar el feedback. |
| msgFeedBack | <code>string</code> | Mensaje para el feedback. |
| type | <code>string</code> | Tipos del feedback, mirar en el rup.feedback.. |

<a name="module_rup.table.editForm..addListType"></a>

### rup.table.editForm~addListType(idForm, row)
Se añade el tipo de la lista.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 4.2.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| idForm | <code>object</code> | Identificador del formulario. |
| row | <code>string</code> | Values ya añadidos al formulario. |

<a name="module_rup.table.editForm..updateDetailPagination"></a>

### rup.table.editForm~updateDetailPagination(ctx, currentRowNum, totalRowNum)
Actualiza la navegación del dialogo.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| currentRowNum | <code>integer</code> | Número de la posición actual del registro selecionado. |
| totalRowNum | <code>integer</code> | Número total de registros seleccionados. |

<a name="module_rup.table.editForm..callNavigatorBar"></a>

### rup.table.editForm~callNavigatorBar(dt)
Constructor de la barra de navegación.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.editForm..callNavigatorSelectBar"></a>

### rup.table.editForm~callNavigatorSelectBar(dt)
Constructor de la barra de navegación.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.editForm..getRowSelected"></a>

### rup.table.editForm~getRowSelected(dt, actionType) ⇒ <code>object</code>
Método que obtiene la fila siguiente seleccionada.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: <code>object</code> - Contiene el identificador, la página y la línea de la fila seleccionada.  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia de la tabla. |
| actionType | <code>string</code> | Acción a ajecutar en el formulario para ir al controller, basado en REST. |

<a name="module_rup.table.editForm..getNextPageSelected"></a>

### rup.table.editForm~getNextPageSelected(ctx, pageInit, orden) ⇒
Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: integer - devuelve la página  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| pageInit | <code>integer</code> | Página a partir de la cual hay que mirar, en general serà la 1. |
| orden | <code>string</code> | Pueder ser pre o next, en función de si necesitar ir hacia adelante o hacia atrás. |

<a name="module_rup.table.editForm..getPrevPageSelected"></a>

### rup.table.editForm~getPrevPageSelected(ctx, pageInit) ⇒
Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: integer - devuele la página  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| pageInit | <code>integer</code> | Página a partir de la cual hay que mirar, en general serà la 1. |

<a name="module_rup.table.editForm..getLineByPageSelected"></a>

### rup.table.editForm~getLineByPageSelected(ctx, lineInit) ⇒
Metodo que obtiene la linea siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: integer - devuele la linea  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| lineInit | <code>integer</code> | Linea a partir de la cual hay que mirar, en general será la 1. |

<a name="module_rup.table.editForm..getLineByPageSelectedReverse"></a>

### rup.table.editForm~getLineByPageSelectedReverse(ctx, lineInit) ⇒
Metodo que obtiene la última linea siguiente donde esta el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: integer - devuele la linea  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| lineInit | <code>integer</code> | Linea a partir de la cual hay que mirar. |

<a name="module_rup.table.editForm.._deleteAllSelects"></a>

### rup.table.editForm~\_deleteAllSelects(dt)
Metodo que elimina todos los registros seleccionados.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.editForm.._editFormSerialize"></a>

### rup.table.editForm~\_editFormSerialize(idForm) ⇒ <code>string</code>
Método que serializa los datos del formulario.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Returns**: <code>string</code> - - Devuelve los datos del formulario serializados  
**Since**: UDA 3.6.0 // Table 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| idForm | <code>object</code> | Formulario que alberga los datos. |

<a name="module_rup.table.editForm.._comprobarSeeker"></a>

### rup.table.editForm~\_comprobarSeeker(row, ctx, idRow)
Metodo que comprueba el seeker.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>object</code> | Son los datos que se cargan. |
| ctx | <code>object</code> | Settings object to operate on. |
| idRow | <code>number</code> | Identificador de la fila. |

<a name="module_rup.table.editForm.._blockPKeditForm"></a>

### rup.table.editForm~\_blockPKeditForm(ctx, actionType)
Método que gestiona el bloqueo de la edición de las claves primarias.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| actionType | <code>string</code> | Método de operación CRUD. |

<a name="module_rup.table.editForm.._addChildIcons"></a>

### rup.table.editForm~\_addChildIcons(ctx)
Se añaden los iconos al responsive.

**Kind**: inner method of [<code>rup.table.editForm</code>](#module_rup.table.editForm)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |

