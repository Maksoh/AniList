// SWIPER JS 

var swiper = new Swiper(".headerBloc--news", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

var swiper = new Swiper(".popularBlock--slider", {
    slidesPerView: 6,
    spaceBetween: 20,
    freeMode: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      1201: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },

});


// TITLE EFFECT 



// NAV SCROLL 
var navigation = document.querySelector('.navigation');
var lastScrollPosition = window.pageYOffset;

window.addEventListener('scroll', function() {
  var currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
    // L'utilisateur fait défiler vers le haut
    navigation.classList.remove('scrolled-down');
    navigation.classList.add('scrolled-up');
  } else if (currentScrollPosition < lastScrollPosition) {
    // L'utilisateur fait défiler vers le bas
    navigation.classList.remove('scrolled-up');
    navigation.classList.add('scrolled-down');
  }

  lastScrollPosition = currentScrollPosition;
});

// API -----

// Fonction pour récupérer les animes au format "Movie"
async function getMovieAnime() {
  const queryMovieAnime = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: ANIME, format: MOVIE, sort: POPULARITY_DESC) {
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
    page: 1,
    perPage: 18,
  };

  try {
    const data = await fetchData(queryMovieAnime, variables);
    const movieAnime = data.data.Page.media;
    displayMovieAnime(movieAnime);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les animes au format "Movie"
function displayMovieAnime(results) {
  const swiperWrapper = document.getElementById('movieAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

// Appel de la fonction pour récupérer les animes au format "Movie"
getMovieAnime();


// Fonction pour récupérer les mangas au format One-Shot
async function getOneShotManga() {
  const queryOneShotManga = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(type: MANGA, format: ONE_SHOT, sort: POPULARITY_DESC) {
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
    page: 1,
    perPage: 18,
  };

  try {
    const data = await fetchData(queryOneShotManga, variables);
    const oneShotManga = data.data.Page.media;
    displayOneShotManga(oneShotManga);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les mangas au format One-Shot
function displayOneShotManga(results) {
  const swiperWrapper = document.getElementById('oneShotManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}




// Fonction pour récupérer les données des mangas populaires de genre "Ecchi"
async function getPopularEcchiManga() {
  const queryPopularEcchiManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: POPULARITY_DESC, genre: "Ecchi") {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          chapters
          volumes
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryPopularEcchiManga, variables);
    const popularEcchiManga = data.data.Page.media;
    displayPopularEcchiManga(popularEcchiManga);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des mangas populaires de genre "Ecchi"
function displayPopularEcchiManga(results) {
  const swiperWrapper = document.getElementById('popularEcchiManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

// Fonction pour récupérer les données des mangas d'origine sud-coréenne
async function getKoreanManga() {
  const queryKoreanManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: POPULARITY_DESC, countryOfOrigin: "KR") {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          chapters
          volumes
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryKoreanManga, variables);
    const koreanManga = data.data.Page.media;
    displayKoreanManga(koreanManga);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des mangas d'origine sud-coréenne
function displayKoreanManga(results) {
  const swiperWrapper = document.getElementById('koreanManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}



// Fonction pour récupérer les données des mangas tendances
async function getTrendingManga() {
  const queryTrendingManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          chapters
          volumes
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryTrendingManga, variables);
    const trendingManga = data.data.Page.media;
    displayTrendingManga(trendingManga);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des mangas tendances
function displayTrendingManga(results) {
  const swiperWrapper = document.getElementById('trendingManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

// Fonction pour récupérer les données des animes tendances
async function getTrendingAnime() {
  const queryTrendingAnime = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: ANIME, sort: TRENDING_DESC) {
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
    page: 1,
  };

  try {
    const data = await fetchData(queryTrendingAnime, variables);
    const trendingAnime = data.data.Page.media;
    displayTrendingAnime(trendingAnime);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes tendances
function displayTrendingAnime(results) {
  const swiperWrapper = document.getElementById('trendingAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

// Fonction pour récupérer les données des manwha tendances
async function getTrendingMusic() {
  const queryTrendingMusic = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: POPULARITY_DESC, genre: "music") {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          chapters
          volumes
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryTrendingMusic, variables);
    const trendingMusic = data.data.Page.media;
    displayTrendingMusic(trendingMusic);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des manwha tendances
function displayTrendingMusic(results) {
  const swiperWrapper = document.getElementById('trendingMusic');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
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

// Appel des fonctions pour récupérer les données des mangas, animes et manwha tendances
getTrendingManga();
getTrendingAnime();
getTrendingMusic();
// Appel de la fonction pour récupérer les mangas au format One-Shot
getOneShotManga();
// Appel de la fonction pour récupérer les données des mangas d'origine sud-coréenne
getKoreanManga();
// Appel de la fonction pour récupérer les données des mangas populaires de genre "Ecchi"
getPopularEcchiManga();
// Appel de la fonction pour récupérer les animes au format "Movie"
getMovieAnime();




var queryAllTimePopular = `
  query ($page: Int) {
    Page(page: $page, perPage: 5) {
      media(type: ANIME, sort: SCORE_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        genres
        rankings{
          rank
        }
        averageScore
        format
        status
        episodes
        duration
        startDate{
          year
        }
      }
    }
  }
`;

var queryManga = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: MANGA, sort: POPULARITY_DESC,) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        chapters
        volumes
      }
    }
  }
`;

var queryAnime = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: ANIME, sort: POPULARITY_DESC) {
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


var queryUpcomingAnime = `
  query ($page: Int) {
    Page(page: $page, perPage: 18) {
      media(type: ANIME, sort: POPULARITY_DESC, seasonYear: 2023, season: WINTER) {
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



var variables = {
  page: 1 // Page number, adjust as needed
};

var url = 'https://graphql.anilist.co';
var options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: queryManga,
    variables: variables
  })
};

fetch(url, options)
  .then(function (response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  })
  .then(function (mangaData) {
    handleData(mangaData, 'popularmanga');

    // Fetch anime data
    options.body = JSON.stringify({
      query: queryAnime,
      variables: variables
    });

    return fetch(url, options)
      .then(function (response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then(function (animeData) {
        handleData(animeData, 'popularanime');

        // Fetch upcoming anime data
        options.body = JSON.stringify({
          query: queryUpcomingAnime,
          variables: variables
        });

        return fetch(url, options)
          .then(function (response) {
            return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
            });
          })
          .then(function (upcomingAnimeData) {
            handleData(upcomingAnimeData, 'upcominganime');

            // Fetch all-time popular anime data
            options.body = JSON.stringify({
              query: queryAllTimePopular,
              variables: variables
            });

            return fetch(url, options)
              .then(function (response) {
                return response.json().then(function (json) {
                  return response.ok ? json : Promise.reject(json);
                });
              })
              .then(function (allTimePopularData) {
                handleAllTimePopularData(allTimePopularData, 'alltimepopularAll');
              });
          });
      });
  })
  .catch(function (error) {
    alert('Erreur, consultez la console');
    console.error(error);
  });


// SWIPER FUNCTION 
function handleData(data, containerId) {
  console.log(data);
  var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
  var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper

  if (!swiperWrapper) {
    console.error('Le conteneur', containerId, 'n\'existe pas');
    return;
  }

  for (var i = 0; i < mediaTitles.length; i++) {
    var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
    var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média

    var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitles[i].title.english;
    // swiperSlide.innerHTML = `
    // // <img src="${mediaImage}" alt="cover">
    // <p class="titleOf">${ mediaTitles[i].title.english}</p>
    // `
    // swiperWrapper.appendChild(swiperSlide);
    var imageElement = document.createElement('img'); // Créez un élément img pour l'image
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitles[i].title.english; // Ajoute le titre complet en tant qu'attribut "title" de l'élément "img"
    
    var titleElement = document.createElement('p'); // Créez un élément p pour le titre romaji
    titleElement.textContent = mediaTitle;
    
    var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);
    
    swiperSlide.appendChild(imageElement);
    swiperSlide.appendChild(slideText);
    swiperWrapper.appendChild(swiperSlide);
  }
}

function handleAllTimePopularData(data, containerId) {
  console.log(data);
  var mediaList = data.data.Page.media; // Obtenir la liste des médias à partir des données de réponse
  var container = document.getElementById(containerId); // Sélectionner l'élément de conteneur

  if (!container) {
    console.error('Le conteneur', containerId, 'n\'existe pas');
    return;
  }

  var currentPage = window.location.href; // Obtenir l'URL de la page actuelle

  for (var i = 0; i < mediaList.length; i++) {
    var media = mediaList[i];
    var mediaTitle = media.title.english; // Obtenir le titre anglais du média
    if (mediaTitle.length > 60) {
      mediaTitle = mediaTitle.substring(0, 70) + '...'; // Limiter la longueur du titre à 23 caractères
    }
    var mediaImage = media.coverImage.extraLarge; // Obtenir l'URL de l'image du média
    var mediaRank = media.rankings[0].rank; // Obtenir le classement du média
    var mediaGenres = media.genres; // Obtenir les genres du média

    var element = document.createElement('div'); // Créer un élément div pour le média
    element.classList.add('headerBlock--top__element'); // Ajouter votre classe personnalisée souhaitée ici
    element.title = mediaTitle;

    var imageWrapper = document.createElement('div'); // Créer un élément div pour envelopper l'image
    imageWrapper.classList.add('headerBlock--top__elmentImg'); // Ajouter votre classe personnalisée souhaitée ici

    var imageElement = document.createElement('img'); // Créer un élément img pour l'image
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageWrapper.appendChild(imageElement);
    element.appendChild(imageWrapper);

    var contentWrapper = document.createElement('div'); // Créer un élément div pour envelopper le contenu
    contentWrapper.classList.add('headerBlock--top__elmentTxt'); // Ajouter votre classe personnalisée souhaitée ici

    var rankElement = document.createElement('h4'); // Créer un élément h4 pour le classement
    rankElement.textContent = mediaRank + '.';
    rankElement.classList.add('rank'); // Ajouter votre classe personnalisée souhaitée ici
    contentWrapper.appendChild(rankElement);

    var titleElement = document.createElement('p'); // Créer un élément p pour le titre
    titleElement.classList.add('titleOf'); // Ajouter votre classe personnalisée souhaitée ici
    titleElement.textContent = mediaTitle;
    contentWrapper.appendChild(titleElement);

    var tagsElement = document.createElement('div'); // Créer un élément div pour les balises
    tagsElement.classList.add('genres'); // Ajouter votre classe personnalisée souhaitée ici

    for (var j = 0; j < 2 && j < mediaGenres.length; j++) {
      var genre = mediaGenres[j];
      var tagElement = document.createElement('span'); // Créer un élément span pour chaque genre
      tagElement.textContent = genre;
      tagsElement.appendChild(tagElement);
    }

    contentWrapper.appendChild(tagsElement);
    element.appendChild(contentWrapper);

    if (currentPage.includes('search-manga')) {
      var infoWrapper = document.createElement('div');
      infoWrapper.classList.add('infoWrapper');
    
      var statusWrapper = document.createElement('div');
      statusWrapper.classList.add('infoItemQuery');
      
      var statusElement = document.createElement('p'); 
      statusElement.textContent = media.averageScore + '%';
      
      statusWrapper.appendChild(statusElement);
      
      infoWrapper.appendChild(statusWrapper);
    
      var episodesWrapper = document.createElement('div');
      episodesWrapper.classList.add('infoItemQuery');
      
      var episodesElement = document.createElement('p');
      episodesElement.textContent = media.format;
      
      var episodesSpan = document.createElement('span');
      if (media.episodes > 1) {
        episodesSpan.textContent = media.episodes + 'épisodes';
      } else {
        episodesSpan.textContent = media.episodes+ 'film';
      }
      
      episodesElement.appendChild(episodesSpan);
      episodesWrapper.appendChild(episodesElement);
      
      infoWrapper.appendChild(episodesWrapper);
    
      var formatWrapper = document.createElement('div');
      formatWrapper.classList.add('infoItemQuery');
      
      var formatElement = document.createElement('p');
      formatElement.textContent = media.startDate.year;
      
      var formatSpan = document.createElement('span');
      formatSpan.textContent = media.status;
      
      formatElement.appendChild(formatSpan);
      formatWrapper.appendChild(formatElement);
      
      infoWrapper.appendChild(formatWrapper);
    
      element.appendChild(infoWrapper);
    }

    container.appendChild(element);
  }
}
