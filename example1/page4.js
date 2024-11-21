(async function () {
    const video = document.getElementById('webcam');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Unable to access webcam. Please check your permissions and device settings.');
    }
})();

document.getElementById('info-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const response = await fetch('https://script.google.com/macros/s/AKfycbw7wZ98X9HOaiSGw7twhjlexUBRdi-scgPux5b2jRbXd_X-f2LWIxAIDf_9lT88zj5e/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
        alert('Form submitted successfully!');
    } else {
        alert('Error submitting the form.');
    }
});