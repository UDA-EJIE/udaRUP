import 'jquery';
import 'jasmine-jquery';
import * as testutils from '../common/specCommonUtils';
import 'rup.progressbar';

describe('Test auditoría > ', () => {
    var $contenido;
    beforeAll((done) => {
        $contenido = $('#content');
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        //Añadimos el html de los componentes al DOM
        var html = '\
            <div id="exampleProgressbar"></div>\
            <input id="exampleSpinner"></input>';
        $contenido.append(html);
        //Creamos los componentes rup sobre el html añadido.
        $('#exampleProgressbar').rup_progressbar({ value: 0 });
        $('#exampleSpinner').rup_spinner();
        //Damos un poco de tiempo a que el backend recoja los datos.
        setTimeout(() => {
            done()
        },400);
    });
    it('Comprobamos si se auditan los componentes:', (done) => {
        $.ajax({
            url:'/audit',
            method:'GET',
            success: (data) => {
                expect(data.slice(-2)).toEqual(['rup_progressbar','rup_spinner']);
                done();
            }
        })
    });
});