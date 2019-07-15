/**
 * @fileOverview
 * @author EJIE
 * @version 1.0.0
 */

/*global define */
/*global jQuery */

(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			'jquery',
			'handlebars',
			'./templates',
			'jquery-ui/widget',
			'./rup.base',
			'./rup.utils',
			'./rup.message',
			'./rup.dialog'

			// "rup/loading",
			// "rup/message",
			// "rup/dialog",
			// "rup/form",
			// "rup/combo",
			// "rup/autocomplete",
			// "rup/utils",
			// "rup/date",
			// "rup/validate",
			// "rup/carousel"
		], factory );
	} else {

		// Browser globals
		factory( jQuery, Handlebars );
	}
}(function($, Handlebars) {

	/**
    * Componente widget genérico.
    *
    * @namespace rup.widget
    * @property {object} $ui - Almacena las referencias a los diferentes elementos que conforman la interfaz de usuario.
    * @property {jQuery} $ui.$widgetBody - Referencia al cuerpo del widget.
    * @property {jQuery} $ui.$btnClose - Referencia al botón de cerrar el widget.
    * @property {jQuery} $ui.$btnReload - Referencia al botón de recargar el contenido del widget.
    * @property {jQuery} $ui.$btnConfig - Referencia al botón de abrír el diálogo de configuración del widget.
    * @property {jQuery} $ui.$btnResizeFull - Referencia al botón de maximizar el widget.
    * @property {jQuery} $ui.$btnResizeSmall - Referencia al botón de minimizar el widget.
    */
	$.widget('rup.widget', {


		/**
        * Opciones por defecto del componente.
        *
        * @name rup.widget#options
        * @property {Integer} [minWidth=6] - Anchura mínima que puede mostrar el widget.
        * @property {String} [title=Título Widget] - Título que va a mostrar el widget.
        * @property {object} buttons - Permite configurar si se deben de visualizar los botones del widget.
        * @property {boolean} [buttons.btnClose=true] - Determina si se muestra o no el botón de cerrar.
        * @property {boolean} [buttons.btnReload=true] - Determina si se muestra o no el botón de recargar.
        * @property {boolean} [buttons.btnConfig=true] - Determina si se muestra o no el botón de configurar.
        * @property {boolean} [buttons.btnResizeFull=true] - Determina si se muestra o no el botón de maximizar el widget.
        * @property {object} configure - Permite personalizar el diálogo de configuración del widget.
        * @property {object} configure.title - Titulo a mostrar en el diálogo de configuración del widget.
        * @property {object} configure.template - Especifica una template que se utilizará para renderizar el HTML que mostrará el diálogo.
        * @property {object} configure.data - Especifica el fichero json que se utilizará para obtener los valores de las variables de la template.
        * @property {object} configure.script - Permite especificar un script que se ejecutará una vez se haya renderizado el contenido del diálogo a partir de la template.
        */
		options: {

			minWidth: 4,
			minHeight: 4,
			defaultWidth:4,
			defaultHeight:6,
			title: 'Título Widget',
			buttons:{
				btnClose: true,
				btnReload: true,
				btnConfig: true,
				btnResizeFull: true,
				btnShow: true,
				btnInfo: true
			},
			ui:{
				widgetBody:'.widget-body',
				btnClose:'#widgetClose',
				btnReload:'#widgetReload',
				btnConfig:'#widgetConfig',
				btnResizeFull:'#widgetResizeFull',
				btnResizeSmall:'#widgetResizeSmall',
				btnShowHide:'#widgetShow',
				btnInfo:'#widgetInfo'
			},
			configure: {
				title: 'Configuración',
				requiredByUser: true,
				template: null,
				templateData: {},
				data: null,
				script: null,
				_configuredByUser: false,
				_configurationData: null

			},
			_hidden:false
			//            ,configTemplate: null,
			//            ,configData: null,
			//            ,configScript: null
		},
		/**
        * El método _create de ejecuta automáticamente la primera vez que se invoca el widget.<br/>
        * Para facilitar la configuración se ejecutan en el siguiente orden estos métodos:<br/>
        * <ul>
        *   <li>_preInitializeContainer</li>
        *   <li>_initializeContainer</li>
        *   <li>_initializeBody</li>
        * </ul>
        *
        * @name rup.widget#_create
        * @function
        * @private
        *
        */
		_create: function () {
			this._preInitializeContainer();
			this._initializeContainer();
			this._initializeBody();
		},
		/**
        * Función que se ejecuta antes que el método _initializeContainer. <br/>
        * Su finalidad es la de permitir a widgets que extiendan de este ejecutar código antes de la inicialización por defecto.
        *
        * @name rup.widget#_preInitializeContainer
        * @function
        * @private
        */
		_preInitializeContainer: function(){

		},
		/**
        * Función principal en la inicialización del widget. <br/>
        * Su finalidad es la de permitir a widgets que extiendan de este ejecutar código antes de la inicialización por defecto.
        *
        * @name rup.widget#_preInitializeContainer
        * @function
        * @private
        */
		_initializeContainer: function(){
			var $self = this,
				$el = $(this.element),
				options = this.options,
				ui = options.ui,
				$ui = {},
				uuid = $self.uuid,
				template = Rup.Templates.rup.widget.base;

			var infoText = '';
			if ( null!= options&& null!= options.infoText){
				infoText = eval('$.rup.i18n.app.'+options.infoText);
			}

			$el.append(template($.extend({},options, {uuid:uuid,infoTextNew:infoText})));

			// Se almacena la referencia interna de los elementos de la interfaz de usuario.
			$ui = {
				$widgetBody: $el.find(ui.widgetBody),
				$btnClose: $el.find(ui.btnClose+'-'+uuid),
				$btnReload: $el.find(ui.btnReload+'-'+uuid),
				$btnConfig: $el.find(ui.btnConfig+'-'+uuid),
				$btnResizeFull: $el.find(ui.btnResizeFull+'-'+uuid),
				$btnResizeSmall: $el.find(ui.btnResizeSmall+'-'+uuid),
				$btnShowHide: $el.find(ui.btnShowHide+'-'+uuid),
				$btnInfo: $el.find(ui.btnInfo+'-'+uuid)
			};

			// Se definen los eventos de los elementos de la interfaz de usuario.
			$ui.$btnClose.on('click', $.proxy($self.fncBtnCloseClick, $self));
			$ui.$btnReload.on('click', $.proxy($self.fncBtnReloadClick, $self));
			$ui.$btnResizeFull.on('click', $.proxy($self.fncBtnResizeFullClick, $self));
			$ui.$btnResizeSmall.on('click', $.proxy($self.fncBtnResizeSmallClick, $self));
			$ui.$btnConfig.on('click', $.proxy($self.fncBtnConfigClick, $self));
			$ui.$btnShowHide.on('click', $.proxy($self.fncbtnShowHideClick, $self));

			$self.$ui = $ui;
			// Se inicializan los componentes visuales del diálogo de configuración

			$self._configure = $self._configure || {};

			// Se procede a crear el diálogo de configuración a partir de las propiedades con las que se ha inicializado el widget
			if (options.buttons.btnConfig===true && $self._configure.template!== null){

				$ui.configure = $ui.configure || {};
				$self._createConfigureDialog();
			}
			//Tooltip en el botón "info"
			$ui.$btnInfo.tooltip({
				'html':true
			});


		},
		/**
        * Función que se ejecuta después que el método _initializeContainer. <br/>
        * Su finalidad es la de permitir a los widgets que extiendan de este, ejecutar el código que cree e inicialice el cuerpo del widget.
        *
        * @name rup.widget#_initializeBody
        * @function
        * @private
        */
		_initializeBody: function(){
		},
		_createConfigureDialog: function(){
			var $self = this,
				options = $self.options,
				$el = $self.element,
				ui = $self.ui,
				$ui = $self.$ui,
				$configDialog,
				configDialogId,
				configTemplate,
				configTemplateData,
				$templateObj;


			configDialogId = $self.widgetName+'_'+$self.uuid;
			$configDialog = $('<div>').attr('id', configDialogId);

			// En el caso de que el widget requiera de configuración

			if (options.configure.requiredByUser===true && options.configure._configuredByUser!==true){
				$self._createConfigRequiredLayer();
				$self.showConfigRequired();
			}

			// Añadimos el diálogo en el DOM junto al widget.
			$el.parent().append($configDialog);
			// Insertamos el contenido del body
			configTemplate = options.configure.template;
			configTemplateData = options.configure.templateData;
			if (typeof configTemplate === 'string'){
				var $templateObj = $(configTemplate);
				if ($templateObj.length>0){
					var source = $templateObj.html();
					var compiledTemplate = Handlebars.compile(source);
					$configDialog.append(compiledTemplate(configTemplateData));
				}
			}else if (typeof template === 'function'){
				$configDialog.append(configTemplate(configTemplateData));
			}

			// Se crea el diálogo con el componente RUP Dialog.
			$configDialog.rup_dialog({
				type: $.rup.dialog.DIV,
				autoOpen: false,
				modal: true,
				resizable: true,
				// appendTo :'#container',
				title: 'Configuración',
				buttons: [{
					text: 'Aceptar',
					click: function () {
						$view.ui.dialog.dialog('close');
					}
				},
				{
					text: 'Enviar',
					click: function () {
						$view.ui.dialog.dialog('close');
					}
				},
				{
					text: 'Cancelar',
					click: function () {
						$view.ui.dialog.dialog('close');
					},
					btnType: $.rup.dialog.LINK
				}
				]

			});
			// $configDialog.rup_dialog($.extend({},$self._configure, {
			//     bodyTemplate: $self._configure.template,
			//     title: eval("$.rup.i18n.app."+options.configure.title),
			//     bodyData: $self._configure.data,
			//     type:"alert"
			// }));
			$self.$configDialog = $configDialog;



			$self.$ui.configure.$dialog = $configDialog;
			$self.$ui.configure.$form = $configDialog.find('form');
			$self.$ui.configure.$form.rup_form({});



			if ($self._configure.script !== null && $self._configure.script !== undefined){
				//
				//                $self._configure.script.callback($el, $self.$ui.configure.$dialog);
				//                $.proxy($self._configure.script.callback, $self)($el, $self.$ui.configure.$dialog);
				// En caso de existir configuración asociada se inicializa con ella
				$self._getScript($self._configure.script).done(function(){

					$.proxy(callback)($el, $self.$configDialog, $self._configure.data);

					if (options.configure._configurationData!==null){
						$self.$ui.configure.$form.rup_form('populate', options.configure._configurationData);
						setTimeout(function(){$self.serializeFilter();}, 2000);
					}

					if (typeof($self._configure.script.serialize) !== 'undefined' && $.isFunction($self._configure.script.serialize)){
						$self._configure.fncSerializeConfig = $self._configure.script.serialize;
					}

				});
			}

			// Gestion botones
			$('#configOk', $self.$configDialog).on('click', function(event){


				function doOk(){
					$self.options.configure._configurationData = $self.serializeConfig();
					if ($self.options.configure.requiredByUser === true && $self.options.configure._configuredByUser !== true){
						$self.hideConfigRequired();
						$self.options.configure._configuredByUser = true;
					}
					$el.triggerHandler('widgetConfigured.widget.rup', $self.options.configure._configurationData);
					$self.$configDialog.rup_dialog('close');
				}

				if ($self.$ui.configure.$form.is('.rup-validate')){
					var valid = $self.$ui.configure.$form.valid();
					if (valid===true){
						$.proxy(doOk, $self)();
						recalculaTitulo($el,true);
						$self.serializeFilter();
					}
				}else{
					$.proxy(doOk, $self)();
					recalculaTitulo($el,true);
					$self.serializeFilter();
				}

			});
		},
		_createConfigRequiredLayer: function(){
			var $self = this,
				$el = $(this.element),
				template = Rup.Templates.rup.widget.configRequired,
				titulo = $self.options.title,
				urlConsulta = $self.options.urlConsulta,
				$html;

			var textoTitle = '';
			if (null!==titulo && undefined!==titulo&& ''!==titulo){
				textoTitle = $.rup.i18n.app.title.necesario;
				textoTitle = textoTitle.replace('{0}',titulo);
			}
			var textoUrlConsulta ='';
			if (null!==urlConsulta && undefined!==urlConsulta&& ''!==urlConsulta){
				var url = eval('$.rup.i18n.app.'+urlConsulta);
				textoUrlConsulta = $.rup.i18n.app.comons.rupWidget.urlConsulta;
				textoUrlConsulta = textoUrlConsulta.replace('{0}',url);
			}
			$html = $(template({titulo:textoTitle,urlConsulta:textoUrlConsulta}));

			$el.parent().append($html);

			$('#btnConfigRequired', $html).on('click', function(){
				$self.showConfig();
			});

			$('#btnDelete', $html).on('click', function(){
				$self.close();
			});

			$self._configure.$configRequiredLayer = $html;
		},
		serializeConfig: function(){
			var $self = this,
				$configForm = $self.$ui.configure.$form;


			// TODO: GEstionar en caso de que no haya un formulario
			if ($.isFunction($self._configure.fncSerializeConfig)){
				return $.proxy($self._configure.fncSerializeConfig, $self)($self,  $self.$ui.configure.$dialog, $configForm);
			}else{
				return $configForm.rup_form('serialize');
			}

		},
		// Destroy an instantiated plugin and clean up
		// modifications the widget has made to the DOM
		destroy: function () {

			// this.element.removeStuff();
			// For UI 1.8, destroy must be invoked from the
			// base widget
			$.Widget.prototype.destroy.call( this );
			// For UI 1.9, define _destroy instead and don't
			// worry about
			// calling the base widget
		},
		minHeight: function(val){
			this.element.triggerHandler('rup.widget.minHeight', [val]);
		},
		resize: function(width, height){
			this.element.triggerHandler('rup.widget.resize', [width, height]);
		},
		remove: function(){
			this.destroy();
			this.element.triggerHandler('rup.widget.removed');
		},
		getOptions: function(){
			return this.options;
		},
		getConfigData: function(){
			return this.options.configure._configurationData;
		},
		close: function(){
			var $self = this;

			$.rup_messages('msgConfirm', {
				title: $.rup.i18n.app.comons.rupWidget.confirmaAccion,
				message: $.rup.i18n.app.comons.rupWidget.deseaEliminar,
				OKFunction: function(){
					$self.element.triggerHandler('rup.widget.closed');
				}
			});


		},
		reload: function(){
			var $self = this,
				$el = $(this.element);
			$el.triggerHandler('widgetConfigured.widget.rup', $self.options.configure._configurationData);
		},
		showConfig: function(){
			var $self = this,
				$el = $(this.element),
				options = this.options,
				$configDialog;

			// if (options.configure._configurationData!==null){
			//     var validator = $self.$ui.configure.$form.validate();
			//     validator.resetForm();
			//     $(".rup-feedback", $self.$ui.configure.$dialog).removeAttr("style");
			//     $self.$ui.configure.$form.rup_form("populate", options.configure._configurationData);
			// }
			$self.$ui.configure.$dialog.rup_dialog('open');
			$el.triggerHandler('printConfig');
		},
		showConfigRequired: function(){
			var $self = this;

			$self._configure.$configRequiredLayer.show();
			$self.element.addClass('blurred-widget-content');


		},
		hideConfigRequired: function(){
			var $self = this;

			$self.element.removeClass('blurred-widget-content');
			$self._configure.$configRequiredLayer.hide();

		},
		showLoading: function(){
			if (this.element.parent().data('rupLoading')===undefined){
				this.element.parent().rup_loading({});
			}else{
				this.element.parent().rup_loading('show');
			}
		},
		hideLoading: function(){
			this.element.parent().rup_loading('hide');
		},

		_getScript: function(path, fncCallback){
			var $self = this, ops = this.options;
			//                path = ops.path+"/"+ops.widgetName+"/script.js";

			if (path !==undefined){
				//                return $.ajax({
				//                    url: path,
				//                    success: function(xhr, arg2, arg3){
				//                        jQuery.globalEval(xhr);
				////                        if ($.isFunction(fncCallback)){
				////                            $.proxy(fncCallback, $self)();
				////                        }
				//                    }
				//                });

				return $.getScript(path)
					.done($.isFunction(fncCallback)?fncCallback:function(){})
					.fail(function( jqxhr, settings, exception ) {
						// FIX: Tratamiento del error
						//                    console.log("ERRRRRORRR _getScript");
					});
			}
		},

		// Respond to any changes the user makes to the
		// option method
		_setOption: function ( key, value ) {
			switch ( key ) {
			case 'someValue':
				// this.options.someValue = doSomethingWith( value );
				break;
			default:
																// this.options[ key ] = value;
				break;
			}

			// For UI 1.8, _setOption must be manually invoked
			// from the base widget
			$.Widget.prototype._setOption.apply( this, arguments );
			// For UI 1.9 the _super method can be used instead
			// this._super( "_setOption", key, value );
		},
		fncBtnCloseClick: function(){
			this.close();
		},
		fncBtnReloadClick: function(){
			this.reload();
		},
		fncBtnResizeFullClick: function(){
			//$("[id*='widgetShow']", $(this.$ui.$widgetBody).parent()).attr("style","display:none;");
			this.element.parent().addClass('widget-resize-full');
			if (this.element.parent().hasClass('displayNone'))
				this.element.parent().removeClass('displayNone').addClass('displayNoneFake');
			//Ocultar ojo
			this.$ui.$btnShowHide.attr('style','display:none;');
			this.$ui.$btnClose.attr('style','display:none;');
		},
		fncBtnResizeSmallClick: function(){
			//$("[id*='widgetShow']", $(this.$ui.$widgetBody).parent()).removeAttr("style");
			this.element.parent().removeClass('widget-resize-full');
			if (this.element.parent().hasClass('displayNoneFake'))
				this.element.parent().removeClass('displayNoneFake').addClass('displayNone');
			//Ocultar ojo
			this.$ui.$btnShowHide.removeAttr('style');
			this.$ui.$btnClose.removeAttr('style');
		},
		fncBtnConfigClick: function(){
			this.showConfig();
		},
		execDashboard: function(args){
			this.element.triggerHandler('rup.widget.execFunction', args);
		},
		getDashboardWidgetOptions: function(){
			return this.element.triggerHandler('rup.widget.getDashboardWidgetOptions');
		},
		fncbtnShowHideClick: function(event, ui){
			var $padre = this.element.parent(),
				widgetOpts;

			this.element.parent().addClass('hidden-content');
			if (this.options._hidden===false){
				// this.options._previousMinHeight =
				widgetOpts = this.getDashboardWidgetOptions();

				this.element.parent().addClass('hidden-content');
				this.options._previousMinHeight = widgetOpts.minHeight;
				this.options._previousHeight = widgetOpts.height;
				this.minHeight(1);
				this.resize(null, 1);
				this.options._hidden = true;
			}else{
				this.element.parent().removeClass('hidden-content');
				this.minHeight(this.options._previousMinHeight);
				this.resize(null, this.options._previousHeight);
				this.options._hidden = false;
			}

			// this.element.parent().css("height","40px");

		},serializeFilter: function(){
			var $self = this;
			var data =$self.serializeConfig();
			var $formulario = $self.$ui.configure.$form;
			var final = '';
			var excluidos = {};
			for(var key in data) {
				var vuelta = '';
				if (!$('[name="'+key+'"]', $formulario).hasClass('noFeedback')){
					var id = $('[name="'+key+'"]', $formulario).attr('id');
					var name = $('[name="'+key+'"]', $formulario).attr('name');
					var campo = $('[for="'+name+'"]', $formulario).html();
					if (undefined==campo){
						campo = $('[for="'+id+'"]', $formulario).html();
					}
					var tipo = '';
					if (null!==$('[name="'+key+'"]', $formulario) && null!==$('[name="'+key+'"]', $formulario).attr('multiple')
																				&& undefined!==$('[name="'+key+'"]', $formulario).attr('multiple')){
						if (null!=$('[name="'+key+'"]', $formulario)
																												&&null!=$('[name="'+key+'"]', $formulario).val()
																												&&undefined!=$('[name="'+key+'"]', $formulario).val()
																												&&[]!=$('[name="'+key+'"]', $formulario).val()
																												&&0<$('[name="'+key+'"]', $formulario).val().length){
							valor = $('[name="'+key+'"]', $formulario).val().length;
							valor = valor+ ' '+$.rup.i18n.app.comons.rup_combo.seleccionados;
							vuelta = campo+': '+valor;
						}
					}else{
						if ($('[name="'+key+'"]', $formulario).is(':radio')) {
							$('[name="'+key+'"]', $formulario).each(function(){
								if (data[key]==$(this).val()){
									valor = $(this).parent().html();
									if (undefined!=valor && null!=valor&&''!=valor){
										valor = valor.substr(valor.lastIndexOf('>')+1,valor.length).trim();
									}
									vuelta = campo+': '+valor;
								}
							});
						}else if ($('[name="'+key+'"]', $formulario).is(':checkbox')) {
							if (data[key]=='on'){
								valor =$('[for="'+key+'"]', $formulario).html();
								vuelta =valor;
							}

							//"combo"==$("#comboFamilia").attr("data-rup-type")
						}else if ('combo'==$('[name="'+key+'"]', $formulario).attr('data-rup-type')) {

							$('[name="'+key+'"]', $formulario).find('option').each(function(){
								if ($(this).val()==data[key]){
									valor = $(this).html();
								}
							});
							vuelta = campo+': '+valor;
						}else {
							if (null!=$('[name="'+key+'"]', $formulario)
																																&&null!=$('[name="'+key+'"]', $formulario).val()
																																&&undefined!=$('[name="'+key+'"]', $formulario).val()
																																&&''!=$('[name="'+key+'"]', $formulario).val().trim()){
								valor = $('[name="'+key+'"]', $formulario).val();
								vuelta = campo+': '+valor;
							}
						}

					}
					if (''!==vuelta){
						final = final+vuelta+'; ';
					}
				}
			}
			$('.widget-feedback', $($($self.$ui.$widgetBody)[0]).parent()).html('<i>'+final+'</i>');
		}
	});
	$.widget.bridge('rup_widget', $.rup.widget );
}));
function recogeObjetoArray(){
	var arrayNew = [],arrayNew2 = [];
	var contador =0;
	$('.grid-stack-item').each(function(i,v){
		var elemento = {};
		elemento.posicion = i;
		elemento.x = $(this).attr('data-gs-x');
		elemento.y = $(this).attr('data-gs-y');
		elemento.width = $(this).attr('data-gs-width');
		elemento.height = $(this).attr('data-gs-height')==0?1:$(this).attr('data-gs-height');
		arrayNew.push(elemento);
	});
	arrayNew2 = arrayNew.sort(function(a, b){

		//Nesario todo el tocho de 3 alternativas para IE que espera de vvuelta un número
		if((Number(a.y)==Number(b.y)&&Number(a.x)>Number(b.x))||Number(a.y)>Number(b.y)) return 1;
		if(!((Number(a.y)==Number(b.y)&&Number(a.x)>Number(b.x))||Number(a.y)>Number(b.y))) return -1;
		return 0;

	});
	return arrayNew2;
}


function ocupaEspacio(listaAOrdenar){
	if(listaAOrdenar!==null && listaAOrdenar.length>2){
		//var aj0 = listaAOrdenar[0];
		//aj0.x="0";
		//listaAOrdenar[0] = aj0;
		for (var i = 0;i<listaAOrdenar.length;i++){
			listaAOrdenar[i] =ocupaPrevios(listaAOrdenar,i);
		}
	}

	return listaAOrdenar;
}
function ocupaPrevios( listaAOrdenar,  i){
	var aj = listaAOrdenar[i];
	var maxheightPosition =0;
	var cambio = false;
	for (var j=0;j<i;j++){
		var ajBucle = listaAOrdenar[j];
		var hAj = Number(ajBucle.height)==0?1:Number(ajBucle.height);
		if (Number(aj.y)==Number(ajBucle.y)){
			if ((Number(aj.x)==Number(ajBucle.x))|| (Number(aj.x)>Number(ajBucle.x) && Number(aj.x) <= (Number(ajBucle.x)+Number(ajBucle.width)))){
				aj.y = Number(ajBucle.y)+hAj+1;
				aj.x = 0;//Añadido test
			}

		}else if (Number(aj.y)==(Number(ajBucle.y)+hAj+1)){
			if ((Number(aj.x)==ajBucle.x) || (aj.x>ajBucle.x && aj.x<=(Number(ajBucle.x)+Number(ajBucle.width)))){
				cambio = true;
				if(maxheightPosition< ((Number(ajBucle.y)+hAj))){
					aj.y = (Number(ajBucle.y)+hAj);
					maxheightPosition = (Number(ajBucle.y)+hAj);
				}else{
					aj.y = maxheightPosition;
				}
				aj.x = 0;//Añadido test
			}
		}else if (Number(aj.y)<(Number(ajBucle.y)+hAj)){
			cambio = true;
			if(maxheightPosition< ((Number(ajBucle.y)+hAj))){
				aj.y = (Number(ajBucle.y)+hAj);
				maxheightPosition = (Number(ajBucle.y)+hAj);
			}else{
				aj.y = maxheightPosition;
			}
			aj.x = 0;//Añadido test
		}

		if ((Number(aj.x)==Number(ajBucle.x))|| (Number(aj.x)>Number(ajBucle.x) && Number(aj.x) <= (Number(ajBucle.x)+Number(ajBucle.width)))){
			if (maxheightPosition<Number(ajBucle.y)+hAj){
				maxheightPosition=Number(ajBucle.y)+hAj;
			}
		}

	}
	if (!cambio||maxheightPosition <aj.y ){
		aj.y = maxheightPosition;
	}
	return aj;
}

function ordenarPaneles(){

	var listaAOrdenar = recogeObjetoArray();


	volcarObjetoArray(ocupaEspacio(listaAOrdenar));
}
function tapaAlgunOtro(listaAOrdenar, j, aj1){

	for(var w=0;w<listaAOrdenar.length;w++){
		//$("#gridStack").data('gridstack').data._fix_collisions(listaAOrdenar[i]);

		if (j!==w){
			var wElement = listaAOrdenar[w];
			if (Number(aj1.y)<=Number(wElement.y) && ( Number(aj1.y) + Number(aj1.height))>=Number(wElement.y)){
				wElement.y = Number(aj1.y)+ Number(aj1.height)+1;
				listaAOrdenar[w] =wElement;
				//  listaAOrdenar = tapaAlgunOtro(listaAOrdenar, w, wElement)
			}
		}
		if (w ==listaAOrdenar-1){
			return listaAOrdenar;
		}
	}



}

function volcarObjetoArray(listaAOrdenar){
	// calculoPosicion*X
	var calculoPosicion = Number(listaAOrdenar[listaAOrdenar.length-1].y) +Number(listaAOrdenar[listaAOrdenar.length-1].height);
	var numeroPxs = Number(calculoPosicion*95);//+(Number(listaAOrdenar.length)*60);//60 más por widget
	//Cell_height definido a 80
	$('.grid-stack-item').each(function(i,v){
		var _self = $(this);
		var result = listaAOrdenar.filter(function( obj ) {
			if (obj.posicion == i)
				return obj;
		});
		_self.removeAttr('style');
		_self.attr('data-gs-x',result[0].x);

		_self.attr('data-gs-y',result[0].y);

		_self.attr('data-gs-width',result[0].width);

		_self.attr('data-gs-height',result[0].height);
		$($('#gridStack').data('gridstack').grid.nodes).each(function(i2,v2){
			//            $("#gridStack").data('gridstack').grid._fix_collisions($("#gridStack").data('gridstack').grid.nodes[i2]);
			if ($('.widget',$(this)[0].el).attr('id')===$('.widget',_self).attr('id')){
				$('#gridStack').data('gridstack').grid.nodes[i2].x = result[0].x;
				$('#gridStack').data('gridstack').grid.nodes[i2].y = result[0].y;
				$('#gridStack').data('gridstack').grid.nodes[i2].width = result[0].width;
				$('#gridStack').data('gridstack').grid.nodes[i2].height = result[0].height;
				$('#gridStack').data('gridstack').grid.nodes[i2].el = _self;
				$('#gridStack').data('gridstack').update(_self,result[0].x,result[0].y,result[0].width,result[0].height);
				//function(el, x, y, width, height)
			}
			if ($('#gridStack').data('gridstack').grid.nodes.length==i2+1
																&& $('.grid-stack-item').length == i+1  ) {
				$('#gridStack').data('gridstack')._update_styles(calculoPosicion);
				//$("#gridStack").attr("style","height:"+numeroPxs+"px");
				//$("#gridStack").data('gridstack')._update_container_height();
				setTimeout(function(){
					$('#gridStack').data('gridstack')._update_container_height();
					var elements = $('#gridStack').data('gridstack').grid.get_dirty_nodes();
					$('#gridStack').data('gridstack').container.trigger('change', [elements]);
					$('#gridStack').attr('style','height:'+numeroPxs+'px');
				},100);
			}
		});


	});
}
