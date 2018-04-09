import 'jquery'
import 'jasmine-jquery'
import 'rup.date'
import {componentTestRunner} from '../helpers/rup.componentTestRunner.spec';

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
            describe('Método hide', () => {
                beforeAll(() => {
                    $date.rup_date('hide');
                });
                it('Debe estar oculto', () => {
                    expect($('.ui-datepicker').css('display')).toBe('none');
                });
            });
            describe('Método show', () => {
                beforeAll(() => {
                    $date.rup_date('show');
                });
                it('Debe ser visible', () => {
                    expect($('.ui-datepicker').css('display')).toBe('block');
                });
            });
        });
        describe('Métodos setDate y getDate', () => {
            beforeAll(() =>{
                $date.rup_date('setDate', new Date('01-01-2018'));
            });
            describe('Método setDate', () => {
                it('Debe cambiar el valor de input a lo establecido', () => {
                    expect($date.val()).toBe('01/01/2018');
                });
            });
            describe('Método getDate', () => {
                it('Debe obtener el mismo valor que se ha mostrado', () => {
                    expect($date.rup_date('getDate')).toBe($date.val());
                });
            });
        });
        describe('Método option', () => {
            describe('Establecer una propiedad y que se obtenga el valor cambiado', () => {
                afterAll(() => {
                    $date.rup_date('option','disabled', false);
                });
                it('No debe haber errores al establecer el valor de la propiedad', () => {
                    expect($date.rup_date('option','disabled', true)).not.toThrowError();
                });
                it('Al obtener el valor de la propiedad este debe ser el establecido anteriormente', () => {
                    expect($date.rup_date('option', 'disabled')).toBeTruthy();
                });
            });
            describe('Establecer varias propiedades', () => {
                afterAll();
                it('No debe lanzar errores en la asignacion', () => {
                    expect($date.rup_date('option', {autoSize:true, showWeek:true}));
                });
                it('Los valores deben estar actualizados', () => {
                    expect($date.rup_date('option','autoSize')).toBeTruthy();
                    expect($date.rup_date('option','showWeek')).toBeTruthy();
                })
            });
        });

        componentTestRunner($date, 'rup_date', ['getRupValue','setRupValue','enable','disable','destroy']);
        
    });
});