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

app.showDetailsView = function(id) {
    app.dao.findById(id, function (employee) {
        app.currentEmployee = employee;
        var html =
            "<div class='details'>" +
            "<img id='image' height='120' src='img/unknown.jpg'/><br/>" +
            "<h1>" + employee.firstName + " " + employee.lastName + "</h1>" +
            employee.title + "<br/>" +
            employee.cellPhone + "<br/>" +
            employee.email + "<br/><br/>" +
            "Location:<br/><span id='location'></span><br/><br/>" +
            "<a href='#' id='addLocationBtn'>Add Current Location</a><br/>" +
            "<a href='#' id='addContactBtn'>Add to Contacts</a><br/>" +
            "<a href='#' id='addPictureBtn'>Add Picture</a>" +
            "</div>";
        app.detailsView = $(html);
        $('#mainArea').html(app.detailsView);
    });
};

app.detailsURL = /^#employees\/(\d{1,})/;

app.route = function() {
    var hash = window.location.hash;
    if (!hash) {
        app.showHomeView();
        return;
    }
    var match = hash.match(app.detailsURL);
    if (match) {
        app.showDetailsView(match[1]);
    }
};

$(window).on('hashchange', app.route);

app.route();