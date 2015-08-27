onEachFeature2 = function(feature, layer) { // for heatmap

	layer.on({
		mouseover: mouseOverLayer2,
		mouseout: mouseOutLayer2
	});
	
	layer.bindLabel(feature.properties.NAME_2);
}

mouseOverLayer2 = function(e) {

	var infos=getInfos(e);
	setLayerStyle2(e.target, "over");
	e.target.bringToFront();

	mouseoverBar(infos);
	updateProvince(infos.properties.PROV_ID);
}

mouseOutLayer2 = function(e) {
	
	var infos=getInfos(e);
	setLayerStyle2(e.target, "out");

	mouseoutBar(infos);
	console.log('mouse out layer');
}

// bar - mouseover interaction
mouseoverBar = function(infos) {
	var rect_id = infos.properties.PROV_ID;
	barObjects[rect_id].style("fill", '#ff4081');
}

mouseoutBar = function(infos) {
	var rect_id = infos.properties.PROV_ID;
	barObjects[rect_id].style('fill', 'rgba(200,200,200,0.5)')
}

