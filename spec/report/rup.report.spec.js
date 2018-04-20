import 'jquery';
import 'jasmine-jquery';
import 'rup.report';

function testear($report) {
    describe('Test Report > ', () => {
        describe('Creación > ', () => {});
        describe('Validar el funcionamiento > ', () => {});
    });
};

let $report;
let html = '<div id="exampleReport"></div>';
let confs = [
    {
        appendTo:'#exampleReport',
        buttons:[
            {
                i18nCaption:'Exportar',
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
    $('#exampleReport').rup_report(cur);
    $report = $('#exampleReport');
    testear($report);
    $('body').html('');
});