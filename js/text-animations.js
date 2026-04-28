/**
 * TEXT ANIMATIONS LIBRARY
 * Implements 15 types of text animations using Intersection Observer and CSS classes.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Setup Intersection Observer for text animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const textObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animated');
                // Optional: Stop observing after animation triggers once
                // observer.unobserve(entry.target);
            } else {
                // Remove class when out of view to allow re-triggering (optional based on preference)
                entry.target.classList.remove('is-animated');
            }
        });
    }, observerOptions);

    // 1. Split Reveal (Preserves HTML tags like <br> and <span> while wrapping text words)
    const splitRevealElements = document.querySelectorAll('.text-anim-split-reveal');
    splitRevealElements.forEach(el => {
        const wrapWordsInTextNodes = (node) => {
            if (node.nodeType === 3) { // Text node
                const words = node.nodeValue.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                words.forEach(word => {
                    if (word.trim().length > 0) {
                        const span = document.createElement('span');
                        span.className = 'anim-word';
                        span.textContent = word;
                        fragment.appendChild(span);
                    } else if (word.length > 0) {
                        // Preserving spaces as text nodes
                        fragment.appendChild(document.createTextNode(word));
                    }
                });
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === 1) { // Element node
                Array.from(node.childNodes).forEach(wrapWordsInTextNodes);
            }
        };

        // First process child nodes
        Array.from(el.childNodes).forEach(wrapWordsInTextNodes);
        
        // Then apply stagger delays sequentially
        const animWords = el.querySelectorAll('.anim-word');
        animWords.forEach((wordNode, index) => {
            wordNode.style.display = 'inline-block';
            wordNode.style.transitionDelay = `${index * 100}ms`;
        });

        textObserver.observe(el);
    });

    // 2. Typewriter
    const typewriterElements = document.querySelectorAll('.text-anim-typewriter');
    typewriterElements.forEach(el => textObserver.observe(el));

    // 3. Wave
    const waveElements = document.querySelectorAll('.text-anim-wave');
    waveElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 50}ms`;
            el.appendChild(span);
        });
        textObserver.observe(el);
    });

    // 4. Glitch
    const glitchElements = document.querySelectorAll('.text-anim-glitch');
    glitchElements.forEach(el => {
        el.setAttribute('data-text', el.innerText);
        textObserver.observe(el);
    });

    // 5. Gradient Text
    const gradientElements = document.querySelectorAll('.text-anim-gradient');
    gradientElements.forEach(el => textObserver.observe(el));

    // 6. Blur-to-sharp
    const blurElements = document.querySelectorAll('.text-anim-blur');
    blurElements.forEach(el => textObserver.observe(el));

    // 7. 3D flip
    const flipElements = document.querySelectorAll('.text-anim-flip');
    flipElements.forEach(el => textObserver.observe(el));

    // 8. Scramble (Basic implementation)
    const scrambleElements = document.querySelectorAll('.text-anim-scramble');
    scrambleElements.forEach(el => textObserver.observe(el));

    // 9. Underline draw
    const underlineElements = document.querySelectorAll('.text-anim-underline');
    underlineElements.forEach(el => textObserver.observe(el));

    // 10. Highlight sweep
    const sweepElements = document.querySelectorAll('.text-anim-sweep');
    sweepElements.forEach(el => textObserver.observe(el));

    // 11. Split color
    const splitColorElements = document.querySelectorAll('.text-anim-split-color');
    splitColorElements.forEach(el => {
        el.setAttribute('data-text', el.innerText);
        textObserver.observe(el);
    });

    // 12. Bounce in
    const bounceElements = document.querySelectorAll('.text-anim-bounce');
    bounceElements.forEach(el => textObserver.observe(el));

    // 13. Fade cascade
    const cascadeElements = document.querySelectorAll('.text-anim-cascade');
    cascadeElements.forEach(el => {
        const words = el.innerText.split(' ');
        el.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.style.transitionDelay = `${index * 150}ms`;
            el.appendChild(span);
        });
        textObserver.observe(el);
    });

    // 14. Rotate in
    const rotateElements = document.querySelectorAll('.text-anim-rotate');
    rotateElements.forEach(el => textObserver.observe(el));

    // 15. Scale pulse
    const scaleElements = document.querySelectorAll('.text-anim-scale');
    scaleElements.forEach(el => textObserver.observe(el));
});
