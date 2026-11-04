const loader = document.getElementById("loader");
const nav = document.getElementById("mainNav");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navbarMenu");
const typedText = document.getElementById("typedText");

window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 450);
});

window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    updateActiveNav();
});

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const roles = [
    "Java Developer",
    "Full-Stack Developer",
    "Generative AI Enthusiast",
    "Software Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
        typedText.textContent = current.slice(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeRole, 1500);
            return;
        }
    } else {
        typedText.textContent = current.slice(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
        }
    }

    setTimeout(typeRole, deleting ? 45 : 85);
}
typeRole();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function updateActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    let current = "home";

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) current = section.id;
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

document.querySelectorAll(".skill-filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".skill-filter").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        document.querySelectorAll(".skill-card").forEach(card => {
            const show = filter === "all" || card.dataset.category === filter;

            if (show) {
                card.classList.remove("hidden");
                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "";
                });
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reduceMotion.matches) {
    document.querySelectorAll(".hero, .section").forEach(section => {
        section.addEventListener("mousemove", (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;

            const codes = section.querySelectorAll(".floating-code");
            codes.forEach((code, index) => {
                const strength = (index + 1) * 4;
                code.style.transform = `translate(${x * strength}px, ${y * strength}px) rotate(${index === 0 ? -12 : 8}deg)`;
            });
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});
