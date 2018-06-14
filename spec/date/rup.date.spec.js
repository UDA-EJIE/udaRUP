/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.date';

function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

describe('Test Date > ', () => {
    var $date, $altDate;
    beforeEach(() => {
        var html = '<input id="exampleDate"></input>\
                    <input id="altDate"></input>';
        $('#content').append(html);
        var props = {
            autoSize: true,
            placeholderMask: true,
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: false
        };
        var altProps = {
            datetimepicker: true,
            changeMonth: false,
            changeYear: false,
            showWeek: true,
            defaultDate: '01/01/2000'
        };
        $('#exampleDate').rup_date(props);
        $('#altDate').rup_date(altProps);
        $date = $('#exampleDate');
        $altDate = $('#altDate');
    });
    afterEach(() => {
        $date.rup_date('destroy');
        $altDate.rup_date('destroy');
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creación > ', () => {
        describe('Date normal > ', () => {
            beforeEach(() => {
                $date.rup_date('show');
            });
            it('Debe tener la clase del datepicker', () => {
                expect($date.hasClass('hasDatepicker')).toBeTruthy();
            });
            it('Debe crear un botón', () => {
                expect($('button.ui-datepicker-trigger')).toExist();
            });
            it('Debe tener los select para cambiar mes y año:', () => {
                expect($('select', $('.ui-datepicker-title')).length).toBe(2);
            });
        });
        describe('Date alternativo > ', () => {
            beforeEach(() => {
                $altDate.rup_date('show');
            });
            it('Debe tener la clase del datepicker', () => {
                expect($altDate.hasClass('hasDatepicker')).toBeTruthy();
            });
            it('Debe crear un timepicker:', () => {
                expect($('#ui-timepicker-div-altDate').length).toBe(1);
            });
            it('No debe tener los select para cambiar mes y año:', () => {
                expect($('select', $('.ui-datepicker-title')).length).toBe(0);
            });
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Métodos setRupValue y getRupValue > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('setRupValue', '08/08/2018');
                });
                it('Debe actualizar el valor:', () => {
                    expect($date.rup_date('getRupValue')).toBe('08/08/2018');
                });
            });
            describe('Date alternativo > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('setRupValue', '08/08/2018 00:00:00');
                });
                it('Debe actualizar el valor:', () => {
                    expect($altDate.rup_date('getRupValue')).toBe('08/08/2018 00:00:00');
                });
            });
        });
        describe('Método show > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('show');
                });
                it('Debe mostrarse el datepicker:', () => {
                    expect($('#ui-datepicker-div').is(':visible')).toBe(true);
                });
                it('Debe tener los select para cambiar mes y año:', () => {
                    expect($('select', $('.ui-datepicker-title')).length).toBe(2);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('show');
                });
                it('Debe mostrarse el datepicker:', () => {
                    expect($('#ui-datepicker-div').is(':visible')).toBe(true);
                });
                it('No debe tener los select para cambiar mes y año:', () => {
                    expect($('select', $('.ui-datepicker-title')).length).toBe(0);
                });
            });
        });
        describe('Método hide > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('show');
                    $date.rup_date('hide');
                });
                it('Debe mostrarse el datepicker:', () => {
                    testTrace('body - html', $('body').html());
                    expect($('#ui-datepicker-div').is(':visible')).toBe(false);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('show');
                    $altDate.rup_date('hide');
                });
                it('Debe mostrarse el datepicker:', () => {
                    expect($('#ui-datepicker-div').is(':visible')).toBe(false);
                });
            });
        });
        describe('Métodos setDate y getDate > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('setDate', '06/02/1995');
                    console.info($.rup.lang);
                    console.info($date.rup_date('getDate'));
                });
                it('Debe cambiar en la UI:', () => {
                    expect($date.val()).toBe('06/02/1995');
                });
                it('Debe reflejarse en el método getDate:', () => {
                    expect($date.rup_date('getDate')).toBe('06/02/1995');
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('setDate', '06/02/1995');
                });
                it('Debe cambiar en la UI:', () => {
                    expect($altDate.val()).toBe('06/02/1995 00:00');
                });
                it('Debe reflejarse en el método getDate:', () => {
                    expect($altDate.rup_date('getDate')).toBe('06/02/1995 00:00');
                });
            });
        });
        describe('Método refresh > ', () => {
            // TODO: Esperando respuesta de sergio
        });
        describe('Método option > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('option', 'currentText', 'Tururu');
                    $date.rup_date('option', {minDate:'01/01/1900', maxDate:'01/01/2200'});
                });
                it('Debe cambiar el valor:', () => {
                    expect($date.rup_date('option', 'currentText')).toBe('Tururu');
                    expect($date.rup_date('option', 'minDate')).toBe('01/01/1900');
                    expect($date.rup_date('option', 'maxDate')).toBe('01/01/2200');
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('option', 'currentText', 'Tururu');
                    $altDate.rup_date('option', {minDate:'01/01/1900', maxDate:'01/01/2200'});
                });
                it('Debe cambiar el valor:', () => {
                    expect($altDate.rup_date('option', 'currentText')).toBe('Tururu');
                    expect($altDate.rup_date('option', 'minDate')).toBe('01/01/1900');
                    expect($altDate.rup_date('option', 'maxDate')).toBe('01/01/2200');
                });
            });
        });
        describe('Método disable e isDisabled > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('disable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($date.attr('disabled')).toBe('disabled');
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($date.rup_date('isDisabled')).toBe(true);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('disable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($altDate.attr('disabled')).toBe('disabled');
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($altDate.rup_date('isDisabled')).toBe(true);
                });
            });
        });
        describe('Método enable e isDisabled > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('disable');
                    $date.rup_date('enable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($date.attr('disabled')).toBe(undefined);
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($date.rup_date('isDisabled')).toBe(false);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('disable');
                    $altDate.rup_date('enable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($altDate.attr('disabled')).toBe(undefined);
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($altDate.rup_date('isDisabled')).toBe(false);
                });
            });
        });
        describe('Método destroy > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('destroy');
                });
                it('Debe retirarse elementos:', () => {
                    expect($('button',$date.parent()).length).toBe(0);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('destroy');
                });
                it('Debe retirarse elementos:', () => {
                    expect($('button',$altDate.parent()).length).toBe(0);
                });
            });
        });
    });
});
