## Estructura de plugins

Para los ejemplos supondremos la creación de un plugin llamado ```empty``` que se cargará en el

Los plugins desarrollados para el componente RUP Table tienen la siguiente estructura:

```js
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
  jQuery.rup_table.registerPlugin('empty',{
    loadOrder:1,
   	preConfiguration: function(settings){
   	  var $self = this;
   		return $self.rup_table('preConfigureEmpty', settings);
   	},
   	postConfiguration: function(settings){
   	  var $self = this;
   		return $self.rup_table('postConfigureEmpty', settings);
   	}
  });


  jQuery.fn.rup_table('extend',{
		preConfigureEmpty: function(settings){
    },
		/*
		 * Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
		 *
		 */
		postConfigureEmpty: function(settings){
			var $self = this, filterFormId, filterSettings;

		}
  });

  //*******************************************************
  // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
  //*******************************************************

  /**
   * Parámetros de configuración por defecto para el plugin filter.
   *
   */
  jQuery.fn.rup_table.plugins.empty = {};
  jQuery.fn.rup_table.plugins.empty.defaults = {
    core:{
      // Propiedades por defecto que afectan al core
    },
    empty:{
      // Propiedades por defecto que afectan al plugin
    }
  };


})(jQuery);
```

Las diferentes secciones del plugin son las siguientes.

### Declaración del plugin

La sección mas importante del plugin es aquella que *registra* el plugin en el componente RUP Table. De este modo el *core* del componente rup table ejecuta los métodos contructores del plugin.


La sección de definición del plugin se correspondería con la siguiente:

```js
jQuery.rup_table.registerPlugin('empty',{
  loadOrder:1,
  preConfiguration: function(settings){
    var $self = this;
    return $self.rup_table('preConfigureEmpty', settings);
  },
  postConfiguration: function(settings){
    var $self = this;
    return $self.rup_table('postConfigureEmpty', settings);
  }
});
```

En ella se especifica:

* **Orden de carga del plugin**: En determinados plugins es importante en orden en que se cargan. Generalmente es debido a que dependen de la inicialización previa de otro plugin. Esto se indica mediante el valor dado a loadOrder.

```js
loadOrder:1
```

* **Método pre-configuración**: Este método contiene la configuración del plugin que se realiza **antes** de que el *core* invoque al componente *jqGrid*. Como normativa se realiza una única llamada a un método del plugin con la nomenclatura **preConfigure<nombrePugin>**.

```js
preConfiguration: function(settings){
  var $self = this;
  return $self.rup_table('preConfigureEmpty', settings);
},
```

* **Método post-configuración**: Este método contiene la configuración del plugin que se realiza **después** de que el *core* invoque al componente *jqGrid*. Como normativa se realiza una única llamada a un método del plugin con la nomenclatura **postConfigure<nombrePugin>**.

```js
postConfiguration: function(settings){
  var $self = this;
  return $self.rup_table('postConfigureEmpty', settings);
},
```

## Carga de plugins

La carga de los plugins se realiza desde el *core* del componente RUP Table.

En el momento de inicialización del componente por parte de una aplicación se especifican los plugins que van a ser utilizados. Esto se realiza mediante la propiedad **usePlugins** de las opciones de configuración.

### Declaración de plugins en la inicialización

Un ejemplo de definición de un componente RUP Table con plugins sería la siguiente:

```js
$("#table").rup_table({
  url: "../jqGridUsuario",

  usePlugins:[
    "formEdit",
    "feedback",
    "toolbar",
    "contextMenu",
    "responsive",
    "filter",
    "search",
    "report",
    "multifilter"
  ],
  // Resto de opciones de configuración
});
```

Mediante un array se especifican en la propiedad **usePlugins** los plugins que van a ser utilizados en la Tabla.


### Carga de plugins en el componente

Los plugins especificados en la propiedad **usePlugins** serán cargados por el *core*. Esto se realiza en el método ```_init``` del fichero ```rup.table.core.js```.

Las diferentes secciones de la inicialización y su cometido son las siguientes.


#### Configuración

Se obtiene la configuración del plugin de acuerdo a las configuraciones parciales especificadas por cada uno de los componentes. El orden de prevalencia es el siguiente:

1. Configuración del usuario.
2. Configuración por defecto de los plugins.
3. Configuración por defecto del core.

Así pues, este sería el modo en el que se obtiene la configuración final.

* Se obtienen la lista de plugins que deben ser cargados por el componente en la propiedad **configuredPlugins**. Esto se realiza a partir de los plugins indicados en la propiedad por defecto **defaultPugins** y los especificados por el usuario en la propiedad **usePlugins**. Los plugins especificados por el usuario prevalecen sobre los especificados en los valores por defecto.

```js
var defaultPugins = (jQuery.isArray(args[0].defaultPlugins) ? args[0].defaultPlugins : jQuery.fn.rup_table.defaults.defaultPlugins),
  userPlugins = jQuery.merge([], args[0].usePlugins),
  configuredPlugins = jQuery.merge(jQuery.merge([], defaultPugins), userPlugins);
```

* Se determina el orden de carga de los plugins de acuerdo al valor de la propiedad **loadOrder** definida en cada plugin.

```js
jQuery.rup_utils.sortArray(configuredPlugins, function (obj1, obj2) {
  return rup_table.plugins[obj2].loadOrder - rup_table.plugins[obj1].loadOrder;
});
```

* Se obtiene la configuración final del componente. De acuerdo al orden de prevalencia de las opciones de configuración se obtiene en la variable **settings** la configuración definitiva. Estos son los pasos a dar.

  * Se procesa la configuración por defecto del core.

```js
settings = $.extend(true, {}, settings, jQuery.fn.rup_table.plugins.core.defaults);
$self[0]._ADAPTER = $.rup.adapter[settings.adapter];
```
  *  Se procesan las configuraciones por defecto de los plugins.

```js
$.each(configuredPlugins, function (index, name) {
  if (rup_table.plugins[name] !== undefined && jQuery.fn.rup_table.plugins[name] !== undefined) {
    settings = $.extend(true, {}, settings, jQuery.fn.rup_table.plugins[name].defaults);
  }
});
```

  * Se aplica la configuración espeficada por el usuario para obtener las opciones definitivas.

```js
settings = jQuery.extend(true, {}, jQuery.fn.rup_table.defaults, settings, args[0]);
```

#### Ejecución de métodos pre y post

Una vez obtenida la configuración definitiva con la que se va a configurar el componente, se procede a ejecutar los métodos de incialización del core como de los plugins.

* Ejecución de la preconfiguración del core.

```js
$self.rup_table('preConfigureCore', settings);
```

* Ejecución de los métodos de preconfiguración de los plugins.

```js
$.each(configuredPlugins, function (index, name) {
  if (jQuery.isFunction(rup_table.plugins[name].preConfiguration)) {
    jQuery.proxy(rup_table.plugins[name].preConfiguration, $self)(settings);
  }
});
```

* Invocación al plugin **jqGrid**. La invocación se realiza con las opciones de configuración definidas por el core, plugins y usuario.

```js
$self.jqGrid(settings);
```

* Ejecución de la postconfiguración del core.

```js
$self.rup_table('postConfigureCore', settings);
```

* Ejecución de los métodos de postconfiguración de los plugins.

```js
$.each(configuredPlugins, function (index, name) {
  if (jQuery.isFunction(rup_table.plugins[name].postConfiguration)) {
    jQuery.proxy(rup_table.plugins[name].postConfiguration, $self)(settings);
  }
});
```

Una vez ejecutados los métodos correspondientes se almacenan los ```settigns``` para su posterior uso y se emite el evento ```rupTable_coreConfigFinished``` indicando la finalización de la inicialización del componente.

```js
$self.data('settings', settings);

$self.triggerHandler('rupTable_coreConfigFinished');
```
