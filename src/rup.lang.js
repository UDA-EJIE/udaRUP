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

/*
	 Plugin que genera la combo de idiomas con el siguiente formato.
		<ul>
			<li id="idiomaActivo" class="activo">Castellano </li>
			<li id="enlace" class="ultimo cambio_idioma" >
				<a href="#">Cambiar Idioma</a>
			</li>
			<li id="listado" class="ultimo cambio_idioma_desplegado" style="display: none;">
				<div  class="caja_idiomas">
					<a id="caja_listado" class="opcion_cambio" >Cambiar Idioma</a>
					<div class="listado_idiomas">
						<a id="cerrar" class="cerrar_idiomas" href="#" title="Cerrar"><span class="hidden">Cerrar</span></a>

						<ul class="principal">
								<li id="idioma_es" class="activo">
									<a class="idioma">Castellano</a>
								</li>
								<li id="idioma_eu">
									<a class="idioma">Euskera</a>
								</li>
						</ul>
					 </div>
				 </div>
			</li>
		</ul>
*/

/**
 * El componente de idioma esta diseñado para permitir al usuario elegir, de forma intuitiva, el idioma en el que se presenta la aplicación.
 *
 * @summary Componente RUP Language.
 * @module rup_language
 * @example
 * var properties={
 *   // Propiedades de configuración
 * };
 *
 * $("#idlanguage").rup_language(properties);
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './rup.tooltip'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {


    $.widget('$.rup_language', {
        options: {
            languages: null,
            active: null,
            modo: 'default' //portal
        },
        /**
         * Función encargada de crear en el DOM los elementos necesarios para el componente.
         *
         * @function	_create
         * @private
         */
        _create: function () {
            global.initRupI18nPromise.then(() => {
                var active;

                this.options.active = $.rup.lang == null ? '[lang]' : $.rup.lang;
                active = this.options.active;
                this.options.languages = $.rup.AVAILABLE_LANGS.split(',');
                var self = this.element,
                    aChangeLang = $(`
                        <a id="rup_language_choice" class="rup-language_change_option">
                            ${$.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguage')}
                        </a>
                    `);
                

                // Obtener el parámetro HDIV_STATE (en caso de no estar disponible se devolverá vacío)
                var hdivStateParam = $.fn.getHDIV_STATE(true);

                //gestion de estilos de jquery-ui
                $(self).addClass('ui-widget');

                if (this.options.modo === 'default') {
                    let $parent = self.parent(),
                        $langCurrentText = self.find('[data-rup-lang-current]'),
                        $languagesDropdown;

                    $parent.addClass('dropdown');
                    self.addClass('dropdown-toggle')
                        .attr({
                            'data-toogle': 'dropdown',
                            'aria-haspopup': 'true',
                            'aria-expanded': 'false'
                        });


                    $langCurrentText.text($.rup.i18nParse($.rup.i18n.base, 'rup_language.' + this.options.active));
                    $languagesDropdown = $parent.find('[aria-labelledby=' + self.attr('id') + ']');
                    $.each(this.options.languages, function (key, value) {
                        value = value.replace(/^\s*|\s*$/g, '');
                        var txt = $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value);

                        $languagesDropdown.append($(`
                            <a href="${'?' + $.rup.LOCALE_PARAM_NAME + '=' + value + hdivStateParam}" class="dropdown-item">${txt}</a>
                        `));
                    });
                    $parent.append($languagesDropdown);


                } else if (this.options.modo === 'portal') {
                    let ul = $('<ul>').addClass('rup-language_portal'),
                        lng_lenght = $(this.options.languages).length;

                    $.each(this.options.languages, function (key, value) {
                        value = value.replace(/^\s*|\s*$/g, '');
                        var txt = $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value + '_short');
                        if (value !== active) {
                            const title = $.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguageLiteral_' + value) +
                                $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value);
                            $(`
                                <li>
                                    <a href="${'?' + $.rup.LOCALE_PARAM_NAME + '=' + value + hdivStateParam}"
                                        class="rup-language_portal_list ui-corner-all"
                                        title="${title}">
                                        ${txt}
                                    </a>
                                </li>
                            `).appendTo(ul);
                        } else {
                            const title = $.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguageLiteral') +
                                $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value);
                            $(`
                                <li class="ui-state-active">
                                    <a href="javascript:void(0);"
                                        class="rup-language_portal_list_active ui-corner-all"
                                        title="${title}">
                                        ${txt}
                                    </a>
                                </li>
                            `).appendTo(ul);
                        }
                        //div.appendTo(ulPrincipal);
                        if (key < lng_lenght - 1) {
                            ul.append($('<div>').html('|').addClass('rup-language_portal_separator'));
                        }
                    });

                    self.append(ul);

                } else if (this.options.modo === 'classic' || this.options.modo === 'jquery-ui') {

                    // Carga de los valores por defecto para los atributos que no ha introducido el usuario
                    let ul = $('<ul>').attr('id', 'ulGeneral'),
                        liIdiomaActivo = $('<li>').attr('id', 'rup_active_language').addClass('rup-language_active').text($.rup.i18nParse($.rup.i18n.base, 'rup_language.' + this.options.active))
                            .attr('title', $.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguageLiteral') + $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + active)),
                        liEnlace = $('<li>').addClass('rup-language_change').attr('id', 'rup_language_link'),
                        liListado = $('<li>').attr('id', 'rup_language_list').addClass('rup-language_change_opened').css('visibility', 'hidden'),
                        divCajaIdiomas = $('<div>'),
                        listadoIdiomas = $('<div>').addClass('rup-language_language_list'),
                        cerrarIdioma = $('<a>')
                            .addClass('rup-language_close_languages')
                            .attr('id', 'rup_language_close')
                            .attr('href', '#')
                            .attr('title', $.rup.i18nParse($.rup.i18n.base, 'rup_language.closingLiteral'))
                            .html($.rup.i18nParse($.rup.i18n.base, 'rup_global.cerrar')),
                        ulPrincipal = $('<ul>');

                    ul.append(liIdiomaActivo);

                    $('<a>').attr('href', '#').text($.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguage')).appendTo(liEnlace);
                    ul.append(liEnlace);
                    divCajaIdiomas.append(aChangeLang);

                    listadoIdiomas.append(cerrarIdioma);

                    $.each(this.options.languages, function (key, value) {
                        value = value.replace(/^\s*|\s*$/g, '');
                        var liIdioma = $('<li>').attr('id', 'rup_language_lng_' + value),
                            txt = $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value);
                        if (value !== active) {
                            $('<a>').appendTo(liIdioma).attr('href', '?' + $.rup.LOCALE_PARAM_NAME + '=' + value + hdivStateParam).text(txt)
                                .attr('title', $.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguageLiteral_' + value) + $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value));
                        } else {
                            //hacemos que sea el lenguage actual el activo
                            $('<a>').appendTo(liIdioma).attr('href', 'javascript:void(0);').text(txt)
                                .attr('title', $.rup.i18nParse($.rup.i18n.base, 'rup_language.changeLanguageLiteral') + $.rup.i18nParse($.rup.i18n.base, 'rup_language.' + value));
                        }
                        liIdioma.appendTo(ulPrincipal);
                    });
                    listadoIdiomas.append(ulPrincipal);
                    divCajaIdiomas.append(listadoIdiomas);
                    liListado.append(divCajaIdiomas);
                    ul.append(liListado);
                    self.append(ul);

                    var ajust = listadoIdiomas.css('width', '0.8em').width();
                    var saveMargin = liEnlace.css('margin-right');
                    liEnlace.css('margin-right', '0px');
                    listadoIdiomas.width((liListado.position()).left - ajust);
                    listadoIdiomas.css('padding-left', '0.6em');
                    listadoIdiomas.css('padding-right', '0.2em');
                    listadoIdiomas.css('top', liIdiomaActivo.height() - 1);
                    liListado.hide();
                    liListado.css('visibility', '');
                    liEnlace.css('margin-right', saveMargin);

                    //se aplica el lenguage actual el activo
                    $('#rup_language_lng_' + $.rup.lang).addClass('ui-state-active');

                    //evento click para mostrar el listado de idiomas
                    liEnlace.click(function () {
                        liEnlace.hide();
                        liListado.show();
                        $('.rup-language_language_list').find('li:not(.rup-language_language_list_active)').first().children('a').focus();
                    });

                    //evento del enlace de cambio de idioma
                    aChangeLang.click(function () {
                        liListado.hide();
                        liEnlace.show();
                    });
                    //evento del boton de cerrar
                    cerrarIdioma.click(function () {
                        liListado.hide();
                        liEnlace.show();
                    });

                    // gestion de eventos del raton sobre la parte del cambio de idioma
                    liListado.mouseenter(function () {
                        self.one('mouseleave', function () {
                            liListado.hide();
                            liEnlace.show();
                        });
                    });

                    self.on('keydown', function (event) {
                        switch (event.keyCode) {
                        case $.ui.keyCode.UP:
                            if ($(event.target).parent().prevAll('li:not(.rup-language_language_list_active)').length > 0) {
                                $(event.target).parent().prevAll('li:not(.rup-language_language_list_active)').first().children().focus();
                            } else {
                                $(event.target).parent().siblings('li:not(.rup-language_language_list_active)').last().children().focus();
                            }
                            break;
                        case $.ui.keyCode.DOWN:
                            if ($(event.target).parent().nextAll('li:not(.rup-language_language_list_active)').length > 0) {
                                $(event.target).parent().nextAll('li:not(.rup-language_language_list_active)').first().children().focus();
                            } else {
                                $(event.target).parent().siblings('li:not(.rup-language_language_list_active)').first().children().focus();
                            }
                            break;
                        case $.ui.keyCode.ESCAPE:
                            liListado.hide();
                            liEnlace.show();
                            break;
                        default:
                        }
                    });
                }

                // Se aplica el tooltip
                self.find('[title]').rup_tooltip({
                    'applyToPortal': true
                });

                //Se audita el componente
                $.rup.auditComponent('rup_lang', 'init');
            });
        },
        /**
         * Modifica las opciones de configuración del componente.
         *
         * @function	_setOption
         * @private
         */
        _setOption: function () {
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        /**
         * Elimina el componente.
         *
         * @function	destroy
         * @example
         * $("#idlanguage").rup_language("destroy");
         */
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });

    /**
     * Opciones por defecto de configuración del componente.
     * @name defaults
     *
     * @property {object} languages - Conjunto de idiomas que serán gestionados con el componente. El listado de los mismos, por configuración general, se gestiona a través de la variable jQuery “$.rup.AVAILABLE_LANGS_ARRAY”. Para mas información, consultar el documento “Anexo-Gestion_idiomatica.doc” de la documentación de UDA.
     * @property {string} [modo] - Determina el tipo de maquetación que utilizara el componente para presentar las diferentes opciones idiomáticas. Si el valor especificado es “portal”, los idiomas se presentaran en un listado horizontal separado por barras (ver ejemplo visual del capítulo/Sección “2. Ejemplo”). En cualquier otro caso, se mostrara el modo por defecto (ver ejemplo visual del capítulo/Sección “2. Ejemplo”).
     */

}));