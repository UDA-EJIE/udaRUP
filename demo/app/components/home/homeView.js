App.Views = App.Views || {};
    
App.Views.Home = Backbone.View.extend({
    el: '#container',
    render: function() {
        var template = App.Templates["app/components/home/home.hbs"];
        this.$el.html(template({}));
    }

});