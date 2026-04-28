/**
 * CONVERSION.JS – Interaction tracking
 */
document.addEventListener('DOMContentLoaded', () => {
    // Simple tracking for buttons
    const ctas = document.querySelectorAll('.btn');
    ctas.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnText = e.target.innerText.trim();
            console.log(`[Tracking] User clicked CTA: ${btnText}`);
            // Here you would push to Google Analytics or similar
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': btnText });
        });
    });
});
