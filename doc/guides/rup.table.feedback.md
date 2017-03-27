# RUP Table - Feedback

Permite configurar un área para informar al usuario de cómo interactuar con el componente.

Mediante elcomponente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.

![Imagen 1](img/rup.table.feedback_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor “feedback”. La configuración del plugin se especifica en la propiedad feedback.

```js
$("#idComponente").rup_table({
  url: "../jqGridUsuario",
  usePlugins:["feedback"],
  feedback:{
  // Propiedades de configuración del plugin feedback
  }
});
```
