import 'jquery'
import 'jasmine-jquery'
import 'rup.date'

describe('TEST Date >',   () => {
    var $date;
    beforeAll(() => {
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
    describe('Test métodos públicos de date >', () => {
        describe('Método isDisabled >', () => {
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
        describe('Métodos hide y show >', () => {
            describe('Método hide >', () => {
                beforeAll(() => {
                    $date.rup_date('hide');
                });
                it('Debe estar oculto', () => {
                    console.log($('.ui-datepicker'));
                    expect($('.ui-datepicker').is(':visible')).toBeTruthy();
                });
            });
            describe('Método show >', () => {
                beforeAll(() => {
                    $date.rup_date('show');
                });
                it('Debe ser visible', () => {
                    expect($('.ui-datepicker').css('display')).toBe('block');
                });
            });
        });
        describe('Métodos setDate y getDate >', () => {
            beforeAll(() =>{
                $date.rup_date('setDate', new Date('01-01-2018'));
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
        describe('Método option >', () => {
            describe('Establecer una propiedad y que se obtenga el valor cambiado >', () => {
                beforeAll(() => {
                    $date.rup_date('option','autoSize', false);
                });
                it('Al obtener el valor de la propiedad este debe ser el establecido anteriormente', () => {
                    expect($date.rup_date('option', 'autoSize')).toBeFalsy();
                });
            });
            describe('Establecer varias propiedades >', () => {
                beforeAll(() => {
                    $date.rup_date('option', {autoSize:true, showWeek:true});
                });
                it('Los valores deben estar actualizados', () => {
                    expect($date.rup_date('option','autoSize')).toBeTruthy();
                    expect($date.rup_date('option','showWeek')).toBeTruthy();
                })
            });
        });
        describe('Método getRupValue y setRupValue >', () => {
      	    beforeAll(() => {
      		      $date.rup_date('setRupValue', '08/08/2018');
      	    });
      	    it('Debe actualizar el valor:', () => {
      		      expect($date.rup_date('getRupValue')).toBe('08/08/2018');
      	    });
      	});
        describe('Método disable >', () => {
      	    beforeAll(() => {
          		if($date.is(':disabled')){
          		    $date.enable();
          		}
              $date.rup_date('disable');
      	    });
      	    it('Debe poder deshabilitarse', () => {
          		expect($date).toBeDisabled();
      	    });
      	});
        describe('Método enable >', () => {
      	    beforeAll(() => {
          		if($date.is(':enabled') && 'disable' in methods){
          		    $date.disable();
          		}
              $date.rup_date('enable');
      	    });
      	    it('Debe poder habilitarse', () => {
          		expect($date).not.toBeDisabled();
      	    });
      	});
        describe('Método destroy >', () => {
      	    beforeAll(() => {
      		      $date.rup_date('destroy');
      	    });
      	    it('No debe existir', () => {
      		      expect(() =>{$date.rup_date('destroy') }).toThrowError();
      	    });
      	});

    });
});
