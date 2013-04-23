var MemoryStore = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var employee = null;
        var l = employees.length;
        for (var i=0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        deferred.resolve(employee);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = employees.filter(function(element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        deferred.resolve(results);
        return deferred.promise();
    }

    var employees = [
        {"id": 1, "firstName": "James", "lastName": "King", "title": "President and CEO"},
        {"id": 2, "firstName": "Julie", "lastName": "Taylor", "title": "VP of Marketing"},
        {"id": 3, "firstName": "Eugene", "lastName": "Lee", "title": "CFO"},
        {"id": 4, "firstName": "John", "lastName": "Williams", "title": "VP of Engineering"},
        {"id": 5, "firstName": "Ray", "lastName": "Moore", "title": "VP of Sales"}
    ];

}