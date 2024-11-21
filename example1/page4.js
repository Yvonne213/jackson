

document.getElementById('info-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz4H6xfGA_dSTLDrxRLGd3K_LyQQoNbrv4a8oek5QFKBw8HoYtQEC0v_GAxu-25Y20h/exec', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('response-message').textContent = 'Form submitted successfully!';
            // Optional: Reset form
            this.reset();
        } else {
            document.getElementById('response-message').textContent = 'Submission failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response-message').textContent = 'An error occurred. Please try again.';
    }
});


