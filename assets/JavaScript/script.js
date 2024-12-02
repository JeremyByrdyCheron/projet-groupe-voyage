// Récupération de l'élément bouton "confirmer"
const confirmer = document.getElementById("confirm");

// Récupération des champs de saisie des dates
const jour_depart = document.getElementById("jourD");
const mois_depart = document.getElementById("moisD");
const annee_depart = document.getElementById("anneeD");
const jour_retour = document.getElementById("jourR");
const mois_retour = document.getElementById("moisR");
const annee_retour = document.getElementById("anneeR");

// Ajout de l'écouteur d'événement au bouton
confirmer.addEventListener("click", () => {
    if (jour_depart.value.length != 2
        || mois_depart.value.length != 2
        || annee_depart.value.length != 4
        || jour_retour.value.length != 2
        || mois_retour.value.length != 2
        || annee_retour.value.length != 4) {
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

    // Validation des entrées utilisateur
    if (isNaN(jd) || isNaN(md) || isNaN(ad) || isNaN(jr) || isNaN(mr) || isNaN(ar)) {
        alert("Veuillez remplir tous les champs avec des valeurs valides.");
        return;
    }

    if (
        jd < 1 || jd > 31 || jr < 1 || jr > 31 ||
        md < 1 || md > 12 || mr < 1 || mr > 12 ||
        ad < 0 || ar < 0
    ) {
        alert("Veuillez entrer des dates valides.");
        return;
    }

    // Création des objets Date pour valider les dates
    const date_depart = new Date(ad, md - 1, jd); // Mois commence à 0
    const date_retour = new Date(ar, mr - 1, jr);

    if (date_retour <= date_depart) {
        alert("La date de retour doit être postérieure à la date de départ.");
    } else {
        alert("Dates valides !");
    }
});
