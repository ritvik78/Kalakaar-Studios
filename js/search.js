/**
 * SEARCH.JS – Universal Search Overlay Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchTriggerBtn = document.getElementById('searchTriggerBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchTriggerBtn && searchOverlay && closeSearchBtn) {
        // Open search overlay
        searchTriggerBtn.addEventListener('click', () => {
            searchOverlay.style.opacity = '1';
            searchOverlay.style.pointerEvents = 'auto';
            setTimeout(() => {
                searchInput.focus();
            }, 100);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });

        // Close search overlay
        const closeSearch = () => {
            searchOverlay.style.opacity = '0';
            searchOverlay.style.pointerEvents = 'none';
            searchInput.value = '';
            
            // Restore body scroll
            document.body.style.overflow = '';
        };

        closeSearchBtn.addEventListener('click', closeSearch);

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.style.opacity === '1') {
                closeSearch();
            }
        });

        // Mock database for artists
        const mockArtists = [
            { name: "Zakir Khan", category: "Stand-up Comedy", link: "profile.html" },
            { name: "Vir Das", category: "Stand-up Comedy", link: "vir-das.html" },
            { name: "Arijit Singh", category: "Playback Singer", link: "arijit-singh.html" },
            { name: "Sunidhi Chauhan", category: "Singer", link: "category.html" }
        ];

        // Categories
        const mockCategories = [
            { name: "Stand-up Comedians", link: "category.html" },
            { name: "Singers", link: "category.html" },
            { name: "DJs", link: "category.html" }
        ];

        // Search behavior
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const resultsContainer = document.getElementById('searchResults');
            
            if (query.length >= 2) {
                // Filter artists and categories
                const filteredArtists = mockArtists.filter(a => a.name.toLowerCase().includes(query) || a.category.toLowerCase().includes(query));
                const filteredCategories = mockCategories.filter(c => c.name.toLowerCase().includes(query));
                
                let html = `<div style="width: 100%; text-align: left; margin-top: 1rem;">
                    <p style="color: #ccc; margin-bottom: 0.5rem;">Results for "${e.target.value}"</p>
                    <ul style="list-style: none; padding: 0;">`;
                
                filteredArtists.forEach(artist => {
                    html += `<li style="margin-bottom: 0.5rem;"><a href="${artist.link}" style="color: var(--color-purple); text-decoration: none; font-size: 1.1rem;">${artist.name}</a> <span style="color: #666; font-size: 0.8rem;">- ${artist.category}</span></li>`;
                });

                filteredCategories.forEach(cat => {
                    html += `<li style="margin-bottom: 0.5rem;"><a href="${cat.link}" style="color: var(--color-purple); text-decoration: none; font-size: 1.1rem;">${cat.name}</a> <span style="color: #666; font-size: 0.8rem;">- Category</span></li>`;
                });

                if(filteredArtists.length === 0 && filteredCategories.length === 0) {
                    html += `<li style="color: #666; font-size: 0.9rem;">No results found.</li>`;
                }

                html += `</ul></div>`;
                resultsContainer.innerHTML = html;
            } else if (query.length === 0) {
                // Restore popular searches
                resultsContainer.innerHTML = `
                    <span style="color: #666; font-size: 0.9rem; margin-top: 0.2rem;">Popular:</span>
                    <a href="category.html" class="search-pill">Singers</a>
                    <a href="category.html" class="search-pill">Comedians</a>
                    <a href="vir-das.html" class="search-pill">Vir Das</a>
                    <a href="profile.html" class="search-pill">Zakir Khan</a>
                    <a href="arijit-singh.html" class="search-pill">Arijit Singh</a>
                `;
                
                // Keep styles inline if needed since Search Pill class wasn't there before
                const pills = resultsContainer.querySelectorAll('a');
                pills.forEach(pill => {
                    pill.style.cssText = "color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s; margin-right: 0.5rem;";
                    pill.onmouseover = function() { this.style.color='var(--color-purple)'; this.style.borderColor='var(--color-purple)'; };
                    pill.onmouseout = function() { this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'; };
                });
            }
        });
    }
});
