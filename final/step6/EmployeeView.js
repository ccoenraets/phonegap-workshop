var EmployeeView = function(employee) {

    this.render = function() {
        this.el.html(EmployeeView.template(this.employee));
        return this;
    };

    this.employee = employee;

    this.el = $('<div/>')

 }

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());