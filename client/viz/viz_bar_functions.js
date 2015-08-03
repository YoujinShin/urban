window.selectedValue = undefined;

makeBarGuide = function() {

	for(var i = 0; i < 6; i++) {

		var value = i * 0.2;
		var zero = d3.format(".1n");

		g_bar.append('line')
			.attr('x1', xScale(0))
			.attr('x2', xScale(52))
			.attr('y1', yScale(value))
			.attr('y2', yScale(value))
			.attr('stroke', 'rgba(255,255,255,0.2)')
			.style("stroke-dasharray", ("1, 3"));

		g_bar.append('text')
			.text(zero(value))
			.attr('class', 'bar_number')
			.attr('x', xScale(52) + 5)
			.attr('y', yScale(value))
			.attr('stroke', 'none')
			.style('fill', 'rgba(255,255,255,0.5)')
			.attr('text-anchor', 'start');
	}

	g_bar.append('text')
		.text('A - Z')
		.attr('class', 'bar_number')
		.attr('x', xScale(0))
		.attr('y', yScale(0) + 16)
		.attr('stroke', 'none')
		.style('fill', 'rgba(255,255,255,0.8)')
		.attr('text-anchor', 'start');
}

makeDropDown = function() {

	dropDown = d3.select('body').append("select")
		.attr("id", "indicator-list")
		.attr("name", "indicator-list")
		.attr("class", "indicator_list");

	options = dropDown.selectAll("option")
			.data(selectedLegend)
		.enter()
			.append("option")
			.text(function(d) { return d.indicator; })
			.attr("value", function (d) { return d.value; });

	dropDown.on("change", menuChanged );
}

makeDropDown2 = function() {

	dropDown2 = d3.select('body').append("select")
		.attr("id", "indicator-list2")
		.attr("name", "indicator-list2")
		.attr("class", "indicator_list2");

	// console.log()

	options2 = dropDown2.selectAll("option")
			.data(legend4)
		.enter()
			.append("option")
			.text(function(d) { return d.indicator; })
			.attr("value", function (d) { return d.value; });

	dropDown2.on("change", menuChanged );
}

///// 얘는 그대로 두기
menuChanged = function() {

	selectedValue = d3.event.target.value.replace(/ /g, '');

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

getDescription2 = function(selectedValue) {

	selectedLegend.forEach(function(d) {
		if(d.get == selectedValue) {

			index_name2.text(d.indicator);
			index_des2.text(d.description);
		}
	});
}



getStyleBar2 = function(feature) {

	var id = feature.properties.PROV_ID;

	return {
		fillOpacity: getColorBar2(feature.properties.PROV_ID, selectedValue)
	};
}

getColorBar2 = function(id, selectedValue) {

	var value = getIndicatorValue2(id, selectedValue);
	return value;
}

getIndicatorValue2 = function(id, selectedValue) {

	for(var i = 0; i < selectedCollection.length; i++) {

		var d = selectedCollection[i];
		d.id = +d.id;
		
		if(d.id == id) { return selectIndicators(d, selectedValue); }
	}
}

//////////////////////////////////////////////////////////////////
selectIndicators = function(d, selectedValue) {

	// Collection1
	if(selectedValue == 'SpatialActivity') { return d.SpatialActivity; }
	else if(selectedValue == 'MoneyEarned') { return d.MoneyEarned; }
	else if(selectedValue == 'AvgTransactionEarned') { return d.AvgTransactionEarned; }
	else if(selectedValue == 'CustomerActivity') { return d.CustomerActivity; }
	else if(selectedValue == 'CustomerAvgTransaction') { return d.CustomerAvgTransaction; }
	else if(selectedValue == 'OutofProvinceEarnings') { return d.OutofProvinceEarnings; }
	else if(selectedValue == 'ForeignEarnings') { return d.ForeignEarnings; }
	else if(selectedValue == 'EarningsDiversity') { return d.EarningsDiversity; }
	else if(selectedValue == 'SpendingDiversity') { return d.SpendingDiversity; }
	else if(selectedValue == 'BusinessDensity') { return d.BusinessDensity; }
	else if(selectedValue == 'AvgBusinessSize') { return d.AvgBusinessSize; }

	// Collection2
	if(selectedValue == 'Gas/parking/tollSpending') { return d.GasSpending; }
	else if(selectedValue == 'TaxiSpending') { return d.TaxiSpending; }
	else if(selectedValue == 'PublictransportationSpending') { return d.PublicSpending; }
	else if(selectedValue == 'Cafes/restaurantsSpending') { return d.CafeSpending; }
	else if(selectedValue == 'FastfoodSpending') { return d.FastSpending; }
	else if(selectedValue == 'FoodSpending') { return d.FoodSpending; }
	else if(selectedValue == 'RecreationSpending') { return d.RecSpending; }
	else if(selectedValue == 'Fashion/beauty/jewelrySpending') { return d.FashionSpending; }
	else if(selectedValue == 'MedicalSpending') { return d.MedicalSpending; }
	else if(selectedValue == 'CulturalSpending') { return d.CulturalSpending; }
	else if(selectedValue == 'TravelSpending') { return d.TravelSpending; }

	// Collection3
	if(selectedValue == 'NighttimeSpending') { return d.NightTime; }
	else if(selectedValue == 'WeekendSpending') { return d.Weekend; }
	else if(selectedValue == 'NighttimeMoneySpending') { return d.NightTimeMoney; }
	else if(selectedValue == 'WeekendMoneySpending') { return d.WeekendMoney; }
	else if(selectedValue == 'NighttimeEarning') { return d.NightTimeEarning; }
	else if(selectedValue == 'WeekendEarning') { return d.WeekendEarning; }
	else if(selectedValue == 'NighttimeTransactions') { return d.NightTimeTransactions; }
	else if(selectedValue == 'WeekendTransactions') { return d.WeekendTransactions; }
	else if(selectedValue == 'ActivityOutsideProvince') { return d.ActivityOutside; }
	else if(selectedValue == 'ActivityInsideProvince') { return d.ActivityInside; }
	else if(selectedValue == 'MoneyspentOutsideProvince') { return d.MoneyOutside; }

	else if(selectedValue == 'SpendinginExpensiveBusiness') { return d.SpendingExpensive; }


	// Collection4
	if(selectedValue == 'GDP') { return d.GDP; }
	else if(selectedValue == 'HousingPriceLevel') { return d.HousingPrice; }
	else if(selectedValue == 'UnemploymentRate') { return d.UnemploymentRate; }
	else if(selectedValue == 'HigherEducationRate') { return d.HighEdu; }
	else if(selectedValue == 'CrimeRate') { return d.CrimeRate; }
	else if(selectedValue == 'LifeExpectancy') { return d.LifeExp; }
	
}


// selectIndicators = function(d, selectedValue) {

// 	// Collection1
// 	if(selectedValue == 'ActivityEarned') { return d.ActivityEarned; }
// 	else if(selectedValue == 'MoneyEarned') { return d.MoneyEarned; }
// 	else if(selectedValue == 'AvgTransactionEarned') { return d.AvgTransactionEarned; }
// 	else if(selectedValue == 'CustomerActivity') { return d.CustomerActivity; }
// 	else if(selectedValue == 'CustomerAvgTransaction') { return d.CustomerAvgTransaction; }
// 	else if(selectedValue == 'OutofProvinceEarnings') { return d.OutofProvinceEarnings; }
// 	else if(selectedValue == 'ForeignEarnings') { return d.ForeignEarnings; }
// 	else if(selectedValue == 'EarningsDiversity') { return d.EarningsDiversity; }
// 	else if(selectedValue == 'SpendingDiversity') { return d.SpendingDiversity; }
// 	else if(selectedValue == 'BusinessDensity') { return d.BusinessDensity; }
// 	else if(selectedValue == 'AvgBusinessSize') { return d.AvgBusinessSize; }

// 	// Collection2
// 	if(selectedValue == 'Gas/parking/tollSpending') { return d.GasSpending; }
// 	else if(selectedValue == 'TaxiSpending') { return d.TaxiSpending; }
// 	else if(selectedValue == 'PublictransportationSpending') { return d.PublicSpending; }
// 	else if(selectedValue == 'Cafes/restaurantsSpending') { return d.CafeSpending; }
// 	else if(selectedValue == 'FastfoodSpending') { return d.FastSpending; }
// 	else if(selectedValue == 'FoodSpending') { return d.FoodSpending; }
// 	else if(selectedValue == 'RecreationSpending') { return d.RecSpending; }
// 	else if(selectedValue == 'Fashion/beauty/jewelrySpending') { return d.FashionSpending; }
// 	else if(selectedValue == 'MedicalSpending') { return d.MedicalSpending; }
// 	else if(selectedValue == 'CulturalSpending') { return d.CulturalSpending; }
// 	else if(selectedValue == 'TravelSpending') { return d.TravelSpending; }

// 	// Collection3
// 	if(selectedValue == 'NighttimeSpending') { return d.NightTime; }
// 	else if(selectedValue == 'WeekendSpending') { return d.Weekend; }
// 	else if(selectedValue == 'NighttimeMoneySpending') { return d.NightTimeMoney; }
// 	else if(selectedValue == 'WeekendMoneySpending') { return d.WeekendMoney; }
// 	else if(selectedValue == 'NighttimeEarning') { return d.NightTimeEarning; }
// 	else if(selectedValue == 'WeekendEarning') { return d.WeekendEarning; }
// 	else if(selectedValue == 'NighttimeTransactions') { return d.NightTimeTransactions; }
// 	else if(selectedValue == 'WeekendTransactions') { return d.WeekendTransactions; }
// 	else if(selectedValue == 'ActivityOutsideProvince') { return d.ActivityOutside; }
// 	else if(selectedValue == 'ActivityInsideProvince') { return d.ActivityInside; }
// 	else if(selectedValue == 'MoneyspentOutsideProvince') { return d.MoneyOutside; }

// // MoneyspentInsideProvince
// // SpendinginExpensivelocations
// // d.MoneyInside	d.SpendingExpensive
// }
