import 'jquery'
import 'jasmine-jquery'
import 'rup.tooltip'

describe('TEST Tooltip', () => {
    var $tooltip;
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
            });
            it('Debe ser visible', () => {
                expect($('.qtip').css('display')).toBe('block');
            });
        });
        describe('Método close', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
            });
            it('No debe ser visible', () => {
                expect($('.qtip').is(':visible')).toBeFalsy();
            });
        });
        describe('Método option', () => {
            it('Debe recibir los valores correctamente', () => {
                expect($tooltip.rup_tooltip('option', 'content').text).toBe('Texto Prueba');
            });
            it('Debe actualizar las propiedades', () => {
                $tooltip.rup_tooltip('option', 'show', {modal:true});
                expect($tooltip.rup_tooltip('option', 'show').modal).toBeTruthy();
            });
        });
        describe('Método disable', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('disable');
            });
            it('Debe poder deshabilitarse', () => {
                expect($('#qtip-exampleTooltip').hasClass('qtip-disabled')).toBeTruthy();
            });
        });
        describe('Método enable', () => {
            beforeEach(() => {
              $tooltip.rup_tooltip('disable');
              $tooltip.rup_tooltip('enable');
            });
            it('Debe poder habilitarse', () => {
                expect($('#qtip-exampleTooltip').hasClass('qtip-disabled')).toBe(false);
            });
        });
        describe('Método destroy', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('destroy');
                $tooltip.rup_tooltip('open');
            });
            it('No debe existir', () => {
                expect($('.qtip').css('display')).toBe('none');
            });
        });
    });
});
