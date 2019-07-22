/* jslint multistr: true */
/* eslint-env jasmine, jquery */



describe('Test Spinner > ', () => {
    var $spinner;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var html = '<input id="exampleSpinner"></input>';
        $('#content').append(html);
        $('#exampleSpinner').rup_spinner();
        $spinner = $('#exampleSpinner');
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
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