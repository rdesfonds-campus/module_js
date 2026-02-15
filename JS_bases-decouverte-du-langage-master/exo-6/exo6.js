console.log("exo-6");

// 1. Création de l'objet team vide
const team = {};

// 3. Ajout des propriétés players et games (tableaux vides)
team.players = [];
team.games = [];

// 4. Remplir le tableau players avec quelques joueurs
team.players.push(
  { firstName: "Pablo", lastName: "Sanchez", age: 11 },
  { firstName: "Léa", lastName: "Martin", age: 14 },
  { firstName: "Nico", lastName: "Dupont", age: 13 }
);

// 5. Remplir le tableau games avec quelques matchs
team.games.push(
  { opponent: "Broncos", teamPoints: 42, opponentPoints: 27 },
  { opponent: "Tigers", teamPoints: 35, opponentPoints: 40 },
  { opponent: "Lions", teamPoints: 50, opponentPoints: 45 }
);

// 6. Méthode pour ajouter un joueur
team.addPlayer = function (firstName, lastName, age) {
  this.players.push({ firstName, lastName, age });
};

// 8. Méthode pour ajouter un match
team.addGame = function (opponent, teamPoints, opponentPoints) {
  this.games.push({ opponent, teamPoints, opponentPoints });
};

// 7 & 9. Tests : ajouter quelques joueurs et matchs
team.addPlayer("Emma", "Durand", 12);
team.addPlayer("Max", "Girard", 15);

team.addGame("Wolves", 60, 55);
team.addGame("Sharks", 30, 30);

// 10. Calculer la somme des points de l'équipe
let totalTeamPoints = 0;
for (let i = 0; i < team.games.length; i++) {
  totalTeamPoints += team.games[i].teamPoints;
}

// 11. Calculer la moyenne des points de l'équipe adverse
let totalOpponentPoints = 0;
for (let i = 0; i < team.games.length; i++) {
  totalOpponentPoints += team.games[i].opponentPoints;
}
const averageOpponentPoints = totalOpponentPoints / team.games.length;

// 12. Trouver le joueur le plus âgé
let oldestPlayer = team.players[0];
for (let i = 1; i < team.players.length; i++) {
  if (team.players[i].age > oldestPlayer.age) {
    oldestPlayer = team.players[i];
  }
}

// Affichages
console.log("Joueurs :", team.players);
console.log("Matchs :", team.games);
console.log("Total des points de l'équipe :", totalTeamPoints);
console.log(
  "Moyenne des points des équipes adverses :",
  averageOpponentPoints
);
console.log(
  "Joueur le plus âgé :",
  `${oldestPlayer.firstName} ${oldestPlayer.lastName}, ${oldestPlayer.age} ans`
);
