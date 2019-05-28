/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../templates', '../rup.base', ], factory);
	} else {

		// Browser globals
		root.JqTableBootstrapAdapter = factory(jQuery);
	}
}(this, function ($, Rup) {

	function JqTableBootstrapAdapter() {

	}

	JqTableBootstrapAdapter.prototype.NAME = 'table_bootstrap';

	JqTableBootstrapAdapter.prototype.CONST = {
		core: {
			operations: {
				defaultOperations: {
					'add': {
						icon: 'mdi mdi-plus'
					},
					'save': {
						icon: 'mdi mdi-content-save'
					},
					'edit': {
						icon: 'mdi mdi-playlist-edit'
					},
					'clone': {
						icon: 'mdi mdi-content-copy'
					},
					'delete': {
						icon: 'mdi mdi-trash-can-outline'
					},
					'cancel': {
						icon: 'mdi mdi-cancel'
					}
				}
			}
		}
	};

	JqTableBootstrapAdapter.prototype.configurePager = function (settings) {
		var $self = this,
			pagerName,
			$pagerCenter,
			pagerLeft,
			pagerRight,
			$pagerLeft,
			$pagerCenter,
			$pagerRight;


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
				$pagerLeft.append($('<div/>').addClass('ui-paging-selected').html('0 ' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.selected')));
			}

			// Pager center
			$pagerCenter.css('white-space', 'inherit');
			jQuery('.pager_center table td', settings.$pager).addClass('pagControls');

			// Evento de control de página máxima
			jQuery('.pagControls input.ui-pg-input', $pagerCenter).on('change', function () {
				var pageNum = parseInt($(this).val()),
					totalNum = parseInt($self.rup_jqtable('getGridParam', 'lastpage'));

				if (isNaN(pageNum) === false && pageNum > totalNum) {
					$(this).val(totalNum);
				}
			});

			// Tooltip al combo de selección de número de registros
			jQuery('.pagControls select.ui-pg-selbox', $pagerCenter).attr('title', jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.select')).rup_tooltip();
			// Tooltip al input de selección de página
			jQuery('.pagControls input.ui-pg-input', $pagerCenter).attr('title', jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.input')).rup_tooltip();

			var pagerLinkTemplate = Rup.Templates.rup.jqtable.pager.link.bootstrap;

			//Cambiar flechas paginación por literales
			jQuery('#first_' + pagerName, $pagerCenter)
				.html(pagerLinkTemplate({
					label: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.primPag')
				}))
				.addClass('mdi mdi-page-first')
				.removeClass('ui-pg-button');

			jQuery('#prev_' + pagerName, $pagerCenter)
				.html(pagerLinkTemplate({
					label: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.anterior')
				}))
				.addClass('mdi mdi-chevron-left')
				.removeClass('ui-pg-button');
			
			jQuery('#next_' + pagerName, $pagerCenter)
				.html(pagerLinkTemplate({
					label: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.siguiente')
				}))
				.addClass('mdi mdi-chevron-right')
				.removeClass('ui-pg-button');
			
			jQuery('#last_' + pagerName, $pagerCenter)
				.html(pagerLinkTemplate({
					label: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.ultiPag')
				}))
				.addClass('mdi mdi-page-last')
				.removeClass('ui-pg-button');
		}
	};

	JqTableBootstrapAdapter.prototype.createDetailNavigation = function () {

		var $self = $(this),
			settings = $self.data('settings'),
			jqGridID = $self.attr('id');
		var $template = $(Rup.Templates.rup.jqtable.detail.navigation.bootstrap({
			tableId: $self.prop('id'),
			resultNumText: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.numResult'),
			labelFirst: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.first'),
			labelPrev: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.previous'),
			labelNext: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.next'),
			labelLast: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.last')

		}));

		// var $self = $(this),
		//     settings = $self.data("settings"),
		//     jqGridID = $self.attr("id"),
		//     paginationBarTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_jqtable.templates.detailForm.paginationBar"),
		//     paginationLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_jqtable.templates.detailForm.paginationLink"),
		//     elementCounterTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_jqtable.templates.detailForm.elementCounter"),
		//     $separator = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_jqtable.templates.detailForm.separator")),
		//     $elementCounter = $(jQuery.jgrid.format(elementCounterTmpl, jqGridID, jQuery.rup.STATICS, jQuery.rup.i18nParse(jQuery.rup.i18n.base, "rup_jqtable.numResult"))),
		//     $paginationBar = $(jQuery.jgrid.format(paginationBarTmpl, jqGridID)),
		var $firstPaginationLink = $('#first_' + jqGridID, $template),
			$backPaginationLink = $('#back_' + jqGridID, $template),
			$forwardPaginationLink = $('#forward_' + jqGridID, $template),
			$lastPaginationLink = $('#last_' + jqGridID, $template),
			extpost = undefined;

		// $paginationBar.append($firstPaginationLink)
		//     .append($backPaginationLink)
		//     .append($forwardPaginationLink)
		//     .append($lastPaginationLink);

		// $pagina

		function doLinkNavigation(linkId, $link) {
			var retNavParams = $.proxy(settings.fncGetNavigationParams, $self)(linkId)
			// Se comprueba el parametro 7 mientras esten en convivencia el rup.jqtable(entrar) y rup.table
			if(retNavParams !== undefined && retNavParams[7] === undefined){
				if ($.proxy($.jgrid.checkUpdates, $self[0])(extpost, function () {
					$.proxy(settings.doNavigation, $self)(retNavParams);
				})) {
					$.proxy(settings.doNavigation, $self)(retNavParams);
				}
			}
		}


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


		// return $("<div>").append($elementCounter).append($paginationBar).append($separator);
		//
		return $template;
	};

	JqTableBootstrapAdapter.prototype.multifilter = {
		dropdown:{
			dropdownIcon : 'ui-icon-gear',
			dropdownDialogConfig : {
				title : '<i class="mdi mdi-filter" aria-hidden="true"></i>'
			}
		}

	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[JqTableBootstrapAdapter.prototype.NAME ] = new JqTableBootstrapAdapter;

	return $;
}));
