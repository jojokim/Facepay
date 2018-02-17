google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(draw_chart);

var frenquency = 150; // miliseconds
var average = 0; // keep track of the average
var count = 0; // count how many times we add the number

function total_sum (int num) {
	var intervalID = scope.setInterval(function(){ average(num); }, frenquency);
	count++;
}

function average (int num) {
	if (0 <= num && num <= 1) {
		average = (average * count + num) / (count + 1);
	}
	count++;
}

function draw_chart () {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Current Value');
    data.addColumn('number', 'Average Value');

    data.addRows([0.5, 0.6], [0.8, 0.7]);

    var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Sum'
        },
        colors: ['#AB0D06', '#007329'],
        trendlines: {
          0: {type: 'exponential', color: '#333', opacity: 1},
          1: {type: 'linear', color: '#111', opacity: .3}
        }
    };
    
    var chart = new google.visualization.LineChart();
      chart.draw(data, options);
}