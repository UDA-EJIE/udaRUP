/* jslint multistr: true */
/* eslint-env jasmine, jquery */


describe('Test auditoría > ', () => {
    var $contenido;
    var audited = [];

    beforeAll((done) => {
        if ($('#content').length == 0) {
            $('body').append('<div id="content" class="container mt-4"></div>');
        }
        $contenido = $('#content');
        testutils.loadCss(done);
    });
    beforeEach((done) => {
        jasmine.Ajax.install();

        jasmine.Ajax.stubRequest(/^(http:\/\/localhost:\d+)(\/audit)$/).andCallFunction((req) => {
            audited.push(req.data().nombreComponente);
        });

        //Añadimos el html de los componentes al DOM
        var html = '\
                <div id="exampleProgressbar"></div>\
                <input id="exampleSpinner"></input>';
        $contenido.append(html);
        // Para que realice las auditorias
        $.rup.IS_EJIE = true;
        //Creamos los componentes rup sobre el html añadido.
        $('#exampleProgressbar').rup_progressbar({ value: 0 });
        $('#exampleSpinner').rup_spinner();
        //Damos un poco de tiempo a que el backend recoja los datos.
        setTimeout(done,400);
    });
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    it('Comprobamos si se auditan los componentes:', () => {
        expect(audited).toEqual(['rup_progressbar', 'rup_spinner']);
    });
});