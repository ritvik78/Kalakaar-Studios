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

        // Simple search behavior simulation
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const resultsContainer = document.getElementById('searchResults');
            
            if (query.length > 2) {
                // Simulate fetching results
                resultsContainer.innerHTML = `
                    <div style="width: 100%; text-align: left; margin-top: 1rem;">
                        <p style="color: #ccc; margin-bottom: 0.5rem;">Results for "${query}"</p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;"><a href="profile.html" style="color: var(--color-teal); text-decoration: none; font-size: 1.1rem;">Zakir Khan</a> <span style="color: #666; font-size: 0.8rem;">- Stand-up Comedy</span></li>
                            <li style="margin-bottom: 0.5rem;"><a href="category.html" style="color: var(--color-teal); text-decoration: none; font-size: 1.1rem;">Stand-up Comedians</a> <span style="color: #666; font-size: 0.8rem;">- Category</span></li>
                        </ul>
                    </div>
                `;
            } else if (query.length === 0) {
                // Restore popular searches
                resultsContainer.innerHTML = `
                    <span style="color: #666; font-size: 0.9rem; margin-top: 0.2rem;">Popular:</span>
                    <a href="category.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">Singers</a>
                    <a href="category.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">Comedians</a>
                    <a href="category.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">DJs</a>
                    <a href="category.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">Motivational Speakers</a>
                    <a href="profile.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">Zakir Khan</a>
                    <a href="profile.html" style="color: #aaa; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.9rem; transition: all 0.3s;" onmouseover="this.style.color='var(--color-teal)'; this.style.borderColor='var(--color-teal)'" onmouseout="this.style.color='#aaa'; this.style.borderColor='rgba(255,255,255,0.2)'">Arijit Singh</a>
                `;
            }
        });
    }
});
