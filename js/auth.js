// Authentication & Role Access Management
document.addEventListener('DOMContentLoaded', () => {
    // Mock user roles checking for generic pages
    const role = localStorage.getItem('userRole') || 'visitor';
    
    // Hide/Show Admin links based on role
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
});

// Function to simulate login
function simulateLogin(selectedRole) {
    localStorage.setItem('userRole', selectedRole);
    alert(`Logged in as ${selectedRole}`);
    if(selectedRole === 'admin') window.location.href = 'admin-dashboard.html';
    else if(selectedRole === 'artist') window.location.href = 'artist-dashboard.html';
    else window.location.reload();
}