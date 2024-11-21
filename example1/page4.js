    document.addEventListener('DOMContentLoaded', () => {
            const cameraFeed = document.getElementById('camera-feed');
            const streamUrlInput = document.getElementById('stream-url');
            const loadStreamButton = document.getElementById('load-stream');
            const debugInfo = document.getElementById('debug-info');

            // Comprehensive stream URL testing array
            const streamUrlVariants = [
                (url) => url,
                (url) => `${url}/video`,
                (url) => `${url}?action=stream`,
                (url) => `${url}?t=${Date.now()}`,
                (url) => `${url}/mjpg/video.mjpg`,
                (url) => `${url}/video.mjpg`
            ];

            function logDebug(message, isError = false) {
                const timestamp = new Date().toLocaleTimeString();
                debugInfo.innerHTML += `[${timestamp}] ${isError ? '<span class="error">ERROR:</span> ' : ''}${message}\n`;
                debugInfo.scrollTop = debugInfo.scrollHeight;
            }

            function testStreamUrl(url) {
                return new Promise((resolve, reject) => {
                    const testImage = new Image();
                    
                    // Timeout to prevent hanging
                    const timeoutId = setTimeout(() => {
                        testImage.src = ''; // Cancel image load
                        reject(new Error('Connection timeout'));
                    }, 5000);

                    testImage.onload = () => {
                        clearTimeout(timeoutId);
                        // Check image dimensions
                        if (testImage.naturalWidth > 0 && testImage.naturalHeight > 0) {
                            resolve({
                                url: testImage.src,
                                width: testImage.naturalWidth,
                                height: testImage.naturalHeight
                            });
                        } else {
                            reject(new Error('Zero-sized image'));
                        }
                    };

                    testImage.onerror = (error) => {
                        clearTimeout(timeoutId);
                        reject(new Error(`Image load failed: ${error}`));
                    };

                    testImage.src = url;
                });
            }

            async function loadStream() {
                const baseUrl = streamUrlInput.value.trim();
                
                if (!baseUrl) {
                    logDebug('Please enter a valid URL', true);
                    return;
                }

                logDebug(`Attempting to load stream from: ${baseUrl}`);

                // Clear previous image
                cameraFeed.src = '';

                // Try different URL variants
                for (const urlModifier of streamUrlVariants) {
                    const testUrl = urlModifier(baseUrl);
                    
                    try {
                        const result = await testStreamUrl(testUrl);
                        
                        // Successful stream found
                        cameraFeed.src = result.url;
                        logDebug(`✓ Stream Loaded Successfully:
- URL: ${result.url}
- Dimensions: ${result.width} x ${result.height}`, false);
                        
                        // Start periodic refresh
                        startPeriodicRefresh(testUrl);
                        return;
                    } catch (error) {
                        logDebug(`✗ Failed with variant ${testUrl}: ${error.message}`, true);
                    }
                }

                // If all attempts fail
                logDebug('❌ Could not load stream from any URL variant', true);
            }

            function startPeriodicRefresh(url) {
                // Clear any existing interval
                if (window.streamRefreshInterval) {
                    clearInterval(window.streamRefreshInterval);
                }

                // Set up new interval
                window.streamRefreshInterval = setInterval(() => {
                    const timestampedUrl = `${url}?t=${Date.now()}`;
                    cameraFeed.src = timestampedUrl;
                }, 3000);
            }

            // Event Listeners
            loadStreamButton.addEventListener('click', loadStream);

            // Restore last used URL
            const savedUrl = localStorage.getItem('droidcamUrl');
            if (savedUrl) {
                streamUrlInput.value = savedUrl;
            }

            // Save URL when changed
            streamUrlInput.addEventListener('change', () => {
                localStorage.setItem('droidcamUrl', streamUrlInput.value.trim());
            });
        });