//LessonContentView
define(['jquery',
    'underscore',
    'backbone',
    'libs/jquery.form'], 
    function(
        $,
        _,
        Backbone,
        JQueryForm) {
    return Backbone.View.extend({
        el:'#lesson-content-wrapper', //TODO << get this fixed up in DOM

        initialize: function(options) {
            options = options || {};
        },

        render: function() {
            this.$el.html(this.model.get('content'));
            this.makeFormsAjax();
            this.initPagination();
            this.ajaxifyAttackHref();
            $(window).scrollTop(0); //work-around til we get the scroll down sorted out
        },
        
        //TODO: reimplement this in custom fashion maybe?
        makeFormsAjax: function () {
            var options = {
                success:this.onAttackExecution.bind(this),
                url: this.model.urlRoot,
                type:'GET'
                // $.ajax options can be used here too, for example: 
                //timeout:   3000 
            };
            //hook forms //TODO: clarify form selectors later
            $("form.attack-form").ajaxForm(options);
        },

        initPagination: function() {
            //console.log(this.$el.find('.lesson-page-wrapper').length + ' pages of content');
            this.currentPage = 0;
            this.$contentPages = this.$el.find('.lesson-page-wrapper');
            if (this.$contentPages.length > 1) {
                this.$contentPages.hide();
                this.$el.find(this.$contentPages[0]).show();
            }
        },

        ajaxifyAttackHref: function() {  // rewrite any links with hrefs point to relative attack URLs             
            var self = this;
            // The current LessonAdapter#getLink() generates a hash-mark link.  It will not match the mask below.
            // Besides, the new MVC code registers an event handler that will reload the lesson according to the route.
            $('form').submit(function(event){
                $.get(this.action, "json")
                    .done(self.reLoadView.bind(self))
                    .fail(function() { alert("failed to GET " + url); });
            });
        },

        onAttackExecution: function(feedback) {
            console.log('attack executed')
            this.renderFeedback(feedback);
        },

        renderFeedback: function(feedback) {
            this.$el.find('feedback').html(feedback);
        },

        addPaginationControls: function() {
//            <div class="panel-body" id="lesson-page-controls">
//              <span class="glyphicon-class glyphicon glyphicon-circle-arrow-left" id="show-prev-hint"></span>
//              <span class="glyphicon-class glyphicon glyphicon-circle-arrow-right" id="show-next-hint"></span>
//              <br/>
//
//            </div>

        }

    });

    
});