# RUP Table - Edición en formulario

Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra
dentro de un diálogo y ofrece las siguientes funcionalidades:

* Añadir un nuevo registro o modificar uno ya existente.
* Cancelar la inserción o edición de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre los diferentes elementos.

![Imagen 1](img/rup.table.formEdit_1.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor formEdit. La configuración del plugin se especifica en la propiedad formEdit.

```js
$("#idComponente").rup_table({
    formEdit: {
        // Propiedades de configuración del plugin formEdit
        detailForm: '#example_detail_div',
        validate: {
            rules: {
                'nombre': {
                    required: true
                },
                'apellido1': {
                    required: true
                },
                'fechaAlta': {
                    required: true
                },
                'fechaBaja': {
                    date: true
                }
            }
        },
        cancelDeleteFunction: function () {
            console.log('Ha cancelado la acción de eliminar.');
        },
        confirmDialogs: {
            saveDialog: false,
            cancelDialog: true,
            deleteDialog: true
        }
    }
});
```
### Propiedades de configuración

Identificador del formulario de edición:
```js
formEdit: {
    detailForm: '#example_detail_div'
}
```
&nbsp;

Endpoint que devolverá el formulario de edición en aquellos casos en los que se haya activado su dinamismo (más información sobre su activación [aquí](./rup.table.md#95-propiedades-adicionales)):
```js
formEdit: {
    // El valor por defecto es './editForm' aunque puede variar dependiendo del campo urlBase
    url: './editFormDouble'
}
```
Cabe decir que para que estos formularios funcionen correctamente, hay que llevar a cabo algunas modificaciones en las JSPs de edición. Los cambios a realizar serían los siguientes:
* Ponerle el identificador **XXX_detail_form_container** al elemento **div** que contiene la clase **dialog-content-material**. Cabe decir que las tres equises hay que sustituirlas por el identificador de la tabla, por ejemplo, en una tabla con identificador *example*, el identificador a usar en el *div* sería *example_detail_form_container*. Esto sería un ejemplo real: 
    ```html
        <!-- Formulario de detalle -->
        <div id="example_detail_div" class="rup-table-formEdit-detail d-none">
        	<!-- Barra de navegación del detalle -->
        	<div id ="example_detail_navigation" class="row no-gutters"></div>
        	<!-- Separador -->
        	<hr class="m-1">
        	<div id="example_detail_form_container" class="dialog-content-material">
        		<!-- El Formulario será insertado mediante JavaScript a partir de la JSP tableEditForm -->
        	</div>
        	<!-- Botonera del formulario de detalle -->
        	<div class="rup-table-buttonpanel-material">
        		<div class="text-right">
        			<!-- Botón cancelar -->
        			<button id="example_detail_button_cancel" type="button">
        				<spring:message code="cancel" />
        			</button>
        			<!-- Botón guardar -->
        			<button id="example_detail_button_save" type="button">
        				<spring:message code="save" />
        			</button>
        			<!-- Botón guardar y continuar -->
        			<button id="example_detail_button_save_repeat" type="button">
        				<spring:message code="saveAndContinue" />
        			</button>
        		</div>
        	</div>
        </div>
    ```
* Una nueva JSP que contenga únicamente el formulario a usar pero que genere un *action* de manera dinámica en base al *method* recibido desde la capa de cliente (puede usarse cualquier otra lógica). La siguiente JSP puede ayudar a entender lo anteriormente descrito:
    ```html
        <!-- Formulario -->
        <c:set value="${actionType == 'POST' ? 'add': 'edit'}" var="endpoint" />
        <spring:url value="/table/${endpoint}" var="url"/>
        <form:form modelAttribute="usuario" id="example_detail_form" action="${url}">
        	<!-- Feedback del formulario de detalle -->
        	<div id ="example_detail_feedback"></div>	
        	<div class="form-row">
        		<!-- Campos del formulario de detalle -->
        		<c:if test="${endpoint == 'edit'}">
        			<form:input path="id" id="id_detail_table" type="hidden" />
        		</c:if>
        		<div class="form-groupMaterial col-sm">
        	    	<form:input path="nombre" id="nombre_detail_table" />
        	    	<label for="nombre_detail_table"><spring:message code="nombre" /></label>
        	    </div>       
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="apellido1" id="apellido1_detail_table" />
        	    	<label for="apellido1_detail_table"><spring:message code="apellido1" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="apellido2" id="apellido2_detail_table" />
        	    	<label for="apellido2_detail_table"><spring:message code="apellido2" /></label>
        	    </div>       
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="fechaBaja" id="fechaBaja_detail_table" />
        	    	<label for="fechaBaja_detail_table"><spring:message code="fechaBaja" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="fechaAlta" id="fechaAlta_detail_table" />
        	    	<label for="fechaAlta_detail_table"><spring:message code="fechaAlta" /></label>
        	    </div>
        	    <div class="checkbox-material col-sm">
        	    	<form:checkbox path="ejie" id="ejie_detail_table" value="1" />
        	    	<label for="ejie_detail_table"><spring:message code="ejie" /></label>
        	    </div>
        	</div>
        	<div class="form-row">
        	    <div class="form-groupMaterial col-sm">
        	    	<form:input path="rol" id="rol_detail_table" />
        	    	<label for="rol_detail_table"><spring:message code="rol" /></label>
        	    </div>
        	</div>
        </form:form>
    ```
&nbsp;

Añadir validaciones sobre los campos:
```js
formEdit: {
    validate: {
        rules: {
            'nombre': {
                required: true
            },
            'apellido1': {
                required: true
            },
            'fechaAlta': {
                required: true
            },
            'fechaBaja': {
                date: true
            }
        }
    }
}
```
&nbsp;

Habilitar la personalización de una función a la hora de cancelar, cuando se va a borrar los registros de la tabla:
```js
formEdit: {
    cancelDeleteFunction: function () {
        console.log('Ha cancelado la acción de eliminar.');
    }
}
```
&nbsp;

Permitir habilitar o deshabilitar los diálogos de confirmación:
```js
formEdit: {
    confirmDialogs: {
        saveDialog: false,
        cancelDialog: true,
        deleteDialog: true
    }
}
```
&nbsp;

Se ha creado también la posibilidad de tener listas de checkbox, dinámicas y deben tener la siguiente estructura:
```xml
<c:forEach items="${usuario.lugares}" var="lugarapli" varStatus="status" >
    <div class="form-row">      
        <div class="checkbox-material col-sm">
            <form:checkbox path="lugares[${status.index}].checkeado" id="checkeado${status.index}_lugares" value="1" data-lista="lugares" data-clave="buzones" data-valor="${lugarapli.id}" />
            <label for="checkeado${status.index}_lugares">${lugarapli.email}</label>
         </div>
    </div>
</c:forEach>
```		
Destacan cuatro elementos:
1. PATH: es donde se colocará el array y seguido un punto, después del punto será el atributo name, en el caso del ejemplo checkeado.
2. DATA-LISTA: nombre de la entidad para mapearlo en el controller, en nuestro caso la entidad se llama 'lugares'.
3. DATA-CLAVE: clave de la entidad, en caso de ser una lista de objetos, en nuestro ejemplo la clave primaria es 'buzones', no se admitirán claves con múltiples pks y en caso de ser una lista de String, este parámetro no hay que ponerlo.
4. DATA-VALOR: recoge el valor del identificador, la clave primaria.

# 2. Aspectos a tener en cuenta
Siempre que se vaya a añadir un campo de tipo "hidden" en el formulario para su envío al servidor, es necesario especificarlo con un identificador (id), de lo contrario, el serializador entenderá que es un campo de gestión interna y lo ignorará por ser el comportamiento esperado para este tipo de campos.

También se ha de tener en cuenta que el formulario que contiene el diálogo de editForm se carga dinámicamente cuando se pulsa sobre los botones de añadir, editar o clonar (se queda cacheado cuando se repiten las acciones consecutivamente). Para inicializar los componentes de formulario de UDA como el autocomplete, combo o date, hay que hacerlo mediante el colModel de tal manera que UDA pueda encargarse de reinicializar los componentes siempre que sea necesario. Para más información sobre cómo crear el colModel, leer el documento [rup.table](https://github.com/UDA-EJIE/udaRUP/blob/master/doc/guides/rup.table.md).