import 'jquery'
import 'jasmine-jquery'
import 'rup.spinner'

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
              expect($spinner.rup_date('getRupValue')).toBeDefined();
          });
      });
      describe('Método setRupValue', () => {
          beforeAll(() => {
              $spinner.rup_date('setRupValue', 50);
          });
          it('Debe actualizar el valor:', () => {
              expect($spinner.rup_date('getRupValue')).toBe(50);
          });
      });
      describe('Método destroy', () => {
          beforeAll(() => {
              $spinner.rup_date('destroy');
          });
          it('No debe existir', () => {
              expect($spinner.rup_date('destroy')).toThrowError();
          });
      });
    });
});
