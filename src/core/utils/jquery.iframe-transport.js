/*
 * jQuery Iframe Transport Plugin 1.2.4
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint unparam: true, nomen: true */
/*global jQuery, document */

(function ($) {
	'use strict';

	// Helper variable to create unique names for the transport iframes:
	var counter = 0;

	// The iframe transport accepts three additional options:
	// options.fileInput: a jQuery collection of file input fields
	// options.paramName: the parameter name for the file form data,
	//  overrides the name property of the file input field(s)
	// options.formData: an array of objects with name and value properties,
	//  equivalent to the return data of .serializeArray(), e.g.:
	//  [{name: 'a', value: 1}, {name: 'b', value: 2}]
	$.ajaxTransport('iframe', function (options) {
		if (options.async && (options.type === 'POST' || options.type === 'GET')) {
			var form,
				iframe;
			return {
				send: function (_, completeCallback) {
					form = $('<form style="display:none;"></form>');
					// javascript:false as initial iframe src
					// prevents warning popups on HTTPS in IE6.
					// IE versions below IE8 cannot set the name property of
					// elements that have already been added to the DOM,
					// so we set the name along with the iframe HTML markup:

					if (options.url.indexOf('emulate_iframe_http_status') !==-1 && options.dataType.indexOf('iframe') !== -1){
                    	options.dataType = options.dataType.split(' ')[1];
                    	options.dataTypes = options.dataTypes.slice(1);
					}

					var xhr = { // mock object
                			aborted: 0,
                			responseText: null,
                			responseXML: null,
                			status: 200,
                			statusText: 'success',
                			getAllResponseHeaders: function() {},
                			getResponseHeader: function() {},
                			setRequestHeader: function() {},
                			abort: function(status) {
                				var e = (status === 'timeout' ? 'timeout' : 'aborted');
                				log('aborting upload... ' + e);
                				this.aborted = 1;
                				$io.attr('src', s.iframeSrc); // abort op in progress
                				xhr.error = e;
                				s.error && s.error.call(s.context, xhr, e, status);
                				g && $.event.trigger('ajaxError', [xhr, s, e]);
                				s.complete && s.complete.call(s.context, xhr, e);
                			}
                		};


					iframe = $(
						'<iframe src="javascript:false;" name="iframe-transport-' +
																												(counter += 1) + '"></iframe>'
					).on('load', function () {
						var fileInputClones;
						iframe
							.off('load')
							.on('load', function () {
								var response;
								// Wrap in a try/catch block to catch exceptions thrown
								// when trying to access cross-domain iframe contents:
								try {


                                	response = iframe.contents();





                                	var frame = response;

                                	var doc = frame;
                                	var docRoot = $(document).find('body');
                                	var documentContent, isTextArea;
                					// see if user embedded response in textarea
                					try {
                						documentContent = $($(doc).text());
                						isTextArea = documentContent.is('textarea');
                					}catch(e){
                						isTextArea = false;
                					}
                					if (isTextArea) {
										//                						xhr.responseText = documentContent.text();
                						// support for XHR 'status' & 'statusText' emulation :
                						xhr.status = Number( documentContent.attr('status') ) || xhr.status;

                						xhr.statusText = documentContent.attr('statusText') || xhr.statusText;

                						xhr.responseText = {'json': documentContent.text()};
                					}else{

                						xhr.responseText = {'iframe': response};
										// Google Chrome and Firefox do not throw an
										// exception when calling iframe.contents() on
										// cross-domain requests, so we unify the response:
										if (!response.length || !response[0].firstChild) {
											throw new Error();
										}
                					}




								} catch (e) {
									response = undefined;
								}
								// The complete callback returns the
								// iframe content document as response object:
								completeCallback(
									xhr.status,
									xhr.statusText,
									xhr.responseText
								);
								// Fix for IE endless progress bar activity bug
								// (happens on form submits to iframe targets):
								$('<iframe src="javascript:false;"></iframe>')
									.appendTo(form);
								form.remove();
							});
						form
							.prop('target', iframe.prop('name'))
							.prop('action', options.url)
							.prop('method', options.type);
						if (options.formData) {
							$.each(options.formData, function (index, field) {
								$('<input type="hidden"/>')
									.prop('name', field.name)
									.val(field.value)
									.appendTo(form);
							});
						}
						if (options.fileInput && options.fileInput.length &&
																																options.type === 'POST') {
							fileInputClones = options.fileInput.clone();
							// Insert a clone for each file input field:
							options.fileInput.after(function (index) {
								return fileInputClones[index];
							});
							if (options.paramName) {
								options.fileInput.each(function () {
									$(this).prop('name', options.paramName);
								});
							}
							// Appending the file input fields to the hidden form
							// removes them from their original location:
							form
								.append(options.fileInput)
								.prop('enctype', 'multipart/form-data')
							// enctype must be set as encoding for IE:
								.prop('encoding', 'multipart/form-data');
						}
						form.submit();
						// Insert the file input fields at their original location
						// by replacing the clones with the originals:
						if (fileInputClones && fileInputClones.length) {
							options.fileInput.each(function (index, input) {
								var clone = $(fileInputClones[index]);
								$(input).prop('name', clone.prop('name'));
								clone.replaceWith(input);
							});
						}
					});
					form.append(iframe).appendTo(document.body);
				},
				abort: function () {
					if (iframe) {
						// javascript:false as iframe src aborts the request
						// and prevents warning popups on HTTPS in IE6.
						// concat is used to avoid the "Script URL" JSLint error:
						iframe
							.off('load')
							.prop('src', 'javascript'.concat(':false;'));
					}
					if (form) {
						form.remove();
					}
				}
			};
		}
	});

	// The iframe transport returns the iframe content document as response.
	// The following adds converters from iframe to text, json, html, and script:
	$.ajaxSetup({
		converters: {
			'iframe text': function (iframe) {
				return iframe.find('body').text();
			},
			'iframe json': function (iframe) {
				return JSON.parse(iframe.find('body').text());
			},
			'iframe html': function (iframe) {
				return iframe.find('body').html();
			},
			'iframe script': function (iframe) {
				return $.globalEval(iframe.find('body').text());
			}
		}
	});

}(jQuery));
