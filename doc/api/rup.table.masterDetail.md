<a name="module_rup.table.masterDetail"></a>

## rup.table.masterDetail
Módulo que permite toda la seleción simple

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
Solo podrá usarse esta obra si se respeta la Licencia.
Puede obtenerse una copia de la Licencia en

     http://ec.europa.eu/idabc/eupl.html

Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
que establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table.masterDetail](#module_rup.table.masterDetail)
    * [~init(dt)](#module_rup.table.masterDetail..init)
    * [~getMasterTablePkObject(options)](#module_rup.table.masterDetail..getMasterTablePkObject) ⇒ <code>object</code>

<a name="module_rup.table.masterDetail..init"></a>

### rup.table.masterDetail~init(dt)
Se inicializa el componente select

**Kind**: inner method of [<code>rup.table.masterDetail</code>](#module_rup.table.masterDetail)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.masterDetail..getMasterTablePkObject"></a>

### rup.table.masterDetail~getMasterTablePkObject(options) ⇒ <code>object</code>
Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.

**Kind**: inner method of [<code>rup.table.masterDetail</code>](#module_rup.table.masterDetail)  
**Returns**: <code>object</code> - - Objeto json con la clave primaria del registro correspondiente de la tabla maestra  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración de la acción de inserción. |

