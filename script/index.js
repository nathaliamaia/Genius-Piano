// Classes
const startBtn = document.getElementById("btnStart");
const restartBtn = document.getElementById("btnRestart");
const keys = document.querySelectorAll(".key");
const playerScore = document.getElementById("counter");
const powerBtn = document.getElementById("powerButton");

let cpuSequence = [];
let playerSequence = [];

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

//botao de start
// startBtn.addEventListener("click", () => {
//   mode = "Game";
//   playerScore.innerHTML = "0";
//   playGame();
// });

//botão para "ligar"o jogo.
powerBtn.addEventListener("click", (event) => {
  playerScore.innerHTML = "--";
  if ((power = "on")) {
    startBtn.addEventListener("click", () => {
      mode = "Game";
      playerScore.innerHTML = "0";
      playGame();
    });
  }
  
});

// escolha do jogador
function handleChoise(key) {
  const index = playerSequence.push(key) - 1;

  // Checa sequência
  if (playerSequence[index] !== cpuSequence[index]) {
    alert("Você perdeu");
    resetGame();
    return;
  } else if (playerSequence[index] == cpuSequence[index]) {
    updatePlayerScore();
  }

  if (playerSequence.length === cpuSequence.length) {
    playerSequence = [];

    // alert("Você acertou!");
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
  count = 0;
  playerScore.innerHTML = "--";
}
restartBtn.addEventListener("click", () => {
  resetGame();
});

// TO DO:

//1.score OK
// 2. esperar o computador gerar a sequencia, para permitir o clique;
//3.. permitir o  modo livre ("brincar"com o piano livremente)-> se tiver nesse modo, não entra no handlechoise  OK
//4. se der tempo, adicionar opcao de usar teclas para brincar com o piano.
//5. Não poder clicar no start enquanto tiver na partida
//6. rever tempo de efeito do "active"
