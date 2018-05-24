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
        describe('Métodos setRupValue y getRupValue > ', () => {
            beforeEach(() => {
                $spinner.rup_spinner('setRupValue', 487);
            });
            it('Debe cambiar convenientemente el valor', () => {
                expect($spinner.rup_spinner('getRupValue')).toBe(487);
            });
        });
    });
});
