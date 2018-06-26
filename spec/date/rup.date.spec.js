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
    var $date, $altDate, $multiDate;
    beforeEach(() => {
        var html = '<input id="exampleDate"></input>\
                    <input id="altDate"></input>\
                    <input id="multiDate"></input>\
                    <input id="desde"></input>\
                    <input id="hasta"></input>';
        $('#content').append(html);
        let props = {
            autoSize: true,
            placeholderMask: true,
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: false
        };
        let altProps = {
            datetimepicker: true,
            changeMonth: false,
            changeYear: false,
            showWeek: true,
            defaultDate: '01/01/2000'
        };
        let multiProps = {
            multiSelect:3
        };
        let fromToProps = {
            from: 'desde',
            to: 'hasta'
        };
        $('#exampleDate').rup_date(props);
        $('#altDate').rup_date(altProps);
        $('#multiDate').rup_date(multiProps);
        $.rup_date(fromToProps);
        $date = $('#exampleDate');
        $altDate = $('#altDate');
        $multiDate = $('#multiDate');
    });
    afterEach(() => {
        if($date.hasClass('hasDatepicker')) {
            $date.rup_date('destroy');
        }
        if($altDate.hasClass('hasDatepicker')) {
            $altDate.rup_date('destroy');
        }
        if($multiDate.hasClass('hasDatepicker')) {
            $multiDate.rup_date('destroy');
        }
        if($('#desde').hasClass('hasDatepicker')) {
            $multiDate.rup_date('destroy');
        }
        if($('#hasta').hasClass('hasDatepicker')) {
            $multiDate.rup_date('destroy');
        }
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
                expect($('button.ui-datepicker-trigger', $date.parent()).length).toBe(1);
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
        describe('Date múltiple > ', () => {
            beforeEach(() => {
                $multiDate.rup_date('show');
            })
            it('Debe tener la clase del datepicker', () => {
                expect($multiDate.hasClass('hasDatepicker')).toBe(true);
            });
            it('Debe crearse un botón:', () => {
                expect($('button.ui-datepicker-trigger', $multiDate.parent()).length).toBe(1);
            });
            it('Debe tener los select para cambiar mes y año:', () => {
                expect($('select', $('.ui-datepicker-title')).length).toBe(2);
            });
        });
        describe('Date desde-hasta', () => {
            it('Deben tener la clase del datepicker', () => {
                expect($('#desde').hasClass('hasDatepicker')).toBeTruthy();
                expect($('#hasta').hasClass('hasDatepicker')).toBeTruthy();
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('setRupValue', ['08/08/2018', '09/08/2018']);
                });
                it('Debe actualizar el valor:', () => {
                    expect($multiDate.rup_date('getRupValue')).toBe('08/08/2018,09/08/2018');
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('show');
                });
                it('Debe mostrarse el datepicker:', () => {
                    expect($('#ui-datepicker-div').is(':visible')).toBe(true);
                });
                it('Debe tener los select para cambiar mes y año:', () => {
                    expect($('select', $('.ui-datepicker-title')).length).toBe(2);
                });
            });
        });
        describe('Método hide > ', () => {
            describe('Date normal > ', () => {
                beforeEach(() => {
                    $date.rup_date('show');
                    $date.rup_date('hide');
                });
                it('No debe mostrarse el datepicker:', () => {
                    //Tal vez la versión de ejie eus sea distinta y en esta 
                    //solo cambie el opacity pero siga visible
                    testTrace('body - html', $('body').html());
                    let test1 = $('#ui-datepicker-div').css('opacity') != 0;
                    let test2 = $('#ui-datepicker-div').is(':visible');
                    expect(test1 && test2).toBe(false);
                });
            });
            describe('Date alternativa > ', () => {
                beforeEach(() => {
                    $altDate.rup_date('show');
                    $altDate.rup_date('hide');
                });
                it('No debe mostrarse el datepicker:', () => {
                    let test1 = $('#ui-datepicker-div').css('opacity') != 0;
                    let test2 = $('#ui-datepicker-div').is(':visible');
                    expect(test1 && test2).toBe(false);
                });
            });
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('show');
                    $multiDate.rup_date('hide');
                });
                it('No debe mostrarse el datepicker:', () => {
                    let test1 = $('#ui-datepicker-div').css('opacity') != 0;
                    let test2 = $('#ui-datepicker-div').is(':visible');
                    expect(test1 && test2).toBe(false);
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('setDate', ['06/02/1995','07/02/1995']);
                });
                it('Debe modificar la UI:', () => {
                    expect($multiDate.val()).toBe('06/02/1995,07/02/1995');
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('option', 'currentText', 'Tururu');
                    $multiDate.rup_date('option', {minDate:'01/01/1900', maxDate:'01/01/2200'});
                });
                it('Debe cambiar el valor:', () => {
                    expect($multiDate.rup_date('option', 'currentText')).toBe('Tururu');
                    expect($multiDate.rup_date('option', 'minDate')).toBe('01/01/1900');
                    expect($multiDate.rup_date('option', 'maxDate')).toBe('01/01/2200');
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('disable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($multiDate.attr('disabled')).toBe('disabled');
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($multiDate.rup_date('isDisabled')).toBe(true);
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('disable');
                    $multiDate.rup_date('enable');
                });
                it('Debe marcarse como deshabilitada', () => {
                    expect($multiDate.attr('disabled')).toBe(undefined);
                });
                it('Debe reflejarse en isDisabled:', () => {
                    expect($multiDate.rup_date('isDisabled')).toBe(false);
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
            describe('Date múltiple > ', () => {
                beforeEach(() => {
                    $multiDate.rup_date('destroy');
                });
                it('Debe retirarse elementos:', () => {
                    expect($('button',$multiDate.parent()).length).toBe(0);
                });
            });
        });
    });
});
