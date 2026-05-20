// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        menuToggle.classList.toggle("active");
    });
}

// Active nav link
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
    }
});

// Detail tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabPanels.forEach(panel => panel.classList.remove("active"));

        button.classList.add("active");

        const selectedPanel = document.getElementById(target);

        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }
    });
});

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");

            const otherAnswer = otherItem.querySelector(".faq-answer");

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }
        });

        if (!isOpen) {
            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// Modal system for information tiles
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");

modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
        const modalId = trigger.dataset.modal;
        const targetModal = document.getElementById(modalId);

        modalTriggers.forEach(item => item.classList.remove("active"));
        trigger.classList.add("active");

        if (targetModal) {
            targetModal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener("click", () => {
        closeAllModals();
    });
});

modals.forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeAllModals();
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeAllModals();
    }
});

function closeAllModals() {
    modals.forEach(modal => modal.classList.remove("show"));
    document.body.style.overflow = "";
}

// Toast
function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Waitlist form
const waitlistForm = document.getElementById("waitlistForm");

if (waitlistForm) {
    waitlistForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(waitlistForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const programme = formData.get("programme");
        const type = formData.get("type");

        if (!name || !email || !programme || !type) {
            showToast("Please complete the required fields.");
            return;
        }

        waitlistForm.reset();
        showToast("You have joined the VIP waitlist.");
    });
}

// Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const type = formData.get("type");
        const message = formData.get("message");

        if (!name || !email || !type || !message) {
            showToast("Please complete the required fields.");
            return;
        }

        contactForm.reset();
        showToast("Your message has been sent.");
    });
}