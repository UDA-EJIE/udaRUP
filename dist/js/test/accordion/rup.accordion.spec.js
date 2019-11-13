/* jslint multistr: true */
/* eslint-env jasmine, jquery */


describe('Test Accordion > ', () => {
    var $defAccordion, $altAccordion;

    beforeAll((done) => {
        if ($('#content').length == 0) {
            $('body').append('<div id="content" class="container mt-4"></div>');
        }
        testutils.loadCss(done);
    });

    beforeEach(() => {
        let confAlternativa = {
            collapsible: true,
            disabled: true,
            active: 1,
            event: 'mouseenter'
        };

        let html = '<div id="defaultAccordion" class="rup_accordion">\
						<h1><a>Head 1</a></h1>\
						<div> Contenido 1</div>\
						<h1><a>Head 2</a></h1>\
						<div> Contenido 2</div>\
					</div>\
					<div id="alterAccordion" class="rup_accordion">\
						<h1><a>Head 1</a></h1>\
						<div> Contenido 1</div>\
						<h1><a>Head 2</a></h1>\
						<div> Contenido 2</div>\
					</div>';
        $('#content').append(html);
        $('#defaultAccordion').rup_accordion({});
        $('#alterAccordion').rup_accordion(confAlternativa);

        $defAccordion = $('#defaultAccordion');
        $altAccordion = $('#alterAccordion');
    });
    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creación > ', () => {
        describe('Accordion con parametros por defecto > ', () => {
            it('Debe tener las clases apropiadas', () => {
                expect($defAccordion.hasClass('ui-accordion ui-widget ui-helper-reset rup_accordion_create')).toBeTruthy();
            });
            it('Los header debe tener un span con el icono', () => {
                $('#defaultAccordion > h1 > span').each((i, e) => {
                    expect($(e).hasClass('ui-accordion-header-icon ui-icon'))
                        .toBeTruthy();
                });
            });
            it('El contenido del div activo debe tener las clases apropiadas y ser visible', () => {
                let id = $('#defaultAccordion > h1.ui-accordion-header-active')
                    .attr('id');
                expect($('#defaultAccordion > div[aria-labelledby="' + id + '"]')
                    .hasClass('ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active'))
                    .toBeTruthy();
                expect($('#defaultAccordion > div[aria-labelledby="' + id + '"]').is(':visible'))
                    .toBeTruthy();
            });
            it('El div que no este activo debe tener las clases apropiadas y estar hidden', () => {
                let id = $('#defaultAccordion > h1:not(.ui-accordion-header-active)')
                    .attr('id');
                expect($('#defaultAccordion > div[aria-labelledby="' + id + '"]')
                    .hasClass('ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content'))
                    .toBeTruthy();
                expect($('#defaultAccordion > div[aria-labelledby="' + id + '"]').is(':visible'))
                    .toBeFalsy();
            });
        });
        describe('Accordion con parametros personalizados > ', () => {
            it('Debe tener las clases apropiadas', () => {
                expect($altAccordion
                    .hasClass('ui-accordion ui-widget ui-helper-reset ui-accordion-disabled ui-state-disabled rup_accordion_create'))
                    .toBeTruthy();
            });
            it('Los header debe tener un span con el icono', () => {
                $('#alterAccordion > h1 > span').each((i, e) => {
                    expect($(e).hasClass('ui-accordion-header-icon ui-icon'))
                        .toBeTruthy();
                });
            });
            it('El contenido del div activo debe tener las clases apropiadas y ser visible', () => {
                let id = $($('#alterAccordion > h1')[1]).attr('id');
                expect($('#alterAccordion > div[aria-labelledby="' + id + '"]')
                    .hasClass('ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active'))
                    .toBeTruthy();
                expect($('#alterAccordion > div[aria-labelledby="' + id + '"]').is(':visible'))
                    .toBeTruthy();
            });
            it('El div que no este activo debe tener las clases apropiadas y estar hidden', () => {
                let id = $('#alterAccordion > h1:not(.ui-accordion-header-active)')
                    .attr('id');
                expect($('#alterAccordion > div[aria-labelledby="' + id + '"]')
                    .hasClass('ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content'))
                    .toBeTruthy();
                expect($('#alterAccordion > div[aria-labelledby="' + id + '"]').is(':visible'))
                    .toBeFalsy();
            });
        });
    });
    describe('Funcionalidad > ', () => {
        describe('Accordion con parámetros por defecto > ', () => {
            describe('Cambiar la vista activa con click > ', () => {
                var idNewActive;
                beforeEach(() => {
                    $defAccordion.accordion( 'option', 'animate', 0 );	
                    $('h1:not(.ui-accordion-header-active)', $defAccordion).trigger('click');
                    idNewActive = $('h1.ui-accordion-header-active', $defAccordion).attr('id');
                });
                it('Debe cambiarse la clase de active', () => {
					
                    expect($('h1#' + idNewActive, $defAccordion).hasClass('ui-accordion-header-active'))
                        .toBeTruthy();
                    expect($('h1:not(#' + idNewActive + ')', $defAccordion).hasClass('ui-accordion-header-active'))
                        .toBeFalsy();
                });
                it('Debe togglearse la visibilidad de los contenidos', () => {
                    expect($('div[aria-labelledby="' + idNewActive + '"]', $defAccordion)
                        .is(':visible')).toBeTruthy();
                    expect($('div:not([aria-labelledby="' + idNewActive + '"])', $defAccordion)
                        .is(':visible')).toBeFalsy();					
                });
            });
        });
        describe('Accordion con parámetros personalizados > ', () => {
            describe('Cambiar la vista activa con mouseenter > ', () => {
                var idNewActive;
                beforeEach(() => {
                    $altAccordion.accordion( 'option', 'animate', 0 );	
                    //Enableamos el accordion
                    $altAccordion.rup_accordion('enable');
                    //Obtenemos el id del nuevo activo
                    $('h1:not(.ui-accordion-header-active)', $altAccordion).trigger('mouseenter');
                    idNewActive = $('h1.ui-accordion-header-active', $altAccordion).attr('id');
                });
                it('Debe cambiarse la clase de active', () => {
                    expect($('h1#' + idNewActive).hasClass('ui-accordion-header-active'))
                        .toBeTruthy();
                    expect($('h1:not(#' + idNewActive + ')', $altAccordion).hasClass('ui-accordion-header-active'))
                        .toBeFalsy();
                });
                it('Debe togglearse la visibilidad de los contenidos', () => {
                    expect($('div[aria-labelledby="' + idNewActive + '"]', $altAccordion)
                        .is(':visible')).toBeTruthy();
                    expect($('div:not([aria-labelledby="' + idNewActive + '"])', $altAccordion)
                        .is(':visible')).toBeFalsy();
                });
            });
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método activate > ', () => {
            describe('Accordion con parametros por defecto', () => {
                var idOldActive;
                beforeEach(() => {
                    idOldActive = $('h1.ui-accordion-header-active', $defAccordion).attr('id');
                    $defAccordion.rup_accordion('activate', 1);
                });
                it('Debe cambiarse la clase activa', () => {
                    expect($('h1.ui-accordion-header-active', $defAccordion).attr('id'))
                        .not.toBe(idOldActive);
                });
            });
            describe('Accordion con parametros personalizados', () => {
                var idOldActive;
                beforeEach(() => {
                    idOldActive = $('h1.ui-accordion-header-active', $altAccordion).attr('id');
                    $altAccordion.rup_accordion('activate', 0);
                });
                it('Debe cambiarse la clase activa', () => {
                    expect($('h1.ui-accordion-header-active', $altAccordion).attr('id'))
                        .not.toBe(idOldActive);
                });
            });
        });

        describe('Método disable > ', () => {
            describe('Accordion con parametros por defecto', () => {
                beforeEach(() => {
                    $defAccordion.rup_accordion('disable');
                });
                it('Debe poder deshabilitarse', () => {
                    expect($defAccordion.hasClass('ui-accordion-disabled ui-state-disabled')).toBe(true);
                });
            });
            describe('Accordion con parametros personalizados', () => {
                beforeEach(() => {
                    $altAccordion.rup_accordion('disable');
                });
                it('Debe poder deshabilitarse', () => {
                    expect($altAccordion.hasClass('ui-accordion-disabled ui-state-disabled')).toBe(true);
                });
            });
        });

        describe('Método enable > ', () => {
            describe('Accordion con parametros por defecto', () => {
                beforeEach(() => {
                    $defAccordion.rup_accordion('disable');
                    $defAccordion.rup_accordion('enable');
                });
                it('Debe poder habilitarse', () => {
                    expect($defAccordion.hasClass('ui-accordion-disabled ui-state-disabled')).not.toBe(true);
                });
            });
            describe('Accordion con parametros personalizados', () => {
                beforeEach(() => {
                    $altAccordion.rup_accordion('disable');
                    $altAccordion.rup_accordion('enable');
                });
                it('Debe poder habilitarse', () => {
                    expect($altAccordion.hasClass('ui-accordion-disabled ui-state-disabled')).not.toBe(true);
                });
            });
        });
        describe('Método widget > ', () => {
            describe('Accordion con parámetros por defecto', () => {
                it('Debe ser el objeto de accordion', () => {
                    expect($defAccordion.rup_accordion('widget').attr('id'))
                        .toBe($($defAccordion[0]).attr('id'));
                });
            });
            describe('Accordion con parámetros personalizados', () => {
                it('Debe ser el objeto de accordion', () => {
                    expect($altAccordion.rup_accordion('widget').attr('id'))
                        .toBe($($altAccordion[0]).attr('id'));
                });
            });
        });
        describe('Método destroy > ', () => {
            describe('Accordion con parametros por defecto', () => {
                beforeEach(() => {
                    $defAccordion.rup_accordion('destroy');
                });
                it('Deben desaparecer las clases del accordion', () => {
                    expect($defAccordion.hasClass('ui-accordion ui-widget rup_accordion_create'))
                        .toBe(false);
                });
            });
            describe('Accordion con parametros personalizados', () => {
                beforeEach(() => {
                    $altAccordion.rup_accordion('destroy');
                });
                it('Deben desaparecer las clases del accordion', () => {
                    expect($altAccordion.hasClass('ui-accordion ui-widget rup_accordion_create'))
                        .toBe(false);
                });
            });
        });

        describe('Método option > ', () => {
            describe('Accordion con parametros por defecto > ', () => {
                beforeEach(() => {
                    $defAccordion.rup_accordion('option', 'collapsible', true);
                    $defAccordion.rup_accordion('option', 'validation', false);
                    $defAccordion.rup_accordion('option', 'disabled', true);
                    $defAccordion.rup_accordion('option', 'active', 1);
                    $defAccordion.rup_accordion('option', 'animate', 'bounceslide');
                    $defAccordion.rup_accordion('option', 'event', 'mouseenter');
                    $defAccordion.rup_accordion('option', 'header', '.header-class');
                    $defAccordion.rup_accordion('option', 'icons', {
                        header: 'ui-icon-triangle-1-s',
                        activeHeader: 'ui-icon-triangle-1-e'
                    });
                });
                it('Las opciones deben cambiar', () => {
                    expect($defAccordion.rup_accordion('option', 'collapsible')).toBeTruthy();
                    expect($defAccordion.rup_accordion('option', 'validation')).toBeFalsy();
                    expect($defAccordion.rup_accordion('option', 'disabled')).toBeTruthy();
                    expect($defAccordion.rup_accordion('option', 'active')).toBe(1);
                    expect($defAccordion.rup_accordion('option', 'animate')).toBe('bounceslide');
                    expect($defAccordion.rup_accordion('option', 'event')).toBe('mouseenter');
                    expect($defAccordion.rup_accordion('option', 'header')).toBe('.header-class');
                    expect(JSON.stringify($defAccordion.rup_accordion('option', 'icons')))
                        .toBe('{"header":"ui-icon-triangle-1-s","activeHeader":"ui-icon-triangle-1-e"}');
                });
            });
            describe('Accordion con parametros personalizados > ', () => {
                beforeEach(() => {
                    $altAccordion.rup_accordion('option', 'collapsible', false);
                    $altAccordion.rup_accordion('option', 'validation', false);
                    $altAccordion.rup_accordion('option', 'disabled', false);
                    $altAccordion.rup_accordion('option', 'active', 0);
                    $altAccordion.rup_accordion('option', 'animate', 'bounceslide');
                    $altAccordion.rup_accordion('option', 'event', 'click');
                    $altAccordion.rup_accordion('option', 'header', '.header-class');
                    $altAccordion.rup_accordion('option', 'icons', {
                        header: 'ui-icon-triangle-1-s',
                        activeHeader: 'ui-icon-triangle-1-e'
                    });
                });
                it('Las opciones deben cambiar', () => {
                    expect($altAccordion.rup_accordion('option', 'collapsible')).toBeFalsy();
                    expect($altAccordion.rup_accordion('option', 'validation')).toBeFalsy();
                    expect($altAccordion.rup_accordion('option', 'disabled')).toBeFalsy();
                    expect($altAccordion.rup_accordion('option', 'active')).toBe(0);
                    expect($altAccordion.rup_accordion('option', 'animate')).toBe('bounceslide');
                    expect($altAccordion.rup_accordion('option', 'event')).toBe('click');
                    expect($altAccordion.rup_accordion('option', 'header')).toBe('.header-class');
                    expect(JSON.stringify($altAccordion.rup_accordion('option', 'icons')))
                        .toBe('{"header":"ui-icon-triangle-1-s","activeHeader":"ui-icon-triangle-1-e"}');
                });
            });
        });
    });
});