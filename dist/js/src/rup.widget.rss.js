/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

/*global define */
/*global jQuery */

(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			'jquery',
			'jquery-ui/widget',
			'rup/widget',
			'rup/utils',
			'rup/xhr',
			'templates',
			'rup/validate'
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function($) {

	function RssFeed() {
	}

	function RssChannel() {
	}

	function RssItem() {
	}

	// Animal methods
	RssFeed.prototype = {
		channel: []
	};

	RssChannel.prototype = {
		title:'',
		link:'',
		description:'',
		items:[]

	};

	RssItem.prototype = {
		title:'',
		link:'',
		content:'',
		pubDate:null
	};



	// define our widget under a namespace of your choice
	// with additional parameters e.g.
	// $.widget( "namespace.widgetname", (optional) - an
	// existing widget prototype to inherit from, an object
	// literal to become the widget's prototype );

	$.widget('rup.widget_rss', $.rup.widget, {
		options:{
			path: 'widgets',
			widgetName: null,
			templateObj: null,
			require: null,
			jsonObj:null,
			reloadButton:false,
			url: null,
			rssFeed: null
		},
		_createConfigureDialog: function(){
			var $self = this,
				options = $self.options,
				$el = $self.element,
				ui = $self.ui,
				$ui = $self.$ui,
				$configDialog,
				configDialogId;


			configDialogId = $self.widgetName+'_'+$self.uuid;
			$configDialog = $('<div>').attr('id', configDialogId);

			// En el caso de que el widget requiera de configuración
			if (options.configure.requiredByUser===true && options.configure._configuredByUser!==true){
				$self._createConfigRequiredLayer();
				$self.showConfigRequired();
			}

			// Añadimos el diálogo en el DOM junto al widget.
			$el.parent().append($configDialog);

			// Se crea el diálogo con el componente RUP Dialog.
			$configDialog.rup_dialog($.extend({},$self._configure, {
				bodyTemplate: $self._configure.template,
				title: eval('$.rup.i18n.app.'+options.configure.title),
				bodyData: $self._configure.data
			}));
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
					}

					if (typeof($self._configure.script.serialize) !== 'undefined' && $.isFunction($self._configure.script.serialize)){
						$self._configure.fncSerializeConfig = $self._configure.script.serialize;
					}

				});
			}

			// Gestion botones
			$('#configOk', $self.$configDialog).on('click', function(){
				function doOk(){
					$self.options.configure._configurationData = $self.serializeConfig();
					if ($self.options.configure.requiredByUser === true && $self.options.configure._configuredByUser !== true){
						$self.hideConfigRequired();
						$self.options.configure._configuredByUser = true;
					}
					$el.triggerHandler('widgetConfigured.widget.rup', $self.options.configure._configurationData);
					$self.$configDialog.rup_dialog('hide');
				}

				if ($self.$ui.configure.$form.is('.rup-validate')){
					var valid = $self.$ui.configure.$form.valid();
					if (valid===true){
						$.proxy(doOk, $self)();
						recalculaTitulo($el,true);
					}
				}else{
					$.proxy(doOk, $self)();
					recalculaTitulo($el,true);
				}
			});
		},
		_preInitializeContainer: function(){
			var $self = this,
				ops = $self.options;

			if (ops.require!==null){
				templateObj = $.rup_utils.getTemplateObj(ops.templateObj, require(ops.require));
			}else{
				templateObj = $.rup_utils.getTemplateObj(ops.templateObj);
			}

			$self._configure = $self._configure || {};

			$self._configure.template = templateObj[ops.widgetName+'/config/template'];

			$self._configure.data = $.rup_utils.getTemplateObj('Json')[ops.widgetName+'/config/data_'+$.rup.i18n.getLanguage()];

			$self._configure.script = ops.path+'/'+ops.widgetName+'/config/script.js';

			//            $self._configure.script = $.rup_utils.getTemplateObj("Scripts")[ops.widgetName+"/config/script"];

			//            this._getScript(ops.configScript, function(){
			//                $.proxy(callback)($el);
			//            });

		},
		_initializeBody: function(){
			var $self = this,
				$el = $self.element,
				ops = this.options,
				template,
				templateObj,
				i18nJson,
				script;


			if (ops.require!==null){
				templateObj = $.rup_utils.getTemplateObj(ops.templateObj, require(ops.require));
			}else{
				templateObj = $.rup_utils.getTemplateObj(ops.templateObj);
			}

			template = templateObj[ops.widgetName+'/template'];

			i18nJson = $.rup_utils.getTemplateObj('Json')[ops.widgetName+'/data_'+$.rup.i18n.getLanguage()];

			$self.$ui.$widgetBody.append(template(i18nJson));
			$self.$ui.$widgetBody.parent().addClass('rssBottom');

			//script = $.rup_utils.getTemplateObj("Scripts")[ops.widgetName+"/script"];

			//            $.proxy(script.callback, $self)($el, i18nJson);
			if (null!==ops.defaultHeight)
				$($el.parent()).attr('data-default-height',ops.defaultHeight);
			if (null!==ops.defaultWidth)
				$($el.parent()).attr('data-default-width',ops.defaultWidth);

			// Se procede a crear el diálogo de configuración a partir de las propiedades con las que se ha inicializado el widget
			/*   if (ops.buttons.btnConfig===true){

                $self.$ui.configure = $self.$ui.configure || {};
                $self._createConfigureDialog();
            }*/

			$self._getScript(ops.path+'/'+ops.widgetName+'/script.js').done(function(){
				$.proxy(callback)($el, i18nJson);
			});

		},
		reload: function(){
			this.loadAjax();
		},
		getOptions: function(){
			return this.options;
		},
		getConfigData: function(){
			return this.options.configure._configurationData;
		},
		loadAjax: function(url,tipo,concat){
			var $self = this,
				$el = $self.element,
				data = this.getConfigData(),
				$body = $('.widget-body', $el),
				options = this.options,
				//$rssFeed = this.rssFeed,
				urlAcceso = url!=null?url:options.url;
			if (null==tipo){
				tipo = 'GET';
			}

			if (null!=urlAcceso){
				$self.showLoading();

				var RupXhr = require('rup/xhr');

				RupXhr.getInstance().doAjax({
					//                $.ajax({
					url: urlAcceso,
					method: tipo,
					cache:false,
					//data:data,
					// dataType : 'xml',
					dataType : 'xml',
					data: JSON.stringify(data),
					contentType : 'application/json',

					success: function(data, textStatus, jqXHR){
						var $XML = $(data);
						var $rssFeed = new RssFeed();
						var template=null;
						var $channel = [];
						$XML.find('channel').each(function(){
							var $channelXML = $(this),
								$rssChannel = new RssChannel();

							$rssChannel.title = $channelXML.find('title').text();
							$rssChannel.link = $channelXML.find('link').text();
							$rssChannel.description = $channelXML.find('description').text();
							var $items = [];
							$channelXML.find('item').each(function() {
								var $item = $(this),
									$rssItem = new RssItem();
								$rssItem.title = $item.find('title').text();
								$rssItem.link = $item.find('link').text();
								$rssItem.source = $item.find('source').text();
								$rssItem.comments = $item.find('comments').text();
								$rssItem.content = $item.find('content:encoded').text();
								$rssItem.pubDate = $item.find('pubDate').text();

								$items.push($rssItem);
							});
							$rssChannel.items = $items;
							$channel.push($rssChannel);


						});
						$rssFeed.channel = $channel;
						var templateObj = $.rup_utils.getTemplateObj(options.templateObj, require(options.require));
						template = templateObj[options.widgetName+'/template'];
						$self.$ui.$widgetBody.empty();
						if (concat){
							var bodyOld = $self.$ui.$widgetBody.html();
							$($self.$ui.$widgetBody).empty().append(template($rssFeed)).append(bodyOld);
						}else{
							$($self.$ui.$widgetBody).empty().append(template($rssFeed));
						}
						$rssFeed.channel=null;
						$rssFeed=null;

					},
					complete: function(){
						$self.hideLoading();
						$($self.$ui.$widgetBody).triggerHandler('widget.rss.loadAjax.end');
						recalculaTitulo($el,true);
						$self.serializeFilter();
					},
					xhrFields: {
						withCredentials: true
					}
				});
			}
		},
		volcadoURL: function(urlAcceso){
			if (null!=urlAcceso){
				var $self = this, options = this.options, template;

				$self.showLoading();

				var RupXhr = require('rup/xhr');

				RupXhr.getInstance().doAjax({
					//                $.ajax({
					url: urlAcceso,
					method: 'GET',
					cache:false,
					dataType: 'jsonp xml',
					//dataType: "xml",
					success: function(data, textStatus, jqXHR){
						$self.$ui.$widgetBody.empty().append('sdata');
					},
					complete: function(){
						$self.hideLoading();
					},
					xhrFields: {
						withCredentials: true
					}
				});
			}
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

	$.widget.bridge('rup_widget_rss', $.rup.widget_rss);

}));
