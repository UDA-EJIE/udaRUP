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
        it('Debe tener la clase rup_wizard', () => {
            expect($wizard).toHaveClass('rup-wizard');
        });
        it('Debe crear un <ul> con la clase de los steps', () => {
            expect($('ul.rup-wizard_stepsDescContainer').length).toBe(1);
        });
    });
    describe('Métodos públicos > ', () =>{
        describe('Método step > '  , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 1);
            });
            it('Debe mostrarse el paso seleccionado', () => {
                expect($('#step1').is(':visible')).toBeTruthy();
            });
            it('El resto de pasos debe estar ocultos', () => {
                expect($('#step0').is(':visible')).toBeFalsy();
                expect($('#step2').is(':visible')).toBeFalsy();
                expect($('#step3').is(':visible')).toBeFalsy();
            });
        });
        describe('Método first > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 2);
                $wizard.rup_wizard('first');
            });
            it('Debe seleccionar el primer paso', () => {
                expect($('#step0').is(':visible')).toBeTruthy();
            });
            it('El resto debe estar oculto', () => {
                expect($('#step1').is(':visible')).toBeFalsy();
                expect($('#step2').is(':visible')).toBeFalsy();
                expect($('#step3').is(':visible')).toBeFalsy();
            });
        });
        describe('Método last > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 1);
                $wizard.rup_wizard('last');
            });
            it('Debe seleccionar el último paso', () => {
                expect($('#step3').is(':visible')).toBeTruthy();
            });
            it('El resto debe estar oculto', () => {
                expect($('#step0').is(':visible')).toBeFalsy();
                expect($('#step1').is(':visible')).toBeFalsy();
                expect($('#step2').is(':visible')).toBeFalsy();
            });
        });
        describe('Método getCurrentStep > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 2);
            });
            it('Debe devolver el paso en el que estamos', () => {
                expect($wizard.rup_wizard('getCurrentStep')).toBe(2);
            });
        });
        describe('Método isCurrentStep > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 1);
            });
            it('Debe establecer si el paso es el actual', () => {
                expect($wizard.rup_wizard('isCurrentStep', 1)).toBeTruthy();
                expect($wizard.rup_wizard('isCurrentStep', 2)).toBeFalsy();
            });
        });
        describe('Método isCurrentStepFirst > ' , () => {
            let tests = 0, step = 0;
            beforeEach(() => {
                if(tests !== 0) {
                    step ++;
                }
                else {
                    tests ++;
                }
                $wizard.rup_wizard('step', step);
            });
            it('Debe devolver true si estamos en el primer paso', () => {
                expect($wizard.rup_wizard('isCurrentStepFirst')).toBeTruthy();
            });
            it('Debe devolver false en caso contrario', () => {
                expect($wizard.rup_wizard('isCurrentStepFirst')).toBeFalsy();
            });
        });
        describe('Método isCurrentStepLast > ' , () => {
            let tests = 0, step = 2;
            beforeEach(() => {
                if(tests !== 0) {
                    step ++;
                }
                else {
                    tests ++;
                }
                $wizard.rup_wizard('step', step);
            });
            it('Debe devolver true si estamos en el primer paso', () => {
                expect($wizard.rup_wizard('isCurrentStepLast')).toBeFalsy();
            });
            it('Debe devolver false en caso contrario', () => {
                expect($wizard.rup_wizard('isCurrentStepLast')).toBeTruthy();
            });
        });
        describe('Método isCurrentStepSummary > ' , () => {
            let tests = 0, step = 2;
            beforeEach(() => {
                if(tests !== 0) {
                    step ++;
                }
                else {
                    tests ++;
                }
                $wizard.rup_wizard('step', step);
            });
            it('Debe devolver true si estamos en el primer paso', () => {
                expect($wizard.rup_wizard('isCurrentStepSummary')).toBeFalsy();
            });
            it('Debe devolver false en caso contrario', () => {
                expect($wizard.rup_wizard('isCurrentStepSummary')).toBeTruthy();
            });
        });
        describe('Método enableStep > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 0);
                $wizard.rup_wizard('disableStep', 1);
                $wizard.rup_wizard('enableStep', 1);
            });
            it('El step debe estar habilitado', () => {
                expect($wizard.rup_wizard('step', 1)).toBeUndefined();
            });
        });
        describe('Método disableStep > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('step', 0);
                $wizard.rup_wizard('disableStep', 1);
            });
            afterAll(() => {
                $wizard.rup_wizard('enableStep', 1);
            });
            it('El step debe estar deshabilitado', () => {
                expect($wizard.rup_wizard('step', 1)).toBeFalsy();
            });
        });
        describe('Método isStepDisabled > ' , () => {
            beforeAll(() => {
                $wizard.rup_wizard('disableStep', 1);
            });
            afterAll(() => {
                $wizard.rup_wizard('enableStep', 1);
            });
            it('Debe establecer si el paso esta deshabilitado', () => {
                expect($wizard.rup_wizard('isStepDisabled', 1)).toBeTruthy();
                expect($wizard.rup_wizard('isStepDisabled', 2)).toBeFalsy();
            });
        });
    });
});