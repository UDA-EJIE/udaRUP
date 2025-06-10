/* eslint-env jquery,amd */

define(['marionette',
    './buttonTestTemplate.hbs',
    'rup.button', 'rup.message'], function(Marionette, ButtonTestTemplate){

    var ButtonTestView = Marionette.View.extend({
        template: ButtonTestTemplate,
        ui:{
            btnDefault: '#boton',
            btnIconHtml: '#btnIconHtml',
            btnIconJs: '#btnIconJs',
            btnRwdHtmlSm: '#btnRwdHtmlSm',
            btnRwdHtmlMd: '#btnRwdHtmlMd',
            btnRwdJsSm: '#btnRwdJsSm',
            btnRwdJsMd: '#btnRwdJsMd',
            btnMButton: '#btnMButton',
            btnDropdownList: '#dropdownHtmlListButton',
            btnDropdownDialog: '#dropdownDialogButton',
            btnFab: '#fabButton',
            fabButtonLayer: '#fabButtonLayer',
            btnFabFixed: '#fabButtonFixed',
            dropdownDialog: '#dropdownDialog',
            dropdownElem: '#dropdownElem1',
            dropdownCombo: '#dropdownButton-combo',
            btnClickJQuery: '#btnClickJQuery',
            btnClickRup: '#btnClickRup',
        },
        events:{
            'click @ui.dropdownElem': fncDropdownElementClick
        },
        onAttach: fncOnAttach
    });

    function fncOnAttach(){
        var $view = this;


        $view.ui.btnDefault.rup_button({
            disabled: true
        });

        //Botón con icono HTML
        $view.ui.btnIconHtml.rup_button();

        //Botón con icono JS
        $view.ui.btnIconJs.rup_button({
            iconCss: 'mdi mdi-cog'
        });

        // Botón Rwd HTML Sd
        $view.ui.btnRwdHtmlSm.rup_button();
        $view.ui.btnRwdHtmlMd.rup_button();
        $view.ui.btnRwdJsSm.rup_button({
            iconCss: 'mdi mdi-cog',
            labelCss: 'hidden-sm-down'
        });
        $view.ui.btnRwdJsMd.rup_button({
            iconCss: 'mdi mdi-cog',
            labelCss: 'hidden-md-down'
        });

        // MButton

        $view.ui.btnMButton.rup_button({});


        $view.ui.btnFab.rup_button({
            //fab: true
        });

        $view.ui.fabButtonLayer.rup_button({
            //fab: true
        });

        $view.ui.btnFabFixed.rup_button({
            //fab: true
        });

        $view.ui.btnDropdownList.rup_button({
            dropdown:{
                dropdownListId:'dropdownHtmlList'
            }
        });

        // Eventos click
        $view.ui.btnClickJQuery.rup_button().on('click', function(){
            $.rup_messages('msgOK', {
                title: 'Evento Click',
                message: 'Se ha capturado el evento click mediante un handler de jQuery.'
            });
        });
        $view.ui.btnClickRup.rup_button({
            iconCss: 'mdi mdi-cog',
            click: function(){
                $.rup_messages('msgOK', {
                    title: 'Evento Click',
                    message: 'Se ha capturado el evento click mediante un handler especificado en la propiedad click.'
                });
            }
        });


        // Dropdown dialog

        $view.ui.btnDropdownDialog.rup_button({
            dropdown:{
                dropdownDialog: 'dropdownDialog',
                dropdownDialogConfig:{
                    title:'<span class=\'rup-icon rup-icon-filter\'/>Administración de filtros',
                    width:'380px',
                    buttons: [{
                        text: 'Guardar',
                        click: function () {
                        }
                    },
                    {
                        text: 'Aceptar',
                        click: function () {
                        }
                    },
                    {
                        text: 'Eliminar',
                        click: function () {
                        }
                    },
                    {
                        text: 'Cancelar',
                        click: function () {
                            $view.ui.dropdownDialog.dialog('close');
                        },
                        btnType: $.rup.dialog.LINK
                    }
                    ]
                }
            }
        });

        var options_ejie_combo = {
            data : [
                {text:'Si', id:'0'},
                {text:'No', id:'1'}
            ],
            blank: ''
        };


        $view.ui.dropdownCombo.rup_select(options_ejie_combo);
    }

    function fncDropdownElementClick (){
        window.alert('Seleccionado elemento 1');
    }

    return ButtonTestView;
});
