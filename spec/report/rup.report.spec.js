import 'jquery';
import 'jasmine-jquery';
import 'rup.button';
import 'rup.report';

function testear() {
    describe('Test Report > ', () => {
        describe('Creación > ', () => {
            it('Debe crear un botón', () => {
                expect($('[id="exampleReport##btnExport"]')).toExist();
            });
            it('El boton debe tener las clases correspondientes', () => {
                expect($('[id="exampleReport##btnExport"]'))
                    .toHaveClass('rup-button ui-button ui-corner-all ui-widget');
            });
        });
        describe('Validar el funcionamiento > ', () => {
            /**
             * TODO: PAW!!
             */
        });
    });
};

let html = '<div class="rup-mbutton">'
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
let confs = [
    {
        appendTo:'exampleMButton',
        buttons:[
            {
                id:'btnExport',
                i18nCaption:'Exportar',
                url: 'ruta/a/archivo.pdf',
                click: (event) => {
                    let clase = event.data.id + '-' + event.data.caption;
                    $('#exampleMButton').addClass(clase);
                }
            }
        ],
        dialog:{
            wait:{
                title: 'Procesando',
                msg  : 'Se está generando el informe'
            },
            error:{
                title: 'Error',
                msg  : 'Se ha producido un error en la generación del informe'
            }         
        }
    } // Configuraciones para distintos tipos de reports
];

confs.forEach((cur) => {
    $('body').append(html);
    console.log(cur);
    $('#exampleMbutton').rup_button({});
    jQuery.rup_report(cur);
    testear();
    $('body').html('');
});