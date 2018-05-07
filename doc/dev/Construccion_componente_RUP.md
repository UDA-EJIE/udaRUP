La construcción de los componentes RUP realiza sobre las librerías jQuery y jQueryUI.

## Componente base

Un buen punto de partida para crear un nuevo componente RUP sería el uso de la siguiente plantilla. Se encuentra disponible como un componente vacío en el fichero [rup.empty.js](https://github.com/UDA-EJIE/udaRUP/blob/master/src/rup.empty.js).

```js
( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','./rup.base'], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function( $ ) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var rup_empty = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_empty', rup_empty));

	//*******************************
	// DEFINICIÓN DE MÉTODOS RUP
	//*******************************
	$.fn.rup_empty('extend',{
		getRupValue: function() {
			return null;
		},
		setRupValue: function(value) {

		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_empty('extend',{
		foo: function() {
			return this;
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_empty('extend',{
		_bar: function() {
			return this;
		}
	});

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	$.fn.rup_empty('extend', {
		_init : function(args){
			var $self = this,
				settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);


			// Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
			$self.attr('ruptype', 'empty');

			// TODO : Invocación al plugin

			// Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
			$self.data('settings', settings);

		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	$.fn.rup_empty.defaults = {
		foobar: false
	};

}));
```

En el caso de querer crear un nuevo componente, por ejemplo un componente **rup_list**, la mejor opción sería duplicar el archivo renombrándolo a **rup.list.js** dentro de la carpeta [src](https://github.com/UDA-EJIE/udaRUP/blob/master/src) y reemplazar dentro del fichero los literales **rup_empty** por **rup_list**.

Las diferentes partes de un componente RUP son:

* **Cargador de módulos UMD**: Permite utilizar el componente js mediante módulo AMD o directamente cargando el fichero js.

```js
( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','./rup.base'], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function( $ ) {

```

* **Inicialización del componente RUP** : Se genera el objeto base ```var rup_empty = {};``` y se invoca al contructor de componentes RUP.

```js
var rup_empty = {};

//Se configura el arranque de UDA para que alberge el nuevo patrón
$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_empty', rup_empty));
```

* **Métodos comunes a los componentes RUP**: A la hora de desarrollar un componente RUP se definen dos métodos comunes a todos los componentes.
	* **getRupValue**: Devuelve el *value* normalizado del componenente para ser utilizado por el resto de componentes. Por ejemplo cuando se obtiene desde un formulario para enviarlo al servidor.
	* **setRupValue**: Asigna un *value* al componente. Por ejemplo cuando se inicializa el componente como parte de un campo utilizado en un formulario.

```js
$.fn.rup_empty('extend',{
	getRupValue: function() {
		return null;
	},
	setRupValue: function(value) {

	}
});
```

* **Métodos públicos del componente**: En esta sección se implementarán los métodos que conformarán la API pública del componente. Estos métodos podrán ser invocados desde fuera del componente.

```js
//*******************************
// DEFINICIÓN DE MÉTODOS PÚBLICOS
//*******************************
$.fn.rup_empty('extend',{
  foo: function() {
    return this;
  }
});
```

* **Métodos privados del componente**: En esta sección se implementarán los métodos privados que serán solo accesibles desde dentro del componente.

```js
//*******************************
// DEFINICIÓN DE MÉTODOS PRIVADOS
//*******************************

$.fn.rup_empty('extend',{
  _bar: function() {
    return this;
  }
});
```

* **Método de inicialización del componente**: Este método será ejecutado cuando se instancie un componente RUP.

```js
//*******************************
// MÉTODO DE INICIALIZACION
//*******************************
$.fn.rup_empty('extend', {
	_init : function(args){
		var settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);
			// TODO : Invocación al plugin
	}
});
```
En este método se sobreescriben las propiedades de configuración proporcionadas por el usuario en la inicialización del componente a las propiedades por defecto.

Esto se realiza mediante la sentencia

```js
var settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);
```

* **Propiedades de configuración por defecto**: Permite definir valores por defecto de las propiedades de configuración del componente. De este modo se define el comportamiento por defecto del componente en caso de que el usuario no proporcione una configuración a la hora de inicializar el componente.

```js
//******************************************************
// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
//******************************************************
$.fn.rup_empty.defaults = {
  foobar: false
};
```

## Buenas prácticas

A la hora de crear componentes RUP y en general de programar con jQuery existen una serie de recomendaciones y buenas prácticas que se deben de tener en cuenta.

### Referenciar el objeto base

A la hora de construir un componente RUP se debe evitar realizar referencias al objeto sobre el que se ha invocado mediente el uso de un selector que referencia a su ```id```.

Es mas conveniente el almacenar la referencia al elemento mediante ```this```. Para evitar problemas con el uso de ```this``` dependiendo de la *closure* en la que nos encontremos es conveniente el almacenar la referencia de ```this``` para su posterior uso. Como normativa utilizaremos el nombre de ```$self``` para dicha variable.

Por ejemplo, en el método ```init``` de inicialización del componente, en vez de referenciar al objeto del siguiente modo:

```js
$.fn.rup_empty('extend', {
  _init : function(args){
    var settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);

    $('#'+this.id).attr('value', 'texto'),


  }
});
```

Deberemos de realizarlo del siguiente modo:

```js
$.fn.rup_empty('extend', {
	_init : function(args){
		var $self = this,
			settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);

		$self.attr('value', 'texto'),


	}
});
```

Esta práctica debería de realizarse no solo en el método ```_init``` sino que sería conveniente realizarlo en todos los métodos tanto públicos como privados.

```js
$.fn.rup_empty('extend',{
	foo: function() {
		var $self = this;

		return $self;
	}
});
```

### No romper el chaining

Es una práctica habitual en jQuery el devolver la referencia del propio objeto para permitir hacer invocaciones encadenadas. Un ejemplo de jQuery sería permitir hacer en vez de esto:

```js
// Stores the live DOM element inside of a variable
var elem = $("#elem");

// Set's an element's title attribute using it's current text
elem.attr("title", elem.text());

// Set's an element's text color to red
elem.css("color", "red");

// Makes the element fade out
elem.fadeOut();
```

Lo siguiente:

```js
// Stores the live DOM element inside of a variable
var elem = $("#elem");

// Chaining
elem.attr("title", elem.text()).css("color", "red").fadeOut();
```

En el caso de los componentes RUP esto se logra devolviendo la referencia al propio objeto como ```return``` en los métodos.

Si lo realizamos como en este ejemplo:

```js
$.fn.rup_empty('extend',{
	foo: function(param) {
		var $self = this;

		return $self;
	},
	bar: function(param) {
		var $self = this;

		return $self;
	}
});

$.fn.rup_empty('extend', {
  _init : function(args){
    var $self = this,
        settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);

    return $self;
  }
});
```

Nos permitirá realizar las siguientes invocaciones al componente.

```js
// Inicialización
var $elem = $('#idElem');

$elem.rup_empty({}).rup_empty("foo", "Value param").rup_empty("bar", "Value param");
```

### Almacenar el objeto settings

Una recomendación a la hora de construir un componente RUP es la de almacenar el objeto ```settings``` en el ```data``` del propio elementos del DOM. De esta manera el objeto será fácilmente accesible desde cualquier punto del componente.

```js
$self.data('settings', settings);
```

### Manipulación del DOM

#### Simplificar los selectores

Se debe de simplificar los selectores en la medida de lo posible para facilitar a jQuery la identificación de los elementos del DOM.

En vez de esto

```js
// Set's an element's title attribute using it's current text
$(".container input#elem").attr("title", $(".container input#elem").text());

// Set's an element's text color to red
$(".container input#elem").css("color", "red");

// Makes the element fade out
$(".container input#elem").fadeOut();
```
Se debería de utilizar directamente el selector por id.

```js
// Set's an element's title attribute using it's current text
$("#elem").attr("title", $("#elem").text());

// Set's an element's text color to red
$("#elem").css("color", "red");

// Makes the element fade out
$("#elem").fadeOut();
```

#### Cacheo de los selectores en variables

Es conveniente cachear el resultado de un selector de jQuery en una variable. De este modo, jQuery no realizará de nuevo la búsqueda a través del DOM con la consiguiente mejora en el rendimiento.

```js
// Stores the live DOM element inside of a variable
var elem = $("#elem");

// Set's an element's title attribute using it's current text
elem.attr("title", elem.text());

// Set's an element's text color to red
elem.css("color", "red");

// Makes the element fade out
elem.fadeOut();
```

#### Evitar modificaciones parciales del DOM

Unas de las operaciones mas costosas en cuanto a tiempo de proceso son las relacionadas con la manipulación del DOM.

Por ello es preferible realizar las modificaciones del DOM lo mas agrupadas posibles en vez de realizar pequeñas modificaciones.

Por ejemplo, en el caso de tener que añadir nuevos ```<li>``` a un ```<ul>``` dentro de un bucle, es preferible almacenar estos nuevos ```<li>``` en un array para realizar el append sobre el ```<ul>``` una única vez.

En vez del siguiente ejemplo

```js
// Dynamically building an unordered list from an array
var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
    list = $("ul.people");

$.each(localArr, function(index, value) {

  list.append("<li id=" + index + ">" + value + "</li>");

});
```

Se debería de hacer del siguiente modo

```js
// Dynamically building an unordered list from an array
var localArr = ["Greg", "Peter", "Kyle", "Danny", "Mark"],
    list = $("ul.people"),
    dynamicItems = "";

$.each(localArr, function(index, value) {

  dynamicItems += "<li id=" + index + ">" + value + "</li>";

});

list.append(dynamicItems);
```
