
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
            url:$.rup.AUDIT_PATH,
            method:'GET',
            success: (data) => {
                expect(data.slice(-2)).toEqual(['rup_progressbar','rup_spinner']);
                done();
            }
        })
    });
});