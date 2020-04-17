# RUP Table - Edición en formulario

Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra
dentro de un diálogo y ofrece las siguientes funcionalidades:

* Añadir un nuevo registro o modificar uno ya existente.
* Cancelar la inserción o edición de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre los diferentes elementos.

![Imagen 1](img/rup.table.formEdit_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor formEdit. La configuración del plugin se especifica en la propiedad formEdit.

```js
$("#idComponente").rup_table({
  formEdit:{
  // Propiedades de configuración del plugin formEdit
  }
});
```
### Propiedades adicionales

```java
Plugins.formEdit.cancelDeleteFunction   = function () {
                   							 console.log('Ha cancelado eliminar.');
               								 } 
```java

Permite personalizar una función a la hora de cancelar, cuando se va a borrar los registros de la tabla.