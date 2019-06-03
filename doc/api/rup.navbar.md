<a name="module_rup_navbar"></a>

## rup\_navbar
Proporciona una herramienta para navegar a través de las aplicación web.

**Summary**: Componente RUP Navbar  
**Example**  
```js
var html = '<nav class="rup-navbar navbar">\
                <button type="button" class="navbar-toggler hidden-lg-up navbar-toggle" \
                    type="button" data-toggle="rup-collapse" data-target="#navbarResponsive"\
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">\
                </button>\
                <a class="navbar-brand" href="#">Uda</a>\
                    <ul class="nav navbar-nav">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre1\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem11</a>\
                                <a href="#" class="dropdown-item">Elem12</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre2\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem21</a>\
                                    <a href="#" class="dropdown-item">Elem22</a>\
                                </div>\
                            </li>\
                    </ul>\
                    <ul class="nav navbar-nav float-md-right rup-nav-tools">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre3\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem31</a>\
                                <a href="#" class="dropdown-item">Elem32</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre4\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem41</a>\
                                    <a href="#" class="dropdown-item">Elem42</a>\
                                </div>\
                            </li>\
                    </ul>\
			  </nav>';
		$('#content').append(html);
		$('nav').rup_navbar(); 
```

* [rup_navbar](#module_rup_navbar)
    * [~toggle()](#module_rup_navbar..toggle)
    * [~show()](#module_rup_navbar..show)
    * [~hide()](#module_rup_navbar..hide)
    * [~setTransitioning(transición)](#module_rup_navbar..setTransitioning)

<a name="module_rup_navbar..toggle"></a>

### rup_navbar~toggle()
Funcion que alterna el estado del navbar entre desplegado y oculto.

**Kind**: inner method of [<code>rup\_navbar</code>](#module_rup_navbar)  
**Example**  
```js
$('nav').rup_navbar('toggle');
```
<a name="module_rup_navbar..show"></a>

### rup_navbar~show()
Funcion que despliega el navbar.

**Kind**: inner method of [<code>rup\_navbar</code>](#module_rup_navbar)  
**Example**  
```js
$('nav').rup_navbar('show');
```
<a name="module_rup_navbar..hide"></a>

### rup_navbar~hide()
Funcion que oculta el navbar.

**Kind**: inner method of [<code>rup\_navbar</code>](#module_rup_navbar)  
**Example**  
```js
$('nav').rup_navbar('hide');
```
<a name="module_rup_navbar..setTransitioning"></a>

### rup_navbar~setTransitioning(transición)
Define si habrá o no transición al desplegar y ocultar el navbar

**Kind**: inner method of [<code>rup\_navbar</code>](#module_rup_navbar)  

| Param | Type | Description |
| --- | --- | --- |
| transición | <code>boolean</code> | True: hay transicion; False: no hay transicion |

**Example**  
```js
$('nav').rup_navbar('setTransitioning', true);
```
