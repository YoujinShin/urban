unselectDots = function() {
	selectedCollection.forEach(function(d) { 

		var prov_id = d.PROV_ID;
		circleObjects[prov_id].style('visibility', 'hidden');
	});
}

selectDots = function() {
	selectedCollection.forEach(function(d) { 

		var prov_id = d.PROV_ID;
		circleObjects[prov_id].style('visibility', 'visible');
		circleObjects[prov_id].moveToFront();
	});
}

var order = 0;

getColor = function() {

	// var colorLists = ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', 
	// 				'#2196F3', '#009688', '#4CAF50', '#FF5722' ];

	var colorLists = ['#3F51B5', '#E91E63', '#F44336', '#9C27B0',
					'#2196F3', '#009688', '#4CAF50', '#FFEB3B' ];

	order++;
	if(order > colorLists.length - 1) { order = 0; }

	return colorLists[ order ];
}

button_clicked = false;

getButton = function() {

	var w = 22;

	button = g.append('rect')
				.attr('x', width/2 - 40)
				.attr('y', -width/2 + 60)
				.attr('width', w)
				.attr('height', w)
				.style('fill', '#97b0fb')
				.style('fill-opacity', 0)
				.attr('rx', 6)
				.attr('stroke', '#97b0fb')
				.style('stroke-opacity', 1)
				.attr('stroke-width', 1.2)
				.on("click", function() {
					
					if(button_clicked == false) {
						d3.select(this).style('fill-opacity', 0);
						button_dot.style('fill', '#97b0fb');
						// d3.select(this).style('fill-opacity', 0.4);
						// button_dot.style('fill', '#fff'
						selectDots();

						button_clicked = true;
					} else {
						// d3.select(this).style('fill-opacity', 0.4);
						// button_dot.style('fill', '#fff');
						d3.select(this).style('fill-opacity', 0);
						button_dot.style('fill', '#97b0fb');
						unselectDots();

						button_clicked = false;
					}
				});

	button_dot = g.append('circle')
			.attr('cx', width/2 + w/2 - 40)
			.attr('cy', -width/2 + 60 + w/2 )
			.attr('r', 2)
			// .style('fill', '#fff')
			.style('fill', '#97b0fb')
			.style('fill-opacity', 1)
			.attr('stroke', '#fff')
			.attr('stroke-width', 0)
			.on("click", function() {

				if(button_clicked == false) {
					button.style('fill-opacity', 0);
					button_dot.style('fill', '#97b0fb');
					// button.style('fill-opacity', 0.4);
					// button_dot.style('fill', '#fff'
					selectDots();

					button_clicked = true;
				} else {
					// button.style('fill-opacity', 0.4);
					// button_dot.style('fill', '#fff');
					button.style('fill-opacity', 0);
					button_dot.style('fill', '#97b0fb');
					unselectDots();

					button_clicked = false;
				}
			});
}