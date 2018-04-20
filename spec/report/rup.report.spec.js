import 'jquery';
import 'jasmine-jquery';
import 'rup.report';

function testear($report) {
    describe('Test Report > ', () => {
        beforeAll(() => {});
        describe('Creación > ', () => {});
        describe('Validar el funcionamiento > ', () => {});
    });
};

let $report;
let reportSel = '#exampleReport';
let html = '';
let confs = [
    {},
    {} // Configuraciones para distintos tipos de reports
]

confs.forEach((cur) => {
    $('body').append(html);
    $(reportSel).rup_report(cur);
    $report = $(reportSel);
    testear($report);
    $('body').html('');
});