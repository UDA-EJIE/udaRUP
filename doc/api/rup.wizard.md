<a name="module_rup_wizard"></a>

## rup\_wizard
Permitir guiar al usuario paso a paso a través de un proceso realizando las tareas dentro de un orden señalado.

**Summary**: Componente RUP Wizard.  
**Example**  
```js
var properties = {};$("#id_form").rup_wizard(properties)
```

* [rup_wizard](#module_rup_wizard)
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
