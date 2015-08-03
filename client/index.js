Meteor.startup(function () {
 
    $(window).resize(function() {
      	setUiPosition();
    });
    
    setInitParams();

});

setInitParams = function() {

	// default
	Session.set("currentCity", "madrid");
	// Session.set("currentCity", "barcelona");
	Session.set("currentMode", "districts");

	// Session.set("expert", true); // multiple selection enabled
	Session.set("expert", false); // one selection enabled
	
	console.log("set initial params");
}


setUiPosition = function() {
	
	console.log("-- reset UI position");

}

generateId = function() {
	var id= new Mongo.ObjectID;
	return id._str;
}

