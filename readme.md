# PhoneGap Workshop #

## Step 1: Choosing a Local Storage Option ##

1. Examine the different persistence options in /work/js/storage.
2. Test the application with the different stores.

To change the local storage option for the application:

1. In work/index.html: add a script tag for the corresponding .js file: memory-store.js, ls-store.js, or websql-store.js.
2. In work/main.js: Instantiate the specific store in the initialize() function: MemoryStore, LocalStorageStore, or WebSqlStore.


## Step 2: Setting Up a Single Page Application ##

1. In index.html: remove the HTML markup inside the body tag.
2. In main.js, add a showHomeView() function to the app object, and implement the function to programmatically add the markup to the body element.

    ```javascript
    showHomeView: function() {
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

3. Pass an anonymous callback function as an argument to the initialize() function of the app object. The store will call this function after it has successfully initialized. In the anonymous function, call the showHomeView() function to display the Home View.

    ```javascript
    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            self.showHomeView();
        });
    }
    ```

## Step 3: Using templates ##

In index.html:

1. Create an HTML template for the Search View:

    ```html
    <script id="home-tpl" type="text/x-handlebars-template">
        <div class='header'><h1>Home</h1></div>
        <div class='search-view'>
            <input class='search-key'/>
            <ul class='employee-list'></ul>
        </div>
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

In main.js:

1. In the app initialize() function, add the code to compile the two templates defined above:

    ```javascript
    this.homeTpl = Handlebars.compile($("#home-tpl").html());
    this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    ```

2. Modify showHomeView() to use the homeTpl template:

    ```javascript
    showHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
    ```

3. Modify findByName() to use the employeeLiTpl template

    ```javascript
    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    }
    ```

## Step 4: Creating a View Class ##

## Step 5: Scrolling ##

## Step 6: Routing / Multiple Views ##

## Step 7: PhoneGap APIs: Location, Picture, Contacts ##

## Step 8: CSS Transitions ##


More topics:
conditional css
touch vs click
viewport
testing
