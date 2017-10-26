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
		define(['jquery', './rup.base','./external/util','./external/dropdown'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($, RupBase, Util, Dropdown) {

	var rup_navbar = {};

	const TRANSITION_DURATION = 600;
	const DATA_KEY            = 'rup.collapse';
	const EVENT_KEY           = `.${DATA_KEY}`;
	const DATA_API_KEY        = '.data-api';

	const Event = {
		SHOW           : `show${EVENT_KEY}`,
		SHOWN          : `shown${EVENT_KEY}`,
		HIDE           : `hide${EVENT_KEY}`,
		HIDDEN         : `hidden${EVENT_KEY}`,
		CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`
	};

	const ClassName = {
		IN         : 'in',
		COLLAPSE   : 'rup-collapse',
		COLLAPSING : 'rup-collapsing',
		COLLAPSED  : 'rup-collapsed'
	};

	const Selector = {
		ACTIVES     : '.card > .in, .card > .collapsing',
		DATA_TOGGLE : '[data-toggle="collapse"]'
	};

	const Dimension = {
		WIDTH  : 'width',
		HEIGHT : 'height'
	};


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
		toggle: function() {
			if ($(this._element).hasClass(ClassName.IN)) {
				this.hide();
			} else {
				this.show();
			}
		},

		show: function() {
			if (this._isTransitioning ||
								$(this._element).hasClass(ClassName.IN)) {
				return;
			}

			let actives;
			let activesData;
			this._element = $(this)[0];

			if (this._parent) {
				actives = $.makeArray($(Selector.ACTIVES));
				if (!actives.length) {
					actives = null;
				}
			}

			// if (actives) {
			// 	activesData = $(actives).data(DATA_KEY);
			// 	if (activesData && activesData._isTransitioning) {
			// 		return;
			// 	}
			// }

			let startEvent = $.Event(Event.SHOW);
			$(this._element).trigger(startEvent);
			if (startEvent.isDefaultPrevented()) {
				return;
			}

			// if (actives) {
			// 	Collapse._jQueryInterface.call($(actives), 'hide');
			// 	if (!activesData) {
			// 		$(actives).data(DATA_KEY, null);
			// 	}
			// }

			let dimension = this._getDimension();

			$(this._element)
				.removeClass(ClassName.COLLAPSE)
				.addClass(ClassName.COLLAPSING);

			this._element.style[dimension] = 0;
			this._element.setAttribute('aria-expanded', true);

			if (this._triggerArray.length) {
				$(this._triggerArray)
					.removeClass(ClassName.COLLAPSED)
					.attr('aria-expanded', true);
			}

			this.setTransitioning(true);

			let complete = () => {
				$(this._element)
					.removeClass(ClassName.COLLAPSING)
					.addClass(ClassName.COLLAPSE)
					.addClass(ClassName.IN);

				this._element.style[dimension] = '';

				this.setTransitioning(false);

				$(this._element).trigger(Event.SHOWN);
			};

			// if (!Util.default.supportsTransitionEnd()) {
			complete();
			// return;
			// }

			let capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
			let scrollSize           = `scroll${capitalizedDimension}`;

			$(this._element)
				.one(Util.TRANSITION_END, complete)
				.emulateTransitionEnd(TRANSITION_DURATION);

			this._element.style[dimension] = `${this._element[scrollSize]}px`;
		},

		hide: function () {
			if (this._isTransitioning ||
								!$(this._element).hasClass(ClassName.IN)) {
				return;
			}

			let startEvent = $.Event(Event.HIDE);
			$(this._element).trigger(startEvent);
			if (startEvent.isDefaultPrevented()) {
				return;
			}

			let dimension       = this._getDimension();
			let offsetDimension = dimension === Dimension.WIDTH ?
				'offsetWidth' : 'offsetHeight';

			this._element.style[dimension] = `${this._element[offsetDimension]}px`;

			Util.default.reflow(this._element);

			$(this._element)
				.addClass(ClassName.COLLAPSING)
				.removeClass(ClassName.COLLAPSE)
				.removeClass(ClassName.IN);

			this._element.setAttribute('aria-expanded', false);

			if (this._triggerArray.length) {
				$(this._triggerArray)
					.addClass(ClassName.COLLAPSED)
					.attr('aria-expanded', false);
			}

			this.setTransitioning(true);

			let complete = () => {
				this.setTransitioning(false);
				$(this._element)
					.removeClass(ClassName.COLLAPSING)
					.addClass(ClassName.COLLAPSE)
					.trigger(Event.HIDDEN);
			};

			this._element.style[dimension] = '';

			// if (!Util.default.supportsTransitionEnd()) {
			complete();
			// return;
			// }

			$(this._element)
				.one(Util.defaultTRANSITION_END, complete)
				.emulateTransitionEnd(TRANSITION_DURATION);
		},

		setTransitioning: function(isTransitioning) {
			this._isTransitioning = isTransitioning;
		},
		_getDimension() {
			let hasWidth = $(this._element).hasClass(Dimension.WIDTH);
			return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
		},
		_init: function (args) {
			var $self = this,
				settings = $.extend({}, $.fn.rup_navbar.defaults, $(this).data(), args[0]),
				changed, headerOuterHeight, headerSize, headerNavSize;

			$self._isTransitioning = false;
			$self._element         = $self[0];
			// this._config          = this._getConfig(args);

			// $('[data-toggle="collapse"]', $self).each(function(elem){
			// 	elem.attr('data-toggle', 'rup-colapse');
			// });

			$self._triggerArray    = $.makeArray($(
				`[data-toggle="rup-colapse"][href="#${$self._element.id}"],` +
								`[data-toggle="rup-colapse"][data-target="#${$self._element.id}"]`
			));

			// this._parent = this._config.parent ? this._getParent() : null;

			// if (!this._config.parent) {
			// 	this._addAriaAndCollapsedClass(this._element, this._triggerArray);
			// }

			// if (this._config.toggle) {
			// 	this.toggle();
			// }


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
				$self.toggle();
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

			$('.dropdown-toggle', $self).dropdown();

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
