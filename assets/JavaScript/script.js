const confirmer = document.getElementById("confirm");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const email = document.getElementById("mail");
const destination = document.getElementById("destination");
const activites = document.getElementById("activites");
const depart = document.getElementById("depart");
const retour = document.getElementById("retour");
const budget = document.getElementById("budgettext");
const prixSpan = document.getElementById("prix");

// Fonction pour vérifier un email valide
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Fonction pour vérifier une date valide
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return (
        date instanceof Date &&
        !isNaN(date) &&
        dateString === date.toISOString().split("T")[0]
    );
};

// Fonction pour ajouter/supprimer une classe d'erreur et afficher un message d'erreur
const setError = (element, hasError, message = "") => {
    const errorContainer = element.nextElementSibling;
    if (hasError) {
        element.classList.add("input-error");
        if (errorContainer) {
            errorContainer.innerHTML = message;
        }
    } else {
        element.classList.remove("input-error");
        if (errorContainer) {
            errorContainer.innerHTML = "";
        }
    }
};

// Fonction pour générer un prix aléatoire
const generateRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Ajout de l'écouteur d'événement
confirmer.addEventListener("click", (e) => {
    // Initialisation
    let hasErrors = false;

    // Vérification des champs obligatoires
    const inputs = [
        { element: nom, message: "Le champ nom est obligatoire." },
        { element: prenom, message: "Le champ prénom est obligatoire." },
        { element: email, message: "Le champ email est obligatoire." },
        { element: destination, message: "Le champ destination est obligatoire." },
        { element: activites, message: "Le champ activités est obligatoire." },
        { element: budget, message: "Le champ budget est obligatoire." }
    ];

    inputs.forEach(({ element, message }) => {
        const isInvalid = element.value.trim() === "";
        setError(element, isInvalid, isInvalid ? message : "");
        if (isInvalid) {
            hasErrors = true;
        }
    });

    // Vérification de l'email
    if (!isValidEmail(email.value)) {
        setError(email, true, "Veuillez entrer une adresse email valide.");
        hasErrors = true;
    } else {
        setError(email, false);
    }

    // Vérification des activités
    if (isNaN(parseInt(activites.value, 10)) || parseInt(activites.value, 10) < 1) {
        setError(activites, true, "Le nombre d'activités doit être un nombre positif.");
        hasErrors = true;
    } else {
        setError(activites, false);
    }

    // Vérification des dates
    if (!isValidDate(depart.value)) {
        setError(depart, true, "La date de départ est invalide.");
        hasErrors = true;
    } else {
        setError(depart, false);
    }

    if (!isValidDate(retour.value) || retour.value < depart.value) {
        setError(retour, true, "La date de retour est invalide ou antérieure à la date de départ.");
        hasErrors = true;
    } else {
        setError(retour, false);
    }

    // Vérification du budget
    if (isNaN(parseFloat(budget.value)) || parseFloat(budget.value) <= 0) {
        setError(budget, true, "Le budget doit être un nombre positif.");
        hasErrors = true;
    } else {
        setError(budget, false);
    }

    // Gestion des erreurs
    if (hasErrors) {
        return; // Arrête l'exécution si des erreurs sont détectées
    }

    // Génération et affichage du prix aléatoire
    const randomPrice = generateRandomPrice(500, 10000);
    const userBudget = parseFloat(budget.value);

    if (userBudget >= randomPrice) {
        prixSpan.innerHTML = `Prix estimé : ${randomPrice} €`;
    } else {
        prixSpan.innerHTML = "Votre budget ne suffit pas.";
    }

});
