/*!
 * Copyright 2016 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/**
 *
 * Presenta un control de interación con el usuario. Se trata de extender los botones estandar del HTML para dotarles de mayores funcionalidades con las que mejorar la usabilidad de la aplicación.
 *
 * @summary Componente RUP Button.
 * @module rup_button
 * @example
 * // Botón por defecto
 * $("#idButton").rup_button({});
 * // Botón desplegable
 * $("#idButtonDrop").rup_button({
 *	  dropdown:{
 *		  dropdownListId:"dropdownHtmlList"
 *	  }
 * });
 */

/*global define */
/*global jQuery */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './rup.dialog'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var rup_button = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_button', rup_button));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_button('extend', {
        addButtonToDropdown: function () {


        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_button('extend', {
        _doDropdownListById: function ($dropdownButton, $container, dropdownSettings) {
            var $dropdownList = jQuery('#' + dropdownSettings.dropdownListId);
            dropdownSettings.$dropdownList = $dropdownList;

            $container.append($dropdownList);
            $dropdownButton.on('click.rup_dopdown', function (event) {
                $dropdownList.toggleClass('open');
                event.stopPropagation();

            });

            $dropdownList.on('click.rup_dopdown', function (event) {
                event.stopPropagation();
            });

            jQuery(document).on('click.rup_dopdown.close', function () {
                $dropdownList.removeClass('open');
            });
        },
        _doDropdownByDialog: function ($dropdownButton, $container, dropdownSettings) {
            var $dropdownDialog = jQuery('#' + dropdownSettings.dropdownDialog).rup_dialog(dropdownSettings.dropdownDialogConfig);

            jQuery.extend(dropdownSettings.dropdownDialogConfig, {
                autoOpen: false,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: $container
                }
            });

            // Estilos
            $dropdownDialog.parent().addClass('rup-dropdown-dialog');

            $dropdownButton.on('click', function () {
                $dropdownDialog.rup_dialog('open');
            });
        },
        _doDropdownByButtons: function ($dropdownButton, $container, dropdownSettings) {
            var $self = this,
                $ul = $('<ul>'),
                $li,
                buttons = dropdownSettings.buttons;

            $ul.attr({
                id: $self.attr('id') + '_dropdownList'
            }).addClass('rup-dropdown-option-list rup-toolbar_menuButtonContainer');

            for (var i = 0; i < buttons.length; i++) {
                $li = $('<li>');
                $self._addButtonToDropdown($li, buttons[i]);
                $ul.append($li);
            }

            $dropdownButton.on('click.rup_dopdown', function (event) {
                $ul.toggleClass('open');
                event.stopPropagation();

            });

            $ul.on('click.rup_dropdown', function (event) {
                event.stopPropagation();
            });

            jQuery(document).on('click.rup_dopdown.close', function () {
                $ul.removeClass('open');
            });


            $container.append($ul);

        },
        _addButtonToDropdown: function ($base, obj, json_i18n) { //añade a la toolbar un 'mbutton' (sin botones)
            var boton = '',
                buttonId;
            if (obj.id === undefined) {
            	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_button.mbuttonsIdError'));
                boton = null;
            } else {
                buttonId = obj.id;
                // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
                if (buttonId.indexOf($(this).attr('id')) !== 0) {
                    buttonId = $(this).attr('id') + '##' + obj.id;
                }

                boton = $('<a></a>').attr('id', buttonId).text($.rup.i18nParse(json_i18n, obj.i18nCaption)).addClass('rup-toolbar_button');
                //Si no se define un estilo especial se aplica por defecto
                if (obj.css === undefined) {
                    obj.css = 'rup-toolbar_menuButtonIcon';
                }
                boton.button().button('option', 'icons', {
                    primary: obj.css,
                    secondary: null
                });
            }


            $base.append(boton);

            //Añadir evento keydown
            this._setKeyDown(boton);

            if (obj.click) { //Añadir eventos
                boton.click({
                    i18nCaption: obj.i18nCaption
                }, obj.click);
            }
            return boton;
        },
        _setKeyDown: function (boton) {
            boton.on('keydown', function (event) {
                var object = $(event.currentTarget),
                    objectParent = object.parent(),
                    nextObject;
                switch (event.keyCode) {
                case $.ui.keyCode.TAB:
                    if (!event.shiftKey) {
                        if (object.next().attr('id') !== objectParent.attr('id') + '-rightButtons') {
                            //Siguiente boton
                            nextObject = object.next(':focusable');
                        } else {
                            //Primer botón de los alineados derecha
                            nextObject = object.next().children(':focusable').first();
                        }

                        //Navegar entre botones
                        if (nextObject.length === 1) {
                            nextObject.focus();
                            $.rup_toolbar.focusedExternally[objectParent.attr('id')] = true;
                            return false;
                        }
                    }
                }
            });
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_button('extend', {
        /**
         * Método de inicialización del componente.
         *
         * @function _init
         * @private
         */
        _init: function (args) {
            var settings = $.extend(true, {}, $.fn.rup_button.defaults, $(this).data(), args[0]);

            return this.each(function () {

                var self = this,
                    $self = $(this),
                    $dropdownList, $container, dropdownSettings = {};

                self._ADAPTER = $.rup.adapter[settings.adapter];

                if (settings.fab === true) {
                    $self.addClass('rup-button-fab');

                    if (settings.fixed === true) {
                        $self.addClass('rup-button-fixed');
                    }

                    if (settings.fixed === true) {
                        $self.addClass('rup-button-fixed');
                    }

                    if (settings.list !== null || settings.layer !== null) {
                        var $fabGroupDiv = $('<div>').addClass('rup-button-fab-group');
                        //$self.wrap($fabListDiv);
                        $self.add($('#' + settings.list)).wrapAll($fabGroupDiv);

                        if (settings.list !== null) {
                            $('#' + settings.list).addClass('rup-button-fab-list');
                            $('button', '#' + settings.list).addClass('rup-button-fab-sm').rup_button();
                        }

                        if (settings.layer !== null) {
                            $('#' + settings.layer).addClass('rup-button-fab-layer');
                        }

                    }
                }

                // Se envuelve el texto en un span
                if ($self.find(settings.labelBaseCss).length === 0) {
                    $self.contents().filter(function () {
                        return this.nodeType === Node.TEXT_NODE && /\S/.test(this.nodeValue);
                    }).wrap($('<span>').addClass(settings.labelBaseCss));
                }
                // Se añade los css al label
                if (settings.labelCss) {
                    $self.find('.' + settings.labelBaseCss).addClass(settings.labelCss);
                }

                // Se añade el icono al botón
                if (settings.iconCss) {
                    $self.prepend($('<i>').attr('aria-hidden', 'true').addClass(settings.iconCss));
                }

                // Se gestiona el evento del click
                if (settings.click && typeof settings.click === "function") {
                    $self.on('click', settings.click);
                }

                if (settings.dropdown === undefined || settings.dropdown === false) {

                    // Botón normal

                    $self.button(settings);
                    $self.addClass('rup-button').removeClass('ui-button ui-corner-all ui-widget');

                    if (settings.mbutton === true) {
                        // Configuramos el mbutton
                        var $mbuttonContainer = $self.siblings('[aria-labelledby=\'' + $self.attr('id') + '\']');
                        if ($mbuttonContainer) {
                            $self.on('click.rup_mbutton', function (event) {
                                $mbuttonContainer.addClass('rup-mbutton-open');
                                event.stopPropagation();

                            });

                            $mbuttonContainer.on('click.rup_mbutton', function (event) {
                                event.stopPropagation();
                            });

                            jQuery(document).on('click.rup_mbutton.close', function () {
                                $mbuttonContainer.removeClass('rup-mbutton-open');
                            });


                        }
                    }
                } else {
                    // Inicialización del dropdown
                    $.extend(true, dropdownSettings, $.fn.rup_button.dropdown_defaults, args[0].dropdown);

                    $self.addClass('rup-button rup-dropdown');

                    // Wrap into div
                    $container = jQuery('<div>').attr('class', 'rup-dropdown-btn-group');

                    $container = $self.wrap($container).parent();

                    dropdownSettings.$container = $container;

                    $self.button({});


                    $self.addClass('rup-dropdown');


                    var $dropdownButton = self._ADAPTER.createDropdownButton.bind($self)(settings);

                    $self.after($dropdownButton);

                    if (dropdownSettings.dropdownListId) {
                        $dropdownList = jQuery('#' + dropdownSettings.dropdownListId);
                        dropdownSettings.$dropdownList = $dropdownList;

                        $container.append($dropdownList);
                        $dropdownButton.on('click.rup_dopdown', function (event) {
                            $dropdownList.toggleClass('open');
                            event.stopPropagation();

                        });

                        $dropdownList.on('click.rup_dopdown', function (event) {
                            event.stopPropagation();
                        });

                        jQuery(document).on('click.rup_dopdown.close', function () {
                            $dropdownList.removeClass('open');
                        });


                    } else if (dropdownSettings.dropdownDialog) { // Configuracion del dropdown con un RUP dialog

                        jQuery.extend(dropdownSettings.dropdownDialogConfig, {
                            autoOpen: false,
                            position: {
                                my: 'right top',
                                at: 'right bottom',
                                of: $container
                            }
                        });
                        var $dropdownDialog = jQuery('#' + dropdownSettings.dropdownDialog).rup_dialog(dropdownSettings.dropdownDialogConfig);

                        // Estilos
                        $dropdownDialog.parent().addClass('rup-dropdown-dialog');

                        $dropdownButton.on('click', function () {
                            $dropdownDialog.rup_dialog('open');
                        });
                    } else if (dropdownSettings.buttons) { // Configuración del dropdown a partir de buttons
                        $self._doDropdownByButtons($dropdownButton, $container, dropdownSettings);
                    }
                }
                //Se audita el componente
                $.rup.auditComponent('rup_button', 'init');
            });
            // TODO : Invocación al plugin

        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************

    /**
     * Opciones por defecto de configuración del componente.
     *
     * @function defaults
     * @property {boolean | Object} [dropdown=false] - Determina si el botón va a contar con un menú desplegable de acciones secundarias. En caso de mostrar un desplegable esta propiedad contendrá el objeto de configuración del mismo.
     */
    $.fn.rup_button.defaults = {
        adapter: 'button_material',
        dropdown: false,
        fab: false,
        fixed: false,
        list: null,
        layer: null,
        iconCss: undefined,
        labelCss: undefined,
        mbutton: false,
        click: undefined,
        labelBaseCss: 'rup-ui-button-text'
    };

    /**
     * @description Opciones por defecto del objeto de configuración del menú desplegable asociado al botón.
     *
     * @name dropdown_defaults
     */
    $.fn.rup_button.dropdown_defaults = {
        dropdownListId: undefined,
        dropdownDialog: undefined,
        dropdownDialogConfig: {
            type: $.rup.dialog.DIV
        }
    };

}));
