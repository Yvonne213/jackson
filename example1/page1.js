function showSelectedTime() {
    var day = document.getElementById("day").value;
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;

    var dayValue = parseInt(day) || 0;
    var hourValue = parseInt(hour) || 0;
    var minuteValue = parseInt(minute) || 0;

    // Display the selected time in the format "X days, Y hours, Z minutes"
    document.getElementById("selectedTime").innerText = `${dayValue} day(s), ${hourValue} hour(s), ${minuteValue} minute(s)`;
}

document.getElementById('myButton').addEventListener('click', function() {
    var day = document.getElementById("day").value || 0;
    var hour = document.getElementById("hour").value || 0;
    var minute = document.getElementById("minute").value || 0;

    // Pass the selected day, hour, and minute values as URL parameters to Page 2
    window.location.href = `page2.html?day=${day}&hour=${hour}&minute=${minute}`;
});


///page2

   function updateTimeAndDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

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

    // Calculate remaining days, hours, minutes, and seconds
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((difference / 1000) % 60);

    // Display the countdown in the format "DD:HH:MM:SS"
    document.getElementById("countdown").innerText = 
        `${daysLeft.toString().padStart(2, '0')}:${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}

// Get the selected time from the URL
const { day: selectedDay, hour: selectedHour, minute: selectedMinute } = getUrlParams();

// Calculate the target time
const targetTime = calculateTargetTime(selectedDay, selectedHour, selectedMinute);

// Start the countdown and update every second
setInterval(updateCountdown, 1000);
