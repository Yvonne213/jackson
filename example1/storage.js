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

    // Clear the container first to avoid duplication
    container.innerHTML = '';

    history.forEach((entry, index) => {
        // Create a new block for each entry
        const block = document.createElement("div");
        block.classList.add("history-block");

        // Create a label element as a "file tab"
        const label = document.createElement("div");
        label.classList.add("history-label");
        label.textContent = `Costomer ${index + 1}`; // Label as "Selection 1", "Selection 2", etc.

        // Create and style elements for the selection result and timestamp
        const timestampText = document.createElement("p");
        timestampText.textContent = `${entry.timestamp}`;
        timestampText.classList.add("timestamp-text");

        const selectionText = document.createElement("p");
        selectionText.textContent = `${entry.selection}`;
        selectionText.classList.add("selection-text");


        // Append label and other elements to the block
        block.appendChild(label);
        block.appendChild(timestampText);
        block.appendChild(selectionText);
       

        // Add the block to the container
        container.appendChild(block);
    });
}

