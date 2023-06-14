// SEARCH FOCUS 

const search = document.getElementById('searchInputlight');

search.addEventListener('focus',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid var(--mainColor)";

});


search.addEventListener('focusout',(event)=>{
    event.preventDefault();

document.getElementById('search-wrapper').style.border="1px solid rgba(0, 0, 0, 0.276)";

});



// Récupérer les éléments <a> dans la div
const searchButtons = document.querySelectorAll('.searchBlock--txt__icons a ');

// Fonction pour gérer le clic et le survol sur un lien
function handleInteraction(event) {
  event.preventDefault();
  // Retirer la classe activeSearchBtn de tous les liens
  searchButtons.forEach(button => {
    button.classList.remove('activeSearchBtn');
  });

  // Ajouter la classe activeSearchBtn sur le lien survolé
  this.classList.add('activeSearchBtn');
}

// Ajouter des gestionnaires d'événements pour le clic à chaque lien
searchButtons.forEach(button => {
  button.addEventListener('click', handleInteraction);
});


// BLOCK DISPARTION SEARCH ----------------

// Sélectionner le bouton
const animeSearchBtn = document.getElementById("animeSearchBtn");
const mangaSearchBtn = document.getElementById("mangaSearchBtn");

// Sélectionner les sections
const mangaBlock = document.getElementById("principalSearchMangaBlock");
const animeBlock = document.getElementById("principalSearchAnimeBlock");
// Sélectionner l'élément img par sa classe CSS
const imgElement = document.querySelector(".searchBlock--img img");

// Ajouter un gestionnaire d'événements de clic au bouton
animeSearchBtn.addEventListener("click", function() {
  // Cacher la section mangaBlock
  mangaBlock.style.display = "none";

  // Afficher la section animeBlock
  animeBlock.style.display = "block";
  // Changer la source de l'image
  imgElement.src = "img/testbanner.jpg";
});

// Ajouter un gestionnaire d'événements de clic au bouton
mangaSearchBtn.addEventListener("click", function() {
  // Cacher la section mangaBlock
  mangaBlock.style.display = "block";

  // Afficher la section animeBlock
  animeBlock.style.display = "none";
  // Changer la source de l'image
  imgElement.src = "img/testbannermanga.jpg";
});



const image = document.querySelector('.searchBlock--img img');
const blockHeight = 440; // Hauteur du bloc de l'image en pixels
const maxScale = 1.2; // Échelle maximale de zoom

function handleZoomScroll() {
  const scrollPosition = window.pageYOffset;
  const scrollPercentage = (scrollPosition / blockHeight) * 100;

  if (scrollPercentage <= 100) {
    const scale = 1 + (scrollPercentage / 100) * (maxScale - 1); // Ajustez le coefficient de mise à l'échelle ici
    image.style.transform = `scale(${scale})`;
  } else {
    image.style.transform = `scale(${maxScale})`; // Maintient l'échelle maximale lorsque le défilement dépasse la hauteur du bloc
  }
}

window.addEventListener('scroll', handleZoomScroll);





// Fonction pour rechercher parmi tous les mangas et tous les animes
async function searchMedia() {
  const searchInput = document.getElementById('searchInputlight');
  const principalSearchAnimeBlock = document.getElementById('principalSearchAnimeBlock');
  const principalSearchMangaBlock = document.getElementById('principalSearchMangaBlock');
  const resultSearchMangaBlock = document.querySelector('.resultSearchMangaBlock');
  const querySearchMedia = `
    query ($search: String) {
      anime: Page(page: 1, perPage: 10) {
        results: media(type: ANIME, search: $search) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
        }
      }
      manga: Page(page: 1, perPage: 10) {
        results: media(type: MANGA, search: $search) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
        }
      }
    }
  `;

  const variables = {
    search: searchInput.value.trim(),
  };

  try {
    // Afficher le bloc resultSearchMangaBlock
    resultSearchMangaBlock.style.display = 'block';

    // Masquer les blocs principalSearchAnimeBlock et principalSearchMangaBlock
    principalSearchAnimeBlock.style.display = 'none';
    principalSearchMangaBlock.style.display = 'none';

    const data = await fetchData(querySearchMedia, variables);
    const animeResults = data.data.anime.results;
    const mangaResults = data.data.manga.results;
    displaySearchResults(animeResults, mangaResults);
  } catch (error) {
    console.log(error);
  }
}


// Fonction pour afficher les résultats de recherche
function displaySearchResults(animeResults, mangaResults) {
  const resultSearchMangaBlock = document.getElementById('resultSearchMangaBlock');
  resultSearchMangaBlock.innerHTML = '';

  // Affichage des résultats pour les animes
  for (const anime of animeResults) {
    const mediaTitle = anime.title.english || anime.title.romaji || anime.title.native;
    const mediaImage = anime.coverImage.extraLarge;
    const mediaId = anime.id;

    const resultItem = createResultItem(mediaTitle, mediaImage, mediaId);
    resultSearchMangaBlock.appendChild(resultItem);
  }

  // Affichage des résultats pour les mangas
  for (const manga of mangaResults) {
    const mediaTitle = manga.title.english || manga.title.romaji || manga.title.native;
    const mediaImage = manga.coverImage.extraLarge;
    const mediaId = manga.id;

    const resultItem = createResultItem(mediaTitle, mediaImage, mediaId);
    resultSearchMangaBlock.appendChild(resultItem);
  }
}

// Fonction pour créer un élément de résultat de recherche
function createResultItem(mediaTitle, mediaImage, mediaId) {
  const resultItem = document.createElement('div');
  resultItem.classList.add('popularBlock--single__card');

  const linkElement = document.createElement('a');
  linkElement.href = 'item.html?id=' + mediaId;

  const imageElement = document.createElement('img');
  imageElement.src = mediaImage;
  imageElement.alt = mediaTitle;
  imageElement.title = mediaTitle;

  const titleElement = document.createElement('p');
  titleElement.textContent = mediaTitle;

  const slideText = document.createElement('div');
  slideText.classList.add('titleOf');
  slideText.appendChild(titleElement);
                  // Vérification si le contenu du <p> dépasse 17 caractères
                  if (titleElement.textContent.length > 20) {
                    // Ajout de la classe .marquee
                    titleElement.classList.add('marquee');
                  }

  linkElement.appendChild(imageElement);
  linkElement.appendChild(slideText);
  resultItem.appendChild(linkElement);

  return resultItem;
}

// Ajout de l'événement de recherche lors de la saisie dans l'input
const searchInput = document.getElementById('searchInputlight');
searchInput.addEventListener('input', searchMedia);

const searchInputResult = document.getElementById('searchInputlight');
const resultSearchMangaBlock = document.querySelector('.resultSearchMangaBlock');
const resultSearchMangaTitle = resultSearchMangaBlock.querySelector('h2');

searchInputResult.addEventListener('input', function() {
  resultSearchMangaTitle.textContent = this.value.trim() !== '' ? this.value.trim() : 'Result research';
});

