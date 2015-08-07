drawArc2 = function() {

	official_norm.forEach(function(d, i) { 

		var radius = 2;
		var opac = 0.3;

		d.PROV_ID = + d.PROV_ID;

		var prov_id = d.PROV_ID;
		var province = d.NAME_2;

		var poly = [{"r":d.GDP, "t":0, "NAME_2":d.NAME_2, "index":"GDP"},
					{"r":d.HousingPrice,"t":1, "NAME_2":d.NAME_2, "index":"Housing Price Level"},
					{"r":d.UnemploymentRate,"t":2, "NAME_2":d.NAME_2, "index":"Unemployment Rate"},
					{"r":d.HighEdu,"t":3, "NAME_2":d.NAME_2, "index":"Higher Education Rate"},
					{"r":d.CrimeRate, "t":4, "NAME_2":d.NAME_2, "index":"Crime Rate"},
					{"r":d.LifeExp,"t":5, "NAME_2":d.NAME_2, "index":"Life Expectancy"}];

		var c = 'blue';
		if(i == 0) { 
			radiusGuide_official();
			axisGuide_official(poly); 
		};

		rectObjects2[prov_id] = g_official_norm.selectAll(".polygon")
				.data([poly])
			.enter().append("polygon")
				.attr("points",function(p) { 
					return p.map(function(p) { return [getX_official(p.r, p.t),getY_official(p.r, p.t)].join(","); }).join(" ");
				})
				.style("fill", c) // pink
				.style("visibility", 'hidden')
				.style("fill-opacity",0.45)
				.attr("stroke", c)
				.style("stroke-opacity", 1)
				.attr("stroke-width",1.2)
				.on("mouseover", function(d) {
					d3.select(this).attr("stroke-width", 2);
					d3.select(this).style("stroke-opacity", 1);

					tooltip.text(province);
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", function(){
					tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
				})
				.on("mouseout", function(d) {
					d3.select(this).attr("stroke-width", 1);
					d3.select(this).style("stroke-opacity", 0.7);
					tooltip.style("visibility", "hidden");
					});

		// 	// circles
		var d_th = Math.PI / poly.length;

		circleObjects2[prov_id] = g_official_norm.selectAll('.circle')
				.data(poly)
			.enter().append("circle")
				.attr('r', 2)
				.attr("cx", function(d) {
					var th = d.t * 2* d_th + d_th;
					return getX(d.r, th);
				})
				.attr("cy", function(d) {
					var th = d.t * 2* d_th + d_th;
					return getY(d.r, th);
				})
				.style("fill", '#9db8fc')
				.style('visibility', 'hidden')
				.on("mouseover", function(d) {
					d3.select(this).attr("stroke-width", 2);
					tooltip.text(d.NAME_2 );
					tooltip.style("visibility", "visible");
				})
				.on("mousemove", function(){
					tooltip.style("top", (event.pageY-35)+"px").style("left",(event.pageX+10)+"px");
				})
				.on("mouseout", function(d) {
					d3.select(this).attr("stroke-width", 0);
					tooltip.style("visibility", "hidden");
				})
				.style('fill-opacity', 0.5);
	});

		// // button.style('fill-opacity', 0.6);
		// // button_dot.style('fill', '#fff');
	// unselectDots(selectedCollection);
	// selectVizOne2(28);
}


getX_official = function(d, t) {
	var r = rScale(d);
	var th = t * ( 2 * Math.PI / dataSize2) + Math.PI / dataSize2;
	return r * Math.cos(th);
}

getY_official = function(d, t) {
	var r = rScale(d);
	var th = t * ( 2 * Math.PI / dataSize2) + Math.PI / dataSize2;
	return r * Math.sin(th);
}


axisGuide_official = function(poly) {

	var d_th = Math.PI / poly.length;

	g_official_norm.selectAll('.line')
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


	axisNames2 = d3.selectAll('p')
			.data(poly)
	.enter().append('div')
		.attr('class', 'index_off_norm')
		.style("top", function(d) { 
			var th = d.t * 2* d_th + d_th;
			return getdy(d.t, th)+ 12+"px"; 
		})
		.style("right", function(d) { 
			var th = d.t * 2* d_th + d_th;
			return viz_width*0.93-getdx(d.t, th) + 10+ "px"; 
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


radiusGuide_official = function() {

	g_official_norm.append('circle')
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('r', rScale(1))
	.attr('fill', 'rgba(200,200,200,0.5)');

	for(var i = 0; i <5; i++ ) {
		var variable = ( i + 1 ) * 0.2;
		var radius = rScale( variable );

		g_official_norm.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', radius)
		.style('fill-opacity', 0)
		.attr('stroke', '#fff')
		.attr('stroke-width', 0.5);

		g_official_norm.append('text')
		.attr('class', 'numbers')
		.attr('x', radius * Math.cos(Math.PI * 0) + 2)
		.attr('y', radius * Math.sin(Math.PI * 0) + 5)
		.text(d3.round(variable, 1))
		.style("text-anchor", "start");
	}
}

