/* jslint esnext: true, multistr: true */

import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.button';

describe('TEST Button', () => {
    var $button, $mButton, $dropdownButton;
    beforeEach(() => {
        var html= '<button id="exampleButton">Btn</button>\
                  <div class="rup-mbutton">\
                       <button type="button" id="exampleMButton" data-mbutton="true">\
                           <i class="fa fa-cog" aria-hidden="true"></i> <span\
                              class="rup-ui-button-text hidden-md-down">MButton</span>\
                       </button>\
                       <ul id="mbuttonContainer" class="rup-mbutton-container"\
                            aria-labelledby="exampleMButton">\
                            <li>\
                                <button type="button" id="mbutton-buttonNew">\
                                    <i class="fa fa-cog" aria-hidden="true"></i> <span\
                                        class="rup-ui-button-text hidden-md-down">Nuevo</span>\
                                </button>\
                            </li>\
                            <li>\
                                <button type="button" id="mbutton-buttonEdit">\
                                    <i class="fa fa-cog" aria-hidden="true"></i> <span\
                                        class="rup-ui-button-text hidden-md-down">Editar</span>\
                                </button>\
                            </li>\
                            <li>\
                                <button type="button" id="mbutton-buttonCancel">\
                                    <i class="fa fa-cog" aria-hidden="true"></i> <span\
                                        class="rup-ui-button-text hidden-md-down">Cancelar</span>\
                                </button>\
                            </li>\
                        </ul>\
                    </div>\
                    <button id="dropdownButton">Btn</button>';
        $('body').append(html);
        $('#exampleButton').rup_button({});
        $('#exampleMButton').rup_button({});
        $('#dropdownButton').rup_button({
            dropdown: true
        });
        $button  = $('#exampleButton');
        $mButton = $('#exampleMButton');
        $dropdownButton = $('#dropdownButton');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación >', () => {
        describe('Button > ', () => {
            it('Debe tener la clase rup-button',() => {
                expect($button.hasClass('rup-button')).toBeTruthy();
            });
        });
        describe('MButton > ', () => {
            it('Debe tener la clase rup_button', () => {
                expect($mButton.hasClass('rup-button')).toBeTruthy();
            });
            it('El mButton debe tener los botones hijos ', () => {});
        });
        describe('DropdownButton', () => {
            it('Debe tener las clases apropiadas:', () => {
                expect($dropdownButton.hasClass('rup-button rup-dropdown'))
            });
            it('El dropdownButton debe crear un contenedor para el y el dropdown ', () => {
                expect($('.rup-dropdown-btn-group').length).toBe(1);
            });
            it('El contenedor debe tener dos hijos ', () => {
                expect($('.rup-dropdown-btn-group').children().length).toBe(2);
            });
        }); 
    });
    describe('Métodos públicos >', () => {
        /**
         * No hay ninguno implementado.
         */
    });
});
