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

/*global define */
/*global jQuery */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './rup.base'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($, RupBase, Util, Dropdown) {

	var rup_navbar = {};

	// $(document).off(".dropdown.data-api");
	// $(document).off(".collapse.data-api");



	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_navbar', rup_navbar));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_navbar('extend', {

	});

	$.fn.rup_navbar('extend', {
		_init: function (args) {
			var $self = this,
				settings = $.extend({}, $.fn.rup_navbar.defaults, $(this).data(), args[0]),
				changed, headerOuterHeight, headerSize, headerNavSize;


			if (settings.sticky === true){
				changed = false;

				headerOuterHeight = $('header').length !=0 ? $('header').outerHeight(true) : 0;
				headerSize = $('header').length !=0 ? headerOuterHeight - $('header').offset().top : 0;

				headerNavSize = headerOuterHeight + $('nav').outerHeight(true);
				// $("nav.rup-navbar [data-toggle='dropdown']").dropdown();
				// $("nav.rup-navbar [data-toggle='collapse']").collapse();

				window.scrollHeight = 0;
				$(window).scroll(function () {

					if ($(this).scrollTop() === 0) {
						changed = false;
						$('header').removeAttr('style');
						$('.rup-navbar.navbar').removeAttr('style');
						$('.rup-breadCrumb_root').removeAttr('style');
					} else if ($(this).scrollTop() >= headerSize && !changed) {
						changed = true;
						$('header').css('margin-top', -headerSize);
						$('.rup-navbar.navbar').css({
							'position': 'fixed',
							'width': '100%'
						});
						$('.rup-breadCrumb_root').css('margin-top', function (index, curValue) {
							return parseInt(curValue, 10) + headerNavSize + 'px';
						});
					} else if ($(this).scrollTop() < headerSize && changed) {
						changed = false;
						$('header').css('margin-top', 0);
						$('.rup-navbar.navbar').css({
							'position': 'relative',
							'width': '100%'
						});
						$('.rup-breadCrumb_root').css('margin-top', function (index, curValue) {
							return parseInt(curValue, 10) - headerNavSize + 'px';
						});
					}

					var height = $(window).scrollTop();

					if (height > headerNavSize) {
						$('nav .swingTop').addClass('on');
					} else {
						$('nav .swingTop').removeClass('on');
					}
				});


				// El reescalado de la pantalla navega al inicio del contenido
				$(window).resize(function () {
					headerOuterHeight = $('header').length !=0 ? $('header').outerHeight(true) : 0;
					headerSize = $('header').length !=0 ? headerOuterHeight - $('header').offset().top : 0;

					headerNavSize = headerOuterHeight + $('nav').outerHeight(true);
					$.rup_utils.swing2Top();
				});
			}



			// El botón de volver a la parte superior del contenido
			$('nav .swingTop')
				.off('click')
				.on('click', function () {
					$('.navbar-toggler:visible').click();
					$.rup_utils.swing2Top();
				});

			// Hacer click fuera de menú lo cierra
			$('#overlay').on('click tap', function () {
				$('.navbar-toggler:visible').click();
			});

			// Funcionamiento de apertura del menú
			$('.navbar-toggler').on('click tap', function () {
				$('#overlay').toggleClass('on');
				$('.navbar-toggleable-md .rup-open').removeClass('rup-open');
			});

			// Cierre de menú al navegar a un item
			$('nav .dropdown-item').not('.dropdown-toggle').on('click', function () {
				$('.navbar-toggler:visible').click();
			});

			// Funcionamiento acordeón entre desplegables en el menú
			$('nav .dropdown>a').on('click tap', function () {
				$('nav .dropdown>a').not($(this)).parent().removeClass('rup-open');
				$(this).parent().toggleClass('rup-open');
			});

			// Funcionamiento de apertura de sub-desplegables en el menú
			$('nav .dropdown-submenu a').on('click tap', function () {
				$('nav .dropdown-submenu a').not($(this)).parent().removeClass('rup-open');
				$(this).parent().toggleClass('rup-open');

				var menuScrollPos = 0;
				var end = $(this).parent().index();
				$(this).parent().siblings().each(function (i, e) {
					if (i < end) {
						if ($(e).children('.dropdown-menu').length > 0) {
							menuScrollPos += $(e).children('.dropdown-item:first').outerHeight(true);
						} else {
							menuScrollPos += $(e).outerHeight(true);
						}
					}
				});
				$(this).parent().parent().animate({
					scrollTop: menuScrollPos
				}, 500);
			});
		}
	});

	$.fn.rup_navbar.defaults = {
		sticky: true
	};
}));
