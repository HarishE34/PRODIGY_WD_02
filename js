// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = [];
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    startTime = null;
    updatedTime = null;
    lapCounter = 1;
    laps = [];
    display.textContent = '00:00:00.000';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = timeToString(difference);
}

function timeToString(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = date.getUTCMilliseconds();

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '00' + milliseconds :
                   (milliseconds < 100) ? '0' + milliseconds : milliseconds;

    return `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (running) {
        laps.push(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${timeToString(difference)}`;
        lapsContainer.appendChild(lapItem);
        lapCounter++;
    }
}
