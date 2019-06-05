# RUP Table - Edición en linea

Permite la edición de los registros de la tabla utilizando un formulario dentro de la tabla. El formulario se muestra
dentro de una fila y ofrece las siguientes funcionalidades:

* Añadir un nuevo registro o modificar uno ya existente.
* Cancelar la inserción o edición de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre los diferentes elementos.

![Imagen 1](img/edicionEnLinea.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor inlineEdit. La configuración del plugin se especifica en la propiedad inlineEdit.

```js
$("#idComponente").rup_table({
  inlineEdit:{
  // Propiedades de configuración del plugin inlineEdit
  }
});
```
