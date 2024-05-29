define(['marionette',
    './validateTestTemplate.hbs',
    'rup.validate', 'rup.button'
], function (Marionette, ValidateTestTemplate) {

    var ValidateTestView = Marionette.View.extend({
        template: ValidateTestTemplate,
        listaDias: [],
        configuracionBasicaValidate: {},
        onAttach: fncOnAttach,
        initialize: function () {
            this.listaDias = [{
                i18nCaption: 'lunes',
                id: '1'
            },
            {
                i18nCaption: 'martes',
                id: '2'
            },
            {
                i18nCaption: 'miercoles',
                id: '3'
            },
            {
                i18nCaption: 'jueves',
                id: '4'
            },
            {
                i18nCaption: 'viernes',
                id: '5'
            },
            {
                i18nCaption: 'sabado',
                id: '6'
            },
            {
                i18nCaption: 'domingo',
                id: '7'
            }
            ];


            this.configuracionBasicaValidate = {
                feedback: $('#feedbackErroresValidaciones'),
                liveCheckingErrors: $('#liveCheckingErrors').is(':checked'),
                showFieldErrorAsDefault: $('#checkShowFieldErrorsTip').is(':checked'),
                showErrorsInFeedback: $('#checkFeedbackError').is(':checked'),
                showFieldErrorsInFeedback: $('#checkShowErrorsFeedback').is(':checked')
            };
        }

    });

    function fncOnAttach() {



        $('#autocomplete').rup_select({
            url: 'autocomplete/remote',
            sourceParam: {
                text: 'desc' + $.rup_utils.capitalizedLang(),
                id: 'code'
            },
            autocomplete: true,
            minLength: 4
        });


        $('#comboAbueloRemoto').rup_select({
            url: 'comboEnlazadoSimple/remoteEnlazadoProvincia',
            sourceParam: {
                text: 'desc' + $.rup_utils.capitalizedLang(),
                id: 'code',
                style: 'css'
            },
            blank: ''
        });

        $('#comboPadreRemoto').rup_select({
            parent: ['comboAbueloRemoto'],
            url: 'comboEnlazadoSimple/remoteEnlazadoComarca',
            sourceParam: {
                text: 'desc' + $.rup_utils.capitalizedLang(),
                id: 'code',
                style: 'css'
            },
            blank: ''
        });

        $('#comboHijoRemoto').rup_select({
            parent: ['comboPadreRemoto'],
            url: 'comboEnlazadoSimple/remoteEnlazadoLocalidad',
            sourceParam: {
                text: 'desc' + $.rup_utils.capitalizedLang(),
                id: 'code',
                style: 'css'
            },
            blank: ''
        });

        $('#multicombo').rup_select({
            data: this.listaDias,
            width: 400,
            ordered: false,
            loadFromSelect: true,
            multiselect: true
        });

        $('#fecha').rup_date({
            labelMaskId: 'fecha-mask',
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: true
            //, buttonImage : "/basic-theme/images/exclamation.png"
        });

        $('#fechaHora').rup_date({
            datetimepicker: true,
            labelMaskId: 'fecha-mask',
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: true,
            showSecond: false,
            dateFormat: 'dd/mm/yyyy',
            timeFormat: 'hh:mm'

        });


        /*
		 * CONFIGURACION FORMULARIO DE VALIDACIONES
		 */

        $('#tabsValidacion').rup_tabs({
            tabs: [{
                i18nCaption: 'validacionesCliente',
                tabs: [{
                    i18nCaption: 'reglasValidacion',
                    layer: '#divValidaciones'
                }, {
                    i18nCaption: 'validacionComponentes',
                    layer: '#divValidaciones2'
                }]
            }, {
                i18nCaption: 'validacionesServidor',
                tabs: [{
                    i18nCaption: 'formularioServidor',
                    layer: '#divValidaciones3'
                }, {
                    i18nCaption: 'formularioServidor2',
                    layer: '#divValidaciones4'
                }]
            }]
        });

        $('#diaObligatorio').rup_select({
            data: this.listaDias,
            width: 100,
            ordered: false
        });

        jQuery('#feedbackErroresValidaciones').rup_feedback({
            type: 'ok',
            closeLink: true,
            block: false
        });

        function getConfiguracionBasicaValidate() {

            var configuracion_basica_validate = {
                feedback: $('#feedbackErroresValidaciones'),
                liveCheckingErrors: $('#liveCheckingErrors').is(':checked'),
                showFieldErrorAsDefault: $('#checkShowFieldErrorsTip').is(':checked'),
                showErrorsInFeedback: $('#checkFeedbackError').is(':checked'),
                showFieldErrorsInFeedback: $('#checkShowErrorsFeedback').is(':checked')
            };

            return configuracion_basica_validate;
        }



        function getConfiguracionValClienteReglas() {

            var configuracion_form1 = {
                debug: true,
                rules: {
                    'campoObligatorio1': {
                        required: true
                    },
                    'campoObligatorio2': {
                        required: '#esObligatorio:checked'
                    },
                    'campoObligatorio3': {
                        required: function () {
                            return $('#diaObligatorio').val() > 5;
                        }
                    },
                    'longitudMinima': {
                        minlength: 8
                    },
                    'longitudMaxima': {
                        maxlength: 20
                    },
                    'longitudIntervalo': {
                        rangelength: [8, 20]
                    },
                    'valorMinimo': {
                        min: 10
                    },
                    'valorMaximo': {
                        max: 30
                    },
                    'valorIntervalo': {
                        range: [10, 30]
                    },
                    'validacionEmail': {
                        email: true
                    },
                    'validacionUrl': {
                        url: true
                    },
                    'validacionFecha': {
                        date: true
                    },
                    'validacionFechaISO': {
                        dateISO: true
                    },
                    'numeroDecimal': {
                        number: true
                    },
                    'soloDigitos': {
                        digits: true
                    },
                    'tarjetaCredito': {
                        creditcard: true
                    },
                    'extension': {
                        accept: 'xls|csv'
                    },
                    'clave_confirmar': {
                        equalTo: '#clave'
                    },
                    'dni': {
                        dni: true
                    },
                    'palabrasMaximo': {
                        maxWords: 6
                    },
                    'palabrasMinimo': {
                        minWords: 2
                    },
                    'palabrasIntervalo': {
                        rangeWords: [2, 6]
                    },
                    'letrasYPuntuacion': {
                        letterswithbasicpunc: true
                    },
                    'alfanumerico': {
                        alphanumeric: true
                    },
                    'soloLetras': {
                        lettersonly: true
                    },
                    'sinEspacios': {
                        nowhitespace: true
                    },
                    'entero': {
                        integer: true
                    },
                    'patron': {
                        pattern: '\\d'
                    }
                }
            };

            return $.extend(getConfiguracionBasicaValidate(), configuracion_form1);
        }

        function getConfiguracionValClienteCampos() {
            var configuracion_form2 = {
                rules: {
                    'autocomplete': {
                        required: true
                    },
                    'provincia': {
                        required: true
                    },
                    'comarca': {
                        required: true
                    },
                    'localidad': {
                        required: true
                    },
                    'gender': {
                        required: true
                    },
                    'agree': {
                        required: true
                    },
                    'notificacion[]': {
                        required: true,
                        minlength: 2
                    },
                    'multicombo': {
                        required: true
                    },
                    'lenguaje': {
                        required: true
                    },
                    'lenguajeMulti': {
                        required: true,
                        rangelength: [2, 3]
                    }
                }
            };

            return $.extend(getConfiguracionBasicaValidate(), configuracion_form2);
        }


        function getConfiguracionValServidorEjemplo1() {
            var configuracion_validate3 = {
                feedback: $('#feedbackErroresValidaciones'),
                validate: getConfiguracionBasicaValidate(),
                url: $.rup.CTX_PATH + '/patrones/validacion/servidor',
                success: function () {
                    $('#feedbackErroresValidaciones').rup_feedback('set', 'El formulario se ha enviado correctamente mediante un submit AJAX', 'ok');
                }
            };

            return configuracion_validate3;
        }


        function getConfiguracionValServidorEjemplo2() {
            var configuracion_validate4 = {
                feedback: $('#feedbackErroresValidaciones'),
                validate: getConfiguracionBasicaValidate(),
                url: $.rup.CTX_PATH + '/patrones/validacion/servidor2',
                success: function (json) {
                    $('#feedbackErroresValidaciones').rup_feedback('set', $.rup_utils.printMsg(json), 'ok');
                }
            };

            return configuracion_validate4;
        }

        var ajaxForm = {
            success: function () {
                $('#feedbackErroresValidaciones').rup_feedback('set', 'El formulario se ha enviado correctamente.', 'ok');
            }
        };
        $('#formValidaciones').rup_validate(getConfiguracionValClienteReglas());
        $('#formValidaciones').ajaxForm(ajaxForm);
        $('#formValidaciones2').rup_validate(getConfiguracionValClienteCampos());
        $('#formValidaciones2').ajaxForm(ajaxForm);
        $('#formServidor').rup_form(getConfiguracionValServidorEjemplo1());
        $('#formServidor2').rup_form(getConfiguracionValServidorEjemplo2());
        $('#botonConfiguracion').bind('click', function () {
            $('#formValidaciones').rup_validate('destroy');
            $('#formValidaciones2').rup_validate('destroy');
            $('#formServidor').rup_validate('destroy');
            $('#formServidor').rup_form('destroy');
            $('#formServidor2').rup_validate('destroy');
            $('#formServidor2').rup_form('destroy');
            $('#formValidaciones').rup_validate(getConfiguracionValClienteReglas());
            $('#formValidaciones').ajaxForm(ajaxForm);
            $('#formValidaciones2').rup_validate(getConfiguracionValClienteCampos());
            $('#formValidaciones2').ajaxForm(ajaxForm);
            $('#formServidor').rup_form(getConfiguracionValServidorEjemplo1());
            $('#formServidor2').rup_form(getConfiguracionValServidorEjemplo2());

        });
    }
    return ValidateTestView;
});