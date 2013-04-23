var JSONPAdapter = function() {

    this.initialize = function(data) {
        var deferred = $.Deferred();
        url = data;
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id, dataType: "jsonp"});
    }

    this.findByName = function(searchKey) {
        return $.ajax({url: url + "?name=" + searchKey, dataType: "jsonp"});
    }

    var url;


}