// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display user info
    displayUserInfo();
});

function displayUserInfo() {
    const userInfo = document.getElementById('userInfo');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user && user.name) {
        userInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>User ID:</strong> ${user.id || 'N/A'}</p>
            <p><strong>Last Login:</strong> ${new Date().toLocaleString()}</p>
        `;
    } else {
        userInfo.innerHTML = '<p>No user information available.</p>';
    }
}

async function loadProtectedData() {
    const token = localStorage.getItem('authToken');
    const protectedDataDiv = document.getElementById('protectedData');
    
    protectedDataDiv.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const response = await fetch(`${API_BASE_URL}/protected-data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            protectedDataDiv.innerHTML = `
                <h4>Secret Information:</h4>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } else if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        } else {
            protectedDataDiv.innerHTML = `<p class="error">Error: ${data.message}</p>`;
        }
    } catch (error) {
        protectedDataDiv.innerHTML = '<p class="error">Failed to load data. Please try again.</p>';
        console.error('Protected data error:', error);
    }
}