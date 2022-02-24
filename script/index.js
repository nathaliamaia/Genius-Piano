// Classes
const startBtn = document.getElementById("btnStart");
const restartBtn = document.getElementById("btnRestart");
const keys = document.querySelectorAll(".key");
const playerScore = document.getElementById("counter");
const powerBtn = document.getElementById("powerButton");
const powerOff = document.querySelectorAll("input:checked[type = checkbox]:checked").valeu;
const volume = document.getElementById("volumeBtn");


let cpuSequence = [];
let playerSequence = [];
let mode = "free";
let count = 1;
let power = "off";

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
  key.addEventListener("click", () => key.classList.add("click"));
  key.addEventListener("click", () => {
    if (mode === "Game") handleChoise(key);
  });
  key.addEventListener("mouseout", () => key.classList.remove("click"));
  key.addEventListener("mouseout", () => key.classList.remove("active"));
});

// audio das keys
function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
  volume.addEventListener("change", (event) => {
    noteAudio.volume = event.currentTarget.value / 100;
  });
}

// ajusta o tempo de cada key 
function playRound(nextSequence) {
  nextSequence.forEach((key, index) => {
    setTimeout(() => {
      playNote(key);
    }, (index + 1) * 600);
  });
}

//sorteio de teclas aleatórias
function pickRandomKey() {
  const randomNum = Math.floor(Math.random() * keys.length);
  return keys[randomNum];
}

//adiciona um novo valor no final da sequência 
function nextRound() {
  const nextSequence = [...cpuSequence];
  nextSequence.push(pickRandomKey());
  cpuSequence = nextSequence;
  playRound(nextSequence);
}

//função que inicia o jogo
function playGame() {
  //sorteia a key e coloca na array da cpu
  nextRound();
  startBtn.classList.add("unclickable");
}

//botão para "ligar"o jogo.
powerBtn.addEventListener("click", (event) => {
  power = powerBtn.checked ? "on" : "off";
  playerScore.innerHTML = "--";
  
  if (power === "on") {
    startBtn.addEventListener("click", () => {
      mode = "Game";
      playerScore.innerHTML = "0";
      playGame();
    });
  } else {
    mode = "free";
    resetGame();
    playerScore.innerHTML = "";
  }
});


// escolha do jogador
function handleChoise(key) {
  const index = playerSequence.push(key) - 1;

  // Checa sequência
  if (playerSequence[index] !== cpuSequence[index]) {
    alert("Game over");
    resetGame();
    return;
  } else if (playerSequence[index] == cpuSequence[index]) {
    updatePlayerScore();
  }

  if (playerSequence.length === cpuSequence.length) {
    playerSequence = [];

    setTimeout(() => {
      nextRound();
    }, 1000);

    return;
  }
}

function updatePlayerScore() {
  playerScore.innerHTML = count;
  count++;
}

function resetGame() {
  cpuSequence = [];
  playerSequence = [];
  count = 1;
  playerScore.innerHTML = "--";
}

restartBtn.addEventListener("click", () => {
  resetGame();
  playGame();
  playerScore.innerHTML = "0";                
});



