window.legend_num = 2;

drawCluster = function() {

	clusterC.forEach(function(e) { e.PROV_ID = + e.PROV_ID; });
	clusterO.forEach(function(e) { e.PROV_ID = + e.PROV_ID; });

	// make clusterLayer 
	L.geoJson(provinces, {
		style: getStyleCluster,
		onEachFeature: onEachFeature3
	}).addTo(clusterLayer);
}

getStyleCluster = function(feature) {

	var id = feature.properties.PROV_ID;
	console.log(getColorCluster(id));

	return {
		weight: 1,
		color: 'white', 
		opacity: 1,
		// fillColor: getColorCluster(id),
		fillOpacity: 0.6,
		fillColor: getColorCluster(id)
		// fillColor: '#3F51B5'
	};
}

getColorCluster = function(id) {

	var colorLists = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', 
					'#2196F3', '#009688', '#4CAF50', '#FF5722' ];

	var color = '';

	clusterC.forEach(function(e) {
		if(legend_num == 2) { 
			if(e.PROV_ID == id) { color = colorLists[ e.leg_4 ]; }
		}
	});

	return color;  
}




// getColorCluster = function(id) {

// 	var value = getClusterValue(id);
// 	return value;
// }

// getClusterValue = function(id) {

// 	for(var i = 0; i < selectedCollection.length; i++) {

// 		var d = selectedCollection[i];
// 		d.id = +d.id;
		
// 		if(d.id == id) { return d.MoneyEarned; }
// 	}
// }