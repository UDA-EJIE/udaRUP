/* jslint esnext: true, multistr: true */

import '../../dist/css/rup-base.css';
import '../../dist/css/rup-theme.css';
import 'jquery';
import 'jasmine-jquery';
import 'blueimp-file-upload';
import 'rup.upload';

const webRoot = "http://localhost:8081";

function testTrace(title, toTrace) {
    console.info("\n\n*****************************************************\n\n" +
        title +
        "\n--------------------------------\n\n" +
        toTrace +
        "\n\n*****************************************************\n\n");
}

function loadCss() {
    let css = '';
    $('head').append('<style></style>');
    var thenable = $.when($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then($.ajax('http://localhost:8081/dist/css/rup-base.css'))
        .then((data, textStatus, jqXHR) => {
            css += data;
        })
        .then(() => {
            $('head > style').append(css);
        });
    return thenable;
}

$.when(loadCss())
    .done(testUpload());

function testUpload() {

    describe('Test Upload > ', () => {
        var $upload;
        beforeEach(() => {
            let html = '<span class="btn btn-success fileinput-button">\
                            <i class="glyphicon glyphicon-plus"></i>\
                            <span>Seleccionar...</span>\
                            <input id="exampleUpload" type="file" name="files[]" data-url="../upload" multiple="multiple" />\
                        </span>\
                        <p id="txtVar"></p>';
            let props = {
                dataType: 'json',
                uploadTemplateId: false,
                downloadTemplateId: false
            };
            $('#content').append(html);
            $('#exampleUpload').rup_upload(props);
            $upload = $('#exampleUpload');
        });
        afterEach(() => {
            $('#content').html('');
            $('#content').nextAll().remove();
        });
        describe('Creación > ', () => {
            /**
             * No se crea ningún cambio en el DOM que nos dé pistas de si se crea o no correctamente
             * el elmento rup. Consideramos que se pasa bien si los métodos públicos no fallan
             */
        });
        describe('Métodos públicos > ', () => {
            describe('Método add > ', () => {
                beforeEach(() => {
                    $upload.rup_upload('add', () => {
                        $('#txtVar').addClass('add-worked');
                    });
                    /**
                     * No se puede añadir programáticamente archivos a un
                     * input type:"file"
                     * 
                     * Así que se hará un trigger
                     */
                    $('#txtVar').trigger('add');
                });
                it('#txtVar debe tener la clase add-worked', () => {
                    expect($('#txtVar').hasClass('add-worked')).toBeTruthy();
                });
            });
            describe('Método disable > ', () => {
                beforeEach(() => {
                    $upload.rup_upload('disable');
                });
                afterEach(() => {
                    $upload.rup_upload('enable');
                });
                it('Debe tener la clase que lo marca como deshabilitado', () => {
                    expect($upload).toHaveClass('blueimp-fileupload-disabled');
                });
            });
            describe('Método enable > ', () => {
                beforeEach(() => {
                    $upload.rup_upload('disable');
                    $upload.rup_upload('enable');
                });
                it('No debe tener la clase que lo marca como deshabilitado', () => {
                    expect($upload).not.toHaveClass('blueimp-fileupload-disabled');
                });
            });
            describe('Método destroy > ', () => {
                beforeEach(() => {
                    $upload.rup_upload('destroy');
                });
                it('Intentar lanzar el método destroy por segunda vez debe lanzar un error', () => {
                    expect(() => {
                        $upload.rup_upload('destroy');
                    }).toThrowError();
                });
            });
        });
    });
}