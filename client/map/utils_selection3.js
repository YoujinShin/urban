onEachFeature3 = function(feature, layer) { // for heatmap

	layer.on({
		mouseover: mouseOverLayer3,
		mouseout: mouseOutLayer3
	});
	
	layer.bindLabel(feature.properties.NAME_2);
}

mouseOverLayer3 = function(e) {

	var infos=getInfos(e);
	setLayerStyle2(e.target, "over");
	e.target.bringToFront();

	updateClusterNumber(infos);
	updateProvince(infos.properties.PROV_ID);
}

mouseOutLayer3 = function(e) {
	
	var infos=getInfos(e);
	setLayerStyle2(e.target, "out");
	// mouseoutBar(infos);
}


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

// // bar - mouseover interaction
// mouseoverBar = function(infos) {
// 	var rect_id = infos.properties.PROV_ID;
// 	barObjects[rect_id].style("fill", '#ff4081');
// }

// mouseoutBar = function(infos) {
// 	var rect_id = infos.properties.PROV_ID;
// 	barObjects[rect_id].style('fill', 'rgba(200,200,200,0.5)')
// }

