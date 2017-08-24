import * as jQuery from 'jquery';


function AjaxError(jqXHR, textStatus, errorThrown) {
	this.name = 'AjaxError';
	this.message = textStatus;
	this.jqXHR = jqXHR;
	this.errorThrown = errorThrown;
}
AjaxError.prototype = new Error();
AjaxError.prototype.constructor = AjaxError;


function decorateAsJQuery(promise) {
	promise.done = function(fn) {
		return decorateAsJQuery(promise.then(fn));
	};
	promise.fail = function(fn) {
		return decorateAsJQuery(promise.then(null, fn));
	};
	promise.complete = function(fn) {
		return decorateAsJQuery(promise.then(fn, fn));
	};
	return promise;
}

class RupXhrService{

	static get(){

		this.ajax(arguments);

	}

	static ajax(){
		const args = Array.prototype.slice.call(arguments);
		const jqPromise = jQuery.ajax.apply(this, args);
		var promise = new Promise(function(resolve, reject) {
			jqPromise.then(function(data, textStatus, jqXHR) {
				resolve(data);
			}, function(jqXHR, textStatus, errorThrown) {
				reject(new AjaxError(jqXHR, textStatus, errorThrown));
			});
		});
		return decorateAsJQuery(promise);


	}

}


export { RupXhrService };
