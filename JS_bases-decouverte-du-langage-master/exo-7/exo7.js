console.log("exo-7");

// 1. Parcourir les articles fournis pour les afficher un à un dans la console
console.log("Liste brute des articles :");
for (let i = 0; i < jsonDatas.length; i++) {
  console.log(jsonDatas[i]);
}

// 2. Objet de traduction des types
const typeTranslations = {
  car: "Voiture",
  house: "Maison",
  game: "Jeu de société",
  videoGame: "Jeu vidéo",
  show: "Spectacle",
};

// 3. Ajouter une nouvelle clé aux objets existants pour stocker le type traduit
for (let i = 0; i < jsonDatas.length; i++) {
  const currentItem = jsonDatas[i];
  const originalType = currentItem.type;
  const translatedType = typeTranslations[originalType] || originalType;

  currentItem.translatedType = translatedType;
}

// Vérifier dans la console que le type traduit est bien ajouté
console.log("Articles avec type traduit :");
for (let i = 0; i < jsonDatas.length; i++) {
  const item = jsonDatas[i];
  console.log(
    `${item.name} - type: ${item.type} - traduit: ${item.translatedType}`
  );
}

// 4. Afficher les articles dans un tableau HTML

// Récupérer le <tbody> du tableau
const tableBody = document.querySelector("#itemsTable tbody");

// Parcourir les données et créer une ligne par article
for (let i = 0; i < jsonDatas.length; i++) {
  const item = jsonDatas[i];

  // Créer une ligne
  const tr = document.createElement("tr");

  // Créer les cellules
  const nameTd = document.createElement("td");
  nameTd.textContent = item.name;

  const typeTd = document.createElement("td");
  typeTd.textContent = item.type;

  const translatedTypeTd = document.createElement("td");
  translatedTypeTd.textContent = item.translatedType || "";

  const descTd = document.createElement("td");
  descTd.textContent = item.description || "";

  const priceTd = document.createElement("td");
  priceTd.textContent = item.price + " €";

  const quantityTd = document.createElement("td");
  quantityTd.textContent = item.quantity;

  // Ajouter les cellules à la ligne
  tr.appendChild(nameTd);
  tr.appendChild(typeTd);
  tr.appendChild(translatedTypeTd);
  tr.appendChild(descTd);
  tr.appendChild(priceTd);
  tr.appendChild(quantityTd);

  // Ajouter la ligne au tbody
  tableBody.appendChild(tr);
}
