document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open and the link is inside it
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- FAQ Toggle Functionality ---
    window.toggleFAQ = function(button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.add('rotate-180');
        } else {
            content.style.maxHeight = '0px';
            icon.classList.remove('rotate-180');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                content.classList.add('hidden');
            }, 300);
        }
    };
    // Add transition style to FAQ content
    document.querySelectorAll('.faq-content').forEach(content => {
        content.style.transition = 'max-height 0.3s ease-out';
        content.style.overflow = 'hidden';
        if(!content.classList.contains('hidden')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0px';
        }
    });


    // --- Form Submission with Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Client-side validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const errorMsg = field.nextElementSibling;
                if (!field.value.trim() || (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value))) {
                    isValid = false;
                    field.classList.add('invalid');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.remove('hidden');
                    }
                } else {
                    field.classList.remove('invalid');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.add('hidden');
                    }
                }
            });

            if (!isValid) {
                return; // Stop submission if form is invalid
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <span class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending<span class="loading-dots"></span>
                </span>`;
            submitBtn.disabled = true;
            
            // Simulate form processing
            setTimeout(() => {
                const successDiv = document.getElementById('form-success-message');
                successDiv.innerHTML = `
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Thank you! We'll contact you within 24 hours.</span>
                    </div>`;
                successDiv.classList.remove('hidden');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
                
                setTimeout(() => {
                    successDiv.classList.add('hidden');
                }, 5000);
            }, 2000);
        });
    }

    // --- Parallax Effect for Hero Background ---
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            videoBackground.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }

    // --- Active Navigation Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active', 'home-active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        if (id === 'home') {
                            link.classList.add('home-active');
                        }
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" }); // Adjust rootMargin to trigger when section is more centered

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Triggered Animation for Quote Button ---
    const quoteButton = document.querySelector('.btn-primary');

    if (quoteButton) {
        quoteButton.addEventListener('mouseenter', () => {
            quoteButton.classList.add('is-pulsing');
        });
        
        quoteButton.addEventListener('mouseleave', () => {
            quoteButton.classList.remove('is-pulsing');
        });
    }
});