(function($) {
$.fn.numeric = function(decimal, callback)
{
	decimal = (decimal === false) ? "" : decimal || ".";
	callback = typeof callback == "function" ? callback : function(){};
	var campo = $(this);
	
	this.bind('paste', function(e) {
		setTimeout(function() {
			var valorCampo = campo.val();
			if (decimal===""){
				var regExp =/[^\d]/;
			}else{
				var regExp = new RegExp("[^\\d"+decimal+"]");
			}
			if(regExp.test(valorCampo)){
				campo.val('');
			}
	    }, 0);
    });
	return this.data("numeric.decimal", decimal).data("numeric.callback", callback).keypress($.fn.numeric.keypress).blur($.fn.numeric.blur);
};

$.fn.numeric.keypress = function(e)
{
	var decimal = $.data(this, "numeric.decimal");
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	// permitir enter/return (solo cuando esta en la caja de texto)
	if(key == 13 && this.nodeName.toLowerCase() == "input")
	{
		return true;
	}
	else if(key == 13)
	{
		return false;
	}
	var allow = false;
	// permitir Ctrl+A
	if((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
	// permitir Ctrl+X (cut)
	if((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
	// permitir Ctrl+C (copy)
	if((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
	// permitir Ctrl+Z (undo)
	if((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
	// permitir o deengar Ctrl+V (paste), Shift+Ins
	if((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
	|| (e.shiftKey && key == 45)) return true;
	// si no se ha presionado un numero
	if(key < 48 || key > 57)
	{
		/* '-' solo permitido al inicio */
		if(key == 45 && this.value.length == 0) return true;
		/* solo se permite un separador de decimales */
		if(decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1)
		{
			allow = false;
		}
		// detectar teclas especiales
		if(
			key != 8 /* backspace */ &&
			key != 9 /* tab */ &&
			key != 13 /* enter */ &&
			key != 35 /* end */ &&
			key != 36 /* home */ &&
			key != 37 /* left */ &&
			key != 39 /* right */ &&
			key != 46 /* del */
		)
		{
			allow = false;
		}
		else
		{
			if(typeof e.charCode != "undefined")
			{
				if(e.keyCode == e.which && e.which != 0)
				{
					allow = true;
					if(e.which == 46) allow = false;
				}
				else if(e.keyCode != 0 && e.charCode == 0 && e.which == 0)
				{
					allow = true;
				}
			}
		}
		if(decimal && key == decimal.charCodeAt(0))
		{
			if(this.value.indexOf(decimal) == -1)
			{
				allow = true;
			}
			else
			{
				allow = false;
			}
		}
	}
	else
	{
		allow = true;
	}
	return allow;
};

$.fn.numeric.blur = function()
{
	var decimal = $.data(this, "numeric.decimal");
	var callback = $.data(this, "numeric.callback");
	var val = $(this).val();
	if(val != "")
	{
		var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
		if(!re.exec(val))
		{
			callback.apply(this);
		}
	}
};

$.fn.removeNumeric = function()
{
	return this.data("numeric.decimal", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
};

})(jQuery);