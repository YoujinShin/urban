setLayerStyle2 = function(layer, type) { // for heatmap

	var style;
	var defaultColor = '#000';

	switch(type) {
		case "default":
			style = {
				weight: 1,
				opacity: 1,
				color: defaultColor,
				fillOpacity: 0.07,
				fillColor: defaultColor
			};
			break;
		case "auto":
			style={
				weight: 1,
				opacity: 0,
				color: defaultColor,
				fillOpacity: alpha,
				fillColor: defaultColor
			};
			break;
		case "over":
			style={
				weight: 2,
				opacity: 1,
				color: '#ff4081',
				over:true
			};
			break;
		case "out":
			style={
				weight: 1,
				opacity: 1,
				color: '#fff',
				over:false
			};
			break;
		case "unselect":
			style={
				weight: 1,
				opacity: 1,
				fillOpacity: 0,
				color: defaultColor,
				fillOpacity: 0.07,
				fillColor: defaultColor,
				active:false
			};
			break;
		case "select":
			selectedColor = getColor();

			style={
				weight: 1,
				opacity: 1,
				fillOpacity: 0.25,
				color: selectedColor,
				fillColor: selectedColor,
				active:true
			};
			break;
	}
	
	layer.setStyle(style);
}
