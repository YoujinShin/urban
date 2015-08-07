window.barObjects=[];


drawBar = function() {

	// A-Z sorting
	selectedCollection.sort(function(a, b) { return d3.ascending(a.NAME_2, b.NAME_2); });

	makeDropDown(selectedLegend);
	makeDropDown2();

	xScale = d3.scale.linear()
		.domain([0, 52])
		.range([ -viz_width/2 + 50, viz_width/2 - 70]);

	yScale = d3.scale.linear()
		.domain([0, 1])
		.range([ viz_height/2 - viz_height*0.26, -viz_height/2 + viz_height*0.39]);
		// .range([ viz_height/2 - 160, -viz_height/2 + 230]);

	makeBarGuide();

	var t_w = (viz_width - 100) / 52;

	selectedCollection.forEach(function(d, i) {

		var rect_id = d.id;
		var eachData = d;

		barObjects[rect_id] =  g_bar.datum(d).append('rect')
				.attr('x', function(d) { return xScale(i); })
				.attr('y', function(d) { return yScale(d.MoneyEarned); })
				.attr('width', t_w)
				.attr('height', function(d) {
					return yScale(0)-yScale(d.MoneyEarned);
				})
				.style('fill', 'rgba(200,200,200,0.5)')
				.style('fill-opacity', 0.9)
				// .attr('stroke', 'rgba(200,200,200,0.5)')
				.on("mouseover", function(d) {
					d3.select(this).style("fill", "#ff4081");

					tooltip.text(d.NAME_2);
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", function(){
					tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
				})
				.on("mouseout", function(d) {
					d3.select(this).style('fill', 'rgba(200,200,200,0.5)')
					tooltip.style("visibility", "hidden");
				});
	});

	L.geoJson(provinces, {
		style: getStyleBar,
		onEachFeature: onEachFeature2
	}).addTo(heatmapLayer);
}

// style heatmap
getStyleBar = function(feature) {

	var id = feature.properties.PROV_ID;

	return {
		weight: 1,
		color: 'white', 
		opacity: 1,
		fillOpacity: getColorBar(feature.properties.PROV_ID),
		fillColor: '#3F51B5' // blue
	};
}

getColorBar = function(id) {

	var value = getIndicatorValue(id);
	return value;
}

getIndicatorValue = function(id) {

	for(var i = 0; i < selectedCollection.length; i++) {

		var d = selectedCollection[i];
		d.id = +d.id;
		
		if(d.id == id) { return d.MoneyEarned; }
	}
}
