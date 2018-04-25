import 'jquery';
import 'jasmine-jquery';
import 'rup.contextMenu';


describe('TEST contextMenu', () => {
    var $context;
    describe('Creación', () => {
        beforeAll(() => {
            var html = '<div id="exampleContext" class="card card-inverse"' +
                        'style="background-color: #333; border-color: #333;">' +
                            '<div class="card-block">' +
                                '<h2 class="card-blockquote">' +
                                    '<center>Prueba Context Menu' +
                                '</h2>' +
                            '</div>' +
		                '</div>';
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
});
