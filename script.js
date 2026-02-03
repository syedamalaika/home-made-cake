document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle (simplified for now as nav links are hidden on mobile)
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Substract header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for Fade-In Effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .gallery-item, .reason').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Custom animation implementation via class
    // WhatsApp Order Form Submission
    const orderForm = document.getElementById('cake-order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const cakeType = document.getElementById('cake-type').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;

            const whatsappNumber = '8801306166998';
            const text = `*New Order from Website*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Cake Category:* ${cakeType}%0A` +
                `*Delivery Date:* ${date}%0A` +
                `*Details:* ${message}`;

            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }

    // Gallery Item Click Logic
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const orderSection = document.querySelector('#order');
            if (orderSection) {
                // Determine category from parent section title if possible
                const section = item.closest('.collection-group, .gallery');
                const title = section ? section.querySelector('.group-title, .section-title') : null;
                const categorySelect = document.getElementById('cake-type');

                if (categorySelect && title) {
                    const titleText = title.textContent.toLowerCase();
                    if (titleText.includes('birthday')) categorySelect.value = 'birthday';
                    else if (titleText.includes('wedding')) categorySelect.value = 'wedding';
                    else if (titleText.includes('cupcake')) categorySelect.value = 'cupcake';
                    else categorySelect.value = 'custom';
                }

                orderSection.scrollIntoView({ behavior: 'smooth' });

                // Add a small highlight effect to the form
                const orderContainer = document.querySelector('.order-container');
                orderContainer.style.borderColor = '#D48498';
                setTimeout(() => {
                    orderContainer.style.borderColor = 'rgba(255, 209, 220, 0.5)';
                }, 2000);
            } else {
                // If on collection page, go back to home order
                window.location.href = 'index.html#order';
            }
        });
    });
});
