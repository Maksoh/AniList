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



// API -----



// Fonction pour récupérer les détails d'un média à partir de son ID
async function getMediaDetails(mediaId) {
  const queryMediaDetails = `
    query ($mediaId: Int) {
      Media(id: $mediaId) {
        title {
          romaji
          english
          native
        }
       bannerImage
      }
    }
  `;

  const variables = {
    mediaId: mediaId,
  };

  try {
    const data = await fetchData(queryMediaDetails, variables);
    const media = data.data.Media;
    return media;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fonction pour afficher les médias 
async function displayMediaInSlide(mediaId, slideIndex) {
  const swiperSlides = document.querySelectorAll('.swiper-slide');

  if (slideIndex >= 0 && slideIndex < swiperSlides.length) {
    const swiperSlide = swiperSlides[slideIndex];
    const imageElement = swiperSlide.querySelector('img');
    const titleElement = swiperSlide.querySelector('h1');
    const discoverLink = swiperSlide.querySelector('.slider--btn');

    // Récupérer les détails du média à partir de son ID
    const media = await getMediaDetails(mediaId);

    if (media) {
      const mediaTitle = media.title.english || media.title.romaji || media.title.native;
      const mediaImage = media.bannerImage;

      // Modifier les attributs src, alt et title de l'image
      imageElement.src = mediaImage;
      imageElement.alt = mediaTitle;
      imageElement.title = mediaTitle;

      // Modifier le contenu du titre
      titleElement.textContent = mediaTitle;

      // Modifier l'URL du lien de découverte
      discoverLink.href = `item.html?id=${mediaId}`;
    }
  }
}

// Appel  fonction pour afficher les médias spécifiés 
displayMediaInSlide(74347, 0); // Affiche le media 74347 dans la première 
displayMediaInSlide(87170, 1); // Affiche le media 87170 dans la deuxième 
displayMediaInSlide(30664, 2); // Affiche le media 30664 dans la troisième 
displayMediaInSlide(85316, 3); // Affiche le media 85316 dans la quatrième 







async function getAllTimePopularManga() {
  const queryAllTimePopularManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 5) {
        media(type: MANGA, sort: SCORE_DESC) {
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
          rankings {
            rank
          }
          averageScore
          format
          status
          chapters
          startDate {
            year
          }
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryAllTimePopularManga, variables);
    const allTimePopularManga = data.data.Page.media;
    displayAllTimePopularManga(allTimePopularManga);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function displayAllTimePopularManga(results) {
  const container = document.getElementById('AllTimePopularManga');
  const isSearchMangaPage = (window.location.pathname === '/search.html'); // Vérifie si l'URL correspond 

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaRank = result.rankings[0].rank;
    const mediaGenres = result.genres;

    const element = document.createElement('div');
    element.classList.add('headerBlock--top__element');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('headerBlock--top__elmentImg');

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageWrapper.appendChild(imageElement);
    element.appendChild(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('headerBlock--top__elmentTxt');

    const rankElement = document.createElement('h4');
    rankElement.textContent = mediaRank + '.';
    contentWrapper.appendChild(rankElement);

    const linkElement = document.createElement('a');
    linkElement.href = 'item.html?id=' + result.id; // URL avec l'ID en tant que paramètre

    const titleElement = document.createElement('p');
    titleElement.classList.add('titleOf');
    titleElement.textContent = mediaTitle;
    linkElement.appendChild(titleElement);
    contentWrapper.appendChild(linkElement);

    const tagsElement = document.createElement('div');
    tagsElement.classList.add('genres');

    for (let j = 0; j < 2 && j < mediaGenres.length; j++) {
      const genre = mediaGenres[j];
      const tagElement = document.createElement('span');
      tagElement.textContent = genre;
      tagsElement.appendChild(tagElement);
    }

    contentWrapper.appendChild(tagsElement);
    element.appendChild(contentWrapper);

    // Ajout conditionnels pour la page "search-anime"
    if (isSearchMangaPage) {
      const infoWrapper = document.createElement('div');
      infoWrapper.classList.add('infoWrapper');

      const statusWrapper = document.createElement('div');
      statusWrapper.classList.add('infoItemQuery');

      const statusElement = document.createElement('p');
      statusElement.textContent = result.averageScore + '%';
      statusWrapper.appendChild(statusElement);
      infoWrapper.appendChild(statusWrapper);

      const chaptersWrapper = document.createElement('div');
      chaptersWrapper.classList.add('infoItemQuery');

      const chaptersElement = document.createElement('p');
      chaptersElement.textContent = result.format;

      const chaptersSpan = document.createElement('span');
      if (result.chapters !== null) {
        chaptersSpan.textContent = (result.chapters > 1) ? result.chapters + ' chapitres' : result.chapters + ' chapitre';
      }
      chaptersElement.appendChild(chaptersSpan);
      chaptersWrapper.appendChild(chaptersElement);
      infoWrapper.appendChild(chaptersWrapper);

      const formatWrapper = document.createElement('div');
      formatWrapper.classList.add('infoItemQuery');

      const formatElement = document.createElement('p');
      formatElement.textContent = result.startDate.year;

      const formatSpan = document.createElement('span');
      formatSpan.textContent = result.status;
      formatElement.appendChild(formatSpan);
      formatWrapper.appendChild(formatElement);
      infoWrapper.appendChild(formatWrapper);

      element.appendChild(infoWrapper);
    }

    container.appendChild(element);
  }
  
}


// Fonction TOP 100 ANIME
async function getAllTimePopularAnime() {
  const queryAllTimePopularAnime = `
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
          rankings {
            rank
          }
          averageScore
          format
          status
          episodes
          duration
          startDate {
            year
          }
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryAllTimePopularAnime, variables);
    const allTimePopularAnime = data.data.Page.media;
    displayAllTimePopularAnime(allTimePopularAnime);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function displayAllTimePopularAnime(results) {
  const container = document.getElementById('AllTimePopularAnime');
  const isSearchMangaPage = (window.location.pathname === '/search.html'); 

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaRank = result.rankings[0].rank;
    const mediaGenres = result.genres;

    const element = document.createElement('div');
    element.classList.add('headerBlock--top__element');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('headerBlock--top__elmentImg');

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageWrapper.appendChild(imageElement);
    element.appendChild(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('headerBlock--top__elmentTxt');

    const rankElement = document.createElement('h4');
    rankElement.textContent = mediaRank + '.';
    contentWrapper.appendChild(rankElement);

    const linkElement = document.createElement('a');
    linkElement.href = 'item.html?id=' + result.id; 

    const titleElement = document.createElement('p');
    titleElement.classList.add('titleOf');
    titleElement.textContent = mediaTitle;
    linkElement.appendChild(titleElement);
    contentWrapper.appendChild(linkElement);

    const tagsElement = document.createElement('div');
    tagsElement.classList.add('genres');

    for (let j = 0; j < 2 && j < mediaGenres.length; j++) {
      const genre = mediaGenres[j];
      const tagElement = document.createElement('span');
      tagElement.textContent = genre;
      tagsElement.appendChild(tagElement);
    }

    contentWrapper.appendChild(tagsElement);
    element.appendChild(contentWrapper);

    // Ajout conditionnels pour la page "search-manga"
    if (isSearchMangaPage) {
      const infoWrapper = document.createElement('div');
      infoWrapper.classList.add('infoWrapper');

      const statusWrapper = document.createElement('div');
      statusWrapper.classList.add('infoItemQuery');

      const statusElement = document.createElement('p');
      statusElement.textContent = result.averageScore + '%';
      statusWrapper.appendChild(statusElement);
      infoWrapper.appendChild(statusWrapper);

      const episodesWrapper = document.createElement('div');
      episodesWrapper.classList.add('infoItemQuery');

      const episodesElement = document.createElement('p');
      episodesElement.textContent = result.format;

      const episodesSpan = document.createElement('span');
      episodesSpan.textContent = (result.episodes > 1) ? result.episodes + ' épisodes' : result.episodes + ' film';
      episodesElement.appendChild(episodesSpan);
      episodesWrapper.appendChild(episodesElement);
      infoWrapper.appendChild(episodesWrapper);

      const formatWrapper = document.createElement('div');
      formatWrapper.classList.add('infoItemQuery');

      const formatElement = document.createElement('p');
      formatElement.textContent = result.startDate.year;

      const formatSpan = document.createElement('span');
      formatSpan.textContent = result.status;
      formatElement.appendChild(formatSpan);
      formatWrapper.appendChild(formatElement);
      infoWrapper.appendChild(formatWrapper);

      element.appendChild(infoWrapper);
    }

    container.appendChild(element);
  }
}




// Fonction UPCOMING ANIME
async function getUpcomingAnime() {
  const queryUpcomingAnime = `
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

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryUpcomingAnime, variables);
    const upcomingAnime = data.data.Page.media;
    displayUpcomingAnime(upcomingAnime);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher les résultats
function displayUpcomingAnime(results) {
  const swiperWrapper = document.getElementById('upcomingAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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

        // Vérife si le contenu du <p> dépasse 17 caractères
        if (mediaTitle.length > 23) {
          // Ajout de la classe .marquee
          titleElement.classList.add('marquee');
        }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }

  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });

}

// Appel de la fonction pour récupérer upcoming anime
getUpcomingAnime();



// Fonction ANIME POPULAR
async function getPopularAnime() {
  const queryPopularAnime = `
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

  const variables = {
    page: 1,
  };

  try {
    const data = await fetchData(queryPopularAnime, variables);
    const popularAnime = data.data.Page.media;
    displayPopularAnime(popularAnime);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher popular anime
function displayPopularAnime(results) {
  const swiperWrapper = document.getElementById('popularAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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

        // Vérifies i le contenu du <p> dépasse 17 caractères
        if (mediaTitle.length > 23) {
          // Ajout de la classe .marquee
          titleElement.classList.add('marquee');
        }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }

  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}





// Fonction POPULAR MANGA
async function getPopularManga() {
  const queryManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: POPULARITY_DESC) {
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
    const data = await fetchData(queryManga, variables);
    const popularManga = data.data.Page.media;
    displayPopularManga(popularManga);
    console.log(data)
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher popular manga
function displayPopularManga(results) {
  const swiperWrapper = document.getElementById('popularManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }

  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);

    }
  });
}


// Fonction MOVIES
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

// Fonction pour afficher MOVIE
function displayMovieAnime(results) {
  const swiperWrapper = document.getElementById('movieAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}

// Appel fonction MOVIE
getMovieAnime();


// Fonction POPULAR ONE SHOT
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

// Fonction pour afficher popular one shot
function displayOneShotManga(results) {
  const swiperWrapper = document.getElementById('oneShotManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}




// Fonction POPULAR ECCHI = HORROR
async function getPopularEcchiManga() {
  const queryPopularEcchiManga = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: MANGA, sort: POPULARITY_DESC, genre: "Horror") {
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
    const data = await fetchData(queryPopularEcchiManga, variables);
    const popularEcchiManga = data.data.Page.media;
    displayPopularEcchiManga(popularEcchiManga);
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher POPULAR HORROR
function displayPopularEcchiManga(results) {
  const swiperWrapper = document.getElementById('popularEcchiManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
  
}


// Fonction POPULAR SPORT ANIME
async function getSportAnime() {
  const querySportAnime = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: ANIME, sort: POPULARITY_DESC, genre: "Sports") {
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
    const data = await fetchData(querySportAnime, variables);
    const sportAnime = data.data.Page.media;
    displaySportAnime(sportAnime);
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher POPULAR SPORT ANIME 
function displaySportAnime(results) {
  const swiperWrapper = document.getElementById('sportAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }

  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}

// Fonction POPULAR MANHWA
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

// Fonction pour afficher POPULAR MANHWA
function displayKoreanManga(results) {
  const swiperWrapper = document.getElementById('koreanManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}


// Fonction ANIME THRILLER
async function getThrillerAnime() {
  const queryThrillerAnime = `
    query ($page: Int) {
      Page(page: $page, perPage: 18) {
        media(type: ANIME, sort: POPULARITY_DESC, genre: "Thriller") {
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
    const data = await fetchData(queryThrillerAnime, variables);
    const thrillerAnime = data.data.Page.media;
    displayThrillerAnime(thrillerAnime);
  } catch (error) {
    console.log(error);
  }
}

// Fonction pour afficher ANIME THRILLER
function displayThrillerAnime(results) {
  const swiperWrapper = document.getElementById('thrillerAnime');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }

  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}



// Fonction pour récupérer TRENDINGS MANGA
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

// Fonction pour afficher TRENDINGS MANGA
function displayTrendingManga(results) {
  const swiperWrapper = document.getElementById('trendingManga');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}

// Fonction TRENDINGS ANIME
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
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
}

// Fonction POPULAR MUSIC
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

// Fonction pour afficher TRENDINGS MUSIC
function displayTrendingMusic(results) {
  const swiperWrapper = document.getElementById('trendingMusic');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--slider__card', 'swiper-slide', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

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
            if (mediaTitle.length > 23) {
              // Ajout de la classe .marquee
              titleElement.classList.add('marquee');
            }

    linkElement.appendChild(imageElement);
    linkElement.appendChild(slideText);
    swiperSlide.appendChild(linkElement);
    swiperWrapper.appendChild(swiperSlide);
  }
  swiperWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.swiper-slide');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);
    }
  });
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

// Appel de la fonction pour récupérer les données des animes populaires de tous les temps
getAllTimePopularManga();
// Appel de la fonction pour récupérer les données des animes populaires de tous les temps
getAllTimePopularAnime();
// Appel de la fonction pour récupérer les données des mangas tendances
getPopularManga();
// Appel de la fonction pour récupérer les données des animes populaires
getPopularAnime();
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
// Appel de la fonction pour récupérer les données des animes du genre sport
getSportAnime();
// Appel de la fonction pour récupérer les données des animes du genre thriller
getThrillerAnime();



