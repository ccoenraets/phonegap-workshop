# PhoneGap Workshop#

## Part 1: Choosing a Local Storage Option ##

##### Step 1: Explore different persistence mechansisms #####

Open the following files in **/work/js/storage**, and explore the different persistence stores they define:

1. memory-store.js (MemoryStore)
2. ls-store.js (LocalStorageStore)
3. websql-store.js (WebSqlStore)

##### Step 2: Test the application with different persistence mechanisms #####

To change the local persistence mechanism for the application:

1. In **work/index.html**: add a script tag for the corresponding .js file: **memory-store.js**, **ls-store.js**, or **websql-store.js**.
2. In **work/main.js**: Instantiate the specific store in the initialize() function of the app object: **MemoryStore**, **LocalStorageStore**, or **WebSqlStore**.


## Part 2: Setting Up a Single Page Application ##

1. In index.html: remove the HTML markup inside the body tag.
2. In main.js, define a function named renderHomeView() inside the app object. Implement the function to programmatically add the Home View markup to the body element.

    ```javascript
    renderHomeView: function() {
        var html =
                "<div class='header'><h1>Home</h1></div>" +
                "<div class='search-view'>" +
                "<input class='search-key'/>" +
                "<ul class='employee-list'></ul>" +
                "</div>"
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
    ```

3. Modify the initialize() function of the app object. Pass an anonymous callback function as an argument to the constructor of the persistence store (the store will call this function after it has successfully initialized). In the anonymous function, call the renderHomeView() function to programmatically display the Home View.

    ```javascript
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            self.renderHomeView();
        });
    }
    ```

## Part 3: Using Handlebar Templates ##

Modify index.html as follows:

1. Create an HTML template to render the Home View:

    ```html
    <script id="home-tpl" type="text/x-handlebars-template">
    <div class='header'><h1>Home</h1></div>
    <div class='search-bar'><input class='search-key' type="search"/></div>
    <ul class='employee-list'></ul>
    </script>
    ```

2. Create an HTML template to render the employee list items:

    ```html
    <script id="employee-li-tpl" type="text/x-handlebars-template">
        {{#.}}
        <li><a href="#employees/{{this.id}}">{{this.firstName}} {{this.lastName}}</a></li>
        {{/.}}
    </script>
    ```

Modify main.js as follows:

1. In the initialize() function of the app object, add the code to compile the two templates defined above:

    ```javascript
    this.homeTpl = Handlebars.compile($("#home-tpl").html());
    this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    ```

2. Modify renderHomeView() to use the homeTpl template instead of the inline HTML:

    ```javascript
    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
    ```

3. Modify findByName() to use the employeeLiTpl template instead of the inline HTML:

    ```javascript
    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    }
    ```

## Part 4: Creating a View Class ##

##### Step 1: Create the HomeView Class #####

1. Create a file called HomeView.js in work/js, and define a HomeView class implemented as follows:

    ```javascript
    var HomeView = function(store) {

    }
    ```

2. Add the two templates as _static_ members of HomeView.

    ```javascript
    var HomeView = function(store) {

    }

    HomeView.template = Handlebars.compile($("#home-tpl").html());
    HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
    ```

3. Define an initialize() function inside the HomeView class. Define a div wrapper for the view. The div wrapper is used to attach the view related events. Invoke the initialize() function inside the HomeView constructor function.

    ```javascript
    var HomeView = function(store) {

        this.initialize = function() {
            // Define a div wrapper for the view. The div wrapper is used to attach events.
            this.el = $('<div/>');
            this.el.on('keyup', '.search-key', this.findByName);
        };

        this.initialize();

    }

    HomeView.template = Handlebars.compile($("#home-tpl").html());
    HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
    ```

4. Move the renderHomeView() function from the app object to the HomeView class. To keep the view reusable, attach the html to the div wrapper (this.el) instead of the document body. Because the function is now encapsulated in the HomeView class, you can also rename it from renderHomeView() to just render().

    ```javascript
    this.render = function() {
        this.el.html(HomeView.template());
        return this;
    };
    ```

5. Move the findByName() function from the app object to the HomeView class.

    ```javascript
    this.findByName = function() {
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
        });
    };
    ```

##### Step 2: Using the HomeView class #####

1. Remove the renderHomeView() function from the app object.
2. Remove the findByName() function from the app object.
3. Modify the initialize function() to display the Home View using the HomeView class:

    ```javascript
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            $('body').html(new HomeView(self.store).render().el);
        });
    }
    ```

## Part 5: Scrolling ##

## Part 6: Routing / Multiple Views ##

1. In index.html, define a template defined as follows:

    ```html
    <script id="employee-tpl" type="text/x-handlebars-template">
        <div class='header'><a href='#' class="button header-button header-button-left">Back</a><h1>Details</h1></div>
        <div class='details'>
            <img id='image' src='../img/{{firstName}}_{{lastName}}.jpg' style="float:left;margin:10px;"/>
            <h1>{{firstName}} {{lastName}}</h1>
            <h2>{{title}}</h2>
            <ul>
                <li><a href="tel:{{officePhone}}">Call Office<br/>{{officePhone}}</a></li>
                <li><a href="tel:{{cellPhone}}">Call Cell<br/>{{cellPhone}}</a></li>
                <li><a href="sms:{{cellPhone}}">SMS<br/>{{cellPhone}}</a></li>
            </ul>
        </div>
    </script>
    ```

2. Create a file called EmployeeView.js in work/js, and define an EmployeeView class implemented as follows:

    ```javascript
    var EmployeeView = function(employee) {

        this.render = function() {
            this.el.html(EmployeeView.template(this.employee));
            return this;
        };

        this.employee = employee;

        this.el = $('<div/>')

     }
    EmployeeView.template = Handlebars.compile($("#employee-tpl").html());
    ```

3. In the app's initialize(), define a regular expression that matches employee details urls.

    ```javascript
    this.detailsURL = /^#employees\/(\d{1,})/;
    ```

4. In the app's registerEvents() function, add an event listener to listen to URL hash map changes:

    ```javascript
    $(window).on('hashchange', $.proxy(this.route, this));
    ```

5. In the app object, define a route() function implemented as follows:

    ```javascript
    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    }
    ```

6. Test the application.


## Part 7: Using the Location API ##

1. In index.html, add the following list items to the employee template:

    ```html
    <li><a href="#" class="add-location-btn">Add Location</a></li>
    ```

2. In EmployeeView, register an event listener for the click event of the Add Location list item:

    ```javascript
    this.el.on('click', '.add-location-btn', this.addLocation);
    ```

3. In EmployeeView, define the addLocation event handler as follows:

    ```javascript
    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    }
    ```

4. Test the Application


## Part 8: Using the Contacts API ##

1. In index.html, add the following list items to the employee template:

    ```html
    <li><a href="#" class="add-contact-btn">Add to Contacts</a></li>
    ```

2. In EmployeeView, register an event listener for the click event of the Add to Contacts list item:

    ```javascript
    this.el.on('click', '.add-contact-btn', this.addToContacts);
    ```

3. In EmployeeView, define the addToContacts event handler as follows:

    ```javascript
    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    }
    ```

4. Test the Application

## Part 9: Using the Camera API ##

1. In index.html, add the following list items to the employee template:

    ```html
    <li><a href="#" class="change-pic-btn">Change Picture</a></li>
    ```

2. In EmployeeView, register an event listener for the click event of the Change Picture list item:

    ```javascript
    this.el.on('click', '.change-pic-btn', this.changePicture);
    ```

3. In EmployeeView, define the changePicture event handler as follows:

    ```javascript
    this.changePicture = function(event) {
        event.preventDefault();
        console.log('changePicture');
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
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
    ```

4. Test the Application


## Part 10: CSS Transitions ##

1. Inside the app object, define a slidePage() function implemented as follows:

    ```javascript
    slidePage: function(page) {

        var currentPageDest,
            self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    }
    ```

2. Modify the route() function as follows:

    ```javascript
    route: function() {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        var match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
    }
    ```


More topics:

- Conditional css
- Touch vs click
- Viewport
- Testing
- External template loader
- Plugins
