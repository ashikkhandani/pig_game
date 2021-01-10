"use strict";
window.onload = () => {
  let rotateMsg = alert("Please Rotate 🔃 your Mobile device and Click OK.");

  // Selecting Elements
  const player0El = document.querySelector(".player--0");
  const player1El = document.querySelector(".player--1");
  const score0El = document.querySelector("#score--0");
  const score1El = document.getElementById("score--1");
  const current0El = document.getElementById("current--0");
  const current1El = document.getElementById("current--1");
  const winMsg = document.querySelector(".message");

  const diceEl = document.querySelector(".dice");
  const btnNew = document.querySelector(".btn--new");
  const btnRoll = document.querySelector(".btn--roll");
  const btnHold = document.querySelector(".btn--hold");
  const btnCloseModal = document.querySelector(".close-modal");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  let scores, currentScore, activePlayer, playing;

  // create dice Roll Sound
  let diceSound = document.createElement("audio");
  diceSound.src = "./sounds/dice.mp3";
  diceSound.setAttribute("controls", "none");
  diceSound.setAttribute("preload", "auto");
  diceSound.style.display = "none";
  diceSound.volume = 0.2;
  container.append(diceSound);

  // create hold Sound
  let holdSound = document.createElement("audio");
  holdSound.src = "./sounds/hold.mp3";
  holdSound.setAttribute("controls", "none");
  holdSound.setAttribute("preload", "auto");
  holdSound.style.display = "none";
  holdSound.volume = 0.1;
  container.append(holdSound);

  // create game sound
  let gameSound = document.createElement("audio");
  gameSound.src = "./sounds/gamefull.mp3";
  gameSound.setAttribute("controls", "none");
  gameSound.setAttribute("preload", "auto");
  gameSound.style.display = "none";
  gameSound.volume = 0.05;
  gameSound.loop = true;
  container.append(gameSound);

  // create victory sound
  let victorySound = document.createElement("audio");
  victorySound.src = "./sounds/victory.mp3";
  victorySound.setAttribute("controls", "none");
  victorySound.setAttribute("preload", "auto");
  victorySound.style.display = "none";
  victorySound.volume = 0.2;
  victorySound.loop = true;
  container.append(victorySound);

  // Modal functionality
  const showModal = function () {
    modal.classList.remove("hidden1");
    overlay.classList.remove("hidden1");
    victorySound.play();
  };

  const closeModal = function () {
    modal.classList.add("hidden1");
    overlay.classList.add("hidden1");
    victorySound.volume = 0;
    //   gameSound.volume = 0.2;
  };

  // Starting Condition
  const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    gameSound.volume = 0.2;
    victorySound.volume = 0;
  };
  init();

  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    holdSound.play();
  };

  // Rolling Dice functionality
  btnRoll.addEventListener("click", function () {
    if (playing) {
      // game sound play
      gameSound.play();

      // dice sound play
      diceSound.play();

      //1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
      console.log(dice);

      //2. Display dice
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;

      //3. Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
      } else {
        holdSound.volume = 0.3;

        // switch to next player
        switchPlayer();
      }
    }
  });

  // Hold button functionality
  btnHold.addEventListener("click", function () {
    if (playing) {
      // hold sound play
      holdSound.play();
      //1. Add current score to active player's score
      scores[activePlayer] += currentScore;
      // console.log(scores[activePlayer]);

      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

      //2. Check if player's score is >=500
      if (scores[activePlayer] >= 10) {
        // Finish the Game
        playing = false;

        showModal();
        // victorySound.volume = 0;
        holdSound.volume = 0;

        // victorySound.play();
        gameSound.volume = 0;

        btnCloseModal.addEventListener("click", closeModal);

        overlay.addEventListener("click", closeModal);

        diceEl.classList.add("hidden");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--winner");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
      } else {
        holdSound.volume = 0.3;

        // Switch to the next player
        switchPlayer();
      }
    }
  });
  // Restore everything
  btnNew.addEventListener("click", init);

  // to close modal with Escape key
  document.addEventListener("keydown", function (escape) {
    if (escape.key === "Escape" && !modal.classList.contains("hidden1")) {
      closeModal();
    }
  });
};
