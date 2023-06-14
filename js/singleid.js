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




// ::::::::::: //

// FUNCTION ACTIVE CLASS TITRE-----
function setActiveLinkTitle(clickedLink) {
  const links = document.querySelectorAll('.itemBlock--content__rubiqres a');

  links.forEach(function(link) {
    link.classList.remove('active');
    
    // Vérifie si la classe de l'élément cliqué correspond à celle du lien
    if (link.classList.contains(clickedLink.classList[0])) {
      link.classList.add('active');
    }
  });
}

const titles = document.querySelectorAll('.characteresTitle, .staffTitle'); // Sélectionnez tous les titres nécessaires

titles.forEach(function(title) {
  title.addEventListener('click', function(event) {
    event.preventDefault();
    setActiveLinkTitle(title);
  });
});


// BLOCK APPARITION----------

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

    setActiveLinkTitle(this);
});

// CHARACTERES BLOCK ACTION 
const characteresTitles = document.querySelectorAll('.characteresTitle');
const characteresBlock = document.querySelector('.characteresBlock');

characteresTitles.forEach(function(characteresTitle) {
  characteresTitle.addEventListener('click', function(event) {
    event.preventDefault();
    characteresBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    staffBlock.style.display = 'none'; // Modifier le display en 'block'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
    setActiveLinkTitle(this);
  });
});


// STAFF BLOCK ACTION 
const staffTitles = document.querySelectorAll('.staffTitle');
const staffBlock = document.querySelector('.staffBlock');

staffTitles.forEach(function(staffTitle) {
  staffTitle.addEventListener('click', function(event) {
    event.preventDefault();
    staffBlock.style.display = 'block'; // Modifier le display en 'none'
    overviewBlock.style.display = 'none'; // Modifier le display en 'block'
    characteresBlock.style.display = 'none'; // Modifier le display en 'none'
    reviewsBlock.style.display = 'none'; // Modifier le display en 'none'
    setActiveLinkTitle(this);
  });
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
    setActiveLinkTitle(this);
});




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Récupérer valeur de l'ID à partir des paramètres de l'URL
const mediaIdurl = urlParams.get('id');


console.log(mediaIdurl);

// Fonction pour extraire l'ID de l'URL
function getMediaIdFromURL() {
  const url = window.location.href;
  const regex = /\/item\/(\d+)/; // extraire l'ID de l'URL
  const match = url.match(regex);
  if (match && match[1]) {
    return parseInt(match[1]);
  }
  return null;
}


// ---------- API----------

// HEADER FUNCTION -------------
function displayMediaData(media) {
  // Sélection des éléments HTML
  const bannerImage = document.querySelector('.itemBlock--img img');
  const coverImage = document.querySelector('.itemBlock--content__img img');
  const titleElement = document.querySelector('.itemBlock--content__title h5');
  const descriptionElement = document.querySelector('.itemBlock--content__title p');

  if (media.bannerImage) {
    bannerImage.src = media.bannerImage;
  } else {
    bannerImage.src = 'img/404.png';
    bannerImage.style.objectFit = 'contain';
  }
  coverImage.src = media.coverImage.extraLarge;
  titleElement.textContent = media.title.english;
  const cleanedDescription = media.description.replace(/<br>/gi, '').replace(/<\/br>/gi, '').replace(/<i>/gi, '').replace(/<\/i>/gi, '').replace(/<\/a>/gi, '').replace(/<a\s+(?:[^>]*?\s+)?href=(['"])(?:.(?!\1))*.\1[^>]*?>/gi, '');
  
  // Afficher la description nettoyée
  descriptionElement.textContent = cleanedDescription;
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
    linkElement.href = 'item.html?id=' + relationId; // URL with the ID as a parameter

  // Création de l'image de la relation
  const relationImage = document.createElement('img');
  relationImage.src = relationNode.coverImage.extraLarge;
  relationImage.alt = 'cover';

  // Création du titre de la relation
  const relationTitle = document.createElement('p');
  relationTitle.textContent = relationNode.title.english || relationNode.title.romaji || relationNode.title.native;

  var relationTitleDiv = document.createElement('div'); 
  relationTitleDiv.classList.add('titleOf');
  relationTitleDiv.appendChild(relationTitle);
  
  if (relationTitle.textContent.length > 20) {
    relationTitle.classList.add('marquee');
  }
  
  // Ajout de l'image et du titre à la carte de relation
  linkElement.appendChild(relationImage);
  linkElement.appendChild(relationTitleDiv);
  relationCard.appendChild(linkElement)
  
  // Ajout de la carte de relation au conteneur
  relationsSwiper.appendChild(relationCard);
});

}
// HIDDEN RELATIONS BLOCK -----
function hideRelationsBlockIfEmpty() {
  const relationsSwiper = document.getElementById('relationsSwiper');
  const relationsBlockSwiper = document.querySelector('.relationsBlockSwiper');
  const relationsBlockTitle = document.querySelector('.relationsBlockTitle');

  if (relationsSwiper.children.length === 0) {
    relationsBlockSwiper.style.display = 'none';
    relationsBlockTitle.style.display = 'none';
  } else {
    relationsBlockSwiper.style.display = ''; // Rétablir l'affichage si nécessaire
    relationsBlockTitle.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}


// RECOMMENDATIONS FUNCTION -------------

function displayRecommendations(media) {
  
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
    linkElement.href = 'item.html?id=' + recommendationId; 

    // Création de l'image de la recommandation
    const recommendationImage = document.createElement('img');
    recommendationImage.src = recommendationNode.mediaRecommendation.coverImage.extraLarge;
    recommendationImage.alt = '';

    // Création du titre de la recommandation
    const recommendationTitle = document.createElement('p');
    recommendationTitle.textContent = recommendationNode.mediaRecommendation.title.english || recommendationNode.mediaRecommendation.title.romaji || recommendationNode.mediaRecommendation.title.native;

    var recommendationTitleDiv = document.createElement('div'); 
    recommendationTitleDiv.classList.add('titleOf');
    recommendationTitleDiv.appendChild(recommendationTitle);

    if (recommendationTitle.textContent.length > 20) {
      recommendationTitle.classList.add('marquee');
    }
    // Ajout de l'image et du titre à la carte de recommandation
    linkElement.appendChild(recommendationImage);
    linkElement.appendChild(recommendationTitleDiv);
    recommendationCard.appendChild(linkElement);

    // Ajout de la carte de recommandation au conteneur
    relationsSwiper.appendChild(recommendationCard);
  });
}

// HIDDEN RECOMMENDATIONS --------
function hideRecommendationsBlockIfEmpty() {
  const recommendationsSwiper = document.getElementById('recommendationsSwiper');
  const recommendationsBlock = document.querySelector('.recommendationsBlock');

  if (recommendationsSwiper.children.length === 0) {
    recommendationsBlock.style.display = 'none';
  } else {
    recommendationsBlock.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}


// CHARACTERES FUNCTION -------------
// Fonction pour afficher les personnages
function displayCharacters(media) {
  
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

function hideCharacterBlockIfEmpty() {
  const characterContainer = document.querySelector('.overviewBlockCharacteres');
  const characterBlock = document.querySelector('.characteresOverviewBlock');

  if (characterContainer.children.length === 0) {
    characterBlock.style.display = 'none';
  } else {
    characterBlock.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}


// Fonction pour afficher tous les personnages
function displayAllCharacters(media) {
  
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

  characterName.appendChild(characterRole); // Ajout du rôle 

  // Ajout des éléments à la carte  personnage
  characterImageLink.appendChild(characterImage);
  characterInfo.appendChild(characterName);

  characterCard.appendChild(characterImageLink);
  characterCard.appendChild(characterInfo);

  return characterCard;
}

// STAFF FUNCTION -----

// Fonction pour afficher les membres du staff (5 premiers)
function displayStaff(media) {
  
  const staffContainer = document.querySelector('.overviewBlockStaff');

  // Parcours des membres du staff et création des cartes correspondantes (5 premiers)
  media.staff.edges.slice(0, 5).forEach((staffMember) => {
    const staffNode = staffMember.node;
    const staffRole = staffMember.role;
    const staffCard = createStaffCard(staffNode, staffRole);
    staffContainer.appendChild(staffCard);
  });
}

function hideStaffBlockIfEmpty() {
  const staffContainer = document.querySelector('.overviewBlockStaff');
  const staffBlock = document.querySelector('.staffOverviewBlock');

  if (staffContainer.children.length === 0) {
    staffBlock.style.display = 'none';
  } else {
    staffBlock.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}


// Fonction pour afficher tous les membres du staff
function displayAllStaff(media) {
  
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

  staffName.appendChild(staffPosition); // Ajout du poste dans paragraphe

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
  
  const socialsContainer = document.querySelector('.overviewBlock--socials');

  // Parcours des liens sociaux et création des éléments HTML correspondants
  media.externalLinks.forEach((link) => {
    const socialLink = document.createElement('a');
    socialLink.href = link.url;
    socialLink.textContent = link.site;

    socialsContainer.appendChild(socialLink);
  });
}
// HIDDEN SOCIAL BLOCK ------
function hideSocialsBlockIfEmpty() {
  const socialsContainer = document.querySelector('.overviewBlock--socials');
  const socialsBlock = document.querySelector('.socialsBlock');

  if (socialsContainer.children.length === 0) {
    socialsBlock.style.display = 'none';
  } else {
    socialsBlock.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}

// TRAILER FUNCTION -------------
function displayTrailer(media) {
  
  const trailerContainer = document.querySelector('.overviewBlock--trailers');
  const overviewBlockTrailer = document.querySelector('.overviewBlockTrailer');

  // Vérification  présence du trailer
  if (media.trailer) {
    const trailerThumbnail = media.trailer.thumbnail;
    const trailerSite = media.trailer.site;

    const trailerImage = document.createElement('img');
    trailerImage.src = trailerThumbnail;
    trailerImage.alt = 'Thumbnail';
    trailerImage.title = trailerSite;


    const trailerLink = document.createElement('a');
    trailerLink.href = 'https://www.youtube.com/@CrunchyrollCollection';
    trailerLink.appendChild(trailerImage);

  
    trailerContainer.appendChild(trailerLink);
  } else {
    // Si média n'a pas de trailer = masquer le bloc "overviewBlockTrailer"
    overviewBlockTrailer.style.display = 'none';
  }
}



// FORMAT FUNCTION -------------
function displayFormat(media) {

  const formatElement = document.querySelector('.formatQuery p span');
  // Mise à jour du format
  formatElement.textContent = media.format;
}
// STATUS FUNCTION -------------
function displayStatus(media) {

  const statusElement = document.querySelector('.statusQuery p span');
  // Mise à jour du format
  statusElement.textContent = media.status ;
}
// START FUNCTION -------------
function displayStartDate(media) {
  const moisEcrits = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const startElement = document.querySelector('.startQuery p span');
  // Mise à jour du format
  startElement.textContent = moisEcrits[media.startDate.month - 1]  + ' ' + media.startDate.day  + ','+ ' ' +media.startDate.year ;
}

// END FUNCTION -------------
function displayEndDate(media) {
  const moisEcrits = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
const endElement = document.querySelector('.endQuery p span');

if (media.endDate.month !== undefined && media.endDate.day !== null && media.endDate.year !== null) {
  // Mise à jour du format
  endElement.textContent = moisEcrits[media.endDate.month - 1] + ' ' + media.endDate.day + ', ' + media.endDate.year;
} else {
  // Masquer la div .endQuery
  const endQueryDiv = document.querySelector('.endQuery');
  endQueryDiv.style.display = 'none';
}

}

// STUDIO OR SOURCE  FUNCTION -------------
function displaySourceOrStudio(media) {
  
  const sourceOrStudioElement = document.querySelector('.studioQuery p span');
  const pElement = document.querySelector('.studioQuery p');
  
  if (media.format === 'MANGA') {
    sourceOrStudioElement.textContent = media.source;
    pElement.innerHTML = ` Source <span>${sourceOrStudioElement.textContent}</span> `;
  } else if (media.studios.edges.length > 0) {
    sourceOrStudioElement.textContent = media.studios.edges[0].node.name;
  } 
}

// GENRES FUNCTION -------------
function displayGenres(media) {
  
  const pElement = document.querySelector('.genresQuery p');

  if (media.genres.length > 0) {
    for (let i = 0; i < media.genres.length; i++) {
      const spanElement = document.createElement('span');
      spanElement.textContent = media.genres[i];
      pElement.appendChild(spanElement);


      if (i < media.genres.length - 1) {
        const commaElement = document.createTextNode(' ');
        pElement.appendChild(commaElement);
      }
    }
  } else {
    pElement.textContent = 'Unknown';
  }
}

// CHAPTERS FUNCTION -------------
function displayChapters(media) {

    
    const chaptersElement = document.querySelector('.chaptersQuery p span');
    // Mise à jour du format
    chaptersElement.textContent = media.chapters ;
}
  
// VOLUMES FUNCTION -------------
function displayVolumes(media) {

    const volumesElement = document.querySelector('.volummesQuery p span');
    // Mise à jour du format
   volumesElement.textContent = media.volumes ;
}
  


function displayEpisodes(media) {
  
  const episodesElement = document.querySelector('.episodesQuery p span');
  const pElement = document.querySelector('.episodesQuery p');

  if (media.episodes === 1) {
    episodesElement.textContent = media.episodes;
    pElement.innerHTML = `Film <span>${episodesElement.textContent}</span> `;
  } else {
    episodesElement.textContent = media.episodes;
  }
}


// DURATION FUNCTION -------------
function displayDuration(media) {

  const spanElement = document.querySelector('.durationQuery p span');
  

  const durationQueryDiv = document.querySelector('.durationQuery');

  // Vérifie si la durée est null ou inférieure à 60 minutes
  if (media.duration === null || media.duration < 60) {
    spanElement.textContent = media.duration + ' min';
  } else {
    // Calculer les heures et les minutes
    const hours = Math.floor(media.duration / 60);
    const minutes = media.duration % 60;

    // transformation en "h min"
    let durationString = '';
    if (hours > 0) {
      durationString += hours + 'h ';
    }
    durationString += minutes + 'min';

    spanElement.textContent = durationString;
  }

  // Masquer la div si la durée est null
  if (media.duration === null) {
    durationQueryDiv.style.display = 'none';
  } else {
    durationQueryDiv.style.display = ''; // Rétablir l'affichage si nécessaire
  }
}




  

// SCORE FUNCTION -------------
function displayScore(media) {
  
  const scoreElement = document.querySelector('.scoreQuery p span');
  // Mise à jour du format
  scoreElement.textContent = media.averageScore + '%'+ ' ' +'❤';
}

// ROMAJI TITLE FUNCTION -------------
function displayRomaji(media) {

  const romajiElement = document.querySelector('.romajiQuery p span');
  // Mise à jour du format
  romajiElement.textContent = media.title.romaji ;
}

// NATIVE TITLE FUNCTION -------------
function displayNative(media) {

  
  const scoreElement = document.querySelector('.nativeQuery p span');
  // Mise à jour du format
  scoreElement.textContent = media.title.native ;
}


function hideEmptyInformationBlocks() {
  // Sélection de toutes les divs "infoItemQuery" dans "itemInfosWrapper"
  const infoItemQueries = document.querySelectorAll('.itemInfosWrapper .infoItemQuery');

  // Parcours de chaque div
  infoItemQueries.forEach((infoItemQuery) => {
    // Sélection span à l'intérieur de la div
    const spanElement = infoItemQuery.querySelector('span');

    // Vérifie si le span est vide ou contient "NULL MIN"
    if (!spanElement.textContent.trim()) {
      // Masquage du div parent
      infoItemQuery.style.display = 'none';
    }
  });
}









// Récupération de l'ID à partir de l'URL
const mediaId = mediaIdurl;

if (mediaId) {

  const query = `
    query ($mediaId: Int) {
      Media(id: $mediaId) {
        id
        type
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
        duration
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
      displayFormat(media);
      displayStatus(media);
      displayStartDate(media);
      displayEndDate(media);
      displaySourceOrStudio(media);
      displayGenres(media);
      displayChapters(media);
      displayVolumes(media);
      displayEpisodes(media);
      displayDuration(media);
      displayScore(media);
      displayRomaji(media);
      displayNative(media);
      hideSocialsBlockIfEmpty();
      hideRelationsBlockIfEmpty();
      hideRecommendationsBlockIfEmpty();
      hideEmptyInformationBlocks();
      hideCharacterBlockIfEmpty();
      hideStaffBlockIfEmpty();
      console.log(media); 
    } catch (error) {
      console.log(error);
    }
  }

  // Fonction pour effectuer une requête GraphQL
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







let mediaList = [];


// Fonction appelée lors du clic sur le bouton "Add"
function addToMediaList() {
  // Récupérer l'ID du média (si déjà stocké dans "mediaId")
  if (mediaId) {
    // Vérifier si le média n'est pas déjà dans la liste
    if (!mediaList.includes(mediaId)) {
      // Ajouter l'ID du média à la liste
      mediaList.push(mediaId);

      localStorage.setItem('mediaList', JSON.stringify(mediaList));

      // Masquer le bouton "Add" et afficher le bouton "Remove"
      document.querySelector('.addListbtn').style.display = 'none';
      document.querySelector('.removeListbtn').style.display = '';
      

      console.log('Media added to the list:', mediaId);
      console.log('Media List:', mediaList);
    } else {
      console.log('Media already exists in the list:', mediaId);
    }
  } else {
    console.log('Media ID not found.');
  }
}


// Fonction appelée lors du clic sur le bouton "Remove"
function removeFromMediaList() {
  // Supprimer l'ID du média de la liste
  const index = mediaList.indexOf(mediaId);
  if (index > -1) {
    mediaList.splice(index, 1);

    // Mettre à jour le local storage avec la nouvelle liste
    localStorage.setItem('mediaList', JSON.stringify(mediaList));

    // Masquer le bouton "Remove" et afficher le bouton "Add"
    document.querySelector('.removeListbtn').style.display = 'none';
    document.querySelector('.addListbtn').style.display = '';
    console.log('Media removed from the list:', mediaId);
    console.log('Media List:', mediaList);
  } else {
    console.log('Media does not exist in the list:', mediaId);
  }
}

console.log(mediaList);
// Attacher les fonctions aux événements de clic sur les boutons
document.querySelector('.addListbtn').addEventListener('click', addToMediaList);
document.querySelector('.removeListbtn').addEventListener('click', removeFromMediaList);




// Récupérer les données du local storage lors du chargement de la page
window.addEventListener('load', function() {
  const storedMediaList = localStorage.getItem('mediaList');

  if (storedMediaList) {
    mediaList = JSON.parse(storedMediaList);

    // Mets à jour l'affichage des boutons en fonction de mediaList
    if (mediaList.includes(mediaId)) {
      document.querySelector('.addListbtn').style.display = 'none';
      document.querySelector('.removeListbtn').style.display = '';
    } else {
      document.querySelector('.removeListbtn').style.display = 'none';
      document.querySelector('.addListbtn').style.display = '';
    }
  }
});

