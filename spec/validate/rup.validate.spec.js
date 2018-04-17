import 'jquery';
import 'jasmine-jquery';
import 'rup.validate';

describe('Test Validate: ', () => {
    var $validate, $feedBack;
    beforeAll(() => {
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
        $feedBack = $('#feedback').rup_feedback(optsFeedback);
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
    });
    describe('Creación: ', () => {
        it('El formulario tiene que tener la clase rup_validate', () => {
            expect($validate.hasClass('rup_validate')).toBeTruthy();
        });
        it('El feedback debe estar oculto', () => {
            expect($feedBack.is(':visible')).toBeFalsy();
        });

        
    });
    describe('La validación funciona:', () => {
        beforeAll(() => {
            $('#btnInput').click();
        });
        it('Debe mostrarse el feedback', () => {
            expect($feedBack.is(':visible')).toBeTruthy();
        });
        it('Cada campo del form debe tener la clase error', () => {
            expect($('#campoUno').hasClass('error')).toBeTruthy();
            expect($('#campoDos').hasClass('error')).toBeTruthy();
        });
    });
    describe('Métodos públicos', () => {
        describe('Método resetForm', () => {
            beforeAll(() => {
                $('#btnInput').click();
                $validate.rup_validate('resetForm');
            });
            it('Debe mantenerse el feedback', () => {
                expect($feedBack.is(':visible')).toBeTruthy();
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
                expect($feedBack.is(':visible')).toBeTruthy();
            });
            it('Los campos del form no deben tener la clase error', () => {
                expect($('#campoUno').hasClass('error')).toBeFalsy();
                expect($('#campoDos').hasClass('error')).toBeFalsy();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $validate.rup_validate('destroy');
                $('#btnInput').click();
            });
            it('No debe existir', () => {
                expect($('#campoUno').hasClass('error')).toBeFalsy();
                expect($('#campoDos').hasClass('error')).toBeFalsy();
            });
        });
    });
});
