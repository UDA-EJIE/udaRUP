# 🧭 Componente RUP – Select

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->
- [1. Introducción](#1-introducción)
- [2. Ejemplos](#2-ejemplos)
- [3. Infraestructura](#3-infraestructura)
  - [3.1 Ficheros](#31-ficheros)
  - [3.2 Dependencias](#32-dependencias)
  - [3.3 Versión minimizada](#33-versión-minimizada)
- [4. Inicialización del componente](#4-inicialización-del-componente)
  - [4.1 Propiedades disponibles](#41-propiedades-disponibles)
- [5. API](#5-api)
- [6. Personalización de estilos](#6-personalización-de-estilos)
- [7. Internacionalización (i18n)](#7-internacionalización-i18n)
- [8. Integración con UDA / Backend](#8-integración-con-uda--backend)
- [9. Selects enlazados](#9-selects-enlazados)
- [10. Buenas prácticas y advertencias](#10-buenas-prácticas-y-advertencias)
- [11. Errores comunes y troubleshooting](#11-errores-comunes-y-troubleshooting)
<!-- /MDTOC -->

## 1. Introducción

El componente **RUP Select** permite enriquecer campos `<select>` estándar con funcionalidades avanzadas como:

- Sugerencias dinámicas al escribir.
- Búsquedas remotas con autocompletado.
- Selects enlazados.
- Soporte para i18n.
- Estilos personalizables mediante temas.

👉 Basado en **jQuery** y **Select2**.

---

## 2. Ejemplos
### 🌐 Ejemplo visual selectbox local con autocomplete
![Imagen1](img/rup.select_1.png)
### 🟢 Ejemplo local básico

```html
<select id="lenguaje">
  <option value="js">JavaScript</option>
  <option value="py">Python</option>
  <option value="java">Java</option>
</select>

<script>
  $("#lenguaje").rup_select({
    placeholder: "Selecciona un lenguaje",
    allowClear: true,
    width: "100%"
  });
</script>
```

### 🌐 Ejemplo remoto con autocompletado

```html
<select id="selectRemoto" name="code"></select>

<script>
  $("#selectRemoto").rup_select({
    source: "http://localhost:8080/app/select/remote",
    autocomplete: true,
    combo: true,
    placeholder: "Buscar...",
    width: "100%"
  });
</script>
```

---

## 3. Infraestructura

### 3.1 Ficheros

| Tipo  | Ruta                                        | Descripción                                       | Obligatorio |
|-------|---------------------------------------------|---------------------------------------------------|-------------|
| JS    | rup/scripts/rup.select-x.y.z.js             | Componente principal                              | ✅          |
| CSS   | rup/css/theme.rup.select-x.y.z.css          | Tema visual por defecto                           | ✅          |
| JS    | jquery-3.y.z.js                             | Base de jQuery                                    | ✅          |
| JS    | rup.base-x.y.z.js                           | Core de RUP                                       | ✅          |

---

### 3.2 Dependencias

- [jQuery](http://jquery.com/)
- RUP Base
- RUP Select

👉 Asegúrate de cargar las dependencias **antes** de inicializar el componente.

---

### 3.3 Versión minimizada

Para entornos productivos, utiliza los ficheros minimizados:

```
rup/scripts/min/rup.min-x.y.z.js
rup/css/rup.min-x.y.z.css
```

> 🧪 Las versiones individuales se usan solo en desarrollo o depuración.

---

## 4. Inicialización del componente

### HTML base

```html
<select id="miSelect" name="miSelect"></select>
```

### JavaScript

```js
$("#miSelect").rup_select({
  placeholder: "Seleccione un valor",
  allowClear: true
});
```

---

### 4.1 Propiedades destacadas disponibles

| Propiedad         | Tipo              | Valor por defecto | Descripción                                                                 |
|-------------------|--------------------|--------------------|-----------------------------------------------------------------------------|
| `source`          | string / objeto   | -                  | URL o array de datos para cargar opciones.                                  |
| `placeholder`     | string            | ""                 | Texto mostrado cuando no hay selección.                                     |
| `allowClear`      | boolean           | false              | Muestra botón de limpiar selección.                                         |
| `autocomplete`    | boolean           | false              | Activa búsqueda remota.                                                    |
| `combo`           | boolean           | false              | Añade funcionalidad de combo a autocomplete.                               |
| `width`           | string            | auto               | Ancho del componente (`auto`, `100%`, etc.).                                |
| `parent`          | array             | []                 | IDs de selects de los que depende (selects enlazados).                      |
| `escapeMarkup`    | function          | escape estándar    | Permite personalizar caracteres escapados.                                 |

---

## 5. API

Para un detalle completo de métodos públicos, consulte [rup.select API](../api/rup.select.md).

Ejemplos comunes:

```js
$("#miSelect").rup_select("clear"); // Limpia selección
$("#miSelect").rup_select("disable"); // Deshabilita
$("#miSelect").rup_select("enable"); // Habilita
```

---

## 6. Personalización de estilos

El estilo base se encuentra en:

```
rup/css/theme.rup.select-x.y.z.css
```

Para personalizar:

1. Crea un CSS en `codAppStatics/WebContent/codApp/styles`.
2. Sobrescribe las clases necesarias.
3. Evita modificar directamente el theme base.

```css
.select2-selection {
  background-color: #f8f9fa;
  border-radius: 8px;
}
```

Ejemplo base de la estructura generada por el componente:

```html
<select id="selectRemoto" name="code" ruptype="select" data-select2-id="selectRemoto" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
	<option value="" data-select2-id="18"></option>
	<option value="3" style="print" imgstyle="undefined" data-select2-id="63">Gipuzcoa</option>
</select>
<span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" data-select2-id="17" style="width: 100%;">
	<span class="selection">
		<span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-selectRemoto-container">
			<span class="select2-selection__rendered" id="select2-selectRemoto-container" role="textbox" aria-readonly="true" title="Gipuzcoa">
				<span class="select2-selection__clear" title="Remove all items" data-select2-id="65">×</span>
				<span>
					<i class="mdi mdi-print">Gipuzcoa</i>
				</span>
			</span>
			<span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
		</span>
	</span>
	<span class="dropdown-wrapper" aria-hidden="true"></span>
</span>
<label for="selectRemoto" class="select-material">Select remoto</label>
```
---

## 7. Internacionalización (i18n)

1. Crea el fichero de recursos:
   ```
   codAplic/resources/codAplic.i18n_es.json
   ```

2. Define un objeto con el mismo ID que el select.

```json
"lenguaje": {
  "js": "JavaScript",
  "py": "Python",
  "java": "Java"
}
```

3. Inicializa el componente y se aplicará automáticamente.

> 🌍 También puedes usar `codAplic.i18n_eu.json` u otros idiomas.

---

## 8. Integración con UDA / Backend

### Flujo de datos remoto

```
Cliente (Select) → Controller (Spring) → Service → BD → JSON → Cliente
```

El componente Select permite recuperar los datos almacenados en base de datos. Para ello se requiere cierta configuración en el *Controller* al que se invoca.

Se deben declarar dos parámetros (que el componente envía automáticamente):
*   **q**: termino introducido en el buscador. El termino introducido podría contener comodines (wildcards) que podrían obtener datos no deseados como son el carácter “_” que equivale a cualquier carácter o el carácter “%” que equivale a cualquier literal. Por ello en la petición al servidor se envía escapados automáticamente. Ejemplo de una petición con los caracteres escapados:
```
http://localhost:7001/x21aDemoWAR/fase3/select/remote?q=\%\%\%\%&c=false
```
*   **autocomplete**: booleano para indicar que la busqueda será autocomplete en lugar de un select normal.
*   **combo**: booleano para indicar que el autocomplete contendrá también la funcionalidad del combo y solo aplica cuando la propiedad autocomplete está activa. En el *rup_autocomplete* esta propiedad se llamaba *combobox*.
*   **c**: booleano que determina si la búsqueda es del tipo “contiene” (true) o del tipo “empieza por” (false).

El *Service* que invoca el *Controller* tendrá el método **findAllLike (entidad, paginación, c)** (si se ha generado con el plugin UDA)  que se empleará para realizar la búsqueda. Sus parámetros son los siguientes:

*   **entidad**: objeto creado por el desarrollador que contendrá en el campo por el que se desea buscar el termino introducido:
```java
MiEntidad miEntidad = new Entidad();
miEntidad.setCampoBusqueda(q);
```
*   **paginación**: objeto empleado para hacer filtrados/paginaciones. En el ejemplo actual se manda *null* ya que no se requiere esta funcionalidad.
*   **c**: parámetro enviado por el componente que determina el tipo de búsqueda.

A continuación se muestra un ejemplo con select(se destacan con fondo gris los elementos a configurar):

```java
@RequestMapping(value = "select/remote", method=RequestMethod.GET)
	public @ResponseBody List<Patrones> getRemoteAutocomplete(
			@RequestParam(value = "q", required = true) String q,
			@RequestParam(value = "c", required = true) Boolean c){

		//Idioma
		Locale locale = LocaleContextHolder.getLocale();

		//Filtro según idioma
		Patrones patrones = new Patrones();
		if (com.ejie.x38.util.Constants.EUSKARA.equals(locale.getLanguage())){
			patrones.setDescEu(q);
		}else{
			patrones.setDescEs(q);
		}

		return patronesService.findAllLike(patrones, null, c);
	}
```

A continuación se muestra un ejemplo solo select(se destacan con fondo gris los elementos a configurar):

```java
    @Json(mixins = {@JsonMixin(target = Provincia.class, mixin = ProvinciaMixIn.class)})
    @RequestMapping(value = "comboSimple/remote", method = RequestMethod.GET)
    public @ResponseBody
    List<Provincia> getComboRemote() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return provinciaService.findAll(null, null);
    }
```

El método devuelve una lista de entidades en este caso *List<Patrones>* donde cada entidad tendrá todos y cada uno de los atributos cargados con los valores de la Base de Datos. Al devolver la lista con la anotación ```@ResponseBody```, entrará en funcionamiento *Jackson* (parseador de JSON de Spring) para convertir la lista JAVA en una lista JSON:

*   **JAVA**:

```
patronesList :
	patronesList [0]
                        code = Autocomplete
                        descEs = Autocomplete_es
                        descEu = Autocomplete_eu
                        css = filter
	patronesList [1]
                        code = Combo
                        descEs = Combo_es
                        descEu = Combo_eu
                        css = print
…
```

#### Estructura JSON esperada

```json
[
  {"text": "Autocomplete_es", "id": "Autocomplete", "style": "filter"},
  {"text": "Combo_es", "id": "Combo", "style": "print"}
]
```

Como se ha explicado en anteriormente en el atributo **source** en el apartado 8 (propiedades) el componente requiere de una estructura de terminada para cargar el combo:
```js
[
	{text: "Autocomplete_es", id:"Autocomplete", style:"aaa"},
	{text: "Combo_es", id:"Combo ", style:"bbb"},
	{text: "Dialog_es", id:"Dialog", style:"ccc"},
	...
]
```

La traducción entre la estructura devuelta por el *controller* y la que espera el componente se realiza mediante un serializador propio de **UDA**.

Para que la serialización se realice correctamente, el componente envía en la petición una cabecera de **RUP** con la información necesaria para realizar la serialización.

```js
{"text":"descEs","id":"code","style":"css"}
```

---

## 9. Selects enlazados

Permiten encadenar selects dependientes:

```js
$("#provincia").rup_select({
  parent: ["departamento"],
  source: "api/provincias"
});
```

- Si el padre cambia → el hijo se actualiza.
- Se pueden encadenar múltiples niveles.
- También pueden combinar selects locales y remotos.

---

## 10. Buenas prácticas y advertencias

- ⚡ Usa siempre la versión minimizada en producción.
- 🧼 Usa `blank` si quieres que el componente tenga valor vacío por defecto tras un `.clear()`.
- 🧩 Evita dependencias cíclicas entre selects enlazados.
- 🧠 Para evitar problemas con caracteres especiales, sobreescribe `escapeMarkup` si es necesario.
    * En los inputs del select si se quieren usar estos caracteres:
	  '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
   Se debe sobreescibir la propiedad escapeMarkup del plugin subyacente, ejemplo para poder usar "vista/vista":

```js
escapeMarkup: function (markup) {
  return markup.replace(/[&<>"'\]/g, function (ch) {
    return {
      '\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch];
  });
}
```

---

## 11. Errores comunes y troubleshooting

| Error                                       | Causa probable                                             | Solución                                                  |
|--------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------|
| `Cannot read properties of undefined`     | No se incluyeron dependencias en orden                      | Verifica carga de jQuery y RUP Base                        |
| No carga datos remotos                     | URL mal definida o sin serializador                         | Revisa endpoint y cabecera RUP                             |
| No traduce textos                          | JSON i18n mal formado o sin ID coincidente                   | Revisa fichero `codAplic.i18n_xx.json`                     |
| Select enlazado no actualiza               | `parent` no declarado correctamente                         | Verifica ID del padre y dependencias                       |

---


