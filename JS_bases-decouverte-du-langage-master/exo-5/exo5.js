console.log("exo-5");

// 1. Phrase d'entrée à traduire
const input = "Turpentine and turtles"; // tu peux changer la phrase

// 2. Tableau des voyelles
const vowels = ["a", "e", "i", "o", "u", "y"];

// 3. Tableau résultat (vide au début)
const resultArray = [];

// 4. Boucle sur chaque lettre de la phrase
for (let i = 0; i < input.length; i++) {
  const currentLetter = input[i].toLowerCase();

  // 5. Vérifier si la lettre courante est une voyelle
  if (vowels.indexOf(currentLetter) !== -1) {
    // 7. Si c'est une voyelle, on l'ajoute au tableau résultat
    resultArray.push(currentLetter);
  }
}

// 8. Transformer le tableau de voyelles en chaîne, en majuscules
const whaleSong = resultArray.join("").toUpperCase();

// Afficher le résultat
console.log(whaleSong);
