var frenquency = 150; // miliseconds
var average = 0; // keep track of the average
var count = 0; // count how many times we add the number

function total_sum (int num) {
	var intervalID = scope.setInterval(function(){ average(num); }, frenquency);
	count++;
}

function average (int num) {
	if (0 <= num && num <= 1) {
		average = (average * count + num) / count + 1;
	}
}