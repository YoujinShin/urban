window.dataviz_clicked = true;
window.heatmap_clicked = false;
window.clusterviz_clicked = false;

window.button_clicked = true;
window.about_clicked = true;

window.roundViz_clicked = true;
window.officialviz_clicked = false;


$(document).ready(function() {

	// var bottom = Math.floor( ( $(window).height() - 600 ) /2 );
	// $('#viz_official').css('bottom', bottom + 'px');

	// Official Viz Left
	$('#button_official').click(function() {

		if(button_clicked) { showOfficialViz_left(); }
		else { hideOfficialViz_left(); }
	});

	$('#about_nav').click(function() {

		if(about_clicked) { showAboutPage(); }
		else { hideAbourPage(); }
	});


	// Round Viz
	$('#dataviz').click(function() {

		if(dataviz_clicked == false) { // first time clicked!

			showDataViz();
			hideBarGraph();
			hideCluster();

			// map.removeLayer(heatmapLayer);
			// map.addLayer(shapeLayer);
			map.removeLayer(clusterLayer);

			$('#heatmap').css('background-color', 'rgba(255,255,255, 0.18');
			$('#dataviz').css('background-color', 'rgba(255,255,255, 0');
			$('#clusterviz').css('background-color', 'rgba(255,255,255, 0.18');
			dataviz_clicked = true;
			heatmap_clicked = false;
			clusterviz_clicked = false;
		}
	});


	// Bar Viz
	$('#heatmap').click(function() {

		if(heatmap_clicked == false) { // first time clicked!

			selectedArray = [];

			hideDataViz();
			showBarGraph();
			hideCluster();

			$('#heatmap').css('background-color', 'rgba(255,255,255, 0');
			$('#dataviz').css('background-color', 'rgba(255,255,255, 0.18');
			$('#clusterviz').css('background-color', 'rgba(255,255,255, 0.18');

			heatmap_clicked = true;
			dataviz_clicked = false;
			clusterviz_clicked = false;

			if(collection_num == 4) {
				$('.indicator_list').css('visibility', 'hidden');
				$('.indicator_list2').css('visibility', 'visible');
				changeBarGraph2();
			}
		}
	});


	// Round Viz
	$('#clusterviz').click(function() {

		if(clusterviz_clicked == false) { // first time clicked!

			hideDataViz();
			hideBarGraph();
			showCluster();

			$('#heatmap').css('background-color', 'rgba(255,255,255, 0.18');
			$('#dataviz').css('background-color', 'rgba(255,255,255, 0.18');
			$('#clusterviz').css('background-color', 'rgba(255,255,255, 0');
			dataviz_clicked = false;
			heatmap_clicked = false;
			clusterviz_clicked = true;
		}
	});
});


//////
showDataViz = function() { 

	map.addLayer(shapeLayer);

	g.style('visibility', 'visible');
	$('.index').css('visibility', 'visible');
	$('#index_name1').css('visibility', 'visible');
	$('#index_des1').css('visibility', 'visible');
	
}

hideDataViz = function() {
	unselectAllViz();
	unselectAllViz_official();
	unselectDots();

	setLayerStyle(shapeLayer, "default");
	map.removeLayer(shapeLayer);

	g.style('visibility', 'hidden');
	$('#index_name1').css('visibility', 'hidden');
	$('#index_des1').css('visibility', 'hidden');
	$('.index').css('visibility', 'hidden');

	g_official_norm.style('visibility', 'hidden');
	$('.index_off_norm').css('visibility', 'hidden');
}

//////
showBarGraph = function() { 

	g_bar.style('visibility', 'visible');
	map.addLayer(heatmapLayer);

	$('#index_name2').css('visibility', 'visible');
	$('#index_des2').css('visibility', 'visible');
	$('.indicator_list').css('visibility', 'visible');
}

hideBarGraph = function() {

	map.removeLayer(heatmapLayer);

	g_bar.style('visibility', 'hidden');
	$('#index_name2').css('visibility', 'hidden');
	$('#index_des2').css('visibility', 'hidden');
	$('.indicator_list').css('visibility', 'hidden');
	$('.indicator_list2').css('visibility', 'hidden');
}

hideCluster = function() {

	map.removeLayer(clusterLayer);
}

showCluster = function() {

	map.addLayer(clusterLayer);
}


// Official Viz Left
showOfficialViz_left = function() {
	console.log('show official viz left');
	var mapSettings= getMapView(Session.get("currentCity"));

	d3.select('#button_official').style('background-color', 'rgba(0,0,0,0.6)');
	d3.select('#viz_official').style('left', 76 + 'px');
	button_clicked = false;

	map.fitBounds(
		[ 
			[mapSettings.coordinates[0] - 4, mapSettings.coordinates[1] - 4], 
			[mapSettings.coordinates[0] + 4, mapSettings.coordinates[1] + 4] 
		], { 
			// paddingTopLeft: [ 150, 50]
			paddingTopLeft: [-320, 50]
		} // [x, y]
	);
}

hideOfficialViz_left = function() {
	var mapSettings= getMapView(Session.get("currentCity"));
	
	d3.select('#button_official').style('background-color', 'rgba(0,0,0,0.32)');
	d3.select('#viz_official').style('left', -200 + 'px');
	button_clicked = true;

	map.fitBounds(
		[ 
			[mapSettings.coordinates[0] - 4, mapSettings.coordinates[1] - 4], 
			[mapSettings.coordinates[0] + 4, mapSettings.coordinates[1] + 4] 
		], { 
			// paddingTopLeft: [0, 50]
			paddingTopLeft: [-500, 50]
		} // [x, y]
	);
}

showAboutPage = function() {
	console.log('show about page');
	var mapSettings= getMapView(Session.get("currentCity"));

	d3.select('#about_nav').style('background-color', 'rgba(0,0,0,0.6)');
	d3.select('#about_page').style('left', 76 + 'px');
	about_clicked = false;
}

hideAbourPage = function() {
	var mapSettings= getMapView(Session.get("currentCity"));
	
	d3.select('#about_nav').style('background-color', 'rgba(0,0,0,0.32)');
	d3.select('#about_page').style('left', -600 + 'px');
	about_clicked = true;
}





