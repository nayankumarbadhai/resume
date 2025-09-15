// Portfolio Website JavaScript

// Application data
const portfolioData = {
  "developer": {
    "name": "Alex Johnson",
    "title": "Full Stack Developer",
    "tagline": "Building modern web applications with cutting-edge technologies",
    "bio": "Passionate full stack developer with 5+ years of experience creating robust, scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    "location": "San Francisco, CA",
    "availability": "Open to new opportunities"
  },
  "skills": {
    "frontend": [
      {"name": "HTML5", "level": 95},
      {"name": "CSS3", "level": 90},
      {"name": "JavaScript", "level": 92},
      {"name": "React", "level": 88},
      {"name": "Vue.js", "level": 82},
      {"name": "TypeScript", "level": 85}
    ],
    "backend": [
      {"name": "Node.js", "level": 90},
      {"name": "Python", "level": 85},
      {"name": "Java", "level": 78},
      {"name": "PHP", "level": 75},
      {"name": "Express.js", "level": 88}
    ],
    "database": [
      {"name": "MongoDB", "level": 85},
      {"name": "MySQL", "level": 82},
      {"name": "PostgreSQL", "level": 80},
      {"name": "Firebase", "level": 88}
    ],
    "tools": [
      {"name": "Git", "level": 92},
      {"name": "Docker", "level": 78},
      {"name": "AWS", "level": 82},
      {"name": "Webpack", "level": 85},
      {"name": "VS Code", "level": 95}
    ]
  },
  "projects": [
    {
      "id": 1,
      "title": "E-Commerce Platform",
      "description": "Full-featured e-commerce platform with user authentication, payment processing, and admin dashboard",
      "image": "https://via.placeholder.com/400x250/6366f1/ffffff?text=E-Commerce+Platform",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "liveDemo": "#",
      "github": "#",
      "category": "fullstack"
    },
    {
      "id": 2,
      "title": "Task Management App",
      "description": "Collaborative task management application with real-time updates and team collaboration features",
      "image": "https://via.placeholder.com/400x250/10b981/ffffff?text=Task+Manager",
      "technologies": ["Vue.js", "Express.js", "Socket.io", "PostgreSQL"],
      "liveDemo": "#",
      "github": "#",
      "category": "frontend"
    },
    {
      "id": 3,
      "title": "Weather Dashboard",
      "description": "Interactive weather dashboard with location-based forecasts and data visualization",
      "image": "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Weather+Dashboard",
      "technologies": ["React", "Chart.js", "Weather API", "Tailwind"],
      "liveDemo": "#",
      "github": "#",
      "category": "frontend"
    },
    {
      "id": 4,
      "title": "API Gateway Service",
      "description": "Microservices API gateway with authentication, rate limiting, and monitoring",
      "image": "https://via.placeholder.com/400x250/ef4444/ffffff?text=API+Gateway",
      "technologies": ["Node.js", "Redis", "Docker", "JWT"],
      "liveDemo": "#",
      "github": "#",
      "category": "backend"
    },
    {
      "id": 5,
      "title": "Social Media Dashboard",
      "description": "Analytics dashboard for social media management with multi-platform integration",
      "image": "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Social+Dashboard",
      "technologies": ["React", "Python", "MongoDB", "Chart.js"],
      "liveDemo": "#",
      "github": "#",
      "category": "fullstack"
    },
    {
      "id": 6,
      "title": "Blog CMS",
      "description": "Content management system for blogs with rich text editing and SEO optimization",
      "image": "https://via.placeholder.com/400x250/06b6d4/ffffff?text=Blog+CMS",
      "technologies": ["Next.js", "TypeScript", "Prisma", "MySQL"],
      "liveDemo": "#",
      "github": "#",
      "category": "fullstack"
    }
  ]
};

// Global variables
let currentTheme = 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTheme();
    initializeNavigation();
    populateSkills();
    populateProjects();
    initializeContactForm();
    initializeScrollEffects();
    initializeScrollAnimations();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    currentTheme = savedTheme;
    applyTheme(savedTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    updateThemeIcon(theme);
    currentTheme = theme;
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('.theme-toggle__icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
            }
        });
    });

    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Update active link on scroll
    window.addEventListener('scroll', debounce(updateActiveLink, 10));
}

function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                updateActiveLink();
            }
        });
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollY = window.pageYOffset + 100;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active-link');
        }
    });
}

// Skills Population
function populateSkills() {
    const skillCategories = ['frontend', 'backend', 'database', 'tools'];
    
    skillCategories.forEach(category => {
        const container = document.getElementById(`${category}-skills`);
        if (container && portfolioData.skills[category]) {
            container.innerHTML = '';
            
            portfolioData.skills[category].forEach(skill => {
                const skillElement = createSkillElement(skill);
                container.appendChild(skillElement);
            });
        }
    });
    
    // Animate skill bars when they come into view
    setTimeout(animateSkillBars, 500);
}

function createSkillElement(skill) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill fade-in';
    
    skillDiv.innerHTML = `
        <div class="skill__header">
            <span class="skill__name">${skill.name}</span>
            <span class="skill__percentage">${skill.level}%</span>
        </div>
        <div class="skill__bar">
            <div class="skill__progress" data-width="${skill.level}"></div>
        </div>
    `;
    
    return skillDiv;
}

function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill__progress');
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Projects Population and Filtering
function populateProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    // Clear container first
    projectsContainer.innerHTML = '';
    
    // Add projects immediately
    portfolioData.projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
    
    // Initialize filters
    initializeProjectFilters();
}

function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = `project fade-in ${project.category}`;
    projectDiv.style.opacity = '1';
    projectDiv.style.transform = 'translateY(0)';
    
    projectDiv.innerHTML = `
        <div class="project__image">
            <img src="${project.image}" alt="${project.title}" class="project__img" loading="lazy">
            <div class="project__overlay">
                <a href="${project.liveDemo}" class="project__link" target="_blank" rel="noopener">Live Demo</a>
                <a href="${project.github}" class="project__link" target="_blank" rel="noopener">GitHub</a>
            </div>
        </div>
        <div class="project__content">
            <h3 class="project__title">${project.title}</h3>
            <p class="project__description">${project.description}</p>
            <div class="project__technologies">
                ${project.technologies.map(tech => `<span class="project__tech">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    return projectDiv;
}

function initializeProjectFilters() {
    const projectFilters = document.querySelectorAll('.projects__filter');
    
    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            projectFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        const shouldShow = filter === 'all' || project.classList.contains(filter);
        
        if (shouldShow) {
            project.style.display = 'block';
            // Trigger reflow
            project.offsetHeight;
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (project.style.opacity === '0') {
                    project.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formFields = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate all fields
    let isValid = true;
    Object.keys(formFields).forEach(field => {
        const input = document.getElementById(field);
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        showFormSuccess();
        form.reset();
        // Clear any success/error classes
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.classList.remove('success', 'error');
        });
    }
}

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
    } else {
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }
    }
    
    showFieldError(input, errorMessage, isValid);
    return isValid;
}

function showFieldError(input, message, isValid) {
    const errorElement = document.getElementById(`${input.name}-error`);
    
    if (isValid) {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    } else {
        input.classList.remove('success');
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
}

function clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function showFormSuccess() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Remove any existing success message
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div style="background: var(--color-success); color: var(--color-btn-primary-text); padding: 1rem; border-radius: var(--radius-base); margin-bottom: 1rem; text-align: center; animation: fadeInUp 0.5s ease;">
            ✅ Message sent successfully! I'll get back to you soon.
        </div>
    `;
    
    contactForm.parentNode.insertBefore(successMessage, contactForm);
    
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        // Header scroll effect
        if (header) {
            if (scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
        
        // Scroll to top button
        if (scrollTopBtn) {
            if (scrollY >= 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });

    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
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

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    const navMenu = document.getElementById('nav-menu');
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Handle page load
window.addEventListener('load', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
    
    // Ensure projects are visible
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && projectsContainer.children.length === 0) {
        populateProjects();
    }
});