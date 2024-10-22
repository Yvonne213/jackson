function showSelectedTime() {
    console.log("showSelectedTime function called");

    // Get the selected values
    var day = document.getElementById("day").value;
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;

    // Convert the values to integers for calculation
    var dayValue = parseInt(day) || 0;   // Default to 0 if not selected
    var hourValue = parseInt(hour) || 0; // Default to 0 if not selected
    var minuteValue = parseInt(minute) || 0; // Default to 0 if not selected

    // Calculate total hours (days * 24 + hours)
    var totalHours = (dayValue * 24) + hourValue;

    // Display the result in the format of "hours:minutes"
    document.getElementById("selectedTime").innerText = totalHours + ":" + (minuteValue < 10 ? "0" + minuteValue : minuteValue);
}

document.getElementById('myButton').addEventListener('click', function() {
    window.location.href = 'page2.html';
});

