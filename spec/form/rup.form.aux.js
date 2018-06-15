const formHtml = '<div id="feedbackMensajes"></div>\
                <div id="tabsFormulario"></div>\
                <div id="divformHttpSubmit">\
                <form name = "exampleForm" id ="exampleForm">\
                    <input type="text" value="txt1" name="input1" id="input1"></input>\
                    <input type="text" value="txt2" name="input2" id="input2"></input>\
                    <select name="input3" id="input3">\
                        <option value="opt1">Opcion 1</input>\
                        <option value="opt2">Opcion 2</input>\
                    </select>\
                </form>\
                <form id="formHttpSubmit" action="form/ejemplo" >\
                <fieldset class="alumnoFieldset">\
                    <legend>Datos personales</legend>\
                    <div class="two-col" >\
                            <div class="col1">\
                            <label for="nombre" class="label">Nombre</label>\
                                <input type="text" name="nombre" class="formulario_linea_input" size="20" id="nombre" />\
                            </div>\
                            <div class="col1">\
                                <label for="apellido1" class="label">Primer apellido</label>\
                                <input type="text" name="apellido1" class="formulario_linea_input" size="30" id="apellido1" />\
                            </div>\
                            <div class="col1">\
                                <label for="apellido2" class="label">Segundo apellido</label>\
                                <input type="text" name="apellido2" class="formulario_linea_input" size="30" id="apellido2" />\
                            </div>\
                    </div>\
                    <div class="two-col" >\
                        <div class="col1">\
                        <label for="sexo" class="label">Sexo</label>\
                            <input type="text" name="sexo" class="formulario_linea_input" id="sexo" />\
                        </div>\
                        <div class="col1">\
                            <label for="fechaNacimiento" class="label">Fecha de nacimiento</label>\
                            <input type="text" name="fechaNacimiento" class="formulario_linea_input" id="fechaNacimiento" />\
                        </div>\
                        <div class="col1">\
                            <label for="telefono" class="label">Telefono</label>\
                            <input type="text" name="telefono" class="formulario_linea_input" id="telefono" />\
                        </div>\
                    </div>\
                    <div class="two-col" >\
                        <div class="col1">\
                        <label for="dni" class="label">DNI</label>\
                            <input type="text" name="dni" class="formulario_linea_input" id="dni" />\
                        </div>\
                    </div>\
                </fieldset>\
                <fieldset class="alumnoFieldset">\
                    <legend>Datos cuenta usuario</legend>\
                    <div class="two-col">\
                        <div class="col1">\
                        <label for="usuario" class="label">Usuario</label>\
                            <input type="text" name="usuario" class="formulario_linea_input" id="usuario" />\
                        </div>\
                        <div class="col1">\
                            <div>\
                        <label for="password" class="label">Contrase&ntilde;a</label>\
                            <input type="password" name="password" class="formulario_linea_input" id="password" />\
                            </div>\
                            <div>\
                            <label for="password_confirm" class="label">Confirmar contrase&ntilde;a</label>\
                            <input type="password" name="password_confirm" class="formulario_linea_input" id="password_confirm" />\
                            </div>\
                        </div>\
                        <div class="col1">\
                        <div>\
                        <label for="email" class="label">Email</label>\
                            <input type="text" name="email" class="formulario_linea_input" id="email" />\
                        </div>\
                        <div>\
                            <label for="email_confirm" class="label">Confirmar email</label>\
                            <input type="text" name="email_confirm" class="formulario_linea_input" id="email_confirm" />\
                        </div>\
                        </div>\
                    </div>\
                </fieldset>\
                <fieldset class="alumnoFieldset">\
                    <legend>Datos domicilio</legend>\
                    <div class="two-col">\
                        <div class="col1">\
                        <label for="nombre" class="label">País</label>\
                        <select path="pais.id" class="formulario_linea_input" id="pais" >\
                            </select>\
                        </div>\
                        <div class="col1">\
                        <label for="autonomia" class="label">Autonomía</label>\
                        <select path="autonomia.id" class="formulario_linea_input" id="autonomia" >\
                            </select>\
                        </div>\
                        <div class="col1">\
                        <label for="provincia" class="label">Provincia</label>\
                            <input type="text" name="provincia.id" class="formulario_linea_input" id="provincia" />\
                        </div>\
                    </div>\
                    <div class="two-col">\
                        <div class="col1">\
                        <label for="municipio" class="label">Municipio</label>\
                            <input type="text" name="municipio.id" class="formulario_linea_input" size="30" id="municipio" />\
                        </div>\
                        <div class="col1">\
                        <label for="calle" class="label">Calle</label>\
                            <input type="text" name="calle.id" class="formulario_linea_input" size="50" id="calle" />\
                        </div>\
                    </div>\
                </fieldset>\
                <input type="submit" value="Enviar" />\
                </form>';

function configurar() {
    $('#feedbackMensajes').rup_feedback({
        type: 'ok',
        closeLink: true,
        delay: 1000,
        fadeSpeed: 500,
         block:true
    });
    $('#sexo').rup_combo({
        source : [
            {i18nCaption: 'masculino', value:'M'},
            {i18nCaption: 'femenino', value:'F'}
        ],
        i18nId:'sexo'
    });
    $('#pais').rup_combo({
        source : 'api/nora/pais',
        sourceParam : {label:'dsO', value:'id'},
        blank : '0'
    });
    $('#autonomia').rup_combo({
        source : 'api/nora/autonomia',
        sourceParam : {label:'dsO', value:'id'},
        width : 400,
        blank : ''
    });
    $('#provincia').rup_combo({
        parent: ['autonomia'],
        source : '../api/nora/provincia',
        firstLoad:[{'value':'01','label':'Alava/Araba'},{'value':'20','label':'Gipuzkoa'},{'value':'48','label':'Bizkaia'}],
        sourceParam : {label:'dsO', value:'id'},
        width : 300,
        blank : ''
    });
    $('#municipio').rup_autocomplete({
        source : '../api/nora/municipio',
        sourceParam : {label:'dsO', value:'id'},
        minLength: 4
    });
    $('#calle').rup_autocomplete({
        source : '../api/nora/calle',
        sourceParam : {label:'dsO', value:'id'},
        minLength: 4
    });
}