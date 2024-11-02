
///page2
// page2.js

function updateTimeAndDate() {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];

    document.getElementById('dateDisplay').textContent = currentDate;
    document.getElementById('timeDisplay').textContent = currentTime;
}

setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();


//countdown logic
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        day: parseInt(params.get('day')) || 0,
        hour: parseInt(params.get('hour')) || 0,
        minute: parseInt(params.get('minute')) || 0
    };
}

function calculateTargetTime(days, hours, minutes) {
    const now = new Date();

    // Add days, hours, and minutes to the current time
    now.setDate(now.getDate() + days); // Add days
    now.setHours(now.getHours() + hours); // Add hours
    now.setMinutes(now.getMinutes() + minutes); // Add minutes

    return now;
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function updateCountdown() {
    const now = new Date();
    const difference = targetTime - now;

    if (difference <= 0) {
        document.getElementById("countdown").innerText = "Time is up!";
        return;
    }

    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((difference / 1000) % 60);

    document.getElementById("countdown").innerText = 
        `${daysLeft.toString().padStart(2, '0')}:${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

const { day: selectedDay, hour: selectedHour, minute: selectedMinute } = getUrlParams();
const targetTime = calculateTargetTime(selectedDay, selectedHour, selectedMinute);

setInterval(updateCountdown, 1000);
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);
//gotopage 3
// Function to redirect to page3.html
function goToPage3() {
    window.location.href = 'page3.html';
}