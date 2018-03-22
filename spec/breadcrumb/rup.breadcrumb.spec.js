import 'jquery';
import Handlebars from 'handlebars';
import 'jasmine-jquery';
import 'rup.breadcrumb';

describe('RUP BreadCrumb Test:', () => {
    describe('Creación del elemento: ', () => {
        var html, $breadcrumb;

        beforeAll(() =>{
            html = '<div id="exampleBreadcrumb" class="rup_breadcrumb"></div>';
            $('body').append(html);
            $breadcrumb = $('#exampleBreadcrumb').rup_breadcrumb({});
        });
        afterAll( () => {
            $('body').html('');
        });

        it('El breadcrumb debe existir', () => {
            expect($breadcrumb).toBeDefined();
        });

        describe('Test de los métodos públicos', () => {
            generalFunc($breadcrumb,['destroy']);
        });
    });
});