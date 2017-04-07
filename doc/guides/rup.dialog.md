#	Componentes RUP – Diálogo

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1   Introducción](#intro)   
   - [2 Ejemplo](#ejemplo)   
   - [3 Casos de uso](#casos-de-uso)   
   - [4 Infraestructura](#infraestructura)   
      - [4.1 Ficheros](#ficheros)   
      - [4.2 Dependencias](#dependencias)   
      - [4.3 Versión minimizada](#v-minimizada)   
   - [5 Invocación](#invocac)   
   - [6 API](#api)   
   - [7   Sobreescritura del theme](#theme)   
   - [8   Internacionalización (i18n)](#i18n)   

<!-- /MDTOC -->


<a id="intro"></a>
##	1	Introducción
La descripción del ***Componente Dialogo***, visto desde el punto de vista de **RUP**, es la siguiente:
	*Permite lanzar un subproceso o un mensaje de confirmación dentro de un proceso principal sin salirse de este. Es una evolución del patrón mensaje.*

<a id="ejemplo"></a>
##	2 Ejemplo
Se muestra a continuación una maquetación típica del componente:
![](img/rup.dialog_1.png)

<a id="casos-de-uso"></a>
## 3 Casos de uso
El uso de las ventanas modales debe ser únicamente en ocasiones muy concretas; tales como:
+	Subprocesos dentro de un proceso principal

<a id="infraestructura"></a>
##	4 Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+	Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados *Ficheros y Dependencias*.

<a id="ficheros"></a>
###	4.1 Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.dialog-x.y.z.js**
Ruta theme: rup/basic-theme/
Fichero CSS del theme: **theme.rup.message-x.y.z.css**

**NOTA: Como se observa, los estilos se basan en el fichero de estilos del componente message.**

<a id="dependencias"></a>
###	4.2	Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript ***jQuery***, es necesaria la inclusión del esta. La versión elegida para el desarrollo ha sido la versión **1.12.4**.

+	**jQuery 1.12.4**: http://jquery.com/

La gestión de la ciertas partes visuales de los componentes, se han realizado mediante el plugin ***jQuery UI*** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**.

+	**jQuery UI 1.12.0**: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:


    jquery-1.12.4.js
    jquery-ui-1.12.0.custom.js
    jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
    rup.dialog-x.y.z.js
    theme.rup.message-x.y.z.css


<a id="v-minimizada"></a>
###	4.3	Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.
Los ficheros minimizados de RUP son los siguientes:
+	**rup/scripts/min/rup.min-x.y.z.js**
+	**rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

<a id="invocac"></a>
##	5 Invocación
Este componente se invocará mediante un selector que indicará el elemento capa (div) que envuelve el contenido  a mostrar o bien directamente sobre jQuery invocando la función del componente. Por ejemplo:
+	Usando una capa
```javascript
			$("#selector").rup_dialog(properties);
```
+	Obteniendo el contenido directamente (texto) o vía AJAX:
```javascript
			$(document).rup_dialog(properties);
```
Donde el parámetro “properties” es un objeto *(var properties = {};)* o bien directamente la declaración de lo valores directamente. Sus posibles valores se detallan en el siguiente apartado.

La estructura de una ventana modal debe consistir en una capa semitransparente que deje ver ligeramente el proceso principal que se está llevando a cabo para dejar claro al  usuario que sigue trabajando en ese proceso. Sobre la capa semitransparente se debe añadir la capa con el contenido del subproceso. Debe constar, además del contenido en si mismo, un aspa de cierre, un enlace para cancelar la acción y un botón destacado para la ejecución de la acción.

La funcionalidad implementada en los diálogos permite que el desarrollador decida si el diálogo a mostrar debe ser realmente modal o no. Del mismo modo se permite configurar el tamaño de las ventanas, si se pueden redimensionar, arrastrar…

<a id="api"></a>
##	6 API

Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.dialog.md).

<a id="theme"></a>
##	7	Sobreescritura del theme
El componente dialog se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.message-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.

Los estilos del componente se basan en los estilos básicos de los widgets de *jQuery UI*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente o mediante el uso de la herramienta [Theme Roller](http://jqueryui.com/themeroller/) podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).

Los estilos principales a tener en cuenta son los siguientes:
+	**.ui-dialog-title**: Estilo aplicado a la cabecera de la ventana de diálogo.
+	**.ui-dialog-content**: Estilo aplicado al cuerpo de la ventana de diálogo.
+	**.ui-dialog-button-pane**: Estilo aplicado a la botonera de la ventana de diálogo.

Adicionalmente se aplican una serie de estilos para mejorar la experiencia del usuario como puede ser el redondeo de las esquinas (sólo aplicable en FireFox) o la inclusión de estilos que modifiquen el cursor en caso de que la ventana sea redimensionable.

<a id="i18n"></a>
##	8	Internacionalización i18n
La gestion de los literales de lo diálogos se realiza a través de ficheros json lo que flexibiliza el desarrollo. Para acceder a los literales se hara uso del objeto base rup, por el cual se accedera al objeto json correspondiente según el idioma para obtener tanto los literales como los propios mensajes.

Los literales definidos para el contenido del diálogo pueden ser simple texto o código en html. Para este componente lo literales utilizados son escasos y están en la parte global de la internacionalización dentro de los resources de rup. A continuación se muestran los literales necesarios para el componente:
```javascript
{
	"rup_message":{
		"aceptar":"Aceptar",
		"tituloError":"Se ha producido un error",
...
	},
	"rup_global":{
		"cerrar":"cerrar",
		"rupCheckStyleError":"NO SE CUMPLEN LAS NOMRAS DE LA GUIA DE ESTILOS DE RUP. DEBE EXISTIR UNA ACCIÓN SECUNDARIA."
	},
	"rup_blockUI":{
"cargando":"Procesando, espere por favor"
	},
	"rup_dialog":{
"errorLoadingData":"<b>Error recuperando los datos peticionados para crear el diálogo.</b>"
}
}
```
El acceso a cualquier tipo de literal se debe realizar de la siguiente forma (teniendo en cuenta que es un objeto JSON):
```javascript
$.rup.i18n.rup_global.cerrar
}
```
