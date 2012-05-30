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