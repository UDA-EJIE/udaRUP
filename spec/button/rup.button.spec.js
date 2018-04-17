import 'jquery';
import 'handlebars';
import 'jasmine-jquery';
import 'rup.button';

describe('TEST Button', () => {
    var $button;
    beforeAll(() => {
        var html= '<button id="exampleButton"></button>'
                +  '<div class="rup-mbutton">'
                +       '<button type="button" id="exampleMButton" data-mbutton="true">'
                +           '<i class="fa fa-cog" aria-hidden="true"></i> <span'
                +              'class="rup-ui-button-text hidden-md-down">MButton</span>'
                +       '</button>'
                +       '<ul id="mbuttonContainer" class="rup-mbutton-container"'
                +            'aria-labelledby="exampleMButton">'
                +            '<li>'
                +                '<button type="button" id="mbutton-buttonNew">'
                +                    '<i class="fa fa-cog" aria-hidden="true"></i> <span'
                +                        'class="rup-ui-button-text hidden-md-down">Nuevo</span>'
                +                '</button>'
                +            '</li>'
                +            '<li>'
                +                '<button type="button" id="mbutton-buttonEdit">'
                +                    '<i class="fa fa-cog" aria-hidden="true"></i> <span'
                +                        'class="rup-ui-button-text hidden-md-down">Editar</span>'
                +                '</button>'
                +            '</li>'
                +            '<li>'
                +                '<button type="button" id="mbutton-buttonCancel">'
                +                    '<i class="fa fa-cog" aria-hidden="true"></i> <span'
                +                        'class="rup-ui-button-text hidden-md-down">Cancelar</span>'
                +                '</button>'
                +            '</li>'
                +        '</ul>'
                +    '</div>';
        $('body').append(html);
        $('#exampleButton').rup_button({});
        $('#exampleMButton').rup_button({});
        $button  = $('#exampleButton');
        $mButton = $('#exampleMButton');
    });
    describe('Creación >', () => {
        it('Deben ser rup-buttons',() => {
            expect($button.hasClass('rup-button')).toBeTruthy();
            expect($mButton.hasClass('rup-button')).toBeTruthy();
        });
    });
    describe('Métodos públicos >', () => {
        describe('Método defaults >', () => {
            it('El objeto debe estar definido', () => {
                expect($button.rup_button('defaults')).toBeDefined();
                expect($mButton.rup_button('defaults')).toBeDefined();
            });
        });
    });
});