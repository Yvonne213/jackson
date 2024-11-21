

document.getElementById('info-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxXTjoR6ccjhoLFgkETE4QvtqSCHn-YJQQV4-PGJTCQ4DJJxlMPsoQqrkrXzivIbzks/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            const result = await response.text();
            document.getElementById('response-message').textContent = 'Form submitted successfully!';
        } else {
            document.getElementById('response-message').textContent = 'Submission failed. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response-message').textContent = 'An error occurred. Please try again.';
    }
});


