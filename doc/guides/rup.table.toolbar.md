# RUP Table - Botonera

Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

## 1. Declaración y configuración

El uso del plugin en el componente se realiza incluyendo en el array de la propiedad usePlugins el valor “toolbar”. La configuración del plugin se especifica en la propiedad toolbar.

```js
$("#idComponente").rup_table({
  url: "../jqGridUsuario",
  usePlugins:["toolbar"],
  toolbar:{
    // Propiedades de configuración del plugin toolbar
  }
});
```

## 2. Ejemplo de uso

A continuación se va a mostrar un ejemplo de definición de un caso complejo de las opciones del toolbar:

```js
$("#idComponente").rup_table({
    usePlugins:["toolbar"],
    core:{
        operations:{
            "operacion1": {
                name: "Operación 1",
                icon: "rup-icon rup-icon-new",
                enabled: function(){
                    return true;
                },
                callback: function(key, options){
                    alert("Operación 1");
                }

            },
            "operacion2": {
                name: "Operación 2",
                icon: "rup-icon rup-icon-new",
                enabled: function(){
                    return true;
                },
                callback: function(key, options){
                    alert("Operación 1");
                }
            }
        },
        toolbar:{
            showOperations:{
                operacion2:false
            },
            buttons:[
                {i18nCaption:"cancelar", css:"cancelar", click: function(){}},
                {i18nCaption:"buscar", css:"buscar", click: function(){}}
            ]
        });
    }
});
```

A partir del código anterior se genera lo siguiente:

* Dos operaciones globales (```operacion1``` y ```operacion2```) que serán utilizadas por la toolbar y el menú contextual entre otros.
*  Se definen mediante la propiedad buttons, otras dos opciones extra a ser mostradas como opcionesen la botonera. Estas opciones serían las identificadas por ```cancelar``` y ```buscar```.

```js
buttons:[
  {i18nCaption:"cancelar", css:"cancelar", click: function(){}},
  {i18nCaption:"buscar", css:"buscar", click: function(){}}
]
```
* Se especifica que la ```operacion2``` no será mostrada en la botonera.

 ```js
showOperations:{
  operacion2:false
},
```
