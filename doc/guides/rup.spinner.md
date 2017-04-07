#	Componentes RUP – Spinner

<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1 Introducción](#1-introducción)   
   - [2 Ejemplo](#2-ejemplo)   
   - [3 Casos de uso](#3-casos-de-uso)   
   - [4 Infraestructura](#4-infraestructura)   
      - [4.1 Ficheros](#4.1-ficheros)   
      - [4.2 Dependencias](#4.2-dependencias)   
      - [4.3 Versión minimizada](#4.3-versión-minimizada)   
   - [5 Invocación](#5-invocación)   
   - [6 API](#6-api)   

<!-- /MDTOC -->


## 1 Introducción
La descripción del Componente Accordion, visto desde el punto de vista de RUP, es la siguiente:

*El objetivo principal del componente Spinner es facilitar al usuario la insercción de valores numéricos.
*

## 2 Ejemplo
Se presentan a continuación un ejemplo de este componente:

![Imagen 1](img/rup.spinner_1.png)

## 3 Casos de uso
Se aconseja la utilización de este componente:

+ Cuando se quiera permitir la introducción de forma sencilla de valores númericos.

## 4 Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

* Únicamente se requiere la inclusión de los ficheros que implementan el componente *(js y css)* comentados en los apartados *Ficheros y Dependencias*.


### 4.1 Ficheros

- Ruta Javascript: rup/scripts/
- Fichero de plugin: **rup.spinner-x.y.z.js**

### 4.2 Dependencias

Por la naturaleza de desarrollo de los componentes (patrones) como *plugins* basados en la librería *JavaScript* **jQuery**, es necesaria la inclusión de esta como capa base. La versión elegida para el desarrollo ha sido la **1.12.4**.
*   **jQuery 1.12.4**: <http://jquery.com/>

La gestión de ciertas partes visuales de los componentes, se han realizado mediante el *plugin* **jQuery-UI** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este *plugin*, entre otras cosas, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel y componentes personalizables (estilos). La versión utilizada en el desarrollo ha sido la **1.12.0**.

*   **jQuery-UI 1.12.0**: <http://jqueryui.com/>

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-1.12.4.js
    jquery-ui-1.12.0.custom.js
    jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
    rup.spinner-x.y.z.js

### 4.3 Versión minimizada

A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes **RUP**. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente **RUP**.

Los ficheros minimizados de RUP son los siguientes:
*   **rup/scripts/min/rup.min-x.y.z.js**
*   **rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

## 5 Invocación
El componente spinner actual sobre un *tag html input*, como el del siguiente ejemplo:
  ```xml
    <div>
    	<label for="spinner">Seleccione un valor:</label>
        <input id="spinner"	name="value">
    </div>
  ```

Usando el selector del objeto *input* podemos invcocar fácilmente el componente.

  ```javascript
    $(selector).rup_spinner({proper ties});
  ```
Donde el parámetro *“properties”* es un objeto *(var properties = {};)* o bien directamente la declaración de los valores, detallados en el siguiente apartado.

## 6 API

Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.spinner.md).
