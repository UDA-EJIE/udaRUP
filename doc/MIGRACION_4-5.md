# Migración

## Introducción

En el presente documento se van a detallar los pasos a seguir para realizar la actualización de una aplicación UDA a la versión v5.0.0.

**Antes de aplicar los pasos del documento se debe de actualizar la aplicación a la última de la rama v4.2.x.**

1. #### Componentes RUP
    Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v5.0.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v5.0.0/rup-v5.0.0.zip).

2. #### Templates
    Para generar código correspondiente a la versión v5.0.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [plantillas](https://github.com/UDA-EJIE/udaTemplates/releases/download/v5.0.0/templates-v5.0.0.zip).

3. #### Integrar Hdiv
    Hay que realizar todos los cambios mencionados en el documento de integración de [Hdiv](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Hdiv).

4. #### Migas de pan
    Es importante mencionar que este cambio es totalmente necesario por lo mencionado en el paso tercero del documento de integración de [Hdiv](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Hdiv#3--habilitar-acceso).

    Para hacer que las migas de pan funcionen correctamente, hay que añadir una spring url con la ruta de desconexión de sesión además de importar su taglib, después, se debe incluir la variable creada en el elemento `div` como un atributo personalizado llamado `data-logout-url`:
    ```html
    <%@taglib prefix="spring" uri="/WEB-INF/tld/spring.tld"%>
    
    <spring:url value="/logout" var="logouturl" htmlEscape="true"/>
    <div id="x21aAppWar_migas" class="container-fluid mb-2 clear rup-breadCrumb_root" data-logout-url="${logouturl}"></div>
    ```
    
5. #### Mantenimientos con tablas
    Tanto si se usan formularios de edición o se editan los registros de manera "en línea", es necesario hacer algunos cambios. Un cambio que aplica a ambos casos, es la necesidad de añadir un método nuevo al controlador para que podamos obtener el formulario con el parámetro `HDIV_STATE` (necesario para que Hdiv funcione). Cuando se trate de edición en línea, este formulario simplemente contendrá dicho parámetro y no será mostrado en ningún momento, sólo será utilizado para obtener el parámetro cuando sea necesario. Cabe decir que cada tipo de edición tiene su propio método, siendo lo recomendable añadir ambos para poder disponer de ellos siempre que sea necesario sin la necesidad de tener que editar el controlador. A continuación, se explica en detalle todos los cambios a realizar dependiendo del tipo de edición:

    * Para los casos en los que se edite en formulario:
        El método nuevo a generar en el controlador es el siguiente:
        ```java
        /**
    	 * Obtener el formulario de edición.
    	 * 
    	 * @param actionType String
    	 * @param fixedMessage String
    	 * @param model Model
    	 *
    	 * @return String
    	 */
    	@UDALink(name = "editForm", linkTo = { 
    			@UDALinkAllower(name = "get"), 
    			@UDALinkAllower(name = "add"),
    			@UDALinkAllower(name = "edit"),
    			@UDALinkAllower(name = "filter") }) 
    	@RequestMapping(value = "/editForm", method = RequestMethod.POST)
    	public String getEditForm(
    			@RequestParam(required = true) String actionType,
    			@RequestParam(required = false) String fixedMessage,
    			Model model) {
    		UsuarioController.logger.info("[POST - editForm] : usuario");
    		
    		model.addAttribute("usuario", new Usuario());
    		model.addAttribute("actionType", actionType);
    		
    		if (fixedMessage != null) {
    			model.addAttribute("fixedMessage", fixedMessage);
    		}
    		
    		return "usuarioEditForm";
    	}
        ```
        
        También es necesario editar el archivo llamado `entidadEditForm` para dejar únicamente el formulario. Es importante recordar que la JSP anteriormente mencionada varía su nombre en función del nombre de la entidad, llamándose en el ejemplo a continuación `usuarioEditForm`:
        ```html
        <%--  
         -- Copyright 2021 E.J.I.E., S.A.
         -- Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
         -- Solo podrá usarse esta obra si se respeta la Licencia.
         -- Puede obtenerse una copia de la Licencia en
         -- 
         -- http://ec.europa.eu/idabc/eupl.html
         -- 
         -- Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
         -- el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
         -- SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
         -- Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
         -- que establece la Licencia. 
         --%>
        
        <%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        <%@taglib prefix="spring" uri="/WEB-INF/tld/spring.tld"%>
        <%@taglib prefix="form" uri="/WEB-INF/tld/spring-form.tld"%>
        
        <!-- Formulario -->
        <c:set value="${actionType == 'POST' ? 'add': 'edit'}" var="endpoint" />
        <spring:url value="/table/${endpoint}" var="url"/>
        <form:form modelAttribute="usuario" id="example_detail_form" action="${url}" method="${actionType}">
        	<!-- Feedback del formulario de detalle -->
        	<div id="example_detail_feedback"></div>
        	<c:if test="${not empty fixedMessage}">
        		<p><c:out value="${fixedMessage}"/></p>
        	</c:if>
        	<!-- Campos del formulario de detalle -->
        	<div class="form-row">
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
        	<div class="form-row d-none">	
        		<div class="form-groupMaterial col-sm" id="divImagenAlumno">
        			<input type="file" name="imagenAlumno" id="imagenAlumno" disabled/>
        			<label for="imagenAlumno"><spring:message code="subidaImg" /></label>
        		</div>	
        	</div>	
        </form:form>
        ```
        
        Finalmente, hay que añadir el contenedor del formulario eliminado en el paso anterior a una nueva JSP que se llame `entidadEdit` además de añadirle el identificador **entidad_detail_form_container** (sustituir entidad por el nombre de la entidad a usar) al elemento div que contiene la clase **dialog-content-material**. En el caso del ejemplo se llamará `usuarioEdit`:
        ```html
        <%--  
         -- Copyright 2021 E.J.I.E., S.A.
         --
         -- Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
         -- Solo podrá usarse esta obra si se respeta la Licencia.
         -- Puede obtenerse una copia de la Licencia en
         --
         --      http://ec.europa.eu/idabc/eupl.html
         --
         -- Salvo cuando lo exija la legislación aplicable o se acuerde por escrito, 
         -- el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
         -- SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
         -- Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
         -- que establece la Licencia.
         --%>
        <%@include file="/WEB-INF/includeTemplate.inc"%>
        
        <!-- Formulario de detalle -->
        <div id="example_detail_div" class="rup-table-formEdit-detail d-none">
        	<!-- Barra de navegación del detalle -->
        	<div id="example_detail_navigation" class="row no-gutters"></div>
        	<!-- Separador -->
        	<hr class="m-1">
        	<div id="example_detail_form_container" class="dialog-content-material">
        		<!-- El formulario será insertado mediante una llamada Ajax -->
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
        
        Cabe decir, que si se quisiera modificar el endpoint al que llamar para obtener el formulario, podría hacerse dentro de la configuración que inicializa la tabla en el apartado de `editForm` con la propiedad `url`:
        ```js
        formEdit: {
            url: '../nuevoEndpoint/editForm'
        }
        ```
        Puede encontrase más información al respecto en el documento [rup.table.editForm](./guides/rup.table.editForm.md#propiedades-de-configuración).

    * Para los casos en los que se edite en línea:
        El método nuevo a generar en el controlador es el siguiente:
        ```java
        /**
    	 * Obtener el formulario necesario para permitir el uso de la edición en línea.
    	 * 
    	 * @param actionType String
    	 * @param tableID String
    	 * @param mapping String
    	 * @param model Model
    	 *
    	 * @return String
    	 */
    	@UDALink(name = "inlineEdit", linkTo = { 
    			@UDALinkAllower(name = "get"), 
    			@UDALinkAllower(name = "add"),
    			@UDALinkAllower(name = "edit"),
    			@UDALinkAllower(name = "filter") }) 
    	@RequestMapping(value = "/inlineEdit", method = RequestMethod.POST)
    	public String getInlineEditForm(
    			@RequestParam(required = true) String actionType,
    			@RequestParam(required = true) String tableID,
    			@RequestParam(required = false) String mapping,
    			Model model) {
    		UsuarioController.logger.info("[POST - inlineEditForm] : usuario");
    		
    		model.addAttribute("entity", new Usuario());
    		model.addAttribute("actionType", actionType);
    		model.addAttribute("tableID", tableID);
    		
    		// Controlar que el mapping siempre se añada al modelo de la manera esperada
    		if (mapping == null || mapping.isEmpty()) {
    			mapping = "/usuario";
    		} else if (mapping.endsWith("/")) {
    			mapping = mapping.substring(0, mapping.length() - 1);
    		}
    		model.addAttribute("mapping", mapping);
    		
    		return "tableInlineEditAuxForm";
    	}
        ```
        
        También es necesario crear una JSP llamada `tableInlineEditAuxForm`. Esta JSP podrá ser usada por todos aquellos mantenimientos que lo requieran, independientemente de que las entidades sean diferentes. A continuación el contenido que debe tener este archivo:
        ```html
        <%--  
         -- Copyright 2021 E.J.I.E., S.A.
         -- Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
         -- Solo podrá usarse esta obra si se respeta la Licencia.
         -- Puede obtenerse una copia de la Licencia en
         -- 
         -- http://ec.europa.eu/idabc/eupl.html
         -- 
         -- Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
         -- el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
         -- SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
         -- Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
         -- que establece la Licencia. 
         --%>
        
        <%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
        <%@taglib prefix="spring" uri="/WEB-INF/tld/spring.tld"%>
        <%@taglib prefix="form" uri="/WEB-INF/tld/spring-form.tld"%>
        
        <!-- Formulario -->
        <c:set value="${actionType == 'POST' ? 'add': 'edit'}" var="endpoint" />
        <spring:url value="${mapping}/${endpoint}" var="url"/>
        <form:form modelAttribute="${entity}" id="${tableID}_detail_inlineEdit_aux_form" class="d-none" action="${url}" method="${actionType}"/>
        ```
        
        Cabe decir, que si se quisiera modificar el endpoint al que llamar para obtener el formulario, podría hacerse dentro de la configuración que inicializa la tabla en el apartado de `inlineEdit` con la propiedad `url`:
        ```js
        inlineEdit: {
            url: '../nuevoEndpoint/inlineEdit'
        }
        ```
        Puede encontrase más información al respecto en el documento [rup.table.inlineEdit](./guides/rup.table.inlineEdit.md#propiedades-de-configuración).
        
    Cuando se disponga de una tabla sin formulario de filtrado (propiedad `noFilter`), hay que añadir el siguiente formulario a la JSP que contiene la tabla (es importante modificar el ejemplo para cada caso de uso): 
    ```html
    <!-- Formulario necesario para garantizar el correcto funcionamiento con Hdiv cuando filter = 'noFilter' -->
    <spring:url value="/table/dynamicColumns/filter" var="url"/>
    <form:form modelAttribute="usuario" id="columnasDinamicas_filter_form" class="d-none" action="${url}"/>
    ```