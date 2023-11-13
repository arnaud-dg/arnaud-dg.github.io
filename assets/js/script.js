// Initializing words
var words = ["a pharmacist       ", "a data enthousiast ", "a chemical engineer", "a data scientist   ", "Ready To Help !    "], i = 0;

setInterval(function() {
    $("#dynamic-text").fadeOut(function() {
        $(this).html(words[i = (i + 1) % words.length]).fadeIn();
    });

    // Simuler l'effet de frappe
    $("#dynamic-text").text("");
    var word = words[i].split("");
    var typingEffect = setInterval(function() {
      if (!word.length) {
        clearInterval(typingEffect);
        return;
      }
      var char = word.shift();
      $("#dynamic-text").append(char);
    }, 200);

}, 3000); // Changez le temps selon la vitesse souhaitée