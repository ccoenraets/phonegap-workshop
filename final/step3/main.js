var app = {

    initialize: function() {
        var self = this;
        this.store = new MemoryStore('../data.json', function() {
            $('body').html(new HomeView(self.store).render().el);
        });
    }

};

app.initialize();