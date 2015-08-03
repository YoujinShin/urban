// // function setLayerStyle(layer, type, alpha) {
// function setLayerStyle(layer, type) {

// 	var style;
			
// 	switch(type) {
// 		case "default":
// 			style = {
// 				weight: 1,
// 				opacity: 1,
// 				color: '#ffffff',
// 				fillOpacity: 0.2,
// 				fillColor: '#ffffff'
// 			};
// 			break;
// 		case "auto":
// 			style={
// 				weight: 1,
// 				opacity: 0.5,
// 				color: '#fff',
// 				fillOpacity: alpha,
// 				fillColor: '#fff'
// 			};
// 			break;
// 		case "over":
// 			style={
// 				weight: 1.6,
// 				opacity: 0.7,
// 				color:"#ff4081",
// 				over:true
// 			};
// 			break;
// 		case "out":
// 			style={
// 				weight: 1,
// 				opacity: 0.5,
// 				fillOpacity: 0,
// 				color: '#fff',
// 				fillOpacity: 0.2,
// 				fillColor: '#fff',
// 				over:false
// 			};
// 			break;
// 		case "unselect":
// 			style={
// 				weight: 1,
// 				opacity: 0.5,
// 				fillOpacity: 0,
// 				color: '#fff',
// 				fillOpacity: 0.2,
// 				fillColor: '#fff',
// 				active:false
// 			};
// 			break;
// 		case "select":
// 			style={
// 				weight: 1.4,
// 				fillOpacity: 0.3,
// 				color: '#ff4081',
// 				fillColor: '#ff4081',
// 				active:true
// 			};
// 			break;
// 	}
	
// 	layer.setStyle(style);
// }