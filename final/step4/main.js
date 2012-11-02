var app = {

    registerEvents: function() {
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    },

    initialize: function() {
        var self = this;
        this.registerEvents();
        this.store = new MemoryStore(function() {
            $('body').html(new HomeView(self.store).render().el);
        });
    }

};

app.initialize();