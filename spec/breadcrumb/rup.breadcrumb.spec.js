import 'jquery';
import 'jasmine-jquery';
import 'rup.breadcrumb';
import {
  componentTestRunner
} from '../helpers/rup.componentTestRunner.spec';

describe('RUP BreadCrumb Test:', () => {
  var $breadcrumb;
  describe('Creación del elemento: ', () => {
    var html;

    beforeAll(() => {
      html = '<div id="exampleBreadcrumb" class="rup_breadcrumb"></div>';
      $('body').append(html);
      $breadcrumb = $('#exampleBreadcrumb');
      $breadcrumb.rup_breadCrumb({
        breadCrumb: {}
      });
    });
    afterAll(() => {
      $('body').html('');
    });

    it('El breadcrumb debe estar definido', () => {
      expect($breadcrumb.find('span.rup-breadCrumbs_span:first').size()).toBe(1);
    });


  });
  describe('Test de los métodos públicos', () => {
    componentTestRunner($breadcrumb, 'rup_breadCrumb', ['destroy']);
  });
});
