## Functions

<dl>
<dt><a href="#getRupValue">getRupValue()</a> ⇒ <code>number</code></dt>
<dd><p>Método utilizado para obtener el valor del componente. Este método es el utilizado
            por el resto de componentes RUP para estandarizar la obtención del valor del Spinner.</p>
</dd>
<dt><a href="#setRupValue">setRupValue(param)</a></dt>
<dd><p>Método utilizado para asignar el valor al componente. Este método es el utilizado por
            el resto de componentes RUP para estandarizar la asignación del valor al Spinner.</p>
</dd>
</dl>

<a name="getRupValue"></a>

## getRupValue() ⇒ <code>number</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado
        	por el resto de componentes RUP para estandarizar la obtención del valor del Spinner.

**Kind**: global function  
**Returns**: <code>number</code> - - Devuelve el valor actual del componente seleccionado por el usuario.  
**Example**  
```js
$("#idSpinner").rup_spinner("getRupValue");
```
<a name="setRupValue"></a>

## setRupValue(param)
Método utilizado para asignar el valor al componente. Este método es el utilizado por
    		el resto de componentes RUP para estandarizar la asignación del valor al Spinner.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>string</code> \| <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#idSpinner").rup_spinner("setRupValue", 5);
```
