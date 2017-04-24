# Tema de estilos de RUP

En este documento se va a detallar como se construyen y gestionan el tema de estilos de RUP así como la posible personalización de los mismos.

## Distribuibles finales

Los recursos de estilos finales que serán distribuidos a las aplicaciones son:

* external
* rup.css
* rup-theme.css

Legacy

* rup-min.css

```
.
└── dist
    ├── css
    |   ├── cursors
    |   |   └── context-menu.cur
    |   ├── images
    |   |   └── ...
    |   ├── font-awesome.css
    |   ├── rup-base.css
    |   ├── rup-base.min.css
    |   ├── rup-jqueryui-theme.css
    |   ├── rup-jqueryui-theme.min.css
    |   ├── rup-theme.css
    |   ├── rup-theme.min.css


```

## Tareas Gulp

La generación de los recursos estáticos se realiza mediante las siguientes tareas:

* bootstrap.css

```bash
$ gulp sass:bootstrap
```

* rup-base.css
* rup-classic.css (legacy)

```bash
$ gulp sass:rup-base
```

* rup-theme.css
* rup-rwd.css (legacy)

```bash
$ gulp sass:rup-theme
```

## Recursos fuente

Los recursos empleados para la generación de los estilos son los siguientes:

```
.
└── scss
    ├── base
    |   ├── _accordion.scss
    |   └── ...
    ├── theme
    |   ├── _all.scss
    |   ├── _rup-accordion.scss
    |   └── ...
    ├── custom-bootstrap.scss
    ├── rup-classic.scss
    └── rup-rwd.scss
```

Los estilos de RUP se generan a partir de ficheros Sass.


###
