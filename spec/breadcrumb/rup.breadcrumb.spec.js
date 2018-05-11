import 'jquery';
import 'jasmine-jquery';
import 'rup.breadCrumb';

describe('Test BreadCrumb >', () => {
	var $breadcrumb, $subLvlBC;
	beforeAll(() => {
		var html;
		html = '<div id="exampleBreadcrumb"></div>\
				<div id="subLeveledBreadCrumb"></div>';
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
					"ptrTres": {"i18nCaption":"ptrTres"}
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
	describe('Creación > ', () => {
		it('El breadcrumb debe estar definido', () => {
			expect($breadcrumb.find('span.rup-breadCrumbs_span:first').length).toBe(1);
		});
	});
	describe('Test de los métodos públicos >', () => {
		describe('Método destroy >', () => {
			beforeAll(() => {
				$breadcrumb.rup_breadCrumb('destroy');
			});
			it('No debe existir', () => {
				expect(() => {$breadcrumb.rup_breadCrumb('destroy')}).toThrowError();
			});
		});
	});
});
