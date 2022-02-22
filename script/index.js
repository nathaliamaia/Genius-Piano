// Classes
const startBtn = document.getElementById("btnStart");
const restartBtn = document.getElementById("btnRestart");
const keys = document.querySelectorAll(".key");
const playerScore = document.getElementById("counter");
const powerBtn = document.getElementById("powerButton");

let cpuSequence = [];
let playerSequence = [];

let count = 0;
let level = 0;

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
  key.addEventListener("click", () => key.classList.add("click"));
  key.addEventListener("click", () => handleChoise(key));
  key.addEventListener("mouseout", () => key.classList.remove("click"));
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
}

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

function nextRound() {
  level += 1;
  const nextSequence = [...cpuSequence];
  nextSequence.push(pickRandomKey());
  cpuSequence = nextSequence;
  playRound(nextSequence);
}

//função que inicia o jogo
function playGame() {
  //sorteia a key e coloca na array da cpu
  nextRound();
}

//botao de start
startBtn.addEventListener("click", () => {
  playGame();
});

//botão para "ligar"o jogo.
powerBtn.addEventListener("click", (event) => {
  playerScore.innerHTML = "--";
});

//mudar intervalo dos efeitos (active)

//obs.: config. para que quando a tecla seja selecionada apenas mude de cor e ressoe o toque. OK

// escolha do jogador
function handleChoise(key) {
  const index = playerSequence.push(key) - 1;
  
  // Checa sequência
  if(playerSequence[index] !== cpuSequence[index]) {
    // resetGame(); TO-DO
    alert("Você perdeu");
    return;
  }

  if(playerSequence.length === cpuSequence.length) {
    playerSequence = [];
    // alert("Você acertou!");
    setTimeout(() => {
      nextRound();
    }, 1000);
    
    return;
  }
}

//score
// function updatePlayerScore(){}

// condições
