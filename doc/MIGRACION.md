# Migración

## Introducción

En el presente documento se van a detallar los pasos a seguir para realizar la actualización de una aplicación UDA a la versión v3.0.
>
**Antes de aplicar los pasos del documento se debe de actualizar la aplicación a la última de la rama v2.4.x.**

### Dependencias

La versión v3.0.0 de UDA conlleva la actualización de varias dependencias de librerías java:

* Spring Framework
* Logback
* Slf4
* Hibernate Validator
* Jackson JSON Mapper
* x38

Para descargar las nuevas versiones de las librerías java de debe modificar el fichero ```pom.xml```.

>
Una vez se haya modificado el fichero ```pom.xml```se deberá de lanzar la tarea ```mavenRunDependencies``` del fichero ```build.xml```.


```diff

@@ -27,20 +27,13 @@
 		<eclipselink.version>2.3.0</eclipselink.version>
 		<javax.persistence.version>2.0.1</javax.persistence.version>
 </#if>
-		<org.springframework.version>3.1.2.RELEASE</org.springframework.version>
-		<org.springframework.security.version>3.1.2.RELEASE</org.springframework.security.version>
-		<org.logback.version>1.0.6</org.logback.version>
-		<org.slf4j.version>1.6.6</org.slf4j.version>
-		<com.ejie.x38.version>2.4.7-RELEASE</com.ejie.x38.version>
+		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
+		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
+		<org.logback.version>1.1.7</org.logback.version>
+		<org.slf4j.version>1.7.21</org.slf4j.version>
+		<com.ejie.x38.version>3.0.0-RELEASE</com.ejie.x38.version>
 	</properties>

 	<dependencies>
 <#if radjpa>
 		<!-- EclipseLink -->
@@ -85,6 +78,11 @@
 			<artifactId>spring-orm</artifactId>
 			<version>${org.springframework.version}</version>
 		</dependency>
+		<dependency>
+		    <groupId>org.springframework</groupId>
+		    <artifactId>spring-context-support</artifactId>
+		    <version>${org.springframework.version}</version>
+		</dependency>

 		<!-- Spring Security -->
 		<dependency>
@@ -154,19 +152,24 @@
 		<dependency>
 			<groupId>org.hibernate</groupId>
 			<artifactId>hibernate-validator</artifactId>
-			<version>4.2.0.Final</version>
-		</dependency>
-		<dependency>
-		   <groupId>javax.validation</groupId>
-		   <artifactId>validation-api</artifactId>
-		   <version>1.0.0.GA</version>
+			<version>4.3.2.Final</version>
 		</dependency>

 		<!-- Jackson JSON Mapper -->
 		<dependency>
-			<groupId>org.codehaus.jackson</groupId>
-			<artifactId>jackson-mapper-asl</artifactId>
-			<version>1.9.7</version>
+			<groupId>com.fasterxml.jackson.core</groupId>
+			<artifactId>jackson-databind</artifactId>
+			<version>2.6.5</version>
+		</dependency>
+		<dependency>
+			<groupId>com.fasterxml.jackson.core</groupId>
+			<artifactId>jackson-annotations</artifactId>
+			<version>2.6.5</version>
 		</dependency>

 		<!-- AspectJ -->
@@ -182,6 +185,11 @@
 			<artifactId>x38ShLibClasses</artifactId>
 			<version>${com.ejie.x38.version}</version>
 		</dependency>
+		<dependency>
+			<groupId>com.ejie.x38</groupId>
+			<artifactId>x38ShLibClasses-rup</artifactId>
+			<version>${com.ejie.x38.version}</version>
+		</dependency>

 		<!-- Tiles -->
 		<dependency>
```

## Descriptores XML

Se deben de actualizar los descriptores de los ficheros xml de configuración de Spring, tanto en los EAR como en los WAR.

Los ficheros que se deberán de modificar son:

```java
xxxEARClasees/src/spring/beanRefContext.xml
xxxEARClasees/src/spring/cache-config.xml
xxxEARClasees/src/spring/dao-config.xml
xxxEARClasees/src/spring/log-config.xml
xxxEARClasees/src/spring/security-config.xml
xxxEARClasees/src/spring/service-config.xml
xxxEARClasees/src/spring/tx-config.xml

xxxAppWar/WebContent/WEB-INF/spring/app-config.xml
xxxAppWar/WebContent/WEB-INF/spring/jackson-config.xml
xxxAppWar/WebContent/WEB-INF/spring/mvc-config.xml
xxxAppWar/WebContent/WEB-INF/spring/reports-config.xml
xxxAppWar/WebContent/WEB-INF/spring/rss-config.xml
xxxAppWar/WebContent/WEB-INF/spring/rup-config.xml
xxxAppWar/WebContent/WEB-INF/spring/security-config.xml
xxxAppWar/WebContent/WEB-INF/spring/security-core-config.xml
xxxAppWar/WebContent/WEB-INF/spring/validation-config.xml
xxxAppWar/WebContent/WEB-INF/spring/pif-config.xml
xxxAppWar/WebContent/WEB-INF/spring/webdav.config.xml
```

Las modificaciones de los esquemas existentes en cada fichero se haría del siguiente modo:

```diff
- http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
+ http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
- http://www.springframework.org/schema/mvc/spring-mvc-3.1.xsd
+ http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd
- http://www.springframework.org/schema/context/spring-context-3.1.xsd
+ http://www.springframework.org/schema/context/spring-context-3.2.xsd
- http://www.springframework.org/schema/jee/spring-jee-3.1.xsd"
+ http://www.springframework.org/schema/jee/spring-jee-3.2.xsd"
- http://www.springframework.org/schema/aop/spring-aop-3.1.xsd
+ http://www.springframework.org/schema/beans/spring-aop-3.2.xsd
- http://www.springframework.org/schema/security/spring-security-3.1.xsd
+ http://www.springframework.org/schema/security/spring-security-3.2.xsd
- http://www.springframework.org/schema/security/spring-util-3.1.xsd
+ http://www.springframework.org/schema/security/spring-util-3.2.xsd
- http://www.springframework.org/schema/tx/spring-tx-3.1.xsd
+ http://www.springframework.org/schema/task/spring-task-3.2.xsd
- http://www.springframework.org/schema/mvc/spring-mvc-3.1.xsd
+ http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd

```

## Jackson JSON Mapper

La actualización de las librerías de la versión v3.0.0 de UDA requiere de la actualización de la librería de Jackson a la versión 2.6.5.

Este cambio a la rama v2.x de Jackson ocasiona varias modificaciones que se han de realizar debido a la refactorización realizada en la paquetería interna de la librería.

Los detalles de estos cambios pueden verse en la wiki de [Jackson JSON Mapper](http://wiki.fasterxml.com/JacksonRelease20).

Debido a estas modificaciones se deben realizar una serie de modificaciones en el código de las aplicaciones desarrolladas con las versiones v2.x de UDA.

### Nueva clase

La integración de Jackson con Spring se realiza mediante una clase de x38 que extiende del *message converter* de Spring específico para Jackson.

En las versiones v1.x y v2.x de UDA se utilizaba la clase:

``` java
com.ejie.x38.serialization.UdaMappingJacksonHttpMessageConverter
```

En las versiones v3.x de UDA se utilizará en adelante la nueva clase:

``` java
com.ejie.x38.serialization.UdaMappingJackson2HttpMessageConverter
```

### Migración de código

Debido a que la configuración de Spring y Jackson se realiza a nivel de WAR, cada aplicación deberá realizar estas modificaciones tantas veces como módulos web tenga.

#### Dependencias Maven

Para utilizar la nueva versión de la librería de Jackson se deberá de actualizar el fichero ```pom.xml``` indicando la versión actualizada.

En este caso la versión actual es la **v2.6.5**.

```diff
 		<!-- Jackson JSON Mapper -->
 		<dependency>
-			<groupId>org.codehaus.jackson</groupId>
-			<artifactId>jackson-mapper-asl</artifactId>
-			<version>1.9.7</version>
+			<groupId>com.fasterxml.jackson.core</groupId>
+			<artifactId>jackson-databind</artifactId>
+			<version>2.6.5</version>
+		</dependency>
+		<dependency>
+			<groupId>com.fasterxml.jackson.core</groupId>
+			<artifactId>jackson-annotations</artifactId>
+			<version>2.6.5</version>
 		</dependency>
```

#### Descriptores XML

Se deberán de actualizar los descriptores de los ficheros xml de configuración de Spring, como se detalla en el apartado anterior, antes de proceder con el resto de modificaciones.


#### Configuración de Jackson JSON Mapper

Las modificaciones que se deben realizar sobre la configruación específica de Jacson se deben realizar en el fichero ```jackson-config.xml```.

```diff
@@ -33,7 +33,7 @@
     <bean id="jsonViewSupportFactoryBean" class="com.ejie.x38.control.view.JsonViewSupportFactoryBean" />


-    <bean id="udaMappingJacksonHttpMessageConverter" class="com.ejie.x38.serialization.UdaMappingJacksonHttpMessageConverter">
+    <bean id="udaMappingJackson2HttpMessageConverter" class="com.ejie.x38.serialization.UdaMappingJackson2HttpMessageConverter">
 		<property name="supportedMediaTypes" ref="jacksonSupportedMediaTypes" />
 		<property name="udaModule" ref="udaModule" />
 	</bean>
@@ -46,13 +46,13 @@
 				<#foreach reg in listaClases>
 					<entry key="<#noparse>#{T</#noparse>(com.ejie.${codapp}.model.${ctrUtils.stringCapitalize(reg)})<#noparse>}</#noparse>" value-ref="customSerializer" />
 				</#foreach>
-				<entry key="<#noparse>#{T</#noparse>(com.ejie.x38.dto.Jerarquia)<#noparse>}</#noparse>" value-ref="customSerializer" />
+				<entry key="<#noparse>#{T</#noparse>(com.ejie.x38.dto.JerarquiaDto)<#noparse>}</#noparse>" value-ref="customSerializer" />
 	        </util:map>
       	</property>
 		</#if>
       	<property name="serializationInclusions" ref="serializationInclusions" />
-      	<property name="serializationConfigFeatures" ref="serializationConfigFeatures" />
-      	<property name="deserializationConfigFeatures" ref="deserializationConfigFeatures" />
+      	<property name="serializationFeature" ref="serializationFeature" />
+      	<property name="deserializationFeature" ref="deserializationFeature" />
 	</bean>

 	<!-- MediaTypes soportados por jackson -->
@@ -61,24 +61,24 @@
 			<constructor-arg value="text" />
 			<constructor-arg value="plain" />
 			<constructor-arg
-				value="#{T(org.springframework.http.converter.json.MappingJacksonHttpMessageConverter).DEFAULT_CHARSET}" />
+				value="#{T(org.springframework.http.converter.json.MappingJackson2HttpMessageConverter).DEFAULT_CHARSET}" />
 		</bean>
 		<bean class="org.springframework.http.MediaType">
 			<constructor-arg value="application" />
 			<constructor-arg value="json" />
 			<constructor-arg
-				value="#{T(org.springframework.http.converter.json.MappingJacksonHttpMessageConverter).DEFAULT_CHARSET}" />
+				value="#{T(org.springframework.http.converter.json.MappingJackson2HttpMessageConverter).DEFAULT_CHARSET}" />
 		</bean>
 	</util:list>

 	<!-- Features de configuracion de la serializacion -->
-	<util:map id="serializationConfigFeatures">
-		<entry key="#{T(org.codehaus.jackson.map.SerializationConfig$Feature).SORT_PROPERTIES_ALPHABETICALLY}" value="true" />
+	<util:map id="serializationFeature">
+		<entry key="#{T(com.fasterxml.jackson.databind.SerializationFeature).ORDER_MAP_ENTRIES_BY_KEYS}" value="true" />
 	</util:map>

 	<!-- Features de configuracion de la deserializacion -->
-	<util:map id="deserializationConfigFeatures">
-		<entry key="#{T(org.codehaus.jackson.map.DeserializationConfig$Feature).FAIL_ON_UNKNOWN_PROPERTIES}" value="false" />
+	<util:map id="deserializationFeature">
+		<entry key="#{T(com.fasterxml.jackson.databind.DeserializationFeature).FAIL_ON_UNKNOWN_PROPERTIES}" value="false" />
 	</util:map>

 	<!-- Inclusiones de serializacion -->

```

#### Configuración de Spring MVC

El cambio de versión de Jackson también obliga a modificar la configuración de Spring MVC para que utilice la clase correcta con la que realizará la integración con la librería.

Esta configuración se realiza en el fichero ```mvc-config.xml```.

```diff
@@ -115,7 +115,7 @@
 		    </property>
 	       	<property name="messageConverters">
 	            <list>
-	            	<ref bean="udaMappingJacksonHttpMessageConverter"/>
+	            	<ref bean="udaMappingJackson2HttpMessageConverter"/>
 	            </list>
        		</property>
        		<property name="customArgumentResolvers">
```

### Imports en clases Java

Debido a la refactorización de la paquetería de Jackson se debe de realizar una actualización de los *import* de las clases Java de la aplicación que hacen uso de los recursos de Jackson.

La siguiente tabla muestra las equivalencias entre las clases eliminadas y las nuevas:

| Eliminadas | Nuevas |
|------------|--------|
|org.codehaus.jackson.JsonParseException|com.fasterxml.jackson.core.JsonParseException|
|org.codehaus.jackson.map.JsonMappingException|com.fasterxml.jackson.databind.JsonMappingException|
|org.codehaus.jackson.map.ObjectMapper|com.fasterxml.jackson.databind.ObjectMapper|
|org.codehaus.jackson.map.annotate.JsonSerialize|com.fasterxml.jackson.databind.annotation.JsonSerialize|
|org.codehaus.jackson.map.annotate.JsonDeserialize|com.fasterxml.jackson.databind.annotation.JsonDeserialize|
|org.codehaus.jackson.annotate.JsonProperty|com.fasterxml.jackson.annotation.JsonProperty|
|org.codehaus.jackson.annotate.JsonIgnore|com.fasterxml.jackson.annotation.JsonIgnore|

## Seguridad

Junto a las mejoras realizadas en la versión v3.0.0 de UDA se ha realizado una limpieza de código *deprecado* en el que se han eliminado clases que no deberían usarse por ser obsoletas.

Una de ellas es la clase ```com.ejie.x38.security.XlnetAuthenticationProvider.java```, que estaba marcada como *deprecated* desde la versión *v2.4.x* y que ha sido eliminada de esta versión.

En su lugar se deberá de utilizar la clase ```com.ejie.x38.security.UdaAuthenticationProvider.java``` modificando del siguiente modo el fichero de configuración de seguridad ```security-core-config.xml```:

```diff
@@ -75,7 +75,7 @@

 	<!-- El bean "xlnetAuthenticationProvider" es el "authentication-provider" del sistema de login -->
 	<!-- El "authentication-provider" determina el objeto "UserDetail" encargado de recoger y servir los datos de seguridad -->
-	<bean id="xlnetAuthenticationProvider" class="com.ejie.x38.security.XlnetAuthenticationProvider">
+	<bean id="xlnetAuthenticationProvider" class="com.ejie.x38.security.UdaAuthenticationProvider">
 		<property name="myAuthenticatedUserDetailsService" ref="myAuthenticatedUserDetailsService" />
 	</bean>
```


## Estáticos

La versión v3.0.0 de UDA ha traido grandes cambios en los componentes RUP.

El uso de las nuevas carácterísticas conlleva cambios mas profundos en las aplicaciones. Sin embargo es posible realizar una serie de cambios mínimos de modo que se garantice el funcionamiento de la aplicación migrada.

Las modificaciones que se han de realizar son las siguientes:

### Componentes RUP

Los nuevos recursos estáticos de los componentes RUP se pueden descargar desde [aquí](https://docs.google.com/uc?authuser=0&id=0B2jWuJHnBpz_NEV3RlN4eFVBZ1k&export=download).


De deberán de extraer los nuevos directorios dentro del directorio ```/rup``` del proyecto de estáticos, de modo que la jerarquía de sirectorios quede del siguiente modo:

```
+-- rup
	+-- css
    +-- js
    +-- fonts
    +-- resources
```

#### Modo compatibilidad v2.x

En la versión v3.x se ha modificado sustancialmente la implementación de los componentes RUP.

Debido a esto se ha incorporado un mecanismo para poder invocar a los componentes en cualquiera de sus dos implementaciones.

Por lo tanto, para que la aplicación se visualice con el aspecto de la versión v2.x se deberá de incluir en el fichero ```_layoutLoader.js``` de cada modulo web la siguiente configuración.

```diff
jQuery(document).ready(function(){

+	// compatibilidad RUP v2.x
+	$.fn.rup_button.defaults.adapter = "button_jqueryui";
+	$.fn.rup_date.defaults.adapter = "date_jqueryui";
+	$.fn.rup_table.plugins.core.defaults.adapter = "table_jqueryui";
+	$.fn.rup_time.defaults.adapter = "time_jqueryui";
+	$.fn.rup_toolbar.defaults.adapter = "toolbar_jqueryui";
+	$.fn.rup_upload.defaults.adapter = "upload_jqueryui";
+	$.fn.rup_validate.defaults.adapter = "validate_jqueryui";

```

Al asignar estos valores a las propiedades por defecto se configura el modo de implemtación compatible con la versión v2.x.


### Includes

Para utilizar los recursos estáticos de los componentes RUP se deben de modificar los ficheros de includes de los War.

Esto se deberá de realizar en cada uno de los módulos web que disponga la aplicación.

El contenido de los diferentes ficheros debería de ser el siguiente:

* */xxxAppWar/WebContent/WEB-INF/layouts/includes/rup.scripts.inc*

```xml
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script src="${staticsUrl}/rup/js/rup.classic.js" type="text/javascript"></script>
```

* */xxxAppWar/WebContent/WEB-INF/layouts/includes/rup.scripts.min.inc*

```xml
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script src="${staticsUrl}/rup/js/rup.classic.min.js" type="text/javascript"></script>
```

* */xxxAppWar/WebContent/WEB-INF/layouts/includes/rup.styles.inc*

```xml
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="${staticsUrl}/rup/css/external/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-classic.css" rel="stylesheet" type="text/css" />
```

* */xxxAppWar/WebContent/WEB-INF/layouts/includes/rup.styles.min.inc*

```xml
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="${staticsUrl}/rup/css/external/jquery-ui.theme.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-classic.min.css" rel="stylesheet" type="text/css" />
```

Una vez realizado esto la aplicación se debería de visualizar correctamente tal y como se estaba viendo hasta ahora.


## Deprecated

Junto con la actualización de la versión v3.0.0 de UDA se han *deprecado* una serie de componentes y funcionalidades.

### Librería x38

Con la actualización de la librería x38 a la rama v3.0 de UDA se ha realizado una limpieza de las clases mascadas como *deprecated* en versiones anteriores.

Estas son las clases que han sido eliminadas de la librería x38:

```java
com.ejie.x38.control.JsonDateDeserializer
com.ejie.x38.control.JsonDateSerializer
com.ejie.x38.control.JsonDateTimeDeserializer
com.ejie.x38.control.JsonDateTimeSerializer
com.ejie.x38.control.JsonTimeDeserializer
com.ejie.x38.control.JsonTimeSerializer
com.ejie.x38.serialization.CustomObjectMapper
com.ejie.x38.serialization.CustomSerializerFactoryRegistry
com.ejie.x38.control.ExceptionResolver.java
com.ejie.x38.control.exception.ControlException
com.ejie.x38.control.exception.MethodFailureException
com.ejie.x38.control.exception.MvcExceptionHandler
com.ejie.x38.control.exception.ResourceNotFoundException
com.ejie.x38.control.exception.ServiceUnavailableException
com.ejie.x38.dto.JQGrid
com.ejie.x38.dto.JQGridJSONModel
com.ejie.x38.dto.Jerarquia
com.ejie.x38.security.XlnetAuthenticationProvider
com.ejie.x38.validation.ValidationFilter.java
com.ejie.x38.validation.ValidationRequestWrapper
com.ejie.x38.validation.ValidationServlet
com.ejie.x38.serialization.UdaMappingJacksonHttpMessageConverter
```

### Minimizado de estáticos

La minimización de los recursos js y css de estáticos no se realizará en adelante dentro de la aplicación sino que se proporcionarán desde el proyecto de udaRUP.

Se eliminan los ficheros:

* xxxEAR/build_minimizado_estaticos.xml
* xxxEAR/cssMinList.txt
* xxxEAR/jsMinList.txt


### Portalizador

Debido a la implantación de la nueva r01hp para la gestión de portales, ya no es necesaria la modificación de los estilos de la aplicación para incrustarla en portales.

Por lo tanto se elimina del fichero build.xml la tarea de portalización de estilos ```generatePortalStatics```


```diff
@@ -30,32 +30,4 @@
 		</artifact:mvn>
 	</target>

-	<!-- Portalizar estilos -->
-	<property name="codApp" value="${codapp}"/>
-	<property name="srcDir" value="../<#noparse>${codApp}</#noparse>Statics/WebContent"/>
-	<property name="destDir" value="../<#noparse>${codApp}</#noparse>Statics/<#noparse>${codApp}</#noparse>PortalStatics"/>
-
-	<target name="generatePortalStatics" description="Genera directorio ${codapp}PortalStatics para despliegue de en portal">
-		<echo>Regenerando directorio (${codapp}PortalStatics)</echo>
-		<delete dir="<#noparse>${destDir}</#noparse>" />
-		<mkdir  dir="<#noparse>${destDir}</#noparse>" />
-		<copy todir="<#noparse>${destDir}</#noparse>/rup" >
-	 		<fileset dir="<#noparse>${srcDir}</#noparse>/rup" />
-		</copy>
-		<copy todir="<#noparse>${destDir}</#noparse>/<#noparse>${codApp}</#noparse>" >
-			<fileset dir="<#noparse>${srcDir}</#noparse>/<#noparse>${codApp}</#noparse>" />
-		</copy>
-
-		<!-- Desplegar en LOCAL -->
-		<copy todir="<#noparse>${destDir}</#noparse>/WEB-INF" >
-			<fileset dir="<#noparse>${srcDir}</#noparse>/WEB-INF" />
-		</copy>
-		<replace file="<#noparse>${destDir}</#noparse>/WEB-INF/weblogic.xml" token="${codapp}Statics" value="${codapp}PortalStatics" />
-
-
-		<echo>Parseando ficheros de estilos (.css)</echo>
-		<taskdef name="portalizeCss" classname="com.ejie.uda.UDAPortalizeCss" classpath="<#noparse>${ant.home}</#noparse>/lib/com.ejie.uda.statics.tools.jar" />
-		<portalizeCss codApp="<#noparse>${codApp}</#noparse>" destDir="<#noparse>${destDir}</#noparse>" parserHacks="<#noparse>${ant.home}</#noparse>/lib/com.ejie.uda.statics.tools.style_hacks"/>
-	</target>
-
 </project>
```
