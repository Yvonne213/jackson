document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');
    const streamUrlInput = document.getElementById('stream-url');
    const loadStreamButton = document.getElementById('load-stream');
    const connectionStatus = document.getElementById('connection-status');

    // Load last used URL from localStorage
    const savedUrl = localStorage.getItem('droidcamUrl');
    if (savedUrl) {
        streamUrlInput.value = savedUrl;
    }

    function updateStreamImage() {
        const droidcamUrl = streamUrlInput.value.trim();
        
        if (droidcamUrl) {
            // Add timestamp to prevent caching
            const timestampedUrl = `${droidcamUrl}?t=${Date.now()}`;
            
            // Create a new Image to check if stream is accessible
            const testImage = new Image();
            testImage.onload = () => {
                cameraFeed.src = timestampedUrl;
                connectionStatus.textContent = 'Stream Connected ✓';
                connectionStatus.style.color = 'green';
            };
            testImage.onerror = () => {
                connectionStatus.textContent = 'Connection Failed ✗ Check URL';
                connectionStatus.style.color = 'red';
            };
            testImage.src = timestampedUrl;
        }
    }

    // Event listener for load button
    loadStreamButton.addEventListener('click', () => {
        const url = streamUrlInput.value.trim();
        localStorage.setItem('droidcamUrl', url);
        updateStreamImage();
    });

    // Auto-refresh every 5 seconds
    const refreshInterval = setInterval(updateStreamImage, 5000);

    // Stop refreshing if stream URL is empty
    streamUrlInput.addEventListener('input', () => {
        if (!streamUrlInput.value.trim()) {
            clearInterval(refreshInterval);
            connectionStatus.textContent = '';
        }
    });

    // Initial load if URL exists
    if (streamUrlInput.value.trim()) {
        updateStreamImage();
    }
});