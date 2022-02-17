
// Classes
const startBtn = document.getElementById("btnStart");
const restartBtn = document.getElementById("btnRestart")
const keys = document.querySelectorAll(".key");

 
const chosenKeys = [];

keys.forEach(key => {
  key.addEventListener("click", () => playNote(key)) 
})

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play();
  key.classList.add('active');
  noteAudio.addEventListener('ended', () => {
      key.classList.remove('active')
  })
}
//pega uma tecla de forma aleatoria.
function pickRandomKey() { 
  const randomNum = Math.floor(Math.random() * keys.length);
  console.log(keys[randomNum]);
  return keys[randomNum];
}
startBtn.addEventListener("click", () => {
  const randomKey = pickRandomKey();
  chosenKeys.push(randomKey);

  chosenKeys.forEach(key => {
    // setInterval
    playNote(key)
  })
})