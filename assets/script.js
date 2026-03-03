// ===============================
// PunJRoBoTech Main Script
// ===============================

// Auto update footer year
document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `© ${year} PunJRoBoTech | punjrobotech.com`;
    }
});

// Smooth scrolling (future internal links support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Floating WhatsApp Button
const whatsappBtn = document.createElement("a");
whatsappBtn.href = "https://wa.me/917526960761";
whatsappBtn.target = "_blank";
whatsappBtn.innerText = "Chat";
whatsappBtn.classList.add("floating-wa");

document.body.appendChild(whatsappBtn);
