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
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            object: document.getElementById('object').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_e950c5w', 'template_z7vy82d', templateParams)
            .then(function() {
                new bootstrap.Modal(document.getElementById('successModal')).show();
                form.reset();
            })
            .catch(function() {
                new bootstrap.Modal(document.getElementById('errorModal')).show();
            });
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



//JavaScript per il Banner Cookie

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se il cookie è già stato accettato
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!cookieAccepted) {
        // Mostra il banner dopo un breve ritardo
        setTimeout(function() {
            document.getElementById('cookieBanner').style.display = 'block';
        }, 1000);
    }
    
    // Gestione del click sul pulsante di accettazione
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', 'true');
        document.getElementById('cookieBanner').style.display = 'none';
    });
});