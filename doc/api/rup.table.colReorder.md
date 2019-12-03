## Objects

<dl>
<dt><a href="#Settings object which contains customisable information for ColReorder instance">Settings object which contains customisable information for ColReorder instance</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Information used for the mouse drag">Information used for the mouse drag</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Common and useful DOM elements for the class instance">Common and useful DOM elements for the class instance</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#version">version</a> : <code>String</code></dt>
<dd><p>ColReorder version</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fnInvertKeyValues">fnInvertKeyValues(array)</a> ⇒</dt>
<dd><p>Switch the key value pairing of an index array to be value key (i.e. the old value is now the
key). For example consider [ 2, 0, 1 ] this would be returned as [ 1, 2, 0 ].</p>
</dd>
<dt><a href="#fnArraySwitch">fnArraySwitch(array, int, int)</a> ⇒</dt>
<dd><p>Modify an array by switching the position of two elements</p>
</dd>
<dt><a href="#fnDomSwitch">fnDomSwitch(string, int, int)</a> ⇒</dt>
<dd><p>Switch the positions of nodes in a parent node (note this is specifically designed for
table rows). Note this function considers all element nodes under the parent!</p>
</dd>
<dt><a href="#fnReset">fnReset()</a> ⇒ <code>this</code></dt>
<dd><p>Reset the column ordering to the original ordering that was detected on
start up.</p>
</dd>
<dt><del><a href="#fnGetCurrentOrder">fnGetCurrentOrder()</a> ⇒ <code>array</code></del></dt>
<dd><p><code>Deprecated</code> - Get the current order of the columns, as an array.</p>
</dd>
<dt><a href="#fnOrder">fnOrder()</a> ⇒ <code>array</code></dt>
<dd><p>Get the current order of the columns, as an array. Note that the values
given in the array are unique identifiers for each column. Currently
these are the original ordering of the columns that was detected on
start up, but this could potentially change in future.</p>
</dd>
<dt><a href="#fnOrder">fnOrder([set])</a> ⇒ <code>this</code></dt>
<dd><p>Set the order of the columns, from the positions identified in the
ordering array given. Note that ColReorder takes a brute force approach
to reordering, so it is possible multiple reordering events will occur
before the final order is settled upon.</p>
</dd>
<dt><a href="#fnTranspose">fnTranspose(idx, dir)</a> ⇒ <code>int</code> | <code>array</code></dt>
<dd><p>Convert from the original column index, to the original</p>
</dd>
<dt><a href="#_fnCursorPosition">_fnCursorPosition(e, prop)</a> ⇒ <code>number</code></dt>
<dd><p>Get cursor position regardless of mouse or touch input</p>
</dd>
</dl>

<a name="Settings object which contains customisable information for ColReorder instance"></a>

## Settings object which contains customisable information for ColReorder instance : <code>object</code>
**Kind**: global namespace  
<a name="Information used for the mouse drag"></a>

## Information used for the mouse drag : <code>object</code>
**Kind**: global namespace  
<a name="Common and useful DOM elements for the class instance"></a>

## Common and useful DOM elements for the class instance : <code>object</code>
**Kind**: global namespace  
<a name="version"></a>

## version : <code>String</code>
ColReorder version

**Kind**: global constant  
**Default**: <code>As code</code>  
<a name="fnInvertKeyValues"></a>

## fnInvertKeyValues(array) ⇒
Switch the key value pairing of an index array to be value key (i.e. the old value is now thekey). For example consider [ 2, 0, 1 ] this would be returned as [ 1, 2, 0 ].

**Kind**: global function  
**Returns**: array  

| Param | Description |
| --- | --- |
| array | aIn Array to switch around |

<a name="fnArraySwitch"></a>

## fnArraySwitch(array, int, int) ⇒
Modify an array by switching the position of two elements

**Kind**: global function  
**Returns**: void  

| Param | Description |
| --- | --- |
| array | aArray Array to consider, will be modified by reference (i.e. no return) |
| int | iFrom From point |
| int | iTo Insert point |

<a name="fnDomSwitch"></a>

## fnDomSwitch(string, int, int) ⇒
Switch the positions of nodes in a parent node (note this is specifically designed fortable rows). Note this function considers all element nodes under the parent!

**Kind**: global function  
**Returns**: void  

| Param | Description |
| --- | --- |
| string | sTag Tag to consider |
| int | iFrom Element to move |
| int | Point to element the element to (before this point), can be null for append |

<a name="fnReset"></a>

## fnReset() ⇒ <code>this</code>
Reset the column ordering to the original ordering that was detected onstart up.

**Kind**: global function  
**Returns**: <code>this</code> - Returns `this` for chaining.  
**Example**  
```js
// DataTables initialisation with ColReorder   var table = $('#example').dataTable( {       "sDom": 'Rlfrtip'   } );   // Add click event to a button to reset the ordering   $('#resetOrdering').click( function (e) {       e.preventDefault();       $.fn.dataTable.ColReorder( table ).fnReset();   } );
```
<a name="fnGetCurrentOrder"></a>

## ~~fnGetCurrentOrder() ⇒ <code>array</code>~~
***Deprecated***

`Deprecated` - Get the current order of the columns, as an array.

**Kind**: global function  
**Returns**: <code>array</code> - Array of column identifiers  
<a name="fnOrder"></a>

## fnOrder() ⇒ <code>array</code>
Get the current order of the columns, as an array. Note that the valuesgiven in the array are unique identifiers for each column. Currentlythese are the original ordering of the columns that was detected onstart up, but this could potentially change in future.

**Kind**: global function  
**Returns**: <code>array</code> - Array of column identifiers  
**Example**  
```js
// Get column ordering for the table   var order = $.fn.dataTable.ColReorder( dataTable ).fnOrder();
     
```
<a name="fnOrder"></a>

## fnOrder([set]) ⇒ <code>this</code>
Set the order of the columns, from the positions identified in theordering array given. Note that ColReorder takes a brute force approachto reordering, so it is possible multiple reordering events will occurbefore the final order is settled upon.

**Kind**: global function  
**Returns**: <code>this</code> - Returns `this` for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| [set] | <code>array</code> | Array of column identifiers in the new order. Note    that every column must be included, uniquely, in this array. |

**Example**  
```js
// Swap the first and second columns   $.fn.dataTable.ColReorder( dataTable ).fnOrder( [1, 0, 2, 3, 4] ); 
```
**Example**  
```js
// Move the first column to the end for the table `#example`   var curr = $.fn.dataTable.ColReorder( '#example' ).fnOrder();   var first = curr.shift();   curr.push( first );   $.fn.dataTable.ColReorder( '#example' ).fnOrder( curr ); 
```
**Example**  
```js
// Reverse the table's order   $.fn.dataTable.ColReorder( '#example' ).fnOrder(     $.fn.dataTable.ColReorder( '#example' ).fnOrder().reverse()   );
```
<a name="fnTranspose"></a>

## fnTranspose(idx, dir) ⇒ <code>int</code> \| <code>array</code>
Convert from the original column index, to the original

**Kind**: global function  
**Returns**: <code>int</code> \| <code>array</code> - Converted values  

| Param | Type | Description |
| --- | --- | --- |
| idx | <code>int</code> \| <code>array</code> | Index(es) to convert |
| dir | <code>string</code> | Transpose direction - `fromOriginal` / `toCurrent`   or `'toOriginal` / `fromCurrent` |

<a name="_fnCursorPosition"></a>

## \_fnCursorPosition(e, prop) ⇒ <code>number</code>
Get cursor position regardless of mouse or touch input

**Kind**: global function  
**Returns**: <code>number</code> - Value  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | jQuery Event |
| prop | <code>string</code> | Property to get |

