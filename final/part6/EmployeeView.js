var EmployeeView = function(employee) {

    this.initialize = function() {
        this.el = $('<div/>')
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.initialize();

 }

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());