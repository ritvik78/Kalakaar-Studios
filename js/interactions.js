/**
 * INTERACTIONS LIBRARY
 * Handles custom cursor, magnetic elements, and ripple effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Custom Cursor ---
    const cursor = document.getElementById('customCursor');
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let hasPointer = false;

    if (cursor && !isCoarsePointer) {
        document.documentElement.classList.add('custom-cursor-enabled');
        cursor.style.willChange = 'transform';

        // Follow pointer (mouse/pen) with low latency
        document.addEventListener('pointermove', (e) => {
            // Only track primary pointer (prevents oddities with multi-touch)
            if (e.isPrimary === false) return;
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!hasPointer) {
                hasPointer = true;
                cursorX = mouseX;
                cursorY = mouseY;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            }
        }, { passive: true });

        // Smooth follow loop (higher factor = less lag)
        function animateCursor() {
            if (hasPointer) {
                const follow = 0.45;
                cursorX += (mouseX - cursorX) * follow;
                cursorY += (mouseY - cursorY) * follow;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    } else if (cursor && isCoarsePointer) {
        document.documentElement.classList.remove('custom-cursor-enabled');
        cursor.style.display = 'none';
    } else {
        document.documentElement.classList.remove('custom-cursor-enabled');
    }

    // --- 3. Ripple Click Effect ---
    document.addEventListener('click', function(e) {
        // Only apply to elements with .ripple class or generic buttons
        const target = e.target.closest('.btn, .ripple-effect');
        if (!target) return;

        const circle = document.createElement('span');
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;

        const rect = target.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const existingRipple = target.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        // Add position relative and overflow hidden if not present
        if (getComputedStyle(target).position === 'static') {
            target.style.position = 'relative';
        }
        target.style.overflow = 'hidden';

        target.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600); // Matches animation duration
    });
});
