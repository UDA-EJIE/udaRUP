# RUP Table - Edición en línea

Permite la edición de los registros de la tabla utilizando un formulario dentro de la tabla. El formulario se muestra
dentro de una fila y ofrece las siguientes funcionalidades:

* Añadir un nuevo registro o modificar uno ya existente.
* Cancelar la inserción o edición de un registro.
* Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre los diferentes elementos.

![Imagen 1](img/edicionEnLinea.png)

# 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor inlineEdit. La configuración del plugin se especifica en la propiedad inlineEdit.

```js
$("#idComponente").rup_table({
    inlineEdit: {
        // Propiedades de configuración del plugin inlineEdit
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
            },
            messages: {
                required: 'Campo requerido'
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

Añadir validaciones sobre los campos:
```js
inlineEdit: {
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
        },
        messages: {
            required: 'Campo requerido'
        }
    }
}
```
&nbsp;

Habilitar la personalización de una función a la hora de cancelar, cuando se va a borrar los registros de la tabla:
```js
inlineEdit: {
    cancelDeleteFunction: function () {
        console.log('Ha cancelado la acción de eliminar.');
    }
}
```
&nbsp;

Permitir habilitar o deshabilitar los diálogos de confirmación:
```js
inlineEdit: {
    confirmDialogs: {
        saveDialog: false,
        cancelDialog: true,
        deleteDialog: true
    }
}
```
&nbsp;

Endpoint que devolverá el formulario necesario para poder llevar a cabo la edición en aquellos casos en los que se haya activado su dinamismo (más información sobre su activación [aquí](./rup.table.md#95-propiedades-adicionales)):
```js
inlineEdit: {
    // El valor por defecto es './inlineEdit' aunque puede variar dependiendo del campo urlBase.
    url: './inlineEditDouble',
    // El valor por defecto es '/add'. Este campo tiene que apuntar al mismo endpoint que el formulario.
    addUrl: '/addMultipart',
    // El valor por defecto es '/edit'. Este campo tiene que apuntar al mismo endpoint que el formulario.
    editUrl: '/editMultipart',
    // Por defecto, el componente siempre enviará el método además del valor de la clave primaria, siempre y cuando alguna fila haya sido seleccionada.
	// También pueden añadirse más parámetros mediante el objeto data, incluso para sobrescribir,
    // aunque todo parámetro que se envíe de esta forma, ha de ser validado como parámetro de cliente por Hdiv (configurable en la clase UDA4HdivConfig).
    data: {
        'nombreUsuario': 'Este es el nombre del usuario'
    }
}
```
Para que esto funcione correctamente, hay que crear una JSP que deberá ser recreada para todos aquellos mantenimientos que lo requieran, es decir, **ya no podrá ser genérica como lo fue hasta la versión 5.1.0 de UDA, porque a diferencia de antes, es necesario declarar los campos que forman el formulario**. A continuación, un ejemplo del contenido que puede contener este archivo:
```jsp
<!-- Formulario -->
<c:choose>
	<c:when test="${enableMultipart}">
		<c:set value="${actionType == 'POST' ? 'addMultipart': 'editMultipart'}" var="endpoint" />
	</c:when>
	<c:when test="${!enableMultipart}">
		<c:set value="${actionType == 'POST' ? 'add': 'edit'}" var="endpoint" />
	</c:when>
</c:choose>
<spring:url value="/table/${endpoint}" var="url"/>
<form:form modelAttribute="usuario" id="example_inlineEdit_aux_form" class="d-none" action="${url}" method="${actionType}">
	<c:if test="${!actionType.equals('POST')}">
		<form:hidden path="id" value="${pkValue.id}" id="id_example_inlineEdit_aux_form" />
	</c:if>
	<form:input path="nombre" id="nombre_example_inlineEdit_aux_form" />
	<form:input path="apellido1" id="apellido1_example_inlineEdit_aux_form" />
	<form:input path="apellido2" id="apellido2_example_inlineEdit_aux_form" />
	<form:input path="fechaBaja" id="fechaBaja_example_inlineEdit_aux_form" />
	<form:input path="fechaAlta" id="fechaAlta_example_inlineEdit_aux_form" />
	<form:input path="ejie" id="ejie_example_inlineEdit_aux_form" />
	<form:select path="rol" id="rol_example_inlineEdit_aux_form" />
</form:form>
```
&nbsp;

# 2. Aspectos a tener en cuenta
Es importante saber que para inicializar los componentes de UDA como el autocomplete, combo o date, hay que hacerlo mediante la propiedad `colModel` de tal manera que UDA pueda encargarse de reinicializar los componentes siempre que sea necesario. También es importante remarcar que **todos los campos que estén ocultos mediante la propiedad `columnDefs` no deben de ser declarados en el `colModel`**. Para más información sobre cómo usar esta propiedad, leer el documento [rup.table](./rup.table.md).