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
	
	showSummaryGraph(20,walkData,"walk-summary-graph","ColumnChart");
	showSummaryGraph(20,weightData,"weight-summary-graph","AreaChart");
	
	//showWalkGraph(30);
	//showWeightGraph(30);
	
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
		width: 300, 
		height: 100,
		legend: 'none'
       });
}

function showBigGraph(amount, skip, data, name){
	var dataView = new google.visualization.DataView(data);
	var maxIndex = dataView.getNumberOfRows()-1;
	
	// Update skip amount & scrolling button states
	var rightButtonState="enable", leftButtonState="enable";
	if (!skip || skip <= 0){
		skip = 0;
		rightButtonState = "disable";
	}
	if (skip >= maxIndex-amount){
		skip = maxIndex-amount;
		leftButtonState  = "disable";
	}
	skips[name] = skip;
	
	var lastIndex = maxIndex - skip;
	var firstIndex = lastIndex - amount
	dataView.setRows(firstIndex, lastIndex);
	
	if (!graphs[name]){
		graphs[name] = new google.visualization.AreaChart(document.getElementById(name));
	}
	
	graphs[name].draw(dataView, {width: 922, height: 300});
	
	// Update scrolling buttons
	$("#"+name+"-container .scrollbutton.right").button(rightButtonState);
	$("#"+name+"-container .scrollbutton.left").button(leftButtonState);
}

function showWalkGraph(days, skip){
	showBigGraph(days,skip,walkData,"walk-graph");
}

function showWeightGraph(days, skip){
	showBigGraph(days,skip,weightData,"weight-graph");
}

function scrollWalkGraph(days){
	showWalkGraph(30,skips["walk-graph"]-days);
}

function scrollWeightGraph(days){
	showWeightGraph(30,skips["weight-graph"]-days);
}