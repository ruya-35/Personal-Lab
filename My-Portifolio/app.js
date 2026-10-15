document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load data.json");
            }
            return response.json();
        })
        .then(data => {
            populatePortfolio(data);
        })
        .catch(error => {
            console.error("Error loading portfolio data:", error);
        });

    setupContactForm();
});

function populatePortfolio(data) {
    const navMenu = document.getElementById("nav-menu");
    if (navMenu && data.navLinks) {
        navMenu.innerHTML = data.navLinks
            .map(link => `<a href="${link.href}">${link.name}</a>`)
            .join("");
    }

    const heroTitle = document.getElementById("hero-title");
    const heroDesc = document.getElementById("hero-desc");
    if (heroTitle && data.profile) {
        heroTitle.innerHTML = `Creative <span>Frontend Developer</span>`;
    }
    if (heroDesc && data.profile) {
        heroDesc.textContent = data.profile.tagline;
    }

    const aboutText = document.getElementById("about-text");
    if (aboutText && data.profile) {
        aboutText.textContent = data.profile.about;
    }

    const skillsGrid = document.getElementById("skills-grid");
    if (skillsGrid && data.skills) {
        skillsGrid.innerHTML = data.skills
            .map(skill => `
                <div class="card skill-card">
                    <h3>${skill.name}</h3>
                    <span class="skill-level">${skill.level}</span>
                </div>
            `)
            .join("");
    }

    const servicesGrid = document.getElementById("services-grid");
    if (servicesGrid && data.services) {
        servicesGrid.innerHTML = data.services
            .map(service => `
                <div class="card service-card">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `)
            .join("");
    }

    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid && data.projects) {
        projectsGrid.innerHTML = data.projects
            .map(project => `
                <div class="card project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="project-link" target="_blank">View Project &rarr;</a>
                </div>
            `)
            .join("");
    }
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contact-name").value;
            alert(`Thank you for your message, ${name}! I will get back to you soon.`);
            form.reset();
        });
    }
}