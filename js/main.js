/* ============================================================
   MAIN.JS – Global Functionality & Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                triggerInitialAnimations();
            }, 500);
        }, 1500); // 1.5s initial load simulation
    }

    // 3. Scroll Progress Bar & Sticky Header
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        if (header) {
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 4. Hamburger Menu (Mobile)
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.backgroundColor = 'var(--color-bg-dark)';
            navMenu.style.padding = '1rem';
        });
    }

    // 5. Scroll Reveal with Intersection Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a stagger container, trigger children
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.classList.add('visible');
                }

                // If it's the stats section, animate numbers
                if (entry.target.id === 'statsContainer') {
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Animated Counters
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        const counters = document.querySelectorAll('.stat-number');
        const duration = 2000; // 2 seconds

        counters.forEach((counter, index) => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now() + (index * 150); // Stagger
            
            const updateCount = (currentTime) => {
                if (currentTime < startTime) {
                    requestAnimationFrame(updateCount);
                    return;
                }

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.innerText = current + '+';

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + '+';
                }
            };

            requestAnimationFrame(updateCount);
        });
    }

    // Initial animations function
    function triggerInitialAnimations() {
        const heroWords = document.querySelectorAll('.hero-title .word');
        heroWords.forEach((word, idx) => {
            setTimeout(() => {
                word.classList.add('visible');
                word.style.opacity = '1';
                word.style.transform = 'none';
                word.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }, idx * 200); // 200ms stagger
        });
    }

    // 7. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        // Check local storage for preference
        const currentTheme = localStorage.getItem('theme') || 'dark';
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.classList.add('light-mode');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.classList.remove('light-mode');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.classList.add('light-mode');
            }
        });
    }
    // 8. Particle System for Hero Canvas
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function initParticles() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            
            const numParticles = Math.min(window.innerWidth / 10, 100);
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 2 + 1,
                    dx: (Math.random() - 0.5) * 1.5,
                    dy: (Math.random() - 0.5) * 1.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(0, 229, 204, 0.8)'; // Teal color from variables

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.globalAlpha = p.opacity;
                ctx.fill();

                // Move
                p.x += p.dx;
                p.y += p.dy;

                // Bounce
                if (p.x < 0 || p.x > width) p.dx *= -1;
                if (p.y < 0 || p.y > height) p.dy *= -1;
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 229, 204, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.globalAlpha = 1 - (dist / 150);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawParticles);
        }

        initParticles();
        drawParticles();
        window.addEventListener('resize', initParticles);
    }
});

// Handle Profile Routing Globally
window.handleProfileClick = function() {
  // Login requirement removed per user request
  window.location.href = 'artist-dashboard.html';
};
