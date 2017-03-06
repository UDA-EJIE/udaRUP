# Migración código

La versión v3.x de UDA conlleva una serie de actualizaciones en las librerías js de que depende.

Debido a esto es posible que se producan problemas de compatibilidad con el código existente en la aplicación.

Los problemas en su mayoría pueden ser debidos a modificaciones en el API de las librerías js, refactorizaciones, modificaciones de estilos...

En el caso de que desde las aplicaciones se haya hecho uso de el API de los componentes RUP y **no directamente de la API de los plugins subyacentes** se garantizará la compatibilidad en su mayor medida.

Aún así es posible que se presenten problemas a la hora de actualizar el código.

Se han identificado una serie de problemas principales que deben de tenerse en cuenta al migrar las aplicaciones.

## jQuery

La versión de jQuery utilizada a pasado de la versión v1.8.0
