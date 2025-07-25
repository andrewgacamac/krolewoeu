
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initInvestmentCalculator();
    // Language switcher is handled by language-switcher.js
    initContactForm();
    // initMap(); // Disabled - using static map image
    initVideoHandling();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.querySelector('.nav-mobile-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            }
        });
    });
}

// Investment Calculator
function initInvestmentCalculator() {
    const propertyPrice = document.getElementById('property-price');
    const rentalPrice = document.getElementById('rental-price');
    const occupancyRate = document.getElementById('occupancy-rate');
    const rangeValue = document.querySelector('.range-value');
    
    // Results elements
    const annualIncome = document.getElementById('annual-income');
    const rentalYield = document.getElementById('rental-yield');
    const futureValue = document.getElementById('future-value');
    
    function calculateROI() {
        if (!propertyPrice || !rentalPrice || !occupancyRate) return;
        
        const price = parseFloat(propertyPrice.value) || 120000;
        const nightlyRate = parseFloat(rentalPrice.value) || 100;
        const occupancy = parseFloat(occupancyRate.value) / 100 || 0.5;
        
        // Calculate annual rental income
        const daysPerYear = 365;
        const annualRentalIncome = nightlyRate * daysPerYear * occupancy;
        
        // Calculate gross rental yield
        const grossYield = (annualRentalIncome / price) * 100;
        
        // Calculate future value (5 years at 10.4% growth)
        const growthRate = 0.104;
        const years = 5;
        const futurePropertyValue = price * Math.pow(1 + growthRate, years);
        
        // Update display
        if (annualIncome) annualIncome.textContent = `€${annualRentalIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
        if (rentalYield) rentalYield.textContent = `${grossYield.toFixed(1)}%`;
        if (futureValue) futureValue.textContent = `€${futurePropertyValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    
    // Update range value display
    if (occupancyRate) {
        occupancyRate.addEventListener('input', function() {
            if (rangeValue) rangeValue.textContent = `${this.value}%`;
            calculateROI();
        });
    }
    
    // Add event listeners
    if (propertyPrice) propertyPrice.addEventListener('input', calculateROI);
    if (rentalPrice) rentalPrice.addEventListener('input', calculateROI);
    
    // Initial calculation
    calculateROI();
}



// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your interest! We will contact you within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
}

// Initialize Map - Disabled as we're using a static image
/*
function initMap() {
    const mapContainer = document.getElementById('interactive-map');
    
    if (mapContainer) {
        // In a real implementation, you would use Google Maps or Mapbox
        // For now, we'll add a placeholder
        mapContainer.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f0f0f0;">
                <p style="color: #666; font-size: 1.2rem;">Interactive map will be loaded here</p>
            </div>
        `;
        
        // Example of how you might initialize Google Maps:
        /*
        const map = new google.maps.Map(mapContainer, {
            center: { lat: 52.6333, lng: 20.5667 }, // Królewo coordinates
            zoom: 12,
            styles: mapStyles // Custom map styles
        });
        
        // Add marker for Królewo
        new google.maps.Marker({
            position: { lat: 52.6333, lng: 20.5667 },
            map: map,
            title: 'Królewo Forest Properties'
        });
        */
    }
}

// Video Handling
function initVideoHandling() {
    // Play testimonial videos
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.testimonial-card');
            console.log('Playing video for:', card.querySelector('h4').textContent);
            
            // In a real implementation, you would:
            // 1. Load video in a modal
            // 2. Play the video
            // 3. Track engagement
        });
    });
    
    // Optimize hero video for performance
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Pause video when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        observer.observe(heroVideo);
    }
}

// Scroll Animations
function initAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add animated class styles
    const style = document.createElement('style');
    style.textContent = `
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Utility Functions
function formatCurrency(amount, currency = 'EUR') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// WhatsApp Click Tracking
document.querySelector('.whatsapp-float')?.addEventListener('click', function() {
    // Track WhatsApp click
    console.log('WhatsApp button clicked');
    // In production, you would send this to your analytics
});

// Newsletter Form
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Virtual Tour Buttons
document.querySelectorAll('.btn:contains("Virtual Tour")').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Virtual tour requested for property');
        // In production, this would open a virtual tour modal or redirect
        alert('Virtual tour feature coming soon!');
    });
});

// Calendly Integration (placeholder)
window.openCalendly = function() {
    console.log('Opening Calendly widget');
    // In production, you would integrate Calendly's embed widget
    // Calendly.initPopupWidget({url: 'https://calendly.com/your-link'});
    alert('Calendly scheduling widget would open here');
};

// Performance Monitoring
window.addEventListener('load', function() {
    // Log page load performance
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
    // In production, send errors to monitoring service
});

// Mobile menu styles are now in the CSS file

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // In production, you would add data-src attributes to images
    // and observe them for lazy loading
}

console.log('Królewo website initialized successfully!');