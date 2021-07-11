// CHALLENGE 1:

function ageInDays() {
    var birthYear = prompt("What year were you born in?")
    result = 2020 - birthYear;
    result = result*365;

    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode("You are "+ result+ " years old.")
    h1.setAttribute("id", "result");
    h1.appendChild(textAnswer);

    document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
    document.getElementById("result").remove();
}

// CHALLANGE 2:

function generateCat() {
    var img = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    img.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(img);
}


// CHALLANGE 3:

function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = chooseRandom();
    console.log(humanChoice + " " + botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function chooseRandom() {
    let array = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random()*3);
    return array[index];
}

function decideWinner(humanChoice, botChoice) {
    let rpsDataBase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5},
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1}
    }
    
    let yourScore = rpsDataBase[humanChoice][botChoice];
    let botScore = rpsDataBase[botChoice][humanChoice];

    return [yourScore, botScore];
}

function finalMessage([humanScore, botScore]) {
    if (humanScore === botScore) {
        return {'text': 'You Tied!', 'color': 'yellow'}
    } else if (humanScore > botScore) {
        return {'text': 'You Won!', 'color': 'green'}
    } else {
        return {'text': 'You Lost!', 'color': 'red'}
    }
}

function rpsFrontEnd(humanChoice, botChoice, message) {
    var imagesDataBase = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src
    }

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML= "<img src= '" +imagesDataBase[humanChoice] + "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"    

    botDiv.innerHTML= "<img src= '" +imagesDataBase[botChoice] + "' height =150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"    

    messageDiv.innerHTML = "<h1 style='color: " + message['color'] + "; font-size: 60px; padding: 30px; '>" + message['text'] + "</h1>"

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);

}


// CHALLENGE 4

let allButtons = document.getElementsByTagName('button');
console.log(allButtons);

let originalColors = [];
for (let i = 0; i < allButtons.length; i++) {
    originalColors.push(allButtons[i].classList[1]);
}

function buttonColorChange(buttonColor) {
    console.log(buttonColor.value);

    if (buttonColor.value === 'red') {
        buttonRed();
    } else if (buttonColor.value === 'green') {
        buttonGreen();
    } else if (buttonColor.value === 'reset') {
        buttonReset();
    } else if (buttonColor.value === 'random') {
        buttonRandom();
    } else if (buttonColor.value === 'yellow') {
        buttonYellow();
    } else if(buttonColor.value === 'blue') {
        buttonBlue();
    }
}

function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}


function buttonYellow() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-warning');
    }
}


function buttonBlue() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-primary');
    }
}

function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(originalColors[i]);
    }
}

function buttonRandom() {
    let choices = ['btn-success', 'btn-warning', 'btn-danger', 'btn-primary']
    let random;

    for (let i = 0; i < allButtons.length; i++) {
        random = Math.floor(Math.random() *4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[random]);
    }
}




//// CHALLANGE 5: BLACKJACK
let blackJackGame = {
    'you': {'scoreSpan': '#blackjack-results-you', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#blackjack-results-dealer', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const loseSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand').addEventListener('click', dealerLogic);

function blackjackHit() {
    if (blackJackGame['isStand'] === false) {
        let card = randomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    }
}

function randomCard() {
    let index = Math.floor(Math.random()*13);
    return blackJackGame['cards'][index];
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackJackGame['turnsOver'] === true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    
        for(let i = 0; i < yourImages.length; i++)
        yourImages[i].remove();

        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for(let i = 0; i < dealerImages.length; i++)
            dealerImages[i].remove();

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#blackjack-results-you').textContent = 0;
        document.querySelector('#blackjack-results-dealer').textContent = 0;
        document.querySelector('#blackjack-results-you').style.color = 'white';
        document.querySelector('#blackjack-results-dealer').style.color = 'white';

        document.querySelector('#blackjack-results').textContent = "Let's Play!";
        document.querySelector('#blackjack-results').style.color = 'black';

        blackJackGame['isStand'] = false;
        blackJackGame['turnsOver'] = false;
    }
    
}

function updateScore(activePlayer, card) {
    if (card === 'A') {
        if ((activePlayer['score']) + blackJackGame['cardsMap'][card] <= 21) {
            activePlayer['score'] += 11;
        } else {
            activePlayer['score'] += 1;
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }

    

}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackJackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackJackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }
    
    blackJackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if ((DEALER['score'] < YOU['score'])  ||  (DEALER['score'] > 21)) {
            winner = YOU;
            blackJackGame['wins']++;
            console.log("You won!"); 
        } else if (DEALER['score'] > YOU['score']) {
            winner = DEALER;
            blackJackGame['losses']++;
            console.log("You lost!"); 
        } else if (YOU['score'] === DEALER['score']) {
            console.log("You drew!"); 
            blackJackGame['draws']++;
        }
    } else {
        if (DEALER['score'] <= 21) {
            winner = DEALER;
            blackJackGame['losses']++;
            console.log("You lost!"); 
        } else {
           console.log("You drew!"); 
           blackJackGame['draws']++;
        }
    }

    console.log(winner);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackJackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#blackjack-wins').textContent = blackJackGame['wins'];
            message = "You WON!"
            messageColor = 'green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#blackjack-losses').textContent = blackJackGame['losses'];
            message = "You LOST!"
            messageColor = 'red'
            loseSound.play();
        } else {
            document.querySelector('#blackjack-draws').textContent = blackJackGame['draws'];
            message = "You DREW!"
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-results').textContent = message;
        document.querySelector('#blackjack-results').style.color = messageColor;
    }   
}