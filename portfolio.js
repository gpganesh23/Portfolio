document.addEventListener('DOMContentLoaded', () => {
    // Get references to the mobile menu button and the mobile menu container
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Add click event listener to the mobile menu button
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle the 'hidden-mobile' class on the mobile menu.
            // This class controls its display property (none/flex) in CSS.
            mobileMenu.classList.toggle('hidden-mobile');

            mobileMenuButton.classList.toggle('open');
        });
    }

    // Initialize EmailJS with your Public Key
    // This part should directly be inside the outer DOMContentLoaded
    emailjs.init({
        publicKey: "deoXyNx-dobsdrPO3",
    });

    // Your EmailJS contact form logic - also directly inside the outer DOMContentLoaded
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) { // Add a check to ensure form elements exist
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            formStatus.textContent = 'Sending...';
            formStatus.className = ''; // Clear previous status styles

            const serviceID = 'service_qsctwst';
            const templateID = 'template_qctin64';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'success';
                    contactForm.reset(); // Clear the form
                }, (error) => {
                    console.error('FAILED to send message:', error);
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.className = 'error';
                });
        });
    } else {
        console.warn("Contact form or status element not found. EmailJS submission will not be active.");
    }


    // Close mobile menu when a link inside it is clicked (important for single-page apps)
    if (mobileMenu) {
        // Select all anchor links within the mobile menu
        mobileMenu.querySelectorAll('a').forEach(link => {
            // Add a click event listener to each link
            link.addEventListener('click', () => {
                // When a link is clicked, hide the mobile menu
                mobileMenu.classList.add('hidden-mobile');
                // And reset the hamburger icon back to its original state
                mobileMenuButton.classList.remove('open');
            });
        });
    }
});