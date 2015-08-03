drawOfficial = function() {

	// console.log(official);
	marginO = { top: 0, right: 0, bottom: 0, left: 0 };

	widthO = parseInt(d3.select('#viz_official').style('width'), 10),
	widthO = widthO - marginO.left - marginO.right,
	heightO = parseInt(d3.select('#viz_official').style('height'), 10),
	heightO = heightO - marginO.top - marginO.bottom;

	viz_official = d3.select('#viz_official').append('svg')
		.attr('width', widthO + marginO.left + marginO.right)
		.attr('height', heightO + marginO.top + marginO.bottom);

	g_official = viz_official.append('g')
		.attr('class', 'g_official')
		.attr("transform", "translate(" + marginO.left  +"," + marginO.top + ")");

	rect_height = 26;

	// g_official.append('rect')
	// 	.attr('x', 0)
	// 	.attr('y', 0)
	// 	.attr('width', widthO)
	// 	.attr('height', 34)
	// 	.style('fill', 'rgba(38,40,60,0.1)');

	drawBasicBar();
	drawOfficialBar();
	drawOfficialText();
	drawOfficialData();

	getProvince();
}

updateProvince = function(selectedProvince) {

	official.forEach(function(e) {
		if(e.id == selectedProvince) { 

			provinceName.text(e.NAME_2);

			crimeRate.text( d3.round(e.CrimeRate*100, 2) + ' %');
			higherEdu.text( d3.round(e.HighEdu, 2) + ' %');
			GDP.text('€ ' + d3.round(e.GDP/1000, 2) + 'k' );
			housingPrice.text( d3.round(e.HousingPrice, 2) );
			lifeExp.text( d3.round(e.LifeExp, 2) + ' yrs');
			unempRate.text( d3.round(e.UnemploymentRate, 2) + ' %');

			compareProvince(e);
		}
	});
}

getProvince = function() {

	var selectedProvince = 28;

	official.forEach(function(e) {
		if(e.id == selectedProvince) { 

			provinceName = g_official.append('text')
				.attr('class', 'title_official')
				.attr('x', widthO/2).attr('y', 32) // 24
				.attr("text-anchor", "middle")
				.text('Madrid');

			// console.log(e); 

			crimeRate.text( d3.round(e.CrimeRate*100, 2) + ' %');
			higherEdu.text( d3.round(e.HighEdu, 2) + ' %');
			GDP.text('€ ' + d3.round(e.GDP/1000, 2) + 'k' );
			housingPrice.text( d3.round(e.HousingPrice, 2) );
			lifeExp.text( d3.round(e.LifeExp, 2) + ' yrs');
			unempRate.text( d3.round(e.UnemploymentRate, 2) + ' %');

			compareProvince(e);
		}
	});
}


compareProvince = function(d) {

	var crimeRate_order = 0;
	var higherEdu_order = 0;
	var GDP_order = 0;
	var housingPrice_order = 0;
	var lifeExp_order = 0;
	var unempRate_order = 0;
	var cnt = 0;

	official.forEach(function(e) {

		if(d.CrimeRate < e.CrimeRate) { crimeRate_order++; }
		if(d.HighEdu < e.HighEdu) { higherEdu_order++; }
		if(d.GDP < e.GDP) { GDP_order++; }
		if(d.HousingPrice < e.HousingPrice) { housingPrice_order++; }
		if(d.LifeExp < e.LifeExp) { lifeExp_order++; }
		if(d.UnemploymentRate < e.UnemploymentRate) { unempRate_order++; }

		cnt++;
	});

	updateProvinceBar(cnt, crimeRate_order, higherEdu_order, GDP_order,
		housingPrice_order, lifeExp_order, unempRate_order);
}


updateProvinceBar = function(cnt, a, b, c, d, e, f) {

	var moveX = 16;
	var wScale = d3.scale.linear()
		.domain([ 0, 1 ])
		.range([ 0, widthO - moveX*2 ]);

	// console.log(a + ', ' + cnt);
	// console.log(cnt+','+a+','+b+','+c+','+d+','+e+','+f);

	a_bar.transition().duration(490).attr('width', function() { return wScale(1-a/cnt); });
	b_bar.transition().duration(490).attr('width', function() { return wScale(1-b/cnt); });
	c_bar.transition().duration(490).attr('width', function() { return wScale(1-c/cnt); });
	d_bar.transition().duration(490).attr('width', function() { return wScale(1-d/cnt); });
	e_bar.transition().duration(490).attr('width', function() { return wScale(1-e/cnt); });
	f_bar.transition().duration(490).attr('width', function() { return wScale(1-f/cnt); });
}


drawOfficialData = function() {

	var gap = (heightO  - 40 - rect_height) / 6;
	var moveY = 28 + 48;
	var moveX = 16;

	crimeRate = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + 0 + moveY)
		.text('0.47 %')
		.attr('class', 'data_official');

	higherEdu = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*1 + moveY)
		.text('20.47 %')
		.attr('class', 'data_official');

	GDP = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*2 + moveY)
		.text('€ 26.72k')
		.attr('class', 'data_official');

	housingPrice = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*3 + moveY)
		.text('0.12')
		.attr('class', 'data_official');

	lifeExp = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*4 + moveY)
		.text('82.6 yrs')
		.attr('class', 'data_official');

	unempRate = g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*5 + moveY)
		.text('19 %')
		.attr('class', 'data_official');
}

drawOfficialText = function() {

	var gap = (heightO  - 40 - rect_height) / 6;
	var moveY = 28 + 16;
	var moveX = 16;

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + 0 + moveY)
		.text('Crime rate')
		.attr('class', 'index_official');

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*1 + moveY)
		.text('Higher education')
		.attr('class', 'index_official');

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*2 + moveY)
		.text('GDP')
		.attr('class', 'index_official');

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*3 + moveY)
		.text('Housing price level')
		.attr('class', 'index_official');

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*4 + moveY)
		.text('Life expectancy')
		.attr('class', 'index_official');

	g_official.append('text')
		.attr('x', moveX).attr('y', rect_height + gap*5 + moveY)
		.text('Unemployment rate')
		.attr('class', 'index_official');
}


drawOfficialBar = function() {

	var gap = (heightO  - 40 - rect_height) / 6;
	var moveY = 28;
	var moveX = 16;

	var wScale = d3.scale.linear()
		.domain([ 0, 1 ])
		.range([ 0, widthO - moveX*2 ]);

	a_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + 0 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');

	b_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*1 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');

	c_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*2 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');

	d_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*3 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');

	e_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*4 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');

	f_bar = g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*5 + moveY)
		.attr('width',  function() { return wScale(Math.random()); })
		.attr('height', 2)
		.style('fill', 'rgba(255,255,255,1)');
}


drawBasicBar = function() {

	var gap = (heightO  - 40 - rect_height) / 6;
	var moveY = 28;
	var moveX = 16;

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + 0 + moveY)
		.attr('width',  widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*1 + moveY)
		.attr('width',  widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*2 + moveY)
		.attr('width',  widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*3 + moveY)
		.attr('width',  widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*4 + moveY)
		.attr('width',  widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');

	g_official.append('rect')
		.attr('x', moveX).attr('y', rect_height + gap*5 + moveY)
		.attr('width', widthO - moveX*2).attr('height', 2)
		.style('fill', 'rgba(255,255,255,0.2)');
}
 


