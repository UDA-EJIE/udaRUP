#	Guía de estilos material

## 1. Introducción
En este documento se tratará de explicar lo mejor posible como aplicar los estilos material a los componentes y elementos en general. También es posible visitar la [guía de estilos](https://www.ejie.eus/x21aAppWar/styleGuide) que está dentro de la aplicación de ejemplo de UDA.

Para facilitar la búsqueda de ejemplos, se divirá en secciones, formando cada sección con un componente o elemento.

### Elementos input:checkbox e input:radio
Los elementos input que sean tanto de tipo checkbox como radio pueden ser estilizados de manera 'block' o 'inline'.

+ Ejemplos block:

  ![Imagen 1](img/materialGuidelines/input-radio-block.png)
  ```html
  <div class="col-md-6">
    <h3>Radio</h3>
    
    <p>Aplicando los estilos de bootstrap materializado a este elemento obtenemos el siguiente resultado:</p>
    
    <div class="radio-material">
      <input id="opcionRadioMaterial-1" type="radio" name="materialRadio" checked>
      <label for="opcionRadioMaterial-1">Opción 1</label>
    </div>
    <div class="radio-material">
      <input id="opcionRadioMaterial-2" type="radio" name="materialRadio">
      <label for="opcionRadioMaterial-2">Opción 2</label>
    </div>
  </div>
  ```

  ![Imagen 1](img/materialGuidelines/input-checkbox-block.png)
  ```html
  <div class="col-md-6">    
    <h3>Checkbox</h3>
    
    <p>Los estilos de bootstrap materializado estilizan el elemento de la siguiente manera:</p>
    
    <div class="checkbox-material">
      <input id="opcionCheckboxMaterial-1" type="checkbox" checked>
      <label for="opcionCheckboxMaterial-1">Opción 1</label>
    </div>
    <div class="checkbox-material">
      <input id="opcionCheckboxMaterial-2" type="checkbox">
      <label for="opcionCheckboxMaterial-2">Opción 2</label>
    </div>
  </div>
  ```
+ Ejemplos inline:

  ![Imagen 1](img/materialGuidelines/input-radio-inline.png)
  ```html
  <div class="col-md-6">
    <h3>Radio Inline</h3>
    
    <p>Aplicando los estilos de bootstrap materializado a este elemento en su versión "inline" obtenemos el siguiente resultado:</p>
    
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-1" type="radio" name="materialRadioInline">
      <label for="opcionRadioMaterialInline-1">Opción 1</label>
    </div>
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-2" type="radio" name="materialRadioInline">
      <label for="opcionRadioMaterialInline-2">Opción 2</label>
    </div>
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-3" type="radio" name="materialRadioInline">
      <label for="opcionRadioMaterialInline-3">Opción 3</label>
    </div>
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-4" type="radio" name="materialRadioInline">
      <label for="opcionRadioMaterialInline-4">Opción 4</label>
    </div>
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-5" type="radio" name="materialRadioInline" checked>
      <label for="opcionRadioMaterialInline-5">Opción 5</label>
    </div>
    <div class="radio-material radio-material-inline">
      <input id="opcionRadioMaterialInline-6" type="radio" name="materialRadioInline">
      <label for="opcionRadioMaterialInline-6">Opción 6</label>
    </div>
  </div>
  ```

  ![Imagen 1](img/materialGuidelines/input-checkbox-inline.png)
  ```html  
  <div class="col-md-6">    
    <h3>Checkbox Inline</h3>
    
    <p>Los estilos de bootstrap materializado estilizan el elemento en su versión "inline" de la siguiente manera:</p>
    
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-1" type="checkbox">
      <label for="opcionCheckboxMaterialInline-1">Opción 1</label>
    </div>
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-2" type="checkbox" checked>
      <label for="opcionCheckboxMaterialInline-2">Opción 2</label>
    </div>
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-3" type="checkbox">
      <label for="opcionCheckboxMaterialInline-3">Opción 3</label>
    </div>
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-4" type="checkbox" checked>
      <label for="opcionCheckboxMaterialInline-4">Opción 4</label>
    </div>
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-5" type="checkbox">
      <label for="opcionCheckboxMaterialInline-5">Opción 5</label>
    </div>
    <div class="checkbox-material checkbox-material-inline">
      <input id="opcionCheckboxMaterialInline-6" type="checkbox" checked>
      <label for="opcionCheckboxMaterialInline-6">Opción 6</label>
    </div>
  </div>
  ```
