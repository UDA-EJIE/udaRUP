import 'jquery'
import 'jasmine-jquery'
import 'rup.date'

describe('TEST Date:',   () => {
    var $date;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<input id="exampleDate"></input>';
            $('body').append(html);
            var props = {
                placeholderMask : true,
                showButtonPanel : true,
                showOtherMonths : true,
                noWeekend       : false
            };
            $('#exampleDate').rup_date(props);
            $date = $('#exampleDate');
        });

    });
    describe('Test métodos públicos de ' + type, () => {
        describe('Método isDisabled', () => {
            beforeAll(() => {
                $date.rup_date('disable');
            });
            afterAll(() => {
                $date.rup_date('enable');
            });
            it('Debe evaluar que está deshabilitado', () => {
                expect($date.rup_date('isDisabled')).toBeTruthy();
            });
        });
        describe('Métodos hide y show', () => {
            describe('Método hide', () => {});//Esconde el input dejando el boton
            describe('Método show', () => {});//Muestra el input escondido
        });
        
    });
});