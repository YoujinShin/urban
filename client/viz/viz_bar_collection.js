changeDropDown = function() {

	console.log('changeDropdown menu. collection ' + collection_num);

	options.each(function(e,i) {

		d3.select(this).text(selectedLegend[i].indicator);
		// e: {indicator: "Business Density", get: "BusinessDensity", 
		// description: "Number of active businesses within the area per sq.km"}
	});
}

changeBarGraph = function() {

	var x = document.getElementById("indicator-list").selectedIndex;
	var value = document.getElementsByTagName("option")[x].value;

	selectedValue = value.replace(/ /g, '');

	heatmapLayer.setStyle( getStyleBar2 );
	getDescription2(selectedValue);
	
	selectedCollection.forEach(function(e, i) {

		var rect_id = e.id;

		barObjects[rect_id]
				.transition().duration(490)
				.attr('y', function(d) {
					var value = selectIndicators(e, selectedValue);
					return yScale(value); 
				})
				.attr('height', function(d) {
					var value = selectIndicators(e, selectedValue);
					return yScale(0) - yScale(value);
				});
	});

}

changeBarGraph2 = function() {

	console.log('changeDropdown menu. collection ' + collection_num);

	var x = document.getElementById("indicator-list2").selectedIndex;
	selectedValue = legend4[x].get;
	// selectedValue = 'CrimeRate';
	
	heatmapLayer.setStyle( getStyleBar2 );
	getDescription2(selectedValue);
	
	official_norm.forEach(function(e, i) {

		var rect_id = e.id;

		barObjects[rect_id]
				.transition().duration(490)
				.attr('y', function(d) {
					var value = selectIndicators(e, selectedValue);
					return yScale(value); 
				})
				.attr('height', function(d) {
					var value = selectIndicators(e, selectedValue);
					return yScale(0) - yScale(value);
				});
	});

}
