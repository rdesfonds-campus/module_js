// you can write js here
console.log("exo-3");

// 1. Choix du joueur
const playerInput = prompt("Ton choix : (pierre, papier, ciseaux)?");

// 2. Fonction : nettoyer et valider le choix utilisateur
function getPlayerChoice(playerInput) {
  // Passer en minuscules pour ignorer la casse
  const choice = playerInput.toLowerCase();

  // Vérifier si le choix est valide (pierre, papier, ciseaux ou bombe)
  if (
    choice === "pierre" ||
    choice === "papier" ||
    choice === "ciseaux" ||
    choice === "bombe"
  ) {
    return choice;
  } else {
    console.log(
      "Erreur : tu dois choisir entre 'pierre', 'papier', 'ciseaux' ou 'bombe'."
    );
    // Si ce n'est pas valide, on ne retourne rien (undefined)
  }
}

// 3. Fonction : choix aléatoire de l'ordinateur
function getComputerChoice() {
  // Générer un nombre aléatoire entre 0 et 2
  const randomNumber = Math.floor(Math.random() * 3);

  // Associer chaque nombre à un choix
  if (randomNumber === 0) {
    return "pierre";
  } else if (randomNumber === 1) {
    return "papier";
  } else {
    return "ciseaux";
  }
}

// 4. Fonction : déterminer le gagnant
function findWinner(playerChoice, computerChoice) {
  // Cheat code : si le joueur tape "bombe", il gagne toujours
  if (playerChoice === "bombe") {
    return "gagné";
  }

  // Cas d'égalité
  if (playerChoice === computerChoice) {
    return "égalité";
  }

  // Cas où le joueur joue "pierre"
  if (playerChoice === "pierre") {
    if (computerChoice === "ciseaux") {
      return "gagné";
    } else {
      return "perdu";
    }
  }

  // Cas où le joueur joue "papier"
  if (playerChoice === "papier") {
    if (computerChoice === "pierre") {
      return "gagné";
    } else {
      return "perdu";
    }
  }

  // Cas où le joueur joue "ciseaux"
  if (playerChoice === "ciseaux") {
    if (computerChoice === "papier") {
      return "gagné";
    } else {
      return "perdu";
    }
  }
}

// 5. Fonction : orchestrer le jeu
function playGame() {
  // Récupérer choix utilisateur
  const uChoice = getPlayerChoice(playerInput);

  // Si mauvais choix utilisateur → on arrête
  if (!uChoice) {
    return;
  }

  // Récupérer choix de l'ordinateur
  const computerChoice = getComputerChoice();

  // Afficher les choix
  console.log("Choix du joueur : " + uChoice);
  console.log("Choix de l'ordinateur : " + computerChoice);

  // Afficher le résultat
  const result = findWinner(uChoice, computerChoice);
  console.log("Résultat : " + result);
}

// 6. Lancement du jeu
playGame();
