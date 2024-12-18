//for clearing data
// localStorage.removeItem('timeSelectionHistory');

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

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function saveSelectionToStorage(day, hour, minute) {
    const date = new Date();
    const timestamp = formatDateTime(date); // Use the formatDateTime function to format the timestamp
    const selection = `${day} days, ${hour} hours, ${minute} minutes`;
    const entry = { timestamp, selection };

    let history = JSON.parse(localStorage.getItem('timeSelectionHistory')) || [];
    history.push(entry);

    console.log("Updated history:", history); // Debugging to check the history array

    localStorage.setItem('timeSelectionHistory', JSON.stringify(history));
}
function nextPage() {
    const day = document.getElementById("day").value || 0;
    const hour = document.getElementById("hour").value || 0;
    const minute = document.getElementById("minute").value || 0;

    // Store selection in local storage
    saveSelectionToStorage(day, hour, minute);

    // Redirect to Page 2 with selected time as URL parameters
    window.location.href = `page2.html?day=${day}&hour=${hour}&minute=${minute}`;
}



