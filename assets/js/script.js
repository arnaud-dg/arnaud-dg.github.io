// Initialisation des mots
var words = ["a pharmacist", "a data enthusiast", "a chemical engineer", "a data scientist", "Ready To Help !"];
var i = 0;

function typeEffect() {
    var word = words[i].split("");
    var typingEffect = setInterval(function() {
        if (!word.length) {
            clearInterval(typingEffect); // Arrêter l'effet de frappe
            i = (i + 1) % words.length; // Passer au mot suivant
            setTimeout(changeWord, 2000); // Attendre avant de changer de mot
            return;
        }
        var char = word.shift();
        $("#dynamic-text").append(char);
    }, 100); // Vitesse de frappe
}

function changeWord() {
    $("#dynamic-text").fadeOut(function() {
        $(this).text(""); // Effacer le texte actuel
        $(this).fadeIn(typeEffect); // Démarrer l'effet de frappe après le fondu
    });
}

// Démarrer le processus
changeWord();
