import 'jquery';
import 'jasmine-jquery';
import 'rup.button';
import 'rup.toolbar';

// TODO: Algo no le gusta a PhantomJS. Copiando el codigo en la consolaJS de Chrome funciona sin problemas.
describe('Test Toolbar > ', () => {
    var $toolbar;
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
        // TODO: Si creamos el toolbar con las opciones se rompe.
        $('#exampleToolbar').rup_toolbar(options);
        $toolbar = $('#exampleToolbar');
    });
    afterEach(() => {
        $('body').html('');
    });

    describe('Creación > ', () => {
        it('Debe tener la clase adecuada', () => {
            expect($toolbar.hasClass('rup-toolbar ui-widget-header ui-widget ui-widget-content'))
                .toBeTruthy();
        });
    });
    describe('Métodos públicos > ', () => {
        describe('Método addButton > ', () => {
            let buttonObj;
            beforeEach(() => {
                buttonObj = {
                    id: 'addedButton',
                    i18nCaption: 'Added Button'
                }
                $toolbar.rup_toolbar('addButton', buttonObj);
            });
            it('Debe existir el boton', () => {
                expect($('[id="exampleToolbar##addedButton"]').length).toBe(1);
            });
        });
        describe('Método addMButton > ', () => {
            let mButton;
            beforeEach(() => {
                mButton = {
                    id: "addedMButton", i18nCaption:"addedMButton", buttons:[
                        {id: 'new', i18nCaption:"nuevo", css:"nuevo", click: () =>{alert('KEKEKEKEKE')}},
                        {id: 'editar', i18nCaption:"editar", css:"editar", click: () =>{alert('KEKEKEKEKE')}},
                        {id: 'cancelar', i18nCaption:"cancelar", css:"cancelar", click: () =>{alert('KEKEKEKEKE')}}
                    ]
                };
                $toolbar.rup_toolbar('addMButton', mButton);
            });

            it('Debe existir el mButton', () => {
                expect($('[id="exampleToolbar##addedMButton"]').length).toBe(1);
            });
            it('Deben existir los botones hijos del MButton', () => {
                expect($('[id="exampleToolbar##addedMButton##new"]').length).toBe(1);
                expect($('[id="exampleToolbar##addedMButton##editar"]').length).toBe(1);
                expect($('[id="exampleToolbar##addedMButton##cancelar"]').length).toBe(1);
            });
        });
        describe('Método addButtonsToMButton >', () => {
            beforeEach(() => {
                let button = {
                    id: 'addedButton',
                    i18nCaption: 'boton',
                    click: () => { alert('XXX')}
                };

                $toolbar.rup_toolbar('addButtonsToMButton', 'mbutton1', [button]);
            });

            it('Debe existir el botón añadido', () => {
                expect($('[id="exampleToolbar##mbutton1##addedButton"]').length).toBe(1);
            })
        });
        describe('Método showMButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('showMButton', 'mbutton1');
            });
            it('Debe tener la clase de "abierto" ', () => {
                expect($toolbar.hasClass('rup-mbutton-open')).toBeTruthy();
            });
        });
        describe('Método disableButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('disableButton','searchBtn');
            });
            // TODO: No funciona en ejie.eus así que no sé como se deshabilita
        });
        describe('Método enableButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('disableButton','searchBtn');
                $toolbar.rup_toolbar('enableButton','searchBtn');
            });
            // TODO: No funciona en ejie.eus así que no sé como se habilita
        });
        describe('Método pressButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('pressButton','searchBtn','pressed-button');
            });
            it('Debe tener la clase de presionado ', () => {
                expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeTruthy();
            });
        });
        describe('Método unpressButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('pressButton','searchBtn','pressed-button');
                $toolbar.rup_toolbar('unpressButton','searchBtn','pressed-button');
            });
            it('Debe tener la clase de presionado ', () => {
                expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeFalsy();
            });
        });
        describe('Método tooglePressButton > ', () => {
            beforeEach(() => {
                $toolbar.rup_toolbar('pressButton','searchBtn','pressed-button');
                $toolbar.rup_toolbar('togglePressButton','searchBtn','pressed-button');
            });
            it('Debe tener la clase de presionado ', () => {
                expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).toBeFalsy();
            });
        });
        describe('Método refresh > ', () => {});
        describe('Método buttonClick > ', () => {});
    });
});
//###############################################################################################################
//###############################################################################################################
//###############################################################################################################
/*import 'jquery';
import 'jasmine-jquery';
import 'rup.toolbar';

const handler = () => {
    console.log('clicked');
};
describe('Test ToolBar > ', () => {
    var $toolbar;
    beforeEach(() => {
        //$('body').html('');
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
        console.log($('#exampleToolbar'));
        $toolbar = $('#exampleToolbar');
    });
    afterEach(() => {
        $('body').html('');
    });

    describe('Creación > ', () => {
        it('Debe tener la clase', () => {
            setTimeout(() => {
                expect($toolbar).toHaveClass('rup-toolbar ui-widget-header ui-widget ui-widget-content');
            }, 1500);
        });
        describe('Comprobamos los hijos >', () => {
            it('Debe tener 2 hijos ', () => {
                expect($toolbar.children().length).toBe(2);
            });
            it('Los hijos tienen que ser los botones declarados en options', () => {
                expect($toolbar.children()[0].id).toBe('exampleToolbar##searchBtn');
                expect($toolbar.children()[1].id).toBe('exampleToolbar##mbutton1-mbutton-group');
            });
        });
    });
    describe('Métodos Públicos > ', () => {
        describe('Método addButton >' , () => {
            let $btnSelector;
            beforeAll(() => {
                let button = {
                    id:'randomBtn1',
                    i18nCaption:'random1',
                    click: () => {alert('click randomBtn1')}
                };
                $toolbar.rup_toolbar('addButton', button);
                $btnSelector = $('[id="exampleToolbar##randomBtn1"]');
            });
            it('Debe existir', () => {
                expect($btnSelector.length).toBe(1);
            });
            it('Debe ser hijo de $toolBar', () => {
                expect($btnSelector.parent()[0].id).toBe('exampleToolbar');
            });
        });
        describe('Método addMNutton >', () => {
            let $mBtnSelector;
            beforeAll(() => {
                let mButton = {
                    id: "randomMbutton1", i18nCaption:"randomM1", buttons:[
                        {i18nCaption:"nuevo", css:"nuevo", click: () => {alert('click randomMBtn1:nuevo');}},
                        {i18nCaption:"editar", css:"editar", click: () => {alert('click randomMBtn1:editar');}},
                        {i18nCaption:"cancelar", css:"cancelar", click: () => {alert('click randomMBtn1:cancelar');}}
                    ]
                };
                $toolbar.rup_toolbar('addMButton', mButton);
                $mBtnSelector = $('[id="exampleToolbar##randomMbutton1-mbutton-group"]');
            });
            it('Debe existir', () => {
                expect($mBtnSelector.length).toBe(1);
            });
            it('Debe ser hijo de $toolBar', () => {
                expect($mBtnSelector.parent()[0].id).toBe('exampleToolbar');
            });
            it('Debe tener 3 botones hijos', () => {
                expect($($mBtnSelector).children('ul').children().length).toBe(3);
            });
        });
        describe('Método addButtonsToMButton >', () => {
            let $mBtnSelector;
            beforeAll(() => {
                let btns = [
                    {id:'added1', i18nCaption:'addedBtn1', click:() => {alert('click added1')}},
                    {id:'added2', i18nCaption:'addedBtn2', click:() => {alert('click added2')}}
                ];
                $toolbar.rup_toolbar('addButtonsToMButtons', 'mbutton1', btns);
                $mBtnSelector = $('[id="exampleToolbar##randomMbutton1-mbutton-group"]');
            });
            it('Deben estar en el mButton especificado', () => {
                expect($($mBtnSelector).children('ul').children()[3].id)
                    .toBe('exampleToolbar##randomMbutton1-mbutton-group##addedBtn1');
                expect($($mBtnSelector).children('ul').children()[4].id)
                    .toBe('exampleToolbar##randomMbutton1-mbutton-group##addedBtn2');
            });
        });
        describe('Método showMButton >', () => {
            //Imagino que sirve para mostrar los button en los MButtons
            beforeAll(() => {
                //Para asegurarse de que no estén ya abiertos
                $('body').click();
                $toolbar.rup_toolbar('showMButtons');
            });
            it('Los botones deben ser visibles', () => {
                expect($('.rup-mbutton-container').is(':visible')).toBeTruthy();
            });
        });
        describe('Método disableButton >',     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('disableButton','exampleToolbar##searchBtn');
            });
            //No funciona en ejie.eus asi que no sé si se deshabilita añadiendo
            //una clase o de alguna otra manera.
            // TODO:
            it('Debe estar deshabilitado', () => {});
        });
        describe('Método enableButton >' ,     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('enableButton','exampleToolbar##searchBtn');
            });
            //No funciona en ejie.eus asi que no sé si se habilita quitando
            //una clase o de alguna otra manera.
            // TODO:
            it('Debe estar habilitado', () => {});
        });
        describe('Método pressButton >',       () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('pressButton','exampleToolbar##searchBtn', 'pressed-button');
            });
            //Tampoco funciona en ejie pero imagino que es para añadir una clase al botón.
            it('Debe haber añadido la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]')).toHaveClass('pressed-button');
            });
        });
        describe('Método unpressButton >',     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('unpressButton','exampleToolbar##searchBtn', 'pressed-button');
            });
            //Tampoco funciona en ejie pero imagino que es para quitar una clase al botón.
            it('Debe haber quitado la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]')).not.toHaveClass('pressed-button');
            });
        });
        describe('Método togglePressButton >', () => {
            let hayClase;
            beforeAll(() => {
                hayClase = $('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button');
                $toolbar.rup_toolbar('togglePressButton', 'exampleToolbar##searchBtn', 'pressed-button');
            });
            it('Debe hace toggle con la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).not.toBe(hayClase);
            });
        });
        describe('Método refreshButton >',     () => {
            beforeAll(() =>{
                $toolbar.rup_toolbar('disableButton', 'exampleToolbar##searchBtn');
                $toolbar.rup_toolbar('refreshButton', 'exampleToolbar##searchBtn');
            });
            //Compo no funciona en ejie.eus no se la condicion para que el botón este habilitado
            it('Debe estar habilitado', () => {});
        });
        describe('Método hideMButtons  >',     () => {
            //Imagino que sirve para ocultar los button en los MButtons
            beforeAll(() => {
                //Para asegurarse de que no estén ya abiertos
                $toolbar.rup_toolbar('showMButtons');
                $toolbar.rup_toolbar('hideMButtons');
            });
            it('Los botones deben ser visibles', () => {
                expect($('.rup-mbutton-container').is(':visible')).toBeFalsy();
            });
        });
    });
});*/
