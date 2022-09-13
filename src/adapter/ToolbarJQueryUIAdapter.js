/*global jQuery */
/*global define */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', '../rup.base', '../templates'], factory);
    } else {

        // Browser globals
        root.ToolbarJQueryUIAdapter = factory(jQuery);
    }
}(this, function ($) {

    function ToolbarJQueryUIAdapter() {

    }

    ToolbarJQueryUIAdapter.prototype.NAME = 'toolbar_jqueryui';

    ToolbarJQueryUIAdapter.prototype.addButton = function (obj, json_i18n) { //añade a la toolbar un 'button'

        var buttonId, rightObjects;

        // Se obtiene el identificador del boton. En caso de no haberse indicado un valor en la propiedad id, se toma el valor de la propiedad i18nCaption.
        if (obj.id) {
            buttonId = obj.id;
        } else {
            buttonId = obj.i18nCaption;
        }

        // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
        if (buttonId.indexOf($(this).attr('id')) !== 0) {
            buttonId = $(this).attr('id') + '##' + buttonId;
        }

        var boton = $('<button type=\'button\'></button>').text($.rup.i18nParse(json_i18n, obj.i18nCaption)).addClass('rup-toolbar_button').attr({
            'id': buttonId
        });


        boton.rup_button(obj);
        boton.button('option', 'icons', {
            primary: obj.css,
            secondary: null
        });



        // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
        if (obj.right !== undefined && obj.right === true) {
            //Añadir botón a la derecha
            var $div_rightObjects = this.children('div:not(.rup-dropdown-btn-group)');
            if ($div_rightObjects.length === 0) {
                $div_rightObjects = $('<div></div>').attr('id', this.attr('id') + '-rightButtons').css('float', 'right');
                this.append($div_rightObjects);
            }
            //				if (boton.parent().is(".rup-dropdown-btn-group")){
            //					boton.parent().prependTo($div_rightObjects);
            //				}else{
            boton.prependTo($div_rightObjects);
            //				}
        } else {
            if (boton.parent().is('.rup-dropdown-btn-group')) {
                $(this).append(boton.parent());
            } else {
                $(this).append(boton);
            }
        }

        //Añadir evento keydown
        this._setKeyDown(boton);

        // Al perder el foco se elimina el estilo de disponer del foco
        boton.on('focusout', function () {
            $(this).removeClass('ui-state-focus');
        });

        return boton;
    };


    ToolbarJQueryUIAdapter.prototype.addMButton = function (obj, json_i18n) { //añade a la toolbar un 'mbutton' (sin botones)
        var boton = '',
            buttonId;
        if (obj.id === undefined) {
        	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_toolbar.mbuttonsIdError'));
            boton = null;
        } else {
            buttonId = obj.id;
            // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
            if (buttonId.indexOf($(this).attr('id')) !== 0) {
                buttonId = $(this).attr('id') + '##' + obj.id;
            }

            boton = $('<a></a>').attr('id', buttonId).text($.rup.i18nParse(json_i18n, obj.i18nCaption)).addClass('rup-toolbar_menuButton');
            //Si no se define un estilo especial se aplica por defecto
            if (obj.css === undefined) {
                obj.css = 'rup-toolbar_menuButtonIcon';
            }
            boton.button().button('option', 'icons', {
                primary: null,
                secondary: obj.css
            });
        }

        // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
        if (obj.right !== undefined && obj.right === true) {
            //Añadir botón a la derecha
            var $div_rightObjects = this.children('div:not(.rup-dropdown-btn-group)');
            if ($div_rightObjects.length === 0) {
                $div_rightObjects = $('<div></div>').attr('id', this.attr('id') + '-rightButtons').css('float', 'right');
                this.append($div_rightObjects);
            }
            boton.prependTo($div_rightObjects);
        } else {
            $(this).append(boton);
        }

        //Añadir evento keydown
        this._setKeyDown(boton);

        if (obj.click) { //Añadir eventos
            boton.click({
                i18nCaption: obj.i18nCaption
            }, obj.click);
        }
        return boton;
    };

    ToolbarJQueryUIAdapter.prototype.addButtonsToMButton = function (buttons, menuButton, json_i18n) { //añade botones al 'mbutton'
        var div, ul,
            //numero de botones a añadir
            length = buttons.length,
            boton, buttonId;

        if ($('[id=\'mbutton_' + menuButton.attr('id') + '\']').length === 0) {
            //Contenedor del menuButton
            div = $('<div>')
                .addClass('ui-widget ui-widget-content rup-toolbar_menuButtonContainer')
                .attr('id', 'mbutton_' + menuButton[0].id)
                .css('display', 'none');
            //Lista no numerada del menuButton
            ul = $('<ul>')
                .attr('role', 'menu')
                .attr('aria-activedescendant', 'active-menuitem')
                .attr('aria-labelledby', 'active-menuitem');
        } else {
            div = $('[id=\'mbutton_' + menuButton.attr('id') + '\']');
            ul = div.children('ul');
        }

        menuButton.attr('href', '#');

        //Se añaden cada uno de los botones del menuButton
        for (var i = length; i--;) {

            boton = buttons[i];
            if (boton.id) {
                buttonId = menuButton.attr('id') + '##' + boton.id;
            } else {
                buttonId = menuButton.attr('id') + '##' + boton.i18nCaption;
            }
            buttons[i].id = buttonId;

            ul.prepend($('<li>').css('display', 'block').append(this.addButton(buttons[i], json_i18n).addClass('rup-toolbar_menuButtonElement')));
        }

        //Añadir elementos al DOM
        if (!$.rup_utils.aplicatioInPortal()) {
            div.appendTo('body');
            div.append(ul);
        } else {
            div.append(ul);
            $('.r01gContainer').append(div);
        }

    };

    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[ToolbarJQueryUIAdapter.prototype.NAME] = new ToolbarJQueryUIAdapter;

    return $;
}));