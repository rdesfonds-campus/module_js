//Uilitaire de création d’éléments 
function createAndStyleElement(tag, className, content = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
}

// Données mock pour tester l’affichage
let mockPosts = [
  { id: 1, title: "Article mock 1", body: "Ceci est un faux article pour tester l’affichage." },
  { id: 2, title: "Article mock 2", body: "Un deuxième article inventé pour le design." },
  { id: 3, title: "Article mock 3", body: "Encore un article bidon pour remplir le feed." }
];

//posts créés par l’utilisateur, sauvegardés en localStorage
let userPosts = [];

// Sauvegarder dans localStorage
function saveUserPosts() {
  localStorage.setItem('userPosts', JSON.stringify(userPosts));
}

// Charger depuis localStorage
function loadUserPosts() {
  const stored = localStorage.getItem('userPosts');
  if (!stored) {
    userPosts = [];
    return;
  }

  try {
    userPosts = JSON.parse(stored);
  } catch (e) {
    userPosts = [];
  }
}

// Afficher les posts utilisateur
function renderUserPosts() {
  const dataContainer = document.querySelector('.data-container');
  if (!dataContainer) return;

  userPosts.forEach(post => {
    const card = createAndStyleElement('div', 'card');
    card.dataset.userPost = 'true';

    const dataTitle = createAndStyleElement('h2', '', post.title);
    const dataBody = createAndStyleElement('p', '', post.body);
    const deleteBtn = createAndStyleElement('button', 'delete-btn', 'Supprimer');

    deleteBtn.addEventListener('click', () => {
      card.remove();
      userPosts = userPosts.filter(p => p.id !== post.id);
      saveUserPosts();
    });

    card.appendChild(dataTitle);
    card.appendChild(dataBody);
    card.appendChild(deleteBtn);

    dataContainer.prepend(card);
  });
}

// Données de la galerie d’images
const galleryImages = [
  { id: 1, title: 'Image 1', url: 'https://picsum.photos/seed/1/800/450' },
  { id: 2, title: 'Image 2', url: 'https://picsum.photos/seed/2/800/450' },
  { id: 3, title: 'Image 3', url: 'https://picsum.photos/seed/3/800/450' },
  { id: 4, title: 'Image 4', url: 'https://picsum.photos/seed/4/800/450' },
  { id: 5, title: 'Image 5', url: 'https://picsum.photos/seed/5/800/450' },
  { id: 6, title: 'Image 6', url: 'https://picsum.photos/seed/6/800/450' },
  { id: 7, title: 'Image 7', url: 'https://picsum.photos/seed/7/800/450' },
  { id: 8, title: 'Image 8', url: 'https://picsum.photos/seed/8/800/450' },
  { id: 9, title: 'Image 9', url: 'https://picsum.photos/seed/9/800/450' }
];

// Afficher la galerie (une grande image + vignettes)
function renderGallery() {
  const mainImg = document.querySelector('.gallery-main img');
  const mainCaption = document.querySelector('.gallery-main-caption');
  const thumbsContainer = document.querySelector('.gallery-thumbs');

  if (!mainImg || !mainCaption || !thumbsContainer) return;

  const first = galleryImages[0];
  mainImg.src = first.url;
  mainImg.alt = first.title;
  mainCaption.textContent = first.title;

  thumbsContainer.innerHTML = '';

  galleryImages.forEach((item, index) => {
    const thumb = document.createElement('img');
    thumb.src = item.url;
    thumb.alt = item.title;
    thumb.className = 'gallery-thumb';
    if (index === 0) thumb.classList.add('active');

    thumb.addEventListener('click', () => {
      mainImg.src = item.url;
      mainImg.alt = item.title;
      mainCaption.textContent = item.title;

      document.querySelectorAll('.gallery-thumb').forEach(img => {
        img.classList.remove('active');
      });
      thumb.classList.add('active');
    });

    thumbsContainer.appendChild(thumb);
  });
}

// Création de la structure de la page
function createPage() {
  const app = document.getElementById('app');

  // --- NAVIGATION ---
  const nav = document.createElement('nav');
  const contactWrapper = createAndStyleElement('div', 'contact-wrapper', '');
  const homeLink = createAndStyleElement('a', '', 'Accueil');
  const profilLink = createAndStyleElement('a', '', 'A propos');
  const mockLink = createAndStyleElement('a', '', 'Mock');
  const apiLink = createAndStyleElement('a', '', 'API');
  const galleryLink = createAndStyleElement('a', '', 'Galerie');
  const contactLink = createAndStyleElement('a', '', 'Contact');
// Sous-menu pour contact
  const subMenu = createAndStyleElement('div', 'sub-menu', '');
  const subItem1 = createAndStyleElement('a', '', 'Email');
  subItem1.setAttribute(
  'href',
  'mailto:contact@exemple.com?subject=Contact%20depuis%20le%20site&body=Bonjour%2C%20je%20vous%20écris%20depuis%20mon%20site.'
);

  const subItem2 = createAndStyleElement('a', '', 'Téléphone');
subItem2.setAttribute('href', 'tel:+33123456789');
// Ajouter les éléments au DOM
  subMenu.appendChild(subItem1);
  subMenu.appendChild(subItem2);

  nav.appendChild(homeLink);
  nav.appendChild(profilLink);
  nav.appendChild(mockLink);
  nav.appendChild(apiLink);
  nav.appendChild(galleryLink);

  contactWrapper.appendChild(contactLink);
  contactWrapper.appendChild(subMenu);
  nav.appendChild(contactWrapper);

  contactWrapper.addEventListener('mouseenter', () => {
    subMenu.classList.add('active');
  });

  contactWrapper.addEventListener('mouseleave', () => {
    subMenu.classList.remove('active');
  });

  // --- CONTENU PRINCIPAL ---
  const mainContent = createAndStyleElement('div', 'main-content');

  const homeSection = createAndStyleElement(
  'div',
  'section active',
  `
    <div class="home-hero">
      <h1>Bienvenue sur mon site JavaScript</h1>
      <p>Tout ce que tu vois ici est créé en JavaScript, sans HTML écrit à la main.</p>
      <button id="hero-btn">Découvrir le site</button>
    </div>

    <div class="home-features">
      <div class="card">
        <h2>Feed Mock</h2>
        <p>Affiche de faux articles pour tester la mise en page.</p>
      </div>
      <div class="card">
        <h2>API Blagues</h2>
        <p>Charge des blagues depuis une API externe.</p>
      </div>
      <div class="card">
        <h2>Galerie d'images</h2>
        <p>Parcourt une petite galerie d’images avec vignettes.</p>
      </div>
    </div>

    <div class="card">
      <h2>Petit compteur</h2>
      <p>Clique pour augmenter le compteur :</p>
      <div id="counter" class="counter">0</div>
      <button id="counter-btn">+1</button>
    </div>
    <div id="ban_accueil"><img src="img/bacasable.png" alt="Image d'illustration" class="home-hero-img" /></div>
  `
);

let counterValue = 0;

const counterElement = homeSection.querySelector('#counter');
const counterButton = homeSection.querySelector('#counter-btn');

counterButton.addEventListener('click', () => {
  counterValue = counterValue + 1;
  counterElement.textContent = counterValue;
});

  const profilSection = createAndStyleElement(
  'div',
  'section',
  `
    <div class="apropos-layout">
      <div class="apropos-top">
        <div id="banniere" class="apropos-banniere">
          <img src="img/portrait.png" alt="Photo de profil">
        </div>

        <div id="speech" class="card">
          <p>
            Passionné par la création numérique et la résolution de problèmes, je souhaite me reconvertir dans le développement web.<br>
            Après plus de 20 ans d'expérience en tant que graphiste, je suis habitué aux environnements techniques où j'ai acquis des compétences en UI/UX, en intégration web (HTML/CSS, WordPress) et en automatisation de tâches graphiques via des scripts.<br>
            Je suis à la recherche d’une alternance où je pourrais acquérir de nouvelles connaissances et valider ma reconversion.
          </p>
        </div>
      </div>
      <!-- ici viennent ensuite tous les autres blocs .bloctxt card -->

      <div class="bloctxt card">
        <h3>Compétences UI/UX & Accessibilité</h3>
        <ul>
          <li><strong>Développement Web :</strong> HTML, CSS, notions en JavaScript/PHP (ajout de modules aux sites existants)</li>
          <li><strong>CMS & Intégration :</strong> WordPress, gestion de plugins et templates</li>
          <li><strong>UI/UX & Accessibilité :</strong> Conception d'interfaces intuitives, ergonomie digitale</li>
          <li><strong>Gestion de projet :</strong> Travail en équipe agile, respect des délais, veille technologique</li>
          <li><strong>Adaptabilité & Apprentissage :</strong> Montée en compétences rapide sur de nouveaux outils et langages</li>
        </ul>
      </div>

      <div class="bloctxt card">
        <h3>Expérience professionnelle</h3>
        <p>
          <strong>Graphiste Print et Web</strong><br>
          2002-2024 – <i>Indépendant et salarié</i><br>
          Secteurs : communication, marketing digital.<br>
          Création et intégration de maquettes web et emailings (HTML/CSS, responsive design).<br>
          Automatisation de tâches graphiques via des scripts pour optimiser la production.<br>
          Gestion de projets numériques, travail en collaboration avec des développeurs pour intégrer des éléments interactifs.<br>
          Veille technologique continue pour suivre l'évolution des outils numériques et des tendances UI/UX.
        </p>
      </div>

          <div class="bloctxt card">
        <h3>Formations</h3>
        <p>
          🎓 2026 | Formation Développeur avancé et IA – Le Campus Numérique (Valence)<br>
          📜 2024 | Formation Google AI Essentials<br>
          🎓 2009 | Diplôme Infographie Multimédia 3D – ARIES (Lyon)<br>
          🎓 2006 | Diplôme Infographiste – Supcréa (Grenoble)<br>
          🎓 2001 | Bac STT ACC – Lycée B. de Laffemas (Valence)<br>
        </p>
      </div>

      <div class="bloctxt card">
        <h3>Savoir-faire & Savoir-être</h3>
        <p>
          🎨 Créativité & innovation<br>
          📊 Gestion de projet & autonomie<br>
          🔎 Sens du détail & rigueur<br>
          💡 Esprit d’analyse & adaptabilité<br>
          🤝 Travail en équipe & communication efficace<br>
          🤖 Utilisation responsable de l’IA<br>
        </p>
      </div>

      <div class="bloctxt card">
        <h3>Contact</h3>
        <table class="contact-table">
          <tr>
            <td>Tel : 06XXXXXXXX</td>
            <td>Montélier 26120</td>
          </tr>
          <tr>
            <td>
              Email :
              <a href="mailto:romain.desfonds@le-campus-numerique.fr">
                romain.desfonds@le-campus-numerique.fr
              </a>
            </td>
            <td>
              Site web :
              <a href="https://rdesfonds.fr" target="_blank">rdesfonds.fr</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `
);


  const dataSection = createAndStyleElement(
    'div',
    'section',
    `
      <h2>Feed</h2>
      <form id="post-form">
        <label for="post-title">Titre</label>
        <input type="text" id="post-title" required />
        <label for="post-body">Texte</label>
        <textarea id="post-body" required></textarea>
        <button type="submit">Ajouter</button>
      </form>
      <div class="data-container"></div>
    `
  );

  const gallerySection = createAndStyleElement(
  'div',
  'section',
  `
    <h2>Galerie d'images</h2>

    <div class="gallery-add-form card">
      <label for="image-url">Ajouter une image par URL :</label>
      <div class="gallery-add-row">
        <input
          type="url"
          id="image-url"
          placeholder="https://exemple.com/mon-image.jpg"
        />
        <button id="add-image-btn" type="button">Ajouter</button>
      </div>
      <p class="gallery-add-help">
        Colle ici l'adresse complète d'une image accessible sur internet.
      </p>
    </div>

    <div class="gallery-toolbar">
      <button id="gallery-view-grid" type="button">Grille 3 colonnes</button>
      <button id="gallery-view-list" type="button">Colonne</button>
    </div>

    <div class="gallery-shell">
      <div class="gallery-main">
        <img src="" alt="Image principale" />
        <p class="gallery-main-caption"></p>
      </div>

      <div class="gallery-thumbs"></div>
    </div>
  `
);
const thumbsContainer = gallerySection.querySelector('.gallery-thumbs');
const btnViewGrid = gallerySection.querySelector('#gallery-view-grid');
const btnViewList = gallerySection.querySelector('#gallery-view-list');

if (thumbsContainer && btnViewGrid && btnViewList) {
  btnViewGrid.addEventListener('click', () => {
    thumbsContainer.classList.remove('is-list');
  });

  btnViewList.addEventListener('click', () => {
    thumbsContainer.classList.add('is-list');
  });
}

// Gestion de l'ajout d'image par URL dans la galerie
const imageUrlInput = gallerySection.querySelector('#image-url');
const addImageBtn = gallerySection.querySelector('#add-image-btn');

if (imageUrlInput && addImageBtn) {
  addImageBtn.addEventListener('click', () => {
    const url = imageUrlInput.value.trim();
    if (!url) {
      return;
    }

    // On crée un nouvel objet image pour notre tableau
    const newId = galleryImages.length
      ? galleryImages[galleryImages.length - 1].id + 1
      : 1;

    const newImage = {
      id: newId,
      title: 'Image perso ' + newId,
      url: url
    };

    // On l'ajoute au tableau existant
    galleryImages.push(newImage);

    // On réaffiche la galerie pour prendre en compte la nouvelle image
    renderGallery();

    // On vide le champ
    imageUrlInput.value = '';
  });
}


  mainContent.appendChild(homeSection);
  mainContent.appendChild(profilSection);
  mainContent.appendChild(dataSection);
  mainContent.appendChild(gallerySection);

  app.appendChild(nav);
  app.appendChild(mainContent);

  const footer = createAndStyleElement(
    'footer',
    '',
    `
      <p>&copy; 2025 Javascript DOM, Tous droits réservés</p>
      <p>
        <a href="https://google.fr" target="_blank">Google</a>
      </p>
    `
  );
  app.appendChild(footer);

  // --- FORMULAIRE FEED ---
  const postForm = document.getElementById('post-form');
  const postTitleInput = document.getElementById('post-title');
  const postBodyInput = document.getElementById('post-body');

  if (postForm) {
    postForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = postTitleInput.value.trim();
      const body = postBodyInput.value.trim();

      if (!title || !body) {
        return;
      }

      const newPost = {
        id: Date.now(),
        title,
        body
      };

      userPosts.push(newPost);
      saveUserPosts();

      const dataContainer = document.querySelector('.data-container');

      const card = createAndStyleElement('div', 'card');
      card.dataset.userPost = 'true';

      const dataTitle = createAndStyleElement('h2', '', newPost.title);
      const dataBody = createAndStyleElement('p', '', newPost.body);
      const deleteBtn = createAndStyleElement('button', 'delete-btn', 'Supprimer');

      deleteBtn.addEventListener('click', () => {
        card.remove();
        userPosts = userPosts.filter(p => p.id !== newPost.id);
        saveUserPosts();
      });

      card.appendChild(dataTitle);
      card.appendChild(dataBody);
      card.appendChild(deleteBtn);

      dataContainer.prepend(card);

      postTitleInput.value = '';
      postBodyInput.value = '';
    });
  }

  // --- NAV ENTRE SECTIONS ---
  function showSection(section) {
    document.querySelectorAll('.section').forEach(sec =>
      sec.classList.remove('active')
    );
    section.classList.add('active');
  }

  homeLink.addEventListener('click', () => {
    showSection(homeSection);
  });

  profilLink.addEventListener('click', () => {
    showSection(profilSection);
  });

  mockLink.addEventListener('click', () => {
    showSection(dataSection);
    afficherMock();
  });

  apiLink.addEventListener('click', () => {
    showSection(dataSection);
    fetchData();
  });

  galleryLink.addEventListener('click', () => {
    showSection(gallerySection);
    renderGallery();
  });
}

// Afficher les données mock
function afficherMock() {
  const dataContainer = document.querySelector('.data-container');
  if (!dataContainer) return;

  dataContainer.querySelectorAll('.card:not([data-user-post="true"])').forEach(card => {
    card.remove();
  });

  mockPosts.forEach(item => {
    const card = createAndStyleElement('div', 'card');
    const dataTitle = createAndStyleElement('h2', '', item.title);
    const dataBody = createAndStyleElement('p', '', item.body);

    card.appendChild(dataTitle);
    card.appendChild(dataBody);

    dataContainer.appendChild(card);
  });
}

// Récupérer des données depuis une API publique
async function fetchData() {
  const dataContainer = document.querySelector('.data-container');
  if (!dataContainer) return;

  dataContainer.querySelectorAll('.card:not([data-user-post="true"])').forEach(card => {
    card.remove();
  });

  const loadingElement = createAndStyleElement('div', 'loading', 'Loading...');
  dataContainer.appendChild(loadingElement);

  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming,Misc?type=single&amount=5');
    const data = await response.json();

    setTimeout(() => {
      if (dataContainer.contains(loadingElement)) {
        dataContainer.removeChild(loadingElement);
      }

      data.jokes.forEach(item => {
        const card = createAndStyleElement('div', 'card');
        const dataTitle = createAndStyleElement('h2', '', item.category);
        const dataBody = createAndStyleElement('p', '', item.joke);

        card.appendChild(dataTitle);
        card.appendChild(dataBody);

        dataContainer.appendChild(card);
      });
    }, 500);
  } catch (error) {
    if (dataContainer.contains(loadingElement)) {
      dataContainer.removeChild(loadingElement);
    }
    dataContainer.textContent = 'Failed to fetch data';
  }
}

// Initialisation de la page au démarrage
document.addEventListener('DOMContentLoaded', () => {
  loadUserPosts();
  createPage();
  renderUserPosts();
});
