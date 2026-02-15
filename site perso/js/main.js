// =========================
// UTILITAIRE
// =========================
function createAndStyleElement(tag, className, content = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
}

// =========================
// DONNÉES MOCK
// =========================
const mockPosts = [
  { id: 1, title: "Article mock 1", body: "Ceci est un faux article pour tester l’affichage." },
  { id: 2, title: "Article mock 2", body: "Un deuxième article inventé pour le design." },
  { id: 3, title: "Article mock 3", body: "Encore un article bidon pour remplir le feed." }
];

// =========================
// POSTS UTILISATEUR
// =========================
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

// =========================
// DONNÉES GALERIE
// =========================
const galleryImages = [
  { id: 1, title: 'Image 1', url: 'https://picsum.photos/seed/1/800/450' },
  { id: 2, title: 'Image 2', url: 'https://picsum.photos/seed/2/800/450' },
  { id: 3, title: 'Image 3', url: 'https://picsum.photos/seed/3/800/450' },
  { id: 4, title: 'Image 4', url: 'https://picsum.photos/seed/4/800/450' },
  { id: 5, title: 'Image 5', url: 'https://picsum.photos/seed/5/800/450' }
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

// =========================
// CRÉATION DE LA PAGE
// =========================
function createPage() {
  const app = document.getElementById('app');

  // --- NAV ---
  const nav = document.createElement('nav');
  const contactWrapper = createAndStyleElement('div', 'contact-wrapper', '');
  const homeLink = createAndStyleElement('a', '', 'Accueil');
  const profilLink = createAndStyleElement('a', '', 'A propos');
  const mockLink = createAndStyleElement('a', '', 'Mock');
  const apiLink = createAndStyleElement('a', '', 'API');
  const galleryLink = createAndStyleElement('a', '', 'Galerie');
  const contactLink = createAndStyleElement('a', '', 'Contact');

  const subMenu = createAndStyleElement('div', 'sub-menu', '');
  const subItem1 = createAndStyleElement('a', '', 'Email');
  const subItem2 = createAndStyleElement('a', '', 'Téléphone');

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
      <h2>Bienvenue sur le site</h2>
      <p>Cliquez sur le bouton pour augmenter le compteur</p>
      <div id="counter" class="counter"></div>
    `
  );

  const profilSection = createAndStyleElement(
    'div',
    'section',
    'Cette page a entièrement été créée en Javascript.'
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
      <div class="gallery-main">
        <img src="" alt="Image principale" />
        <p class="gallery-main-caption"></p>
      </div>
      <div class="gallery-thumbs"></div>
    `
  );

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

// =========================
// MOCK
// =========================
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

// =========================
// API
// =========================
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

// =========================
// DÉMARRAGE
// =========================
document.addEventListener('DOMContentLoaded', () => {
  loadUserPosts();
  createPage();
  renderUserPosts();
});
