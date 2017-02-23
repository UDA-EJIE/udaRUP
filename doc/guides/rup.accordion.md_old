
[TOC]



## 1. Introducción
La descripción del Componente Accordion, visto desde el punto de vista de RUP, es la siguiente:

*El objetivo principal del componente Accordion es la presentación de un contenido donde conceptos relacionados pueden agruparse (ej. secciones) de manera que el usuario puede mostrar u ocultar información sin perder el contexto del contenido principal.
*

## 2. Ejemplo
Se presentan a continuación un ejemplo de este componente:

![Imagen 1](img/rup.accordion_1.jpg)

## 3. Casos de uso
Se aconseja la utilización de este componente:

* Cuando se desea permitir la interacción del usuario con un contenido extenso en el que se pueden agrupar conceptos relacionados permitiendo mostrar y ocultar información para minimizar el desplazamiento dentro de la página que lo presenta.

**Nota**: *El uso adecuado de este componente permite ordenar y aumentar, la cantidad de  información presentada en las páginas. El uso inadecuado puede hacer que el tamaño, manejo y desarrollo de las páginas se dificulte o entorpezca, por lo que se recomienda no abusar ni exagerar su uso en las aplicaciones.*

**Nota2**: *El componente Accordion muestra la información de una única sección mientras las otras están ocultas. ++No se debe utilizar el componente Accordion si se desea visualizar varias secciones abiertas a la vez.++*

## 4. Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

* Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados Ficheros y Dependencias.

### 4.1 Ficheros

- Ruta Javascript: rup/scripts/
- Fichero de plugin: rup.accordion-x.y.z.js
- Ruta theme: rup/basic-theme/
- Fichero CSS del theme: theme.rup.accordion-x.y.z.css

### 4.2 Dependencias

Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript jQuery, es necesaria la inclusión de esta como capa base. La versión elegida para el desarrollo ha sido la 1.8.0.
* jQuery 1.8.0: http://jquery.com/

La gestión de ciertas partes visuales de los componentes, se han realizado mediante el plugin jQuery-UI que se basa en jQuery y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, entre otras cosas, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel y componentes personalizables (estilos). La versión utilizada en el desarrollo ha sido la 1.8.23.

* jQuery-UI 1.8.23: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

* jquery-1.8.0.js
* jquery-ui-1.8.23.custom.js 
* jquery-ui-1.8.23.custom.css
* rup.base-x.y.z.js
* rup.accordion-x.y.z.js
* theme.rup.accordion-x.y.z.css

### 4.3. Versión minimizada

++A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.++

++Los ficheros minimizados de RUP son los siguientes:++
* rup/scripts/min/rup.min-x.y.z.js
* rup/basic-theme/rup.min-x.y.z.css

++Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.++

### 5. Invocación

La primera noción que se ha de tener en cuenta para el correcto manejo e inclusión del componente Accordion dentro de un pagina jsp es la asociación del componente a un elemento estructural <div> de html. La determinación del elemento ```<div>``` es determinará la ubicación y el contenido del componente dentro de la página.

Para poder relacionar el componente Accordion con el ```<div>``` sobre el que se aplica, debe ir, como marcan las especificaciones de html, identificado por un id (identificador) único. Dicho id (identificador) representa al elemento dentro de la infraestructura de la página y facilita la localización y manejo del mismo. Un ejemplo de ```<div>``` identificado tiene el siguiente aspecto:

```xml
<div id="accordionExample" class="rup_accordion">
...
</div>
```

El elemento ```<div>```, además de ser la entidad seleccionada sobre la que reside el componente, debe albergar la estructura que determine el contenido de cada una de las secciones del Accordion. La estructura para el buen funcionamiento del componente debe cumplir unas reglas muy concretas:

1. El elemento ```<div>``` base debe albergar pares de elementos que representen, según su orden de ubicación, la cabeza y cuerpo de cada una de las secciones. Dichos pares, tanto la cabecera como el cuerpo, podrán ser elementos de distintos tipos pero se recomienda que la cabeza sea de algún tipo título (```<h1>, <h2> o <h3>```) y que el cuerpo sea de tipo bloque (```<div>```).
2. Por cuestiones de estructura y estilos es estrictamente obligatorio incluir un elemento ```<a>``` dentro de la cabecera. Dicho elemento contiene el título de la sección y permite gestionar la apertura y cierre de las distintas secciones correctamente.

```xml
<div id="accordionExample" class="rup_accordion">
	<h1><a> Título de la primera cabecera </a></h1>
	<div> Primer contenido </div>
	<h1><a> Título de la segunda cabecera </a></h1>
	<div> Segundo contenido </div>
...
</div>
```

Además de poder visualizar el aspecto que tiene la estructura *html* necesaria para crear un componente *Accordion*, en el ejemplo se puede apreciar que al ```<div>``` base se le ha aplicado el estilo *“rup_accordion”*. El uso de este estilo no es casual y responde a una necesidad funcional típica en este tipo de componentes.

Normalmente, en el renderizado de los componentes, se visualiza el código *html* sin formatear ni ubicar antes de que adquiera su aspecto final. Esta circunstancia, que no perjudica al funcionamiento del componente, es extraña para los usuarios por la sensación de desorden e imperfección en la carga de la página. Para evitar este efecto, se ha desarrollado el estilo *rup_accordion* asociado a los estilos del componente, que evita este efecto ya que mantiene oculto el componente hasta su creación. Incluir el estilo *rup_accordion* no es obligatorio pero si recomendable para eliminar el efecto visual pernicioso.

Otra recomendación asociada al diseño de la aplicación, es especificar el *height* (tamaño vertical) del cuerpo mediante un *class* (clase) en lugar de especificarlo mediante un *style* (estilo) en el propio elemento. Esto se debe a que los navegadores, cuando operan con el componente *Accordion*, pierden el valor del *height* en el *style* de los cuerpos y, a su vez, estos pierden su tamaño original (este efecto solo se produce si la opción *autoHeight* está a *false*).

Además, con respecto a los navegadores, es aconsejable saber que *Chrome*, cuando maneja el componente *Accordion*, no renderiza bien el componente si los cuerpos del mismo no tienen un *height* (tamaño vertical) especificado. Esto se debe a que *Chrome* no coge bien el tamaño proporcional del elemento padre y se pintan las secciones con tamaños variables entre carga y carga. Si es especifican los *height* de los distintos cuerpos este comportamiento anómalo no se produce.

## 6. Parámetros

A continuación se muestran los posibles parámetros de configuración que recibe el componente.


* **disabled**: Parámetro de configuración que determina si está habilitado (false) o deshabilitado (true) el componente *Accordion*. Por defecto el valor de este parámetro es false.
* **active**: Determina la sección que está activa. El valor del parámetro puede ser un selector, un elemento, un boolean, un objeto JQuery y un número. Si se le especifica el valor false, el *Accordion* permanecerá totalmente cerrado (este caso requiere del parámetro collapsible true). Por defecto, su valor es la primera sección del *Accordion*.
* **animated**: Elemento de figuración que determina el tipo de animación aplicada al pliegue y despliegue de las secciones del *Accordion*. Puede aceptar los distintos tipos de animaciones asociados a JQuery–Ui (por ejemplo bounceslide). Con un valor false se deshabilita la animación. El valor por defecto es slide (deslizable básico).
* **autoHeight**: Si su valor es true, todas las secciones del *Accordion* tendrá un height igual al de la sección que tenga el mayor valor. Gracias a este parámetro, el *Accordion*, independientemente de la sección abierta, mantendrá su coherencia dimensional vertical. Por defecto su valor es true.
* **clearStyle**: Si está activado, una vez acabada la animación, el *Accordion* borra los estilos de height y overflow. Este tipo de comportamiento está diseñado para situaciones en las que se  cargan contenidos dinámicos y se desea que el *Accordion* ajuste sus medidas al nuevo contenido. El uso de este parámetro no tiene sentido si se esta usando el autoHeight. Por defecto su valor es false.
* **collapsible**: Parámetro que habilita la posibilidad de que todas las secciones del *Accordion* estén cerradas a la vez. Por defecto su valor es false.
* **event**: Determina el tipo de evento necesario para que cada una de las secciones sea habilitada o deshabilitada. Por defecto su valor es click (un click del botón izquierdo del ratón).
* **fillSpace**: Permite al *Accordion* que ocupe todo el height (espacio vertical) perteneciente a su padre. Este comportamiento predomina frente al autoHeight. Su valor por defecto es false.
* **header**: Selector que determina el objeto cabecera de cada una de las secciones del *Accordion*. Por defecto recoge como cabeceras los primeros elementos de cada pareja integrada en el *Accordion*.
* **icons**: Parámetro estructural que determina el icono utilizado para indicar el estado de sección abierta o cerrada. Se puede especificar tanto uno como otro como los dos. Por defecto se usan los iconos nativos del propio de JQuery-UI.

```javascript
icons: {
'header': 'ui-icon-plus',
'headerSelected': 'ui-icon-minus'
}
```

* **navigation**: En caso de estar activada, el *Accordion* comprueba el valor de la ruta de cada unos de los href asociados a los ```<a>``` de las cabeceras y, en caso de coincidir con el de la ruta de la propia página, se activa dicha sección. Este tipo de funcionalidad está enfocada a diseños de páginas que guardan el estado. El criterio de selección se puede cambiar especificando un navigationFilter adecuado.
* **navigationFilter**: Función aplicada para determinar el cumplimiento de la condición asociada a la activación del parámetro navigation. La función debe devolver true o false según se cumpla o no la condición destinada al cumplimiento del navigation.
* **validation**: Parámetro de configuración que determina la aplicación de la validación estructural asociada a las necesidades estructurales del *Accordion*. El valor por defecto, es true.

