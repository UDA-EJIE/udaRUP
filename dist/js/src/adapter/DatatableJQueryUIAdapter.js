/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.DatatableJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	function DatatableJQueryUIAdapter() {

	}

	DatatableJQueryUIAdapter.prototype.NAME = 'datatable_jqueryui';

	DatatableJQueryUIAdapter.prototype.CONST = {
		core: {
			operations: {
				defaultOperations: {
					'add': {
						icon: 'fa fa-plus'
					},
					'edit': {
						icon: 'fa fa-pencil-square-o'
					},
					'clone': {
						icon: 'fa fa-clone'
					},
					'delete': {
						icon: 'fa fa-trash-o'
					},
					'reports': {
						icon: 'fa fa-file-o'
					},
					'copyButton': {
						icon: 'fa fa-clipboard'
					}
				}
			}
		}
	};

	DatatableJQueryUIAdapter.prototype.configurePager = function (settings) {
		var $self = this,
			pagerName,
			$pagerCenter,
			pagerLeft,
			pagerRight;


		if (settings.pager !== undefined && settings.pager !== null) {
			settings.$pager = $((settings.pager.indexOf('#') === 0 ? settings.pager : '#' + settings.pager));
			pagerName = settings.$pager.attr('id');

			settings.$pager.css('height', 'auto'); //Posibilitar redimensionar paginador

			//Añadir clase a cada parte del paginador
			$pagerLeft = $('#' + pagerName + '_left');
			$pagerCenter = $('#' + pagerName + '_center');
			$pagerRight = $('#' + pagerName + '_right');

			$pagerLeft.addClass('pager_left');
			$pagerCenter.addClass('pager_center');
			$pagerRight.addClass('pager_right');

			//pager_left
			//**********
			//Quitar posibles botones del paginador (y dejar la parte izquierda vacía)
			$pagerLeft.html('');

			//Contador de seleccionados
			if (settings.multiselect === true) {
				$pagerLeft.append($('<div/>').addClass('ui-paging-selected').html('0 ' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.selected')));
			}

			// Pager center
			jQuery('.pager_center datatable td', settings.$pager).addClass('pagControls');

			// Evento de control de página máxima
			jQuery('.pagControls input.ui-pg-input', $pagerCenter).on('change', function () {
				var pageNum = parseInt($(this).val()),
					totalNum = parseInt($self.rup_datatable('getGridParam', 'lastpage'));

				if (isNaN(pageNum) === false && pageNum > totalNum) {
					$(this).val(totalNum);
				}
			});

			// Tooltip al combo de selección de número de registros
			jQuery('.pagControls select.ui-pg-selbox', $pagerCenter).attr('title', jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.select')).rup_tooltip();
			// Tooltip al input de selección de página
			jQuery('.pagControls input.ui-pg-input', $pagerCenter).attr('title', jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.input')).rup_tooltip();

			//Cambiar flechas paginación por literales
			jQuery('#first_' + pagerName, $pagerCenter)
				.html($('<a/>').attr('href', 'javascript:void(0)').html(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.primPag')).addClass('linkPaginacion'))
				.removeClass('ui-pg-button');
			jQuery('#prev_' + pagerName, $pagerCenter)
				.html($('<a/>').attr('href', 'javascript:void(0)').html(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.anterior')).addClass('linkPaginacion'))
				.removeClass('ui-pg-button');
			jQuery('#next_' + pagerName, $pagerCenter)
				.html($('<a/>').attr('href', 'javascript:void(0)').html(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.siguiente')).addClass('linkPaginacion'))
				.removeClass('ui-pg-button');
			jQuery('#last_' + pagerName, $pagerCenter)
				.html($('<a/>').attr('href', 'javascript:void(0)').html(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.pager.ultiPag')).addClass('linkPaginacion'))
				.removeClass('ui-pg-button');
		}
	};

	DatatableJQueryUIAdapter.prototype.createDetailNavigation = function () {
		var $self = $(this),
			settings = $self.data('settings'),
			jqGridID = $self.attr('id'),
			paginationBarTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.templates.detailForm.paginationBar'),
			paginationLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.templates.detailForm.paginationLink'),
			elementCounterTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.templates.detailForm.elementCounter'),
			$separator = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.templates.detailForm.separator')),
			$elementCounter = $(jQuery.jgrid.format(elementCounterTmpl, jqGridID, jQuery.rup.STATICS, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.numResult'))),
			$paginationBar = $(jQuery.jgrid.format(paginationBarTmpl, jqGridID)),
			$firstPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'first_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.first'))),
			$backPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'back_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.previous'))),
			$forwardPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'forward_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.next'))),
			$lastPaginationLink = $(jQuery.jgrid.format(paginationLinkTmpl, 'last_' + jqGridID, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_datatable.last'))),
			extpost = undefined;

		$paginationBar.append($firstPaginationLink)
			.append($backPaginationLink)
			.append($forwardPaginationLink)
			.append($lastPaginationLink);

		function doLinkNavigation(linkId, $link) {
			var retNavParams = $.proxy(settings.fncGetNavigationParams, $self)(linkId);
			//Se comprueba el aprametro 7 mientras este en convivencia con el rup.datatable el rup.datatable.
			if (retNavParams[7]  !== undefined && !$link.hasClass('ui-state-disabled')) {
				if ($.proxy($.jgrid.checkUpdates, $self[0])(extpost, function () {
					$.proxy(settings.doNavigation, $self)(retNavParams);
				})) {
					$.proxy(settings.doNavigation, $self)(retNavParams);
				}
			}
		}

		// Elemento primero
		$firstPaginationLink.on('click', function () {
			doLinkNavigation('first', $(this));
		});

		// Elemento anterior
		$backPaginationLink.on('click', function () {
			doLinkNavigation('prev', $(this));
		});

		// Elemento siguiente
		$forwardPaginationLink.on('click', function () {
			doLinkNavigation('next', $(this));
		});

		// Elemento ultimo
		$lastPaginationLink.on('click', function () {
			doLinkNavigation('last', $(this));
		});


		return $('<div>').append($elementCounter).append($paginationBar).append($separator);
	};

	DatatableJQueryUIAdapter.prototype.multifilter = {
		dropdown:{
			dropdownIcon : 'ui-icon-gear',
			dropdownDialogConfig : {
				title : '<span class="rup-icon rup-icon-filter"></span>'
			}
		}

	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DatatableJQueryUIAdapter.prototype.NAME ] = new DatatableJQueryUIAdapter;

	return $;
}));
