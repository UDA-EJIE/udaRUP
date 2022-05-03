
 function generateFormEditDatatable(callback) {
     createDatatable1(0, callback);
 }

 function clearDatatable(done) {
     if ($('[id*="contextMenu"], [id*="context-menu"]').length > 0) {
         $('.context-menu, .context-menu-active').rup_contextMenu('destroy');
         $.contextMenu('destroy');
     }

     $('.dataTable').on('destroy.dt', () => {
         $('#content').html('');
         $('#content').nextAll().remove();
         setTimeout(() => {
             done();
         }, 500);
     });

     if ($('.rup-feedback').length > 0) {
         setTimeout(() => {
             $('.dataTable').DataTable().destroy();
         }, $('.dataTable').DataTable().settings().context[0].oInit.feedback.okFeedbackConfig.delay + 1);
     } else {
         $('.dataTable').DataTable().destroy();
     }
 }

 function testDatatable() {
     describe('Test DataTable > ', () => {

      /*   beforeAll((done) => {
             testutils.loadCss(done);
         });*/

         beforeEach((done) => {
             generateFormEditDatatable(done);
         });

         afterEach((done) => {
        	 setTimeout(() => {
            	 clearDatatable(done);
             }, 1500); 
         });
         
       describe('Funcionamiento > ', () => {
	       describe('Menú contextual Edición en formulario > ', () => {
	           beforeEach(() => {
	               $('tbody > tr:eq(0) > td:eq(1)', $('#example')).contextmenu();
	           });
	
	           it('Debe mostrarse el menú contextual:', () => {
	               expect($('#contextMenu2').is(':visible')).toBeTruthy();
	           });
	           
	             it('Debe tener los items esperados y solo el add debe estar habilitado:', () => {
		             expect($('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').length)
		                 .toBe(1);
		             expect($('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar.disabledButtonsTable').length)
		                 .toBe(1);
		             expect($('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar.disabledButtonsTable').length)
		                 .toBe(1);
		             expect($('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar.disabledButtonsTable').length)
		                 .toBe(1);
		             expect($('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar.disabledButtonsTable').length)
		                 .toBe(1);
	             });

		         it('Los items deben ser visibles:', () => {
		             expect($('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
		             expect($('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
		             expect($('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
		             expect($('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
		             expect($('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar').is(':visible')).toBeTruthy();
		         });
              describe('Funcionalidades de los items de contextMenu > ', () => {
            	  describe('Item añadir > ', () => {
		              describe('Item mostrar formulario > ', () => {
		                  beforeEach(() => {
		                      $('#contextMenu2 > #exampleaddButton_1_contextMenuToolbar').mouseup();
		                      $('#id_detail_table').val('008');
		                      $('#nombre_detail_table').val('Ana');
		                      $('#apellido1_detail_table').val('García');
		                      $('#fechaAlta_detail_table').val('25/05/2019');
		                      $('#example_detail_button_save').click();
		                  });
		
		                  it('Debe aparecer el formulario:', () => {
		                      expect($('#example_detail_div').is(':visible')).toBeTruthy();
		                  });
		
		              });
		              
		              describe('Item añadir 008> ', () => {
		                  it('Debe Insertar el nuevo Registro 008:', () => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '008'
								});
		                      expect(1).toBe(row.length);
		                  });
	              });
            	  });
	              
            	  describe('Item clone > ', () => {
		              describe('Item clone aparece el formulario > ', () => {
		                  beforeEach(() => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '008'
								});
		                      row.click();
		                      $('#contextMenu2 > #examplecloneButton_1_contextMenuToolbar').mouseup();
		                      $('#id_detail_table').val('009');
		                      $('#fechaAlta_detail_table').val('28/05/2019');
		                      $('#example_detail_button_save').click();
		                      
		                  });
		                  
		                  it('Debe aparecer el formulario:', () => {
		                      expect($('#example_detail_div').is(':visible')).toBeTruthy();
		                      expect($('#nombre_detail_table').val()).toBe('Ana');
		                  });
		
		              }); 
		              
		              describe('Item clone 009> ', () => {
		                  it('Debe Insertar el nuevo Registro 009:', () => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '009'
								});
		                      expect(1).toBe(row.length);
		                  });
		              });
            	  });
	
	
	              describe('Item editar > ', () => {
	                  beforeEach(() => {
	                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
								return $(this).text() === '008'
							});
	                      row.click();
	                      $('#contextMenu2 > #exampleeditButton_1_contextMenuToolbar').mouseup();
	                      $('#nombre_detail_table').val('Berta');
	                      $('#apellido1_detail_table').val('Sandoval');
	                      $('#example_detail_button_save').click();
	                  });
	
	                  it('Debe aparecer el formulario:', () => {
	                      expect($('#example_detail_div').is(':visible')).toBeTruthy();
	                      expect($('#nombre_detail_table').val()).toBe('Berta');
	                  });
	              });
	
	              describe('Item delete > ', () => {
		              describe('Item seleccionar eliminados > ', () => {
		                  beforeEach(() => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '008'
								});
		                      row.click();
		                      row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '009'
								});
		                      row.click();
		                      $('#contextMenu2 > #exampledeleteButton_1_contextMenuToolbar').mouseup();
		                      $('.ui-dialog-buttonset > button.btn-material:contains(Aceptar)').click();
		                  });
		
		                  it('Debe eliminar las líneas:', () => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '008'
								});
		                      expect(row.parent().hasClass('selected')).toBe(true);
		                  });
		              }); 
		              
		              describe('Item verificar eliminados > ', () => {
		                  it('verificar eliminados:', () => {
		                      var row = $('#example > tbody  tr :nth-child(2)').filter(function() {
									return $(this).text() === '008'
								});
		                      expect(0).toBe(row.length);
		                  });
		              });
	              });
	
	              describe('Item copy > ', () => {
	                  beforeEach((done) => {
	                      $('#content').append('<textarea rows="5" cols="100" id="testutilInput"></textarea>');
	                      $('#example > tbody > tr:eq(0) > td:eq(0)').click();
	                      $('#contextMenu2 > #examplecopyButton_1_contextMenuToolbar').mouseup();
	                      $('div.ui-dialog-buttonset > button:contains("' + $.rup.i18n.base.rup_global.aceptar + '")').click();
	
	                      setTimeout(() => {
	                          done();
	                      }, 500);
	                  });
	
	                  it('Debe haber el contenido de la primera fila contenido la zona de copiado', () => {
	                	  expect($('#table_buttons_info textarea').val().indexOf($('#example > tbody  tr:eq(0) td:eq(1)').text()) !== -1).toBe(true);
	                  });
	              }); 
          });
	       });
       });

      });
 }

 testDatatable();