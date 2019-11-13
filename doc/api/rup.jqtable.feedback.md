<a name="module_rup_jqtable/feedback"></a>

## rup_jqtable/feedback
Permite configurar un área para informar al usuario de cómo interactuar con el componente. Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.

**Summary**: Plugin de feedback del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["feedback"],	feedback:{		// Propiedades de configuración del plugin feedback	}});
```

* [rup_jqtable/feedback](#module_rup_jqtable/feedback)
    * [~options](#module_rup_jqtable/feedback..options)
    * [~preConfigureFeedback(settings)](#module_rup_jqtable/feedback..preConfigureFeedback)
    * [~postConfigureFeedback(settings)](#module_rup_jqtable/feedback..postConfigureFeedback)
    * [~showFeedback($feedback, msg, type, options)](#module_rup_jqtable/feedback..showFeedback)

<a name="module_rup_jqtable/feedback..options"></a>

### rup_jqtable/feedback~options
Propiedades de configuración del plugin feedback del componente RUP Table.

**Kind**: inner property of [<code>rup_jqtable/feedback</code>](#module_rup_jqtable/feedback)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> | <code>null</code> | Nombre del identificador a utilizar en el feedback. Se utiliza en caso de no querer utilizar el por defecto. |
| [config] | <code>object</code> |  | Determina la configuración por defecto del feedback. |
| [okFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo . |
| [errorFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo ERROR. |
| [alertFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo ALERT. |
| [internalFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback interno de la tabla. |

<a name="module_rup_jqtable/feedback..preConfigureFeedback"></a>

### rup_jqtable/feedback~preConfigureFeedback(settings)
Metodo que realiza la pre-configuración del plugin feedback del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/feedback..postConfigureFeedback"></a>

### rup_jqtable/feedback~postConfigureFeedback(settings)
Metodo que realiza la post-configuración del plugin feedback del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/feedback..showFeedback"></a>

### rup_jqtable/feedback~showFeedback($feedback, msg, type, options)
Muestra el feedback indicado con la configuración especificada.

**Kind**: inner method of [<code>rup_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| $feedback | <code>object</code> | Objeto jQuery que referencia al componente feedback. |
| msg | <code>string</code> | : Mensaje a mostrar en el feedback. |
| type | <code>string</code> | Clase de feedback a mostrar. |
| options | <code>object</code> | Propiedades de configuración del feedback |

**Example**  
```js
$("#idTable").rup_jqtable("showFeedback", $("#idFeedback"), "Texto...", "ok"), {};
```
