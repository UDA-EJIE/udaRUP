# RUP Table - Multi Filtro
Permite la gestión de múltiples filtros para el componente **rup_table**.

![Imagen 1](img/rup.table.multifilter_1.png)

# 1. Declaración y configuración
La configuración del plugin se especifica en la propiedad `multiFilter`.

> Para trabajar con los multi filtros es indispensable declarar la propiedad multiFilter.

```js
$("#idComponente").rup_table({
    multiFilter:{
        // Propiedades de configuración del plugin multiFilter
        idFilter: 'generated',
        labelSize: 255,
        userFilter: 'udaPruebas'
    }
});
```

### Propiedades adicionales de configuración
URL a la que se harán todas las peticiones (incluida la de obtención del formulario si la variable `formURL` no estuviese definida):
```js
multiFilter: {
    // El valor por defecto es '/multiFilter' aunque puede variar dependiendo del campo urlBase
    url: '/otherMultiFilter'
}
```

Endpoint que devolverá el formulario a insertar dentro del diálogo que genera el componente:
```js
multiFilter: {
    // Si no se asigna un valor usará el definido en la variable url
    formURL: './multiFilterForm'
}
```

Para trabajar con multi filtros, hay que habilitar en la base de datos una tabla que, por ejemplo, se llame **TABLE_FILTER**. Ha de contener los siguientes campos:
| PK | FILTER_ID | NUMBER |
| -- | --------- | ------ |
| U1 | FILTER_SELECTOR | VARCHAR2(40) |
| U1 | FILTER_USER | VARCHAR2(180) |
| U1 | FILTER_NAME | VARCHAR2(180) |
|    | FILTER_VALUE | CLOB |
|    | FILTER_DEFAULT | SMALLINT |

Para el campo `FILTER_ID` hay que crear una secuencia auto numérica. Los nombres que se den tanto a la tabla como a las columnas no tienen por qué corresponder con las propuestas ya que se puede configurar en el archivo de configuración `rup-config.xml`.

El tamaño de los campos es orientativo, se puede asignar el tamaño deseado dependiendo del proyecto.

# 2. Archivos de configuración
En el archivo de configuración `rup-config.xml` del WAR hay que configurar el nombre de las columnas de la tabla de `Filtro` implementada, como también el nombre de la misma. Se especifica así mismo el nombre de la secuencia creada.

[spring/rup-config.xml]
```xml
<!-- Gestión de los filtros mediante base de datos -->
<bean id="x21aFilterDao" class="com.ejie.x38.rup.table.filter.dao.FilterDaoImpl">
    <property name="filterDataSource" ref="dataSource" />
    <property name="db_filterTableName" value="FILTER_TABLE" />
    <property name="col_filterId" value="FILTER_ID" />
    <property name="col_filterSelector" value="FILTER_SELECTOR" />
    <property name="col_filterName" value="FILTER_NAME" />
    <property name="col_filterUser" value="FILTER_USER" />
    <property name="col_filterValue" value="FILTER_VALUE" />
    <property name="col_filterDefault" value="FILTER_DEFAULT" />
    <property name="filterSeq" value="FILTER_SEQ" />
</bean>

<!-- Inyección de dependencias del FilterService -->
<bean id="x21aFilterService" class="com.ejie.x38.rup.table.filter.service.FilterServiceImpl">
    <property name="filterDao" ref="x21aFilterDao" />
</bean>
```

Para que Jackson pueda serializar y deserializar el objeto `Filter` se debe añadir la siguiente línea al archivo de configuración de Jackson.

[spring/jackson-config.xml]
```xml
<entry key="#{T(com.ejie.x38.rup.table.filter.model.Filter)}" value-ref="customSerializer" />
```

# 3. Configuración del Controller
Para poder acceder al service encargado de gestionar el multi filtro, en el controlador que gestiona la pantalla hay que añadir los siguientes métodos.

Se ha de declarar una variable de tipo ```com.ejie.x38.rup.table.filter.service.FilterService``` con la anotación ```@Autowired``` para que Spring pueda gestionar la inyección de dependencias, por ejemplo:
```java
@Autowired
private FilterService filterService;
```

La obtención del formulario a insertar dentro del diálogo del componente se hará a partir del controlador. Hay que tener en cuenta la necesidad de definir el nombre de la JSP que devuelve el controlador en el archivo de configuración `tiles.xml`. Este método tendrá el siguiente aspecto:
```java
// Obtiene el formulario del multi filtro
@UDALink(name = "getMultiFilterForm")
@RequestMapping(value = "/multiFilter", method = RequestMethod.POST)
public String getMultiFilterForm (
        @RequestParam(required = false) String mapping,
		@RequestParam(required = true) String tableID,
		@RequestParam(required = true) String containerClass,
		@RequestParam(required = true) String labelClass,
		@RequestParam(required = true) String defaultContainerClass,
		@RequestParam(required = true) String defaultCheckboxClass,
		Model model) {
	model.addAttribute("entity", new Entity());
	model.addAttribute("tableID", tableID);
	model.addAttribute("containerClass", containerClass);
	model.addAttribute("labelClass", labelClass);
	model.addAttribute("defaultContainerClass", defaultContainerClass);
	model.addAttribute("defaultCheckboxClass", defaultCheckboxClass);
	
	// Controlar que el mapping siempre se añada al modelo de la manera esperada
	if (mapping == null || mapping.isEmpty()) {
		mapping = "/table/multiFilter";
	} else if (mapping.endsWith("/")) {
		mapping = mapping.substring(0, mapping.length() - 1);
	}
	model.addAttribute("mapping", mapping);
	
	return "multiFilterForm";
}
```

La JSP a devolver tiene que ser así:
```xml
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld"%>
<%@ taglib prefix="form" uri="/WEB-INF/tld/spring-form.tld"%>

<div id="${tableID}_multifilter_dropdownDialog" style="display:none" class="dialog-content-material">
	<div id="${tableID}_multifilter_dropdownDialog_feedback"></div>
	<!-- Formulario -->
	<spring:url value="${mapping}/add" var="url"/>
	<form:form modelAttribute="${entity}" id="${tableID}_multiFilter_form" action="${url}" method="POST">
		<div class="form-row">
            <div id="${tableID}_multifilter_dropdownDialog_lineaCombo" class="${containerClass} col-12">
                <input id="${tableID}_multifilter_combo" class="rup_multifilter_selector" />
                <label for="${tableID}_multifilter_combo" class="${labelClass}">
                    <spring:message code="multiFilter.filters" />
                </label>
            </div>
        </div>
        <div class="form-row">
            <div id="${tableID}_multifilter_dropdownDialog_lineaDefault" class="${defaultContainerClass} col-12">
                <input type="checkbox" id="${tableID}_multifilter_defaultFilter" class="${defaultCheckboxClass}"/>
                <label for="${tableID}_multifilter_defaultFilter" class="${labelClass}">
                    <spring:message code="multiFilter.defaultFilter" />
                </label>
            </div>
        </div>
    </form:form>
</div>
```

Los siguientes métodos gestionarán los filtros:

```java
// Añade o actualiza un filtro
@UDALink(name = "multifilterAdd")
@RequestMapping(value = "/multiFilter/add", method = RequestMethod.POST)
public @ResponseBody Resource<Filter> filterAdd(@RequestBody Filter filtro){
	return new Resource<Filter>(filterService.insert(filtro));
}

// Elimina un filtro
@UDALink(name = "multifilterDelete")
@RequestMapping(value = "/multiFilter/delete", method = RequestMethod.POST)
public @ResponseBody Resource<Filter> filterDelete(@RequestBody Filter filtro) {
	return new Resource<Filter>(filterService.delete(filtro));
}

// Obtiene el filtro por defecto
@UDALink(name = "multifilterDefault")
@RequestMapping(value = "/multiFilter/getDefault", method = RequestMethod.GET)
public @ResponseBody Resource<Filter> filterGetDefault(
		@RequestParam(value = "filterSelector", required = true) String filterSelector,
		@RequestParam(value = "user", required = true) String filterUser) {
	return ResourceUtils.toResource(filterService.getDefault(filterSelector, filterUser));
}

// Obtiene los filtros disponibles
@UDALink(name = "multifilterGetAll")
@RequestMapping(value = "/multiFilter/getAll", method = RequestMethod.GET)
public @ResponseBody List<Resource<Filter>> filterGetAll(
		@RequestParam(value = "q", required = false) String filterQ,
		@RequestParam(value = "c", required = false) Boolean filterC,
		@RequestParam(value = "filterSelector", required = true) String filterSelector,
		@RequestParam(value = "user", required = true) String filterUser) {
	return ResourceUtils.fromListToResource(filterService.getAllFilters(filterSelector, filterUser));
}
```

El objeto `Filtro` que se envía en los métodos `filterAdd` y `filterDelete` tiene la siguiente estructura:

```js
{
    filterSelector: settings.id, // identificador
    filterName: multifilterSettings.$comboLabel.val(), // nombre
    filterValue: dataFormJson, // contiene los valores serializados en JSON
    filterDefault: multifilterSettings.$defaultCheck.is(':checked'), // define si es el filtro por defecto
    filterUser: usuario // usuario
}
```
