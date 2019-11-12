/* jslint multistr: true */
/* eslint-env jasmine, jquery */



describe('Test progressbar > ', () => {
    var $progressbar;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var html = '<div id="exampleProgressbar"></div>';
        $('#content').append(html);
        $progressbar = $('#exampleProgressbar');
        $progressbar.rup_progressbar({
            value: 0
        });
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creación > ', () => {
        it('Debe crearse el componente:', () => {
            expect($('.rup-progressbar.ui-progressbar.ui-corner-all.ui-widget.ui-widget-content').length)
                .toBe(1);
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Metodos setRupValue y getRupValue > ', () => {
            beforeEach(() => {
                $progressbar.rup_progressbar('setRupValue', 20);
            });
            it('Debe reflejarse el cambio en getRupValue', () => {
                expect($progressbar.rup_progressbar('getRupValue')).toBe(20);
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                $progressbar.rup_progressbar('destroy');
            });
            it('Deben de desaparecer las clases de rup-progressbar:', () => {
                expect($('.rup-progressbar.ui-progressbar.ui-corner-all.ui-widget.ui-widget-content').length)
                    .toBe(0);
            });
        });
        describe('Método disable > ', () => {
            beforeEach(() => {
                $progressbar.rup_progressbar('disable');
            });
            it('Debe aparecer como deshabilitada:', () => {
                expect($progressbar.hasClass('ui-progressbar-disabled ui-state-disabled rup-progressbar-disabled'))
                    .toBe(true);
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                $progressbar.rup_progressbar('disable');
                $progressbar.rup_progressbar('enable');
            });
            it('Debe aparecer como deshabilitada:', () => {
                expect($progressbar.hasClass('ui-progressbar-disabled ui-state-disabled rup-progressbar-disabled'))
                    .toBe(false);
            });
        });
        describe('Método option > ', () => {
            describe('Debe poder devolver el objeto de configuracion', () => {
                var obj = null;
                beforeEach(() => {
                    obj = {
                        'classes': {
                            'ui-progressbar': 'ui-corner-all',
                            'ui-progressbar-value': 'ui-corner-left',
                            'ui-progressbar-complete': 'ui-corner-right'
                        },
                        'disabled': false,
                        'create': null,
                        'max': 100,
                        'value': 0,
                        'change': null,
                        'complete': null
                    };
                });
                it('Debe obtener el objeto', () => {
                    expect($progressbar.rup_progressbar('option')).toEqual(obj);
                });
            });
            describe('Debe poder obtenerse y actualizar propiedades individuales > ', () => {
                beforeEach(() => {
                    $progressbar.rup_progressbar('option', 'max', 200);
                });
                it('El cambio debe reflejarse al obtener en valor de la propiedad', () => {
                    expect($progressbar.rup_progressbar('option', 'max')).toBe(200);
                });
            });
        });
        describe('Método value > ', () => {
            beforeEach(() => {
                $progressbar.rup_progressbar('setRupValue', 30);
            });
            it('Debe devolver el valor actual del progressbar', () => {
                expect($progressbar.rup_progressbar('value')).toBe(30);
            });
        });
    });
});