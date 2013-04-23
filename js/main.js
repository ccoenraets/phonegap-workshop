var app = {

    findByName: function() {
        this.store.findByName($('.search-key').val()).done(function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        this.store = new WebSqlAdapter();
        this.store.initialize().done(function() {
            console.log("Data store initialized");
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();
