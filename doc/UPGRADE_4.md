# Actualizar

En esta sección iremos indicando como mantenerse actualizado con las últimas versiones disponibles de los componentes de <img src='https://uda-ejie.github.io/images/imgwikis/uda-mini-micro2.png' alt='UDA' />, es decir, cuando ya se dispone de una aplicación generada, y se desea incorporar las últimas actualizaciones.

**Para el proceso de actualización se dan por sentados los siguientes supuestos**:
* La actualización se realiza sobre una aplicación con la versión 4.0.0 de RUP. La actualización directa desde versiones anteriores no ha sido probada por lo que es posible que pueda darse la necesidad de realizar modificaciones extras.
* Los ficheros originales de RUP no han sido modificados.

Si lo que buscas es información sobre como mantener tu entorno de desarrollo actualizado, debes consultar la sección [Instalar](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Instalar).
  
***

### v4.1.0 (12-Noviembre-2019)

Para actualizar una aplicación UDA a la versión v4.1.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v4.1.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v4.1.0/rup-v4.1.0.zip).

#### Templates

Para generar código correspondiente a la versión v4.1.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.1.0/templates-v4.1.0.zip).

#### Estáticos

En esta versión de UDA se ha incluido la función **initRupI18nPromise()**, esta se encargará de cargar los recursos idiomáticos cuando estén disponibles, evitando así demorar la carga de la aplicación.

Es importante remarcar que, para usar esta función de manera correcta, sólo se debe usar para cargar recursos idiomáticos y no toda la lógica de la vista con la que se esté trabajando. Un ejemplo de buena práctica sería el siguiente:
```js
initRupI18nPromise.then(function(){
    options_role_combo = {
        source : [
           {label: "---", value:""},
           {label: $.rup.i18n.app["GRID_simple##rol"]["administrador"], value:"administrador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["desarrollador"], value:"desarrollador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["espectador"], value:"espectador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["informador"], value:"informador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["manager"], value:"manager"}
        ],
        width: "100%",
        customClasses: ["select-material"]
    };
});
```