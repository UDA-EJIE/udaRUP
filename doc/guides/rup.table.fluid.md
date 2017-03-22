# RUP Table - Diseño líquido

Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor “fluid”. La configuración del plugin se especifica en la propiedad fluid.

```js
$("#idComponente").rup_table({
  url: "../jqGridUsuario",
  usePlugins:["fluid"],
  fluid:{
  // Propiedades de configuración del plugin fluid
  }
});
```
