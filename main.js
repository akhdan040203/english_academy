import Alpine from 'alpinejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

window.Alpine = Alpine
Alpine.start()

// Helper to wait for all images to load
const waitForImages = () => {
    const images = Array.from(document.images);
    if (images.length === 0) return Promise.resolve();

    return Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve); // Proceed anyway if image fails
        });
    }));
};

// Initialize Animations with extra robustness
const initAnimations = () => {
    // Clear any existing triggers before re-initializing
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Hero Animations
    gsap.from('.hero-title-anim', {
        duration: 1.5,
        y: 60,
        opacity: 0,
        ease: 'expo.out',
        delay: 0.3
    })

    gsap.from('.hero-text-anim', {
        duration: 1.2,
        y: 40,
        opacity: 0,
        ease: 'expo.out',
        delay: 0.5
    })

    gsap.from('.hero-cta-anim', {
        duration: 1.2,
        scale: 0.9,
        opacity: 0,
        ease: 'expo.out',
        delay: 0.7
    })

    // Hero Image Area Animations
    gsap.from('.hero-image-anim', {
        duration: 1.8,
        scale: 0.8,
        opacity: 0,
        ease: 'expo.out',
        delay: 0.4
    })

    gsap.from('.hero-swish-anim', {
        duration: 2,
        opacity: 0,
        rotate: -10,
        ease: 'expo.out',
        delay: 0.2
    })

    gsap.from('.hero-card-1-anim', {
        duration: 1.5,
        x: 50,
        y: -30,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 0.9
    })

    gsap.from('.hero-card-2-anim', {
        duration: 1.5,
        x: -50,
        y: 30,
        opacity: 0,
        ease: 'back.out(1.7)',
        delay: 1.1
    })

    gsap.from('.hero-bg-anim', {
        duration: 3,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.1
    })

    // Scroll Animations
    const sections = ['#courses', '#about', '#results', '#feedback']

    sections.forEach(selector => {
        const section = document.querySelector(selector)
        if (!section) return

        // Animate all text elements (headings, subheaders, descriptions)
        const textElements = section.querySelectorAll('h2, h3, p:not(.reveal-grid p), span.uppercase:not(.reveal-grid span)');
        if (textElements.length > 0) {
            gsap.fromTo(textElements,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%', // Slightly later start for better visibility
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power3.out',
                    stagger: 0.1
                }
            )
        }

        // Animate Specific Items (reveal-item)
        const items = section.querySelectorAll('.reveal-item')
        if (items.length > 0) {
            gsap.fromTo(items,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'expo.out',
                    stagger: 0.15
                }
            )
        }

        // Animate Cards
        const grids = section.querySelectorAll('.reveal-grid')
        grids.forEach(grid => {
            gsap.fromTo(grid.children,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: grid,
                        start: 'top 92%',
                        toggleActions: 'play none none none'
                    },
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'expo.out',
                    stagger: 0.1
                }
            )
        })
    })

    // Safety fallback: If scroll triggers haven't fired after 1 second, show everything
    setTimeout(() => {
        gsap.to(['h1', 'h2', 'h3', 'p', '.reveal-grid > div', '.reveal-item'], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            overwrite: 'auto'
        });
    }, 1000);

    // Initial Refresh
    ScrollTrigger.refresh();
}

// Faster, more direct initialization
const runInit = () => {
    // Check if we are ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(initAnimations, 100));
    } else {
        setTimeout(initAnimations, 100);
    }

    // Refresh again when images are done
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        setTimeout(() => ScrollTrigger.refresh(), 500);
    });
}

runInit();

// Re-freshen on any window behavior
window.addEventListener('resize', () => ScrollTrigger.refresh())
window.addEventListener('orientationchange', () => ScrollTrigger.refresh())
