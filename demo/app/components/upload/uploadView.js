define(['marionette',
        'templates',
        'rup/upload'], function(Marionette, App){

  var UploadView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.upload.uploadTemplate,
    ui:{
      uploadTabs: "#uploadTabs",
      feedback_fileupload_form: "#feedback_fileupload_form",
      feedback_fileupload_form_multiple: "#feedback_fileupload_form_multiple",
      usuarioForm: "#usuarioForm",
      usuarioFormSimple: "#usuarioFormSimple",
      fileupload_only: "#fileupload_only",
      fileupload: "#fileupload",
      fileupload_form: "#fileupload_form",
      fileupload_pif_form: "#fileupload_pif_form",
      fileupload_file_form_padre: "#fileupload_file_form_padre",
      fileupload_file_form_madre: "#fileupload_file_form_madre"
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){
    var $view = this;

    // Definicion de las pestanas
  	$view.ui.uploadTabs.rup_tabs({
  		tabs : [ {
  			i18nCaption : "upload",
  			layer : "#fileupload_only"
  		}, {
  			i18nCaption : "uploadFormSimple",
  			layer : "#fileupload_form"
  		}, {
  			i18nCaption : "uploadFormMultiple",
  			layer : "#fileupload_form_multiple"
  		}, {
  			i18nCaption : "uploadFormPif",
  			layer : "#fileupload_pif_form"
  		}
  		]
  	});

  	// Creacion de los componentes feedback
  	$view.ui.feedback_fileupload_form.rup_feedback();
  	$view.ui.feedback_fileupload_form_multiple.rup_feedback();


  	// Se utiliza jquery.form para realizar el submit de los formularios por AJAX
  	$view.ui.usuarioForm.ajaxForm(function(){
  		$view.ui.feedback_fileupload_form.rup_feedback("set","Los datos se han enviado correctamente");
  	});

  	$view.ui.usuarioFormSimple.ajaxForm(function(){
  		$view.ui.feedback_fileupload_form_multiple.rup_feedback("set","Los datos se han enviado correctamente");
  	});

  	// Creacion de los diferentes componentes Upload



  	// Upload simple
  //	$('#fileupload_only').rup_upload({
  //		fileInput: $("#file_only"),
  //		maxFileSize: 5000000
  //	});


  	$view.ui.fileupload_only.rup_upload({
  //		fileInput: $("#file_only"),
  		// Uncomment the following to send cross-domain cookies:
  		//xhrFields: {withCredentials: true},
  		url: '../upload'
  		});

  	$view.ui.fileupload.rup_upload({
  //		fileInput: $("#file_only"),
  		// Uncomment the following to send cross-domain cookies:
  		//xhrFields: {withCredentials: true},
  		url: '../upload'
  		});


  	// Upload integrado en formulario
  	$view.ui.fileupload_form.rup_upload({
  		fileInput: $("#file_form"),
  		submitFormButton: $("#sendButton"),
  		maxFileSize: 5000000,
  		submitInForm:true
  	});

  	// Upload integrado en formulario
  	$view.ui.fileupload_pif_form.rup_upload({
  		fileInput: $("#file_pif_form"),
  		url: "../pifServlet",
  		pif:{
  			folderPath: "/x21a",
  			fileTtl: 60,
  			preserveName:true
  		}
  	});


  //	// Dos controles Upload intergrados en un mismo formulario
  	$view.ui.fileupload_file_form_padre.rup_upload({
  		form:"fileupload_form_multiple",
  		fileInput: $("#file_form_padre"),
  		submitFormButton: $("#sendButtonMultiple"),
  		maxFileSize: 5000000,
  		singleFileUploads:true,
  		submitInForm:true
  	});

  	$view.ui.fileupload_file_form_madre.rup_upload({
  		form:"fileupload_form_multiple",
  		fileInput: $("#file_form_madre"),
  		submitFormButton: $("#sendButtonMultiple"),
  		maxFileSize: 5000000,
  		singleFileUploads:true,
  		submitInForm:true
  	});
  }

  return UploadView;

});
