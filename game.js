const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

let redAudio = new Audio("./sounds/red.mp3");
let greenAudio = new Audio("./sounds/green.mp3");
let blueAudio = new Audio("./sounds/blue.mp3");
let yellowAudio = new Audio("./sounds/yellow.mp3");
let wrongAudio = new Audio("./sounds/wrong.mp3");

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColour = buttonColours[randomNumber];
  $("div#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColour);
  gamePattern.push(randomColour);
  level++;
  $("#level-title").text(`Уровень ${level}`);
  userClickedPattern = [];
}

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

$("body").on("keydown click", startGame);

$("div.btn").on("click", function (event) {
  let currentButton = event.currentTarget.id;
  $("div#" + currentButton).addClass("pressed");
  setTimeout(function () {
    $("div#" + currentButton).removeClass("pressed");
  }, 100);
  playSound(currentButton);
  userClickedPattern.push(currentButton);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    wrongAudio.play();
    gameOver();
  }
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500);
  setTimeout(function () {
    $("#level-title").text(
      "Вы проиграли! Нажмите любую кнопку для перезапуска"
    );
    resetGame();
  }, 200);
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(button) {
  switch (button) {
    case "red":
      redAudio.play();
      break;
    case "blue":
      blueAudio.play();
      break;
    case "green":
      greenAudio.play();
      break;
    case "yellow":
      yellowAudio.play();
      break;
  }
}
