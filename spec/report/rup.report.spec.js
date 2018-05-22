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
        $('body').append(html);
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
        }

        $.rup_report(reportOpts);
        $report = $('[id="exampleToolbar##exportar"]');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('El botón de exportar debe de haberse creado:', () => {
            setTimeout(() => {
                expect($('[id="exampleToolbar##exportar"]').length).toBe(1);
            }, 1500);
        });
    });
    describe('Funcionalidad > ', () => {
        beforeEach(() => {
            $report.trigger('click');
        });
        describe('Abre ventana emergente > ', () => {
            it('Debe abrir una ventana emergente:', () => {
                setTimeout(() => {
                    expect($('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                        .is(':visible')).toBe(true);
                }, 1500);
            });
            it('Debe tener un boton para cerrar el dialog:', () => {
                setTimeout(() => {
                    expect($('button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close').length).toBe(1);
                },1500);
            });
            it('Debe tener un progressbar:', () => {
                setTimeout(() => {
                    expect($('div.ui-progressbar.ui-progressbar-value.ui-corner-left.ui-corner-right').length).toBe(1);
                }, 1500);
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