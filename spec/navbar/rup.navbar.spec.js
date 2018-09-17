import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
//import 'webpage';
import 'jasmine-jquery';
import 'rup.navbar';

const html = '<nav id="navbarResponsive" class="rup-navbar navbar">\
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
                                    id="navDropdownDos" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre2\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownDos">\
                                    <a href="#" class="dropdown-item">Elem21</a>\
                                    <a href="#" class="dropdown-item">Elem22</a>\
                                </div>\
                            </li>\
                    </ul>\
                    <ul class="nav navbar-nav float-md-right rup-nav-tools">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownTres" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre3\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownTres">\
                                <a href="#" class="dropdown-item">Elem31</a>\
                                <a href="#" class="dropdown-item">Elem32</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownCuatro" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre4\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownCuatro">\
                                    <a href="#" class="dropdown-item">Elem41</a>\
                                    <a href="#" class="dropdown-item">Elem42</a>\
                                    <div class="dropdown-submenu">\
                                        <a class="dropdown-item dropdown-toggle">Elem43</a>\
                                        <div class="dropdown-menu menu-right">\
                                            <a class="dropdown-item" href="#">Elem431</a>\
                                            <a class="dropdown-item" href="#">Elem432</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </li>\
                    </ul>\
              </nav>';

function createNavBar() {
    $('#content').append(html);
    $('nav').rup_navbar();
}

function navBarTest() {
    describe('Test NavBar > ', () =>{
        var $navbar;
        beforeAll((done) => {
            testutils.loadCss(done);
        });
        beforeEach(() => {
            createNavBar();
            $navbar = $('nav');
        });
        describe('Creación > ', () => {
            it('Deben añadirse clases al nav:', () => {
                debugger;
                expect($('[aria-controls="navbarResponsive"]').is(':visible')).toBeTruthy();
            });
        });
        describe('Funcionamiento > ', () => {
            describe('Cuando se hace click en el elemento del menu el submenu aparece > ', () => {
                beforeEach(() => {
                    $('#navDropdownUno').click();
                });
                it('El submenu no debe tener la clase collapse:', () => {
                    expect($('[aria-labelledby="navDropdownUno"]').hasClass('collapse')).toBeFalsy();
                });
                describe('Al hacer click sobre otro elemento de nav > ', () => {
                    beforeEach(() => {
                        $('#navDropdownCuatro').click();
                    });
                    it('Se debe intercambiar la visisbilidad:', () => {
                        expect($('[aria-labelledby="navDropdownUno"]').hasClass('collapse')).toBeTruthy();
                        expect($('[aria-labelledby="navDropdownCuatro"]').hasClass('collapse')).toBeFalsy();
                    });
                });
                describe('Si se hace click fuera del navbar se debe cerrar > ', () => {
                    beforeEach(() => {
                        $('body').click();
                    });
                    it('El submenu debe tener la clase collapse:', () => {
                        expect($('[aria-labelledby="navDropdownUno"]').hasClass('collapse')).toBeFalsy();
                    });
                });
            });
        });
        describe('Métodos públicos > ', () => {
            describe('Metodo toggle > ', () => {});
            describe('Método show > ', () => {});
            describe('Método hide > ', () => {});
            describe('Método setTransitioning > ', () => {});
        });
    });
}

navBarTest();