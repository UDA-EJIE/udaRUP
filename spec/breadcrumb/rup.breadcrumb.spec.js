import 'jquery';
import 'jasmine-jquery';
import 'rup.breadcrumb';

describe('RUP BreadCrumb Test:', () => {
	var $breadcrumb;
	describe('Creación del elemento: ', () => {
		var html;

		beforeAll(() => {
			html = '<div id="exampleBreadcrumb"></div>';
			$('body').append(html);
			$breadcrumb.rup_breadCrumb({
				breadCrumb: {}
			});
			$breadcrumb = $('#exampleBreadcrumb');
		});
		// FIXME: $breadcrumb es undefined
		it('El breadcrumb debe estar definido', () => {
			expect($breadcrumb.find('span.rup-breadCrumbs_span:first').length).toBe(1);
		});
	});
	describe('Test de los métodos públicos', () => {
		describe('Método destroy', () => {
			beforeAll(() => {
					$breadcrumb.rup_breadcrumb('destroy');
			});
			it('No debe existir', () => {
					expect(() => {$breadcrumb.rup_breadcrumb('destroy')}).toThrowError();
			});
	});
	});
});
