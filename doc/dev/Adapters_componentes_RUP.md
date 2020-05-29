# Uso de adapters en los componentes RUP

En los componentes RUP se hace uso de unos módulos js llamados **adapters**.

Estos módulos se crearon con la finalidad de propocionar diferentes implementaciones dependiendo de si se trata del aspecto visual Material, Bootstrap o de jQueryUI.

De este modo exitirán tres adapters por cada componente RUP que necesite de una implementación diferente dependiendo del modo de visualización deseado.

Los adapters se implementan en la carpeta [src/adapter](https://github.com/UDA-EJIE/udaRUP/tree/master/src/adapter). Existe un fichero índice [rup.adapter.js](https://github.com/UDA-EJIE/udaRUP/blob/master/src/adapter/rup.adapter.js) encargado de cargar todos los adapters definidos para los componentes RUP.
