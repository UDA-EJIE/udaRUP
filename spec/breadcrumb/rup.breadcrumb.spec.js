/* jslint multistr: true */

import 'jquery';
import 'rup.base';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.breadCrumb';

describe('Test BreadCrumb >', () => {
	var $breadcrumb, $subLvlBC;

	beforeAll((done) => {
		testutils.loadCss(done);
		window.history.pushState({
			urlPath: '/x21aResponsive/patrones/ptrUno'
		}, "", '/x21aResponsive/patrones/ptrUno');
	});

	beforeEach(() => {
		var html;
		html = '<div id="exampleBreadcrumb" class="rup-breadCrumb_root"></div>\
				<div id="subLeveledBreadCrumb" class="rup-breadCrumb_root"></div>';
		$('#content').append(html);

		$('#exampleBreadcrumb').rup_breadCrumb({
			breadCrumb: {}
		});
		window.history.pushState({
			urlPath: '/x21aResponsive/patrones/ptrUno'
		}, "", '/x21aResponsive/patrones/ptrUno');
		$('#subLeveledBreadCrumb').rup_breadCrumb({
			"breadCrumb": {
				"patrones": {
					//Literal mostrado:
					"i18nCaption": "Varios patrones",
					//Elementos:
					"ptrUno": {
						"i18nCaption": "ptrUno"
					},
					"ptrDos": {
						"i18nCaption": "ptrDos"
					},
					"ptrTres": {
						"i18nCaption": "ptrTres"
					},
					//Sublevel
					"subLevel": [{
							"i18nCaption": "ptrUno",
							"url": "./patrones/ptrUno"
						},
						{
							"i18nCaption": "ptrDos",
							"url": "./patrones/ptrDos"
						},
						{
							"i18nCaption": "ptrTres",
							"url": "./patrones/ptrTres"
						}
					]
				}
			}
		});
		$breadcrumb = $('#exampleBreadcrumb');
		$subLvlBC = $('#subLeveledBreadCrumb');
	});

	afterEach(() => {
		$('#content').html('');
		$('#content').nextAll().remove();
	});

	describe('Creación > ', () => {
		describe('Creación de Breadcrumb vacío > ', () => {
			describe('Debe existir el span dentro del breadCrumb > ', () => {
				it('Debe existir el span', () => {
					expect($('#exampleBreadcrumb > span.rup-breadCrumbs_span').length).toBe(1);
				});
				it('Debe tener el texto esperado', () => {
					expect($('#exampleBreadcrumb > span.rup-breadCrumbs_span').html()).toBe('Usted está en:');
				});
			});
			describe('Debe tener únicamente una miga de pan en el ul de las migas (Inicio) > ', () => {
				it('Debe existir el ul de las migas', () => {
					expect($('#exampleBreadcrumb > ul.rup-breadCrumb_main').length).toBe(1);
				});
				it('Debe tener un único hijo (Inicio)', () => {
					expect($('#exampleBreadcrumb > ul.rup-breadCrumb_main').children().length).toBe(1);
				});
				it('El hijo debe ser "Inicio"', () => {
					expect($('#exampleBreadcrumb > ul.rup-breadCrumb_main > li > span').html()).toBe('Inicio');
				});
			});
		});
		describe('Creación de Breadcrumb con migas > ', () => {
			describe('Debe existir el span dentro del breadCrumb > ', () => {
				it('Debe existir el span', () => {
					expect($('#subLeveledBreadCrumb > span.rup-breadCrumbs_span').length).toBe(1);
				});
				it('Debe tener el texto esperado', () => {
					expect($('#subLeveledBreadCrumb > span.rup-breadCrumbs_span').html()).toBe('Usted está en:');
				});
			});
			describe('Debe tener dos migas de pan en el ul de las migas > ', () => {
				it('Debe existir el ul de las migas', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main').length).toBe(1);
				});
				it('Debe tener dos hijos', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main').children().length).toBe(3);
				});
				it('El primer hijo debe ser el "Inicio" y debe ser un enlace', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li > a').html()).toBe('Inicio');
				});
				it('El primer hijo debe tener un icono de flecha', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li > span')
						.hasClass('ui-icon rup-icon rup-icon-separator-arrow')).toBeTruthy();
				});
				it('El segundo hijo debemostrarse como el actual', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li')
						.hasClass('rup-breadCrumb_current')).toBeTruthy();
				});
				it('El texto del hijo seleccionado debe ser "ptrUno"', () => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > span')
						.html()).toBe('ptrUno');
				});
				it('El segundo hijo debe contener un ul oculto', () => {
					let varPatrones = $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current').prev();
					expect($('ul', varPatrones).length).toBe(1);
					expect($('ul', varPatrones).css('display')).toBe('none');
				});
				it('El ul oculto debe tener tres hijos (Los sublevel)', () => {
					let varPatrones = $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current').prev();
					expect($('ul', varPatrones).children().length).toBe(3);
				});
				it('Los hijos deben ser los especificados en la configuracion', () => {
					let varPatrones = $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current').prev();
					expect($('a', $('ul', varPatrones).children()[0]).html()).toBe('ptrUno');
					expect($('a', $('ul', varPatrones).children()[0]).attr('href')).toBe('./patrones/ptrUno');
					expect($('a', $('ul', varPatrones).children()[1]).html()).toBe('ptrDos');
					expect($('a', $('ul', varPatrones).children()[1]).attr('href')).toBe('./patrones/ptrDos');
					expect($('a', $('ul', varPatrones).children()[2]).html()).toBe('ptrTres');
					expect($('a', $('ul', varPatrones).children()[2]).attr('href')).toBe('./patrones/ptrTres');
				});
			});
		});
	});
	describe('Test de funcionamiento > ', () => {
		describe('Mostrar sublevels haciendo hover en "Varios patrones"', () => {
			// TODO: REVISAR.
			let varPatrones = $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current').prev();
			beforeEach(() => {
				varPatrones.trigger('mouseenter');
			});
			it('Debe mostrarse', () => {
				expect($('ul', varPatrones).css('display')).toBe('block');
			});
		});
	});
	describe('Test de los métodos públicos >', () => {
		describe('Método destroy >', () => {
			beforeEach(() => {
				$breadcrumb.rup_breadCrumb('destroy');
			});
			it('No debe existir', () => {
				expect(() => {
					$breadcrumb.rup_breadCrumb('destroy');
				}).toThrowError();
			});
		});
	});
});