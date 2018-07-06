/* jslint esnext: true, multistr: true */

import '../../dist/css/rup-base.css';
import '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'rup.time';

function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

function loadCss() {
    let css = '';
    $('head').append('<style></style>');
    var thenable = $.when($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then(() => {
            $('head > style').append(css);
        });
    return thenable;
}

$.when(loadCss())
    .done(testTime());

var $time;

function createTime() {
    var html = '<input id="exampleTime"></input>';
    $('#content').append(html);
    var props = {
        placeholderMask: true,
        showSecond: true,
        timeFormat: 'hh:mm:ss',
        showButtonPanel: true,
        ampm: false,
        onSelect: () => {
            $('.rup-time-input-group').addClass('randomClass');
        }
    };
    $('#exampleTime').rup_time(props);
    $time = $('#exampleTime');
}

function testTime() {
    describe('TEST Time >', () => {
        beforeEach((done) => {
            $.when(createTime())
                .then(done());
        });

        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });

        describe('Métodos públicos >', () => {
            describe('Método isDisabled', () => {
                beforeEach(() => {
                    $time.rup_time('disable');
                });
                afterEach(() => {
                    $time.rup_time('enable');
                });
                it('Debe evaluar que está deshabilitado', () => {
                    expect($time.rup_time('isDisabled')).toBeTruthy();
                });
            });

            describe('Métodos hide y show', () => {
                describe('Método hide', () => {
                    beforeEach(() => {
                        $time.rup_time('hide');
                    });
                    it('Debe estar oculto', () => {
                        expect($('#ui-datepicker-div').is(':visible')).toBeFalsy();
                    });
                });
                describe('Método show', () => {
                    beforeEach(() => {
                        $time.rup_time('show');
                    });
                    it('Debe ser visible', () => {
                        expect($('#ui-datepicker-div').is(':visible')).toBeTruthy();
                    });
                });
            });

            describe('Métodos setTime, getTime y callback', () => {
                beforeEach(() => {
                    let time = new Date();
                    time.setHours('11');
                    time.setMinutes('00');
                    time.setSeconds('00');
                    $time.rup_time('setTime', time);
                });
                describe('Método setTime', () => {
                    it('Debe cambiar el valor de input a lo establecido', () => {
                        expect($time.val()).toBe('11:00:00');
                    });
                });
                describe('Método getTime', () => {
                    it('Debe obtener el mismo valor que se ha mostrado', () => {
                        expect($time.rup_time('getTime')).toBe($time.val());
                    });
                });
                describe('Callback onSelect > ', () => {
                    it('Debe tener la clase especificada en el callback:', () => {
                        expect($('.rup-time-input-group').hasClass('randomClass')).toBe(true);
                    });
                });
            });

            describe('Método option', () => {
                beforeEach(() => {
                    $time.rup_time('option', 'showSecond', false);
                });
                it('Debe establecer la propiedad', () => {
                    expect($time.rup_time('option', 'showSecond')).toBe(false);
                });
            });

            describe('Método getRupValue:', () => {
                it('Devuelve un valor:', () => {
                    expect($time.rup_time('getRupValue')).toBeDefined();
                });
            });
            describe('Método setRupValue', () => {
                beforeEach(() => {
                    $time.rup_time('setRupValue', '07:38:09');
                });
                it('Debe actualizar el valor:', () => {
                    expect($time.rup_time('getRupValue')).toBe('07:38:09');
                });
            });
            describe('Método disable', () => {
                beforeEach(() => {
                    $time.rup_time('disable');
                });
                it('Debe poder deshabilitarse', () => {
                    expect($time.attr('disabled')).toBe('disabled');
                });
            });
            describe('Método enable', () => {
                beforeEach(() => {
                    $time.rup_time('disable');
                    $time.rup_time('enable');
                });
                it('Debe poder habilitarse', () => {
                    expect($time.attr('disabled')).toBeUndefined();
                });
            });
            describe('Método refresh > ', () => {
                beforeEach(() => {
                    $time.rup_time('option', 'showSecond', false);
                    $time.rup_time('refresh');
                });
                it('Debe actualizar la option:', () => {
                    expect($time.rup_time('option', 'showSecond')).toBe(false);
                });
            });
            describe('Método destroy', () => {
                beforeEach(() => {
                    $time.rup_time('destroy');
                });
                it('No debe existir', () => {
                    expect(() => {
                        $time.rup_date('destroy');
                    }).toThrowError();
                });
            });
        });
    });
}