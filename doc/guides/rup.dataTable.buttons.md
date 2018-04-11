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

Toda la lógica de los botones la podemos encontrar en el fichero __buttons.custom.js__. En caso de necesitar crear nuevo botones deberemos hacerlo dentro de este fichero.
