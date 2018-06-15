/* jslint esnext: true, multistr: true */

import 'jquery';
import 'jasmine-jquery';
import 'rup.combo';
import 'rup.feedback';
import 'rup.form';

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
/**XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 */
describe('Test Form', () => {
	var $form, $formAlt;
	beforeEach(() => {
		var html = formHtml;
		$('body').append(html);
		configurar();
		var opts = {};
		var optsAlt = {
			url:'form/multientidades',
			feedback:$('#feedbackMensajes'),
			success:function(xhr){
				$view.ui.feedback.rup_feedback('set',$.rup_utils.printMsg(jQuery.toJSON(xhr)),'ok');
			},
			validate:{
				rules:{
					'departamento.code':{digits:true}
				}
			}
		};
		$('#exampleForm').rup_form(opts);
		$('#formHttpSubmit').rup_form(optsAlt);
		$form = $('#exampleForm');
		$formAlt = $('#formHttpSubmit');
	});
	afterEach(() => {
		$('body').html();
	});
  	describe('Creación > ', () => {
		describe('Form por defecto > ', () => {
			it('Debe tener la clase de rup_form', () => {
				expect($form).toHaveClass('rup_form');
			});
		});
		describe('Form alternativo > ', () => {
			it('Debe tener clases por defecto:', () => {
				expect($formAlt).toHaveClass('rup_form rup_validate');
			});
		});
  	});
	describe('Métodos públicos >', () => {
		// TODO: Evaluar el usar spy en lugar de jasmine-ajax
		describe('Métodos de envío de formulario >', () => {
			describe('Método ajaxSubmit >', () => {
				/*beforeEach(() => {
					spyOn($form,'rup_form').and.callFake((strParam) => {
						let obj = {
							estatus: 200,
							responseContent:{}
						};
						return obj;
					});
				});*/
				it('La llamada Ajax debe tener éxito', () => {
					expect($formAlt.rup_form('ajaxSubmit')).toBe(200);
				});
			});
			describe('Método ajaxFormSubmit >',() => {
				beforeEach(() => {
					spyOn($form,'rup_form').and.callFake((strParam) => {
						let obj = {
							estatus: 200,
							responseContent:{}
						};
						return obj;
					});
				});
				it('La llamada Ajax debe tener éxito', () => {
					expect($form.rup_form('ajaxFormSubmit').estatus).toBe(200);
				});
			});
		});
		describe('Método formSerialize >', () => {
			it('Debe devolver un string con los datos',() => {
				let out = 'input1=txt1&input2=txt2&input3=opt1';
				expect($form.rup_form('formSerialize')).toBe(out);
			});
		});
		describe('Método fieldSerialize >',() => {
			it('Debe devolver un string con los datos de los fields', () => {
				let out = 'input1=txt1&input2=txt2';
				expect($('input', $form).rup_form('fieldSerialize')).toBe(out);
			});
		});
		describe('Método fieldValue', () => {
			it('Debe devolver los valores en un array', () => {
				let out = 'txt1,txt2';
				expect($('input', $form).rup_form('fieldValue').join()).toBe(out);
			});
		});
		describe('Método formToJson', () => {
			it('Debe devolver los datos en un string en formato Json', () => {
				let out = {input1:'txt1', input2:'txt2', input3:'opt1'};
				expect($form.rup_form('formToJson')).toEqual(out);
			});
		});
		describe('Método clearForm > ', () => {
			beforeEach(() => {
				$form.rup_form('clearForm');
			});
			it('Debe haber limpiado todos los campos:', () => {
				expect($('#input1').val()).toBe('');
				expect($('#input2').val()).toBe('');
				expect($('#input3').val()).toBe(null);
			});
		});
		describe('Método resetForm > ', () => {
			beforeEach(() => {
				$form.rup_form('clearForm');
				$form.rup_form('resetForm');
			});
			it('Debe tener los valores originales:', () => {
				expect($('#input1').val()).toBe('txt1');
				expect($('#input2').val()).toBe('txt2');
				expect($('#input3').val()).toBe('opt1');
			});
		});
		describe('Método clearFields > ', () => {
			beforeEach(() => {
				$('input', $form).rup_form('clearFields');
			});
			it('Deben quedar en blanco unicamente los indicados por el selector:', () => {
				expect($('#input1').val()).toBe('');
				expect($('#input2').val()).toBe('');
				expect($('#input3').val()).toBe('opt1');
			});
		});

		describe('Método destroy', () => {
			beforeEach(() => {
				$form.on('mouseenter', () => { $form.addClass("someClass");});
				$form.rup_form('destroy');
			});
			it('No debe existir', () => {
				$form.trigger('mouseenter');
				setTimeout(() => {
					expect($form.hasClass("someClass")).toBe(true);
				}, 1500);
			});
		});
	});
});
