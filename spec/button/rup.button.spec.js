import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.button';

describe('TEST Button', () => {
    var $button;
    describe('Creacion', () => {
        
        beforeAll(() => {
            var html= '<button id="exampleButton"></button>';
            $('body').append(html);

            $button = $('#exampleButton');
            $button.rup_button({});
        });
    });
    describe('Métodos públicos', () => {
        describe('Método defaults', () => {
            it('El objeto debe estar definido', () => {
                expect($button.rup_button('defaults')).toBeDefined();
            });
        });
    });
});