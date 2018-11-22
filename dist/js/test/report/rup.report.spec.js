/* jslint multistr: true */



describe('Test Report > ', () => {
    var $report;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var handler = () => {
            console.log('XXX');
        };
        let html = '<div id="exampleToolbar"></div>';
        let options = {
            buttons: [
                {
                    id: 'searchBtn',
                    css: 'fa fa-search',
                    i18nCaption: 'buscar',
                    click: handler
                },
                {
                    id: "mbutton1",
                    i18nCaption: "botones",
                    buttons: [{
                            id: 'searchMBtn',
                            i18nCaption: 'buscar',
                            click: handler
                        },
                        {
                            id: 'editMBtn',
                            i18nCaption: 'editar',
                            click: handler
                        },
                        {
                            id: 'copyMBtn',
                            i18nCaption: 'copiar',
                            click: handler
                        }
                    ]
                }
            ]
        };
        $('#content').append(html);
        $('#exampleToolbar').rup_toolbar(options);

        let reportOpts = {
            appendTo: 'exampleToolbar',
            buttons: [{
                i18nCaption: 'exportar',
                url: testutils.DEMO + '/resources/w_n_p.pdf',
                right: true
            }]
        };

        $.rup_report(reportOpts);
        $report = $('[id="exampleToolbar##exportar"]');
    });
    afterEach(() => {
        if($('[aria-describedby="reportFileWait"]').length > 0) {
            $('#reportFileWait').rup_dialog('close');
            $('#reportFileWait').rup_dialog('destroy');
        }
        $('#content').html('');
        $('#content').nextAll().remove();
    });
    describe('Creación > ', () => {
        it('El botón de exportar debe de haberse creado:', () => {
            expect($('[id="exampleToolbar##exportar"]').length).toBe(1);
        });
    });
    describe('Funcionalidad > ', () => {
        describe('Abre ventana emergente > ', () => {
            beforeEach(() => {
                $report.click();
            });
            it('Debe abrir una ventana emergente:', () => {
                expect($('.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-draggable.rup-dialog')
                    .is(':visible')).toBe(true);
            });
            it('Debe tener un boton para cerrar el dialog:', () => {
                expect($('button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close')
                    .length).toBe(1);
            });
            it('Debe tener un progressbar:', () => {
                expect($('div.ui-progressbar.ui-progressbar-value.ui-corner-left.ui-corner-right').length).toBe(1);
            });
        });
        // describe('Obtiene el archivo > ', () => {
        //     beforeEach(() => {
        //         $('[id="exampleToolbar##exportar"]').trigger('click');
        //     });

        //     // TODO: PhantomJS no soporta la descarga de archivos así que no se puede probar
        // });
    });
});