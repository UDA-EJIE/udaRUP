# RUP Table - Botones

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en la configuración de inicialización la propiedad `buttons`.

```js
$("#idComponente").rup_table({
	buttons: {
		activate: true,
		blackListButtons: ['deleteButton', 'reportsButton'],
		contextMenu: true,
		myButtons: [{
			text: function () {
				return $.rup.i18n.app.iberdokTable.ver;
			},
			id: 'iberdokTableVerDocumento', // Campo obligatorio si se quiere usar desde el contextMenu
			className: 'btn-material-primary-high-emphasis table_toolbar_btnView',
			icon: "mdi-file-find",
			display: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
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
* __display:__ controla la visibilidad del botón. Acepta una expresión regular o una función que recibe el contexto de la tabla (ctx) y retorna true/false. Por ejemplo:
	``` js
	// Con expresión regular
	display: /^[1-9][0-9]*$/  // Se muestra siempre que sea un numero mayor a 0
	
	// Con función
	display: function(ctx) {
		return ctx.multiselection.numSelected === 1;
	}
	```
* __displayRegex:__ ⚠️ **DEPRECADO** - Usar `display` en su lugar. Expresión regular para mostrar el botón.
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
* __custom:__ todos los botones deben ir con esta propiedad a `true`, a menos que se quiere usar la propiedad `display` con la propiedad de multiselección.
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
* __insertAfter__ Propiedad que permite insertar antes del formulario de filtrado los botones, por defecto si no se pone nada, se insertan después del formulario de filtrado:
	``` js
	plugins.buttons.insertAfter = true;
	```

### Ejemplos de uso de display

**Con expresión regular:**
```js
buttons: {
	activate: true,
	add: {
		display: /^\d+$/  // Se muestra siempre que sea un numero positivo o neutro
	},
	edit: {
		display: /^[1-9][0-9]*$/  // Se muestra siempre que sea un numero mayor a 0
	},
	clone: {
		display: /^1$/  // Se muestra solo cuando sea igual a 1
	}
}
```

**Con función:**
```js
buttons: {
	activate: true,
	add: {
		display: function(ctx) {
			return ctx.multiselection.numSelected >= 0;
		}
	},
	edit: {
		display: function(ctx) {
			return ctx.multiselection.numSelected > 0;
		}
	},
	delete: {
		display: function(ctx) {
			return ctx.multiselection.numSelected > 0 && window.userPermissions.canDelete;
		}
	}
}
```

**Propiedades disponibles en ctx:**
- `ctx.multiselection.numSelected`: Número de filas seleccionadas
- `ctx.multiselection.selectedIds`: Array de IDs seleccionados
- `ctx.multiselection.selectedAll`: Boolean indicando si todas las filas están seleccionadas
- `ctx.json`: Datos JSON de la respuesta del servidor
- `ctx.oInit`: Configuración inicial de la tabla
		
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
