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