/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.button';
import 'rup.toolbar';
import 'rup.report';

const webRoot = 'http://localhost:8081';

describe('Test Report > ', () => {
    var $report;
    beforeEach(() => {
        var handler = () => {
            console.log('XXX');
        };
        let html = '<div id="exampleToolbar"></div>';
        let options = {
            buttons:[
                {id:'searchBtn',css:'fa fa-search',i18nCaption:'buscar', click:handler},
                {id: "mbutton1", i18nCaption:"botones", buttons:[
                    {id:'searchMBtn',i18nCaption:'buscar', click:handler},
                    {id:'editMBtn',i18nCaption:'editar', click:handler},
                    {id:'copyMBtn',i18nCaption:'copiar', click:handler}
                ]}
            ]
        };
        $('#content').append(html);
        $('#exampleToolbar').rup_toolbar(options);

        let reportOpts = {
            appendTo: 'exampleToolbar',
            buttons:[
                {
                    i18nCaption:'exportar',
                    url: webRoot + '/demo/resources/w_n_p.pdf',
                    right: true
                }
            ]
        };

        $.rup_report(reportOpts);
        $report = $('[id="exampleToolbar##exportar"]');
    });
    afterEach(() => {
        $('#exampleToolbar').rup_toolbar('destroy');
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creación > ', () => {
        it('El botón de exportar debe de haberse creado:', () => {
                expect($('[id="exampleToolbar##exportar"]').length).toBe(1);
        });
    });
    describe('Funcionalidad > ', () => {
        beforeEach(() => {
            $report.trigger('click');
        });
        describe('Abre ventana emergente > ', () => {
            it('Debe abrir una ventana emergente:', () => {
                    expect($('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                        .is(':visible')).toBe(true);
            });
            it('Debe tener un boton para cerrar el dialog:', () => {
                let element = $('button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close');
                expect(element.length).toBe(1);
            });
            it('Debe tener un progressbar:', () => {
                let element = $('div.ui-progressbar.ui-progressbar-value.ui-corner-left.ui-corner-right');
                expect(element.length).toBe(1);
            });
        });
        describe('Obtiene el archivo > ', () => {
            beforeEach(() => {
                $('[id="exampleToolbar##exportar"]').trigger('click');
            });

            // TODO: PhantomJS no soporta la descarga de archivos así que no se puede probar
        });
    });
});