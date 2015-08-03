onEachFeature = function(feature, layer) {

	layer.on({
		mouseover: mouseOverLayer,
		mouseout: mouseOutLayer,
		click: mouseClickLayer
	});
	
	setLayerStyle(layer, "default");
	layer.bindLabel(feature.properties.NAME_2);

	var name = layer.feature.properties.NAME_2;
	if(name == "Madrid") {

		setLayerStyle(layer, "select");
		// console.log(layer.feature.properties.PROV_ID);
		// console.log(selectedColor);
		var currentArray = {"id": layer.feature.properties.PROV_ID, "color": selectedColor};
		// console.log(currentArray);

		selectedArray.push(currentArray);
	}
}

mouseOverLayer = function(e) {

	var infos=getInfos(e);
	
	if(infos.style.active==false) {
		setLayerStyle(e.target, "over");
	} else {
		mouseoverViz(infos);
	}
	
	e.target.bringToFront();
	updateProvince(infos.properties.PROV_ID); 
}

mouseOutLayer = function(e) {
	
	var infos=getInfos(e);

	if(infos.style.active==false) {
		setLayerStyle(e.target, "out");
	} else {
		mouseoutViz(infos);
	}
}

window.rect_id_l = 100;
window.dot_id_l = 100;

mouseClickLayer = function(e) {

	var infos=getInfos(e);
	var layer=map._layers[infos.id];

	// var layer=mapObjects[infos.mapId]._layers[infos.id];
	
	// if(Session.equals("expert", true)) { // ONE Selected
	if(Session.equals("expert", false)) { // MULTI Selected
		
		if(infos.style.active) {

			setLayerStyle(layer, "unselect");
			
			comparisons.update(
				{	id:infos.mapId}, 
				{	$pull: { 
						selection: { id: infos.id }
					},
					$set: {
						lastClicked: infos.id
					}
				}
			);
			unselectViz(infos.properties.PROV_ID);

			// updating selected array
			selectedArray = selectedArray.filter( function(array) {
				
				if(array.id == infos.properties.PROV_ID) { return false; }
				else {	return true; }
			});
			
			console.log(selectedArray);

		} else {

			setLayerStyle(layer, "select");
			
			comparisons.update(
				{	id:infos.mapId}, 
				{	$push: {
						selection: infos
					},
					$set: {
						lastClicked: infos.id
					}
				} 
			);

			var currentArray = {"id": infos.properties.PROV_ID, "color": selectedColor};
			// console.log(currentArray);

			selectedArray.push(currentArray);
			console.log(selectedArray);

			selectVizMulti(infos);
			// updateProvince(infos.properties.PROV_ID); // update viz official data
		}
		
	} else { // One Selected

		if(infos.style.active) {

			setLayerStyle(layer, "unselect");
			unselectViz(infos.properties.PROV_ID);
		} else {
			
			setLayerStyle(layer, "select");
			
			// disable last clicked polygon
			var lastClicked=comparisons.find({_id:infos.mapId}).fetch()[0];

			if(lastClicked && _.size(lastClicked)>0) {
				if(lastClicked.lastClicked) {
					if(lastClicked.lastClicked!=infos.id) {

						var oldLayer=map._layers[lastClicked.lastClicked];
						setLayerStyle(oldLayer, "unselect");
					}
				}
			}
		}
		
		// update
		comparisons.update(
			{	id:infos.mapId}, 
			{ 
				$pull: {
					selection: 
					{ id: lastClicked.lastClicked }
				},
				$push: {
					selection: infos
					},
				$set: {
					// selection: infos,
					lastClicked: infos.id
				} 
			} 
		);

		selectViz(infos);
	} // end of else

	// send the query with the map id
	// sendQuery(infos.mapId);	
}

selectOneProvince = function() {

	var id = 75; //getInfos(e);
	var PROV_ID = 28;
	var layer=map._layers[id];

	var infos = {
		"id": 76,
		"mapId": "3sC64aXv9MvkB3xy7",
		"multipolygon": true
	}

	setLayerStyle(layer, "select");
	selectVizOne2(PROV_ID);
}

selectVizOne2 = function(rect_id) {

	rectObjects[rect_id].style('fill', selectedColor);
	rectObjects[rect_id].attr('stroke', selectedColor);
	rectObjects[rect_id].style('visibility', 'visible');
	rectObjects[rect_id].moveToFront();

	circleObjects[rect_id].moveToFront();
	circleObjects[rect_id].style('fill-opacity',0);
	circleObjects[rect_id].style("fill", '#ff4081');
}

selectVizMulti = function(infos) {

	var rect_id = infos.properties.PROV_ID;

	// unselectViz(rect_id_l);

	// official viz
	if(collection_num == 4) {
		// console.log(rect_id + selectedColor);
		rectObjects2[rect_id].style('fill', selectedColor);
		rectObjects2[rect_id].attr('stroke', selectedColor);
		rectObjects2[rect_id].style('visibility', 'visible');
		rectObjects2[rect_id].moveToFront();
	}
	else {
		rectObjects[rect_id].style('fill', selectedColor);
		rectObjects[rect_id].attr('stroke', selectedColor);
		rectObjects[rect_id].style('visibility', 'visible');
		rectObjects[rect_id].moveToFront();

		circleObjects[rect_id].moveToFront();
		circleObjects[rect_id].attr("r", 4);
		circleObjects[rect_id].style('fill-opacity',0);
		circleObjects[rect_id].style("fill", '#ff4081');
	}
	
}

mouseoverViz = function(infos) {
	var rect_id = infos.properties.PROV_ID;
	rectObjects[rect_id].attr("stroke-width", 2);
	rectObjects[rect_id].style("stroke-opacity", 1);
	rectObjects[rect_id].moveToFront();

	rectObjects2[rect_id].attr("stroke-width", 2);
	rectObjects2[rect_id].style("stroke-opacity", 1);
	rectObjects2[rect_id].moveToFront();
}

mouseoutViz = function(infos) {
	var rect_id = infos.properties.PROV_ID;
	rectObjects[rect_id].attr("stroke-width", 1);
	rectObjects[rect_id].style("stroke-opacity", 0.7);

	rectObjects2[rect_id].attr("stroke-width", 1);
	rectObjects2[rect_id].style("stroke-opacity", 0.7);
}

selectViz = function(infos) {

	var rect_id = infos.properties.PROV_ID;
	$( "#currentProvince" ).text(infos.properties.NAME_2);

	unselectViz(rect_id_l);
	rectObjects[rect_id].style('visibility', 'visible');

	// CHANGE DOTS
	for(var i=0; i<9; i++) {
		var dot_id = rect_id+'_'+i;
		rectObjects[dot_id].moveToFront();
		rectObjects[dot_id].style('fill-opacity',0);
	}

	rect_id_l = rect_id;
}

unselectViz = function(id) {

	if(id !== 100) {

		rectObjects[id].style('visibility', 'hidden');

		circleObjects[id].attr("r", 2);
		circleObjects[id].style('fill-opacity',0);
		circleObjects[id].style("fill", '#3F51B5');
	}

	if(id !== 100) {

		rectObjects2[id].style('visibility', 'hidden');
	}
}

unselectAllViz = function() {

	for(var i = 1; i < rectObjects.length; i++) {
		rectObjects[i].style("visibility", 'hidden');
	}
}

unselectAllViz_official = function() {

	for(var i = 1; i < rectObjects2.length; i++) {
		rectObjects2[i].style("visibility", 'hidden');
	}
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

getInfos = function(e) {

	// if it is a multipolygon
	if(e.target.options==undefined) {
		var style;
		
		// loop through all polygons
		_.each(e.target._layers, function(value, index) {
			// keep style of the first one
			style=value.options;
			return false;
		});
		
		var mapId=e.target._map._container.id.split("map");
		
		// get parent layer id
		return {
			style:style,
			id:parseInt(e.target._leaflet_id),
			mapId:mapId[1],
			multipolygon:true,
			properties:e.target.feature.properties
		}
	} else {
	
		var mapId=e.target._map._container.id.split("map");
		
		return {
			style: e.target.options,
			id: parseInt(e.target._leaflet_id),
			mapId:mapId[1],
			multipolygon:false,
			properties:e.target.feature.properties
		}
	}
}
