import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.slider';

describe('Test Slider', () => {
    describe('Creacion', () => {
        var html, options, $slider;
        beforeAll(() => {
            html = '<div id="exampleSlider"></div>';
            $('body').append(html);

            options = {
                min:0,
                max:500
            };

            $slider = $('#exampleSlider');
            $slider.rup_slider(options);
        });
        it('Debe existir', () => {
            expect($slider).toExist();
        });
        it('Debe tener la clase rup-slider', () => {
            expect($slider.hasClass('rup-slider')).toBeTruthy();
        });
    });
    describe('Métodos públicos', () => {
        describe('Test options', () => {
            it('Debe devolver el objeto de propiedades:', () => {
                //Si tiene cualquiera de los campos con el valor correcto es que devuelve el objeto bien.
                expect($slider.rup_slider('options').max).toBe(500);
            });
            it('Debe devolver el valor de una propiedad concreta', () => {
                expect($slider.rup_slider('option', 'min')).toBe(0);
            });
            it('Debe ser capaz de modificar el valor de una propiedad', () => {
                $slider.rup_slider('options','step', 5);
                expect($slider.rup_slider('option', 'step')).toBe(5);
            });
            it('Debe ser capaz de modificar los valores de varias propiedades', () => {
                $slider.rup_slider('options',{max: 550, min: 10});
                expect($slider.rup_slider('options').max).toBe(550);
                expect($slider.rup_slider('options').min).toBe(10);
            });
        });
        generalFunc($slider, 'rup_slider', ['enable','disable','getRupValue','setRupValue','destroy']);
    });
});