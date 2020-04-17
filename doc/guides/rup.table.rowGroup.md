# RUP Table - Agrupar filas

Permite establecer grupos en las filas de la tabla y colocar una cabecera tanto arriba de los grupos como abajo de los mismos.

![Imagen 1](img/rup.table.rowGroup_1.png)

## 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor rowGroup. La configuración del plugin se especifica en la propiedad rowGroup.

```js
$("#idComponente").rup_table({
  rowGroup:{
    // Propiedades de configuración del plugin colReorder
  }
});
```

## 2. API

Es posible que en algún momento sea necesario ocultar o mostrar grupos de manera programática.

El único campo que será imprescindible es el contexto y se usará para saber con que tabla se desea operar. Este puede ser obtenido de la siguiente manera:
```js
var ctx = $("#example").rup_table("getContext"); // Sustituir example por el id de la tabla
```

Por ejemplo, si se desea expandir o colapsar todas los grupos, sería tan sencillo como hacer alguna de las siguientes llamadas:
```js
$.fn.DataTable.Api().rowGroup().expand(ctx); // Expande todos los grupos

$.fn.DataTable.Api().rowGroup().collapse(ctx); // Colapsa todos los grupos
```

En cambio, si se quiere expandir o colapsar un grupo en concreto, también hará falta enviarle la posición:
```js
$.fn.DataTable.Api().rowGroup().expand(ctx, 0); // Expande el primer grupo

$.fn.DataTable.Api().rowGroup().collapse(ctx, 0); // Colapsa el primer grupo
```