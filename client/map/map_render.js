window.mapObjects=[];
window.theGroups=[];
window.map;

Template.map.rendered= function() {

	console.log("# render map");
	
	// get map coordinates
	var mapSettings= getMapView(Session.get("currentCity"));

	// remove attribution
	L.Control.Attribution.prototype.options.prefix = '';
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vuc2VhYmxlIiwiYSI6ImxSNC1wc28ifQ.hst-boAjFCngpjzrbXrShw';

	// init map
	map = L.map('map'+this.data._id, { zoomControl:false })
		.setView(mapSettings.coordinates, mapSettings.zoom);
		// .addLayer(L.mapbox.tileLayer("examples.map-20v6611k", {
		// 	// senseable.kakb3n74
		// 	// examples.map-20v6611k
		// 	// senseable.a1c35c2b - new, blue
		// 	// senseable.7a3b6785 - new, gray
			// mapbox.light
		// 	attribution:'',
		// 	detectRetina: true,
		// 	opacity: 1
		// })
	// );

// senseable.7b82cf0f (black)
// senseable.d3d58f5f (gray)
// senseable.107cc94a (light gray)
// senseable.b55c5fab (light gray with label)
	var base_layer = L.mapbox.tileLayer('senseable.b55c5fab'); // mapbox.dark , mapbox.light , senseable.86caab31
	base_layer.addTo(map);
	base_layer.setOpacity(0.98);

	// map.setView([mapSettings.coordinates[0], mapSettings.coordinates[1], 13]);
	// map.setOpacity(0.2);

	// mapObjects[this.data._id].dragging.disable();
	// mapObjects[this.data._id].touchZoom.disable();
	// mapObjects[this.data._id].doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	shapeLayer = L.mapbox.featureLayer();
	heatmapLayer = L.mapbox.featureLayer();
	clusterLayer = L.mapbox.featureLayer();

	// load shape file
	L.geoJson(provinces, {
		style: {
			weight: 1,
			opacity: 0.8,
			color: '#e7604a',
			fillOpacity: 0,
			fillColor: '#e7604a',
			over:false,
			active:false
		},
		onEachFeature: onEachFeature
	}).addTo(shapeLayer);

	shapeLayer.addTo(map);

	var southWest_lat = shapeLayer.getBounds()._southWest.lat;
	var southWest_lng = shapeLayer.getBounds()._southWest.lng;
	var northEast_lat = shapeLayer.getBounds()._northEast.lat;
	var northEast_lng = shapeLayer.getBounds()._northEast.lng;

	map.fitBounds(
		[ 
			[mapSettings.coordinates[0] - 5.2, mapSettings.coordinates[1] - 5.2], 
			[mapSettings.coordinates[0] + 5.2, mapSettings.coordinates[1] + 5.2] 
			// [southWest_lat, southWest_lng], [northEast_lat, northEast_lng] 
		], { 
			// paddingTopLeft: [0, 50]
			paddingTopLeft: [-500, 50]
		} // [x, y]
	);
	// selectOneProvince();
}
