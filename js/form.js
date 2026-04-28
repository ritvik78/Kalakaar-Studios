/**
 * FORM.JS – Wizard and Form Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Booking Wizard Logic
    const wizardForm = document.getElementById('bookingWizard');
    if (wizardForm) {
        const stepsContainer = document.getElementById('wizardStepsContainer');
        const progress = document.getElementById('wizardProgress');
        const prevBtn = document.getElementById('wizardPrev');
        const nextBtn = document.getElementById('wizardNext');
        const submitBtn = document.getElementById('wizardSubmit');
        const formSuccess = document.getElementById('formSuccess');
        
        let currentStep = 0;
        const totalSteps = 7;

        const updateWizard = () => {
            // Move container
            stepsContainer.style.transform = `translateX(-${currentStep * 100}%)`;
            
            // Update progress
            const progressPercent = ((currentStep + 1) / totalSteps) * 100;
            progress.style.width = `${progressPercent}%`;

            // Update buttons
            prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
            
            if (currentStep === totalSteps - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        };

        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                // Here we would add validation for each step
                currentStep++;
                updateWizard();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateWizard();
            }
        });

        // Handle Selection styling for cards
        const setupCards = (selector, type) => {
            const cards = document.querySelectorAll(selector);
            cards.forEach(card => {
                const input = card.querySelector('input');
                
                // Set initial state
                if(input.checked) card.classList.add('selected');

                input.addEventListener('change', () => {
                    if (type === 'radio') {
                        cards.forEach(c => c.classList.remove('selected'));
                        card.classList.add('selected');
                    } else if (type === 'checkbox') {
                        if (input.checked) {
                            card.classList.add('selected');
                        } else {
                            card.classList.remove('selected');
                        }
                    }
                });
            });
        };

        setupCards('.wizard-radio-card', 'radio');
        setupCards('.wizard-checkbox-card', 'checkbox');

        // Form Submission
        wizardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            wizardForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
        });
    }

    // Contact Form Logic (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully! Our team will get back to you shortly.');
            contactForm.reset();
        });
    }
});
