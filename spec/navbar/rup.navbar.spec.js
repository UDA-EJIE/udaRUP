import 'jquery';
import * as testutils from '../common/specCommonUtils.js';
import 'jasmine-jquery';
import 'rup.navbar';

const html = '\
<nav class="rup-navbar navbar">\n\
    <button type="button" class="navbar-toggler hidden-lg-up navbar-toggle"\n\
      data-toggle="rup-collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"\n\
      aria-expanded="false" aria-label="Toggle navigation">\n\
    </button>\n\
    <div id="navbarResponsive" class="collapse navbar-toggleable-md">\n\
        <a class="navbar-brand" href="#">Uda</a>\n\
        <ul class="nav navbar-nav>\n\
            <li class="nav-item dropdown rup-open">\n\
                <a class="nav-link dropdown-toggle" href="#" id="navDropdownUno"\n\
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="">\n\
                    Padre1\n\
                </a>\n\
                <div class="collapse dropdown-menu" aria-labelledby="navDropdownUno">\n\
                    <a class="dropdown-item" href="#" style="">Hijo11</a>\n\
                    <a class="dropdown-item" href="#" style="">Hijo12</a>\n\
                </div>\n\
            </li>\n\
            <li class="nav-item dropdown rup-open">\n\
                <a class="nav-link dropdown-toggle" href="#" id="navDropdownDos"\n\
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="">\n\
                    Padre2\n\
                </a>\n\
                <div class="collapse dropdown-menu" aria-labelledby="navDropdownDos">\n\
                    <a class="dropdown-item" href="#" style="">Hijo21</a>\n\
                    <a class="dropdown-item" href="#" style="">Hijo22</a>\n\
                </div>\n\
            </li>\n\
        </ul>\n\
    </div>\n\
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
        afterEach(() => {
            $('#content').html('');
        });
        describe('Funcionamiento > ', () => {
            // NO SE PUEDEN EJECUTAR ESTAS PRUEBAS EN PAHNTOM. 
            // Se pueden probar con el navegador chrome comando : `npm run test:dev`
            // describe('Cuando se hace click en el elemento del menu el submenu aparece > ', () => {
            //     beforeEach((done) => {
            //         $('#navDropdownUno').parent().on('toggleEnd', () => {
            //             done();
            //         });
            //         $('#navDropdownUno').click();
            //     });
            //     it('El submenu debe tener la propiedad de estar expandido:', () => {
            //         expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeTruthy();
            //     });
            //     describe('Al hacer click sobre otro elemento de nav > ', () => {
            //         beforeEach(() => {
            //             $('#navDropdownDos').click();
            //         });
            //         it('Se debe intercambiar la visisbilidad:', () => {
            //             expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeFalsy();
            //             expect($('[aria-labelledby="navDropdownDos"]').is(':visible')).toBeTruthy();
            //         });
            //     });
            //     describe('Si se hace click fuera del navbar se debe cerrar > ', () => {
            //         beforeEach(() => {
            //             $('body').click();
            //         });
            //         it('El submenu debe estar oculto:', () => {
            //             expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeFalsy();
            //         });
            //     });
            // });
        });
        describe('Métodos públicos > ', () => {
            // NO SE PUEDEN EJECUTAR ESTAS PRUEBAS EN PAHNTOM. 
            // Se pueden probar con el navegador chrome comando : `npm run test:dev`
            // describe('Metodo toggle > ', () => {
            //     beforeEach((done) => {
            //         $('#navDropdownUno').parent().on('toggleEnd', () => {
            //             done();
            //         });
            //         $('#navDropdownUno').rup_navbar('toggle');
            //     });
            //     it('Se expanden los hijos de padre1:', () => {
            //         expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeTruthy();
            //     });
            // });
            // describe('Método show > ', () => {
            //     beforeEach((done) => {
            //         $('#navDropdownUno').parent().on('toggleEnd', () => {
            //             done();
            //         });
            //         $('#navDropdownUno').rup_navbar('show');
            //     });
            //     it('Se expanden los hijos de padre1:', () => {
            //         expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeTruthy();
            //     });
            // });
            // describe('Método hide > ', () => {
            //     beforeEach((done) => {
            //         $('#navDropdownUno').parent().on('toggleEnd', () => {
            //             $('#navDropdownUno').parent().on('toggleEnd', () => {
            //                 done();
            //             });
            //             $('#navDropdownUno').rup_navbar('hide');
            //         });
            //         $('#navDropdownUno').rup_navbar('show');
            //     });
            //     it('Se ocultan los hijos de padre1:', () => {
            //         expect($('[aria-labelledby="navDropdownUno"]').is(':visible')).toBeFalsy();
            //     });
            // });
            describe('Método setTransitioning > ', () => {
                beforeEach(() => {
                    $('#navDropdownUno').rup_navbar('setTransitioning', true);
                });
                it('Comprobamos que haya variado su valor:', () => {
                    expect($('#navDropdownUno').rup_navbar('_isTransitioning')).toBeTruthy();
                });
            });
        });
    });
}

navBarTest();