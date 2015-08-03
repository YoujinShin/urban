window.number = 11;
window.collection4_clicked = false;

radiusGuide = function() {

	g.append('circle')
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('r', rScale(1))
	.attr('fill', 'rgba(200,200,200,0.5)');g

	for(var i = 0; i <5; i++ ) {
		var variable = ( i + 1 ) * 0.2;
		var radius = rScale( variable );

		g.append('circle')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', radius)
		.style('fill-opacity', 0)
		.attr('stroke', '#fff')
		.attr('stroke-width', 0.5);

		g.append('text')
		.attr('class', 'numbers')
		.attr('x', radius * Math.cos(Math.PI * 0) + 2)
		.attr('y', radius * Math.sin(Math.PI * 0) + 5)
		.text(d3.round(variable, 1))
		.style("text-anchor", "start");
	}
}

getX = function(d, th) {
	var r = rScale(d);
	return r * Math.cos(th);
}

getY = function(d, th) {
	var r = rScale(d);
	return r * Math.sin(th);
}

getX2 = function(d, t) {
	var r = rScale(d);
	var th = t * ( 2 * Math.PI / dataSize) + Math.PI / dataSize;
	return r * Math.cos(th);
}

getY2 = function(d, t) {
	var r = rScale(d);
	var th = t * ( 2 * Math.PI / dataSize) + Math.PI / dataSize;
	return r * Math.sin(th);
}

getdy = function(i, th) {
	var v = 1.26;//1.28
	return d_y + rScale(v)*Math.sin(th)+10;
}

getdx = function(i, th) {
	var v = 1.28;
	return d_x + rScale(v)*Math.cos(th);
}

initCollection = function() {

	col_1 = body.append("div").attr("id", "col_1").html('')
			.on("mouseover", function() { })
			.on("mouseout", function() { })
			.on("click", function() {

				if(collection4_clicked) { showSelectedArray(); }

				$('#col_1').css('background-color', 'rgba(255,255,255,0.8)');
				$('#col_2').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_3').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_4').css('background-color', 'rgba(255,255,255,0.2)');
				collection_num = 1;
				number = 11;

				unselectAllViz_official();
				selectedCollection = collection1;
				selectedLegend = legend1;
				changeCollection(); 

				if(dataviz_clicked) {
					g.style('visibility', 'visible');
					g_official_norm.style('visibility', 'hidden');
				}

				if(heatmap_clicked) {
					$('.indicator_list').css('visibility', 'visible');
					$('.indicator_list2').css('visibility', 'hidden');
				}

				$('#col_name').text('Business Oriented');
				collection4_clicked = false;
			});

	col_2 = body.append("div").attr("id", "col_2").html('')
			.on("mouseover", function() { })
			.on("mouseout", function() { })
			.on("click", function() {

				if(collection4_clicked) { showSelectedArray(); }
				
				$('#col_1').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_2').css('background-color', 'rgba(255,255,255,0.8)');
				$('#col_3').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_4').css('background-color', 'rgba(255,255,255,0.2)');
				collection_num = 2;
				number = 11;

				unselectAllViz_official();
				selectedCollection = collection2;
				selectedLegend = legend2;
				changeCollection(); 
				$('#col_name').text('Customer Oriented');

				if(dataviz_clicked) {
					g.style('visibility', 'visible');
					g_official_norm.style('visibility', 'hidden');
					$('.index_off_norm').css('visibility', 'hidden');
					$('.index').css('visibility', 'visible');
				}

				if(heatmap_clicked) {
					$('.indicator_list').css('visibility', 'visible');
					$('.indicator_list2').css('visibility', 'hidden');
				}

				collection4_clicked = false;
			});

	col_3 = body.append("div").attr("id", "col_3").html('')
			.on("mouseover", function() { })
			.on("mouseout", function() { })
			.on("click", function() {

				if(collection4_clicked) { showSelectedArray(); }

				$('#col_1').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_2').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_3').css('background-color', 'rgba(255,255,255,0.8)');
				$('#col_4').css('background-color', 'rgba(255,255,255,0.2)');
				collection_num = 3;
				number = 11;

				unselectAllViz_official();
				selectedCollection = collection3;
				selectedLegend = legend3;
				changeCollection(); 

				$('#col_name').text('Categories of Spending');

				if(dataviz_clicked) {
					g.style('visibility', 'visible');
					g_official_norm.style('visibility', 'hidden');
					$('.index_off_norm').css('visibility', 'hidden');
					$('.index').css('visibility', 'visible');
				}	

				if(heatmap_clicked) {
					$('.indicator_list').css('visibility', 'visible');
					$('.indicator_list2').css('visibility', 'hidden');
				}

				collection4_clicked = false;			
			});

	col_4 = body.append("div").attr("id", "col_4").html('')
			.on("mouseover", function() { })
			.on("mouseout", function() { })
			.on("click", function() {

				showSelectedArray_official();

				$('#col_1').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_2').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_3').css('background-color', 'rgba(255,255,255,0.2)');
				$('#col_4').css('background-color', 'rgba(255,255,255,0.8)');
				collection_num = 4;
				number = 5;

				selectedCollection = official_norm;
				unselectAllViz();
				selectedLegend = legend4;


				// changeCollection(); 

				if(dataviz_clicked) {
					g.style('visibility', 'hidden');
					g_official_norm.style('visibility', 'visible');
					$('.index_off_norm').css('visibility', 'visible');
					$('.index').css('visibility', 'hidden');
				}

				if(heatmap_clicked) {
					$('.indicator_list').css('visibility', 'hidden');
					$('.indicator_list2').css('visibility', 'visible');
					// menuChanged();
					changeBarGraph2();
				}

				$('#col_name').text('Official indicators');

				collection4_clicked = true;
			});
}

showSelectedArray = function() {

	selectedArray.forEach(function(e) {
		rectObjects[e.id].style("fill", e.color);
		rectObjects[e.id].attr('stroke', e.color);
		rectObjects[e.id].style("visibility", "visible");
	});
}

showSelectedArray_official = function() {

	selectedArray.forEach(function(e) {
		rectObjects2[e.id].style("fill", e.color);
		rectObjects2[e.id].attr('stroke', e.color);
		rectObjects2[e.id].style("visibility", "visible");
	});
}