/* ============================================================
   GALLERY.JS – Masonry Gallery & Lightbox
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreGallery');
    
    if (!galleryGrid) return;

    // Image data simulation
    const moreImages = [
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1533174000273-e18fa1f4784a?q=80&w=600&auto=format&fit=crop"
    ];

    // Simple Masonry Setup
    const setupMasonry = () => {
        const items = galleryGrid.querySelectorAll('.gallery-item');
        items.forEach(item => {
            // Randomize aspect ratio slightly for masonry effect
            const heights = ['200px', '250px', '300px', '350px'];
            const randomHeight = heights[Math.floor(Math.random() * heights.length)];
            item.style.height = randomHeight;
            
            const img = item.querySelector('img');
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            // Add hover effect
            item.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(0.8)';
            });
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            });
            
            // Add click to open lightbox
            item.addEventListener('click', () => {
                openLightbox(img.src);
            });
        });
    };

    // Load More Functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const originalText = loadMoreBtn.innerText;
            loadMoreBtn.innerText = 'Loading...';
            
            setTimeout(() => {
                moreImages.forEach((src, idx) => {
                    const div = document.createElement('div');
                    div.className = 'gallery-item reveal fadeInUp';
                    div.style.borderRadius = '8px';
                    div.style.overflow = 'hidden';
                    div.style.position = 'relative';
                    div.style.animationDelay = `${idx * 0.1}s`;
                    
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = 'Event';
                    img.style.width = '100%';
                    img.style.transition = 'transform var(--trans-standard)';
                    
                    div.appendChild(img);
                    galleryGrid.appendChild(div);
                });
                
                setupMasonry();
                loadMoreBtn.innerText = originalText;
                
                // Hide button after loading
                loadMoreBtn.style.display = 'none';
            }, 800);
        });
    }

    let lightboxElements;

    function closeLightbox() {
        if (!lightboxElements) return;
        lightboxElements.container.style.opacity = '0';
        lightboxElements.img.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lightboxElements.container.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }

    function openLightbox(src) {
        if (!lightboxElements) return;
        lightboxElements.img.src = src;
        lightboxElements.container.style.display = 'flex';
        // Trigger reflow
        void lightboxElements.container.offsetWidth;
        lightboxElements.container.style.opacity = '1';
        lightboxElements.img.style.transform = 'scale(1)';
        document.body.style.overflow = 'hidden';
    }

    // Lightbox Creation
    const createLightbox = () => {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.style.position = 'fixed';
        lb.style.inset = '0';
        lb.style.backgroundColor = 'rgba(0,0,0,0.95)';
        lb.style.zIndex = '10000';
        lb.style.display = 'none';
        lb.style.alignItems = 'center';
        lb.style.justifyContent = 'center';
        lb.style.opacity = '0';
        lb.style.transition = 'opacity 0.4s ease';
        
        const lbImg = document.createElement('img');
        lbImg.style.maxWidth = '90%';
        lbImg.style.maxHeight = '90%';
        lbImg.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
        lbImg.style.borderRadius = '8px';
        lbImg.style.transform = 'scale(0.9)';
        lbImg.style.transition = 'transform 0.4s ease';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '30px';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '3rem';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        
        lb.appendChild(lbImg);
        lb.appendChild(closeBtn);
        document.body.appendChild(lb);
        
        closeBtn.addEventListener('click', closeLightbox);
        lb.addEventListener('click', (e) => {
            if (e.target === lb) closeLightbox();
        });
        
        return { container: lb, img: lbImg };
    };

    lightboxElements = createLightbox();

    setupMasonry();
});
