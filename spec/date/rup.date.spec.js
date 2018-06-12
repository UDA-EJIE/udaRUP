import 'jquery'
import 'jasmine-jquery'
import 'rup.date'

describe('TEST Date >',   () => {
    var $date;
    beforeEach(() => {
        var html = '<input id="exampleDate"></input>';
        $('body').append(html);
        var props = {
            autoSize        : true,
            placeholderMask : true,
            showButtonPanel : true,
            showOtherMonths : true,
            noWeekend       : false
        };
        $('#exampleDate').rup_date(props);
        $date = $('#exampleDate');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('Debe tener la clase del datepicker', () => {
            expect($date.hasClass('hasDatepicker')).toBeTruthy();
        });
        it('Debe crear un botón', () => {
            expect($('button.ui-datepicker-trigger')).toExist();
        });
    });
    describe('Test métodos públicos de date >', () => {
        describe('Método isDisabled >', () => {
            beforeEach(() => {
                $date.rup_date('disable');
            });
            afterEach(() => {
                $date.rup_date('enable');
            });
            it('Debe evaluar que está deshabilitado', () => {
                expect($date.rup_date('isDisabled')).toBeTruthy();
            });
        });
        describe('Métodos hide y show >', () => {
            describe('Método hide >', () => {
                beforeEach(() => {
                    $date.rup_date('hide');
                });
                it('Debe estar oculto', () => {
                    console.log($('.ui-datepicker'));
                    expect($('.ui-datepicker').is(':visible')).toBeTruthy();
                });
            });
            describe('Método show >', () => {
                beforeEach(() => {
                    $date.rup_date('show');
                });
                it('Debe ser visible', () => {
                    expect($('.ui-datepicker').css('display')).toBe('block');
                });
            });
        });
        describe('Métodos setDate y getDate >', () => {
            beforeEach(() =>{
                $date.rup_date('setDate', new Date('01/01/2018'));
            });
            describe('Método setDate >', () => {
                it('Debe cambiar el valor de input a lo establecido', () => {
                    expect($date.val()).toBe('01/01/2018');
                });
            });
            describe('Método getDate >', () => {
                it('Debe obtener el mismo valor que se ha mostrado', () => {
                    expect($date.rup_date('getDate')).toBe($date.val());
                });
            });
        });
        describe('Método getRupValue y setRupValue >', () => {
      	    beforeEach(() => {
      		      $date.rup_date('setRupValue', '08/08/2018');
      	    });
      	    it('Debe actualizar el valor:', () => {
      		      expect($date.rup_date('getRupValue')).toBe('08/08/2018');
      	    });
      	});
        describe('Método disable >', () => {
      	    beforeEach(() => {
              $date.rup_date('disable');
      	    });
      	    it('Debe poder deshabilitarse', () => {
                expect($date.attr('disabled')).toBe('disabled');
      	    });
      	});
        describe('Método enable >', () => {
            beforeEach(() => {
                $date.rup_date('disable');
                $date.rup_date('enable');
            });
            it('Debe poder deshabilitarse', () => {
                expect($date.attr('disabled')).toBeUndefined();
            });
      	});
        describe('Método destroy >', () => {
      	    beforeEach(() => {
      		      $date.rup_date('destroy');
      	    });
      	    it('No debe existir', () => {
      		      expect(() =>{$date.rup_date('destroy') }).toThrowError();
      	    });
      	});

    });
});
