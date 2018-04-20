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
        ]
    } // Configuraciones para distintos tipos de reports
]

confs.forEach((cur) => {
    $('body').append(html);
    $('#exampleReport').rup_report(cur);
    $report = $('#exampleReport');
    testear($report);
    $('body').html('');
});