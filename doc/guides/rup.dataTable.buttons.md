# RUP dataTable - Botones

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración y configuración

El uso del plugin en el componente puede realizarse de dos maneras:

- La primera sería mediante la definición de las propiedades del botón siendo la función 'action' la encargada de toda la lógica.

```js
  $('#idComponente').rup_dataTable({
    buttons: [
      {
        displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
        type: 'add',
        action: function (e, dt, node, config) {
          DataTable.Api().buttons.actions(dt, config);
        }
      }
    ]
  });
```

- La segunda en cambio hace uso de un botón predefinido.

```js
$('#idComponente').rup_dataTable({
  buttons: [
  	'copyCustom'
  ]
});
```

## 2. Ejemplo de uso

A continuación se va a mostrar un ejemplo de definición de un caso complejo de las opciones del toolbar:

```js
$('#idComponente').rup_dataTable({
  buttons: [
    {
    	text: function (dt) {
    		return dt.i18n( 'toolbar.add', 'Add' );
    	},
    	id: 'addButton_1',
    	className: 'datatable_toolbar_btnAdd',
    	displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
    	insideContextMenu: true,
    	type: 'add',
    	action: function (e, dt, node, config) {
    		DataTable.Api().buttons.actions(dt, config);
    	}
    },
    {
      text: function (dt) {
      	return dt.i18n( 'toolbar.edit', 'Editar' );
      },
      id: 'editButton_1',
      className: 'datatable_toolbar_btnEdit',
      displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
      insideContextMenu: true,
      type: 'edit',
      action: function (e, dt, node, config) {
      	DataTable.Api().buttons.actions(dt, config);
      }
    },
    {
      text: function (dt) {
      	return dt.i18n( 'toolbar.clone', 'Clonar' );
      },
      id: 'cloneButton_1',
      className: 'datatable_toolbar_btnClone',
      displayRegex: /^1$/, // Se muestra solo cuando sea igual a 1
      insideContextMenu: true,
      type: 'clone',
      action: function (e, dt, node, config) {
      	DataTable.Api().buttons.actions(dt, config);
      }
    },
    {
      text: function (dt) {
      	return dt.i18n( 'toolbar.delete', 'Eliminar' );
      },
      id: 'deleteButton_1',
      className: 'datatable_toolbar_btnDelete',
      displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
      insideContextMenu: true,
      type: 'delete',
      action: function (e, dt, node, config) {
      	DataTable.Api().buttons.actions(dt, config);
      }
    },
    {
      extend: 'collection',
      text: function (dt) {
      	return dt.i18n( 'toolbar.reports.main', 'Informes' );
      },
      id: 'informes_01',
      className: 'align-right',
      displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
      autoClose: true,
      type: 'reports',
      buttons: [
      	'copyCustom'
      ]
    }
  ]
});
```

A partir del código anterior se genera lo siguiente:

* Una botonera con cinco botones. Los cuatro primeros son botones simples con una función, en cambio el quinto, es una colección de botones que serán mostrados al pulsar sobre el.
