import 'jquery';
import 'jasmine-jquery';
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

let html = '<div id="exampleReport"></div>';
let confs = [
    {
        appendTo:'exampleReport',
        buttons:[
            {
                id:'btnExport',
                i18nCaption:'Exportar',
                url: 'ruta/a/archivo.pdf',
                click: (event) => {
                    let clase = event.data.id + '-' + event.data.caption;
                    $('#exampleReport').addClass(clase);
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
    $('#exampleReport').rup_toolbar({});
    jQuery.rup_report(cur);
    testear();
    $('body').html('');
});