
var grid = [];
var age = 0;

function firstPeriod(elem, cols, rows) {

	age = 0;

	for (var i = 0; i < rows; i++)
	{
		elem[i] = [];

		for (var z = 0; z < cols; z++) {
			
			elem[i][z] = 0;
		}
	}
}

firstPeriod(grid, 25, 25);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sq = canvas.width / grid.length;
var intervalId = 0;

var btnStart = document.getElementById("start");
var btnStop = document.getElementById("stop");
var btnReset = document.getElementById("reset");
var glider = document.getElementById("glider");
var stat = document.getElementsByTagName("i")[0];
var ageText = document.getElementsByTagName("i")[1];

canvas.addEventListener("click", coord);
btnStart.addEventListener("click", run);
btnStop.addEventListener("click", stop);
btnReset.addEventListener("click", reset);
glider.addEventListener("click", gliderShape);

function run () {

    stat.innerHTML = "Is playing...";

    intervalId = setInterval(drawLife, 500);
}

function stop () {

    stat.innerHTML = "Stopped...";

    clearInterval(intervalId);
}

function reset () {

    stat.innerHTML = "Stopped...";
    ageText.innerHTML = "0";

    clearInterval(intervalId);

    firstPeriod(grid, 25, 25);

    drawLife(true)
}

drawLife(true)

function drawLife (newLife) {

	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );

	var temp = [];

	if (!newLife) {

		age++;

		ageText.innerHTML = age;
	}			

	for (var y = 0, row = 0; y < canvas.height; y += sq, row++) {

		temp[row] = [];

		for (var x = 0, col = 0; x < canvas.width; x += sq, col++) {

			ctx.fillStyle="#000";
			ctx.strokeStyle = "#ccc";
			
			var status = grid[row][col];
            
            if (!newLife) {
			    temp[row][col] = getCondition(row,col,status);
            }
            
			var life = +status ? ctx.fillRect(x,y,sq,sq) : ctx.strokeRect(x,y,sq,sq);
		}
	}

    if (!newLife) {
        grid = temp;
    }
}

function getCondition (row, col,status) {

	var env = [];
	
	if (typeof grid[row-1] !== 'undefined') {env.push( grid[row-1][col-1] );};
	if (typeof grid[row-1] !== 'undefined') {env.push( grid[row-1][col] );};
	if (typeof grid[row-1] !== 'undefined') {env.push( grid[row-1][col+1] );};

	if (typeof grid[row]  !== 'undefined') {env.push( grid[row][col-1]  );};
	if (typeof grid[row] !== 'undefined') {env.push( grid[row][col+1] );};

	if (typeof grid[row+1] !== 'undefined') {env.push( grid[row+1][col-1] );};
	if (typeof grid[row+1]  !== 'undefined') {env.push( grid[row+1][col]  );};
	if (typeof grid[row+1] !== 'undefined') {env.push( grid[row+1][col+1] );};

	var count = +countInArray(1,env);

	if (count < 2 || count > 3) {

		return 0;
	}
	else if (count == 3)
	{
		return 1;
	}

	return status;
}


function countInArray(what, where) {

	var counter = 0;

    for(var i=0; i<where.length; i++)

        if(what == where[i])
        {
            counter++;
        }

    return counter;
}

function coord (e) {
    var pos = {};
    pos.x = parseInt((e.pageY - canvas.offsetTop)/sq);
    pos.y = parseInt((e.pageX - canvas.offsetLeft)/sq);
    
    grid[pos.x][pos.y] = 1;
    
    drawLife(true)
}

function gliderShape () {

	grid = [];

	firstPeriod(grid, 25, 25);

	grid[1][2] = 1;
	grid[2][3] = 1;
	grid[3][1] = 1;
	grid[3][2] = 1;
	grid[3][3] = 1;

	drawLife(true);
}