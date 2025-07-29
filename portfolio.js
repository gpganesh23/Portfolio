document.addEventListener('DOMContentLoaded', () => {
    // Get references to the mobile menu button and the mobile menu container
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Select all navigation links within the mobile menu
    const navLinks = document.querySelectorAll('.mobile-nav-link'); 

    // Add click event listener to the mobile menu button
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggles the 'is-open' class on the mobile menu.
            // This class in CSS controls its display property (none/flex).
            mobileMenu.classList.toggle('is-open'); 

            // Toggles the 'open' class for the hamburger icon animation (cross/lines).
            mobileMenuButton.classList.toggle('open');
        });
    }

   
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove the 'is-open' class to hide the mobile menu.
            mobileMenu.classList.remove('is-open'); 
            // Reset the hamburger icon back to its original (lines) state.
            mobileMenuButton.classList.remove('open');
        });
    });

    
    window.addEventListener('resize', () => {
        // Assuming 768px is the breakpoint where the desktop navigation appears.
        if (window.innerWidth >= 768) { 
            mobileMenu.classList.remove('is-open'); // Ensure the mobile menu is hidden.
            mobileMenuButton.classList.remove('open'); // Reset the hamburger icon state.
        }
    });

    
    emailjs.init({
        publicKey: "deoXyNx-dobsdrPO3", // <-- Replace with your actual EmailJS Public Key
    });

    // Your EmailJS contact form logic
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Ensure both the form and the status element exist before trying to add event listeners.
    if (contactForm && formStatus) { 
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default browser form submission behavior.

            formStatus.textContent = 'Sending...'; // Show a sending message.
            formStatus.className = ''; // Clear any previous success/error styles.

            const serviceID = 'service_qsctwst'; // <-- Replace with your actual EmailJS Service ID
            const templateID = 'template_qctin64'; // <-- Replace with your actual EmailJS Template ID

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'success'; // Add a success class for styling.
                    contactForm.reset(); // Clear all form fields after successful submission.
                }, (error) => {
                    console.error('FAILED to send message:', error); // Log the error for debugging.
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.className = 'error'; // Add an error class for styling.
                });
        });
    } else {
        // Log a warning if form elements are missing, helpful for debugging.
        console.warn("Contact form or status element not found. EmailJS submission will not be active.");
    }
});