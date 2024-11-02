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

function nextPage() {
    const day = document.getElementById("day").value || 0;
    const hour = document.getElementById("hour").value || 0;
    const minute = document.getElementById("minute").value || 0;

    // Store selection in local storage
    saveSelectionToStorage(day, hour, minute);

    // Redirect to Page 2 with selected time as URL parameters
    window.location.href = `page2.html?day=${day}&hour=${hour}&minute=${minute}`;
}

document.getElementById('myButton').addEventListener('click', nextPage);