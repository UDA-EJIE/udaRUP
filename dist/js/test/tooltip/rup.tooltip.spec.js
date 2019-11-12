/* jslint multistr: true */
/* eslint-env jasmine, jquery */




describe('TEST Tooltip', () => {
    var $tooltip;
    var $qtip;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var html = '<div class="input-group">\
                        <input id="inputExample" name="inputExample" type="text" class="form-control">\
                            <span class="input-group-btn">\
                                <button id="exampleTooltip" class="btn btn-secondary" type="button">\
                                    <i class="mdi mdi-comment-question" aria-hidden="true"></i>\
                                </button>\
                            </span>\
                    </div>';

        $('#content').append(html);
        let props = {
            content: {
                text: 'Texto Prueba'
            },
            position: {
                my: 'top center',
                at: 'bottom center',
                target: $('#inputExample')
            },
            show: {
                event: 'click'
            }
        };
        $('#exampleTooltip').rup_tooltip(props);
        $tooltip = $('#exampleTooltip');
    });
    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creación', () => {
        beforeEach(() => {
            $tooltip.rup_tooltip('open');
        });
        it('Debe existir el elemento con clase .qtip', () => {
            //Se crea un .qtip (Que contiene el mensaje)
            expect($('.qtip').length).toBeGreaterThan(0);
        });
    });
    describe('Métodos públicos', () => {
        describe('Método open', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe ser visible', () => {
                expect($qtip.is(':visible')).toBeTruthy();
            });
        });
        describe('Método close', () => {
            let $qtip;
            beforeEach((done) => {
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
                $.when($tooltip.rup_tooltip('open'))
                    .then($tooltip.rup_tooltip('close'))
                    .then(done());
            });
            it('No debe ser visible', () => {
                expect($qtip.is(':visible')).toBeFalsy();
            });
        });
        describe('Método option', () => {
            it('Debe recibir los valores correctamente', () => {
                expect($tooltip.rup_tooltip('option', 'content').text).toBe('Texto Prueba');
            });
            it('Debe actualizar las propiedades', () => {
                $tooltip.rup_tooltip('option', 'show', {
                    modal: true
                });
                expect($tooltip.rup_tooltip('option', 'show').modal).toBeTruthy();
            });
        });
        describe('Método disable', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('disable');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe poder deshabilitarse', () => {
                expect($qtip.hasClass('qtip-disabled')).toBeTruthy();
            });
        });
        describe('Método enable', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('disable');
                $tooltip.rup_tooltip('enable');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('Debe poder habilitarse', () => {
                expect($qtip.hasClass('qtip-disabled')).toBe(false);
            });
        });
        describe('Método destroy', () => {
            beforeEach(() => {
                $tooltip.rup_tooltip('open');
                $tooltip.rup_tooltip('close');
                $tooltip.rup_tooltip('destroy');
                $qtip = $('#qtip-' + $tooltip.data('hasqtip') + '.qtip');
            });
            it('No debe existir', () => {
                expect($qtip.attr('aria-disabled')).toBe('true');
            });
        });
    });
});