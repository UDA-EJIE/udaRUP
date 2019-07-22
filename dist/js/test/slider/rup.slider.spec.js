/* jslint multistr: true */
/* eslint-env jasmine, jquery */


describe('Test Slider > ', () => {
    var $slider;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        let html = '<div id="exampleSlider"></div>';
        let options = {
            min: 0,
            max: 500
        };

        $('#content').append(html);
        $('#exampleSlider').rup_slider(options);

        $slider = $('#exampleSlider');
    });

    afterEach(() => {
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creación > ', () => {
        it('Debe crear el slider', () => {
            expect($slider.hasClass('rup-slider') &&
                    $slider.hasClass('ui-slider') &&
                    $slider.hasClass('ui-corner-all') &&
                    $slider.hasClass('ui-slider-horizontal') &&
                    $slider.hasClass('ui-widget') &&
                    $slider.hasClass('ui-widget-content'))
                .toBe(true);
        });
        it('Debe crearse el icono arrastrable del slider', () => {
            expect($('span.ui-slider-handle.ui-corner-all.ui-state-default').length).toBe(1);
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Métodos setRupValue y getRupValue > ', () => {
            beforeEach(() => {
                $slider.rup_slider('setRupValue', 241);
            });
            it('Debe actualizar el valor', () => {
                expect($slider.rup_slider('getRupValue')).toBe(241);
            });
        });
        describe('Método disable > ', () => {
            beforeEach(() => {
                $slider.rup_slider('disable');
            });
            it('Debe marcarse como deshabilitado', () => {
                expect($slider.hasClass('ui-slider-disabled') &&
                        $slider.hasClass('ui-state-disabled') &&
                        $slider.hasClass('rup-slider-disabled'))
                    .toBe(true);
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                $slider.rup_slider('disable');
                $slider.rup_slider('enable');
            });
            it('Debe marcarse como deshabilitado', () => {
                expect($slider.hasClass('ui-slider-disabled') &&
                        $slider.hasClass('ui-state-disabled') &&
                        $slider.hasClass('rup-slider-disabled'))
                    .toBe(false);
            });
        });
        describe('Método option > ', () => {
            var objConf = null;

            beforeEach(() => {
                $slider.rup_slider('option', 'max', 400);
                //Tras cambiar el max el objeto debe quedar así:
                objConf = {
                    'classes': {
                        'ui-slider': 'ui-corner-all',
                        'ui-slider-handle': 'ui-corner-all',
                        'ui-slider-range': 'ui-corner-all ui-widget-header'
                    },
                    'disabled': false,
                    'create': null,
                    'cancel': 'input, textarea, button, select, option',
                    'distance': 0,
                    'delay': 0,
                    'animate': false,
                    'max': 400,
                    'min': 0,
                    'orientation': 'horizontal',
                    'range': false,
                    'step': 1,
                    'value': 0,
                    'values': null,
                    'change': null,
                    'slide': null,
                    'start': null,
                    'stop': null,
                    'foobar': false
                };
            });
            it('El valor de la propiedad debe cambiar', () => {
                expect($slider.rup_slider('option', 'max')).toBe(400);
            });
            it('El objeto de propiedades debe variar', () => {
                expect($slider.rup_slider('option')).toEqual(objConf);
            });
        });
        describe('Método  instance > ', () => {
            it('Debe devolver el objeto de JQuery UI', () => {
                expect($slider.rup_slider('instance')).not.toBe(undefined);
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                $slider.rup_slider('destroy');
            });
            it('Debe desaparecer el slider', () => {
                expect($slider.hasClass('rup-slider') &&
                        $slider.hasClass('ui-slider') &&
                        $slider.hasClass('ui-corner-all') &&
                        $slider.hasClass('ui-slider-horizontal') &&
                        $slider.hasClass('ui-widget ui-widget-content'))
                    .toBe(false);
            });
            it('Debe desaparecer el icono arrastrable del slider', () => {
                expect($('span.ui-slider-handle.ui-corner-all.ui-state-default').length).toBe(0);
            });
        });
    });
});