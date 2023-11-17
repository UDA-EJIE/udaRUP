# RUP Table - Botones

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en la configuración de inicialización la propiedad `buttons`.

```js
$("#idComponente").rup_table({
	buttons: {
		activate: true,
		blackListButtons: ['deleteButton', 'reportsButton'],
		contextMenu: true
		myButtons: [{
			text: function () {
				return $.rup.i18n.app.iberdokTable.ver;
			},
			id: 'iberdokTableVerDocumento', // Campo obligatorio si se quiere usar desde el contextMenu
			className: 'btn-material-primary-high-emphasis table_toolbar_btnView',
			icon: "mdi-file-find",
			displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
			insideContextMenu: true, // Independientemente de este valor, sera 'false' si no tiene un id definido
			type: 'view',
			init: function (dt, node, config) {
				$('#' + idComponente).triggerHandler('tableButtonsExampleInit');
			},
			action: function () {
				fnAbrirDocumento();
			}
		}]
	}
});
```

Propiedades del propio botón:
* __id:__ campo obligatorio si se quiere usar desde el contextMenu.
* __icon:__ campo para asignar algún icono. Por ejemplo, `mdi-file-excel`.
* __displayRegex:__ se muestra siempre que sea un número positivo o neutro, es el regex para mostrar el botón tirando contra la popiedad de multiselección.
* __insideContextMenu:__ sirve para insertar el botón en el contextMenu. Independientemente de este valor, será `false` si no tiene un identificador definido.
* __size:__ permite aumentar el tamaño o disminuirlo. El valor de la propiedad `lg` los hace más grandes y `sm` más pequeños. Por ejemplo:
	``` js
	plugins.buttons.size = 'lg'
	```
* __request:__ define parámetros de la petición, como por ejemplo:
	``` js
	request: {
		url: '/xlsxReport',
		method: 'POST',
		contentType: 'application/json',
		dataType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		reportsExportAllColumns: false,
		fileName: 'x21aExcel',
		sheetTitle: 'Usuario'
	}
	```
* __custom:__ todos los botones deben ir con esta propiedad a `true`, a menos que se quiere usar la propiedad `displayRegex` con la propiedad de multiselección.
* __blackListButtons:__ lista dónde se definen los botones predefinidos que no deben de ser mostrados. La lista completa de botones predefinidos es: `'addButton'`, `'editButton'`, `'cloneButton'`, `'deleteButton'`, `'reportsButton'`, `'copyButton'`, `'excelButton'`, `'pdfButton'`, `'odsButton'`, `'csvButton'`. Por ejemplo:
	``` js
	plugins.buttons.blackListButtons = ['csvButton'];
	```	
* __contexMenu__ Propiedad que permite activar o desactivar el contextMenu de la tabla, en caso de no estar definida estará activa por defecto:
	``` js
	plugins.buttons.contextMenu = true;
	```
* __report:__ alberga el título y mensaje del popup de descarga, el listado de columnas que se desee exportar y parámetros adicionales que llegarán al controller:
	``` js
	plugins.buttons.report = {
		title: 'Exportación (título personalizado)',
		message: 'Su archivo está siendo generado... (mensaje personalizado)',
		columns: ["id", "nombre", "apellido1", "ejie", "fechaAlta"],
		reportsParams: {
			"isInline": false
		}
	};
	```
Ejemplo del controller:
``` java
@RequestMapping(value = {"/xlsReport" , "/xlsxReport"}, method = RequestMethod.POST, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
protected @ResponseBody void generateExcelReport(
		@RequestJsonBody(param = "filter", required = false) Usuario filterUsuario, 
		@RequestJsonBody(param = "columns", required = false) String[] columns, 
		@RequestJsonBody(param = "columnsName", required = false) String[] columnsName, 
		@RequestJsonBody(param = "fileName", required = false) String fileName, 
		@RequestJsonBody(param = "sheetTitle", required = false) String sheetTitle,
		@RequestJsonBody(param = "reportsParams", required = false) ArrayList<?> reportsParams,
		@RequestJsonBody TableRequestDto tableRequestDto,
		HttpServletRequest request,
		HttpServletResponse response) throws ServletException {
	TableUsuarioController.logger.info("[POST - generateExcelReport] : Devuelve un fichero excel");
	// Idioma
	Locale locale = LocaleContextHolder.getLocale();
	this.tableUsuarioService.generateReport(filterUsuario, columns, columnsName, fileName, sheetTitle, reportsParams, tableRequestDto, locale, request, response);
}
```

## 2. API

Es posible que en algún momento sea necesario eliminar registros de manera programática. Para ello, es posible realizarlo de la siguiente manera:
```js
var dt = $('#example').DataTable();

$.fn.DataTable.Api().buttons.deleteNotForm(dt);
```
