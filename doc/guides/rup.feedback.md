# Componentes RUP – Feedback

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1   Introducción](#intro)   
   - [2   Ejemplo](#ejemplo)   
   - [3   Casos de uso](casos-de-uso)   
   - [4   Infraestructura](#infraestructura)   
      - [4.1 Ficheros](#ficheros)   
      - [4.2 Dependencias](#dependencias)   
      - [4.3 Versión minimizada](v-minimizada)   
   - [5   Invocación](#invocac)   
   - [6    API](#api)   
   - [7   Sobreescritura del theme](#theme)   

<!-- /MDTOC -->


<a id="intro"></a>
## 1	Introducción
La descripción del Componente Feedback visto desde el punto de vista de **RUP** es la siguiente:
*Se informa al usuario de cómo interactuar con los elementos de la aplicación y del resultado de cualquier acción que realice o cualquier problema que tenga y de cómo solucionarlo.*

<a id="ejemplo"></a>
## 2	Ejemplo
Se presentan a continuación un ejemplo del componente:
![ejemplo](img/rup.feedback_1.png)

<a id="casos-de-uso"></a>
## 3	Casos de uso
Se recomienda el uso del componente:
+	Cuando el usuario tenga una necesidad de información ya sea por cambios en el sistema, ejecución de procesos, realización de tareas o confirmación de acciones.

En concreto, los principales tipos de feedback que tenemos que considerar son los siguientes:
+	Mensajes de sistema o informativos
+	Mensajes de confirmación
+	Mensajes de error y aviso
+	Feedback de formularios y edición
+	Estado de un proceso
+	Mensajes previos / previsualización

<a id="infraestructura"></a>
## 4	Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+	Únicamente se requiere la inclusión de los ficheros que implementan el componente *(js y css)* comentados en los apartados Ficheros y Dependencias.

<a id="ficheros"></a>
### 4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.feedback-x.y.z.js**
Ruta theme: rup/basic-theme/
Fichero css del theme: **theme.rup.feedback-x.y.z.css**

<a id="dependencias"></a>
### 4.2	Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript ***jQuery***, es necesaria la inclusión del esta. La versión elegida para el desarrollo ha sido la versión **1.12.4**.
+	**jQuery 1.12.4**: http://jquery.com/

La gestión de la ciertas partes visuales de los componentes, se han realizado medieante el plugin ***jQuery UI*** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**.
+	**jQuery UI 1.12.0**: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-1.12.4.js
    jquery-ui-1.12.0.custom.js
    jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
    rup.feedback-x.y.z.js
    theme.rup.feedback-x.y.z.css

<a id="v-minimizada"></a>
### 4.3	Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.
Los ficheros minimizados de RUP son los siguientes:
+	**rup/scripts/min/rup.min-x.y.z.js**
+	**rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

<a id="invocac"></a>
## 5	Invocación
Este componente se aplica sobre una capa definida que tendrá como objeto el mostrar los mensajes al usuario. Será labor del desarrollador definir dicha capa en su página y definir un identificador que se utilizará en la invocación del componente.
```javascript
$("#id_capa").rup_feedback(properties);
```
Donde el parámetro *“properties”* es un objeto *(var properties = {})* o bien directamente la declaración de lo valores directamente. Sus posibles valores se detallan en el siguiente apartado.

<a id="api"></a>
## 6	API

Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.feedback.md).

<a id="theme"></a>
## 7	Sobreescritura del theme
El componente feedback se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.feedback-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.

Los estilos del componente se basan en los estilos básicos de los widgets de *jQuery UI*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente o mediante el uso de la herramienta [Theme Roller](http://jqueryui.com/themeroller/) podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).

A continuación se muestran unas capturas del componente con los estilos asociados dependiendo del uso de imágenes. Los estilos que contengan la palabra *“ui-“* son los propios de *jQuery UI* que en caso de ser necesario serán sobrescritos y no se comentarán en este documento por no ser su ámbito.

+	Feedback con imagen por defecto (type: ok) con cierre:
![default](img/rup.feedback_2.png)
	+	**.rup-feedback**: estilo asociado a la capa del feedback
	+	**.rup-feedback_image**: estilo asociado a la imagen por defecto (valores generales ej. posición).
	+	**.rup-feedback_image_ok**: imagen según type. Varia entre: _ok, _alert, _error (url a imágenes).
	+	**.rup-feedback_closeLink**: div que contiene el  cierre de la capa (enlace e imagen)

+	Feedback con imagen de estilo personalizado (type: ok) sin cierre:
![default](img/rup.feedback_3.png)
+	**.rup-feedback**: estilo asociado a la capa del feedback
+	**.feedbackImgPruebas**: estilo personal para mostrar la imagen personalizada. Se define en la hoja de estilos propia de la aplicación en este caso en x21a.css.
