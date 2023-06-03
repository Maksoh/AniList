var swiper = new Swiper(".relationsBlockSwiper", {
    slidesPerView: 8,
    freeMode: true,
    breakpoints: {

      370: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      460: {
        slidesPerView: 3,
        spaceBetween: 5,
      },
      570: {
        slidesPerView: 4,
        spaceBetween: 5,
      },
      1330: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      1530: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1790: {
        slidesPerView: 7,
        spaceBetween: 5,
      },
    },

});

// BOUTON LIST ADD 
// Récupérer les références des boutons
const addListBtn = document.querySelector('.addListbtn');
const removeListBtn = document.querySelector('.removeListbtn');

// Ajouter un écouteur d'événement pour le clic sur addListBtn
addListBtn.addEventListener('click', function() {
    addListBtn.style.display = 'none'; // Modifier le display en 'none'
    removeListBtn.style.display = 'block'; // Modifier le display en 'block'
});
removeListBtn.addEventListener('click', function() {
  addListBtn.style.display = 'block'; // Modifier le display en 'none'
  removeListBtn.style.display = 'none'; // Modifier le display en 'block'
});

// ::::::::::: //


// BLOCK APPARITION
// ScrollReveal().reveal('.personCard', { duration: 800, easing:'ease-in', interval: 150});
// OVERVIEW BLOCK ACTION 
const overviewTitle = document.querySelector('.overviewTitle');
const overviewBlock = document.querySelector('.relationsBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
overviewTitle.addEventListener('click', function(event) {
    event.preventDefault();
    overviewBlock.style.display = 'block'; // Modifier le display en 'none'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
});

// CHARACTERES BLOCK ACTION 
const characteresTitle = document.querySelector('.characteresTitle');
const characteresBlock = document.querySelector('.characteresBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
characteresTitle.addEventListener('click', function(event) {
    event.preventDefault();
    characteresBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
});

// STAFF BLOCK ACTION 
const staffTitle = document.querySelector('.staffTitle');
const staffBlock = document.querySelector('.staffBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
staffTitle.addEventListener('click', function(event) {
    event.preventDefault();
    staffBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
});

// REVIEWS BLOCK ACTION 
const reviewsTitle = document.querySelector('.reviewsTitle');
const reviewsBlock = document.querySelector('.reviewsBlock');
// Ajouter un écouteur d'événement pour le clic sur addListBtn
reviewsTitle.addEventListener('click', function(event) {
    event.preventDefault();
    reviewsBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Récupérer la valeur de l'ID à partir des paramètres de l'URL
const mediaIdurl = urlParams.get('id');

// Utiliser l'ID comme vous le souhaitez dans la nouvelle page
console.log(mediaIdurl);

// Fonction pour extraire l'ID de l'URL
function getMediaIdFromURL() {
  const url = window.location.href;
  const regex = /\/singleid\/(\d+)/; // Expression régulière pour extraire l'ID de l'URL
  const match = url.match(regex);
  if (match && match[1]) {
    return parseInt(match[1]);
  }
  return null;
}


// HEADER FUNCTION -------------
function displayMediaData(media) {
  // Sélection des éléments HTML
  const bannerImage = document.querySelector('.itemBlock--img img');
  const coverImage = document.querySelector('.itemBlock--content__img img');
  const titleElement = document.querySelector('.itemBlock--content__title h5');
  const descriptionElement = document.querySelector('.itemBlock--content__title p');

  // Mise à jour des valeurs
  bannerImage.src = media.bannerImage;
  coverImage.src = media.coverImage.extraLarge;
  titleElement.textContent = media.title.english;
  descriptionElement.textContent = media.description;
}

// RELATIONS FUNCTION -------------

function displayRelations(media) {
// Sélection de l'élément HTML
const relationsSwiper = document.getElementById('relationsSwiper');

// Parcours des relations et création des éléments HTML correspondants
media.relations.edges.forEach((relation) => {
  const relationType = relation.relationType;
  const relationNode = relation.node;
  const relationId = relation.node.id;
  // Création de la carte de relation
  const relationCard = document.createElement('div');
  relationCard.classList.add('popularBlock--slider__card', 'swiper-slide');
  relationCard.title=relationType
  
    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + relationId; // URL with the ID as a parameter

  // Création de l'image de la relation
  const relationImage = document.createElement('img');
  relationImage.src = relationNode.coverImage.extraLarge;
  relationImage.alt = 'cover';

  // Création du titre de la relation
  const relationTitle = document.createElement('p');
  relationTitle.textContent = relationNode.title.native || relationNode.title.native;

  var relationTitleDiv = document.createElement('div'); // Créez un élément div pour le conteneur de texte
  relationTitleDiv.classList.add('titleOf');
  relationTitleDiv.appendChild(relationTitle);
  
  // Ajout de l'image et du titre à la carte de relation
  linkElement.appendChild(relationImage);
  linkElement.appendChild(relationTitleDiv);
  relationCard.appendChild(linkElement)
  
  // Ajout de la carte de relation au conteneur
  relationsSwiper.appendChild(relationCard);
});


}


// RECOMMENDATIONS FUNCTION -------------

function displayRecommendations(media) {
  // Sélection de l'élément HTML
  const relationsSwiper = document.getElementById('recommendationsSwiper');

  // Parcours des recommandations et création des éléments HTML correspondants
  media.recommendations.edges.forEach((recommendation) => {
    const recommendationNode = recommendation.node;
    const recommendationId = recommendation.node.mediaRecommendation.id;

    // Création de la carte de recommandation
    const recommendationCard = document.createElement('div');
    recommendationCard.classList.add('popularBlock--slider__card', 'swiper-slide');
    recommendationCard.title= recommendationNode.mediaRecommendation.title.english || recommendationNode.mediaRecommendation.title.native;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + recommendationId; // URL with the ID as a parameter

    // Création de l'image de la recommandation
    const recommendationImage = document.createElement('img');
    recommendationImage.src = recommendationNode.mediaRecommendation.coverImage.extraLarge;
    recommendationImage.alt = '';

    // Création du titre de la recommandation
    const recommendationTitle = document.createElement('p');
    recommendationTitle.textContent = recommendationNode.mediaRecommendation.title.english || recommendationNode.mediaRecommendation.title.native;

    var recommendationTitleDiv = document.createElement('div'); // Créez un élément div pour le conteneur de texte
    recommendationTitleDiv.classList.add('titleOf');
    recommendationTitleDiv.appendChild(recommendationTitle);

    // Ajout de l'image et du titre à la carte de recommandation
    linkElement.appendChild(recommendationImage);
    linkElement.appendChild(recommendationTitleDiv);
    recommendationCard.appendChild(linkElement);

    // Ajout de la carte de recommandation au conteneur
    relationsSwiper.appendChild(recommendationCard);
  });
}

// CHARACTERES FUNCTION -------------
// Fonction pour afficher les personnages
function displayCharacters(media) {
  // Sélection de l'élément HTML
  const characterContainer = document.querySelector('.overviewBlockCharacteres ');

  // Parcours des personnages et création des cartes correspondantes
  media.characters.edges.forEach((character, index) => {
    if (index < 5) {
      const characterNode = character.node;
      const characterCard = createCharacterCard(characterNode);
      characterContainer.appendChild(characterCard);
    }
  });
}

// Fonction pour afficher tous les personnages
function displayAllCharacters(media) {
  // Sélection de l'élément HTML
  const characterContainer = document.querySelector('.characteresBlock .cardBlock');

  // Parcours des personnages et création des cartes correspondantes
  media.characters.edges.forEach((character) => {
    const characterNode = character.node;
    const characterCard = createCharacterCard(characterNode);
    characterContainer.appendChild(characterCard);
  });
}

// Fonction pour créer une carte de personnage
function createCharacterCard(character) {
  // Création des éléments HTML de la carte de personnage
  const characterCard = document.createElement('div');
  characterCard.classList.add('personCard');

  const characterImageLink = document.createElement('a');
  characterImageLink.href = character.siteUrl;

  const characterImage = document.createElement('img');
  characterImage.src = character.image.medium;
  characterImage.alt = '';

  const characterInfo = document.createElement('div');
  characterInfo.classList.add('infoItemQuery');

  const characterName = document.createElement('p');
  characterName.textContent = character.name.full;

  const characterRole = document.createElement('span');
  characterRole.textContent = character.role;

  characterName.appendChild(characterRole); // Ajout du rôle dans le paragraphe

  // Ajout des éléments à la carte de personnage
  characterImageLink.appendChild(characterImage);
  characterInfo.appendChild(characterName);

  characterCard.appendChild(characterImageLink);
  characterCard.appendChild(characterInfo);

  return characterCard;
}

// ...








// Récupération de l'ID à partir de l'URL
const mediaId = mediaIdurl;

if (mediaId) {
  // Construction de la query avec la variable
  const query = `
    query ($mediaId: Int) {
      Media(id: $mediaId) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        bannerImage
        trailer {
          site
          thumbnail
        }
        description
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        status
        format
        episodes
        chapters
        volumes
        averageScore
        genres
        staff {
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              languageV2
              image {
                large
              }
            }
          }
        }
        characters {
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              image {
                medium
              }
              siteUrl
            }
          }
        }
        reviews {
          edges {
            node {
              id
              rating
              summary
              body
              user {
                id
                name
              }
            }
          }
        }
        recommendations {
          edges {
            node {
              mediaRecommendation {
                id
                title {
                  english
                  native
                }
                coverImage {
                  extraLarge
                }
              }
              rating
              userRating
            }
          }
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                english
                native
              }
              coverImage {
                extraLarge
              }
            }
          }
        }
      }
    }
  `;

  // Fonction pour récupérer les données du média
  async function getMediaData() {
    const variables = {
      mediaId: mediaIdurl,
    };

    try {
      const data = await fetchData(query, variables);
      const media = data.data.Media;
      displayMediaData(media);
      displayRelations(media);
      displayRecommendations(media);
      displayCharacters(media);
      displayAllCharacters(media);
      console.log(media); // Affichage des données du média
    } catch (error) {
      console.log(error);
    }
  }

  // Fonction générique pour effectuer une requête GraphQL
  async function fetchData(query, variables) {
    const url = 'https://graphql.anilist.co';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.errors[0].message);
    }
  }

  getMediaData();
} else {
  console.log('Media ID not found in the URL.');
}
