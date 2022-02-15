
// Classes
const startBtn = document.getElementById("btnStart");
const restartBtn = document.getElementById("btnRestart")
const keys = document.querySelectorAll(".key");

 
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

function pickRandomKey() { 
  const randomNum = Math.floor(Math.random() * keys.length);
  return keys[randomNum];
}
