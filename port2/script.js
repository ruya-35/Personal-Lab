// Toggle Mobile Menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when clicking a nav link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Fetch and Render Data from data.json
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load portfolio data.');
        }
        const data = await response.json();


        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = data.services.map(service => `
            <div class="service-box">
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            </div>
        `).join('');

        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = data.projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" class="btn btn-outline" target="_blank">Review Project</a>
            </div>
        `).join('');
    }catch (error) {
        console.error('Error loading portfolio data:', error);
    }
});


const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        if (!name) {
            alert('Please enter your full name.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const PHONE_Regx = /^(?:\+251|0)9\d{8}$/;
        if (!phone || !PHONE_Regx.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        if (!message) {
            alert('Please type your message.');
            return;
        }

        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
    });
}