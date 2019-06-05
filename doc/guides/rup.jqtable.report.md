# RUP jqTable - Reporting

Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.

![Imagen 1](img/rup.jqtable.reporting_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor “report”. La configuración del plugin se especifica en la propiedad report.

```js
$("#idComponente").rup_jqtable({
  url: "../jqGridUsuario",
  usePlugins:["report"],
  report:{
    // Propiedades de configuración del plugin report
  }
});
```
> La configuración avanzada se detalla en la guía de uso del patrón Report, así como la implementación necesaria en el lado de servidor.
