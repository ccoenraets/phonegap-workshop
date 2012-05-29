var app = {};

app.db = window.openDatabase("EmployeeDB", "1.0", "Employee Demo DB", 200000);
app.dao = new EmployeeDAO(app.db);

app.showHomeView = function() {
    var html =
        '<div class="search-bar"><input type="search" id="searchKey"/></div>' +
        '<div class="scroll striped">' +
        '<ul id="list" class="tableview tableview-links"></ul>' +
        '</div>';
    $('#mainArea').html(html);
};

app.findByName = function() {
    $('#list').empty();
    app.dao.findByName($('#searchKey').val(), function(employees) {
        var l = employees.length;
        for (var i=0; i < l; i++) {
            var employee = employees[i];
            var html = "<li><a href='#employees/" + employee.id + "'>" +
                        employee.firstName + " " + employee.lastName + "<br/>" +
                        employee.title + "</a></li>";
            $('#list').append(html);
        }
    });
};

$(document).on('keyup', '#searchKey', app.findByName);

app.showHomeView();