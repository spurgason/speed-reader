"use strict";
// DOM Elements
const containerEl = document.querySelector(".container");
const messageEl = document.querySelector(".message-int");
const textEL = document.querySelector("#input-field");
const wpmValueEl = document.querySelector("#wpm");
const addBtn = document.querySelector(".bi-plus-circle-fill");
const subtractBtn = document.querySelector(".bi-dash-circle-fill");
const startBtn = document.querySelector(".start-btn");

messageEl.setAttribute("style", "font-size: 70px");

addBtn.addEventListener("click", function () {
  wpmValueEl.value++;
});

subtractBtn.addEventListener("click", function () {
  wpmValueEl.value--;
});

const countdown = function () {
  containerEl.classList.add("hidden");
  messageEl.classList.remove("hidden");
  let timer = 7;

  let timerInterval = setInterval(function () {
    if (timer > 5) {
      // Prep message before countdown
      messageEl.textContent = "Prepare to Read";
      // Countdown
      timer--;
    } else if (timer > 1) {
      messageEl.textContent = `${timer} seconds left`;
      // Countdown
      timer--;
    } else if (timer === 1) {
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
  // const wordsPerMinute = Number(wpmValueEl.value) / 1000;
  // console.log(wordsPerMinute);

  const text = textEL.value;
  const word = text.trim().split(" ");

  let wordPos = 0;

  let readWords = setInterval(function () {
    if (word[wordPos] === undefined || word[wordPos] === "") {
      clearInterval(readWords);
      containerEl.classList.remove("hidden");
    } else {
      messageEl.textContent = word[wordPos];
      wordPos++;
    }
  }, 250);
};

startBtn.addEventListener("click", countdown);
