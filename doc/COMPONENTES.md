# Migración código

La versión v3.x de UDA conlleva una serie de actualizaciones en las librerías js de que depende.

Debido a esto es posible que se producan problemas de compatibilidad con el código existente en la aplicación.

Los problemas en su mayoría pueden ser debidos a modificaciones en el API de las librerías js, refactorizaciones, modificaciones de estilos...

En el caso de que desde las aplicaciones se haya hecho uso de el API de los componentes RUP y **no directamente de la API de los plugins subyacentes** se garantizará la compatibilidad en su mayor medida.

Aún así es posible que se presenten problemas a la hora de actualizar el código.

Se han identificado una serie de problemas principales que deben de tenerse en cuenta al migrar las aplicaciones.

## jQuery

La versión de jQuery utilizada ha pasado de la versión v1.8.0 a la v1.12.4.

En las diversas actualizaciones de la libería se han añadido, aliminado y modificado funcionalidades, opciones de configruación y API.

Los componentes RUP se han adaptado a estas modificaciones para trabajar de acuerdo a lo que dicta la versión 1.12.4 de jQuery.

Sin embargo es posible que el código desarrollado por parte de las aplicaciónes se vea afectado por estos cambios.

**Es imprescindible por parte de las aplicaciones** el acometer las modificaciones necesarias para garantizar el correcto funcionamiento de las mismas.

Las guias de actualización de las diferentes versiones de jQuery pueden consultarse en la siguiente url.

[jQuery UI Upgrade Guides](https://jqueryui.com/upgrade-guide/)

Desde jQuery se proporciona un plugin que facilita la migración de aplicaciones a versiónes superiores de jQuery 1.9.

Este plugin **solo** debe emplearse para detectar el código obsoleto que debe de ser reemplazado, **nunca** debería de emplarse en versiones productivas de las aplicaciones.

[jQuery Migrate](https://plugins.jquery.com/migrate/)

## jQueryUI

Del mismo modo que con la librería jQuery, se deberá de actualizar el código de la aplicación para garantizar la compatibilidad con la nueva versión de jQueryUI.

Las guias de actualización correspondientes a la librería jQueryUI se pueden consultar mediante el siguiente enlace.

[jQuery UI Upgrade Guides](https://jqueryui.com/upgrade-guide/)

## Componentes RUP


### Dialog

Debido a modificaciones realizadas en el Widget Tabs de JQueryUI no se permite en adelante realizar la incialización de un componente RUP Dialog directamente sobre el selector ```$(document)```.

```js
$(document).rup_dialog(

);

```

Deberá realizarse siempre sobre un elemento del DOM.

```js
$("idDialogo").rup_dialog(

);

```
