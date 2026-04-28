/**
 * CAROUSEL INITIALIZATION
 * Uses Swiper.js for the Featured Talents 3D Coverflow effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Check if Swiper is loaded and the container exists
    if (typeof Swiper !== 'undefined' && document.querySelector('.featured-swiper')) {
        const swiper = new Swiper('.featured-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 30, // slide rotate in degrees
                stretch: 0, // stretch space between slides (in px)
                depth: 150, // depth offset in px (z-axis)
                modifier: 1, // effect multiplier
                slideShadows: true, // enables slide shadows
            },
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1.2,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2.5,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3.5,
                }
            }
        });
    }

    if (typeof Swiper !== 'undefined' && document.querySelector('.recent-works-swiper')) {
        const swiperRecentWorks = new Swiper('.recent-works-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 30, // slide rotate in degrees
                stretch: 0, // stretch space between slides (in px)
                depth: 150, // depth offset in px (z-axis)
                modifier: 1, // effect multiplier
                slideShadows: true, // enables slide shadows
            },
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1.2,
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2.5,
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3.5,
                }
            }
        });
    }

    // Initialize testimonial carousel if present
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        const testimonialSwiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }
});
