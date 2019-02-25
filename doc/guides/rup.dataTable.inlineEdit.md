# RUP dataTable - Edici�n en linea

Permite la edici�n de los registros de la tabla utilizando un formulario dentro de la tabla. El formulario se muestra
dentro de una fila y ofrece las siguientes funcionalidades:

* A�adir un nuevo registro o modificar uno ya existente.
* Cancelar la inserci�n o edici�n de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas �gil sobre los diferentes elementos.

![Imagen 1](img/edicionEnLinea.png)

# 1. Declaraci�n y configuraci�n

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor inlineEdit. La configuraci�n del plugin se especifica en la propiedad inlineEdit.

```js
$("#idComponente").rup_datatable({
  inlineEdit:{
  // Propiedades de configuraci�n del plugin inlineEdit
  }
});
```
