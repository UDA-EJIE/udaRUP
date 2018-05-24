import 'jquery'
import 'jasmine-jquery'
import 'rup.spinner'

describe('Test Spinner > ', () => {
    var $spinner;
    beforeEach(() => {
        var html = '<input id="exampleSpinner"></input>';
        $('body').append(html);
        $('#exampleSpinner').rup_spinner();
        $spinner = $('#exampleSpinner');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('Debe crearse > ', () => {
            expect($('span.ui-spinner.ui-corner-all.ui-widget.ui-widget-content').length)
                .toBe(1);
        });
    });
    describe('Métodos publicos > ', () => {
        describe('Métodos setRupValue y getRupValue > ', () => {});
        describe('Método destroy > ', () => {});
    });
});

/*
describe('Test Spinner: ', () => {
    var $spinner;
    describe('Creación: ', () => {
        beforeAll(() => {
            var html = '<input id="exampleSpinner"></input>';
            $('body').append(html);
            $('#exampleSpinner').rup_spinner();
            $spinner = $('#exampleSpinner');
        });

        it('Debe tener la clase rup_spinner', () => {
            expect($spinner.hasClass('rup_spinner ui-spinner-input')).toBeTruthy();
        });
    });
    describe('Métodos públicos:', () => {
      describe('Método getRupValue:', () => {
          it('Devuelve un valor:', () => {
              expect($spinner.rup_spinner('getRupValue')).toBeDefined();
          });
      });
      describe('Método setRupValue', () => {
          beforeAll(() => {
              $spinner.rup_spinner('setRupValue', 50);
          });
          it('Debe actualizar el valor:', () => {
              expect($spinner.rup_spinner('getRupValue')).toBe(50);
          });
      });
      describe('Método destroy', () => {
          beforeAll(() => {
              $spinner.spinner('destroy');
          });
          it('No debe existir', () => {
              expect(() => {$spinner.spinner('destroy');}).toThrowError();
          });
      });
    });
});*/
