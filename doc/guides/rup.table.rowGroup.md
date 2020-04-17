# RUP Table - Agrupar filas

Permite establecer grupos en las filas de la tabla y colocar una cabecera tanto arriba de los grupos como abajo de los mismos.

![Imagen 1](img/rup.table.rowGroup_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor rowGroup. La configuración del plugin se especifica en la propiedad rowGroup.

```js
$("#idComponente").rup_table({
  rowGroup:{
  // Propiedades de configuración del plugin colReorder
  }
});

# 2. Métodos Públicos

rowGroup().dataSrc() -> Obtiene / configura los datos.

rowGroup().disable() -> Deshabilita los rowGroup.

rowGroup().enable() -> Habilita los rowGroup.

rowGroup().enabled() -> Determina si un grupo está habilitado.

rowGroup().expand () -> Expande el grupo.

rowGroup().collapse() -> Colapsa el grupo.

