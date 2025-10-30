// Backend API URL - hardcoded for now, will be managed as secret later
const BACKEND_URL = 'https://learn-cloud-run-backend-797563351214.us-central1.run.app';

// Update the backend URL display
document.getElementById('backend-url').textContent = BACKEND_URL;

// Utility function to make API calls
async function makeApiCall(endpoint, responseElementId) {
    const responseElement = document.getElementById(responseElementId);
    
    try {
        // Show loading state
        responseElement.textContent = 'Loading...';
        responseElement.className = 'response-box loading';
        
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Show success state
        responseElement.textContent = JSON.stringify(data, null, 2);
        responseElement.className = 'response-box success';
        
        return data;
    } catch (error) {
        // Show error state
        const errorMessage = `Error: ${error.message}`;
        responseElement.textContent = errorMessage;
        responseElement.className = 'response-box error';
        
        console.error('API call failed:', error);
        showErrorModal(`Failed to fetch from ${endpoint}`, error.message);
        
        throw error;
    }
}

// Individual endpoint functions
async function fetchWelcome() {
    await makeApiCall('/', 'welcome-response');
}

async function fetchSecret() {
    await makeApiCall('/secret', 'secret-response');
}

async function fetchRandom() {
    await makeApiCall('/random', 'random-response');
}

async function fetchHealth() {
    await makeApiCall('/health', 'health-response');
}

// Function to test all endpoints
async function fetchAll() {
    const loadingElement = document.getElementById('loading');
    
    try {
        // Show loading animation
        loadingElement.style.display = 'flex';
        
        // Reset all response boxes
        const responseBoxes = document.querySelectorAll('.response-box');
        responseBoxes.forEach(box => {
            box.textContent = 'Fetching...';
            box.className = 'response-box loading';
        });
        
        // Make all API calls in parallel
        const promises = [
            makeApiCall('/', 'welcome-response'),
            makeApiCall('/secret', 'secret-response'),
            makeApiCall('/random', 'random-response'),
            makeApiCall('/health', 'health-response')
        ];
        
        await Promise.all(promises);
        
        // Show success notification
        showSuccessNotification('All endpoints tested successfully!');
        
    } catch (error) {
        console.error('Error testing all endpoints:', error);
        showErrorModal('Batch Test Failed', 'One or more endpoints failed during batch testing.');
    } finally {
        // Hide loading animation
        loadingElement.style.display = 'none';
    }
}

// Error modal functions
function showErrorModal(title, message) {
    const modal = document.getElementById('error-modal');
    const errorMessage = document.getElementById('error-message');
    
    errorMessage.innerHTML = `<strong>${title}</strong><br><br>${message}`;
    modal.style.display = 'block';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeModal();
    }, 5000);
}

function closeModal() {
    const modal = document.getElementById('error-modal');
    modal.style.display = 'none';
}

// Success notification
function showSuccessNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #96fbc4 0%, #f9f586 100%);
            color: #2c3e50;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        ">
            ✅ ${message}
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(300px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('error-modal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape key closes modal
        if (event.key === 'Escape') {
            closeModal();
        }
        
        // Number keys for quick endpoint testing
        switch(event.key) {
            case '1':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    fetchWelcome();
                }
                break;
            case '2':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    fetchSecret();
                }
                break;
            case '3':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    fetchRandom();
                }
                break;
            case '4':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    fetchHealth();
                }
                break;
            case '0':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    fetchAll();
                }
                break;
        }
    });
    
    console.log('🚀 FastAPI Cloud Run Frontend loaded!');
    console.log('💡 Keyboard shortcuts:');
    console.log('  Ctrl/Cmd + 1: Test Welcome endpoint');
    console.log('  Ctrl/Cmd + 2: Test Secret endpoint');
    console.log('  Ctrl/Cmd + 3: Test Random endpoint');
    console.log('  Ctrl/Cmd + 4: Test Health endpoint');
    console.log('  Ctrl/Cmd + 0: Test All endpoints');
    console.log('  Escape: Close modal');
});

// Network status monitoring
window.addEventListener('online', function() {
    showSuccessNotification('Network connection restored!');
});

window.addEventListener('offline', function() {
    showErrorModal('Network Error', 'You appear to be offline. Please check your internet connection.');
});

// Performance monitoring
function logPerformance(endpoint, startTime, endTime) {
    const duration = endTime - startTime;
    console.log(`🔍 API Performance: ${endpoint} took ${duration.toFixed(2)}ms`);
    
    if (duration > 5000) {
        console.warn(`⚠️ Slow response from ${endpoint}: ${duration.toFixed(2)}ms`);
    }
}

// Enhanced API call with performance monitoring
async function makeApiCallWithPerformance(endpoint, responseElementId) {
    const startTime = performance.now();
    
    try {
        const result = await makeApiCall(endpoint, responseElementId);
        const endTime = performance.now();
        logPerformance(endpoint, startTime, endTime);
        return result;
    } catch (error) {
        const endTime = performance.now();
        logPerformance(`${endpoint} (ERROR)`, startTime, endTime);
        throw error;
    }
}

// Health check on page load
document.addEventListener('DOMContentLoaded', function() {
    // Automatically check health when page loads
    setTimeout(() => {
        console.log('🏥 Running automatic health check...');
        fetchHealth().catch(() => {
            console.warn('⚠️ Initial health check failed - backend might be unavailable');
        });
    }, 1000);
});