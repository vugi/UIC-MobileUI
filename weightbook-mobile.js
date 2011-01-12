var weightData, walkData;
var weightTarget, walkTarget;
var graphs = {};
var skips = {};

function drawCharts(){
	
	/* Generate Data */
				
    weightData = new google.visualization.DataTable();
    weightData.addColumn('date', 'Date');
    weightData.addColumn('number', 'Paino');
	weightData.addColumn('number', 'Tavoite');
	
	walkData = new google.visualization.DataTable();
    walkData.addColumn('date', 'Date');
    walkData.addColumn('number', 'Kävely');
	walkData.addColumn('number', 'Tavoite');

	// Initial values
	var weight = 80+Math.random()*10;
	weightTarget = Math.round(weight-2);
	walkTarget = 10000;
	
	// Let's generate some of data back from today
	var amount = 100;
	var date = new Date();
	date.setDate(date.getDate()-amount-1);
	for (var i=amount;i>0;i--){
		date = new Date(date)
		date.setDate(date.getDate()+1);
		
		weight += Math.random()*-0.2;
		weightTarget = Math.round(weight-2);
		weightData.addRow([date, weight, weightTarget]);
		
		var walk = Math.round(walkTarget/2+Math.random()*walkTarget);
		walkData.addRow([date, walk, walkTarget]);
	}
	
	setTimeout(function(){
		showSummaryGraph(20,walkData,"walk-summary-graph","ColumnChart");
	showSummaryGraph(20,weightData,"weight-summary-graph","AreaChart");
	}, 1000);
	
}

function showSummaryGraph(days,data,elementName,type){
	if(!type){
		type = "AreaChart";
	}
	var dataView = new google.visualization.DataView(data);
	var lastIndex = dataView.getNumberOfRows()-1;
	dataView.setRows(lastIndex-7, lastIndex);
	dataView.setColumns([1]);
	   
	var summaryChart = new google.visualization[type](document.getElementById(elementName));
	summaryChart.draw(dataView,{
		legend: 'none',
		backgroundColor: '#E9EAEB'
       });
}