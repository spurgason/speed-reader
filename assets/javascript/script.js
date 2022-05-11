"use strict";

// DOM Elements
const containerEl = document.querySelector(".container");
const messageEl = document.querySelector(".message-int");
const textEL = document.querySelector("#input-field");
const wpmValueEl = document.querySelector("#wpm");
const addBtn = document.querySelector(".bi-plus-circle-fill");
const subtractBtn = document.querySelector(".bi-dash-circle-fill");
const startBtn = document.querySelector(".start-btn");

// Styles the messageEl that displays the words when reading
messageEl.setAttribute("style", "font-size: 70px");

// Add word to words per minute
addBtn.addEventListener("click", function () {
  wpmValueEl.value++;
});

// Subtract word to words per minute
subtractBtn.addEventListener("click", function () {
  wpmValueEl.value--;
});

// Toggles the hidden class to hide certain elements
const toggleHidden = function () {
  containerEl.classList.toggle("hidden");
  messageEl.classList.toggle("hidden");
};

const countdown = function () {
  // Hides input form and displays messages
  toggleHidden();

  // Initial start time
  let timer = 7;

  // Countdown timer to prepare the users for rapid word display
  let timerInterval = setInterval(function () {
    if (timer > 5) {
      // Prep message before countdown
      messageEl.textContent = "Prepare to Read";
      // Countdown
      timer--;
    } else if (timer > 1) {
      // Prep countdown before message
      messageEl.textContent = `${timer} seconds left`;
      // Countdown
      timer--;
    } else if (timer === 1) {
      // Prep countdown before message
      messageEl.textContent = `${timer} second left`;
      // Countdown
      timer--;
    } else {
      messageEl.textContent = "";
      clearInterval(timerInterval);
      readText();
    }
  }, 1000);
};

const readText = function () {
  // Create object for value of wpm and converts it so the interval can run at corresponding speed.
  const wpm = {
    inputValue: Number(wpmValueEl.value),
    calcSpeed: function () {
      return (
        (this.inputValue /
          (this.inputValue * (0.01 * this.inputValue)) /
          (0.1 * this.inputValue)) *
        10000
      );
    },
    speed: function () {
      return Math.trunc(this.calcSpeed());
    },
  };

  // Grabs the text value from the textarea and creates an array of words
  const text = textEL.value;
  const word = text.trim().split(" ");

  // Start position in our word array
  let wordPos = 0;

  // Sets the interval for at which speed the words are displayed
  let readWords = setInterval(function () {
    // if textarea is empty, or array has been ran through stop timer and display the main container, else display the words at the set interval
    if (word[wordPos] === undefined || word[wordPos] === "") {
      clearInterval(readWords);
      toggleHidden();
    } else {
      messageEl.textContent = word[wordPos];
      wordPos++;
    }
  }, wpm.speed());
};

startBtn.addEventListener("click", countdown);
