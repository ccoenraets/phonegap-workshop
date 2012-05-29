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

app.addLocation = function() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            $('#location').html(position.coords.latitude + ',' +position.coords.longitude);
        },
        function() {
            alert('Error getting location');
        });
    return false;
};

app.addContact = function() {
    var contact = navigator.contacts.create();
    contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
    phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
    contact.phoneNumbers = phoneNumbers;
    contact.save();
    return false;
};

app.addPicture= function() {
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };

    navigator.camera.getPicture(
        function(imageData) {
            $('#image').attr('src', "data:image/jpeg;base64," + imageData);
        },
        function() {
            alert('Error taking picture');
        },
        options);

    return false;
};

$(document).on('click', '#addLocationBtn', app.addLocation);
$(document).on('click', '#addContactBtn', app.addContact);
$(document).on('click', '#addPictureBtn', app.addPicture);