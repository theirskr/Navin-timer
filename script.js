let totalSeconds = 0;
let timeLeft = 0;
let timerId = null;

// Real-time Clock Sync
setInterval(() => { 
    document.getElementById('live-clock').innerText = new Date().toLocaleTimeString(); 
}, 1000);

function setCustomTime() {
    let mins = document.getElementById('custom-min').value;
    if (mins > 0) {
        totalSeconds = mins * 60;
        timeLeft = totalSeconds;
        document.getElementById('start-btn').disabled = false;
        updateUI();
    }
}

function startTimer() {
    if (timerId || timeLeft <= 0) return;
    
    document.getElementById('flame-group').classList.remove('hidden');
    document.getElementById('input-zone').style.opacity = "0.2";
    
    timerId = setInterval(() => {
        timeLeft--;
        updateUI();
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            playHardAlert();
            alert("SESSION COMPLETE BOSS! AIIMS PATNA IS WAITING.");
        }
    }, 1000);
}

function updateUI() {
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = timeLeft % 60;
    
    document.getElementById('timer').innerText = 
        `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    
    let heightRatio = timeLeft / totalSeconds;
    document.getElementById('candle').style.height = (heightRatio * 150) + "px";
    
    let pool = document.getElementById('wax-pool');
    pool.style.width = (40 + (1 - heightRatio) * 40) + "px";
    pool.style.height = ((1 - heightRatio) * 12) + "px";
}

function playHardAlert() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, audioCtx.currentTime);
    gain.gain.setValueAtTime(1, audioCtx.currentTime);
    
    osc.connect(gain); 
    gain.connect(audioCtx.destination);
    
    osc.start(); 
    osc.stop(audioCtx.currentTime + 4);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 0;
    document.getElementById('flame-group').classList.add('hidden');
    document.getElementById('start-btn').disabled = true;
    document.getElementById('input-zone').style.opacity = "1";
    document.getElementById('timer').innerText = "00:00:00";
    document.getElementById('candle').style.height = "150px";
    document.getElementById('wax-pool').style.width = "10px";
}
