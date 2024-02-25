// objects
var scoreObj = document.getElementById("Score")
var heartsObj = document.getElementById("Hearts")
var bubblesPlace = document.getElementById("BubblesPlace")
var startButton = document.getElementById("StartButton")
var gameOver = document.getElementById("GameOver")
var timerObj = document.getElementById("Timer")
var highscoreObj = document.getElementById("Highscore")

// other vars
var gameState = "canStart"; // canStart, playing
var score = 0;
var highscore = 0;
var hearts = 3;
var gameIntervalID;
var time = 60;

// tables
var bubbleValues = [
	[
		"🖤",
		80, // px
	],
	[
		100,
		100,
	],
	[
		100,
		120,
	],
	[
		250,
		70,
	],
	[
		500,
		60,
	]
]



// functions
function startGame(){
	if(gameState!="canStart"){return};
	gameState = "playing";

	gameOver.style.visibility = "hidden";
	startButton.style.visibility = "hidden";

	score = 0;
	hearts = 3;
	updateUI();

	time = 30;
	timerObj.innerHTML = time + "s left";
	updateTimer()
	createBubble();
}

function endGame(){
	gameState = "canStart";
	clearTimeout(gameTimeoutID);

	gameOver.style.visibility = "visible";
	startButton.style.visibility = "visible";
}

function updateTimer(){
	setTimeout(function(){
		time--;
		
		timerObj.innerHTML = time + "s left";
		if(time<=0){
			timerObj.innerHTML = "Time's up!"
			endGame()
		}

		if(gameState=="canStart") return;
		updateTimer();
	}, 1000)
}

function manageHighscore(){
	if(score>highscore){
		highscore = score;

		highscoreObj.innerHTML = "Highscore: " + highscore;
	}
}

function updateUI(){
	scoreObj.innerHTML = score + " Points";
	heartsObj.innerHTML = "❤️".repeat(hearts);

	if(hearts == 0)
		endGame();
}


function createBubble(){
	var bubbleNr = getRndInteger(0, bubbleValues.length-1);
	var bubbleObj = document.createElement('button');
	var lastingTime = getRndInteger(20, 40)/10;

	bubbleObj.state = "ready"
	bubbleObj.classList.add('bubble');
	
	bubbleObj.style.height = bubbleValues[bubbleNr][1] + "px";
	bubbleObj.style.width = bubbleValues[bubbleNr][1] + "px";
	bubbleObj.style.fontSize = bubbleValues[bubbleNr][1]/2.5 + "px";
	
	bubbleObj.style.top = getRndInteger(30, 80) + "%";
	bubbleObj.style.left = getRndInteger(30, 70) + "%";

	bubbleObj.addEventListener("click", function(){
		clickedBubble(bubbleObj);
	});

	bubbleObj.bValueIndex = bubbleNr
	bubbleObj.innerHTML = bubbleValues[bubbleNr][0];

	giveBubbleRndColor(bubbleObj);
	bubblesPlace.appendChild(bubbleObj);

	setTimeout(function(){
		destroyBubble(bubbleObj);
	}, lastingTime.toString()*1000);

	gameTimeoutID = setTimeout(createBubble, getRndInteger(2, 6)*100)
}

function clickedBubble(bubbleObj){
	destroyBubble(bubbleObj);
	
	if(gameState=="playing"){
		if(bubbleObj.bValueIndex!=0){
			rewardSFX();
			score += bubbleValues[bubbleObj.bValueIndex][0];
			manageHighscore();
		}
		else{
			wrongSFX();
			hearts--;
		}
	
		updateUI();
		bubbleObj.state = "popped"
	}
}

function destroyBubble(bubbleObj){
	if(bubbleObj.state=="ready"){
		bubblesPlace.removeChild(bubbleObj);
		bubbleObj.state = "destroyed"
	}
}

function getRndInteger(min, max){
    return Math.floor(Math.random() * (max+0.999 - min) ) + min;
}

function giveBubbleRndColor(bubbleObj){
	var h = getRndInteger(0, 360);
	var s = getRndInteger(70, 100);
	var l = getRndInteger(50, 70);

	bubbleObj.style.borderColor = "hsl(" +
		+ h + ","
		+ s + "%,"
		+ l
	+ "%)"

	bubbleObj.style.backgroundColor = "hsl(" +
		+ h + ","
		+ s/1.5 + "%,"
		+ l
	+ "%)"
}


var audio3 = document.getElementById("sound3");
function rewardSFX(volume){
	audio3.volume = volume || .1;
	audio3.load();
	audio3.play();
}

var audio4 = document.getElementById("sound4");
function wrongSFX(volume){
	audio4.volume = volume || .06;
	audio4.load();
	audio4.play();
}