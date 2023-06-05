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
    overviewBlock.style.display = 'flex'; // Modifier le display en 'none'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'block'
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
  relationTitle.textContent = relationNode.title.english || relationNode.title.romaji || relationNode.title.native;

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
    recommendationCard.title= recommendationNode.mediaRecommendation.title.english || recommendationNode.mediaRecommendation.title.romaji|| recommendationNode.mediaRecommendation.title.native;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + recommendationId; // URL with the ID as a parameter

    // Création de l'image de la recommandation
    const recommendationImage = document.createElement('img');
    recommendationImage.src = recommendationNode.mediaRecommendation.coverImage.extraLarge;
    recommendationImage.alt = '';

    // Création du titre de la recommandation
    const recommendationTitle = document.createElement('p');
    recommendationTitle.textContent = recommendationNode.mediaRecommendation.title.english || recommendationNode.mediaRecommendation.title.romaji || recommendationNode.mediaRecommendation.title.native;

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
      const characterRolee = character.role;
      const characterCard = createCharacterCard(characterNode, characterRolee);
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
    const characterRolee = character.role;
    const characterCard = createCharacterCard(characterNode, characterRolee);
    characterContainer.appendChild(characterCard);
  });

}

// Fonction pour créer une carte de personnage
function createCharacterCard(character, characterRolee) {
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
  characterRole.textContent = characterRolee;

  characterName.appendChild(characterRole); // Ajout du rôle dans le paragraphe

  // Ajout des éléments à la carte de personnage
  characterImageLink.appendChild(characterImage);
  characterInfo.appendChild(characterName);

  characterCard.appendChild(characterImageLink);
  characterCard.appendChild(characterInfo);

  return characterCard;
}

// STAFF FUNCTION -----

// Fonction pour afficher les membres du staff (5 premiers)
function displayStaff(media) {
  // Sélection de l'élément HTML
  const staffContainer = document.querySelector('.overviewBlockStaff');

  // Parcours des membres du staff et création des cartes correspondantes (5 premiers)
  media.staff.edges.slice(0, 5).forEach((staffMember) => {
    const staffNode = staffMember.node;
    const staffRole = staffMember.role;
    const staffCard = createStaffCard(staffNode, staffRole);
    staffContainer.appendChild(staffCard);
  });
}

// Fonction pour afficher tous les membres du staff
function displayAllStaff(media) {
  // Sélection de l'élément HTML
  const staffContainer = document.querySelector('.staffBlock .cardBlock');

  // Parcours des membres du staff et création des cartes correspondantes
  media.staff.edges.forEach((staffMember) => {
    const staffNode = staffMember.node;
    const staffRole = staffMember.role;
    const staffCard = createStaffCard(staffNode, staffRole);
    staffContainer.appendChild(staffCard);
  });
}

// Fonction pour créer une carte de membre du staff
function createStaffCard(staffMember, staffRole) {
  // Création des éléments HTML de la carte du membre du staff
  const staffCard = document.createElement('div');
  staffCard.classList.add('personCard');

  const staffImageLink = document.createElement('a');
  staffImageLink.href = staffMember.siteUrl;

  const staffImage = document.createElement('img');
  staffImage.src = staffMember.image.large;
  staffImage.alt = '';

  const staffInfo = document.createElement('div');
  staffInfo.classList.add('infoItemQuery');

  const staffName = document.createElement('p');
  staffName.textContent = staffMember.name.full;

  const staffPosition = document.createElement('span');
  staffPosition.textContent = staffRole;

  staffName.appendChild(staffPosition); // Ajout du poste dans le paragraphe

  // Ajout des éléments à la carte du membre du staff
  staffImageLink.appendChild(staffImage);
  staffInfo.appendChild(staffName);

  staffCard.appendChild(staffImageLink);
  staffCard.appendChild(staffInfo);

  return staffCard;
}



// REVIEWS FUNCTIONS ----


function displayReviews(media) {
  const reviewsContainer = document.querySelector('.reviewsCardBlock');
  media.reviews.edges.forEach((review) => {
    const reviewNode = review.node;
    const reviewCard = createReviewCard(reviewNode);
    reviewsContainer.appendChild(reviewCard);
  });
}

function createReviewCard(review) {
  const reviewCard = document.createElement('div');
  reviewCard.classList.add('reviewCard');

  const userAvatar = document.createElement('img');
  userAvatar.src = review.user.avatar.large;
  userAvatar.alt = 'User Avatar';
  reviewCard.appendChild(userAvatar);

  const reviewText = document.createElement('div');
  reviewText.classList.add('reviewCard--txt');

  const reviewContent = document.createElement('p');
  reviewContent.textContent = '" '+ review.summary + ' "';

  const reviewLink = document.createElement('a');
  reviewLink.href = review.siteUrl;
  reviewLink.appendChild(reviewContent);

  reviewText.appendChild(reviewLink);
  reviewCard.appendChild(reviewText);

  return reviewCard;
}


// SOCIALS FUNCTION -------------
function displaySocials(media) {
  // Sélection de l'élément HTML
  const socialsContainer = document.querySelector('.overviewBlock--socials');

  // Parcours des liens sociaux et création des éléments HTML correspondants
  media.externalLinks.forEach((link) => {
    const socialLink = document.createElement('a');
    socialLink.href = link.url;
    socialLink.textContent = link.site;

    socialsContainer.appendChild(socialLink);
  });
}

// TRAILER FUNCTION -------------
function displayTrailer(media) {
  // Sélection de l'élément HTML
  const trailerContainer = document.querySelector('.overviewBlock--trailers');
  const overviewBlockTrailer = document.querySelector('.overviewBlockTrailer');

  // Vérification de la présence du trailer
  if (media.trailer) {
    const trailerThumbnail = media.trailer.thumbnail;
    const trailerSite = media.trailer.site;

    // Création de l'élément <img> avec le thumbnail et le site en tant que titre
    const trailerImage = document.createElement('img');
    trailerImage.src = trailerThumbnail;
    trailerImage.alt = '';
    trailerImage.title = trailerSite;

    // Ajout de l'élément <img> à la section des trailers
    trailerContainer.appendChild(trailerImage);
  } else {
    // Si le média n'a pas de trailer, masquer le bloc "overviewBlockTrailer"
    overviewBlockTrailer.style.display = 'none';
  }
}







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
              summary
              body
              user {
                name
                avatar{
                  large
                }
              }
              siteUrl
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
                  romaji
                  native
                }
                coverImage {
                  extraLarge
                }
              }
            }
          }
        }
        studios {
          edges {
            node {
              id
              name
            }
          }
        }
        source
        externalLinks {
          site
          url
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                english
                romaji
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
      displayStaff(media);
      displayAllStaff(media);
      displayReviews(media);
      displaySocials(media);
      displayTrailer(media);
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
