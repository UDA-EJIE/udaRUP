import 'jquery';
import 'jasmine-jquery';
import 'rup.upload';

describe('Test Upload > ', () => {
    var $upload;
    beforeAll(() => {
        let html =   '<span class="btn btn-success fileinput-button">'
                +       '<i class="glyphicon glyphicon-plus"></i>'
                +       '<span>Seleccionar...</span>'
                +       '<input id="exampleUpload" type="file" name="files[]" data-url="../upload" multiple="multiple" />'
                +    '</span>';
        let props = {
            dataType: 'json',
            uploadTemplateId:false,
            downloadTemplateId:false
        };
        $('#exampleUpload').rup_upload(props);
        $upload = $('#exampleUpload');
    });
    describe('Creación > ', () => {});
    describe('Métodos públicos > ', () => {
        describe('Método add > ', () => {});
        describe('Método disable > ', () => {});
        describe('Método enable > ', () => {});
        describe('Método destroy > ', () => {});
    });
});