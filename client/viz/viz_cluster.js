window.legend_num = 2;
window.arc = [];
window.path = [];
window.circleNum = [];
window.textNum = [];

clusterScale = d3.scale.linear()
				.domain([0, 1])
				.range([0, 2*Math.PI]);

window.arcPie;
window.pathPie;
window.pie;

window.clusterC_clicked = true;

//
drawCluster = function() {


	clusterC.forEach(function(e) { e.PROV_ID = + e.PROV_ID; });
	clusterO.forEach(function(e) { e.PROV_ID = + e.PROV_ID; });

	// make clusterLayer 
	L.geoJson(provinces, {
		style: getStyleCluster,
		onEachFeature: onEachFeature3
	}).addTo(clusterLayer);

	// makeClusterGuide();
	makeNumbers();
	makePie();


	// cluster_box = d3.select("body").append('div').attr('id', 'cluster_box').html('');
	cluster_commercial = d3.select("body").append('div').attr('id', 'cluster_commercial').html('Commercial index');
	cluster_official = d3.select("body").append('div').attr('id', 'cluster_official').html('Official index');

	cluster_commercial.on('click', function() {
		console.log('commercial clicked');

		d3.select(this).style('border-color', 'rgba(157,184,252,0.93)').style('color', 'rgba(157,184,252,0.93)');
		cluster_official.style('border-color', 'rgba(255,255,255,0.3)').style('color', 'rgba(255,255,255,0.3)');
		
		clusterC_clicked = true;
		updatePie();
		clusterLayer.setStyle( getStyleCluster );
	});

	cluster_official.on('click', function() {
		console.log('official clicked');

		d3.select(this).style('border-color', 'rgba(157,184,252,0.93)').style('color', 'rgba(157,184,252,0.93)');
		cluster_commercial.style('border-color', 'rgba(255,255,255,0.3)').style('color', 'rgba(255,255,255,0.3)');
	
		clusterC_clicked = false;
		updatePie();
		clusterLayer.setStyle( getStyleCluster );
	});
}

getClusterNum = function() {

	var num = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // num_0 - num_8

	if(clusterC_clicked) {
		clusterC.forEach(function(e) {

			var value = getValue(e);
			if(value == 0) { num[0]++; }
			else if(value == 1) { num[1]++; }
			else if(value == 2) { num[2]++; }
			else if(value == 3) { num[3]++; }
			else if(value == 4) { num[4]++; }
			else if(value == 5) { num[5]++; }
			else if(value == 6) { num[6]++; }
			else if(value == 7) { num[7]++; }
			else if(value == 8) { num[8]++; }
		});
	} else {
		clusterO.forEach(function(e) {

			var value = getValue(e);
			if(value == 0) { num[0]++; }
			else if(value == 1) { num[1]++; }
			else if(value == 2) { num[2]++; }
			else if(value == 3) { num[3]++; }
			else if(value == 4) { num[4]++; }
			else if(value == 5) { num[5]++; }
			else if(value == 6) { num[6]++; }
			else if(value == 7) { num[7]++; }
			else if(value == 8) { num[8]++; }
		});
	}

	return num;
}

makePie = function() {

	var r = viz_width*0.3;
	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	// var nums = getClusterNum();
	// // console.log(nums);
	var nums = [1, 0, 0, 0, 0, 0, 0, 0, 0];

	pie = d3.layout.pie()
		.value(function(d) { return d; })
		.sort(null);

	arcPie = d3.svg.arc()
			.innerRadius(r - 3)
			.outerRadius(r + 3);

	pathPie = g_cluster.datum(nums).selectAll("path")
			.data(pie)
		.enter().append('path')
			.attr('fill', function(d, i) {

				return colorLists[i]; 
			})
			.attr("d", arcPie)
			.each(function(d) { this._current = d; })
			.attr("transform", "translate( 0," + viz_width*0.048 + ")");
}

updatePie = function() {

	console.log('update pie');

	var nums = getClusterNum();
	pie.value(function(d, i) { return nums[i]; });

	pathPie = pathPie.data(pie);
	pathPie.transition().duration(750).attrTween("d", arcTween2);
}


getStyleCluster = function(feature) { // for heatmap

	var id = feature.properties.PROV_ID;

	return {
		weight: 1,
		color: 'white', 
		opacity: 1,
		fillOpacity: 0.34,
		fillColor: getColorCluster(id)
	};
}

getColorCluster = function(id) { // for heatmap

	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	var color = '';

	if(clusterC_clicked) {
		clusterC.forEach(function(e) {
			if(legend_num == 2) { if(e.PROV_ID == id) { color = colorLists[ e.leg_2 ]; } }
			else if(legend_num == 3) { if(e.PROV_ID == id) { color = colorLists[ e.leg_3 ]; } }
			else if(legend_num == 4) { if(e.PROV_ID == id) { color = colorLists[ e.leg_4 ]; } }
			else if(legend_num == 5) { if(e.PROV_ID == id) { color = colorLists[ e.leg_5 ]; } }
			else if(legend_num == 6) { if(e.PROV_ID == id) { color = colorLists[ e.leg_6 ]; } }
			else if(legend_num == 7) { if(e.PROV_ID == id) { color = colorLists[ e.leg_7 ]; } }
			else if(legend_num == 8) { if(e.PROV_ID == id) { color = colorLists[ e.leg_8 ]; } }
			else if(legend_num == 9) { if(e.PROV_ID == id) { color = colorLists[ e.leg_9 ]; } }
		});
	} else {
		clusterO.forEach(function(e) {
			if(legend_num == 2) { if(e.PROV_ID == id) { color = colorLists[ e.leg_2 ]; } }
			else if(legend_num == 3) { if(e.PROV_ID == id) { color = colorLists[ e.leg_3 ]; } }
			else if(legend_num == 4) { if(e.PROV_ID == id) { color = colorLists[ e.leg_4 ]; } }
			else if(legend_num == 5) { if(e.PROV_ID == id) { color = colorLists[ e.leg_5 ]; } }
			else if(legend_num == 6) { if(e.PROV_ID == id) { color = colorLists[ e.leg_6 ]; } }
			else if(legend_num == 7) { if(e.PROV_ID == id) { color = colorLists[ e.leg_7 ]; } }
			else if(legend_num == 8) { if(e.PROV_ID == id) { color = colorLists[ e.leg_8 ]; } }
			else if(legend_num == 9) { if(e.PROV_ID == id) { color = colorLists[ e.leg_9 ]; } }
		});
	}

	return color;  
}


makeClusterGuide = function() {

	var r = viz_width/8;
	var t = (viz_width/2 - 40 - r)/ 9;

	var colorLists = ['#E91E63', '#3F51B5', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B', '#3bffeb' ];

	for(var i = 0; i < 9; i++) {

		g_cluster.append('circle')
			.attr('cx', 0)
			.attr('cy', 0)
			.attr('r', r + t*i)
			.attr('stroke', 'rgba(255,255,255,0.05)')
			.style('fill', 'none')
			.attr('stroke-width', 3);

		arc[i] = d3.svg.arc()
			.innerRadius(r + t*i - 3)
			.outerRadius(r + t*i + 3)
			.startAngle(0);
			// .endAngle( clusterScale(0.1) );

		path[i] = g_cluster.append('path')
			.style("fill", colorLists[i])
			.style('fill-opacity', 0.6)
			.attr('stroke', colorLists[i])
			.attr('stroke-width', 0)
			.datum({endAngle: clusterScale(0) })
			.attr('d', arc[i]);
	}
}


updateCluster = function() {

	var num_max = 0;
	var num = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // num_0 - num_8

	clusterC.forEach(function(e) {

		var value = getValue(e);
		if(value == 0) { num[0]++; }
		else if(value == 1) { num[1]++; }
		else if(value == 2) { num[2]++; }
		else if(value == 3) { num[3]++; }
		else if(value == 4) { num[4]++; }
		else if(value == 5) { num[5]++; }
		else if(value == 6) { num[6]++; }
		else if(value == 7) { num[7]++; }
		else if(value == 8) { num[8]++; }
	});

	num_max = d3.max(num);

	path[0].transition().duration(750).call(arcTween, clusterScale(num[0]/ num_max), 0 );
	path[1].transition().duration(750).call(arcTween, clusterScale(num[1]/ num_max), 1 );
	path[2].transition().duration(750).call(arcTween, clusterScale(num[2]/ num_max), 2 );
	path[3].transition().duration(750).call(arcTween, clusterScale(num[3]/ num_max), 3 );
	path[4].transition().duration(750).call(arcTween, clusterScale(num[4]/ num_max), 4 );
	path[5].transition().duration(750).call(arcTween, clusterScale(num[5]/ num_max), 5 );
	path[6].transition().duration(750).call(arcTween, clusterScale(num[6]/ num_max), 6 );
	path[7].transition().duration(750).call(arcTween, clusterScale(num[7]/ num_max), 7 );
	path[8].transition().duration(750).call(arcTween, clusterScale(num[8]/ num_max), 8 );
}


getValue = function(d) {

	var value = 0;

	if(legend_num == 2) { value = d.leg_2; }
	else if(legend_num == 3) { value = d.leg_3; }
	else if(legend_num == 4) { value = d.leg_4; }
	else if(legend_num == 5) { value = d.leg_5; }
	else if(legend_num == 6) { value = d.leg_6; }
	else if(legend_num == 7) { value = d.leg_7; }
	else if(legend_num == 8) { value = d.leg_8; }
	else if(legend_num == 9) { value = d.leg_9; }

	return value;
}


makeNumbers = function() {

	var xScale_cluster = d3.scale.linear()
				.domain([0, 7])
				.range([ -viz_width * 0.27, viz_width * 0.27 ]);

	for(var i = 0; i < 8; i++) {

		// select cluster number
		textNum[i] = g_cluster.append('text')
			.attr('x', xScale_cluster(i) - 2.2)
			.attr('y', viz_height*0.36 + 3)
			.text(i + 2)
			.attr("font-family", "neue") // HelveticaN, neue
			.attr("font-size", "9px")
			.attr("fill", function() {
				if(i == 0 ) { return 'rgba(157,184,252,0.93)'; }
				else { return 'rgba(255,255,255,0.3)'; }
			});


		circleNum[i] = g_cluster.append('circle').datum(i)
			.attr('cx', xScale_cluster(i) )
			.attr('cy', viz_height*0.36)
			.attr('r', 10)
			.on('click', function(d) {
				unselectCircleNum();
				d3.select(this).attr('stroke', 'rgba(255,255,255,1)');

				legend_num = d + 2;
				// updateCluster();
				updatePie();

				clusterLayer.setStyle( getStyleCluster );				
			})
			.style('fill', 'rgba(0,0,0,0)')
			.attr('stroke', function() {
				if(i == 0 ) { return 'rgba(157,184,252,0.93)'; }
				else { return 'rgba(255,255,255,0.3)'; }
			})
			.style("cursor", "pointer")
			.attr('stroke-width', 1.2);
	}
}

unselectCircleNum = function() {

	for(var i = 0; i < 8; i++) { 
		circleNum[i].attr('stroke', 'rgba(255,255,255,0.23)');
	}
} 

// ArcTween for Pie
arcTween2 = function(a) {

	var i = d3.interpolate(this._current, a);
	this._current = i(0);
	return function(t) {
		return arcPie(i(t));
	};
}

// ArcTween
arcTween = function(transition, newAngle, i) {

  // The function passed to attrTween is invoked for each selected element when
  // the transition starts, and for each element returns the interpolator to use
  // over the course of transition. This function is thus responsible for
  // determining the starting angle of the transition (which is pulled from the
  // element's bound datum, d.endAngle), and the ending angle (simply the
  // newAngle argument to the enclosing function).
  transition.attrTween("d", function(d) {

    // To interpolate between the two angles, we use the default d3.interpolate.
    // (Internally, this maps to d3.interpolateNumber, since both of the
    // arguments to d3.interpolate are numbers.) The returned function takes a
    // single argument t and returns a number between the starting angle and the
    // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
    // newAngle; and for 0 < t < 1 it returns an angle in-between.
    var interpolate = d3.interpolate(d.endAngle, newAngle);

    // The return value of the attrTween is also a function: the function that
    // we want to run for each tick of the transition. Because we used
    // attrTween("d"), the return value of this last function will be set to the
    // "d" attribute at every tick. (It's also possible to use transition.tween
    // to run arbitrary code for every tick, say if you want to set multiple
    // attributes from a single function.) The argument t ranges from 0, at the
    // start of the transition, to 1, at the end.
    return function(t) {

      // Calculate the current arc angle based on the transition time, t. Since
      // the t for the transition and the t for the interpolate both range from
      // 0 to 1, we can pass t directly to the interpolator.
      //
      // Note that the interpolated angle is written into the element's bound
      // data object! This is important: it means that if the transition were
      // interrupted, the data bound to the element would still be consistent
      // with its appearance. Whenever we start a new arc transition, the
      // correct starting angle can be inferred from the data.
      d.endAngle = interpolate(t);

      // Lastly, compute the arc path given the updated data! In effect, this
      // transition uses data-space interpolation: the data is interpolated
      // (that is, the end angle) rather than the path string itself.
      // Interpolating the angles in polar coordinates, rather than the raw path
      // string, produces valid intermediate arcs during the transition.
      return arc[i](d);
    };
  });
}

