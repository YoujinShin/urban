onEachFeature3 = function(feature, layer) { // for heatmap

	layer.on({
		mouseover: mouseOverLayer3,
		mouseout: mouseOutLayer3
	});
	
	layer.bindLabel(feature.properties.NAME_2);
}

mouseOverLayer3 = function(e) {

	var infos=getInfos(e);
	// setLayerStyle2(e.target, "over");
	e.target.bringToFront();

	updateClusterNumber(infos);
	updateProvince(infos.properties.PROV_ID);

	// console.log(infos.style.fillColor);
	selectedClusterColor = infos.style.fillColor;
	clusterLayer.setStyle( getStyleCluster2 ); // select the same group
}

mouseOutLayer3 = function(e) {
	
	var infos=getInfos(e);
	// setLayerStyle2(e.target, "out");
	clusterLayer.setStyle( getStyleCluster3 );
	// mouseoutBar(infos);
}

window.selectedClusterColor;

/////
updateClusterNumber = function(infos) {

	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	var id = infos.properties.PROV_ID;
	var color = infos.style.fillColor;

	var index = colorLists.indexOf(color);
	var nums = getClusterNum();

	cluster_numbers.text(nums[index]).style('fill', color);
	cluster_names.style('fill', color);
	// console.log(nums[index]);
	// get color
}

updateClusterByNumber = function(infos) {

	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	// var id = infos.properties.PROV_ID;
	var color = colorLists[0];

	var index = colorLists.indexOf(color);
	var nums = getClusterNum();

	cluster_numbers.text(nums[index]).style('fill', color);
	cluster_names.style('fill', color);
}

////////////////////////////////
////////// Mouse Over -> Select 

getStyleCluster2 = function(feature) { // for heatmap

	var id = feature.properties.PROV_ID;

	return {
		fillOpacity: getOpacity(id)
	};
}

getStyleCluster3 = function(feature) { // for heatmap

	var id = feature.properties.PROV_ID;

	return {
		fillOpacity: 0.36
	};
}

getOpacity = function(id) { // for heatmap

	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	var color = '';
	var opac = 0.36;

	if(clusterC_clicked) {
		clusterC.forEach(function(e) {
			if(legend_num == 2) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_2 ]); } }
			else if(legend_num == 3) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_3 ]); } }
			else if(legend_num == 4) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_4 ]); } }
			else if(legend_num == 5) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_5 ]); } }
			else if(legend_num == 6) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_6 ]); } }
			else if(legend_num == 7) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_7 ]); } }
			else if(legend_num == 8) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_8 ]); } }
			else if(legend_num == 9) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_9 ]); } }
		});
	} else {
		clusterO.forEach(function(e) {
			if(legend_num == 2) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_2 ]); } }
			else if(legend_num == 3) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_3 ]); } }
			else if(legend_num == 4) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_4 ]); } }
			else if(legend_num == 5) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_5 ]); } }
			else if(legend_num == 6) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_6 ]); } }
			else if(legend_num == 7) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_7 ]); } }
			else if(legend_num == 8) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_8 ]); } }
			else if(legend_num == 9) { if(e.PROV_ID == id) { opac = determineOpac (colorLists[ e.leg_9 ]); } }
		});
	}

	return opac;  
}

determineOpac = function(color) {

	if(color == selectedClusterColor) { return 0.6; }
	else { return 0.36; }
}


