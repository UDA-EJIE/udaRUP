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
//Funcion de complementaria para el test del método refresh
var unavailableDay = 0;
function disableDays(date) {
    var day = date.getDay();
    return [(day != unavailableDay), ""];
}

$.when(testDate('es'))
    .then(() => {
        testDate('eu');
    });

function testDate(lang) {
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
                noWeekend: false,
                beforeShowDay: disableDays
            };
            let altProps = {
                datetimepicker: true,
                changeMonth: false,
                changeYear: false,
                showWeek: true,
                beforeShowDay: disableDays
            };
            let multiProps = {
                multiSelect:3,
                beforeShowDay: disableDays
            };
            let fromToProps = {
                from: 'desde',
                to: 'hasta',
                beforeShowDay: disableDays
            };

            $.rup.setLiterals(lang);

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
                $('#desde').rup_date('destroy');
            }
            if($('#hasta').hasClass('hasDatepicker')) {
                $('#hasta').rup_date('destroy');
            }
            $('#content').html('');
            $('#content').nextAll().remove();
        });
        afterAll(() => {
            $.rup.setLiterals('es');
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
                });
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
                        if(lang === 'es') {
                            $altDate.rup_date('setRupValue', '08/08/2018 00:00:00');
                        }
                        if(lang === 'eu') {
                            $('#altDate').rup_date('setRupValue', '2018/08/08 00:00:00');
                        }
                    });
                    it('Debe actualizar el valor:', () => {
                        testTrace('Asdasdasd', $.rup.i18n.base['rup_date'].dateFormat);
                        if(lang === 'es'){
                            expect($altDate.rup_date('getRupValue')).toBe('08/08/2018 00:00:00');
                        }
                        if(lang === 'eu'){
                            expect($('#altDate').rup_date('getRupValue')).toBe('2018/08/08 00:00:00');
                        }
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
                describe('Date desde-hasta > ', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $('#desde').rup_date('setRupValue', '03/08/2018');
                            $('#hasta').rup_date('setRupValue', '28/08/2018');
                        }
                        if(lang === 'eu') {
                            $('#desde').rup_date('setRupValue', '2018/08/03');
                            $('#hasta').rup_date('setRupValue', '2018/08/28');
                        }
                    });
                    describe('Se comprueba que los cambios aparecen en getRupValue > ', () => {
                        it('getRupValue desde:', () => {
                            if(lang === 'es') {
                                expect($('#desde').rup_date('getRupValue')).toBe('03/08/2018');
                            }
                            if(lang === 'eu') {
                                expect($('#desde').rup_date('getRupValue')).toBe('2018/08/03');
                            }
                        });
                        it('getRupValue hasta:', () => {
                            if(lang === 'es') {
                                expect($('#hasta').rup_date('getRupValue')).toBe('28/08/2018');
                            }
                            if(lang === 'eu') {
                                expect($('#hasta').rup_date('getRupValue')).toBe('2018/08/28');
                            }
                        });
                    });
                    describe('Se comprueba la funcionalidad propia del desde-hasta > ', () => {
                        it('En desde los valores mas allá de hasta deben estar deshabilitados:', () => {
                            $('#desde').rup_date('show');
                            let allDays = $('#ui-datepicker-div > table > tbody > tr > td');
                            expect($('span:contains(29)', allDays).parent().hasClass('ui-datepicker-unselectable ui-state-disabled')).toBe(true);
                            expect($('span:contains(30)', allDays).parent().hasClass('ui-datepicker-unselectable ui-state-disabled')).toBe(true);
                            expect($('span:contains(31)', allDays).parent().hasClass('ui-datepicker-unselectable ui-state-disabled')).toBe(true);
                        });
                        it('En hasta los valores antes de desde deben estar deshabilitados:', () => {
                            $('#hasta').rup_date('show');
                            let allDays = $('#ui-datepicker-div > table > tbody > tr > td');
                            testTrace('calendar', $('#ui-datepicker-div').html());
                            expect($('span:contains(1)', allDays).parent().hasClass('ui-datepicker-unselectable ui-state-disabled')).toBe(true);
                            expect($('span:contains(2)', allDays).parent().hasClass('ui-datepicker-unselectable ui-state-disabled')).toBe(true);
                        });
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
                describe('Date desde-hasta > ',() => {
                    describe('Date desde > ', () => {
                        beforeEach(() => {
                            $('#desde').rup_date('show');
                        });
                        it('Debe mostrarse:', () => {
                            expect($('#ui-datepicker-div').is(':visible')).toBe(true);
                        });
                    });
                    describe('Date hasta > ', () => {
                        beforeEach(() => {
                            $('#hasta').rup_date('show');
                        });
                        it('Debe mostrarse:', () => {
                            expect($('#ui-datepicker-div').is(':visible')).toBe(true);
                        });
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
                        // testTrace('body - html', $('body').html());
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
                describe('Date desde-hasta > ',() => {
                    describe('Date desde > ', () => {
                        beforeEach(() => {
                            $('#desde').rup_date('show');
                            $('#desde').rup_date('hide');
                        });
                        it('No debe mostrarse:', () => {
                            let test1 = $('#ui-datepicker-div').css('opacity') != 0;
                            let test2 = $('#ui-datepicker-div').is(':visible');
                            expect(test1 && test2).toBe(false);
                        });
                    });
                    describe('Date hasta > ', () => {
                        beforeEach(() => {
                            $('#hasta').rup_date('show');
                            $('#hasta').rup_date('hide');
                        });
                        it('No debe mostrarse:', () => {
                            let test1 = $('#ui-datepicker-div').css('opacity') != 0;
                            let test2 = $('#ui-datepicker-div').is(':visible');
                            expect(test1 && test2).toBe(false);
                        });
                    });
                });
            });
            describe('Métodos setDate y getDate > ', () => {
                describe('Date normal > ', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $date.rup_date('setDate', '06/02/1995');
                        }
                        if(lang === 'eu') {
                            $date.rup_date('setDate', '1995/02/06');
                        }
                        console.info($.rup.lang);
                        console.info($date.rup_date('getDate'));
                    });
                    it('Debe cambiar en la UI:', () => {
                        if(lang === 'es') {
                            expect($date.val()).toBe('06/02/1995');
                        }
                        if(lang === 'eu') {
                            expect($date.val()).toBe('1995/02/06');
                        }
                    });
                    it('Debe reflejarse en el método getDate:', () => {
                        if(lang === 'es') {
                            expect($date.rup_date('getDate')).toBe('06/02/1995');
                        }
                        if(lang === 'eu') {
                            expect($date.rup_date('getDate')).toBe('1995/02/06');
                        }
                    });
                });
                describe('Date alternativa > ', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $altDate.rup_date('setDate', '06/02/1995');
                        }
                        if(lang === 'eu'){
                            $altDate.rup_date('setDate', '1995/02/06');
                        }
                    });
                    it('Debe cambiar en la UI:', () => {
                        if(lang === 'es') {
                            expect($altDate.val()).toBe('06/02/1995 00:00');
                        }
                        if(lang === 'eu') {
                            expect($altDate.val()).toBe('1995/02/06 00:00');
                        }
                    });
                    it('Debe reflejarse en el método getDate:', () => {
                        if(lang === 'es') {
                            expect($altDate.rup_date('getDate')).toBe('06/02/1995 00:00');
                        }
                        if(lang === 'eu') {
                            expect($altDate.rup_date('getDate')).toBe('1995/02/06 00:00');
                        }
                    });
                });
                describe('Date múltiple > ', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $multiDate.rup_date('setDate', '06/02/1995');
                        }
                        if(lang === 'eu') {
                            $multiDate.rup_date('setDate', '1995/02/06');
                        }
                    });
                    it('Debe modificar la UI:', () => {
                        if(lang === 'es') {
                            expect($multiDate.val()).toBe('06/02/1995');
                        }
                        if(lang === 'eu') {
                            expect($multiDate.val()).toBe('1995/02/06');
                        }
                    });
                });
                describe('Date desde-hasta', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $('#desde').rup_date('setDate', '03/08/2018');
                            $('#hasta').rup_date('setDate', '28/08/2018');
                        }
                        if(lang === 'eu') {
                            $('#desde').rup_date('setDate', '2018/08/03');
                            $('#hasta').rup_date('setDate', '2018/08/28');
                        }
                    });
                    it('Debe actualizar la ui:', () => {
                        if(lang === 'es') {
                            expect($('#desde').val()).toBe('03/08/2018');
                            expect($('#hasta').val()).toBe('28/08/2018');
                        }
                        if(lang === 'eu') {
                            expect($('#desde').val()).toBe('2018/08/03');
                            expect($('#hasta').val()).toBe('2018/08/28');
                        }
                    });
                });
            });
            describe('Método refresh > ', () => {
                // TODO: Esperando respuesta de sergio
                describe('Date normal > ', () => {
                    beforeEach(() => {
                        if(lang === 'es') {
                            $date.rup_date('setDate')
                        }
                        unavailableDay = 3;
                        $date.rup_date("refresh");
                    });
                    it('comprobamos que los miércoles se hayan deshabilitado:', () => {
                        $('#ui-datepicker-div > table > tbody > tr')
                            .each((index,current) => {
                                $('td',$(current)).eq(2).each((idx,cur) => {
                                expect($(cur).hasClass('ui-datepicker-unselectable ui-state-disabled'))
                                    .toBe(true);
                                })
                        });
                    });
                });
                
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
                describe('Date desde-hasta > ', () => {
                    describe('Date desde > ', () => {
                        beforeEach(() => {
                            $('#desde').rup_date('option', 'currentText', 'Tururu');
                            $('#desde').rup_date('option', {minDate:'01/01/1900', maxDate:'01/01/2200'});
                        });
                        it('Debe cambiar el valor:', () => {
                            expect($('#desde').rup_date('option', 'currentText')).toBe('Tururu');
                            expect($('#desde').rup_date('option', 'minDate')).toBe('01/01/1900');
                            expect($('#desde').rup_date('option', 'maxDate')).toBe('01/01/2200');
                        });
                    });
                    describe('Date hasta > ', () => {
                        beforeEach(() => {
                            $('#hasta').rup_date('option', 'currentText', 'Tururu');
                            $('#hasta').rup_date('option', {minDate:'01/01/1900', maxDate:'01/01/2200'});
                        });
                        it('Debe cambiar el valor:', () => {
                            expect($('#hasta').rup_date('option', 'currentText')).toBe('Tururu');
                            expect($('#hasta').rup_date('option', 'minDate')).toBe('01/01/1900');
                            expect($('#hasta').rup_date('option', 'maxDate')).toBe('01/01/2200');
                        });
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
                describe('Date desde-hasta > ', () => {
                    beforeEach(() => {
                        $('#desde').rup_date('disable');
                        $('#hasta').rup_date('disable');
                    });
                    it('Debe marcarse como deshabilitada', () => {
                        expect($('#desde').attr('disabled')).toBe('disabled');
                        expect($('#hasta').attr('disabled')).toBe('disabled');
                    });
                    it('Debe reflejarse en isDisabled:', () => {
                        expect($('#desde').rup_date('isDisabled')).toBe(true);
                        expect($('#hasta').rup_date('isDisabled')).toBe(true);
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
                describe('Date desde-hasta > ', () => {
                    beforeEach(() => {
                        $('#desde').rup_date('disable');
                        $('#hasta').rup_date('disable');
                        $('#desde').rup_date('enable');
                        $('#hasta').rup_date('enable');
                    });
                    it('Debe marcarse como deshabilitada', () => {
                        expect($('#desde').attr('disabled')).toBe(undefined);
                        expect($('#hasta').attr('disabled')).toBe(undefined);
                    });
                    it('Debe reflejarse en isDisabled:', () => {
                        expect($('#desde').rup_date('isDisabled')).toBe(false);
                        expect($('#hasta').rup_date('isDisabled')).toBe(false);
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
                describe('Date desde-hasta > ', () => {
                    beforeEach(() => {
                        $('#desde').rup_date('destroy');
                        $('#hasta').rup_date('destroy');
                    });
                    it('Debe retirarse elementos:', () => {
                        expect($('button',$('#desde').parent()).length).toBe(0);
                        expect($('button',$('#hasta').parent()).length).toBe(0);
                    });
                });
            });
        });
    });
};