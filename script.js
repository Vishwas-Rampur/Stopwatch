let startTime, interval;
let running = false;
let elapsed = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
  const date = new Date(ms);
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  const secs = String(date.getUTCSeconds()).padStart(2, '0');
  const millis = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${mins}:${secs}.${millis}`;
}

function updateDisplay() {
  const now = Date.now();
  display.textContent = formatTime(elapsed + (now - startTime));

  // Digit bounce animation
  display.style.transform = "scale(1.05)";
  setTimeout(() => {
    display.style.transform = "scale(1)";
  }, 80);
}

startPauseBtn.addEventListener('click', () => {
  if (!running) {
    // Start
    running = true;
    startTime = Date.now();
    interval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = "Pause";
  } else {
    // Pause
    running = false;
    clearInterval(interval);
    elapsed += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
  }
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(interval);
  elapsed = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = "";
  startPauseBtn.textContent = "Start";
});

lapBtn.addEventListener('click', () => {
  if (!running) return;
  const now = Date.now();
  const lapTime = elapsed + (now - startTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = formatTime(lapTime);
  lapsList.appendChild(lapItem);
});
