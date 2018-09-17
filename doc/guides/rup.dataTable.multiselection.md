# RUP dataTable - Multiselection

Permite realizar una selecci�n m�ltiple de los registros que se muestran en la tabla.

![Imagen 1](img/rup.datatable.multiselection_1.png)

## 1. Declaraci�n y configuraci�n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor multiselection. La configuraci�n del plugin se especifica en la propiedad multiselect.

```js
$("#idComponente").rup_datatable({
  url: "../jqGridUsuario",
  usePlugins:["multiselection"],
  multiselect:{
    // Propiedades de configuraci�n del plugin multiselection
  }
});
```

## Funcionamiento interno

Para su funcioanmiento el plugin de multiseleccion del componente RUP Table hace uso de una estrcutura de datos almacenada mediante ```multiSelect.multiselection```.

Se puede acceder a esta estructura mediante la siguiente instrucci�n.

```js
var multiselectionObj = DataTable.multiSelect.multiselection;
```
Se puede acceder a los m�todos de la api del multiSelect
``DataTable.Api().multiSelect.metodoEjemplo()`

Adem�s de las propiedades de configuraci�n asociadas a la configuraci�n del plugin de multiselecci�n se pueden observar las siguientes propiedades.


```js
{
  deselectedIds: [],
  deselectedRowsPerPage: [],
  numSelected:0,
  selectedAll: false,
  selectedIds: [],
  selectedRowsPerPage: [],
  lastSelectedId :0,
  accion:''
}
```

La funci�n de cada propiedad es la siguiente:

* **numSelected**: N�mero de registros seleccionados en la tabla.
* **selectedAll**: Indica si se han seleccionado todos los elementos de la tabla.
* **selectedIds**: Array que almacena los identificadores de los registros *seleccionados*.
* **selectedRowsPerPage**: Array que almacena la informaci�n de los registros *seleccionados* por cada p�gina.
* **deselectedIds**: Array que almacena los identificadores de los registros *deseleccionados*.
* **deselectedRowsPerPage**: Array que almacena la informaci�n de los registros *deseleccionados* por cada p�gina.
* **lastSelectedId**: -identificador con el �ltimo registro seleccionado*.
* **accion**: Variable para distingir la acci�n de checkAll, uncheckAll, checkAllPage y uncheckAllPage*.

Existen dos modos de selecci�n de registros en la tabla.

* Selecci�n de registros **ordinaria**.
* Selecci�n de registros **inversa**.

### Selecci�n de registros ordinaria

En este caso la selecci�n de registros se realiza de manera normal. Cuando se selecciona un registro de la tabla se:

* Incrementa el contador de la propiedad ``numSelected``.
* Se almacena el �ltimo id seleccionado ``lastSelectedId``.

Supongamos el siguiente ejemplo.

Se accede a la aplicaci�n y sobre un componente RUP Table con el plugin de multiselecci�n activado se procede a seleccionar los siguientes registros:

* Pagina 1, registro de la l�nea 3 con el id "47"
* Pagina 1, registro de la l�nea 6 con el id "56"
* Pagina 3, registro de la l�nea 1 con el id "89"
* Pagina 4, registro de la l�nea 7 con el id "176"
* Pagina 4, registro de la l�nea 8 con el id "201"

Despu�s de realizar las multiselecci�n sobre los registros el estado de la estructura ser� la siguiente:

```js
{
  deselectedIds: [],
  deselectedRowsPerPage: [],
  numSelected: 5,
  selectedAll: false,
  selectedIds: ["47","56","89","176","201"],
  selectedRowsPerPage: [
   {id:57,page:1,line:3},
   {id:56,page:1,line:6},
   {id:89,page:3,line:1},
   {id:176,page:4,line:7},
   {id:201,page:4,line:8}
  ]
}
```


### Selecci�n de registros inversa

La selecci�n inversa se realiza cuando el usuario ha seleccionado todos los registros de la tabla mediante el control correspondiente **selectAll**. En este caso, se almacena la informaci�n de los registros deseleccionados en vez de los registros seleccionados.

Cuando se deselecciona un registro de la tabla se:

* Disminuye el contador de la propiedad ``numSelected``.
* Se almacena la informaci�n del registro en las propiedades ``deselected``.

Supongamos el siguiente ejemplo.

Se accede a la aplicaci�n y sobre un componente RUP Table con el plugin de multiselecci�n activado.

El número de registros totales es de 1500 elementos. Se seleccionan todos los registros mediante la opción **selectAll** y se procede a deseleccionar los siguientes registros:

* Pagina 1, registro de la l�nea 3 con el id "47"
* Pagina 1, registro de la l�nea 6 con el id "56"
* Pagina 3, registro de la l�nea 1 con el id "89"
* Pagina 4, registro de la l�nea 7 con el id "176"
* Pagina 4, registro de la l�nea 8 con el id "201"

Después de realizar las multiselección sobre los registros el estado de la estructura será la siguiente:

```js
{
  deselectedIds: ["47","56","89","176","201"],
   deselectedRowsPerPage: [
   {id:57,page:1,line:3},
   {id:56,page:1,line:6},
   {id:89,page:3,line:1},
   {id:176,page:4,line:7},
   {id:201,page:4,line:8}
  ],
  numSelected: 1495,
  selectedAll: true,
  selectedIds: ["47","56","89","176","201"],
  selectedLinesPerPage: [],
  selectedPages: [],
  selectedRows: [],
  selectedRowsPerPage: []
}
```
