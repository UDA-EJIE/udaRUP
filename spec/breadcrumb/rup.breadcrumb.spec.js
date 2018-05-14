import 'jquery';
import 'jasmine-jquery';
import 'rup.breadCrumb';

describe('Test BreadCrumb >', () => {
	var $breadcrumb, $subLvlBC;
	beforeEach(() => {
		var html;
		html = '<div id="exampleBreadcrumb" class="rup-breadCrumb_root"></div>\
				<div id="subLeveledBreadCrumb" class="rup-breadCrumb_root"></div>';
		$('body').append(html);
		$('#exampleBreadcrumb').rup_breadCrumb({
			breadCrumb: {}
		});
		$('#subLeveledBreadCrumb').rup_breadCrumb({
			"breadCrumb": {
				"patrones":{
					//Literal mostrado:
					"i18nCaption":"Varios patrones",
					//Elementos:
					"ptrUno": {"i18nCaption":"ptrUno"},
					"ptrDos": {"i18nCaption":"ptrDos"},
					"ptrTres": {"i18nCaption":"ptrTres"},
					//Sublevel
					"subLevel": [
						{"i18nCaption":"ptrUno", "url":"./ptr/uno"},
						{"i18nCaption":"ptrDos", "url":"./ptr/dos"},
						{"i18nCaption":"ptrTres", "url":"./ptr/tres"}
					]
				}
			}
		});
		$breadcrumb = $('#exampleBreadcrumb');
		$subLvlBC = $('#subLeveledBreadCrumb');
	});
	afterEach(() => {
		$('body').html('');
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
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main').children().length).toBe(2);
					},1500);
				});
				it('El primer hijo debe ser el "Inicio" y debe ser un enlace', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li > a').html()).toBe('Inicio');
					},1500);
				});
				it('El primer hijo debe tener un icono de flecha', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li > span')
							.hasClass('ui-icon rup-icon rup-icon-separator-arrow')).toBeTruthy();
					},1500);
				});
				it('El segundo hijo debemostrarse como el actual', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li')
							.hasClass('rup-breadCrumb_current')).toBeTruthy();
					},1500);
				});
				it('El texto del segundo hijo debe ser "Varios patrones"', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > span')
							.html()).toBe('Varios patrones');
					},1500);
				});
				it('El segundo hijo debe contener un ul oculto', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul').length).toBe(1);
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.css('display')).toBe('none');
					},1500);
				});
				it('El ul oculto debe tener tres hijos (Los sublevel)', () => {
					setTimeout(() => {
						expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children().length).toBe(3);
					},1500);
				});
				it('Los hijos deben ser los especificados en la configuracion', () => {
					setTimeout(() => {
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[0]).html()).toBe('ptrUno');
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[0]).attr('href')).toBe('./ptr/uno');
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[1]).html()).toBe('ptrDos');
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[1]).attr('href')).toBe('./ptr/dos');
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[2]).html()).toBe('ptrTres');
						expect($('a', $('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
							.children()[2]).attr('href')).toBe('./ptr/tres');
					},1500);
				});
			});
		});
	});
	describe('Test de funcionamiento > ', () => {
		describe('Mostrar sublevels haciendo hover en "Varios patrones"', () => {
			beforeEach(() => {
				$('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current').mouseenter();
			});
			it('Debe mostrarse', () => {
				setTimeout(() => {
					expect($('#subLeveledBreadCrumb > ul.rup-breadCrumb_main > li.rup-breadCrumb_current > ul')
						.css('display')).toBe('block');
				}, 1500);
			});
		});
	});
	describe('Test de los métodos públicos >', () => {
		describe('Método destroy >', () => {
			beforeEach(() => {
				$breadcrumb.rup_breadCrumb('destroy');
			});
			it('No debe existir', () => {
				expect(() => {$breadcrumb.rup_breadCrumb('destroy')}).toThrowError();
			});
		});
	});
});
