var MemoryStore = function(url, successCallback, errorCallback) {

    var self = this;
    $.ajax(url)
        .done(function(data) {
            self.employees = data.employees;
            console.log("Store initialized");
            if (successCallback) successCallback();
        });

    this.findAll = function(callback) {
        callback(this.employees);
    }

    this.findByName = function(searchKey, callback) {
        var results = this.employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.indexOf(searchKey) > -1;
        });
        callback(results);
    }

    this.findById = function(id, callback) {
        var employees = this.employees;
        console.log(employees);
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                console.log('found employee');
                callback(employees[i]);
                return;
            }
        }
        callback(null);
    }

}