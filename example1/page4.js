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
