App.Views = App.Views || {};

App.Views.Progressbar = Backbone.View.extend({
    el: '#container',
//    events: {
//        "click #btnDialog": "openDialog"
//    },
    render: renderProgressbarView,
//    openDialog:openDialog,
    initialize: function(){
    }
});


function renderProgressbarView(){

    var template = App.Templates["app/components/progressbar/progressbar.hbs"];
    this.$el.html(template({}));

    $("#progressbar").rup_progressbar({
      value: 37
    });


    $("#progressbarLabel").rup_progressbar({
      value: 37,
      label: $.rup.i18n.base.rup_progressbar.progress
    });

    $("#progressbarValueFalse").rup_progressbar({
      value: false,
      label: $.rup.i18n.base.rup_progressbar.loading
    });



}
