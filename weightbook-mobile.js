var debug = true;
var weight, walk;
var weightData, walkData;
var weightTarget, walkTarget;

$(document).ready(function() {
	weight = round(80+Math.random()*10,2);
	//console.log(weight);
	weightTarget = round(weight-2);
	walk = 7000;
	walkTarget = 10000;
	
	generateDataTables();
	
	$.mobile.activePage.trigger('update');
});

$(document).orientationchange(function() {
	$.mobile.activePage.trigger('update');
});

$('div').live('pagehide',function(event, ui){
	ui.nextPage.trigger('update');
});

$('#mainPage').live('update',function(event, ui){
	log("mainPage update");
	showGraph(7,walkData,"walk-summary-graph","ColumnChart");
	showGraph(7,weightData,"weight-summary-graph","AreaChart");
});

$('#walkPage').live('update',function(event, ui){
	log("walkPage update");
	showGraph(7,walkData,"walk-graph","ColumnChart");
});

$('#weightPage').live('update',function(event, ui){
	log("weightPage update");
	showGraph(7,weightData,"weight-graph","AreaChart");
});

function generateDataTables(){

	log("generateDataTables")
	
	/* Initialize Tables */
				
    weightData = new google.visualization.DataTable();
    weightData.addColumn('date', 'Date');
    weightData.addColumn('number', 'Paino');
	weightData.addColumn('number', 'Tavoite');
	
	walkData = new google.visualization.DataTable();
    walkData.addColumn('date', 'Date');
    walkData.addColumn('number', 'Kävely');
	walkData.addColumn('number', 'Tavoite');
	
	// Let's generate some of data back from today
	
	var amount = 100; // how many days back to history
	var date = new Date();
	date.setDate(date.getDate()-amount-1);
	for (var i=amount;i>0;i--){
		date = new Date(date)
		date.setDate(date.getDate()+1);
		
		weight = round(weight + Math.random()*-0.2,2);
		weightTarget = Math.round(weight-2);
		weightData.addRow([date, weight, weightTarget]);
		
		var walk = Math.round(walkTarget/2+Math.random()*walkTarget);
		walkData.addRow([date, walk, walkTarget]);
	}
	
	// Format dates nicely
	
	var formatter_short = new google.visualization.DateFormat({pattern: "d.M"});
	formatter_short.format(weightData, 0);
	formatter_short.format(walkData, 0);
}

function showGraph(days,data,elementName,type){
	
	log("showGraph " + elementName);
	
	if(!data){
		return;
	}
	
	if(!type){
		type = "AreaChart";
	}
	
	var dataView = new google.visualization.DataView(data);
	var lastIndex = dataView.getNumberOfRows()-1;
	dataView.setRows(lastIndex-days, lastIndex);
	dataView.setColumns([0,1]);
	   
	var summaryChart = new google.visualization[type](document.getElementById(elementName));
	summaryChart.draw(dataView,{
		legend: 'none',
		backgroundColor: '#ffffff'
       });
}

function log(string){
	//if (debug && console && log){
	//	console.log(string);
	//}
}

function round(value,decimals){
	if (!decimals || decimals < 1){
		return Math.round(value);
	}
	if (value == 0){
		return value;
	}
	var divider = Math.pow(10,decimals);
	return Math.round(value*divider)/divider;
}
