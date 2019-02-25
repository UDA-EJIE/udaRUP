# RUP dataTable - Select

Permite realizar una selecci�n m� simple de los registros que se muestran en la tabla.

![Imagen 1](img/select.png)

## 1. Declaraci�n y configuraci�n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor select. La configuraci�n del plugin se especifica en la propiedad select.

```js
$("#idComponente").rup_datatable({
  select:{
    // Propiedades de configuraci�n del plugin select
  }
});
```

## Funcionamiento interno

Para su funcioanmiento el plugin de multiseleccion del componente RUP Table hace uso de una estrcutura de datos almacenada mediante ```multiselection```. Comparte objeto con el plugin de multiselection.

Se puede acceder a esta estructura mediante la siguiente instrucci�n.

```js
var table = $('#example').DataTable();
var multiselectionObj = table.context[0].multiselection;
```
Se puede acceder a los m�todos de la api del Select
``DataTable.Api().select.metodoEjemplo()`

Adem�s de las propiedades de configuraci�n asociadas a la configuraci�n del plugin de select se pueden observar las siguientes propiedades.


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

En este plugin solo hay 1 seleccionado. 

### Selecci�n de registros ordinaria

En este caso, la selecci�n de registros se realiza de manera normal. Cuando se selecciona un registro de la tabla se:

* Incrementa el contador de la propiedad ``numSelected``.
* Se almacena el �ltimo id seleccionado ``lastSelectedId``.