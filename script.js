/* =====================================
   PAVITHRA PORTFOLIO - TASK 3
   Interactive JavaScript Features
===================================== */

// 1. Initialize icons
function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

refreshIcons();


// 2. Typing animation
const typingText = document.getElementById("typingText");

const roles = [
    "Developer",
    "CSE Student",
    "AI Explorer",
    "Creative Thinker"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 50 : 100;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1500;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// 3. Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.innerHTML = isOpen
            ? '<i data-lucide="x"></i>'
            : '<i data-lucide="menu"></i>';

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        refreshIcons();
    });

    // Close menu when a navigation link is clicked
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");

            menuToggle.innerHTML = '<i data-lucide="menu"></i>';
            menuToggle.setAttribute("aria-label", "Open navigation");

            refreshIcons();
        });
    });
}


// 4. Dark and light theme toggle
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.innerHTML = isLight
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    refreshIcons();
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");

        const newTheme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("portfolioTheme", newTheme);

        updateThemeIcon();
    });
}


// 5. Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// 6. Navigation active section highlight
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {
    let currentSection = "home";

    sections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= 150) {
            currentSection = section.id;
        }
    });

    navItems.forEach(function (link) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);


// 7. Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// 8. Dynamic footer year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 9. Button ripple effect
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
        const ripple = document.createElement("span");

        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.appendChild(ripple);

        setTimeout(function () {
            ripple.remove();
        }, 600);
    });
});


// 10. Cursor bubble effect for desktop
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("click", function (event) {
        const bubble = document.createElement("span");

        bubble.className = "cursor-bubble";

        bubble.style.left = event.clientX + "px";
        bubble.style.top = event.clientY + "px";

        document.body.appendChild(bubble);

        setTimeout(function () {
            bubble.remove();
        }, 700);
    });
}


// 11. Final icon refresh
refreshIcons();

console.log("Pavithra Portfolio loaded successfully!");