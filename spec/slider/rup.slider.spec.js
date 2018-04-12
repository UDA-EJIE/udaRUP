import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.slider';

describe('Test Slider', () => {
    var $slider;
    describe('Creacion', () => {
        var html, options;
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
        describe('Método getRupValue:', () => {
            it('Devuelve un valor:', () => {
                expect($slider.rup_slider('getRupValue')).toBeDefined();
            });
        });
        describe('Método setRupValue', () => {
            beforeAll(() => {
                $slider.rup_slider('setRupValue', 50);
            });
            it('Debe actualizar el valor:', () => {
                expect($slider.rup_slider('getRupValue')).toBe(50);
            });
        });
        describe('Método disable', () => {
            beforeAll(() => {
              if($slider.is(':disabled')){
                  $slider.enable();
              }
              $slider.rup_slider('disable');
            });
            it('Debe poder deshabilitarse', () => {
              expect($slider).toBeDisabled();
            });
        });
        describe('Método enable', () => {
            beforeAll(() => {
              if($slider.is(':enabled') && 'disable' in methods){
                  $slider.disable();
              }
              $slider.rup_slider('enable');
            });
            it('Debe poder habilitarse', () => {
              expect($slider).not.toBeDisabled();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $slider.rup_slider('destroy');
            });
            it('No debe existir', () => {
                expect($slider.rup_slider('destroy')).toThrowError();
            });
        });
    });
});
