import 'jquery'
import 'jasmine-jquery'
import 'rup.tooltip'

describe('TEST Tooltip', () => {
    var $tooltip;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<input id="exampleTooltip"></input>';
            $('body').append(html);
            let props = {
                content:{
                    text:'Texto Prueba'
                }
            };
            $('#exampleTooltip').rup_tooltip(props);
            $tooltip = $('#exampleTooltip');
        });
        it('Debe existir el elemento con clase .qtip', () => {
            //Se crea un .qtip
            expect($('.qtip').length).toBeGreaterThan(0);
        });
    });
    describe('Métodos públicos', () => {
        describe('Método open', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('open');
            });
            it('Debe ser visible', () => {
                expect($tooltip.css('display')).toBe('block');
            });
        });
        describe('Método close', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('close');
            });
            it('Debe ser visible', () => {
                expect($tooltip.css('display')).toBe('none');
            });
        });
        describe('Método option', () => {

            afterAll(() => {
                $tooltip.rup_tooltip('optioon', 'show', {modal:false});
            });
            it('Debe recibir los valores correctamente', () => {
                expect($tooltip.rup_tooltip('option', 'content').text).toBe('Texto Prueba');
            });
            it('Debe actualizar las propiedades', () => {
                $tooltip.rup_tooltip('optioon', 'show', {modal:true});
                expect($tooltip.rup_tooltip('option', 'show').modal).toBeTruthy();
            });
        });
        describe('Método disable', () => {
            beforeAll(() => {
              if($tooltip.is(':disabled')){
                  $tooltip.enable();
              }
              $tooltip.rup_tooltip('disable');
            });
            it('Debe poder deshabilitarse', () => {
              expect($tooltip).toBeDisabled();
            });
        });
        describe('Método enable', () => {
            beforeAll(() => {
              if($tooltip.is(':enabled')){
                  $tooltip.disable();
              }
              $tooltip.rup_tooltip('enable');
            });
            it('Debe poder habilitarse', () => {
              expect($tooltip).not.toBeDisabled();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $tooltip.rup_tooltip('destroy');
            });
            it('No debe existir', () => {
                expect(() => {$tooltip.rup_tooltip('destroy');}).toThrowError();
            });
        });
    });
});
