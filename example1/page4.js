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


const form = document.getElementById('info-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        console.log('Form Submitted:');
        console.log('Name:', name);
        console.log('Email:', email);

        alert('Thank you for your submission!');
    });