const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

let timeLeft = 10;

startButton.addEventListener("click", () => {
  setInterval(() => {
    if (timeLeft >= 0) {
      countdownDisplay.textContent = timeLeft;
      timeLeft--;
    } else {
      // Stop the countdown and display a message
    }
  }, 1000); 
});