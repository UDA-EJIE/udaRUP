# RUP jqTable - Jerarquía

El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.

![Imagen 1](img/rup.jqtable.jerarquia_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente, se realiza incluyendo en el array de la propiedad usePlugins el valor “jerarquia”. La configuración del plugin se especifica en la propiedad jerarquia.

```js
$("#idComponenteMaestro").rup_jqtable({
  url: "../jqGridUsuarioMaestro",
});

$("#idComponenteDetalle").rup_jqtable({
  url: "../jqGridUsuarioDetalle",
  usePlugins:["jerarquia"],
  jerarquia:{
  // Propiedades de configuración del plugin jeararquia
  }
});
```
