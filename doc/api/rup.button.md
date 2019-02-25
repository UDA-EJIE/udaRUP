<a name="module_rup_button"></a>

## rup_button
Presenta un control de interación con el usuario. Se trata de extender los botones estandar del HTML para dotarles de mayores funcionalidades con las que mejorar la usabilidad de la aplicación.

**Summary**: Componente RUP Button.  
**Example**  
```js
// Botón por defecto$("#idButton").rup_button({});// Botón desplegable$("#idButtonDrop").rup_button({	  dropdown:{		  dropdownListId:"dropdownHtmlList"	  }});
```

* [rup_button](#module_rup_button)
    * [~dropdown_defaults](#module_rup_button..dropdown_defaults)
    * [~defaults()](#module_rup_button..defaults)

<a name="module_rup_button..dropdown_defaults"></a>

### rup_button~dropdown_defaults
Opciones por defecto del objeto de configuración del menú desplegable asociado al botón.

**Kind**: inner property of [<code>rup_button</code>](#module_rup_button)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [dropdownIcon] | <code>string</code> | <code>&quot;ui-icon-triangle-1-s&quot;</code> | Clase css correspondiente al icono del control que despliega el menú. |

<a name="module_rup_button..defaults"></a>

### rup_button~defaults()
Opciones por defecto de configuración del componente.

**Kind**: inner method of [<code>rup_button</code>](#module_rup_button)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [dropdown] | <code>boolean</code> \| <code>Object</code> | <code>false</code> | Determina si el botón va a contar con un menú desplegable de acciones secundarias. En caso de mostrar un desplegable esta propiedad contendrá el objeto de configuración del mismo. |

