#	Componentes RUP – Mensaje

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1   Introducción](#intro)   
   - [2   Ejemplo](#ejemplo)   
   - [3   Casos de uso](#casos-de-uso)   
   - [4   Infraestructura](#infraestructura)   
      - [4.1 Ficheros](#ficheros)   
      - [4.2 Dependencias](#dependencias)
      - [4.3 Versión minizada](#v-minimizada)   
   - [5   Invocación](#invocac)   
   - [6 API](#api)   
   - [7   Sobreescritura del theme](#theme)   

<!-- /MDTOC -->


<a id="intro"></a>
##	1	Introducción
La descripción del ***Componente Mensajes***, visto desde el punto de vista de **RUP**, es la siguiente:

*Tiene como objetivo mostrar al usuario de forma homogénea, clara y llamativa, los posibles mensajes que pueden desencadenar las acciones en la aplicación. Estos mensajes predefinidos pueden ser de diferente tipología: error, confirmación, aviso o alerta*

<a id="ejemplo"></a>
##	2	Ejemplo
Se presentan a continuación los diferentes tipos de mensajes:

![ejemplo](img/rup.message_1.png)

<a id="casos-de-uso"></a>
##	3	Casos de uso
Se recomienda el uso del patrón:

+	En los casos en los que se tenga la necesidad de informar a los usuarios sobre mensajes que requieran de su plena atención o interacción, bloqueando otras acciones (ventana modal).

+	En los casos en los que no sea tan crítica la noción de los usuarios sobre una notificación específica, bastara con presentar los mensajes mediante el sistema de notificación de la propia pantalla (componente *Feedback*).


En concreto, los principales tipos de mensajes que tenemos que considerar son los siguientes:

+	Mensajes avisos
+	Mensajes de confirmación
+	Mensajes de error
+	Mensajes de alerta

<a id="infraestructura"></a>
##	4	Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+	Únicamente se requiere la inclusión de los ficheros que implementan el componente (*js y css*) comentados en los apartados *Ficheros y Dependencias*.

<a id="ficheros"></a>
###	4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.message-x.y.z.js**
Ruta theme: rup/basic-theme/
Fichero css del theme: **theme.rup.message-x.y.z.css**

<a id="dependencias"></a>
###	4.2	Dependencias
El desarrollo de los patrones como *plugins* basados en la librería JavaScript ***jQuery*** hace necesaria la inclusión de esta dependencia. La versión elegida para el desarrollo ha sido la versión **1.12.4**. Un posible cambio de versión podría no ser trivial y la versión utilizada no debe seleccionarse arbitrariamente. La razón es que el cambio podría provocar errores de funcionamiento e incompatibilidad tanto con los propios patrones como con algunos *plugins* basados en *jQuery*.
+	**jQuery 1.12.4**: http://jquery.com/

La gestión de ciertas partes visuales de los patrones, se han realizado mediante el *plugin* ***jQuery UI*** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este *plugin* proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**
+	**jQuery UI 1.12.0**: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

	jquery-1.12.4.js
	jquery-ui-1.12.0.custom.js
	jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
	rup.message-x.y.z.js
	theme.rup.message-x.y.z.css

    Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

<a id="v-minimizada"></a>
###	4.3	Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes **RUP**. Estos ficheros contienen la versión compactada y minimizada de los ficheros *javascript* y de estilos necesarios para el uso de todos los compontente **RUP**.

Los ficheros minimizados de RUP son los siguientes:
+	**rup/scripts/min/rup.min-x.y.z.js**
+	**rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

<a id="invocac"></a>
##	5	Invocación
El uso de este componente se realiza a través del objeto base de todos los patrones, **RUP**. Para poder mostrar los mensajes se debe usar la siguiente sentencia:
```javascript
$.rup_messages("tipo_mensaje", properties);
```


En el ejemplo superior se muestra el código para poder mostrar un mensaje , al cual se le pasa como parámetro un objeto que se detalla a posteriori.

Existen 4 tipos de mensajes:
+	**Mensajes de error**:

	Los mensajes de error pueden aparecer sobre elementos tales como tablas, formularios, etcétera. El estilo más adecuado para utilizar con este tipo de mensajes es un estilo neutro (usando fondos suaves) o un estilo gráfico o iconografía cercana al naranja o rojo, pero sin llegar a intimidar.
    Para introducir un mensaje de error, no hace falta tener declarado ninguna capa contenedora del mensaje, ya que el propio componente crea una con los estilos determinados para este tipo de mensaje y le añade los botones necesarios.
A continuación se muestra el código JavaScript necesario para poder invocar un mensaje de error:
```javascript
$.rup_messages("msgError", properties);
```
+	**Mensajes de confirmación**:
Los mensajes de confirmación pueden aparecer sobre elementos tales como tablas, formularios, etcétera. El estilo más adecuado para utilizar con este tipo de mensajes es un estilo neutro (usando fondos suaves).
Para introducir un mensaje de confirmación, no hace falta tener declarado ninguna capa contenedora del mensaje, ya que el propio componente crea una con los estilos determinados para este tipo de mensaje y le añade los botones necesarios.
A continuación se muestra el código JavaScript necesario para poder invocar un mensaje de confirmación:
```javascript
$.rup_messages("msgConfirm", properties);
```

+	**Mensajes de aviso**:
Los mensajes de aviso pueden aparecer sobre elementos tales como tablas, formularios, etcétera. El estilo más adecuado para utilizar con este tipo de mensajes es un estilo neutro (usando fondos suaves).
Para introducir un mensaje de aviso no hace falta tener declarado ninguna capa contenedora del mensaje, ya que el propio componente crea una con los estilos determinados para este tipo de mensaje y le añade los botones necesarios.
A continuación se muestra el código JavaScript necesario para poder invocar un mensaje de aviso:
```javascript
$.rup_messages("msgOK", properties);
```
+	**Mensajes de alerta**:
Son mensajes que sustituyen a la función alert de javascript. Una de las mejores cualidades de este componente es que sobre escribe dicha función y muestra un mensaje con los estilos y formato preestablecidos para este tipo de mensajes.
La invocación se puede realizar de las siguientes formas:
```javascript
$.rup_messages("msgAlert", properties);
```
Como cualquiera de los mensajes anteriores.
```javascript
alert(mensaje);
```
Como si se tratase de una invocación al alert típico de javascript.


<a id="api"></a>
## 6 API
Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.message.md).

<a id="theme"></a>
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
