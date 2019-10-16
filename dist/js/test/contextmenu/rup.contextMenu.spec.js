/* jslint multistr: true */
/* eslint-env jasmine, jquery */


describe('Test ContextMenu > ', () => {
    var $context;

    beforeAll((done) => {
        testutils.loadCss(done);
    });

    beforeEach(() => {
        var html = '<div id="exampleContext" class="card card-inverse"\
                        style="background-color: #333; border-color: #333;">\
                            <div class="card-block">\
                                <h2 class="card-blockquote">\
                                    <center>Prueba Context Menu\
                                </h2>\
                            </div>\
                        </div>';
        $('#content').append(html);
        var props = {
            selector: '#exampleContext',
            items: {
                'edit': {name: 'Clickable', icon: 'edit'},
                'cut': {name: 'Disabled', icon: 'cut'}
                , 'fold1': {
                    name: 'Submenu'
                    , items: {
                        edit: { name: 'Clickable2', icon: 'edit' }
                    }
                }
            }
        };
        $('#exampleContext').rup_contextMenu(props);
        $context = $('#exampleContext');
    });

    afterEach(() => {
        if ($('[id*="contextMenu"], [id*="context-menu"]').length > 0) {
            $('.context-menu, .context-menu-active').rup_contextMenu('destroy');
            $.contextMenu('destroy');
        }
        $('#content').html('');
        $('#content').nextAll().remove();
    });

    describe('Creación > ', () => {
        it('Debe crear el elemento', () => {
            expect($('.context-menu-list').hasClass('context-menu-list context-menu-root')).toBe(true);
        });
        it('Debe ser invisible', () => {
            expect($('.context-menu-list').is(':visible')).toBe(false);
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método show > ', () => {
            beforeEach(() => {
                $context.rup_contextMenu('show');
            });
            it('Debe mostrarse:', () => {
                expect($('.context-menu-list').is(':visible')).toBe(true);
            });
        });
        describe('Método hide > ', () => {
            beforeEach(() => {
                $context.rup_contextMenu('show');
                $context.rup_contextMenu('hide');
            });
            it('No debe mostrarse:', () => {
                expect($('#exampleContext .context-menu-list').is(':visible')).toBe(false);
            });
        });
        describe('Método disable > :', () => {
            beforeEach(() => {
                $context.rup_contextMenu('disable');
            });
            it('Debe tener la clase que lo deshabilita', () => {
                expect($context.hasClass('context-menu-disabled')).toBe(true);
            });
        });
        describe('Método enable > ', () => {
            beforeEach(() => {
                $context.rup_contextMenu('disable');
                $context.rup_contextMenu('enable');
            });
            it('No debe tener la clase que lo deshabilita', () => {
                expect($context.hasClass('context-menu-disabled')).toBe(false);
            });
        });
        describe('Método destroy > ', () => {
            beforeEach(() => {
                $context.rup_contextMenu('destroy');
            });
            it('Debe eliminar el ul del DOM:', () => {
                expect($('#exampleContext .context-menu-list').length).toBe(0);
            });
        });
    });
    describe('Testing submenu > ', () => {
        beforeEach((done) => {
            $context.rup_contextMenu('show');
            setTimeout(() => {
                $('.context-menu-submenu').mouseenter();
                done();
            }, 200);
        });
        it('Se muestra el elemento del submenu > ', () => {
            expect($('span:contains(Clickable2)').is(':visible')).toBeTruthy();
        });
    });
});