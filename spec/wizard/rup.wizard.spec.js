import 'jquery';
import 'jasmine-jquery';
import 'rup.wizard';

describe('Test Wizard > ', () => {
    var $wizard;
    beforeAll(() => {
        let html =  '<form id="exampleWizard">'
                +        '<fieldset>'
                +            '<legend class="wizardLegend">Paso1</legend>'
                +            '<input type="text" name="in1" id="input1">'
                +            '<input type="text" name="in2" id="input2">'
                +        '</fieldset>'
                +        '<fieldset>'
                +            '<legend class="wizardLegend">Paso2</legend>'
                +            '<select name="select" id="sel1">'
                +                '<option value="opt1">Opt1</option>'
                +                '<option value="opt2">Opt2</option>'
                +            '</select>'
                +        '</fieldset>'
                +        '<fieldset>'
                +            '<legend class="wizardLegend">Paso3</legend>'
                +            '<input type="submit" value="submit" id="btnSubmit">'
                +        '</fieldset>'
                +    '</form>';
        $('body').append(html);
        let opts = {
            submitButton:'btnSubmit',
            stepFnc: {
                '0': () => {},
                '1': () => {},
                '2': () => {}
            }
        };
        $('#exampleWizard').rup_wizard(props);
        $wizard = $('#exampleWizard');
    });
    afterAll(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('Debe tener la clase rup_wizard', () => {});
        it('Debe crear un <ul> con la clase de los steps', () => {});
    });
    describe('Métodos públicos > ', () =>{
        describe('Método step > '  , () => {
            it('Debe mostrarse el paso seleccionado', () => {});
            it('El resto de pasos debe estar ocultos', () => {});
        });
        describe('Método first > ' , () => {
            it('Debe seleccionar el primer paso', () => {});
        });
        describe('Método last > '  , () => {
            it('Debe seleccionar el último paso', () => {});
        });
        describe('Método getCurrentStep > '         , () => {
            it('Debe devolver el paso en el que estamos', () => {});
        });
        describe('Método isCurrentStep > '          , () => {
            it('Debe establecer si el paso es el actual', () => {});
        });
        describe('Método isCurrentStepFirst > '     , () => {
            it('Debe establecer si estamos en el primer paso', () => {});
        });
        describe('Método isCurrentStepLast > '      , () => {
            it('Debe establecer si estamos en el último paso', () => {});
        });
        describe('Método isCurrentStepSummary > '   , () => {
            it('Debe establecer si estamos en el paso de resumen');
        });
        describe('Método enableStep > '     , () => {
            it('El step debe estar habilitado', () => {});
        });
        describe('Método disableStep > '    , () => {
            it('El step debe estar deshabilitado', () => {});
        });
        describe('Método isStepDisabled > ' , () => {
            it('Debe establecer si el paso esta deshabilitado');
        });
    });
});