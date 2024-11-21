document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');
    const streamUrlInput = document.getElementById('stream-url');
    const loadStreamButton = document.getElementById('load-stream');
    const connectionDetails = document.getElementById('connection-details');
    const diagnosticInfo = document.getElementById('diagnostic-info');

    // Saved URL from localStorage
    const savedUrl = localStorage.getItem('droidcamUrl');
    if (savedUrl) {
        streamUrlInput.value = savedUrl;
    }

    function updateStreamImage() {
        const droidcamUrl = streamUrlInput.value.trim();
        
        if (!droidcamUrl) {
            diagnosticInfo.innerHTML = '<p>Please enter a valid URL</p>';
            return;
        }

        // Multiple stream URL options to try
        const streamOptions = [
            droidcamUrl,
            `${droidcamUrl}/video`,
            `${droidcamUrl}?action=stream`,
            `${droidcamUrl}?t=${Date.now()}`
        ];

        // Try different stream URL variants
        function tryNextStreamUrl(urls) {
            if (urls.length === 0) {
                connectionDetails.innerHTML = 'Failed to load stream from all attempted URLs';
                diagnosticInfo.innerHTML = `
                    <h3>Troubleshooting Tips:</h3>
                    <ul>
                        <li>Ensure DroidCam app is running</li>
                        <li>Check that your device is on the same WiFi network</li>
                        <li>Verify the IP address is correct</li>
                        <li>Check firewall settings</li>
                        <li>Restart DroidCam app</li>
                    </ul>
                `;
                return;
            }

            const testUrl = urls[0];
            
            // Comprehensive connection test
            const connectionTest = new Promise((resolve, reject) => {
                const testImage = new Image();
                testImage.onload = () => resolve(testUrl);
                testImage.onerror = () => reject(new Error('Image load failed'));
                testImage.src = testUrl;
            });

            connectionTest
                .then((successUrl) => {
                    cameraFeed.src = successUrl;
                    connectionDetails.innerHTML = `Connected using URL: ${successUrl}`;
                    diagnosticInfo.innerHTML = `
                        <h3>Connection Successful</h3>
                        <p>Stream loaded from: ${successUrl}</p>
                        <p>Image dimensions: ${cameraFeed.naturalWidth} x ${cameraFeed.naturalHeight}</p>
                    `;
                })
                .catch(() => {
                    // Try next URL
                    tryNextStreamUrl(urls.slice(1));
                });
        }

        // Start trying URLs
        tryNextStreamUrl(streamOptions);
    }

    // Load stream button
    loadStreamButton.addEventListener('click', () => {
        const url = streamUrlInput.value.trim();
        localStorage.setItem('droidcamUrl', url);
        updateStreamImage();
    });

    // Auto-refresh interval
    const refreshInterval = setInterval(updateStreamImage, 5000);

    // Stop refreshing if no URL
    streamUrlInput.addEventListener('input', () => {
        if (!streamUrlInput.value.trim()) {
            clearInterval(refreshInterval);
            connectionDetails.innerHTML = '';
            diagnosticInfo.innerHTML = '';
        }
    });

    // Initial load if URL exists
    if (streamUrlInput.value.trim()) {
        updateStreamImage();
    }
});