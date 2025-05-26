document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const firstnameInput = document.getElementById('firstname');
    const birthdateInput = document.getElementById('birthdate');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const popup = document.getElementById('confirmationPopup');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    // Expressions régulières
    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9À-ÿ.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[67](?:\s*\d{2}){4}$/;

    // Fonction de validation
    function validateField(input, regex, errorMessage) {
        const errorElement = document.getElementById(`${input.id}-error`);
        const isValid = regex.test(input.value.trim());
        
        if (!isValid) {
            errorElement.textContent = errorMessage;
            input.setCustomValidity(errorMessage);
        } else {
            errorElement.textContent = '';
            input.setCustomValidity('');
        }
        
        return isValid;
    }

    // Validation du nom
    nameInput.addEventListener('input', function() {
        validateField(
            this,
            nameRegex,
            'Le nom doit contenir uniquement des lettres (accents acceptés), entre 2 et 50 caractères'
        );
    });

    // Validation du prénom
    firstnameInput.addEventListener('input', function() {
        validateField(
            this,
            nameRegex,
            'Le prénom doit contenir uniquement des lettres (accents acceptés), entre 2 et 50 caractères'
        );
    });

    // Validation de la date de naissance
    birthdateInput.addEventListener('input', function() {
        const errorElement = document.getElementById('birthdate-error');
        if (!this.value) {
            errorElement.textContent = 'La date de naissance est requise';
            this.setCustomValidity('La date de naissance est requise');
        } else {
            errorElement.textContent = '';
            this.setCustomValidity('');
        }
    });

    // Validation de l'email
    emailInput.addEventListener('input', function() {
        validateField(
            this,
            emailRegex,
            'Veuillez entrer une adresse email valide'
        );
    });

    // Validation du téléphone
    phoneInput.addEventListener('input', function() {
        validateField(
            this,
            phoneRegex,
            'Format accepté : 0601020304, 0701020304, +33601020304, +33701020304'
        );
    });

    // Validation du message
    messageInput.addEventListener('input', function() {
        const errorElement = document.getElementById('message-error');
        if (this.value.length < 30) {
            errorElement.textContent = 'Le message doit contenir au moins 30 caractères';
            this.setCustomValidity('Le message doit contenir au moins 30 caractères');
        } else {
            errorElement.textContent = '';
            this.setCustomValidity('');
        }
    });

    // Fonction pour vérifier si tous les champs sont valides
    function isFormValid() {
        return nameInput.validity.valid &&
               firstnameInput.validity.valid &&
               birthdateInput.validity.valid &&
               emailInput.validity.valid &&
               phoneInput.validity.valid &&
               messageInput.validity.valid;
    }

    // Mise à jour de l'état du bouton de soumission
    function updateSubmitButton() {
        const submitButton = form.querySelector('button[type="submit"]');
        if (isFormValid()) {
            submitButton.removeAttribute('disabled');
            submitButton.setAttribute('aria-disabled', 'false');
        } else {
            submitButton.setAttribute('disabled', 'disabled');
            submitButton.setAttribute('aria-disabled', 'true');
        }
    }

    // Écouter les changements sur tous les champs
    [nameInput, firstnameInput, birthdateInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', updateSubmitButton);
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (isFormValid()) {
            popup.hidden = false;
            popup.setAttribute('aria-hidden', 'false');
            confirmButton.focus();
        }
    });

    // Gestion de la confirmation
    confirmButton.addEventListener('click', function() {
        popup.hidden = true;
        popup.setAttribute('aria-hidden', 'true');
        
        // Simuler l'envoi du formulaire
        const formData = new FormData(form);
        
        // Simuler un délai d'envoi
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        // Simuler l'envoi (dans un cas réel, vous enverriez les données à un serveur)
        setTimeout(() => {
            // Simuler un succès (dans un cas réel, cela dépendrait de la réponse du serveur)
            const success = true;
            
            if (success) {
                showFeedback(true);
                form.reset();
            } else {
                showFeedback(false);
            }
            
            submitButton.disabled = false;
            submitButton.textContent = 'Envoyer';
            updateSubmitButton();
        }, 1500);
    });

    // Gestion de l'annulation
    cancelButton.addEventListener('click', function() {
        popup.hidden = true;
        popup.setAttribute('aria-hidden', 'true');
    });

    // Fonction pour afficher le feedback
    function showFeedback(success) {
        // Supprimer l'ancien feedback s'il existe
        const oldFeedback = document.querySelector('.feedback');
        if (oldFeedback) {
            oldFeedback.remove();
        }

        const feedbackDiv = document.createElement('div');
        feedbackDiv.setAttribute('role', 'alert');
        feedbackDiv.setAttribute('aria-live', 'polite');
        feedbackDiv.className = success ? 'feedback success' : 'feedback error';
        
        if (success) {
            feedbackDiv.innerHTML = `
                <h4>Message envoyé avec succès !</h4>
                <p>Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.</p>
                <p>Récapitulatif de votre message :</p>
                <ul>
                    <li><strong>Nom :</strong> ${nameInput.value}</li>
                    <li><strong>Prénom :</strong> ${firstnameInput.value}</li>
                    <li><strong>Email :</strong> ${emailInput.value}</li>
                    <li><strong>Téléphone :</strong> ${phoneInput.value}</li>
                </ul>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <h4>Erreur lors de l'envoi</h4>
                <p>Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.</p>
            `;
        }
        
        // Insérer le feedback avant le formulaire
        form.insertAdjacentElement('beforebegin', feedbackDiv);
        
        // Faire défiler jusqu'au feedback
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Ne plus supprimer automatiquement le feedback
        // Le message restera visible jusqu'à ce que l'utilisateur soumette un nouveau formulaire
    }
}); 