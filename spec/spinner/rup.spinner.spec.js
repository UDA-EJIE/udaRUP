import 'jquery'
import 'jasmine-jquery'
import 'rup.spinner'
import {componentTestRunner} from '../helpers/rup.componentTestRunner.spec';

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
        componentTestRunner($spinner, 'rup_spinner', ['getRupValue','setRupValue', 'destroy']);
    });
});