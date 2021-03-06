# RUP Table - Multiselecci髇

Permite realizar una selecci贸n m煤ltiple de los registros que se muestran en la tabla.

![Imagen 1](img/rup.table.multiselection_1.png)

## 1. Declaraci髇 y configuraci髇

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor multiselection. La configuraci贸n del plugin se especifica en la propiedad multiselect.

```js
$("#idComponente").rup_table({
  multiselect:{
    // Propiedades de configuraci贸n del plugin multiselection
  }
});
```

## Funcionamiento interno

Para su funcionamiento el plugin de multiselecci贸n del componente RUP Table hace uso de una estructura de datos almacenada mediante `multiselection`.

Se puede acceder a esta estructura mediante la siguiente instrucci贸n:

```js
var ctx = $('#example').rup_table('getContext');
var multiselectionObj = ctx.multiselection;
```
Se puede acceder a los m茅todos de la api del multiSelect:

```js
DataTable.Api().multiSelect.metodoEjemplo()
```

Adem谩s de las propiedades de configuraci贸n asociadas a la configuraci贸n del plugin de multiselecci贸n, se pueden observar las siguientes propiedades:


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

* **numSelected**: n煤mero de registros seleccionados en la tabla.
* **selectedAll**: indica si se han seleccionado todos los elementos de la tabla.
* **selectedIds**: array que almacena los identificadores de los registros *seleccionados*.
* **selectedRowsPerPage**: array que almacena la informaci贸n de los registros *seleccionados* por cada p谩gina.
* **deselectedIds**: array que almacena los identificadores de los registros *deseleccionados*.
* **deselectedRowsPerPage**: array que almacena la informaci贸n de los registros *deseleccionados* por cada p谩gina.
* **lastSelectedId**: identificador con el 煤ltimo registro seleccionado*.
* **accion**: variable para distingir la acci贸n de checkAll, uncheckAll, checkAllPage y uncheckAllPage*.

Existen dos modos de selecci贸n de registros en la tabla:

* Selecci贸n de registros **ordinaria**.
* Selecci贸n de registros **inversa**.

### Selecci贸n de registros ordinaria

En este caso la selecci贸n de registros se realiza de manera normal. Cuando se selecciona un registro de la tabla se:

* Incrementa el contador de la propiedad ``numSelected``.
* Se almacena el 煤ltimo id seleccionado ``lastSelectedId``.

Supongamos el siguiente ejemplo: se accede a la aplicaci贸n y sobre un componente RUP Table con el plugin de multiselecci贸n activado se procede a seleccionar los siguientes registros:

* P谩gina 1, registro de la l铆nea 3 con el id "47"
* P谩gina 1, registro de la l铆nea 6 con el id "56"
* P谩gina 3, registro de la l铆nea 1 con el id "89"
* P谩gina 4, registro de la l铆nea 7 con el id "176"
* P谩gina 4, registro de la l铆nea 8 con el id "201"

Despu茅s de realizar las multiselecci贸n sobre los registros el estado de la estructura ser谩 la siguiente:

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


### Selecci贸n de registros inversa

La selecci贸n inversa se realiza cuando el usuario ha seleccionado todos los registros de la tabla mediante el control correspondiente **selectAll**. En este caso, se almacena la informaci贸n de los registros deseleccionados en vez de los registros seleccionados.

Cuando se deselecciona un registro de la tabla se:

* Disminuye el contador de la propiedad ``numSelected``.
* Se almacena la informaci贸n del registro en las propiedades ``deselected``.

Supongamos el siguiente ejemplo.

Se accede a la aplicaci贸n y sobre un componente RUP Table con el plugin de multiselecci贸n activado.

El n煤mero de registros totales es de 1500 elementos. Se seleccionan todos los registros mediante la opci贸n **selectAll** y se procede a deseleccionar los siguientes registros:

* P谩gina 1, registro de la l铆nea 3 con el id "47"
* P谩gina 1, registro de la l铆nea 6 con el id "56"
* P谩gina 3, registro de la l铆nea 1 con el id "89"
* P谩gina 4, registro de la l铆nea 7 con el id "176"
* P谩gina 4, registro de la l铆nea 8 con el id "201"

Despu茅s de realizar las multiselecci贸n sobre los registros el estado de la estructura ser谩 la siguiente:

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
### Propiedades adicionales

```java
Plugins.multiSelect.DeleteDoubleClick  = true 
```
Por defecto viene a false, y si se activa deja de funcionar la selecci贸n con doble click.

```java
Plugins.multiSelect.hideMultiselect  = true 
```
Por defecto viene a false, y si se activa se ocultan los checks para marcar la multiselecci贸n, aunque la multiselecci贸n sigue funcionando.

```java
Plugins.multiSelect.enableMouseSelection  = false 
```
Por defecto viene a true, y si se activa no se permite seleccionar con el rat贸n.

```java
Plugins.multiSelect.enableKeyboardSelection  = false 
```
Por defecto viene a true, y si se activa no se permite seleccionar con el teclado.