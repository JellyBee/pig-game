/*
PIG GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

////////////////////////////////////////////////////////

// Set a value - SETTER:
// document.querySelector('#cscore-0').textContent = dice;

// Get a value - GETTER:
// var x = document.querySelector('#score-0').textContent
// console.log(x);

////////////////////////////////////////////////////////


var scores, roundScore, activePlayer, gamePlaying;
var diceDOM = document.querySelector('.dice');

// Call init() function
init();

// Event listener for 'roll dice' button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number between 1 and 6
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        diceDOM.style.display = 'block';
        // simply set img source with src property
        diceDOM.src = 'assets/dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {

            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // Next Player
            nextPlayer();
        }
    }
});


// Event listener for 'hold' button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add current score to global score
        // we use the activePlayer variable as index
        scores[activePlayer] += roundScore;

        // 2. Update the UI and print global score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Check, if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // Hide the dice
            diceDOM.style.display = 'none';
            // Remove .active class
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // Add .winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Set gamePlaying to false
            gamePlaying = false;

        } else {
            // Next player
            nextPlayer();
        }
    }
});


// Event listener for 'new game' button
// Pass init() function as callback function
document.querySelector('.btn-new').addEventListener('click', init);


// Function for initialize a new game
function init() {

    // Init stuff 
    // global scores 
    scores = [0, 0];
    // round score, just need one variable
    roundScore = 0;
    // 0 - Player 1; 1 - Player 2
    activePlayer = 0;
    // Set gamePlaying to true
    gamePlaying = true;

    // use style method to acces display css property to change the value
    diceDOM.style.display = 'none';

    // Set all values to 0 at the beginning
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Set Player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove .winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Remove .active classes
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Add .active class to player 1
    document.querySelector('.player-0-panel').classList.add('active');
}


// Function for switching the active player
function nextPlayer() {

    // Switch Player (ternary operator)
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // Reset round score
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Remove active class from player panel
    // document.querySelector('.player-0-panel').classList.remove('active');
    // Add active class to other player panel
    // document.querySelector('.player-1-panel').classList.add('active');

    // Or better: use toggle()
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide dice image
    diceDOM.style.display = 'none';

}