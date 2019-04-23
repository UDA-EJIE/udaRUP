# RUP dataTable - Botones

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración

Declaramos la botonera dentro del método de inicialización del *rup_datatable* en el fichero __rup.datatable.js__:

```js
  // Toolbar por defecto del datatable
  new $.fn.dataTable.Buttons(
  	tabla,
  	DataTable.Buttons.defaults.buttons
  ).container().insertBefore($('#table_filter_form'));
```

Una vez tenemos la botonera declarada le podemos añadir botones declarándolos en el siguiente objeto ubicado dentro del fichero __dataTables.buttons.js__ o mediante la creación de uno personalizado:

```js
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
			className: 'dt-button',
			active: 'active',
			disabled: 'disabled'
		},
		buttonLiner: {
			tag: 'span',
			className: ''
		}
	}
};
```
Propiedades del plugin de buttons:

* myButtons -> Permite crear un array con los botones personalizados que el usuario quiera ejemplo:

``` js
				var optionButtonEdit = {
						text: function (dt) {
							return 'Editar con MultiPart';
						},
						id: 'exampleeditMultiPart_1', // Campo obligatorio si se quiere usar desde el contextMenu
						className: 'datatable_toolbar_btnEdit',
						displayRegex: /^[1-9][0-9]*$/, 
						// Se muestra siempre que sea un numero mayor a 0, cualquier reggex para la multiseleción
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
				$('#example').rup_datatable(plugins);
````
Propiedades del plugin de buttons:
* myButtons -> Permite crear un array con los botones personalizados que el usuario quiera ejemplo:

````
var optionButtonEdit = {
						text: function (dt) {
							return 'Editar con MultiPart';
						},
						id: 'exampleeditMultiPart_1', // Campo obligatorio si se quiere usar desde el contextMenu
						className: 'datatable_toolbar_btnEdit',
						displayRegex: /^[1-9][0-9]*$/, 
						// Se muestra siempre que sea un numero mayor a 0, cualquier reggex para la multiseleción
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
				$('#example').rup_datatable(plugins);

````
Propiedades del propio botón:
		id: // Campo obligatorio si se quiere usar desde el contextMenu
		icon: //campo para asignar algún icono. Ejemplo, "fa-file-excel-o"
		displayRegex: props.regex, // Se muestra siempre que sea un numero positivo o neutro, es el regex para mostrar el botón 								tirando contra la popiedad de multiseleción
		insideContextMenu: // Independientemente de este valor, sera 'false' si no tiene un id definido, sirve para meter el 							botón en el contextMenu
		custom: // todos los botones deben ir con está propiedad a true, a menos que se quiere usar el displayRegex con la 			propiedade multiseleción.
		
* report -> Esta propiedad es para configurar los reports, a su vez tiene varios paraámetros de configuración:
		reportsParams: puedes personalizar cualquier parámetro para que le llegue a tu controller, ejemplo:
        reportsParams: puedes personalizar cualquier parámetro para que le llegue a tu controller, ejemplo:
````
plugins.buttons.report.reportsParams.push({"isInline":false});
````
En el controller:
````
	@RequestMapping(value="pdfReport")
		public ModelAndView generarPDFJasperReport(@ModelAttribute Usuario filterUsuario, 
		@ModelAttribute TableRequestDto jqGridRequestDto,
		ModelMap modelMap,
		@RequestParam(value = "isInline", required = false) boolean isInline){		
		//Acceso a BD para recuperar datos
		List<Usuario> usuarios = this.jqGridUsuarioService.findAll(new Usuario(), null);		
		//Generación del PDF
		return new ModelAndView("pdfUsuario", modelMap);
    	}

````
title: El título que lleva el popup al descargar.
	message: El mensaje que lleva el popup al descargar.
	Ejemplo:
```
plugins.buttons.report.title = "Descargar Informe Personalizado";

```

*blackListButtons -> Es la lista para que no salgan los botones predefinidos, los botones son:
"addButton", "editButton", "cloneButton", "deleteButton", "reportsButton"
'copyButton','excelButton','pdfButton','odsButton','csvButton'

Ejemplo:
````
plugins.buttons.blackListButtons = ['csvButton'];
````