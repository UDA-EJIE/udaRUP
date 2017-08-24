define(['marionette',
	'./feedbackBodyTemplate.hbs',
	'rup.feedback'], function(Marionette, FeedbackBodyTemplate){

	var FeedbackBodyView = Marionette.LayoutView.extend({
		template: FeedbackBodyTemplate,
		ui:{
			feedbackOk: '#feedbackOk',
			feedbackAlert: '#feedbackAlert',
			feedbackError: '#feedbackError'
		},
		onShow: fncOnShow
	});

	function fncOnShow(){
		var $view = this;

		$view.ui.feedbackOk.rup_feedback({
			message:'<strong>Ok!</strong> Se ha realizado correctamente la acción solicitada.',
			type:'ok'
		});
		$view.ui.feedbackAlert.rup_feedback({
			message:'<strong>Atención!</strong> El resultado de la acción requiere su atención.',
			type:'alert'
		});
		$view.ui.feedbackError.rup_feedback({
			message:'<strong>Error!</strong> Se ha producido un error inesperado.',
			type:'error'
		});
	}

	return FeedbackBodyView;
});
