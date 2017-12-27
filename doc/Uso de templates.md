Desde la versión v3.x de UDA se incorporó el uso de *templates* para la construcción del html del DOM que va a ser añadido por los componentes RUP.

Como motor de *templating* se eligió [handlebars.js](http://handlebarsjs.com/).

El uso de handlebars.js puede ser tanto para uso interno de los componentes RUP como para uso propio por parte de las aplicaciones a la hora de desarrollar.


## Definición de plantillas

Existen varios modos de especificar una template de Handlebars.

* Template en tag script: Se especifica la template dentro de un tag script en el el propio fichero *html* o *jsp*.

```xml
<script id="idTemplate" type="text/x-handlebars-template">
  <ul>
  {{#list data}}
    <li>{{nombre}} {{apellido}}</li>
  {{/list}}
  </ul>
</script>
```

Para compilar la template a partir del contenido del tag se realiza:

```js
var source = document.getElementById("idTemplate").innerHTML;
var template = Handlebars.compile(source);
```

* Template inline: Se especifica la template directamente indicando el contenido de la misma en un script.

```js
var source = '<ul>' +
  '{{#list data}}' +
    '<li>{{nombre}} {{apellido}}</li>' +
  '{{/list}}' +
  '</ul>';

var template = Handlebars.compile(source);
```

Una vez obtenida la template se invocará pasándole como parámetro el json de valores.

```js

var data = {
  // Valores 
};

var html = template(data);
```

## Uso en componentes RUP

Las templates creadas para ser usadas por los componentes RUP se encuentran en el directorio [src/templates](https://github.com/UDA-EJIE/udaRUP/tree/develop/src/templates).

Como nomenclatura se toma la regla de ```rup.[componente].[funcionalidad]```.

Para hacer uso una determinada template dentro del componente se debe de indicar en la definición del cargador de módulos UMD del inicio del plugin.

```js
(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './templates', './rup.base'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function (jQuery, Rup) {
```

Las templates precompiladas se encuentran accesibles dentro del objeto ```Rup.Templates```. Su ubicación dentro del objeto se corresponde con el nombre que se le ha dado al fichero ```hbs```. Por ejemplo, si el fichero se llama ```rup.button.mbutton.hbs```, la plantilla precompilada será accesible en la propiedad ```Rup.Templates.rup.button.mbutton```.

Como se tratan de plantillas precompiladas de Handlebars nos bastará con pasarles el json con los datos para obtener el html resultante.

Supongamos que disponemos de la siguiente plantilla de handlebars ```rup.list.simple.hbs```.

```xml
<ul>
{{#list data}}
  <li>{{nombre}} {{apellido}}</li>
{{/list}}
</ul>
```
Y el siguiente objeto json para obtener los datos.

```js
var json = {
  data: [
    {nombre: "Usuario 1", apellido:"Apellido usuario 1"},
    {nombre: "Usuario 2", apellido:"Apellido usuario 2"}
  ]
};
```

Para obtener desde el componente el *html* resultante de aplicar el json de datos a la plantilla se hará lo siguiente:

```js
 var html = Rup.Templates.list.simple(json);
```

En el caso de realizarse desde un componente RUP sería del siguiente modo:


```js
(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './templates', './rup.base'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function (jQuery, Rup) {
  
  $.fn.rup_list('extend', {
		_init : function(args){
			var settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);
			
          	var json = {
              data: [
                {nombre: "Usuario 1", apellido:"Apellido usuario 1"},
                {nombre: "Usuario 2", apellido:"Apellido usuario 2"}
              ]
            };
			
			var html = Rup.Templates.list.simple(json);
          
          	// Añadir el html donde corresponda

		}
	});
  
}));

```

### Buenas prácticas de uso de plantillas en componentes RUP

A la hora de utilizar templates para la construcción de componentes RUP, se debe de facilitar al usuario mecanismos para permitir la personalización de las templates y así poder adaptarlas a las necesidades funcionales y estéticas de la aplicación.

Una buena estrategía sería la siguiente:

1. Proporcionar una plantilla por defecto: Esta plantilla sería la utilizada por el componente en caso de que el usuario no haya especificado una propia.
2. Permitir al usuario especificar una plantilla propia: Mediante las propiedades de configuración se permitirá al usaurio especificar una template en lugar de la utilizada por defecto.

Como normativa se tratará de hacer uso del nombre **template** para la propiedad mediante la que se especificará la template proporcionada por el usuario.

En el caso de que el componente haga uso de una única template.

```js
$("#idLista").rup_list({
  template: $("#idTemplate").innerHTML,
  // Resto de propiedades
});
```

En el caso de que el componente haga uso de varias templates.

```js
$("#idLista").rup_list({
  template: {
    header: $("#idTemplateHeader").innerHTML,
    body: $("#idTemplateBody").innerHTML,
    footer: $("#idTemplateBody").innerHTML
  }
  // Resto de propiedades
});
```

Para el ejemplo supongamos que tenemos un componente que puede obtener los datos que se le pasarán a la template a partir de una petición AJAX o directamente a partir de un objeto json. 

En el caso de que se obtengan directamente de un objeto json, se especificará en la propiedad **data**.

En el caso de que se obtengan a partir de una petición AJAX, se especificará en la propiedad **url**.

Por lo tanto, en nuestro ejemplo, relizaremos lo siguiente. A partir de un origen de datos, ya sea una petición AJAX o un objeto json, se construirá una lista empleando para ello la template especificada por el usuario.


```js
(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './templates', './rup.base'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function (jQuery, Rup) {
  
  $.fn.rup_list('extend', {
		_init : function(args){
			var $self = this, 
                settings = $.extend({}, $.fn.rup_empty.defaults, args[0]),
                templateData,
                html;
			
          	if (template){
            	settings._template = Handlebars.compile(settings.template);  
            }
          
          	if (settings.url){
              // Origen de datos AJAX
              
              templateData = $self.rup_list("getAjaxData", url);
              
            }else if (settings.data){
              // Origen de datos objeto JSON
              
              templateData = settings.data;
              
            }else{
              	alert("No se ha especificado un origen de datos");
            	return; 
            }
			
          	// Se obtiene el html a partir de la plantilla y los datos.
			html = settings._template(templateData);
          
          	// Se añade el html resultante al objeto del DOM
          	$self.append(html);
          
		}
	});
  
  	$.fn.rup_list.defaults = {
		template: undefined,
      	_template: Rup.Templates.list.simple,
      	url: undefined,
      	data: undefined
	};
  
}));
```

La definición de la plantilla en el html y la invocación al componente desde el js se realizaría el siguiente modo.

* jsp
```xml
<script id="idTemplateLista" type="text/x-handlebars-template">
  <ul>
  {{#list data}}
    <li>{{nombre}} {{apellido}}</li>
  {{/list}}
  </ul>
</script>
```

* js
```js

var jsonTemplate = {
  data: [
   	{nombre: "Usuario 1", apellido:"Apellido usuario 1"},
    {nombre: "Usuario 2", apellido:"Apellido usuario 2"}
  ]
};

$("#idTemplateLista").rup_list({
  template: $("#idTemplate").innerHTML,
  data : jsonTemplate
});
```
