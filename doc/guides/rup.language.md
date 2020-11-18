#	Componentes RUP – Idioma

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1   Introducción](#1-introducción)   
   - [2   Ejemplo](#2-ejemplo)   
   - [3   Casos de uso](#3-casos-de-uso)   
   - [4   Infraestructura](#4-infraestructura)   
      - [4.1 Ficheros](#4.1-ficheros)   
      - [4.2 Dependencias](#4.2-dependencias)   
      - [4.3 Versión minimizada](#4.3-versión-minimizada)   
   - [5   Invocación](#5-invocación)   
   - [6   API](#6-api)   
   - [7   Sobreescritura del theme](#7-sobreescritura-del-theme)   
   - [8   Internacionalización (i18n)](#8-internacionalización-i18n)   

<!-- /MDTOC -->

##	1	Introducción
La descripción del ***Componente Idioma***, visto desde el punto de vista de **RUP**, es la siguiente:
*El componente de idioma esta diseñado para permitir al usuario elegir, de forma intuitiva, el idioma en el que se presenta la aplicación.*

##	2	Ejemplo
Se muestra a continuación los dos posibles formatos de maquetación dispone en el componente:

![ejemplo](img/rup.language_1.png)
***Modo por defecto***



![ejemplo](img/rup.language_2.png)
***Modo portal***

##	3	Casos de uso
Se aconseja la utilización de este componente:
+	Situaciones en las que se disponga de varias versiones idiomáticas del sitio web y se desee que el usuario pueda cambiar el idioma durante su interacción con la aplicación.

Las razones para el uso del componente son las siguientes:
+	Ocupa poco espacio en la interfaz.
+	Es fácil de comprender y utilizar.
+	Es escalable: podemos incluir varios idiomas en el combo desplegable sin afectar al resto de la interfaz.

##	4	Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

Únicamente se requiere la inclusión de los ficheros que implementan el componente (*js y css*) comentados en los apartados *Ficheros y Dependencias*.

###	4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.lang-x.y.z.js**
Ruta theme: rup/css/
Fichero css del theme: **theme.rup.lang-x.y.z.css**

###	4.2	Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript ***jQuery***, es necesaria la inclusión del esta. La versión elegida para el desarrollo ha sido la versión **3.4.1**.
+	**jQuery 3.4.1**: http://jquery.com/

La gestión de la ciertas partes visuales de los componentes, se han realizado mediante el plugin ***jQuery UI*** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**.
•	jQuery UI 1.12.0: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-3.4.1.js
    rup.base-x.y.z.js
    rup.lang-x.y.z.js
    theme.rup.lang-x.y.z.css


###	4.3	Versión minimizada

A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.
Los ficheros minimizados de RUP son los siguientes:
+	**rup/scripts/min/rup.min-x.y.z.js**
+	**rup/css/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

##	5	Invocación
La creación del componente idioma se realiza de forma automática gracias al wizard de creación de proyectos, ya que este crea el layout correspondiente para la aplicación y esta integrado en el mismo, pero siempre haciendo uso del código de aplicación para crear el id de la capa donde si insertara el componente:
```javascript
		$("#idlanguage").rup_language();
```

Los posibles idiomas de la aplicación se cargan a través de la variable ***AVAILABLE_LANGS*** que se carga en el fichero *“base-includes.jsp”*. Esta variable se genera automáticamente con los idiomas seleccionados en la creación de la aplicación.

##	6	API
Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.language.md).

##	7	Sobreescritura del theme
El componente idioma se presenta con una apariencia visual definida en el fichero de estilos ***theme.rup.lang-x.y.z.css***.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.


##	8	Internacionalización i18n
La gestión de los literales del componente idioma se realiza a través de ficheros *json* lo que flexibiliza el desarrollo. Para acceder a los literales se hará uso del objeto base **RUP**, por el cual se accederá al objeto *json* correspondiente según el idioma para obtener tanto los literales a través de esta sentencia.
```javascript
$.rup.i18n.rup_language
```
Los literales marcados para este componente son los siguientes:
```javascript
"rup_language" : {
"es": "Castellano",
    	"eu":"Euskara",
    	"en":"Ingles",
    	"changeLanguage": "Cambiar Idioma"
 }
```
