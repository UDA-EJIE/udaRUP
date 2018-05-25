import 'jquery';
import 'jasmine-jquery';
import 'rup.contextMenu';

describe('Test ContextMenu > ', () => {
    var $context;
    beforeEach(() => {
        var html = '<div id="exampleContext" class="card card-inverse"\
                        style="background-color: #333; border-color: #333;">\
                            <div class="card-block">\
                                <h2 class="card-blockquote">\
                                    <center>Prueba Context Menu\
                                </h2>\
                            </div>\
		                </div>';
            $('body').append(html);
            var props = {
                callback: function(key, options) {
                    alert("clicked: " + key); 
                },
                items: {
                    "edit": {name: "Clickable", icon: "edit", disabled: false},
                    "cut": {name: "Disabled", icon: "cut", disabled: true}
                }
            };
            $('#exampleContext').rup_contextMenu(props);
            $context = $('#exampleContext');
    });
    afterEach(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {
        it('Debe crear el elemento', () => {
            expect($('#contextMenu1').hasClass('context-menu-list context-menu-root')).toBe(true);
        });
        it('Debe ser invisible', () => {
            expect($('#contextMenu1').is(':visible')).toBe(false);
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método show > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $context.rup_contextMenu('show');
                }, 1500);
            });
            it('Debe mostrarse:', () => {
                setTimeout(() => {
                    expect($('#contextMenu1').is(':visible')).toBe(true);
                }, 1500);
            });
        });
        describe('Método hide > ', () => {
            beforeEach(() => {
                setTimeout(() => {
                    $context.rup_contextMenu('show');
                    $context.rup_contextMenu('hide');
                });
            });
            it('No debe mostrarse:', () => {
                setTimeout(() => {
                    expect($('#contextMenu1').is(':visible')).toBe(false);
                }, 1500);
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
                expect($('#contextMenu1').length).toBe(0);
            });
        });
    });
});
/*
describe('TEST contextMenu', () => {
    var $context;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<div id="exampleContext" class="card card-inverse"\
                        style="background-color: #333; border-color: #333;">\
                            <div class="card-block">\
                                <h2 class="card-blockquote">\
                                    <center>Prueba Context Menu\
                                </h2>\
                            </div>\
		                </div>';
            $('body').append(html);
            var props = {
                callback: function(key, options) {
                    alert("clicked: " + key); 
                },
                items: {
                    "edit": {name: "Clickable", icon: "edit", disabled: false},
                    "cut": {name: "Disabled", icon: "cut", disabled: true}
                }
            };
            $('#exampleContext').rup_contextMenu(props);
            $context = $('#exampleContext');
        });
        it('El div debe poseer la clase del cursor cmenu', () => {
            expect($context[0]).toHaveClass('context-menu-cursor');
        });
        it('El contextMenu debe existir y ser invisible', () => {
            console.log($('ul')[0]);
            expect($('#contextMenu1').is(':visible')).toBeFalsy();
        });
    });
    describe('Métodos públicos:', () => {
        // FIXME: En ejie.eus este método falla.
        describe('Método show', () => {
            beforeAll(() => {
                $context.rup_contextMenu('show');
            });
            it('Debe mostrarse', () => {
                expect($('#contextMenu1').is(':visible')).toBeTruthy();
            });
        });
        describe('Método hide', () => {
            beforeAll(() => {
                $context.rup_contextMenu('hide');
            });
            it('Debe estar oculto tras usar hide', () => {
                setTimeout(() => {
                    expect($('#contextMenu1').is(':visible')).toBeFalsy();
                }, 1500);
            });
        });
        describe('Método disable', () => {
            beforeAll(() => {
              if($context.is(':disabled')){
                  $context.enable();
              }
              $context.rup_contextMenu('disable');
            });
            it('Debe poder deshabilitarse', () => {
              expect($context.hasClass('context-menu-disabled')).toBeTruthy();
            });
        });
        describe('Método enable', () => {
            beforeAll(() => {
              if($context.is(':enabled')){
                  $context.disable();
              }
              $context.rup_contextMenu('enable');
            });
            it('Debe poder habilitarse', () => {
                expect($context.hasClass('context-menu-disabled')).toBeFalsy();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $context.rup_contextMenu('destroy');
                $context.rup_contextMenu('show');
            });
            it('No debe existir', () => {
                expect($('#contextMenu1').is(':visible')).toBeFalsy();
            });
        });
    });
});*/
