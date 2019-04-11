#	Componentes RUP – dataTable


## 1. Introducción

La descripción del componente dataTable, visto desde el punto de vista de RUP, es la siguiente:

*Se les presenta a los usuarios los datos tabulados para que la información se visualice de manera ágil y rápida, facilitando así su comprensión y manejo. Además, el componente implementa un nuevo patrón definido para facilitar la lógica necesaria en las acciones básicas, denominadas CRUD (create, read,update y delete), sobre una tabla.*


## 2. Ejemplo

Se muestra a continuación una maquetación típica del componente:

![Imagen 1](img/rup.dataTable_1.png)

## 3. Casos de uso

Se aconseja la utilización de este componente:

* Cuando se tenga que presentar a los usuarios filas de datos y se desee facilitar la búsqueda de datos.
* Cuando se realicen mantenimientos de tablas haciendo uso de las especificaciones establecidas en la guía de desarrollo de UDA.


## 4. Infraestructura

A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados *Ficheros* y *Dependencias*.

### 4.1. Ficheros

- Ruta Javascript: rup/scripts/
- Fichero de plugin: rup.dataTable-x.y.z.js
- Ruta theme: rup/css/
- Fichero de estilos: +theme.dataTable-x.y.z.css+ (modificable por el desarrollador), jquery.dataTables.css (fichero base del dataTable), buttons.dataTables.css (fichero base del plugin 'buttons'), select.dataTables.css (fichero base del plugin 'select').
- Ruta fichero de recursos: rup/resources/datatable_idioma.json

### 4.2. Dependencias

Por la naturaleza de desarrollo de los componentes (patrones) como *plugins* basados en la librería *JavaScript* **jQuery**, es necesaria la inclusión de esta como capa base. La versión elegida para el desarrollo ha sido la **1.12.4**.
* **jQuery 1.12.4**: http://jquery.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-1.12.4.js
    rup.base-x.y.z.js
    rup.dataTable-x.y.z.js https://datatables.net/
    jquery.dataTables.css
    buttons.dataTables.css
    select.dataTables.css
    Ejemplos online: https://datatables.net/examples/index

### 4.3 Versión minimizada

A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes **RUP**. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente **RUP**.

Los ficheros minimizados de RUP son los siguientes:
* **rup/scripts/min/rup.min-x.y.z.js**
* **rup/css/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

## 5. Invocación

El componente dataTable necesita de una invocación de una llamada javascript sobre una estructura HTML existente.

Cada módulo del componente asocia funcionalidades y eventos a los diferentes objetos de la estructura HTML. De esto modo los componentes feedback, formulario de filtrado, formulario de detalle o multiselección entre otros, deberán de construirse sobre objetos HTML.

En el componente dataTable se ha optado por minimizar el código HTML que se genera al vuelo mediante javascript. Esto permite una serie de mejoras.

* Mayor velocidad de renderizado de la pantalla. El código HTML generado mediante javascript es significativamente más lento, sobre todo en navegadores antiguos.
* Se facilitan las modificaciones y ajustes sobre las diferentes partes del componente ya que se tiene acceso a la mayoría de las mismas directamente desde la jsp.

Para facilitar aún más y simplificar el código necesario a la hora de invocar y configurar el componente, se ha definido una nomenclatura estándar a la hora de indicar los identificadores de los diferentes objetos HTML. De este modo no será necesario indicarle al componente todos los objetos HTML sobre los que debe definir cada una de las funcionalidades.

### 5.1. Código HTML

Para simplificar la nomenclatura nodos los identificadores de los objetos HTML se derivan a partir del identificador base del componente dataTable.

Para lograr una configuración mínima del componente js se deberá de implementar el siguiente código HTML en la jsp de la pantalla, cuidando los identificadores de cada elemento.

Para el ejemplo supongamos que el componente RUP dataTable se invoca sobre el elemento base con identificador dataTable.

Partiendo de esto, el resto de identificadores se derivarán a partir de la norma:

    dataTableID_<componente>

Este sería un ejemplo del código que se debería de incluir en la jsp:

```xml
<%@include file="/WEB-INF/includeTemplate.inc"%>
<h2>Datatable</h2> <!-- Titulo pagina -->

<jsp:include page="includes/filterForm.jsp"></jsp:include>

<table id="example" class="table table-striped table-bordered"
	data-url-base="./jqGridUsuario"
	data-filter-form="#table_filter_form"
	cellspacing="0" width="100%">
        <thead>
            <tr>
                <th data-col-prop="id">Id</th>
                <th data-col-prop="nombre">Nombre</th>
                <th data-col-prop="apellido1">Primer apellido</th>
                <th data-col-prop="ejie" data-col-type="checkbox">Ejie</th>
                <th data-col-prop="fechaAlta" data-col-sidx="fecha_alta" data-col-type="date">Fecha alta</th>
                <th data-col-prop="fechaBaja" data-col-type="date">Fecha baja</th>
                <th data-col-prop="rol" data-col-type="combo">Rol</th>
            </tr>
        </thead>
</table>

<jsp:include page="includes/datatableEdit.jsp"></jsp:include>
```

* **table**: Componente HTML sobre el que se inicializa el componente RUP dataTable.
* **data-col-prop**: Identificador de la columna que va asociado a los formularios.
* **data-col-type**: Tipo que hace correspondencia con los RUP.
* **data-col-sidx**: Identificador de base de datos.
* **tfoot**: Se usa para el formulario de filtrado. Los campos incluidos en este formulario se utilizarán como valores de filtrado de los registros.

### 5.1. Código Javascript

La invocación del componente propiamente dicha se realizará desde el fichero js correspondiente a la página. Si se ha seguido la nomenclatura del apartado anterior se requerirá únicamente de una
configuración mínima:

```js
jQuery(function($){

	//FILTRO Y DETALLE
	var combo = [
		   {rol: "---", codTipoSubsanacion:""},
		   {rol: "Administrador", codTipoSubsanacion:"administrador"},
		   {rol: "Desarrollador", codTipoSubsanacion:"desarrollador"},
		   {rol: "Espectador", codTipoSubsanacion:"espectador"},
		   {rol: "Informador", codTipoSubsanacion:"informador"},
		   {rol: "Manager", codTipoSubsanacion:"manager"}
		];

	var tableColModels = [
			{ name: "id", index: "id", editable:true, width: 80
				, formoptions:{rowpos:1, colpos:1}
			},
			{ name: "nombre", index: "nombre", editable:true
				, formoptions:{rowpos:2, colpos:1}
			},
			{ name: "apellido1", index: "apellido1", editable:true
				, formoptions:{rowpos:3, colpos:1}
				, classes:'ui-ellipsis'
			},
			{ name: "apellido2", index: "apellido2", editable:true
				, formoptions:{rowpos:4, colpos:1}
			},
			{ name: "ejie", index: "ejie", editable:true, width: 60,
				edittype: "checkbox",
				formatter: "checkbox",
				rwdClasses:"hidden-xs hidden-sm hidden-md",
				align: "center",
				editoptions: {
					value:"1:0"
				},
				searchoptions:{
					rupType: "combo",
					source : [
					   {label: "---", value:""},
					   {label: "Si", value:"1"},
					   {label: "No", value:"0"}
					]
				}
				, formoptions:{rowpos:5, colpos:1}
			},
			{ name: "fechaAlta",  index: "fecha_alta", editable:true, width: 120,
				rupType: "date",
				rwdClasses:"hidden-xs hidden-sm hidden-md",
				editoptions:{
					labelMaskId : "fecha-mask",
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:2, colpos:2}
			},
			{ name: "fechaBaja", index: "fecha_baja", editable:true, width: 120,
				rupType: "date",
				rwdClasses:"hidden-xs hidden-sm hidden-md",
				editoptions:{
					labelMaskId : "fecha-mask",
					showButtonPanel : true,
					showOtherMonths : true,
					noWeekend : true
				}
				, formoptions:{rowpos:3, colpos:2}
			},
			{ name: "rol", index: "rol", editable:true, width: 140,
				rupType: "combo",
				rwdClasses:"hidden-xs hidden-sm hidden-md",
				formatter: "rup_combo",
				editoptions: {
					source: $.map(combo, function(elem){
						return {
							label: elem.rol,
							value: elem.codTipoSubsanacion
						};

					})
				}
				, formoptions:{rowpos:3, colpos:2}
			}
     ],
     options_ejie_combo = {
			source : [
			   {label: "---", value:""},
			   {i18nCaption: "0", value:"0"},
			   {i18nCaption: "1", value:"1"}
			],
			i18nId: "GRID_simple##ejie",
			width: 120
		},
		options_role_combo = {
			source : [
			   {label: "---", value:""},
			   {label: $.rup.i18n.app["GRID_simple##rol"]["administrador"], value:"administrador"},
			   {label: $.rup.i18n.app["GRID_simple##rol"]["desarrollador"], value:"desarrollador"},
			   {label: $.rup.i18n.app["GRID_simple##rol"]["espectador"], value:"espectador"},
			   {label: $.rup.i18n.app["GRID_simple##rol"]["informador"], value:"informador"},
			   {label: $.rup.i18n.app["GRID_simple##rol"]["manager"], value:"manager"}
			]
		};


	//Formulario de filtrado
	jQuery("#ejie_filter_table").rup_combo(options_ejie_combo);
	jQuery('#rol_filter_table').rup_combo(options_role_combo);

	jQuery("#fechaAlta_filter_table").rup_date();
	jQuery("#fechaBaja_filter_table").rup_date();

	//Formulario de detalle
	jQuery("#fechaAlta_detail_table").rup_date();
	jQuery("#fechaBaja_detail_table").rup_date();

	jQuery("#rol_detail_table").rup_combo(options_role_combo);

	$('#example').rup_datatable({

        multiSelect: {
            style:    'multi'
        },
        order: [[ 1, 'asc' ]],
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        fixedHeader: {
            footer: false,
            header:true
        },
        formEdit:{
        	detailForm: "#table_detail_div",
        	validate:{
    			rules:{
    				"nombre":{required:true},
    				"apellido1":{required:true},
    				"fechaAlta":{date:true},
    				"fechaBaja":{date:true}
    			}
    		},
    		colModel: tableColModels
        }
    } );
});
```

El uso y configuración de los diferentes plugins del dataTable se especifica en el siguiente apartado.

## 6. Plugins

El componente dataTable se ha implementado siguiendo una arquitectura modular. De este modo se consigue:
* Integrar las diferentes funcionalidades como plugins independientes logrando una pequeña interdependencia entre ellas.
* Facilitar y simplificar el mantenimiento y la aplicación de correctivos en el componente.
* Simplificar la extensión y sobreescritura de los métodos de determinados plugins.
* Permitir la creación de nuevas funcionalidades e incluirlas en el componente de manera sencilla e inocua para el resto de funcionalidades existentes.

Todos los plugins están montados sobre el contexto de la tabla para obtener dicho contexto :

```
var ctx = $("#idTable").rup_datatable("getContext");
```


Dentro del contexto puedes acceder a todas sus propiedades ya todos sus plugins, ejemplo:

```
ctx.seeker
```

Los detalles de cada uno de los plugins se pueden consultar en los documentos correspondientes:

* Core
* Menú contextual
* Feedback
* Filtrado
* Diseño responsivo (RWD)
* Edición en formulario
* Multiselección
* Búsqueda (seeker)
* Botonera
* Reporting (Parcial)
* Edición en linea
* ColReorder
* Selección simple
* Maestro detalle
* RowGroup
* Multifilter

Propiedades de la tabla:

* multiplePkToken -> Es el token que se va usar cuando el id sea múltiple.
* primaryKey      -> El identificador principal de la tabla.
* blockPKeditForm -> Si deseas que el pk se bloquee en modo edición (true o false).
* searchPaginator -> Si deseas tener paginador con número o no (true o false).

Para obtener las propiedades del plugin subyacente consultar en https://datatables.net/reference/api/

## 7. Sobreescritura del theme

El componente *dataTable* se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.dataTable-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos (*codAppStatics/WebContent/codApp/styles*).

Los estilos del componente se basan en *Bootstrap*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).


## 8. Internacionalización (i18n)

La gestión de los literales del dataTable se realiza a través de ficheros json, lo que flexibiliza el desarrollo. Para acceder a los literales se hará uso del objeto base RUP, mediante éste se accederá al objeto json correspondiente según el idioma obteniendo tanto los literales como los propios mensajes.

Los literales definidos para el contenido del dataTable son texto simple. Para este componente los literales utilizados están en la parte global de la internacionalización dentro de los resources de rup.

El objeto de internacionalización del dataTable se encuentra accesible del siguiente modo:

    $.rup.i18n.base


## 9. Integración con UDA

La interacción entre la capa de presentación y el servidor de aplicaciones que requiere el componente, hace uso de una serie de clases y configuraciones para facilitar su gestión.

El componente ha sido implementado de manera que sea fácilmente extensible mediante plugins. Debido a esto es posible dotar al componente de funcionalidades extra que se ajusten a las necesidades de nuestra aplicación.

Dependiendo del tipo de nueva funcionalidad que se necesite es muy posible que la información que se transfiera se incremente.

Para facilitar este proceso y flexibilizar el proceso de extensibilidad del componente se ha implementado una serie de componentes que se presupondrá que son utilizadas a la hora de explicar su funcionamiento.

### 9.1. Comunicación con la capa servidor

La comunicación entre el componente y la capa servidor se realiza principalmente mediante en envío y recepción de objetos JSON.

Para facilitar los procesos de serialización y deserialización entre los objetos JSON y Java se proporcionan las siguientes clases Java:

* **com.ejie.x38.dto.JQGridRequestDto**: Clase encargada de almacenar la información del JSON enviado por el componente. Después del proceso de deserialización este será el objeto resultante que se obtendrá a partir del objeto JSON enviado.

* **com.ejie.x38.dto.JQGridResponseDto**: Clase encargada de almacenar las propiedades que después del proceso de serialización, se convertirán en propiedades del objeto JSON que deberá de ser enviado al componente.

### 9.2. Configuración de Spring

Es necesario incluir la siguiente configuración en los ficheros de configuración de Spring:

En el fichero *mvc-config.xml* se deberá de especificar el uso de un Argument Resolver para gestiónar el uso de las anotaciones ```@RequestBodyJson```.

[mvc-config.xml]

```xml
<bean id="requestMappingHandlerAdapter"
class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
  <!-- Resto de configuración... -->
  <property name="customArgumentResolvers">
    <list>
      <bean class="com.ejie.x38.control.view.RequestFormEntityMethodArgumentResolver"/>
    </list>
  </property>
</bean>
```

### 9.3. Métodos controller

Estos son los métodos generados en el Controller para gestionar las peticiones de las diferentes operaciones del componente dataTable:

* Filtrado:
```java
@RequestMapping(value = "/filter", method = RequestMethod.POST)
public @ResponseBody JQGridResponseDto<Usuario> filter(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto) {
  JQGridUsuarioController.logger.info("[POST - jqGrid] : Obtener Usuarios");
  return jqGridUsuarioService.filter(filterUsuario, jqGridRequestDto, false);
}
```

* Búsqueda:
```java
@RequestMapping(value = "/search", method = RequestMethod.POST)
public @ResponseBody List<TableRowDto<Usuario>> search(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody(param="search") Usuario searchUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto){
  JQGridUsuarioController.logger.info("[POST - search] : Buscar Usuarios");
  return jqGridUsuarioService.search(filterUsuario, searchUsuario, jqGridRequestDto, false);
}
```

* Borrado múltiple:
```java
@RequestMapping(value = "/deleteAll", method = RequestMethod.POST)
@ResponseStatus(value=HttpStatus.OK)
public @ResponseBody List<String> removeMultiple(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto) {
  JQGridUsuarioController.logger.info("[POST - removeMultiple] : Eliminar multiples usuarios");
  this.jqGridUsuarioService.removeMultiple(filterUsuario, jqGridRequestDto, false);
  JQGridUsuarioController.logger.info("All entities correctly deleted!");
  return jqGridRequestDto.getMultiselection().getSelectedIds();
}
```

* Copia de registros inversa:
```java
@RequestMapping(value = "/clipboardReport", method = RequestMethod.POST)
	protected @ResponseBody List<Usuario> getClipboardReport(
			@RequestJsonBody(param="filter") Usuario filterUsuario,
			@RequestJsonBody JQGridRequestDto jqGridRequestDto){
		JQGridUsuarioController.logger.info("[POST - clipboardReport] : Copiar multiples usuarios");
	    JQGridUsuarioController.logger.info("All entities correctly copied!");
	    return this.jqGridUsuarioService.getMultiple(filterUsuario, jqGridRequestDto, false);
	}
```
