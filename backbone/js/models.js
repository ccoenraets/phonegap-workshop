Employee = Backbone.Model.extend({

    dao: EmployeeDAO

});

// The EmployeeCollection Model
EmployeeCollection = Backbone.Collection.extend({

    dao: EmployeeDAO,

    model: Employee,

    findByName: function(key) {
        var employeeDAO = new EmployeeDAO(app.db),
            self = this;
        employeeDAO.findByName(key, function(data) {
            self.reset(data);
        });
    }

});