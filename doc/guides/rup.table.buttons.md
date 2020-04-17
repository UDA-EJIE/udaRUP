# RUP Table - Botones

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración

Declaramos la botonera dentro del método de inicialización del *rup_table* en el fichero __rup.table.js__:

``` js
  // Toolbar por defecto del table
  new $.fn.dataTable.Buttons(
  	tabla,
  	DataTable.Buttons.defaults.buttons
  ).container().insertBefore($('#table_filter_form'));
```

Una vez tenemos la botonera declarada le podemos añadir botones declarándolos en el siguiente objeto ubicado dentro del fichero __table.buttons.js__ o mediante la creación de uno personalizado:

``` js
Buttons.defaults = {
	buttons: [ 'addButton', 'editButton', 'cloneButton', 'deleteButton', 'reportsButton' ],
	name: 'main',
	tabIndex: 0,
	dom: {
		container: {
			tag: 'div',
			className: 'dt-buttons'
		},
		collection: {
			tag: 'div',
			className: 'dt-button-collection'
		},
		button: {
			tag: 'button',
			className: 'btn-material btn-material-primary-high-emphasis',
			active: 'active',
			disabled: 'disabledButtonsTable'
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		}
	}
};
```
Propiedades del plugin de buttons:

* myButtons -> Permite crear un array con los botones personalizados que el usuario quiera, por ejemplo:
	``` js
	var optionButtonEdit = {
		text: function (dt) {
			return 'Editar con MultiPart';
		},
		id: 'exampleeditMultiPart_1', // Campo obligatorio si se quiere usar desde el contextMenu
		className: 'table_toolbar_btnEdit',
		displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un número mayor a 0, cualquier regex para la multiselección
		insideContextMenu: true, // Independientemente de este valor, sera 'false' si no tiene un id definido
		type: 'edit',
		init: function (dt, node, config) {
			//init del botón
		},
		action: function (e, dt, node, config) {
			var ctx = dt.context[0];
			dt.buttons.actions(dt, config);
		}
	};

	var	buttons = {};
	var plugins = {};
	plugins.buttons = buttons;
	plugins.buttons.myButtons = []; 
	plugins.buttons.myButtons.push(optionButtonEdit);
	
	$('#example').rup_table(plugins);
	```

Propiedades del propio botón:
* __id:__ Campo obligatorio si se quiere usar desde el contextMenu.
* __icon:__ Campo para asignar algún icono. Por ejemplo, "mdi-file-excel".
* __displayRegex:__ Se muestra siempre que sea un número positivo o neutro, es el regex para mostrar el botón tirando contra la popiedad de multiselección.
* __insideContextMenu:__ Independientemente de este valor, sera 'false' si no tiene un id definido, sirve para meter el botón en el contextMenu.
* __size:__ Permite aumentar el tama�o o disminuirlo. El valor de la propiedad �lg� los hace m�s grandes y �sm� m�s peque�os. Por ejemplo:
	```` js
	plugins.buttons.size = 'lg'
	````
* __request:__ Define parametros de la petición, como por ejemplo:
	```` js
	request: {
		url: '/xlsxReport',
		method: 'POST',
		contentType: 'application/json',
		dataType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		reportsExportAllColumns: false,
		fileName: 'x21aExcel',
		sheetTitle: 'Usuario'
	}
	````
* __custom:__ Todos los botones deben ir con está propiedad a true, a menos que se quiere usar el displayRegex con la propiedad de multiselección.
* __blackListButtons:__ Lista donde se definen los botones predefinidos que no deben de ser mostrados. La lista completa de botones predefinidos es: 'addButton', 'editButton', 'cloneButton', 'deleteButton', 'reportsButton', 'copyButton', 'excelButton', 'pdfButton', 'odsButton', 'csvButton'
	Por ejemplo:
	```` js
	plugins.buttons.blackListButtons = ['csvButton'];
	````
* __report:__ Alberga el título y mensaje del popup de descarga, el listado de columnas que se desee exportar y parámetros adicionales que llegarán al controller:
	```` js
	plugins.buttons.report = {
		title: 'Exportación (título personalizado)',
		message: 'Su archivo está siendo generado... (mensaje personalizado)',
		columns: ["id", "nombre", "apellido1", "ejie", "fechaAlta"],
		reportsParams: {
			"isInline": false
		}
	};
	````
Ejemplo del controller:
```` java
	@RequestMapping(value = {"/xlsReport" , "/xlsxReport"}, method = RequestMethod.POST, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	protected @ResponseBody void generateExcelReport(
			@RequestJsonBody(param = "filter", required = false) Usuario filterUsuario, 
			@RequestJsonBody(param = "columns", required = false) String[] columns, 
			@RequestJsonBody(param = "fileName", required = false) String fileName, 
			@RequestJsonBody(param = "sheetTitle", required = false) String sheetTitle,
			@RequestJsonBody(param = "reportsParams", required = false) ArrayList<?> reportsParams,
			@RequestJsonBody TableRequestDto tableRequestDto,
			HttpServletRequest request,
			HttpServletResponse response) throws ServletException{
		TableUsuarioController.logger.info("[POST - generateExcelReport] : Devuelve un fichero excel");
		// Idioma
        Locale locale = LocaleContextHolder.getLocale();
		this.tableUsuarioService.generateReport(filterUsuario, columns, fileName, sheetTitle, reportsParams, tableRequestDto, locale, request, response);
    }

````
