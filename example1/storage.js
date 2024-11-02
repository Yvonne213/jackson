// storage.js

function saveSelectionToStorage(day, hour, minute) {
    const timestamp = new Date().toISOString();
    const selection = `${day} days, ${hour} hours, ${minute} minutes`;
    const entry = { timestamp, selection };

    let history = JSON.parse(localStorage.getItem('timeSelectionHistory')) || [];
    history.push(entry);

    localStorage.setItem('timeSelectionHistory', JSON.stringify(history));
}

function loadSelectionHistory() {
    const history = JSON.parse(localStorage.getItem('timeSelectionHistory')) || [];
    const container = document.getElementById("historyContainer");

    history.forEach(entry => {
        const div = document.createElement("div");
        div.textContent = `${entry.selection} (Selected on: ${entry.timestamp})`;
        container.appendChild(div);
    });
}
