<a name="module_rup_table/feedback"></a>

## rup_table/feedback
Permite configurar un área para informar al usuario de cómo interactuar con el componente.  Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.

**Summary**: Plugin de feedback del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["feedback"],       	feedback:{       		// Propiedades de configuración del plugin feedback       	}});
```

* [rup_table/feedback](#module_rup_table/feedback)
    * [~options](#module_rup_table/feedback..options)
    * [~preConfigureFeedback(settings)](#module_rup_table/feedback..preConfigureFeedback)
    * [~postConfigureFeedback(settings)](#module_rup_table/feedback..postConfigureFeedback)
    * [~showFeedback($feedback, msg, type, options)](#module_rup_table/feedback..showFeedback)

<a name="module_rup_table/feedback..options"></a>

### rup_table/feedback~options
Parámetros de configuración para el feedback.

**Kind**: inner property of <code>[rup_table/feedback](#module_rup_table/feedback)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Nombre del identificador a utilizar en el feedback. Se utiliza en caso de no querer utilizar el por defecto. |
| config | <code>object</code> | Determina la configuración por defecto del feedback |
| okFeedbackConfig | <code>object</code> | Determina la configuración del feedback en los casos de mensajes de tipo OK |
| errorFeedbackConfig | <code>object</code> | Determina la configuración del feedback en los casos de mensajes de tipo ERROR |
| alertFeedbackConfig | <code>object</code> | Determina la configuración del feedback en los casos de mensajes de tipo ALERT |
| internalFeedbackConfig | <code>object</code> | Determina la configuración del feedback interno de la tabla. |

<a name="module_rup_table/feedback..preConfigureFeedback"></a>

### rup_table/feedback~preConfigureFeedback(settings)
Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/feedback](#module_rup_table/feedback)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/feedback..postConfigureFeedback"></a>

### rup_table/feedback~postConfigureFeedback(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/feedback](#module_rup_table/feedback)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/feedback..showFeedback"></a>

### rup_table/feedback~showFeedback($feedback, msg, type, options)
Muestra el feedback indicado con la configuración especificada.

**Kind**: inner method of <code>[rup_table/feedback](#module_rup_table/feedback)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $feedback | <code>object</code> | Objeto jQuery que referencia al componente feedback. |
| msg | <code>string</code> | Mensaje a mostrar en el feedback |
| type | <code>string</code> | Clase de feedback a mostrar. |
| options | <code>object</code> | Propiedades de configuración del feedback |

