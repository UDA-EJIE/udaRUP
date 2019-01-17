/* jslint multistr: true */



describe('Test Upload > ', () => {
    var $upload;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

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