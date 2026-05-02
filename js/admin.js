// Mock Data for Admin Dashboard - Persist in LocalStorage
let mockArtists = JSON.parse(localStorage.getItem('mockArtists')) || [
    { id: 1, name: "DJ Spark", email: "spark@example.com", status: "Active", price: "₹50000", dates: "Oct 12, Oct 15" },
    { id: 2, name: "The Rockers", email: "rockers@example.com", status: "Inactive", price: "₹120000", dates: "Nov 01" },
    { id: 3, name: "Elena Vocals", email: "elena@example.com", status: "Active", price: "₹80000", dates: "Oct 20, Nov 05" }
];

const mockLogins = [
    { user: "DJ Spark", ip: "192.168.1.1", time: "2026-05-02 10:30 AM", status: "Success" },
    { user: "The Rockers", ip: "192.168.1.4", time: "2026-05-01 09:15 PM", status: "Failed" },
    { user: "Elena Vocals", ip: "10.0.0.5", time: "2026-05-02 08:45 AM", status: "Success" }
];

function saveToLocalStorage() {
    localStorage.setItem('mockArtists', JSON.stringify(mockArtists));
}

// Check Authorization (Mocking Role Based Access)
function checkAuth() {
    const role = sessionStorage.getItem('userRole'); // 'admin', 'artist', 'visitor'
    if (role !== 'admin') {
        alert('Access Denied. You do not have admin privileges.');
        window.location.href = 'index.html';
    }
}

// Render Tables
function renderAdminDashboard() {
    const artistList = document.getElementById('artistList');
    const showsList = document.getElementById('showsList');
    const loginHistory = document.getElementById('loginHistory');

    // Render Artists
    artistList.innerHTML = mockArtists.map(artist => `
        <tr>
            <td>${artist.name}</td>
            <td>${artist.email}</td>
            <td>${artist.status}</td>
            <td>
                <button class="btn btn-edit" onclick="editProfile(${artist.id})">Edit Profile</button>
                <button class="btn btn-danger" onclick="toggleStatus(${artist.id})">${artist.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
            </td>
        </tr>
    `).join('');

    // Render Shows and Prices
    showsList.innerHTML = mockArtists.map(artist => `
        <tr>
            <td>${artist.name}</td>
            <td><input type="text" value="${artist.price}" id="price-${artist.id}"></td>
            <td><input type="text" value="${artist.dates}" id="dates-${artist.id}"></td>
            <td><button class="btn btn-edit" onclick="saveShowData(${artist.id})">Save</button></td>
        </tr>
    `).join('');

    // Render Logins
    loginHistory.innerHTML = mockLogins.map(login => `
        <tr>
            <td>${login.user}</td>
            <td>${login.ip}</td>
            <td>${login.time}</td>
            <td style="color: ${login.status === 'Success' ? 'green' : 'red'}">${login.status}</td>
        </tr>
    `).join('');
}

// Admin Actions
function editProfile(id) {
    const artist = mockArtists.find(a => a.id === id);
    if(artist) {
        const newName = prompt(`Editing profile for Artist ID: ${id}\nUpdate Name:`, artist.name);
        const newEmail = prompt(`Update Email:`, artist.email);
        
        if (newName && newEmail) {
            artist.name = newName;
            artist.email = newEmail;
            saveToLocalStorage();
            renderAdminDashboard();
            alert('Profile updated successfully!');
        }
    }
}

function toggleStatus(id) {
    const artist = mockArtists.find(a => a.id === id);
    if(artist) {
        artist.status = artist.status === 'Active' ? 'Inactive' : 'Active';
        saveToLocalStorage();
        renderAdminDashboard();
    }
}

function saveShowData(id) {
    const price = document.getElementById(`price-${id}`).value;
    const dates = document.getElementById(`dates-${id}`).value;
    const artist = mockArtists.find(a => a.id === id);
    if(artist) {
        artist.price = price;
        artist.dates = dates;
        saveToLocalStorage();
    }
    alert(`Saved details for Artist ID: ${id}\nNew Price: ${price}\nNew Dates: ${dates}`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Rely on session logic from auth.js instead of forcing admin
    checkAuth();
    renderAdminDashboard();
});