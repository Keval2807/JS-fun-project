// Challenge 1: No of days between given years

function numberOfDays(){
    var firstYear = prompt("Enter 1st year");
    var secondYear = prompt("Enter 2nd year greater than 1st");
    var noOfDays = (secondYear - firstYear) * 365; 
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('There are ' + noOfDays + ' days from year ' + firstYear + ' to year ' + secondYear + ' .');
    h1.setAttribute('id', 'noOfDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('noOfDays').remove();
}

// Challenge 2: Iron-man Generator

function generateIronman() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-ironman-gen');
    image.src = "static/Images/ironman.jpg";
    div.appendChild(image);
}

// Challenge 3: Rock Paper Scissors

var allImages = document.getElementsByTagName('img');

var copyAllImages = [];
for (let i=0; i < allImages.length; i++) {
    copyAllImages.push(allImages[i])
}

var copyText = document.getElementById('choose');

function rpsGame(yourChoice) {
    var userChoice, botChoice;
    userChoice = yourChoice.id;
    botChoice = ['rock','paper','scissors'][Math.floor(Math.random()*3)];
    results = decideWinner(userChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'rock': 0, 'paper': 1, 'scissors': 0.5}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0){
        return {'message': 'You Lost!', 'color': 'red'};
    }
    else if (yourScore === 0.5){
    return {'message': 'You Tied!', 'color': '#e9e900'}; 
    }
    else {
    return {'message': 'You Won!', 'color': '#00c000'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    document.getElementById('choose').remove();
    document.getElementById('challenge-3').setAttribute('style', 'padding-bottom: 40px;');
    document.getElementById('rps').setAttribute('style', 'padding-bottom: 10px;');

    var humanDiv = document.createElement('div');
    humanDiv.setAttribute('id', 'humanDivImage');

    var botDiv = document.createElement('div');
    botDiv.setAttribute('id', 'botDivImage');
    
    var messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', 'messageDivText');
    
    var resetRps = document.createElement('button');
    var resetText = document.createTextNode('Reset');
    resetRps.setAttribute('class', 'btn btn-danger');
    resetRps.setAttribute('id', 'resetBtn');
    resetRps.setAttribute('style', 'height: 50px; width: 150px; margin-top: 50px;');
    resetRps.setAttribute('onclick', 'resetImages()');
    resetRps.appendChild(resetText);


    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(0, 18, 117, 0.7);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 0.9);'>";
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    document.getElementById('flex-box-rps-div').appendChild(resetRps);

}

function resetImages() {

    document.getElementById('humanDivImage').remove();
    document.getElementById('messageDivText').remove();
    document.getElementById('botDivImage').remove();
    document.getElementById('resetBtn').remove();

    document.getElementById('challenge-3').removeAttribute('style', 'padding-bottom: 40px;');
    document.getElementById('rps').removeAttribute('style', 'padding-bottom: 10px;');

    for(let i=0; i < 3; i++) {
        document.getElementById('flex-box-rps-div').appendChild(copyAllImages[i]);
    }    
    document.getElementById('h3-div').appendChild(copyText);
}

// Challenge 4: Change the Colors of all the Buttons

var allButtons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1])
}

function buttonColorChange(thisButton) {
    if (thisButton.value === 'red') {
        buttonsRed();
    }
    else if (thisButton.value === 'green') {
        buttonsGreen();
    }
    else if (thisButton.value === 'reset') {
        buttonColorReset();
    }
    else if (thisButton.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i=0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i=0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i=0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning']
    for (let i=0; i < allButtons.length; i++) {
        let randomNumber = Math.floor(Math.random()*4);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}

// Challenge 5: blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'], 
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11]}, 
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'dealer-wins': 0,
    'dealer-losses': 0,
    'isHit': true,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('static/Sounds/swish.m4a');
const lossSound = new Audio('static/Sounds/aww.mp3');
const winSound = new Audio('static/Sounds/cash.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        blackjackGame['isHit'] = false;
    }   
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/Images/${card}.jpg`;
        cardImage.setAttribute('style', 'border-radius: 15px;');
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for(let i=0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        for(let i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector(YOU['scoreSpan']).style.color = 'white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    
        document.querySelector(YOU['scoreSpan']).textContent = '0';
        document.querySelector(DEALER['scoreSpan']).textContent = '0';
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "white";

        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }  
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic(){

    if(blackjackGame['isHit'] === false){

        blackjackGame['isStand'] = true;

        while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }

        blackjackGame['turnsOver'] = true; 
        blackjackGame['isHit'] = true;
        let winner = computeWinner();
        showResult(winner);
    }
}

//Deciding winner

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        // condition: higher score than dealer OR
        // dearler busts and you dont
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            blackjackGame['dealer-losses']++;
            winner = YOU;
        }
        else if(YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            blackjackGame['dealer-wins']++;
            winner = DEALER;
        }
        else if(YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    // condition: user busts and dealer doesn't
    else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        blackjackGame['dealer-wins']++;
        winner = DEALER;
    }
    // condition: both bust
    else if(YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            document.querySelector('#dealer-losses').textContent = blackjackGame['dealer-losses'];
            message = 'You Won!';
            messageColor = '#00c000';
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            document.querySelector('#dealer-wins').textContent = blackjackGame['dealer-wins'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            document.querySelector('#dealer-draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }  
}

