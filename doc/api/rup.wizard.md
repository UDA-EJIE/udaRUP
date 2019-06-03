<a name="module_rup_wizard"></a>

## rup\_wizard
Permitir guiar al usuario paso a paso a través de un proceso realizando las tareas dentro de un orden señalado.

**Summary**: Componente RUP Wizard.  
**Example**  
```js
var properties = {};$("#id_form").rup_wizard(properties)
```

* [rup_wizard](#module_rup_wizard)
    * [~options](#module_rup_wizard..options)
    * [~step(step)](#module_rup_wizard..step)
    * [~first()](#module_rup_wizard..first)
    * [~last()](#module_rup_wizard..last)
    * [~getCurrentStep()](#module_rup_wizard..getCurrentStep) ⇒ <code>Integer</code>
    * [~isCurrentStep(step)](#module_rup_wizard..isCurrentStep) ⇒ <code>boolean</code>
    * [~isCurrentStepFirst()](#module_rup_wizard..isCurrentStepFirst) ⇒ <code>boolean</code>
    * [~isCurrentStepLast()](#module_rup_wizard..isCurrentStepLast) ⇒ <code>boolean</code>
    * [~isCurrentStepSummary()](#module_rup_wizard..isCurrentStepSummary) ⇒ <code>boolean</code>
    * [~enableStep(step)](#module_rup_wizard..enableStep)
    * [~disableStep(step)](#module_rup_wizard..disableStep)
    * [~isStepDisabled(step)](#module_rup_wizard..isStepDisabled) ⇒ <code>boolean</code>
    * [~onSubmitFnc](#module_rup_wizard..onSubmitFnc) : <code>function</code>
    * [~onSummaryFnc_PRE](#module_rup_wizard..onSummaryFnc_PRE) ⇒ <code>boolean</code>
    * [~onSummaryFnc_INTER](#module_rup_wizard..onSummaryFnc_INTER) ⇒ <code>boolean</code>
    * [~onSummaryFnc_POST](#module_rup_wizard..onSummaryFnc_POST) : <code>function</code>

<a name="module_rup_wizard..options"></a>

### rup_wizard~options
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| submitButton | <code>Selector</code> |  | Identificador del botón de envío del formulario. Sirve para que dicho botón solo se muestre en el último paso del asistente. |
| [submitFnc] | <code>module:rup\_validate~onSubmitFnc</code> |  | Función que se ejecuta previamente al envío del formulario. |
| [summary] | <code>boolean</code> | <code>true</code> | Indica si se debe generar o no el paso resumen. Este paso mostrará (como texto plano) los valores seleccionados en los diferentes pasos habilitados. Si un paso se encuentra deshabilitado no se utilizarán sus valores para la generación del resumen. El paso de resumen se genera cuando se navega hacia él. |
| [summaryWithAccordion] | <code>boolean</code> | <code>false</code> | Indica si el paso resumen debe formatear los diferentes pasos del asistente mediante elementos que usan el componente accordion. |
| [summaryWithAccordionSpaceBefore] | <code>boolean</code> | <code>true</code> | Indica si cuando se genera un resumen con los diferentes pasos presentados con accordion, se debe dejar un espacio (</br>) entre el contenido y la barra con los pasos. |
| [summaryWithAccordionSpaceAfter] | <code>boolean</code> | <code>true</code> | Indica si cuando se genera un resumen con los diferentes pasos presentados con accordion, se debe dejar un espacio (</br>) entre el contenido y el contenedor de botones (siguiente y enviar). |
| [summaryTabs2Accordion] | <code>boolean</code> | <code>false</code> | Indica si los componentes rup_tab de los diferentes pasos del wizard se deben convertir en elementos del componente accordion a la hora de generar el paso resumen. |
| [summaryFnc_PRE] | [<code>onSummaryFnc\_PRE</code>](#module_rup_wizard..onSummaryFnc_PRE) |  | Función que se invocará previamente a la generación del paso resumen. En caso de devolver false no se generaría el resumen. |
| [summaryFnc_INTER] | [<code>onSummaryFnc\_INTER</code>](#module_rup_wizard..onSummaryFnc_INTER) |  | Función que se ejecuta una vez ha comenzado la generación del paso resumen. Se habrá generado la capa contenedora y duplicado el contenido de los pasos anteriores pero sin llegar a procesarse (cambiarse por texto plano). En caso de devolver false no se continuaría con el procesado del contenido de los pasos. |
| [summaryFnc_POST] | [<code>onSummaryFnc\_POST</code>](#module_rup_wizard..onSummaryFnc_POST) |  | Función que se ejecuta una vez se ha generado el paso resumen. |
| [stepFnc] | <code>object</code> |  | Objeto json que contiene las diferentes funciones a ejecutar al navegar hacia cada uno de los pasos. En caso de devolver false no se continuaría la navegación hacia dicho paso. La clave de cada elemento será el número del paso y el valor será la función a ejecutar. |
| [disabled] | <code>Array.&lt;Integer&gt;</code> |  | Array que indica los pasos a deshabilitar al inicio. En caso de que el elemento del array sea un número (numeric) se deshabilitará dicho paso y en caso de que sea un literal (string) se procesará como un intervalo que deberá definirse como “X-Y”. |
| [accordion] | <code>object</code> |  | Define de forma general el funcionamiento del componente rup_accordion en el paso de resumen. |
| [rupAccordion] | <code>object</code> |  | Define el funcionamiento del patrón rup_accordion en el resumen (de los objetos rup_accordion existentes en los pasos anteriores). No tiene valor por defecto, por lo que en caso de no definirse se toma el valor del parámetro accordion. |
| [summaryAccordion] | <code>object</code> |  | Define el funcionamiento del patrón rup_accordion en el resumen para cada uno de los pasos que lo componen (si configura la generación de resumen y conversión de pasos en accordion). No tiene valor por defecto, por lo que en caso de no definirse se toma el valor del parámetro accordion. |
| [tabAccordion] | <code>object</code> |  | Define el funcionamiento del patrón rup_accordion en el resumen, para cada los objetos rup_tab existentes en los pasos anteriores (si configura la generación de resumen y conversión de pestañas en accordion). No tiene valor por defecto, por lo que en caso de no definirse se toma el valor del parámetro accordion. |
| [rupTabsElement] | <code>string</code> | <code>&quot;&lt;h4/&gt;&quot;</code> | Define el funcionamiento del patrón rup_accordion en el resumen, para cada los objetos rup_tab existentes en los pasos anteriores (si configura la generación de resumen y conversión de pestañas en accordion). No tiene valor por defecto, por lo que en caso de no definirse se toma el valor del parámetro accordion. |
| [labelElement] | <code>string</code> | <code>&quot;&lt;span/&gt;&quot;</code> | Indica el tipo de objeto HTML en el que se convierten los objetos label en el paso de resumen. |
| [labelSeparatorElement] | <code>string</code> | <code>&quot;&lt;span/&gt;&quot;</code> | Indica el tipo de objeto HTML que se utilizará para separar los valores de sus correspondientes labels en el paso de resumen. |
| [labelSeparatorText] | <code>string</code> | <code>&quot;&amp;nbsp;&amp;nbsp;&amp;nbsp;&quot;</code> | Indica el contenido del objeto HTML que se utilizará para separar los valores de sus correspondientes labels en el paso de resumen. |
| [textareaElement] | <code>string</code> | <code>&quot;&lt;p/&gt;&quot;</code> | Indica el tipo de objeto HTML en el que se convierten los objetos textarea en el paso de resumen. |

<a name="module_rup_wizard..step"></a>

### rup_wizard~step(step)
Selecciona el paso recibido como parámetro [0..n].

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Integer</code> | Identificador del paso que se desea seleccionar. |

**Example**  
```js
$("#idForm").rup_wizard("step", 1);
```
<a name="module_rup_wizard..first"></a>

### rup_wizard~first()
Selecciona el primer paso del asistente.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Example**  
```js
$("#idForm").rup_wizard("first");
```
<a name="module_rup_wizard..last"></a>

### rup_wizard~last()
Selecciona el último paso del asistente.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Example**  
```js
$("#idForm").rup_wizard("last");
```
<a name="module_rup_wizard..getCurrentStep"></a>

### rup_wizard~getCurrentStep() ⇒ <code>Integer</code>
Devuelve el número del paso actual.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>Integer</code> - - Número de paso actual.  
**Example**  
```js
$("#idForm").rup_wizard("getCurrentStep");
```
<a name="module_rup_wizard..isCurrentStep"></a>

### rup_wizard~isCurrentStep(step) ⇒ <code>boolean</code>
Indica si el paso recibido como parámetro es el activo.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - Devuelve true en caso de que el paso indicado sea el actual y false en caso de que no.  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Integer</code> | Número de paso. |

**Example**  
```js
$("#idForm").rup_wizard("isCurrentStep", 2);
```
<a name="module_rup_wizard..isCurrentStepFirst"></a>

### rup_wizard~isCurrentStepFirst() ⇒ <code>boolean</code>
Indica si el paso activo es el primero.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - Devuelve true en caso de que el último paso sea el activo y false en caso de que no.  
**Example**  
```js
$("#idForm").rup_wizard("isCurrentStepFirst");
```
<a name="module_rup_wizard..isCurrentStepLast"></a>

### rup_wizard~isCurrentStepLast() ⇒ <code>boolean</code>
Indica si el paso activo es el último.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - Devuelve true en caso de que el primer paso sea el activo y false en caso de que no.  
**Example**  
```js
$("#idForm").rup_wizard("isCurrentStepLast");
```
<a name="module_rup_wizard..isCurrentStepSummary"></a>

### rup_wizard~isCurrentStepSummary() ⇒ <code>boolean</code>
Indica si el paso activo es el resumen.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - Devuelve true en caso de que el paso activo sea el del resumen y false en caso de que no.  
**Example**  
```js
$("#idForm").rup_wizard("isCurrentStepSummary");
```
<a name="module_rup_wizard..enableStep"></a>

### rup_wizard~enableStep(step)
Habilita el paso recibido como parámetro.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Integer</code> | Numero que identifica el paso que deseamos habilitar. |

**Example**  
```js
$("#idForm").rup_wizard("enableStep", 2);
```
<a name="module_rup_wizard..disableStep"></a>

### rup_wizard~disableStep(step)
Deshabilita el paso recibido como parámetro.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Integer</code> | Numero que identifica el paso que deseamos deshabilitar. |

**Example**  
```js
$("#idForm").rup_wizard("disableStep", 2);
```
<a name="module_rup_wizard..isStepDisabled"></a>

### rup_wizard~isStepDisabled(step) ⇒ <code>boolean</code>
Indica si el paso recibido como parámetro está deshabilitado.

**Kind**: inner method of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - Devuelve true si el paso indicado está deshabilitado y false en caso de que no.  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>Integer</code> | Numero que identifica el paso que deseamos deshabilitar. |

**Example**  
```js
$("#idForm").rup_wizard("isStepDisabled", 2);
```
<a name="module_rup_wizard..onSubmitFnc"></a>

### rup_wizard~onSubmitFnc : <code>function</code>
Función de callback que se ejecuta previamente al envío del formulario.

**Kind**: inner typedef of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Example**  
```js
$("#idForm").rup_wizard({  submitFnc: function(){  }});
```
<a name="module_rup_wizard..onSummaryFnc_PRE"></a>

### rup_wizard~onSummaryFnc\_PRE ⇒ <code>boolean</code>
Función de callback que se invocará previamente a la generación del paso.

**Kind**: inner typedef of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - En caso de devolver false no se generaría el resumen.  
**Example**  
```js
$("#idForm").rup_wizard({  summaryFnc_PRE: function(){  }});
```
<a name="module_rup_wizard..onSummaryFnc_INTER"></a>

### rup_wizard~onSummaryFnc\_INTER ⇒ <code>boolean</code>
Función de callback que se ejecuta una vez ha comenzado la generación del paso resumen.

**Kind**: inner typedef of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Returns**: <code>boolean</code> - - En caso de devolver false no se continuaría con el procesado del contenido de los pasos  
**Example**  
```js
$("#idForm").rup_wizard({  summaryFnc_INTER: function(){  }});
```
<a name="module_rup_wizard..onSummaryFnc_POST"></a>

### rup_wizard~onSummaryFnc\_POST : <code>function</code>
Función de callback que se invocará una vez se ha generado el paso resumen.

**Kind**: inner typedef of [<code>rup\_wizard</code>](#module_rup_wizard)  
**Example**  
```js
$("#idForm").rup_wizard({  summaryFnc_POST: function(){  }});
```
