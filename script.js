"use strict";

// Selecting Elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceRoll = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Declaration of variables
let currentScore, scores, activePlayer, playing;

const init = function () {
  // Final score for all players
  scores = [0, 0];

  // current score
  currentScore = 0;
  // active player
  activePlayer = 0;

  // app state
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  current1El.textContent = 0;

  diceRoll.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// Call init function
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //  toggle player--active in style css
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Dice rolling functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate random number between 1 and 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // console.log(diceRandomNumber);

    // display dice to the screen
    diceRoll.classList.remove("hidden");
    diceRoll.src = `dice-${diceNumber}.png`;

    // check if dice is 1 and witch to next player
    if (diceNumber !== 1) {
      //   continue playing, add dice to the current score
      currentScore += diceNumber;

      // update current score based on the active Player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //   switch to the second player
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    // add the score to current player
    //   score[1] = score[1] + currentScore;
    scores[activePlayer] += currentScore;
    // display total score for the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Finish the game
    if (scores[activePlayer] >= 100) {
      // set state app to false
      playing = false;
      diceRoll.classList.add("hidden"); // hide the dice

      // Current player win
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

// Reseting the pig game
btnNew.addEventListener("click", init);
