var gameState = "canChoose"; // canChoose, waiting
var choiceImages = [
    "Rock.png",
    "Paper.png",
    "Scissors.png",
    "questionmark.png",
    "RockMirrored.png",
    "PaperMirrored.png",
    "ScissorsMirrored.png",
]

var score = [
    0, 0 // my score; his score
]

var choiceBeats = [
    2, // 0 (rock) beats 2 (scissors)
    0,
    1,
]

var myChoice = document.getElementById("myChoice");
var myChoiceImg = myChoice.getElementsByTagName('img')[0];

var hisChoice = document.getElementById("hisChoice");
var hisChoiceImg = hisChoice.getElementsByTagName('img')[0];

var scoreObj = document.getElementById("Score");
var outcome = document.getElementById("Outcome");

function chooseMove(number) {
    if(gameState!="canChoose") {return;}
    gameState = "waiting"

    // animation of my choice
    myChoice.classList.add("animateMyChoice");
    myChoiceImg.src = "Images/" + choiceImages[number];

    setTimeout(
        function() {
            myChoice.classList.remove("animateMyChoice");
            letHimChoose(number);
        },
        300
    )
}

function letHimChoose(number){
    // gets a random number for the pc's choice
    var hisMoveNr = getRndInteger(0, 2);
    
    hisChoice.classList.add("animateHisChoice");
    loopHisChoices(1, getRndInteger(4, 6), 10, getRndInteger(0, 2), hisMoveNr, function(){
        // his choice animation
        hisChoiceImg.src = "Images/" + choiceImages[hisMoveNr+4];
        setTimeout(
            function() {
                hisChoice.classList.remove("animateHisChoice");

                changeScore(number, hisMoveNr);
                gameState = "canChoose";
            },
            200
        )
    });
}

function loopHisChoices(i, times, last, now, hisMoveNr, endFunc){
    if(i<=times || now==hisMoveNr){
        while(last==now) {now = getRndInteger(0, 2);}
        last = now;

        // his choice animation
        //hisChoice.classList.add("animateHisChoice");
        hisChoiceImg.src = "Images/" + choiceImages[now+4];

        setTimeout(
            function() {
                loopHisChoices(i+1, times, last, now, hisMoveNr, endFunc);
            },
            200
        )
    }
    else{
        endFunc();
    }
}

function changeScore(number, hisNumber){
    if(number==hisNumber){ // tie
        outcome.innerHTML = "Tie";
    }
    else{
        if(choiceBeats[hisNumber]==number){  // he beats me (loss)
            score[1]++;
            outcome.innerHTML = "You lost";
        }
        else { // win
            score[0]++;
            outcome.innerHTML = "You won!";
        }
    }

    scoreObj.innerHTML = "<b> " + score[0] + " : " + score[1] + " </b>";
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max+0.999 - min) ) + min;
}
