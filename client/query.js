sendQuery= function(mapId) {
	
	var theData=comparisons.findOne({_id:mapId}); // selected map id
	var theIds=[]; // selected provinces id

	// console.log('mapId: '+mapId);
	// console.log(comparisons.findOne({_id:mapId}));
	
	if(theData && _.size(theData)>0) {
	
		// loop through the selection of the map
		_.each(theData.selection, function(value, index) {
			// push each ids
			// console.log(value.properties);
			theIds.push(value.properties.PROV_ID);
		});
		
		console.log("# sending queries for ids: "+theIds);
		
		if(_.size(theIds)>0) {
		
			var apiUrl="http://senseable3.mit.edu/bbvaapi/index.php/urbanlens";
			
			var result=Meteor.http.call("POST", apiUrl, 
				{
					params: {ids:theIds}, 
					headers: {'content-type':'application/x-www-form-urlencoded'}
				}, function (error, result) {
					if (error) {
						console.log(error.response);
					}

					if (result.statusCode === 200) {
						// parse result
						data=JSON.parse(result.content);

						console.log("# receiving data");
						console.log(data[0]);

						var indicator1 = data[0].indicator1;
						var indicator2 = data[0].indicator2;
						var indicator3 = data[0].indicator3;

						// store the data in the collection
						comparisons.update(
							{_id:mapId}, 
							{ 
								$set: {
									indicators: data[0]
								}
							}
						);

						// data viz change
						renderViz(mapId, indicator1, indicator2, indicator3);
					} // end of if

				} // end of function

			); // end of meteor.http.call

		} else {

			// no selection at all

			// update
			comparisons.update(
				{_id:mapId}, 
				{ 
					$set: {
						indicators: null
					}
				}
			);

		} // end of else
		
	} // end of if



} // end of sendQuery

