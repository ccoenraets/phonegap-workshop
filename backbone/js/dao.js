var EmployeeDAO = function(db) {

    this.db = db;

    this.findByName = function(key, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM employee e LEFT JOIN employee r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + key + '%'], function(tx, results) {
                    var len = results.rows.length,
                        employees = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        employees[i] = results.rows.item(i);
                    }
                    callback(employees);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error);
            }
        );
    };

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM employee e " +
                    "LEFT JOIN employee r ON r.managerId = e.id " +
                    "LEFT JOIN employee m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    // Populate Employee table with sample data
    this.initialize = function( callback) {
        this.db.transaction(
            function(tx) {
                console.log('Dropping EMPLOYEE table');
                tx.executeSql('DROP TABLE IF EXISTS employee');
                var sql =
                    "CREATE TABLE IF NOT EXISTS employee ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "firstName VARCHAR(50), " +
                    "lastName VARCHAR(50), " +
                    "title VARCHAR(50), " +
                    "managerId INTEGER, " +
                    "city VARCHAR(50), " +
                    "officePhone VARCHAR(50), " +
                    "cellPhone VARCHAR(50), " +
                    "email VARCHAR(50))";
                console.log('Creating EMPLOYEE table');
                tx.executeSql(sql);
                console.log('Inserting employees');
                tx.executeSql("INSERT INTO employee VALUES (1, 'Ryan', 'Howard', 'Vice President, North East', 0, 'New York, NY', '212-999-8888', '212-999-8887', 'ryan@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (2, 'Michael', 'Scott', 'Regional Manager', 1, 'Scranton, PA', '570-865-2536', '570-123-4567', 'michael@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (3, 'Dwight', 'Schrute', 'Assistant Regional Manager', 2, 'Scranton, PA', '570-023-321', '570-635-1122', 'dwight@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (4, 'Jim', 'Halpert', 'Assistant Regional Manager', 2, 'Scranton, PA', '570-255-8989', '570-968-5741', 'jim@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (5, 'Pamela', 'Beesly', 'Receptionist', 2, 'Scranton, PA', '570-999-5555', '570-999-7474', 'pam@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (6, 'Angela', 'Martin', 'Senior Accountant', 2, 'Scranton, PA', '570-555-9696', '570-999-3232', 'angela@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (7, 'Kevin', 'Malone', 'Accountant', 6, 'Scranton, PA', '570-777-9696', '570-111-2525', 'kmalone@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (8, 'Oscar', 'Martinez', 'Accountant', 6, 'Scranton, PA', '570-321-9999', '570-585-3333', 'oscar@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (9, 'Creed', 'Bratton', 'Quality Assurance', 2, 'Scranton, PA', '570-222-6666', '333-8585', 'creed@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (10, 'Andy', 'Bernard', 'Sales Director', 4, 'Scranton, PA', '570-555-0000', '570-546-9999','andy@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (11, 'Phyllis', 'Lapin', 'Sales Representative', 10, 'Scranton, PA', '570-141-3333', '570-888-6666', 'phyllis@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (12, 'Stanley', 'Hudson', 'Sales Representative', 10, 'Scranton, PA', '570-700-6666', '570-777-6666', 'shudson@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (13, 'Meredith', 'Palmer', 'Supplier Relations', 2, 'Scranton, PA', '570-555-8888', '570-777-2222', 'meredith@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (14, 'Kelly', 'Kapoor', 'Customer Service Rep.', 2, 'Scranton, PA', '570-123-9654', '570-125-3666', 'kelly@dundermifflin.com')");
                tx.executeSql("INSERT INTO employee VALUES (15, 'Toby', 'Flenderson', 'Human Resources', 1, 'Scranton, PA', '570-485-8554', '570-996-5577', 'tflenderson@dundermifflin.com')");
            },
            function(tx, error) {
                alert('Transaction error ' + error.message);
            },
            function() {
                if (callback) {
                    callback();
                }
            }
        );
    };

};


// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple local database approach.
Backbone.sync = function(method, model, options) {

    var dao = new model.dao(app.db);

    if (method === "read") {
        if (model.id) {
            dao.findById(model.id, function(data) {
                options.success(data);
            });
        } else if (model.managerId) {
            dao.findByManager(model.managerId, function(data) {
                options.success(data);
            });
        } else {
            dao.findAll(function(data) {
                options.success(data);
            });
        }
    }

};