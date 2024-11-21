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

    const response = await fetch('https://script.google.com/macros/s/AKfycbwh6rzEhd22QhfKahhiW-Qy9IiqgB40TKM8zlGnzUh6xk2vE4wJtjUf6Xh3oJbfkxVX/exec', {
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