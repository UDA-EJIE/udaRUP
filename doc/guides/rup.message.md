#	Componentes RUP – Mensaje

##	1	Introducción
La descripción del ***Componente Mensajes***, visto desde el punto de vista de **RUP**, es la siguiente:

*Tiene como objetivo mostrar al usuario de forma homogénea, clara y llamativa, los posibles mensajes que pueden desencadenar las acciones en la aplicación. Estos mensajes predefinidos pueden ser de diferente tipología: error, confirmación, aviso o alerta*

##	2	Ejemplo
Se presentan a continuación los diferentes tipos de mensajes:

![ejemplo](img/rup.message_1.png)


##	3	Casos de uso
Se recomienda el uso del patrón:

+	En los casos en los que se tenga la necesidad de informar a los usuarios sobre mensajes que requieran de su plena atención o interacción, bloqueando otras acciones (ventana modal).

+	En los casos en los que no sea tan crítica la noción de los usuarios sobre una notificación específica, bastara con presentar los mensajes mediante el sistema de notificación de la propia pantalla (componente *Feedback*).


En concreto, los principales tipos de mensajes que tenemos que considerar son los siguientes:

+	Mensajes avisos
+	Mensajes de confirmación
+	Mensajes de error
+	Mensajes de alerta

##	4	Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+	Únicamente se requiere la inclusión de los ficheros que implementan el componente (*js y css*) comentados en los apartados *Ficheros y Dependencias*.

###	4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.message-x.y.z.js**
Ruta theme: rup/basic-theme/
Fichero css del theme: **theme.rup.message-x.y.z.css**

###	4.2	Dependencias
El desarrollo de los patrones como *plugins* basados en la librería JavaScript ***jQuery*** hace necesaria la inclusión de esta dependencia. La versión elegida para el desarrollo ha sido la versión **1.12.4**. Un posible cambio de versión podría no ser trivial y la versión utilizada no debe seleccionarse arbitrariamente. La razón es que el cambio podría provocar errores de funcionamiento e incompatibilidad tanto con los propios patrones como con algunos *plugins* basados en *jQuery*.
+	**jQuery 1.12.4**: http://jquery.com/

La gestión de ciertas partes visuales de los patrones, se han realizado mediante el *plugin* ***jQuery UI*** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este *plugin* proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**
+	jQuery UI 1.12.0: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

	jquery-1.12.4.js
	jquery-ui-1.12.0.custom.js
	jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
	rup.message-x.y.z.js
	theme.rup.message-x.y.z.css

    Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

##	5	Invocación
El uso de este componente se realiza a través del objeto base de todos los patrones, **RUP**. Para poder mostrar los mensajes se debe usar la siguiente sentencia:
```javascript
$.rup_messages("tipo_mensaje", properties);
```
En el ejemplo superior se muestra el código para poder mostrar un mensaje de error, al cual se le pasa como parámetro un objeto que se detalla a posteriori.

## 6 API


##	7	Sobreescritura del theme
El componente message se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.message-x.y.z.css**.
Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.

Los estilos del componente se basan en los estilos básicos de los widgets de *jQuery UI*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente o mediante el uso de la herramienta [Theme Roller](http://jqueryui.com/themeroller/) podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).

El componente dispone de dos estilos específicos que se modifican para cada tipo.
+	**.ui-dialog-content-icon-#tipo#**: El estilo de la capa que contiene la imagen como background.
+	**.ui-dialog-content-msg-#tipo#**: El estilo de la capa donde se mostrará el mensaje.

Por ejemplo:
```css
.ui-dialog-content-icon-error {
	background-image:url("../images/rup.error.png");
    background-position:center center; 	
    background-repeat:no-repeat; 
    float:left; 	
    height:24px; 	
    padding-right:1.3em; 
    padding-top:1.4em; 	
    position:relative; 	
    vertical-align:middle; 
    width:24px;  } 
    
    /*Estilo de la capa con el texto a mostrar cuando el mensaje es de error*/  
    .ui-dialog-content-msg-error { 	
    padding-top:1em; 	
    text-align:left; 	
    vertical-align:middle;  
    }
```





