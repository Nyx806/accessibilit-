/**
 * Gestion de la popup de confirmation pour le formulaire de contact
 */
document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const form = document.getElementById('contactForm');
    const popup = document.getElementById('confirmationPopup');
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    // Fonction pour afficher la popup
    function showPopup() {
        popup.hidden = false;
        popup.setAttribute('aria-hidden', 'false');
        confirmButton.focus();
    }

    // Fonction pour cacher la popup
    function hidePopup() {
        popup.hidden = true;
        popup.setAttribute('aria-hidden', 'true');
    }

    // Gestionnaire de soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        showPopup();
    });

    // Gestionnaire pour le bouton de confirmation
    confirmButton.addEventListener('click', function() {
        hidePopup();
        form.submit();
    });

    // Gestionnaire pour le bouton d'annulation
    cancelButton.addEventListener('click', hidePopup);

    // Gestionnaire pour la touche Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !popup.hidden) {
            hidePopup();
        }
    });

    // Gestionnaire pour la touche Entrée dans la popup
    popup.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (document.activeElement === confirmButton) {
                confirmButton.click();
            } else if (document.activeElement === cancelButton) {
                cancelButton.click();
            }
        }
    });
}); 