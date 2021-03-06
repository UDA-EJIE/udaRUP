# RUP Table - Selecci髇

Permite realizar una selecci贸n simple de los registros que se muestran en la tabla.

![Imagen 1](img/select.png)

## 1. Declaraci贸n y configuraci贸n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor select. La configuraci贸n del plugin se especifica en la propiedad select.

```js
$("#idComponente").rup_table({
  select:{
    // Propiedades de configuraci贸n del plugin select
  }
});
```

## Funcionamiento interno

Para su funcioanmiento el plugin de multiseleccion del componente RUP Table hace uso de una estrcutura de datos almacenada mediante `multiselection`. Comparte objeto con el plugin de multiselection.

Se puede acceder a esta estructura mediante la siguiente instrucci贸n.

```js
var ctx = $('#example').rup_table('getContext');
var multiselectionObj = ctx.multiselection;
```
Se puede acceder a los m茅todos de la api del Select

```js
DataTable.Api().select.metodoEjemplo()
```

Adem谩s de las propiedades de configuraci贸n asociadas a la configuraci贸n del plugin de select se pueden observar las siguientes propiedades.


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

La funci贸n de cada propiedad es la siguiente:

* **numSelected**: N贸mero de registros seleccionados en la tabla.
* **selectedAll**: Indica si se han seleccionado todos los elementos de la tabla.
* **selectedIds**: Array que almacena los identificadores de los registros *seleccionados*.
* **selectedRowsPerPage**: Array que almacena la informaci贸n de los registros *seleccionados* por cada p谩gina.
* **deselectedIds**: Array que almacena los identificadores de los registros *deseleccionados*.
* **deselectedRowsPerPage**: Array que almacena la informaci贸n de los registros *deseleccionados* por cada p谩gina.
* **lastSelectedId**: -identificador con el 贸ltimo registro seleccionado*.
* **accion**: Variable para distingir la acci贸n de checkAll, uncheckAll, checkAllPage y uncheckAllPage*.

En este plugin solo hay 1 seleccionado. 

### Selecci贸n de registros ordinaria

En este caso, la selecci贸n de registros se realiza de manera normal. Cuando se selecciona un registro de la tabla se:

* Incrementa el contador de la propiedad ``numSelected``.
* Se almacena el 煤ltimo id seleccionado ``lastSelectedId``.