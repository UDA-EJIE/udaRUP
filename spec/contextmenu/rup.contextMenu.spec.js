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
            }
            $('#exampleContext').rup_contextMenu(props);
            $context = $('#exampleContext');
        });
        it('El div debe poseer la clase del cursor cmenu', () => {
            expect($context).toHaveClass('context-menu-cursor');
        });
        it('El contextMenu debe existir y ser invisible', () => {
            expect('ul').toExist();
            expect('ul').toBeHidden();
        });
    });
    describe('Métodos públicos:', () => {
        // FIXME: En ejie.eus este método falla.
        describe('Método show', () => {
            beforeAll(() => {
                $context.rup_contextMenu('show');
            });
            it('Debe mostrarse', () => {
                expect($context).not.toBeHidden();
            });
        });
        describe('Método show', () => {
            beforeAll(() => {
                $context.rup_contextMenu('hide');
            });
            it('Debe mostrarse', () => {
                expect($context).toBeHidden();
            });
        });
        describe('Método disable', () => {
            beforeAll(() => {
              if($context.is(':disabled')){
                  $context.enable();
              }
              $context.rup_date('disable');
            });
            it('Debe poder deshabilitarse', () => {
              expect($context).toBeDisabled();
            });
        });
        describe('Método enable', () => {
            beforeAll(() => {
              if($context.is(':enabled') && 'disable' in methods){
                  $context.disable();
              }
              $context.rup_date('enable');
            });
            it('Debe poder habilitarse', () => {
              expect($context).not.toBeDisabled();
            });
        });
        describe('Método destroy', () => {
            beforeAll(() => {
                $context.rup_date('destroy');
            });
            it('No debe existir', () => {
                expect($context.rup_date('destroy')).toThrowError();
            });
        });
    });
});
