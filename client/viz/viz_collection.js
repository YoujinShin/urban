drawArc = function() {

	selectedCollection.forEach(function(d, i) { 

			var radius = 2;
			var opac = 0.3;
			var prov_id = d.PROV_ID;
			var province = d.NAME_2;

			var poly = [{"r":d.MoneyEarned, "t":0, "NAME_2":d.NAME_2, "index":"Money Earned"},
						{"r":d.AvgTransactionEarned,"t":1, "NAME_2":d.NAME_2, "index":"Avg Transaction Earned"},
						{"r":d.OutofProvinceEarnings,"t":2, "NAME_2":d.NAME_2, "index":"Out of Province Earnings"},
						{"r":d.ForeignEarnings,"t":3, "NAME_2":d.NAME_2, "index":"Foreign Earnings"},
						{"r":d.EarningsDiversity, "t":4, "NAME_2":d.NAME_2, "index":"Earnings Diversity"},
						{"r":d.BusinessDensity,"t":5, "NAME_2":d.NAME_2, "index":"Business Density"},
						{"r":d.NightTimeEarning,"t":6, "NAME_2":d.NAME_2, "index":"Nighttime Earning"},
						{"r":d.WeekendEarning,"t":7, "NAME_2":d.NAME_2, "index":"Weekend Earning"},
						{"r":d.NightTimeTransactions,"t":8, "NAME_2":d.NAME_2, "index":"Nighttime Transactions"},
						{"r":d.WeekendTransactions,"t":9, "NAME_2":d.NAME_2, "index":"Weekend Transactions"},
						{"r":d.SpendingExpensive,"t":10, "NAME_2":d.NAME_2, "index":"Spending in Expensive locations"}];

			// var poly = [{"r":d.ActivityEarned, "t":0, "NAME_2":d.NAME_2, "index":"Activity Earned"},
			// 			{"r":d.MoneyEarned,"t":1, "NAME_2":d.NAME_2, "index":"Money Earned"},
			// 			{"r":d.AvgTransactionEarned,"t":2, "NAME_2":d.NAME_2, "index":"Avg Transaction Earned"},
			// 			{"r":d.CustomerActivity,"t":3, "NAME_2":d.NAME_2, "index":"Customer Activity"},
			// 			{"r":d.CustomerAvgTransaction, "t":4, "NAME_2":d.NAME_2, "index":"Customer Avg Transaction"},
			// 			{"r":d.OutofProvinceEarnings,"t":5, "NAME_2":d.NAME_2, "index":"Out of Province Earnings"},
			// 			{"r":d.ForeignEarnings,"t":6, "NAME_2":d.NAME_2, "index":"Foreign Earnings"},
			// 			{"r":d.EarningsDiversity,"t":7, "NAME_2":d.NAME_2, "index":"Earnings Diversity"},
			// 			{"r":d.SpendingDiversity,"t":8, "NAME_2":d.NAME_2, "index":"Spending Diversity"},
			// 			{"r":d.BusinessDensity,"t":9, "NAME_2":d.NAME_2, "index":"Business Density"},
			// 			{"r":d.AvgBusinessSize,"t":10, "NAME_2":d.NAME_2, "index":"Avg Business Size"}];

			var c = '#ff4081';
			if(i == 0) { axisGuide(poly) };

			rectObjects[prov_id] = g.selectAll(".polygon")
					.data([poly])
				.enter().append("polygon")
					.attr("points",function(p) { 
						return p.map(function(p) { return [getX2(p.r, p.t),getY2(p.r, p.t)].join(","); }).join(" ");
					})
					.style("fill", c) // pink
					.style("visibility", 'hidden')
					.style("fill-opacity",0.46)
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
					

			// circles
			var d_th = Math.PI / poly.length;
			// console.log(poly.length +', ' + dataSize);

			circleObjects[prov_id] = g.selectAll('.circle')
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

		unselectDots(selectedCollection);
		selectVizOne2(28);
}

changeDots = function() {

	selectedCollection.forEach(function(d) { 

		var prov_id = d.PROV_ID;
		var d_th = Math.PI / dataSize;

		circleObjects[prov_id]
			.attr("cx", function(d) {
				var th = d.t * 2* d_th + d_th;
				return getX(d.r, th);
			})
			.attr("cy", function(d) {
				var th = d.t * 2* d_th + d_th;
				return getY(d.r, th);
			})
			.style("fill", '#9db8fc')
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
			});
	});
}

changeCollection = function() {
	// console.log(number);

	selectedCollection.forEach(function(d) {

		var prov_id = d.id;
		var current = rectObjects[prov_id][0][0];

		var tempPolygon;
		var currentX;
		var currentY;

		for(var i = 0; i < number; i++) {
			
			var currentData = current.__data__[i]; 
			//{r: "0.50648", t: 0, NAME_2: "Santa Cruz de Tenerife", index: "Activity Earned"}
			var currentPoints = current.points[i];

			currentData.t = i;
			currentData.NAME_2 = d.NAME_2;
			currentData.r = getR(i, d);
			currentData.index = getIndex(i);

			// currentPoints.x = getX2(currentData.r, currentData.t);
			// currentPoints.y = getY2(currentData.r, currentData.t);

			currentX = getX2(currentData.r, currentData.t);
			currentY = getY2(currentData.r, currentData.t);

			if(tempPolygon == undefined) { tempPolygon = currentX +"," + currentY }
			else { tempPolygon = tempPolygon + " "+ currentX +"," + currentY }
		}

		d3.select(current).transition().duration(800).attr("points", tempPolygon);
		
	});

	changeAxisNames();
	changeDropDown();
	changeBarGraph();
	changeDots();
}

changeAxisNames = function() {

	axisNames.each(function(e, i) {

		e.index = getIndex(i);
		d3.select(this).text(e.index);
		d3.select(this).on("mouseover", function(d) { getDescription(e.index); });
	});
}

/////////////////////////////////////////////////////////////////////
getR = function(i, d) {

	if(collection_num == 1) {

		if(i == 0) { return d.MoneyEarned; } 
		else if(i == 1) { return d.AvgTransactionEarned; } 
		else if(i == 2) { return d.OutofProvinceEarnings; } 
		else if(i == 3) { return d.ForeignEarnings; } 
		else if(i == 4) { return d.EarningsDiversity; } 
		else if(i == 5) { return d.BusinessDensity; } 
		else if(i == 6) { return d.NightTimeEarning; } 
		else if(i == 7) { return d.WeekendEarning; } 
		else if(i == 8) { return d.NightTimeTransactions; } 
		else if(i == 9) { return d.WeekendTransactions; } 
		else if(i == 10) { return d.SpendingExpensive; }
	}

	if(collection_num == 2) {

		if(i == 0) { return d.SpatialActivity; } 
		else if(i == 1) { return d.CustomerActivity; } 
		else if(i == 2) { return d.CustomerAvgTransaction; } 
		else if(i == 3) { return d.SpendingDiversity; } 
		else if(i == 4) { return d.NightTime; } 
		else if(i == 5) { return d.Weekend; } 
		else if(i == 6) { return d.NightTimeMoney; } 
		else if(i == 7) { return d.WeekendMoney; } 
		else if(i == 8) { return d.ActivityOutside; } 
		else if(i == 9) { return d.ActivityInside; } 
		else if(i == 10) { return d.MoneyOutside; }
	}
										
	if(collection_num == 3) {

		if(i == 0) { return d.GasSpending; } 
		else if(i == 1) { return d.TaxiSpending; } 
		else if(i == 2) { return d.PublicSpending; } 
		else if(i == 3) { return d.CafeSpending; } 
		else if(i == 4) { return d.FastSpending; } 
		else if(i == 5) { return d.FoodSpending; } 
		else if(i == 6) { return d.RecSpending; } 
		else if(i == 7) { return d.FashionSpending; } 
		else if(i == 8) { return d.MedicalSpending; } 
		else if(i == 9) { return d.CulturalSpending; } 
		else if(i == 10) { return d.TravelSpending; }
	}

	if(collection_num == 4) {

		if(i == 0) { return d.GDP; } 
		else if(i == 1) { return d.HousingPrice; } 
		else if(i == 2) { return d.UnemploymentRate; } 
		else if(i == 3) { return d.HighEdu; } 
		else if(i == 4) { return d.CrimeRate; } 
		else if(i == 5) { return d.LifeExp; } 
	}

}

getIndex = function(i) {

	if(collection_num == 1) {

		if(i == 0) { return "Money Earned"; } 
		else if(i == 1) { return "Avg Transaction Earned"; } 
		else if(i == 2) { return "Out of Province Earnings"; } 
		else if(i == 3) { return "Foreign Earnings"; } 
		else if(i == 4) { return "Earnings Diversity"; } 
		else if(i == 5) { return "Business Density"; } 
		else if(i == 6) { return "Nighttime Earning"; } 
		else if(i == 7) { return "Weekend Earning"; } 
		else if(i == 8) { return "Nighttime Transactions"; } 
		else if(i == 9) { return "Weekend Transactions"; } 
		else if(i == 10) { return "Spending in Expensive Business"; }
	}

	if(collection_num == 2) {

		if(i == 0) { return "Spatial Activity"; }  // Activity Earned
		else if(i == 1) { return "Customer Activity"; } 
		else if(i == 2) { return "Customer Avg Transaction"; } 
		else if(i == 3) { return "Spending Diversity"; } 
		else if(i == 4) { return "Nighttime Spending"; } 
		else if(i == 5) { return "Weekend Spending"; } 
		else if(i == 6) { return "Nighttime Money Spending"; } 
		else if(i == 7) { return "Weekend Money Spending"; } 
		else if(i == 8) { return "Activity Outside Province"; } 
		else if(i == 9) { return "Activity Inside Province"; } 
		else if(i == 10) { return "Money spent Outside Province"; }
	}

	if(collection_num == 3) {

		if(i == 0) { return "Gas/ parking/ toll Spending"; } 
		else if(i == 1) { return "Taxi Spending"; } 
		else if(i == 2) { return "Public transportation Spending"; } 
		else if(i == 3) { return "Cafes/ restaurants Spending"; } 
		else if(i == 4) { return "Fastfood Spending"; } 
		else if(i == 5) { return "Food Spending"; } 
		else if(i == 6) { return "Recreation Spending"; } 
		else if(i == 7) { return "Fashion/ beauty/ jewelry Spending"; } 
		else if(i == 8) { return "Medical Spending"; } 
		else if(i == 9) { return "Cultural Spending"; } 
		else if(i == 10) { return "Travel Spending"; }
	}

	if(collection_num == 4) {

		if(i == 0) { return "GDP"; } 
		else if(i == 1) { return "Housing Price Level"; } 
		else if(i == 2) { return "Unemployment Rate"; } 
		else if(i == 3) { return "Higher Education Rate"; } 
		else if(i == 4) { return "Crime Rate"; } 
		else if(i == 5) { return "Life Expectancy"; } 
	}
}



// getR = function(i, d) {

// 	if(collection_num == 1) {

// 		if(i == 0) { return d.ActivityEarned; } 
// 		else if(i == 1) { return d.MoneyEarned; } 
// 		else if(i == 2) { return d.AvgTransactionEarned; } 
// 		else if(i == 3) { return d.CustomerActivity; } 
// 		else if(i == 4) { return d.CustomerAvgTransaction; } 
// 		else if(i == 5) { return d.OutofProvinceEarnings; } 
// 		else if(i == 6) { return d.ForeignEarnings; } 
// 		else if(i == 7) { return d.EarningsDiversity; } 
// 		else if(i == 8) { return d.SpendingDiversity; } 
// 		else if(i == 9) { return d.BusinessDensity; } 
// 		else if(i == 10) { return d.AvgBusinessSize; }
// 	}

// 	if(collection_num == 2) {

// 		if(i == 0) { return d.GasSpending; } 
// 		else if(i == 1) { return d.TaxiSpending; } 
// 		else if(i == 2) { return d.PublicSpending; } 
// 		else if(i == 3) { return d.CafeSpending; } 
// 		else if(i == 4) { return d.FastSpending; } 
// 		else if(i == 5) { return d.FoodSpending; } 
// 		else if(i == 6) { return d.RecSpending; } 
// 		else if(i == 7) { return d.FashionSpending; } 
// 		else if(i == 8) { return d.MedicalSpending; } 
// 		else if(i == 9) { return d.CulturalSpending; } 
// 		else if(i == 10) { return d.TravelSpending; }
// 	}

// 	if(collection_num == 3) {

// 		if(i == 0) { return d.NightTime; } 
// 		else if(i == 1) { return d.Weekend; } 
// 		else if(i == 2) { return d.NightTimeMoney; } 
// 		else if(i == 3) { return d.WeekendMoney; } 
// 		else if(i == 4) { return d.NightTimeEarning; } 
// 		else if(i == 5) { return d.WeekendEarning; } 
// 		else if(i == 6) { return d.NightTimeTransactions; } 
// 		else if(i == 7) { return d.WeekendTransactions; } 
// 		else if(i == 8) { return d.ActivityOutside; } 
// 		else if(i == 9) { return d.ActivityInside; } 
// 		else if(i == 10) { return d.MoneyOutside; }
// 	}
// }

// getIndex = function(i) {

// 	if(collection_num == 1) {

// 		if(i == 0) { return "Activity Earned"; } 
// 		else if(i == 1) { return "Money Earned"; } 
// 		else if(i == 2) { return "Avg Transaction Earned"; } 
// 		else if(i == 3) { return "Customer Activity"; } 
// 		else if(i == 4) { return "Customer Avg Transaction"; } 
// 		else if(i == 5) { return "Out of Province Earnings"; } 
// 		else if(i == 6) { return "Foreign Earnings"; } 
// 		else if(i == 7) { return "Earnings Diversity"; } 
// 		else if(i == 8) { return "Spending Diversity"; } 
// 		else if(i == 9) { return "Business Density"; } 
// 		else if(i == 10) { return "Avg Business Size"; }
// 	}

// 	if(collection_num == 2) {

// 		if(i == 0) { return "Gas/ parking/ toll Spending"; } 
// 		else if(i == 1) { return "Taxi Spending"; } 
// 		else if(i == 2) { return "Public transportation Spending"; } 
// 		else if(i == 3) { return "Cafes/ restaurants Spending "; } 
// 		else if(i == 4) { return "Fastfood Spending "; } 
// 		else if(i == 5) { return "Food Spending"; } 
// 		else if(i == 6) { return "Recreation Spending"; } 
// 		else if(i == 7) { return "Fashion/ beauty/ jewelry Spending"; } 
// 		else if(i == 8) { return "Medical Spending"; } 
// 		else if(i == 9) { return "Cultural Spending"; } 
// 		else if(i == 10) { return "Travel Spending"; }
// 	}

// 	if(collection_num == 3) {

// 		if(i == 0) { return "Nighttime Spending"; } 
// 		else if(i == 1) { return "Weekend Spending"; } 
// 		else if(i == 2) { return "Nighttime Money Spending"; } 
// 		else if(i == 3) { return "Weekend Money Spending"; } 
// 		else if(i == 4) { return "Nighttime Earning"; } 
// 		else if(i == 5) { return "Weekend Earning"; } 
// 		else if(i == 6) { return "Nighttime Transactions"; } 
// 		else if(i == 7) { return "Weekend Transactions"; } 
// 		else if(i == 8) { return "Activity Outside Province"; } 
// 		else if(i == 9) { return "Activity Inside Province"; } 
// 		else if(i == 10) { return "Money spent Outside Province"; }
// // Money spent Inside Province
// // Spending in Expensive locations
// 	}
// }



