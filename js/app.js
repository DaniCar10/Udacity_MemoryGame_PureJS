/*
=========== GLOBAL VARIABLES =========
*/

let card = document.getElementsByClassName("card");
const cards = [...card]; /* using ... for cleaner code */
const deck = document.getElementById("card-deck");
let moves = 0;
let countMoves = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let matchedCards = document.getElementsByClassName("match");
let closeIcon = document.querySelector(".close");
let modal = document.getElementById("modal")
var arrayCards = [];



/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 * It takes an array of elements and it randomly shuffles them
 * giving back a new array with the same lenght of elements
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// ==== GAMEON SECTION =======


// Start game function

window.onload = gameOn();

function gameOn() {
    let random = shuffle(cards);
    for (let i = 0; i < random.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    moves = 0;
    countMoves.innerHTML = moves;

    second = 0;
    minute = 0;
    hour = 0;
    let clock = document.querySelector(".clock");
    clock.innerHTML = "0 m 0 s";
    clearInterval(interval);

      /*reset stars*/
	    stars.forEach(function(star) {
      star.style.visibility = "visible";
	    });
}

// ====== FUNCTIONS - CHECK THE CARDS =======

function card_match() {
    arrayCards[0].classList.add("match", "disabled");
    arrayCards[1].classList.add("match", "disabled");
    arrayCards[0].classList.remove("show", "open", "no-event");
    arrayCards[1].classList.remove("show", "open", "no-event");
    arrayCards = [];
}

function card_unmatch() {
    arrayCards[0].classList.add("unmatched");
    arrayCards[1].classList.add("unmatched");
    disabled();
    setTimeout(function() {
        arrayCards[0].classList.remove("show", "open", "no-event", "unmatched");
        arrayCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        arrayCards = [];
    }, 1100);
}

// ====== FUNCTIONS ENABLE CARDS =======

function disabled() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add("disabled");
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCards.length; i++) {
            matchedCards[i].classList.add("disabled");
        }
    });
}

//====== FUNCTIONS - CARD BEHAVIORS =======

var starterCards = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


function cardFlipped() {
    arrayCards.push(this);
    var flips = arrayCards.length;
    if (flips === 2) {
        movesIncrement();
        if (arrayCards[0].type === arrayCards[1].type) {
            card_match();
        } else {
            card_unmatch();
        }
    }
}

//====== FUNCTIONS - PLAYER MOVES =======

function movesIncrement() {
    moves++;
    countMoves.innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    if (moves > 6 && moves < 14) {
        for (let i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 16) {
        for (let i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }

}

//====== FUNCTIONS - TIME MANAGEMENT =======

var second = 0,
    minute = 0;
hour = 0;
var clock = document.querySelector(".clock");
var interval;

function startTimer() {
    interval = setInterval(function() {
        clock.innerHTML = minute + "m " + second + "s";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


//====== FUNCTIONS - WINNER POPUP  =======



function closeModal() {
    closeIcon.addEventListener("click", function() {
        modal.classList.remove("show");
        gameOn();
    });
}


function congrats() {
    if (matchedCards.length == 16) {
        clearInterval(interval);
        timeResult = clock.innerHTML;
        // a well done modal is shown
        modal.classList.add("show");
        // a varible star rating is created
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("moveResult").innerHTML = moves;
        document.getElementById("starResult").innerHTML = starRating;
        document.getElementById("timeResult").innerHTML = timeResult;
        closeModal();
    };
}

//====== FUNCTIONS - NEW GAME  =======

function newGame() {
    modal.classList.remove("show");
    gameOn();
}

for (let i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", starterCards);
    card.addEventListener("click", cardFlipped);
    card.addEventListener("click", congrats);
};
