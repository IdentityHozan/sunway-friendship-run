const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("show");
        menuToggle.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
    }

    link.addEventListener("click", () => {
        if (navMenu && menuToggle) {
            navMenu.classList.remove("show");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
});

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

const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");

modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
        const modalId = trigger.dataset.modal;
        const targetModal = document.getElementById(modalId);

        modalTriggers.forEach(item => item.classList.remove("is-selected"));
        trigger.classList.add("is-selected");

        if (targetModal) {
            targetModal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    });
});

modalCloseButtons.forEach(button => {
    button.addEventListener("click", closeAllModals);
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

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealItems.forEach(item => {
    revealObserver.observe(item);
});
