/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.tooltip';

function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

describe('TEST Tooltip', () => {
    var $tooltip;
    var $qtip;
    beforeEach(() => {
        var html = '<div class="input-group">\
                       <input id="inputExample" name="inputExample" type="text" class="form-control">\
                           <span class="input-group-btn">\
                               <button id="exampleTooltip" class="btn btn-secondary" type="button">\
                                   <i class="fa fa-question-circle" aria-hidden="true"></i>\
                               </button>\
                           </span>\
                   </div>';

        $('body').append(html);
        let props = {
            content: {
                text: "Texto Prueba"
            },
            position: {
                my: 'top center',
                at: 'bottom center',
                target: $("#inputExample")
            },
            show: {
                event: 'click'
            }
        };
        $('#exampleTooltip').rup_tooltip(props);
        $tooltip = $('#exampleTooltip');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación', () => {
        beforeEach(() => {
            $tooltip.rup_tooltip('open');
        });
        it('Debe existir el elemento con clase .qtip', () => {
            //Se crea un .qtip
            expect($('.qtip').length).toBeGreaterThan(0);
        });
    });
    describe('Métodos públicos', () => {
        describe('Método open', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe ser visible', () => {
                expect($qtip.is(':visible')).toBeTruthy();
            });
        });
        describe('Método close', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('No debe ser visible', () => {
                $tooltip.rup_tooltip('close');
                testTrace('body - html', $('body').html());
                testTrace('qtip - visible', $qtip.is(':visible'));
                testTrace('qtip - aria-hidden', $qtip.attr('aria-hidden'));
                expect($qtip.is(':visible')).toBeFalsy();
            });
        });
        describe('Método option', () => {
            it('Debe recibir los valores correctamente', () => {
                expect($tooltip.rup_tooltip('option', 'content').text).toBe('Texto Prueba');
            });
            it('Debe actualizar las propiedades', () => {
                $tooltip.rup_tooltip('option', 'show', {
                    modal: true
                });
                expect($tooltip.rup_tooltip('option', 'show').modal).toBeTruthy();
            });
        });
        describe('Método disable', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('disable');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe poder deshabilitarse', () => {
                expect($qtip.hasClass('qtip-disabled')).toBeTruthy();
            });
        });
        describe('Método enable', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('disable');
                $tooltip.rup_tooltip('enable');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe poder habilitarse', () => {
                expect($qtip.hasClass('qtip-disabled')).toBe(false);
            });
        });
        describe('Método destroy', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('destroy');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('No debe existir', () => {
                expect($qtip.attr('aria-disabled')).toBe('true');
            });
        });
    });
});