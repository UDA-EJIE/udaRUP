(function($) {
	$.fn.mousestop={};
	$.fn.mousestop.defaults = {
			delay:300
	};
	
	$.event.special.mousestop = {
		setup : function(data) {
			var self = this, $self = $(this);
			
			$self.data("mousestop",$.extend(true, {}, $.fn.mousestop.defaults, data));
			
			$self.on({
				"mouseenter.rup_mousestop": mouseenterHandler,
				"mouseleave.rup_mousestop": mouseleaveHandler,
				"mousemove.rup_mousestop": mousemoveHandler
			});
		},
		teardown : function() {
			$(this).removeData('mousestop').off('.rup_mousestop');
		}
	};
	
	
	function mouseenterHandler(event){
		var self = this, $self = $(this);
		clearTimeout(self.timeout);
	}
	
	function mouseleaveHandler(event){
		var self = this, $self = $(this);
		clearTimeout(self.timeout);
	}
	
	function mousemoveHandler(event){
		var self = this, $self = $(this);
		
		clearTimeout(self.timeout);
		self.timeout = setTimeout(function(){
			$self.trigger("mousestop", event);
		}, $self.data("mousestop").delay);
	}
	
})(jQuery);