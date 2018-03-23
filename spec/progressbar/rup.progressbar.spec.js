import 'jquery';
import 'jasmine-jquery';
import 'rup.progressbar';

describe('TEST ProgressBar', () => {
    describe('Creación', () => {
        var $progressbar;
        beforeAll(() => {
            var html = '<div id="exampleProgressbar"></div>';
            $('body').append(html);
            $progressbar.rup_progressbar({value:0});
        });
        it('Se crea el elemento (Tiene la clase de progressbar)', () => {
            expect($progressbar.hasClass('rup-progressbar')).toBeTruthy();
        });
    });
    describe('Métodos públidos', () => {
        describe('Método instance', () => {
            it('Debe estar definida;', () => {
                expect($progressbar.rup_progressbar('instance')).toBeDefined();
            });
        });
        describe('Métodos Option', () => {
            describe('option()', () => {
                it('Debe devolver el objeto con las propiedades:', () => {
                    expect($progressbar.rup_progressbar('option').max).toBe(100);
                });
            });
            describe('option({a:b,c:d}) y option("str")', () => {
                beforeAll(() => {
                    $progressbar.rup_progressbar('option', {value: 10, max:20});
                });
                afterAll(() => {
                    $progressbar.rup_progressbar('option', {value: 0, max:100});
                });
                it('Debe establecer varios valores', () => {
                    expect($progressbar.rup_progressbar('option','value')).toBe(10);
                    expect($progressbar.rup_progressbar('option','max')).toBe(20);
                });
            });
            describe('option("str","val")', () => {
                beforeAll(() => {
                    $progressbar.rup_progressbar('option', 'value', 50);
                });
                afterAll(() => {
                    $progressbar.rup_progressbar('option', 'value', 0);
                });
                it('Debe cambiar un valor', () => {
                    expect($progressbar.rup_progressbar('option','value')).toBe(50);
                });
            });
        });
        describe('Metodos value', () => {
            beforeAll(() => {
                $progressbar.rup_progressbar('value', 50);
            });
            afterAll(() => {
                $progressbar.rup_progressbar('value', 0);
            });
            it('Debe setear y recoger valores', () => {
                expect($progressbar.rup_progressbar('value')).toBe(50);
            });
        });
        describe('Método widget', () => {
            expect($progressbar.rup_progressbar('widget')[0]).toBeDefined();
        });
    });
});