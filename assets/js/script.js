// Codice Carosello Skills
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');

function duplicateItems() {
    carouselItems.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
}

function adjustCarouselWidth() {
    if (!carousel || !carouselItems) return;
    let totalWidth = 0;
    carousel.querySelectorAll('.carousel-item').forEach(item => {
        totalWidth += item.offsetWidth + 40;
    });
    carousel.style.width = totalWidth + 'px';
}

window.addEventListener('load', () => {
    duplicateItems();
    adjustCarouselWidth();
});
window.addEventListener('resize', adjustCarouselWidth);



// Codice EmailJS
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const templateParams = {
        name: document.getElementById('name').value,
        object: document.getElementById('object').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_e950c5w', 'template_z7vy82d', templateParams)
        .then(() => {
            new bootstrap.Modal(document.getElementById('successModal')).show();
        })
        .catch(() => {
            new bootstrap.Modal(document.getElementById('errorModal')).show();
        });
});



// Gestione immagini
document.addEventListener('DOMContentLoaded', () => {
    const myModal = new bootstrap.Modal(document.getElementById('imageModal'), {
        keyboard: true
    });
    
    const images = document.querySelectorAll('.process-image img');
    const modalImg = document.getElementById('modalImage');
    const imageModal = document.getElementById('imageModal');

    images.forEach(img => {
        img.onclick = function() {
            modalImg.src = this.src;
            const modal = new bootstrap.Modal(imageModal);
            modal.show();
        }
    });
});