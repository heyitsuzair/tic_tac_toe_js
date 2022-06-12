let music = new Audio("music.mp3");
let turn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turnInfo = "X";
let gameOver = false;
let reset = document.getElementById("reset");

// Function to change turn
const changeTurn = () => {
  return turnInfo === "X" ? "O" : "X";
};

// Function to check win
const checkWin = () => {
  let boxTexts = document.getElementsByClassName("box-text");

  let win = [
    [0, 1, 2, 0, 3, 0],
    [3, 4, 5, 0, 10, 0],
    [6, 7, 8, 0, 18, 0],
    [0, 3, 6, -7, 10, 90],
    [1, 4, 7, 0, 10, 90],
    [2, 5, 8, 7, 11, 90],
    [0, 4, 8, 0, 10, 45],
    [2, 4, 6, 0, 10, 135],
  ];
  win.forEach((win) => {
    if (
      boxTexts[win[0]].innerText === boxTexts[win[1]].innerText &&
      boxTexts[win[1]].innerText === boxTexts[win[2]].innerText &&
      boxTexts[win[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxTexts[win[0]].innerText + " Wins";
      gameOver = true;
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.width = "200px";

      document.querySelector(
        ".line"
      ).style.transform = `translate(${win[3]}vw, ${win[4]}vw) rotate(${win[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".box-text");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
      boxText.innerText = turnInfo;
      turnInfo = changeTurn();
      music.play();
      turn.play();
      checkWin();
      if (!gameOver) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn For " + turnInfo;
      }
    }
  });
});
// onclick reset
reset.addEventListener("click", () => {
  Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".box-text");
    boxText.innerText = "";
  });
  document.getElementsByClassName("info")[0].innerText = "Turn For X";
  turnInfo = "X";
  gameOver = false;
  document.querySelector(".imgBox").getElementsByTagName("img")[0].style.width =
    "0";
  document.querySelector(".line").style.width = "0";
});
