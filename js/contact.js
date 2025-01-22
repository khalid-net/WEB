function sendEmail(event) {
    event.preventDefault();

    const form = event.target;
    const successMessage = document.getElementById('success-message');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable the submit button and show loading state
    submitButton.disabled = true;
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

    // Prepare the email parameters
    const templateParams = {
        to_email: 'khalidhasabalrsoul@gmail.com',
        from_name: form.name.value,
        from_email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Send the email using EmailJS
    emailjs.send('service_6u8gf68', 'template_n595t6j', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
            successMessage.style.display = 'block';
            successMessage.style.color = 'green';
            successMessage.textContent = 'Message sent successfully!';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            successMessage.style.display = 'block';
            successMessage.style.color = 'red';
            successMessage.textContent = 'Failed to send message. Please try again.';
        })
        .finally(function() {
            // Re-enable the submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });

    return false;
}
