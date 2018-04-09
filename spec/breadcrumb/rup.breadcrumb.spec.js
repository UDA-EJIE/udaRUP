import 'jquery';
import 'jasmine-jquery';
import 'rup.breadcrumb';
import {componentTestRunner} from '../helpers/rup.componentTestRunner.spec';

describe('RUP BreadCrumb Test:', () => {
    describe('Creación del elemento: ', () => {
        var html, $breadcrumb;

        beforeAll(() =>{
            html = '<div id="exampleBreadcrumb" class="rup_breadcrumb"></div>';
            $('body').append(html);
            $breadcrumb = $('#exampleBreadcrumb').rup_breadCrumb({breadCrumb:{}});
        });
        afterAll( () => {
            $('body').html('');
        });

        it('El breadcrumb debe estar definido', () => {
            expect($breadCrum[0].firstChild.className).toBe('rup-breadCrumbs_span');
        });

        describe('Test de los métodos públicos', () => {
            componentTestRunner($breadcrumb, 'rup_breadCrumb', ['destroy']);
        });
    });
});