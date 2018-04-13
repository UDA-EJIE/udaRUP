import 'jquery';
import 'jasmine-jquery';
import 'rup.accordion';

describe('Test Lang >', () => {
    var $lang;
    describe('Creación >', () => {
        var html = '<a class="nav-link rup-nav-tool-icon" href="#" ' +
                    'id="exampleLang" data-toggle="dropdown">' +
                        '<i class="fa fa-globe" aria-hidden="true"></i>' +
                        '<span data-rup-lang-current=""></span></a>' +
                    '<div class="dropdown-menu" aria-labelledby="exampleLang"></div>';
        $('body').append(html);
        $('#exampleLang').rup_language({languages: jQuery.rup.AVAILABLE_LANGS_ARRAY});
        $lang = $('#exampleLang');

        it('Debe tener las clases correspondientes', () => {
            expect($lang).toHaveClass('ui-widget dropdown-toggle');
        });
        it('Debe rellenarse el dropdown', () => {
            expect($lang.children().length).toBeGreaterThan(0);
        });
    });
    describe('Métodos públicos >', () => {
        describe('Método destroy >', () => {
            beforeAll(() => {
                $lang.rup_language('destroy');
            });
            it('No debe existir', () => {
                expect(() => {$lang.rup_language('destroy')}).toThrowError();
            });
        });
    });
});