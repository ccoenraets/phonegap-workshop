EmployeeSearchView = Backbone.View.extend({

    template: _.template($('#employeeSearchView').html()),

    initialize: function () {
        this.render();
    },

    render: function (eventName) {
        $(this.el).html(this.template());
        this.listView = new EmployeeListView({model: this.model, el: $('#list', this.el)});
        return this;
    },

    events: {
        "keyup #searchKey": "search"
    },

    search: function (event) {
        var key = $('#searchKey').val();
        this.model.findByName(key);
    }

});

EmployeeListView = Backbone.View.extend({

    initialize: function () {
        this.model.bind("reset", this.render, this);
    },

    render: function (eventName) {
        $(this.el).empty();
        _.each(this.model.models, function (employee) {
            $(this.el).append(new EmployeeListItemView({model: employee}).el);
        }, this);
        return this;
    }

});

EmployeeListItemView = Backbone.View.extend({

    tagName: "li",

    template: _.template($('#employeeListItemView').html()),

    initialize: function () {
        this.render();
    },

    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

EmployeeView = Backbone.View.extend({

    template: _.template($('#employeeView').html()),

    initialize: function () {
        this.model.bind("change", this.render, this);
//
//        this.render();
    },

    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click #addLocationBtn":    "addLocation",
        "click #addContactBtn":     "addContact",
        "click #addPictureBtn":     "addPicture"
    },

    addLocation: function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('#location').html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    },

    addContact: function() {
        var contact = navigator.contacts.create();
        contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    },

    addPicture: function() {
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
    }

});