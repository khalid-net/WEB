// Scroll animation for elements
function scrollAnimations() {
    console.log('Initializing scroll animations...');
    const elements = document.querySelectorAll('.scroll-animate');
    console.log(`Found ${elements.length} elements to animate`);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                console.log('Element animated:', entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add initial animation class
function addInitialAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
        // Check if element is in viewport
        const rect = element.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
            element.classList.add('animate');
            console.log('Initial animation added to:', element);
        }
    });
}

// Parallax effect for first page
function parallaxEffect() {
    console.log('Initializing parallax effect...');
    const firstPage = document.querySelector('.first-page');
    
    if (firstPage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            firstPage.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
        console.log('Parallax effect initialized');
    } else {
        console.log('First page element not found');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing animations...');
    scrollAnimations();
    addInitialAnimations();
    parallaxEffect();
});
