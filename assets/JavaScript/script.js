// Récupération de l'élément bouton "confirmer"
const confirmer = document.getElementById("confirm");

// Récupération des champs de saisie des dates
const jour_depart = document.getElementById("jourD");
const mois_depart = document.getElementById("moisD");
const annee_depart = document.getElementById("anneeD");
const jour_retour = document.getElementById("jourR");
const mois_retour = document.getElementById("moisR");
const annee_retour = document.getElementById("anneeR");

// Fonction pour vérifier si une date est valide
const isValidDate = (day, month, year) => {
    if (day < 1 || month < 1 || month > 12 || year < 0) {
        return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate(); // Nombre de jours dans le mois
    return day <= daysInMonth;
};

// Fonction pour ajouter/supprimer une classe d'erreur
const setError = (element, hasError) => {
    if (hasError) {
        element.classList.add("input-error");
    } else {
        element.classList.remove("input-error");
    }
};

// Ajout de l'écouteur d'événement au bouton
confirmer.addEventListener("click", () => {
    // Initialisation d'un indicateur d'erreur globale
    let hasErrors = false;

    // Validation des longueurs de champs
    const inputs = [
        { element: jour_depart, length: 2 },
        { element: mois_depart, length: 2 },
        { element: annee_depart, length: 4 },
        { element: jour_retour, length: 2 },
        { element: mois_retour, length: 2 },
        { element: annee_retour, length: 4 },
    ];

    inputs.forEach(({ element, length }) => {
        const isInvalid = element.value.length !== length || isNaN(parseInt(element.value, 10));
        setError(element, isInvalid);
        if (isInvalid) hasErrors = true;
    });

    if (hasErrors) {
        alert("Veuillez remplir tous les champs avec des valeurs valides.");
        return;
    }

    // Conversion des valeurs des champs en entiers
    const jd = parseInt(jour_depart.value, 10);
    const md = parseInt(mois_depart.value, 10);
    const ad = parseInt(annee_depart.value, 10);
    const jr = parseInt(jour_retour.value, 10);
    const mr = parseInt(mois_retour.value, 10);
    const ar = parseInt(annee_retour.value, 10);

    // Vérification des dates
    if (!isValidDate(jd, md, ad)) {
        alert("La date de départ est invalide.");
        setError(jour_depart, true);
        setError(mois_depart, true);
        setError(annee_depart, true);
        return;
    } else {
        setError(jour_depart, false);
        setError(mois_depart, false);
        setError(annee_depart, false);
    }

    if (!isValidDate(jr, mr, ar)) {
        alert("La date de retour est invalide.");
        setError(jour_retour, true);
        setError(mois_retour, true);
        setError(annee_retour, true);
        return;
    } else {
        setError(jour_retour, false);
        setError(mois_retour, false);
        setError(annee_retour, false);
    }

    // Création des objets Date pour comparer les dates
    const date_depart = new Date(ad, md - 1, jd); // Mois commence à 0
    const date_retour = new Date(ar, mr - 1, jr);

    // Vérification de l'ordre des dates
    if (date_retour < date_depart) {
        alert("La date de retour doit être postérieure à la date de départ.");
        setError(jour_retour, true);
        setError(mois_retour, true);
        setError(annee_retour, true);
        return;
    }

    alert("Les dates sont valides !");
});
