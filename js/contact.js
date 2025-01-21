function sendEmail(event) {
    event.preventDefault();

    const form = event.target;
    const successMessage = document.getElementById('success-message');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Disable the submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Prepare the email parameters
    const templateParams = {
        to_email: 'khalidhasabalrsoul@gmail.com',
        from_name: form.name.value,
        from_email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Send the email using EmailJS
    emailjs.send('service_gmail', 'template_contact', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            form.reset();
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });

    return false;
}
