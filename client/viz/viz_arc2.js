window.vizObjects=[];
window.rectObjects=[];
window.circleObjects=[];

window.vizObjects2=[];
window.rectObjects2=[];
window.circleObjects2=[];

window.dataSize = 11;
window.dataSize2 = 6;

window.viz_round;
// window.viz_round2;
window.barGraph;

window.viz_width;
window.viz_height;
window.pos_y;
window.collection_num = 1;

window.d_x;
window.d_y;

window.collection1;
window.collection2;
window.collection3;

window.official;
window.official_norm;

window.legend1;
window.legend2;
window.legend3;
window.legend4;

window.selectedCollection;
window.selectedLegend;

window.clusterC;
window.clusterO;

window.selectedArray = [];

Template.viz.rendered = function() {

	body = d3.select("body");
	var div = body.append("div");
	div.attr("id", "index_collection")
		// .html("<span id='col_name' style='color:white'>Business Oriented</span>");
		.html("Commercial Index :: <span id='col_name' style='color:white'>Business Oriented</span>");// 
		// .html("COMMERCIAL INDEX");// 
		// .html("Commercial Index <span style='font-weight:300'> Collection </span>");


	body.append('div').attr('id', 'title_cluster')
		.html('Clusters');

	// body.append('div').attr('id', 'cluster_commercial')
	// 	.html('Commercial index');

	// cluster_official = body.append('div').attr('id', 'cluster_official')
	// 	.html('Official index');


	// tooltip
	tooltip = d3.select("body").append("div").attr("id", "tooltip");
	tooltip2 = d3.select("body").append("div").attr("id", "tooltip2");

	initCollection();

	var current_id = '#viz' + this.data._id;

	margin = { top: 0, right: 0, bottom: 0, left: 0 };

	// width = parseInt(d3.select(current_id).style('width'), 10),
	width = parseInt(d3.select('.indicators').style('width'), 10),
	width = width - margin.left - margin.right,
	height = parseInt(d3.select('.indicators').style('height'), 10) - 0,
	height = height - margin.top - margin.bottom;

	viz_width = width;
	viz_height = height;

	pos_y = ( $(window).height() - (height + margin.top + margin.bottom) ) / 2;

	rScale = d3.scale.linear()
				.domain([0,1])
				.range([0,width*0.28]); // 0.282

	viz_round = d3.select(current_id).append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom);

	d_x = width*0.5 + margin.left;
	d_y = height*0.52 + margin.top + 0;
	

    // g for arc
	g = viz_round.append('g')
		.attr('class', 'g1_class')
		.attr("transform", "translate(" + d_x  +"," + d_y + ")");

		// g.append('line')
		// 	.attr('x1', -width*0.43).attr('x2', width*0.43)
		// 	.attr('y1', height*0.34).attr('y2', height*0.34)
		// 	.attr('stroke', 'rgba(255,255,255,0.5')
		// 	.attr('stroke-width', 0.8);

		// index name and description
		index_name = body.append("div");
		index_name.attr("class", "index_name2")
			.attr("id", "index_name1")
			.html("Activity Earned");

		index_des = body.append("div");
		index_des.attr("class", "index_des")
			.attr("id", "index_des1")
			.html("Density of number of transactions made within 1sq.km of the area");

	// 
	g_official_norm = viz_round.append('g')
		.attr('class', 'g_official_norm')
		.attr("transform", "translate(" + d_x  +"," + d_y + ")");

		// g_official_norm.append('line')
		// 	.attr('x1', -width*0.43).attr('x2', width*0.43)
		// 	.attr('y1', height*0.34).attr('y2', height*0.34)
		// 	.attr('stroke', 'rgba(255,255,255,0.5')
		// 	.attr('stroke-width', 0.8);


	// g for bar
	g_bar = viz_round.append('g')
		.attr("transform", "translate(" + d_x  +"," + d_y + ")")
		.style('visibility', 'hidden');

		// g_bar.append('line')
		// 	.attr('x1', -width*0.43).attr('x2', width*0.43)
		// 	.attr('y1', height*0.34).attr('y2', height*0.34)
		// 	.attr('stroke', 'rgba(255,255,255,0.5')
		// 	.attr('stroke-width', 0.8);

		index_name2 = body.append("div");
		index_name2.attr("class", "index_name2")
			.attr("id", "index_name2")
			.html("Activity Earned");

		index_des2 = body.append("div");
		index_des2.attr("class", "index_des")
			.attr("id", "index_des2")
			.html("Density of number of transactions made within 1sq.km of the area");

		$('#index_name2').css('visibility', 'hidden');
		$('#index_des2').css('visibility', 'hidden');


	// g for cluster
	g_cluster = viz_round.append('g')
		.attr("transform", "translate(" + d_x  +"," + d_y + ")")
		.style("visibility", "hidden");


	queue() 
		.defer(d3.csv, '/data_0722/business.csv')
		.defer(d3.csv, '/data_0722/business_legend.csv')
		.defer(d3.csv, '/data_0722/customer.csv')
		.defer(d3.csv, '/data_0722/customer_legend.csv')
		.defer(d3.csv, '/data_0722/categories.csv')
		.defer(d3.csv, '/data_0722/categories_legend.csv')
		.defer(d3.csv, '/data_0722/official.csv')
		.defer(d3.csv, '/data_0722/official_norm.csv')
		.defer(d3.csv, '/data_0722/official_legend.csv')
		.defer(d3.csv, '/data_0722/cluster_kmean_commericial_province_new.csv')
		.defer(d3.csv, '/data_0722/cluster_kmean_official_province_new.csv')
		.await(renderViz);


	function renderViz(error, data_1, legend_1, data_2, legend_2, data_3, legend_3, official_i, official_norm_i, official_legend_i, clusterC_i, clusterO_i) { 

		legend1 = legend_1;
		legend2 = legend_2;
		legend3 = legend_3;

		collection1 = data_1;
		collection2 = data_2;
		collection3 = data_3;

		official = official_i;
		official_norm = official_norm_i;
		legend4 = official_legend_i;

		clusterC = clusterC_i;
		clusterO = clusterO_i;

		selectedLegend = legend1;
		selectedCollection = collection1;

		radiusGuide();
		// getButton();

		drawArc();
		drawBar();
		drawCluster();

		drawOfficial(); // left one
		drawArc2(); // right official one
	}

} // template


axisGuide = function(poly) {

	var d_th = Math.PI / poly.length;

	g.selectAll('.line')
			.data(poly)
	.enter().append("line")
		.attr('x1', 0)
		.attr('y1', 0)
		.attr('x2', function(d) {
			var th = d.t * 2* d_th + d_th;
			return rScale(1) * Math.cos(th);
		})
		.attr('y2', function(d) {
			var th = d.t * 2* d_th + d_th;
			return rScale(1) * Math.sin(th);
		})
		.attr('stroke-width', 1)
		.attr('stroke-dasharray', ('1,2'))
		.attr('stroke', '#fff');


	axisNames = d3.selectAll('p')
			.data(poly)
	.enter().append('div')
		.attr('class', 'index')
		.style("top", function(d) { 
			var th = d.t * 2* d_th + d_th;
			return getdy(d.t, th)+ 9 + "px"; 
		})
		.style("right", function(d) { 
			var th = d.t * 2* d_th + d_th;
			return viz_width*0.93-getdx(d.t, th) + 9 +"px"; 
			// return viz_width-margin.left-margin.right-getdx(d.t, th) + "px"; 
		})
		.text(function(d,i) {  return d.index;  })
		.on("mouseover", function(d) { getDescription(d.index); })
		.on("mousemove", function(){
			tooltip2.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
		})
		.on("mouseout", function() {
			tooltip2.style("visibility", "hidden");
		});
}


getDescription = function(selectedValue) {
	selectedValue = selectedValue.replace(/ /g, '');

	selectedLegend.forEach(function(d) {

		if(d.get == selectedValue) {
			index_name.text(d.indicator);
			index_des.text(d.description);
		}
	});
}
