// you can write js here

console.log("exo-4");

// Tableau de départ
let secretMessage = [
  "Learning",
  "isn't",
  "about",
  "what",
  "you",
  "get",
  "easily",
  "the",
  "first",
  "time,",
  "it's",
  "about",
  "what",
  "you",
  "can",
  "figure",
  "out.",
  "-2015,",
  "Chris",
  "Pine,",
  "Learn",
  "JavaScript",
];

// 1. Enlever le dernier élément du tableau
secretMessage.pop();

// 2. Ajouter "to" et "program" à la fin du tableau
secretMessage.push("to", "program");

// 3. Remplacer "easily" par "right"
secretMessage[6] = "right";

// 4. Supprimer le premier élément du tableau
secretMessage.shift();

// 5. Ajouter "Programming" au début du tableau
secretMessage.unshift("Programming");

// 6. Remplacer "get right the first time" par "know"
//    Ces mots sont aux index 4 à 8 après les opérations précédentes
secretMessage.splice(4, 5, "know");

// 7. Afficher le message final dans la console
const finalMessage = secretMessage.join(" ");
console.log(finalMessage);

