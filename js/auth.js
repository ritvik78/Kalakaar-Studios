// Authentication & Role Access Management

// Redirect to login if no role is set and we're not already on the login page
const currentPath = window.location.pathname;
const isLoginPage = currentPath.endsWith('login.html');
let role = sessionStorage.getItem('userRole');

// if (!role && !isLoginPage) {
//     window.location.href = 'login.html';
// }

document.addEventListener('DOMContentLoaded', () => {
    // Hide/Show Admin links based on role
    role = sessionStorage.getItem('userRole') || 'visitor';

    const adminLinks = document.querySelectorAll('.admin-only');
    const artistLinks = document.querySelectorAll('.artist-only');
    
    adminLinks.forEach(link => {
        if (role !== 'admin') link.style.display = 'none';
    });
    
    artistLinks.forEach(link => {
        if (role !== 'artist' && role !== 'admin') link.style.display = 'none';
    });

    // Protect elements meant only for artists (like editing their own profile)
    const artistEditForms = document.querySelectorAll('.artist-edit-form');
    artistEditForms.forEach(form => {
        if (role === 'visitor') {
            form.innerHTML = '<p>You do not have permission to edit this profile.</p>';
        }
    });

    // Log out functionality
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('artistEmail');
            window.location.href = 'login.html';
        });
    });
});

// Function to simulate login
function simulateLogin(selectedRole) {
    sessionStorage.setItem('userRole', selectedRole);
    alert(`Logged in as ${selectedRole}`);
    if(selectedRole === 'admin') window.location.href = 'admin-dashboard.html';
    else if(selectedRole === 'artist') window.location.href = 'artist-dashboard.html';
    else window.location.reload();
}