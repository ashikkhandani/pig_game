'use strict';

let rotateMsg= alert('Please rotate your screen to play the Game.');


// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winMsg = document.querySelector('.message');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnCloseModal= document.querySelector('.close-modal');
const modal= document.querySelector('.modal');
const overlay= document.querySelector('.overlay');

let scores, currentScore, activePlayer, playing;

// Modal functionality
const showModal= function(){
    modal.classList.remove('hidden1');
    overlay.classList.remove('hidden1');
    
};

const closeModal= function(){
    modal.classList.add('hidden1');
    overlay.classList.add('hidden1');
   
};

// Starting Condition
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer= 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling Dice functionality
btnRoll.addEventListener('click',function(){
    if(playing){

    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random()*6)+ 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src= `dice-${dice}.png`;


    //3. Check for rolled 1
    if(dice !== 1){
        // Add dice to current score
        currentScore += dice;
        document.getElementById
        (`current--${activePlayer}`).textContent = currentScore;

    } else {
        // switch to next player
        switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener('click', function(){
if(playing){
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. Check if player's score is >=500
 if(scores[activePlayer] >= 500){
    // Finish the Game
     playing = false;

     showModal();

     btnCloseModal.addEventListener('click',closeModal);

     overlay.addEventListener('click',closeModal);

     diceEl.classList.add('hidden');

     document.querySelector(`.player--${activePlayer}`).
     classList.add('player--winner');
    
     document.querySelector(`.player--${activePlayer}`).
     classList.remove
     ('player--active');
    
}else {
         // Switch to the next player
    switchPlayer();
    }
 } 

});
          // Restore everything 
          btnNew.addEventListener('click',init);
          


 // to close modal with Escape key
 document.addEventListener('keydown',function(escape){

    if(escape.key === 'Escape' && !modal.classList.contains('hidden1')){
        closeModal();
    }
 });
