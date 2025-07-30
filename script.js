// Portfolio JavaScript with 3D Effects and Smooth Interactions

class Portfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupTheme();
    }

    init() {
        // Initialize scroll progress indicator
        this.createScrollProgress();
        
        // Initialize intersection observer for animations
        this.setupIntersectionObserver();
        
        // Initialize mobile menu
        this.setupMobileMenu();
        
        // Initialize smooth scrolling
        this.setupSmoothScrolling();
        
        // Initialize form handling
        this.setupFormHandling();
        
        // Initialize navbar scroll effect
        this.setupNavbarScroll();
        
        // Initialize cursor effects (desktop only)
        if (window.innerWidth > 1024) {
            this.setupCustomCursor();
        }
    }

    createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Scroll handler for navbar
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }

    setupScrollAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add fade-in animations
                    if (element.classList.contains('fade-in-up')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('fade-in-left')) {
                        element.classList.add('visible');
                    }
                    if (element.classList.contains('fade-in-right')) {
                        element.classList.add('visible');
                    }
                    
                    // Stagger animation for multiple elements
                    if (element.classList.contains('stagger-animate')) {
                        const children = element.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('visible');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stagger-animate').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll behavior is handled by CSS, but we can add easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e);
            });
            
            // Add input animations
            const formInputs = contactForm.querySelectorAll('.form-input');
            formInputs.forEach(input => {
                input.addEventListener('focus', (e) => {
                    e.target.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', (e) => {
                    if (!e.target.value) {
                        e.target.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    setupNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animateCursor = () => {
            const diffX = mouseX - cursorX;
            const diffY = mouseY - cursorY;
            
            cursorX += diffX * 0.1;
            cursorY += diffY * 0.1;
            
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        
        animateCursor();
        
        // Add cursor interactions
        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            });
        });
    }

    setupTheme() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.setDarkMode(true);
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setDarkMode(e.matches);
            }
        });
    }

    toggleTheme() {
        const isDark = document.documentElement.hasAttribute('data-theme');
        this.setDarkMode(!isDark);
    }

    setDarkMode(isDark) {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('.theme-icon');
        
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    }

    handleNavClick(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        
        if (target && target.startsWith('#')) {
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Close mobile menu
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        }
    }

    handleFormSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Add loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
            submitBtn.style.background = 'var(--success-color)';
            
            // Reset form after delay
            setTimeout(() => {
                e.target.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
        
        console.log('Form submitted:', data);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update active section in navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroHeight = hero.offsetHeight;
            const scrollPercent = scrollY / heroHeight;
            
            if (scrollPercent <= 1) {
                hero.style.transform = `translateY(${scrollY * 0.5}px)`;
                hero.style.opacity = 1 - scrollPercent * 0.5;
            }
        }
        
        // 3D tilt effect for skill cards based on scroll
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
                const tiltX = (scrollProgress - 0.5) * 10;
                const tiltY = Math.sin(scrollY * 0.01 + index) * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }
        });
        
        // 3D tilt effect for certificate cards based on scroll
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
                const tiltX = Math.sin(scrollY * 0.005 + index) * 3;
                const tiltY = Math.cos(scrollY * 0.005 + index) * 3;
                
                if (!card.matches(':hover')) {
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                }
            }
        });
    }

    handleResize() {
        // Recalculate animations on resize
        this.setupParallax();
        
        // Update mobile menu state
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    }

    // Utility function for smooth scrolling to sections
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Initialize 3D hover effects
    init3DHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
        
        // Add 3D hover effects for certificate cards (only when not flipped)
        const certificateCards = document.querySelectorAll('.certificate-card');
        certificateCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const inner = card.querySelector('.certificate-card-inner');
                const isFlipped = inner.style.transform.includes('rotateY(180deg)');
                
                if (!isFlipped) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const inner = card.querySelector('.certificate-card-inner');
                const isFlipped = inner.style.transform.includes('rotateY(180deg)');
                
                if (!isFlipped) {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                }
            });
        });
    }

    // Add magnetic effect to buttons
    initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
}

// Global functions for button onclick handlers
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    
    // Add additional 3D effects
    portfolio.init3DHoverEffects();
    portfolio.initMagneticButtons();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Performance optimization: Add passive listeners where appropriate
    window.addEventListener('scroll', portfolio.handleScroll.bind(portfolio), { passive: true });
    window.addEventListener('resize', portfolio.handleResize.bind(portfolio), { passive: true });
});

// Add CSS for custom cursor and additional effects
const additionalStyles = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0.7;
    }
    
    .custom-cursor-dot {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    }
    
    .custom-cursor.cursor-hover {
        transform: scale(1.5);
        background: rgba(59, 130, 246, 0.1);
    }
    
    .custom-cursor-dot.cursor-hover {
        transform: scale(2);
    }
    
    @media (max-width: 1024px) {
        .custom-cursor,
        .custom-cursor-dot {
            display: none;
        }
    }
    
    body.loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    body {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;
    }
    
    .menu-open {
        overflow: hidden;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certImg");
  const closeBtn = document.querySelector(".cert-close");

  document.querySelectorAll(".cert-card img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
  // Optional: Dynamically load certificate data from an array
const certificates = [
  {
    title: "Frontend Development",
    issuer: "Coursera",
    date: "July 2024",
    url: "https://example.com/certificate1"
  },
  {
    title: "UI/UX Design Basics",
    issuer: "Google",
    date: "May 2023",
    url: "https://example.com/certificate2"
  }
];

const certList = document.querySelector('.cert-list');

certificates.forEach(cert => {
  const certDiv = document.createElement('div');
  certDiv.className = 'certificate';
  certDiv.innerHTML = `
    <h3>${cert.title}</h3>
    <p>Issued by ${cert.issuer} – ${cert.date}</p>
    <a href="${cert.url}" target="_blank">View Certificate</a>
  `;
  certList.appendChild(certDiv);
});

