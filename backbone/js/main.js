AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "list",
        "employees/:id":    "employeeDetails"
    },

    list: function() {
        $('#mainArea').html(this.searchView.el);
    },

    employeeDetails: function(id) {
        var employee = new Employee({id: id});
        $('#mainArea').html(new EmployeeView({model: employee}).el);
        employee.fetch();
    },

    initialize: function() {

        var self = this;

        // We keep a single instance of the SearchView and its associated Employee collection throughout the app
        this.employees = new EmployeeCollection();
        this.searchView = new EmployeeSearchView({model: this.employees});

        // Register event listener for back button throughout the app
        $('#content').on('click', '.header-back-button', function(event) {
            window.history.back();
            return false;
        });

        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('#content').on('touchstart', 'a', function(event) {
                self.selectItem(event);
            });
            $('#content').on('touchend', 'a', function(event) {
                self.deselectItem(event);
            });
        } else {
            // ... if not: register mouse events instead
            $('#content').on('mousedown', 'a', function(event) {
                self.selectItem(event);
            });
            $('#content').on('mouseup', 'a', function(event) {
                self.deselectItem(event);
            });
        }

    },

    selectItem: function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $(event.target).removeClass('tappable-active');
    }

});

app = {};
app.db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
app.employeeDAO = new EmployeeDAO(app.db);
app.employeeDAO.initialize(function() {
    app.router = new AppRouter();
    Backbone.history.start();
});
