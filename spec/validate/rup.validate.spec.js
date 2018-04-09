import 'jquery';
import 'jasmine-jquery';
import 'rup.validate';
import 'rup.generalFunc';

describe('Test Validate: ', () => {
    var $validate;
    describe('Creación: ', () => {
        var html = '<form id="exampleValidate">'
                +  '<input type="text" name="campoUno" id="campoUno">Campo 1</input>'
                +  '<input type="text" name="campoDos" id="campoDos">Campo 2</input>'
                +  '<input id="btnInput" type="submit">Validar</input>'
                +  '</form>'
                +  '<div id="feedback"></div>';
        $('body').append(html);
        var optsFeedback = {
            type: "ok",
            closeLink: true,
            block:false
        };
        var $feedBack = $('#feedback').rup_feedback(optsFeedback);
        var optsValidate = {
            feedback: $feedBack,
            liveCheckingErrors: false,
            showFieldErrorAsDefault: true,
            showErrorsInFeedback: true,
            showFieldErrorsInFeedback:true, 
            rules:{
                "campoUno": {required: true},
                "campoDos": {required: true}
            }
        };
        $validate = $('#exampleValidate').rup_validate(optsValidate);

        it('El formulario tiene que tener la clase rup_validate', () => {
            expect($validate.hasClass('rup_validate')).toBeTruthy();
        });
        it('El feedback debe estar oculto', () => {
            expect($feedBack.css('display')).toBe('none');
        });
        describe('La validación funciona:', () => {
            beforeAll(() => {
                $('#btnInput').click();
            });
            it('Debe mostrarse el feedback', () => {
                expect($feedBack.css('display')).toBe('block');
            });
            it('Cada campo del form debe tener la clase error', () => {
                expect($('#campoUno').hasClass('error')).toBeTruthy();
                expect($('#campoDos').hasClass('error')).toBeTruthy();
            });
        });
    });
    describe('Métodos públicos', () => {
        describe('Método resetForm', () => {
            beforeAll(() => {
                $('#btnInput').click();
                $validate.rup_validate('resetForm');
            });
            it('Debe desaparecer el feedback', () => {
                expect($feedBack.css('display')).toBe('none');
            });
            it('Los campos del form no deben tener la clase error', () => {
                expect($('#campoUno').hasClass('error')).toBeFalsy();
                expect($('#campoDos').hasClass('error')).toBeFalsy();
            });
        });
        describe('Método resetElements', () => {
            beforeAll(() => {
                $('#btnInput').click();
                $validate.rup_validate('resetElements');
            });
            it('Debe mantenerse el feedback', () => {
                expect($feedBack.css('display')).toBe('block');
            });
            it('Los campos del form no deben tener la clase error', () => {
                expect($('#campoUno').hasClass('error')).toBeFalsy();
                expect($('#campoDos').hasClass('error')).toBeFalsy();
            });
        });
        generalFunc($validate, 'rup_validate', ['destroy']);
    });
});