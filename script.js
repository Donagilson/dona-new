// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCourseFiltering();
    initFormValidation();
    initFAQ();
    initAnimations();
    initCourseData();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Course Data
const coursesData = [
    {
        id: 1,
        title: "Data Science and Gen AI + Python Full Stack",
        description: "Master data science, machine learning, and full-stack Python development with cutting-edge AI technologies.",
        duration: "8 months",
        level: "Intermediate to Advanced",
        category: "data",
        durationType: "long",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        title: "DevOps and Cloud Engineering + Python Full Stack",
        description: "Learn DevOps practices, cloud technologies, and full-stack Python development for modern software delivery.",
        duration: "7 months",
        level: "Intermediate to Advanced",
        category: "programming",
        durationType: "long",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        title: "Full Stack Developer .NET with Angular",
        description: "Master .NET development with Angular frontend for building enterprise-grade web applications.",
        duration: "6 months",
        level: "Intermediate to Advanced",
        category: "programming",
        durationType: "long",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        title: "Full Stack Developer Python with MERN",
        description: "Learn Python backend development with MERN stack (MongoDB, Express.js, React.js, Node.js) for modern web applications.",
        duration: "7 months",
        level: "Intermediate to Advanced",
        category: "programming",
        durationType: "long",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
];

// Initialize Course Data
function initCourseData() {
    const coursesGrid = document.getElementById('courses-grid');
    if (coursesGrid) {
        displayCourses(coursesData);
    }
}

// Display Courses
function displayCourses(courses) {
    const coursesGrid = document.getElementById('courses-grid');
    if (!coursesGrid) return;

    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Create Course Card
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span><i class="fas fa-clock"></i> ${course.duration}</span>
                <span><i class="fas fa-users"></i> ${course.level}</span>
            </div>
            <div class="course-actions">
                <a href="course-detail.html?id=${course.id}" class="btn btn-primary">Learn More</a>
                <a href="register.html?course=${course.id}" class="btn btn-secondary">Apply Now</a>
            </div>
        </div>
    `;
    return card;
}

// Course Filtering
function initCourseFiltering() {
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    const searchFilter = document.getElementById('search-filter');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCourses);
    }
    if (durationFilter) {
        durationFilter.addEventListener('change', filterCourses);
    }
    if (searchFilter) {
        searchFilter.addEventListener('input', filterCourses);
    }
}

// Filter Courses
function filterCourses() {
    const categoryFilter = document.getElementById('category-filter');
    const durationFilter = document.getElementById('duration-filter');
    const searchFilter = document.getElementById('search-filter');

    let filteredCourses = coursesData;

    // Category filter
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.category === categoryFilter.value);
    }

    // Duration filter
    if (durationFilter && durationFilter.value !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.durationType === durationFilter.value);
    }

    // Search filter
    if (searchFilter && searchFilter.value.trim() !== '') {
        const searchTerm = searchFilter.value.toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
    }

    displayCourses(filteredCourses);
}

// Form Validation
function initFormValidation() {
    const registrationForm = document.getElementById('registration-form');
    const contactForm = document.getElementById('contact-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
        setupFormValidation(registrationForm);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        setupFormValidation(contactForm);
    }
}

// Setup Form Validation
function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

// Validate Field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today) {
            isValid = false;
            errorMessage = 'Date of birth cannot be in the future.';
        }
    }

    // Display error or clear it
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#dc2626';
        } else {
            errorElement.textContent = '';
            field.style.borderColor = '#d1d5db';
        }
    }

    return isValid;
}

// Clear Field Error
function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '#d1d5db';
    }
}

// Handle Registration Submit
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showMessage('Please correct the errors in the form.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showMessage('Registration submitted successfully! We will contact you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle Contact Submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field && !validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Show Message
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;

    // Insert message at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
    }

    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .course-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add scroll-triggered animations for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 100);
    }

    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        setTimeout(() => {
            heroImage.style.transition = 'all 1s ease-out 0.3s';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 100);
    }

    // Add staggered animations for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Add hover animations for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Course Detail Page Functionality
function initCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (courseId) {
        const course = coursesData.find(c => c.id == courseId);
        if (course) {
            updateCourseDetail(course);
        }
    }
}

// Update Course Detail
function updateCourseDetail(course) {
    const titleElement = document.getElementById('course-title');
    const durationElement = document.getElementById('course-duration');
    const levelElement = document.getElementById('course-level');
    const sidebarDuration = document.getElementById('sidebar-duration');
    const sidebarLevel = document.getElementById('sidebar-level');

    if (titleElement) titleElement.textContent = course.title;
    if (durationElement) durationElement.textContent = course.duration;
    if (levelElement) levelElement.textContent = course.level;
    if (sidebarDuration) sidebarDuration.textContent = course.duration;
    if (sidebarLevel) sidebarLevel.textContent = course.level;
}

// Registration Page Course Selection
function initRegistrationCourseSelection() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    
    if (courseId) {
        const courseSelect = document.getElementById('course');
        if (courseSelect) {
            const course = coursesData.find(c => c.id == courseId);
            if (course) {
                courseSelect.value = course.title.toLowerCase().replace(/\s+/g, '-');
            }
        }
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Course detail page
    if (window.location.pathname.includes('course-detail.html')) {
        initCourseDetail();
    }
    
    // Registration page
    if (window.location.pathname.includes('register.html')) {
        initRegistrationCourseSelection();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && !e.target.disabled) {
        const originalText = e.target.textContent;
        e.target.innerHTML = '<span class="spinner"></span> Loading...';
        e.target.disabled = true;
        
        // Reset button after a delay (for demo purposes)
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.disabled = false;
        }, 2000);
    }
});

// Mobile menu close on outside click
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.hamburger')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Form auto-save functionality
function setupFormAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                localStorage.setItem(`form_${form.id}`, JSON.stringify(data));
            });
        });
        
        // Restore form data on page load
        const savedData = localStorage.getItem(`form_${form.id}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && data[key]) {
                    input.value = data[key];
                }
            });
        }
    });
}

// Initialize form auto-save
document.addEventListener('DOMContentLoaded', setupFormAutoSave); 