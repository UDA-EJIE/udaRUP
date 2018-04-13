import 'jquery';
import 'jasmine-jquery';
import 'rup.breadCrumb';

describe('Test BreadCrumb >', () => {
	var $breadcrumb;
	beforeAll(() => {
		var html;
		html = '<div id="exampleBreadcrumb"></div>';
		$('body').append(html);
		$('#exampleBreadcrumb').rup_breadCrumb({
			breadCrumb: {}
		});
		$breadcrumb = $('#exampleBreadcrumb');
	});
	describe('Creación > ', () => {
		// FIXME: $breadcrumb es undefined
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
