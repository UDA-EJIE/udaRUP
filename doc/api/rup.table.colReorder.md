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
</dl>

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

