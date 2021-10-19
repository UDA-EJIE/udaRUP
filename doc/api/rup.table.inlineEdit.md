<a name="module_rup.table.inlineEdit"></a>

## rup.table.inlineEdit
Módulo que habilita la edicción mediante un formulario.

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table.inlineEdit](#module_rup.table.inlineEdit)
    * [~init(dt)](#module_rup.table.inlineEdit..init)
    * [~init(ctx)](#module_rup.table.inlineEdit..init)
    * [~_onResponsiveResize(dt)](#module_rup.table.inlineEdit.._onResponsiveResize)
    * [~_add(dt, ctx)](#module_rup.table.inlineEdit.._add)
    * [~_addChildIcons(ctx)](#module_rup.table.inlineEdit.._addChildIcons)
    * [~_add(dt, ctx, idRow)](#module_rup.table.inlineEdit.._add)
    * [~getRowSelected(dt, actionType)](#module_rup.table.inlineEdit..getRowSelected) ⇒ <code>object</code>
    * [~cloneLine(dt, ctx, line)](#module_rup.table.inlineEdit..cloneLine)
    * [~getNextPageSelected(ctx, pageInit, orden)](#module_rup.table.inlineEdit..getNextPageSelected) ⇒
    * [~getLineByPageSelected(ctx, lineInit)](#module_rup.table.inlineEdit..getLineByPageSelected) ⇒
    * [~_restaurarFila(ctx, limpiar)](#module_rup.table.inlineEdit.._restaurarFila)
    * [~_changeInputsToRup(ctx, idRow)](#module_rup.table.inlineEdit.._changeInputsToRup)
    * [~_recorrerCeldas(ctx, $fila, $celdas, cont)](#module_rup.table.inlineEdit.._recorrerCeldas)
    * [~_restaurarCeldas(ctx, $fila, $celdas, contRest)](#module_rup.table.inlineEdit.._restaurarCeldas)
    * [~_comprobarFila(ctx, $fila)](#module_rup.table.inlineEdit.._comprobarFila)
    * [~_crearEventos(ctx, $selector)](#module_rup.table.inlineEdit.._crearEventos)
    * [~_lastIndexEditable(ctx, $target)](#module_rup.table.inlineEdit.._lastIndexEditable) ⇒
    * [~_inlineEditFormSerialize($fila, ctx, child)](#module_rup.table.inlineEdit.._inlineEditFormSerialize)
    * [~_guardar(ctx, $fila, $child)](#module_rup.table.inlineEdit.._guardar)
    * [~_callSaveAjax(actionType, ctx, $fila, $row, url, isDeleting)](#module_rup.table.inlineEdit.._callSaveAjax)
    * [~loadAuxForm(ctx, actionType)](#module_rup.table.inlineEdit..loadAuxForm) ⇒ <code>object</code>
    * [~callFeedbackOk(ctx, feedback, msgFeedBack, type)](#module_rup.table.inlineEdit..callFeedbackOk)
    * [~_inResponsiveChangeInputsValues(ctx, $fila)](#module_rup.table.inlineEdit.._inResponsiveChangeInputsValues)
    * [~_asignarInputsValues(ctx, $fila)](#module_rup.table.inlineEdit.._asignarInputsValues)
    * [~_createTr(dt, ctx, $columns)](#module_rup.table.inlineEdit.._createTr)
    * [~_drawInLineEdit(tabla, ctx)](#module_rup.table.inlineEdit.._drawInLineEdit)
    * [~_notExistOnPage(ctx)](#module_rup.table.inlineEdit.._notExistOnPage) ⇒ <code>boolean</code>
    * [~_deleteAllSelects(dt)](#module_rup.table.inlineEdit.._deleteAllSelects)
    * [~_comprobarSeeker(row, ctx, idRow)](#module_rup.table.inlineEdit.._comprobarSeeker)

<a name="module_rup.table.inlineEdit..init"></a>

### rup.table.inlineEdit~init(dt)
Se inicializa el componente editInline

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.inlineEdit..init"></a>

### rup.table.inlineEdit~init(ctx)
Initialisation of a new table. Attach event handlers and callbacks to allowSelect to operate correctly.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered, if there is ajax data

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.settings</code> | Settings object to operate on |

<a name="module_rup.table.inlineEdit.._onResponsiveResize"></a>

### rup.table.inlineEdit~\_onResponsiveResize(dt)
Función ejecutada cuando se activa el responsive.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.inlineEdit.._add"></a>

### rup.table.inlineEdit~\_add(dt, ctx)
Se añade un nuevo registro.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |
| ctx | <code>object</code> | Contexto del Datatable. |

<a name="module_rup.table.inlineEdit.._addChildIcons"></a>

### rup.table.inlineEdit~\_addChildIcons(ctx)
Se añaden los iconos al responsive.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |

<a name="module_rup.table.inlineEdit.._add"></a>

### rup.table.inlineEdit~\_add(dt, ctx, idRow)
Método principal para la edición en línea.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |
| ctx | <code>object</code> | Contexto del Datatable. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |

<a name="module_rup.table.inlineEdit..getRowSelected"></a>

### rup.table.inlineEdit~getRowSelected(dt, actionType) ⇒ <code>object</code>
Método que obtiene la fila siguiente seleccionada.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Returns**: <code>object</code> - Contiene el identificador, la página y la línea de la fila seleccionada.  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Instancia de la tabla. |
| actionType | <code>string</code> | Acción a ajecutar en el formulario para ir al controller, basado en REST. |

<a name="module_rup.table.inlineEdit..cloneLine"></a>

### rup.table.inlineEdit~cloneLine(dt, ctx, line)
Método que clona el elemento seleccionado.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Objeto table. |
| ctx | <code>object</code> | Contexto del Datatable. |
| line | <code>integer</code> | Número de la fila. |

<a name="module_rup.table.inlineEdit..getNextPageSelected"></a>

### rup.table.inlineEdit~getNextPageSelected(ctx, pageInit, orden) ⇒
Método que obtiene la página siguiente donde está el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Returns**: integer - devuele la página  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |
| pageInit | <code>integer</code> | Página a partir de la cual hay que mirar, en general serà la 1. |
| orden | <code>string</code> | Pueder ser pre o next, en función de si necesitar ir hacia adelante o hacia atrás. |

<a name="module_rup.table.inlineEdit..getLineByPageSelected"></a>

### rup.table.inlineEdit~getLineByPageSelected(ctx, lineInit) ⇒
Método que obtiene la linea siguiente donde está el primer elemento o elemento seleccionado.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Returns**: integer - devuele la linea  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| lineInit | <code>integer</code> | Linea a partir de la cual hay que mirar, en general será la 1. |

<a name="module_rup.table.inlineEdit.._restaurarFila"></a>

### rup.table.inlineEdit~\_restaurarFila(ctx, limpiar)
Se restaura la línea(fila) en la edición.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |
| limpiar | <code>boolean</code> | Si es true limpia e inicializa todo y si es false solo restaura la línea. |

<a name="module_rup.table.inlineEdit.._changeInputsToRup"></a>

### rup.table.inlineEdit~\_changeInputsToRup(ctx, idRow)
Cambia los inputs por los componentes rup.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |
| idRow | <code>integer</code> | Número con la posición de la fila que hay que obtener. |

<a name="module_rup.table.inlineEdit.._recorrerCeldas"></a>

### rup.table.inlineEdit~\_recorrerCeldas(ctx, $fila, $celdas, cont)
Método que recorre las celdas y las procesa.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | fila que se está editando. |
| $celdas | <code>object</code> | Todas las celdas a recorrer. |
| cont | <code>integer</code> | Contador para saber en que celda nos movemos, sobre todo en el responsive. |

<a name="module_rup.table.inlineEdit.._restaurarCeldas"></a>

### rup.table.inlineEdit~\_restaurarCeldas(ctx, $fila, $celdas, contRest)
Método para restaurar las celdas.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | Fila que se está editando. |
| $celdas | <code>object</code> | Todas las celdas a recorrer. |
| contRest | <code>integer</code> | Contador para saber en que celda nos movemos, sobre todo en el responsive. |

<a name="module_rup.table.inlineEdit.._comprobarFila"></a>

### rup.table.inlineEdit~\_comprobarFila(ctx, $fila)
Comprueba que si la fila está en responsive mantenga el diseño.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | fila que se está editando. |

<a name="module_rup.table.inlineEdit.._crearEventos"></a>

### rup.table.inlineEdit~\_crearEventos(ctx, $selector)
Crea los eventos asociados a la fila.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $selector | <code>object</code> | fila que se está editando. |

<a name="module_rup.table.inlineEdit.._lastIndexEditable"></a>

### rup.table.inlineEdit~\_lastIndexEditable(ctx, $target) ⇒
Método para recorre las celdas y las procesa.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Returns**: devuelve si es el último index editado  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $target | <code>object</code> | fila que se está editando. |

<a name="module_rup.table.inlineEdit.._inlineEditFormSerialize"></a>

### rup.table.inlineEdit~\_inlineEditFormSerialize($fila, ctx, child)
Metodo que serializa los datos del formulario.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.2.0  

| Param | Type | Description |
| --- | --- | --- |
| $fila | <code>object</code> | Fila la cual estamos editando. |
| ctx | <code>object</code> | Contexto del table. |
| child | <code>boolean</code> | boolean para saber si tiene hijos en el responsive. |

<a name="module_rup.table.inlineEdit.._guardar"></a>

### rup.table.inlineEdit~\_guardar(ctx, $fila, $child)
Método para llamar al ajax de guardado y nuevo.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | fila que se está editando. |
| $child | <code>boolean</code> | boolean para decir si la llamada es del hijo o del padre |

<a name="module_rup.table.inlineEdit.._callSaveAjax"></a>

### rup.table.inlineEdit~\_callSaveAjax(actionType, ctx, $fila, $row, url, isDeleting)
Llamada al servidor con los datos de edición.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| actionType | <code>string</code> | Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest. |
| ctx | <code>object</code> | Es el contexto table. |
| $fila | <code>object</code> | Fila que se está editando. |
| $row | <code>object</code> | Son los datos que se cargan. |
| url | <code>string</code> | Url que se añade para llamar  al controller. Añadir, editar o borrar. |
| isDeleting | <code>boolean</code> | Evita mostrar el diálogo de confirmación porque la función _deleteAllSelects() tiene el suyo propio. |

<a name="module_rup.table.inlineEdit..loadAuxForm"></a>

### rup.table.inlineEdit~loadAuxForm(ctx, actionType) ⇒ <code>object</code>
Función que gestiona la carga del formulario del que se obtendrá el parámetro HDIV_STATE en función del tipo de method, POST o PUT.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 5.0.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Contexto del Datatable. |
| actionType | <code>string</code> | Acción a ajecutar en el formulario para ir al controller, basado en REST. |

<a name="module_rup.table.inlineEdit..callFeedbackOk"></a>

### rup.table.inlineEdit~callFeedbackOk(ctx, feedback, msgFeedBack, type)
Llamada para crear el feedback dentro del dialog.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| feedback | <code>object</code> | Div donde se va ejecutar el feedback. |
| msgFeedBack | <code>string</code> | Mensaje para el feedback. |
| type | <code>string</code> | Tipos del feedback, mirar en el rup.feedback.. |

<a name="module_rup.table.inlineEdit.._inResponsiveChangeInputsValues"></a>

### rup.table.inlineEdit~\_inResponsiveChangeInputsValues(ctx, $fila)
Cambiar los valores de los inputs de responsive a normal y viciversa.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | fila que se está editando. |

<a name="module_rup.table.inlineEdit.._asignarInputsValues"></a>

### rup.table.inlineEdit~\_asignarInputsValues(ctx, $fila)
Asignar los valores de los inputs en responsive.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $fila | <code>object</code> | fila que se está editando. |

<a name="module_rup.table.inlineEdit.._createTr"></a>

### rup.table.inlineEdit~\_createTr(dt, ctx, $columns)
Se crear un tr ficticio cuando se va a añadir un registro.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | table |
| ctx | <code>object</code> | Es el contexto de cada tabla. |
| $columns | <code>object</code> | Módelo de columnas de la tabla. |

<a name="module_rup.table.inlineEdit.._drawInLineEdit"></a>

### rup.table.inlineEdit~\_drawInLineEdit(tabla, ctx)
Dibujar los iconos del responsive.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| tabla | <code>object</code> | Api de la tabla |
| ctx | <code>object</code> | Es el contexto de cada tabla. |

<a name="module_rup.table.inlineEdit.._notExistOnPage"></a>

### rup.table.inlineEdit~\_notExistOnPage(ctx) ⇒ <code>boolean</code>
Para saber si hay paginación o no.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Returns**: <code>boolean</code> - si existe paginación o no.  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contexto de cada tabla. |

<a name="module_rup.table.inlineEdit.._deleteAllSelects"></a>

### rup.table.inlineEdit~\_deleteAllSelects(dt)
Metodo que elimina todos los registros seleccionados.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.inlineEdit.._comprobarSeeker"></a>

### rup.table.inlineEdit~\_comprobarSeeker(row, ctx, idRow)
Metodo que comprueba el seeker.

**Kind**: inner method of [<code>rup.table.inlineEdit</code>](#module_rup.table.inlineEdit)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>object</code> | Son los datos que se cargan. |
| ctx | <code>object</code> | Settings object to operate on. |
| idRow | <code>number</code> | Identificador de la fila. |

