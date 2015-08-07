setMapShape = function() {

	var filename="shapefiles/"+Session.get("currentCity")+"_"+Session.get("currentMode")+".geojson";
	
	console.log("loading "+filename);
	
	var getFile=$.getJSON(filename, function(data){
			
			var geojson = L.geoJson(data, {
				style:  {
					weight: 1,
					opacity: 0.8,
					color: '#e7604a',
					fillOpacity: 0.8,
					fillColor: '#e7604a'
				}
			})
			
			// initialize group and add shapefile to it
			theGroups.addLayer(geojson).addTo(theMap);
				
	}).fail(function(error) {
		console.log( "error loading shapefile" );
		console.log(error);
	})
	
}

setMapSize = function() {
	
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	
	// map
	$("#maximap").css({
	  height: winHeight,
	  width: winWidth
	});
}

getMapView = function(city) {

	var data;
	
	switch(city) {
		case "madrid": // spain
			// data={coordinates:[40.41694, -3.70081], zoom:6};
			data={coordinates:[40.2085,-3.713], zoom:5};
			break;
		case "bilbao":
			data={coordinates:[43.256690, -2.924062], zoom:10};
			break;
		case "barcelona":
			data={coordinates:[41.385064, 2.173403], zoom:10};
			break;
		default:
			data=null;
			break;
	}

	return data;
}

setMapPosition = function(city) {
	
	// set city
	check(city, String);
	Session.set("currentCity", city);
	
	// get settings
	var mapSettings=getMapView(city);
	
	// move map
	theMap.panTo(mapSettings.coordinates, false);
	theMap.setZoom(mapSettings.zoom, false);
	
	/*
	Meteor.setTimeout(function() {
		// clear layers
		theGroups.clearLayers();
		
		// reload shape
		setMapShape();
	}, 200);
	*/
}

setMapLayers = function() {
	theGroups[Session.get("currentCity")].eachLayer(
		function(layer) {

			if(layer._layers!=null) {
			
				_.each(layer._layers, function(value, index) {					
					var alpha=getLayerAlpha(_.random(0.5,2));
					setLayerStyle(value,"auto",alpha);
				});  
				
			}
		}
	);
}


getLayerAlpha = function (value) {
	
	var param_grades=[0, 0.2, 0.5, 1, 2, 5];
	
	return value > param_grades[5] ? 1 :
	       value > param_grades[4]  ? 0.8 :
	       value > param_grades[3]  ? 0.6 : 
	       value > param_grades[2]  ? 0.4 : 
	       value > param_grades[1]  ? 0.2 : 
		   value > param_grades[0]  ? 0 : 
	                  0;       
}

setLayerStyle = function(layer, type, alpha) {

	var style;
	var defaultColor = 'black'; 
			
	switch(type) {
		case "default":
			style = {
				weight: 1,
				opacity: 1,
				color: '#fff',
				fillOpacity: 0.25,
				fillColor: defaultColor
			};
			break;
		case "auto":
			style={
				weight: 1,
				opacity: 1,
				color: '#fff',
				fillOpacity: 0.25,
				fillColor: defaultColor
			};
			break;
		case "over":
			style={
				weight: 1.8,
				opacity: 1,
				color: '#1F55F9', //'#4a76fa',
				over:true
			};
			break;
		case "out":
			style={
				weight: 1,
				opacity: 1,
				color: '#fff',
				fillOpacity: 0.25,
				fillColor: defaultColor,
				over:false
			};
			break;
		case "unselect":
			style={
				weight: 1,
				opacity: 1,
				color: '#fff',
				fillOpacity: 0.25,
				fillColor: defaultColor,
				active:false
			};
			break;
		case "select":
			selectedColor = getColor();

			style={
				weight: 1,
				fillOpacity: 0.5,//0.5
				color: '#fff',
				fillColor: selectedColor,
				active:true,
				over:false
			};
			break;
	}
	
	layer.setStyle(style);
}
