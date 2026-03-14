//Button back to top
document.addEventListener("DOMContentLoaded", () => {
    const about = document.getElementById("about");
    const backToTop = document.getElementById("back-to-top");

    if (about && backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY >= about.offsetTop) {
                backToTop.classList.add("is-visible");
            } else {
                backToTop.classList.remove("is-visible");
            }
        };

        window.addEventListener("scroll", toggleBackToTop, { passive: true });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        toggleBackToTop();
    }


    //Scroll animation
    const revealGroups = [
        ".presentation_container > *",
        "section > *",
        ".projects-list > *",
    ];

    const assignRevealGroup = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            if (element.dataset.revealAssigned === "true") {
                return;
            }
            if (element.closest("header")) {
                return;
            }
            element.classList.add("scroll-reveal");
            element.style.setProperty("--reveal-delay", `${index * 120}ms`);
            element.dataset.revealAssigned = "true";
        });
    };

    revealGroups.forEach(assignRevealGroup);

    const revealElements = document.querySelectorAll(".scroll-reveal");
    if (revealElements.length === 0) {
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
});



