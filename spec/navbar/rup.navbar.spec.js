import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.navbar';

const html = '<nav class="rup-navbar navbar">\
                <button type="button" class="navbar-toggler hidden-lg-up navbar-toggle" \
                    type="button" data-toggle="rup-collapse" data-target="#navbarResponsive"\
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">\
                </button>\
                <a class="navbar-brand" href="#">Uda</a>\
                    <ul class="nav navbar-nav">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre1\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem11</a>\
                                <a href="#" class="dropdown-item">Elem12</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre2\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem21</a>\
                                    <a href="#" class="dropdown-item">Elem22</a>\
                                </div>\
                            </li>\
                    </ul>\
                    <ul class="nav navbar-nav float-md-right rup-nav-tools">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre3\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem31</a>\
                                <a href="#" class="dropdown-item">Elem32</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre4\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem41</a>\
                                    <a href="#" class="dropdown-item">Elem42</a>\
                                </div>\
                            </li>\
                    </ul>\
              </nav>';

function createNavBar() {
    $('#content').append(html);
    $('nav').rup_navbar();
}

$.when(testutils.loadCss())
    .then(navBarTest);

function navBarTest() {
    describe('Test NavBar > ', () =>{
        var $navbar;
        beforeEach(() => {
            createNavBar();
        });
        describe('Creación > ', () => {
            it('Deben añadirse clases al nav:', () => {
                debugger;
            });
        });
        describe('Funcionamiento > ', () => {});
        describe('Métodos públicos > ', () => {});
    });
}