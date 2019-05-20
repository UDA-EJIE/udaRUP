/* jslint multistr: true */

import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.lang';

describe('Test Lang >', () => {
    var $lang;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var html = '<a class="nav-link rup-nav-tool-icon" href="#" \
                    id="exampleLang" data-toggle="dropdown">\
                        <i class="mdi mdi-earth" aria-hidden="true"></i>\
                        <span data-rup-lang-current=""></span></a>\
                    <div class="dropdown-menu" aria-labelledby="exampleLang"></div>\
                    <a class="nav-link rup-nav-tool-icon" href="#" \
                    id="exampleLang2" data-toggle="dropdown">\
                        <i class="mdi mdi-earth" aria-hidden="true"></i>\
                        <span data-rup-lang-current=""></span></a>\
                    <div class="dropdown-menu" aria-labelledby="exampleLang"></div>';
        $('#content').append(html);
        $('#exampleLang').rup_language({
            languages: jQuery.rup.AVAILABLE_LANGS_ARRAY
        });
        $('#exampleLang2').rup_language({
            languages: jQuery.rup.AVAILABLE_LANGS_ARRAY,
            modo: 'portal'
        });
        $lang = $('#exampleLang');
        $lang2 = $('#exampleLang2');
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creación >', () => {
        it('Debe tener las clases correspondientes', () => {
            expect($lang).toHaveClass('nav-link rup-nav-tool-icon ui-widget dropdown-toggle');
        });
        it('Debe rellenarse el dropdown', () => {
            expect($lang.children().length).toBeGreaterThan(0);
        });
        it('Debe mostrar el lenguaje por defecto (Castellano)', () => {
            expect($('#exampleLang > span').text()).toBe('Castellano');
        });
    });
    describe('Métodos públicos >', () => {
        describe('Método destroy >', () => {
            beforeEach(() => {
                $lang.rup_language('destroy');
            });
            it('No debe existir', () => {
                expect(() => {
                    $lang.rup_language('destroy');
                }).toThrowError();
            });
        });
    });
});