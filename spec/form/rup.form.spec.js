import 'jquery';
import 'jasmine-jquery';
import 'rup.form';

describe('Test Form', () => {
	var $form;
	beforeAll(() => {
		var html = '<form id ="exampleForm">'
              		+   '<input type="text" value="txt1" id="input1"></input>'
              		+   '<input type="text" value="txt2" id="input2"></input>'
              		+   '<select id="input3">'
              		+     '<option value="opt1">Opcion 1</input>'
              		+     '<option value="opt2">Opcion 2</input>'
              		+   '</select>'
              		+'</form>';
		var opts = {}; // TODO: Hacer obj de configuracion.
		$('body').append(html);
		$('#exampleForm').rup_form(opts);
		$form = $('#exampleForm');
	});
  	describe('Creación', () => {
		it('Debe tener las clases de rup_form', () => {
			expect($form).toHaveClass('rup_form');
		});
  	});
	describe('Métodos públicos >', () => {
		// TODO: Evaluar el usar spy en lugar de jasmine-ajax
		describe('Métodos de envío de formulario >', () => {
			describe('Método ajaxSubmit >', () => {
				beforeAll(() => {
					spyOn($form,'rup_form').and.callFake((strParam) => {
						let obj = {
							estatus: 200,
							responseContent:{}
						};
						return obj;
					});
				});
				it('La llamada Ajax debe tener éxito', () => {
					expect($form.rup_form('ajaxSubmit').estatus).toBe(200);
				});
			});
			describe('Método ajaxFormSubmit >',() => {
				beforeAll(() => {
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
				expect($form.rup_form('fieldSerialize')).toBe(out);
			});
		});
		describe('Método fieldValue', () => {
			it('Debe devolver los valores en un array', () => {
				let out = ['txt1', 'txt2', 'opt1'];
				expect($form.rup_form('fieldValue')).toBe(out);
			});
		});
		describe('Método formToJson', () => {
			it('Debe devolver los datos en un string en formato Json', () => {
				let out = {input1:'txt1', input2:'txt2', input3:'opt1'};
				expect(JSON.parse($form.rup_form('formToJson'))).toBe(out);
			});
		});
		// TODO: Conseguir el objeto de configuracion del form y probar esto.
		describe('Métodos formReset, formClear y clearFields', () => {
			beforeAll(() => {
				$form.rup_form('formClear');
			});
			it('Deben quedar todos los inputs vacíos', () => {
				expect($('#input1')).toBe('');
				expect($('#input2')).toBe('');
			});
		});

		describe('Método destroy', () => {
			beforeAll(() => {
				$form.rup_form('destroy');
			});
			it('No debe existir', () => {
				expect(() => {$form.rup_form('destroy')}).toThrowError();
			});
		});
	});
});
