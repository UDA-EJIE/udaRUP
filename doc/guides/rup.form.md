#Componentes RUP – Formulario



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
   - [7   Integración con UDA](#7-integración-con-uda)   
      - [7.1 Envío y recepción de datos](#7.1-envío-y-recepción-de-datos)   
      - [7.2 Envío de múltiples entidades](#7.2-envío-de-múltiples-entidades)   
      - [7.3 Subida de ficheros](#7.3-subida-de-ficheros)   
   - [8   Interacción con otros componentes RUP](#8-interacción-con-otros-componentes-rup)   

<!-- /MDTOC -->


<a id="introduccion"></a>
##  1	Introducción

La descripción del ***Componente Formulario***, visto desde el punto de vista de RUP, es la siguiente:
*Permite al usuario introducir datos en una serie de campos para ser enviados al servidor y ser procesados.*

<a id="ejemplo"></a>
##  2	Ejemplo
Se presenta a continuación un ejemplo de este componente:
![ejemplo](img/rup.form_1.png)

<a id="casos-de-uso"></a>
##  3	Casos de uso
Se aconseja la utilización de este componente:
+	Cuando sea necesario enviar formularios vía AJAX.

<a id="infraestrucura"></a>
##  4	Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+	Únicamente se requiere la inclusión de los ficheros que implementan el componente *(js y css)* comentados en los apartados *Ficheros y Dependencias*.

<a id="ficheros"></a>
### 4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.form-x.y.z.js**
Ruta theme: rup/basic-theme/
Fichero CSS del theme: **theme.rup.form-x.y.z.css**

<a id="dependencias"></a>
### 4.2	Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript **jQuery**, es necesaria la inclusión del esta. La versión elegida para el desarrollo ha sido la versión **1.12.4**.

+	**jQuery 1.12.4**: http://jquery.com/

La gestión de la ciertas partes visuales de los componentes, se han realizado mediante el plugin **jQuery UI** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**.

+	**jQuery UI 1.12.0**: http://jqueryui.com/

Las distintas funcionalidades que aporta el componente y las prestaciones generales del mismo, se apoyan en el plugin **jQuery File Upload**. Para el correcto funcionamiento del componente Upload, se precisa de la inclusión de dicho plugin.

+	**jQuery-File-Upload**: http://blueimp.github.com/jQuery-File-Upload/

Los ficheros necesarios para el correcto funcionamiento del componente son:
```
    jquery-1.12.4.js
	jquery-ui-1.12.0.custom.js
	jquery-ui-1.12.0.custom.css
	jquery.form.js
	rup.form-x.y.z.js
```
<a id="version-minimizada"></a>
### 4.3	Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.
Los ficheros minimizados de RUP son los siguientes:
+	**rup/scripts/min/rup.min-x.y.z.js**
+	**rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.


<a id="invocacion"></a>
##  5	Invocación
El componente formulario se invoca sobre un formulario html existente en la jsp. El formulario contendrá los campos que se desean enviar.

Un ejemplo de un formulario que se desee enviar es el siguiente:
```xml
<form id="formulario" action="/form">
	<label for="nombre">Nombre</label>
	<input type="text" name="nombre" id="nombre" />
<label for="apellido1" >Primer apellido</label>
	<input type="text" name="apellido1" id="apellido1" />
<label for="apellido2" >Segundo apellido</label>
	<input type="text" name="apellido2" id="apellido2" />
</form>
```

En este caso el formulario dispone de tres campos que serán enviados al servidor.  Para realizar la invocación del componente formulario realizaremos lo siguiente:
```javascript
var properties={
	// Propiedades de configuración		
};
$("#formulario").rup_form(properties);
```

Como ya se profundizará mas adelante, mediante las propiedades indicadas en la invocación del componente, se realiza la configuración del mismo.

<a id="api"></a>
##  6	API
Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.form.md).

<a id="integracion-con-uda"></a>
##  7	Integración con UDA
En este apartado se va a explicar las diferentes interacciones que realiza el componente con el resto de subsistemas definidos en UDA.

<a id="envio-y-recepcion-de-datos"></a>
### 7.1	Envío y recepción de datos
El componente formulario realiza, por defecto, el envío de los datos en formato application/json, excepto en los casos en los que se ha especificado otro formato de envío o cuando se debe realizar envío de un fichero. El envío de ficheros se detallará en un apartado posterior.
Una vez explicado este punto, se presentan dos escenarios al realizar el envío del formulario:
•	El contenido del formulario se envía en formato *application/json*. En este caso el data binding de estos datos se realiza sobre el parámetro del controller anotado mediante *@RequestBody*. El proceso de data binding del formulario enviado en formato *application/json* se realiza mediante el componente *Jackson JSON Processor*. El uso y configuración del mismo se detalla en el documento correspondiente.

El método del controller encargado de recoger los datos se declarará del siguiente modo:
```java
@RequestMapping(method = RequestMethod.POST)
public @ResponseBody Alumno add(@RequestBody Alumno alumno){

}
```
•	El contenido del formulario se envía en formato un formato diferente al *application/json*, por ejemplo en *multipart/form-data* o *application/x-www-form-urlencoded*. En este caso el data *binding* de estos datos se realiza sobre el parámetro del controller anotado mediante *@ModelAttribute*.
El método del controller encargado de recoger los datos se declarará del siguiente modo:
```java
@RequestMapping(method = RequestMethod.POST)
public @ResponseBody Alumno edit(@ModelAttribute Alumno alumno){

}
```

<a id="envio-de-multiples-entidades"></a>
### 7.2	Envío de múltiples entidades
El componente formulario permite, junto con el uso del componente Jackson, el envío y recepción de datos de múltiples entidades dentro de la misma petición.

Supongamos que se debe de enviar desde la capa de presentación cierta información introducida por el usuario. El *databinding* de estos datos debe de ser realizado sobre dos beans entre los cuales no existe anidamiento:
```java
public class Alumno  implements java.io.Serializable {

private BidDecimal id;
private String nombre;
private String apellido1;
private String apellido2;

// Getters y setters de las propiedades
}

public class Departamento  implements java.io.Serializable {

private BidDecimal id;
private String descEs;
private String descEu;

// Getters y setters de las propiedades
}
```

Para evitar la creación de un nuevo tipo de bean cada vez que se da esta necesidad se ha implementado una nueva funcionalidad de Jackson. Esta funcionalidad es proporcionada por el UdaModule y permite realizar el databinding de varias entidades sobre un parámetro del método de tipo *HashMap*.

Para poder determinar en cada petición si se va a utilizar o no el *databinding* múltiple, se incluye una cabecera en la petición, RUP_MULTI_ENTITY. En caso de ser true se activará el comportamiento especial.

Este sería el proceso completo de *databinding* múltiple:

1.	Partimos de un formulario definido en la jsp en el que se dispone de varios campos correspondientes a varias entidades:
```xml
<form id="formMultientidades" action='/multientidades' method="post">
	<input type="text" name="alumno.id" />
	<input type="text" name="alumno.nombre" />
	<input type="text" name="alumno.apellido1" />
	<input type="text" name="alumno.apellido2" />
	<input type="text" name="departamento.id" />
	<input type="text" name="departamento.descEs" />
	<input type="text" name="departamento.descEu" />
<input type="submit" value="Enviar" />
</form>
```

2.	Se invoca al componente RUP formulario. En la configuración se especifica la información necesaria para realizar el data *binding* múltiple:

```javascript
$("#formMultientidades").rup_form({
feedback:$("#feedbackMensajes"),
multimodel:{
    "alumno":"com.ejie.x21a.model.Alumno",
    "departamento":"com.ejie.x21a.model.Departamento"
},
success:function(xhr){			
    // Tratamiento de la petición realizada correctamente
},
validate:{
    rules:{
        // Reglas de validación necesarias
    }
}
});
```

En la propiedad *multimodel* se especifica la correlación entre las nombres de las propiedades y de los objetos Java.

La petición resultante tiene el siguiente aspecto:
```javascript
Content-Type 		application/json; charset=UTF-8
RUP_MULTI_ENTITY	true

{
"alumno":
{"id":"1","nombre":"Nom","apellido1":"ap1","apellido2":"ap2"},
"departamento":
{"id":"3","descEs":"Dep_es","descEu":"Dep_eu"},

"rupEntityMapping":{
"alumno":"com.ejie.x21a.model.Alumno",
"departamento":"com.ejie.x21a.model.Departamento"
}
}
```
En el objeto json se envía la siguiente información:
+	Los datos correspondientes a cada una de las entidades sobre las que se debe realizar el *databinding* en formato json.
+	Un objeto de nombre *rupEntityMapping* que contiene la correlación entre los nombres de los objetos y el tipo Java.


3.	La petición se mapea sobre el método del controller correspondiente. El tipo de parámetro del parámetro sobre el que se van a crear las nuevas entidades debe ser de tipo java.util.Map:

```java
@RequestMapping(value = "form/multientidades", method = RequestMethod.POST)
public @ResponseBody Object getFormmMultientidades(@RequestBody Map<String, Object>
multiModelMap) {

// Obtención del alumno
Alumno alumno = (Alumno)multiModelMap.get("alumno");

// Obtención del departamento
Departamento departamento =
(Departamento)multiModelMap.get("departamento");
}
```

El key de cada uno de los elementos del mapa y el tipo de objeto que se crea en dicho elemento se corresponde con la configuración indicada en el objeto json *rupEntityMapping*.

El componente permite también en envío de **múltiples entidades del mismo tipo**. Las diferentes entidades se diferenciarían mediante el nombre del parámetro:
```xml
<form id="formMultientidades" action='/multientidades' method="post">
	<input type="text" name="comarca1.code" />
	<input type="text" name="comarca1.descEs" />
	<input type="text" name="comarca1.descEu" />
	<input type="text" name="comarca2.code" />
	<input type="text" name="comarca2.descEs" />
	<input type="text" name="comarca2.descEu" />
	<input type="text" name="comarca3.code" />
	<input type="text" name="comarca3.descEs" />
	<input type="text" name="comarca3.descEu" />

<input type="submit" value="Enviar" />
</form>
```

La invocación y la configuración del componente formulario sería la siguiente:
```javascript
$("#formMultientidades").rup_form({
feedback:$("#feedbackMensajes"),
multimodel:{
    "comarca1":"com.ejie.x21a.model.Comarca",
    "comarca2":"com.ejie.x21a.model.Comarca",
    "comarca3":"com.ejie.x21a.model.Comarca"
},
success:function(xhr){			
    // Tratamiento de la petición realizada correctamente
},
validate:{
    rules:{
        // Reglas de validación necesarias
    }
}
});
```

Por su parte, el método del controller encargado de la recepción de las entidades sería el siguiente:
```java
@RequestMapping(value = "/multientidades", method = RequestMethod.POST)
public @ResponseBody Object getFormmMultientidades(@RequestBody Map<String, Object>
multiModelMap) {

// Obtención de la entidad comarca1
Comarca comarca1 = (Comarca)multiModelMap.get("comarca1");

// Obtención de la entidad comarca2
Comarca comarca2 = (Comarca)multiModelMap.get("comarca2");

// Obtención de la entidad comarca3
Comarca comarca3 = (Comarca)multiModelMap.get("comarca3");
}
```
<a id="subida-de-ficheros"></a>
### 7.3	Subida de ficheros
Para realizar la subida de ficheros basta con incorporar un campo file al formulario que se va a enviar. El componente formulario detecta que debe de gestionar la subida de un fichero y actúa en consecuencia.

La principal diferencia respecto al envío de una petición normal es que se realiza mediante una *multipart/form-data* en lugar de una  *application/x-www-form-urlencoded*.

Para llevar a cabo el envío de ficheros mediante el componente form se deben llevar a cabo los siguientes pasos:

1.	Habilitar el soporte de Spring para peticiones *multipart*. Por defecto Spring no tiene habilitada la gestión de subidas de ficheros (multipart).

Para habilitarlo se debe de añadir un *MultipartResolver* al contexto de aplicación de Spring. Esto se realiza editando la configuración del fichero mvc.config.xml e incluyendo la siguiente definición:
```xml
<bean id="multipartResolver" class="com.ejie.x38.util.UdaMultipartResolver" >
</bean>
```

Desde UDA se proporciona un *MultipartResolver* que permite el envío de peticiones *multipart* mediante PUT.

2.	Crear un formulario con un campo file mediante el cual se seleccionará el fichero a enviar:

```xml
<form id="formFichero" action='/subidaFichero' method="post">
       ...
       ...
	<input type="file" id="campoFichero" name="fichero" />
       ...
       ...

    <input type="submit" value="Enviar" />
</form>
```

3.	Invocación del componente formulario.

```javascript
$("#formFichero").rup_form({
// Obtención de la entidad comarca1
});
```


4.	Para obtener en el controller el fichero enviado se deberá de definir un parámetro del siguiente modo. El parámetro se muestra resaltado en el ejemplo:

```java
@RequestMapping(value="/subidaFichero", method = RequestMethod.POST)
public void subirFichero(
	@ModelAttribute Alumno alumno,
	@RequestParam(value="fichero", required=false) MultipartFile fichero) {

// Procesado del fichero

}
```

```
IMPORTANTE: En el caso de utilizar el navegador Internet Explorer 8, la subida de ficheros mediante un formulario se realiza mediante el uso de iframe. Esto es debido a que la subida de ficheros mediante peticiones AJAX no está soportada en este navegador.
 La configuración que se ha de realizar para permitir la interacción correcta entre los iframes y el resto de la infraestructura (request mappings, http error code, validaciones…) se detalla en el anexo Anexo-Emulacion_xhr_iframes.doc
```

<a id="interaccion-con-otros-componentes-rup"></a>
##  8	Interacción con otros componentes RUP
Para facilitar la gestión de los formularios de la aplicación, se ha tratado de facilitar la validación de los campos del formulario. Para ello se ha integrado en el componente formulario el uso del componente validación.

La configuración de las validaciones que se deben de aplicar a los campos del formulario se realiza del mismo modo que se describe en el documento de uso del componente validación. Las opciones de configuración del componente validación se indican en la propiedad *validate* del las opciones de configuración del componente formulario.

A continuación se muestra un ejemplo de una invocación del componente formulario en el que se incluye la configuración correspondiente a la validación de sus campos:
```
$("#formulario").rup_form({
	url:"/formulario/guardar",
	success: function(){
	},
	validate:{
		rules:{
			"nombre":{required:true},
			"apellido1":{required:true}
		}
}
});
```

La configuración referente al proceso de validación se detalla en la guía de uso del componente RUP validación.
