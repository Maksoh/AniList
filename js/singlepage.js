// SWIPER JS 

// var swiper = new Swiper(".relationsBlockSwiper", {
//   slidesPerView: 6,
//   spaceBetween: 20,
//   freeMode: true,

// });

// NAV SCROLL 
var navigation = document.querySelector('.navigation');
var lastScrollPosition = window.pageYOffset;

window.addEventListener('scroll', function() {
var currentScrollPosition = window.pageYOffset;

if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 110) {
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

// // SCROLL REVEAL
// ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});

//------------- API ----------

// Fonction pour récupérer les données des 100 meilleurs animes
async function getTopAnime100() {
  const queryTopAnime100 = `
    query ($page: Int) {
      Page(page: $page) {
        media(type: ANIME, sort: SCORE_DESC, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          rankings {
            rank
          }
        }
      }
    }
  `;

  const variables = {
    page: 1,
  };

  try {
    const data1 = await fetchData(queryTopAnime100, variables);
    const topAnime100_1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryTopAnime100, variables);
    const topAnime100_2 = data2.data.Page.media;

    const topAnime100 = topAnime100_1.concat(topAnime100_2); // Fusionner les résultats des deux pages

    displayTopAnime100(topAnime100);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des 100 meilleurs animes
function displayTopAnime100(results) {
  const swiperWrapper = document.getElementById('topAnimeAll');

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    const badgeElement = document.createElement('div');
    badgeElement.id = 'marsh-badge';

    const badgeContent = document.createElement('div');
    badgeContent.classList.add('badge');

    const innerBadge = document.createElement('div');
    innerBadge.classList.add('inner');

    badgeContent.appendChild(innerBadge);
    badgeElement.appendChild(badgeContent);

    const badgeNumber = document.createElement('h1');
    badgeNumber.textContent = (i + 1);

    // Appliquer une classe spéciale aux chiffres supérieurs à 10
    if (i >= 99) {
      badgeNumber.classList.add('small-number');
    }

    badgeElement.appendChild(badgeNumber);

    linkElement.appendChild(badgeElement);
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
      // Faites quelque chose avec l'ID du media
    }
  });

  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing: 'ease-in', interval: 150 });
}


// Fonction pour récupérer les données des 100 meilleurs mangas
async function getTopManga100() {
  const queryTopManga100 = `
    query ($page: Int) {
      Page(page: $page) {
        media(type: MANGA, sort: SCORE_DESC, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
          }
          rankings{
            rank
          }
        }
      }
    }
  `;

  const variables = {
    page: 1,

  };

  try {
    const data1 = await fetchData(queryTopManga100, variables);
    const topManga100_1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryTopManga100, variables);
    const topManga100_2 = data2.data.Page.media;

    const topManga100 = topManga100_1.concat(topManga100_2); // Fusionner les résultats des deux pages

    displayTopManga100(topManga100);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}


// Fonction spécifique pour afficher les résultats des 100 meilleurs mangas
function displayTopManga100(results) {
  const swiperWrapper = document.getElementById('topMangaAll');

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

    const badgeElement = document.createElement('div');
    badgeElement.id = 'marsh-badge';

    const badgeContent = document.createElement('div');
    badgeContent.classList.add('badge');

    const innerBadge = document.createElement('div');
    innerBadge.classList.add('inner');

    badgeContent.appendChild(innerBadge);
    badgeElement.appendChild(badgeContent);

    const badgeNumber = document.createElement('h1');
    badgeNumber.textContent = (i + 1);

    // Appliquer une classe spéciale aux chiffres supérieurs à 10
    if (i >= 99) {
      badgeNumber.classList.add('small-number');
    }

    badgeElement.appendChild(badgeNumber);

    linkElement.appendChild(badgeElement);
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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}




// Fonction pour récupérer les données des animes populaires
async function getPopularEchhiAll() {
  const queryPopularEchhi = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularEchhi, variables);
    const popularEchhiAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularEchhi, variables);
    const popularEchhiAll2 = data2.data.Page.media;

    const popularEchhiAll = popularEchhiAll1.concat(popularEchhiAll2); // Fusionner les résultats des deux pages

    displayPopularEchhiAll(popularEchhiAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularEchhiAll(results) {
  const swiperWrapper = document.getElementById('popularEchhiAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les données des animes populaires
async function getPopularThrillerAll() {
  const queryPopularThriller = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularThriller, variables);
    const popularThrillerAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularThriller, variables);
    const popularThrillerAll2 = data2.data.Page.media;

    const popularThrillerAll = popularThrillerAll1.concat(popularThrillerAll2); // Fusionner les résultats des deux pages

    displayPopularThrillerAll(popularThrillerAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularThrillerAll(results) {
  const swiperWrapper = document.getElementById('popularThrillerAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les données des animes populaires
async function getPopularSportAll() {
  const queryPopularSport = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularSport, variables);
    const popularSportAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularSport, variables);
    const popularSportAll2 = data2.data.Page.media;

    const popularSportAll = popularSportAll1.concat(popularSportAll2); // Fusionner les résultats des deux pages

    displayPopularSportAll(popularSportAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularSportAll(results) {
  const swiperWrapper = document.getElementById('popularSportAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les données des animes populaires
async function getPopularMusicAll() {
  const queryPopularMusic = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularMusic, variables);
    const popularMusicAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularMusic, variables);
    const popularMusicAll2 = data2.data.Page.media;

    const popularMusicAll = popularMusicAll1.concat(popularMusicAll2); // Fusionner les résultats des deux pages

    displayPopularMusicAll(popularMusicAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularMusicAll(results) {
  const swiperWrapper = document.getElementById('popularMusicAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}



// Fonction pour récupérer les données des animes populaires
async function getPopularOneShotAll() {
  const queryPopularOneShot = `
    query ($page: Int) {
      Page(page: $page) {
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
  };

  try {
    const data1 = await fetchData(queryPopularOneShot, variables);
    const popularOneShotAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularOneShot, variables);
    const popularOneShotAll2 = data2.data.Page.media;

    const popularOneShotAll = popularOneShotAll1.concat(popularOneShotAll2); // Fusionner les résultats des deux pages

    displayPopularOneShotAll(popularOneShotAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularOneShotAll(results) {
  const swiperWrapper = document.getElementById('popularOneShotAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les données des animes populaires
async function getPopularManhwaAll() {
  const queryPopularManhwa = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularManhwa, variables);
    const popularManhwaAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularManhwa, variables);
    const popularManhwaAll2 = data2.data.Page.media;

    const popularManhwaAll = popularManhwaAll1.concat(popularManhwaAll2); // Fusionner les résultats des deux pages

    displayPopularManhwaAll(popularManhwaAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularManhwaAll(results) {
  const swiperWrapper = document.getElementById('popularManhwaAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}

// Fonction pour récupérer les données des animes populaires
async function getPopularMoviesAll() {
  const queryPopularMovies = `
    query ($page: Int) {
      Page(page: $page) {
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
  };

  try {
    const data1 = await fetchData(queryPopularMovies, variables);
    const popularMoviesAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularMovies, variables);
    const popularMoviesAll2 = data2.data.Page.media;

    const popularMoviesAll = popularMoviesAll1.concat(popularMoviesAll2); // Fusionner les résultats des deux pages

    displayPopularMoviesAll(popularMoviesAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularMoviesAll(results) {
  const swiperWrapper = document.getElementById('popularMoviesAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les données des animes populaires
async function getPopularAnimeAll() {
  const queryPopularAnime = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryPopularAnime, variables);
    const popularAnimeAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryPopularAnime, variables);
    const popularAnimeAll2 = data2.data.Page.media;

    const popularAnimeAll = popularAnimeAll1.concat(popularAnimeAll2); // Fusionner les résultats des deux pages

    displayPopularAnimeAll(popularAnimeAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

// Fonction spécifique pour afficher les résultats des animes populaires
function displayTrendingAnimeAll(results) {
  const swiperWrapper = document.getElementById('trendingAnimeAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}



// TRENDING MANGA  ------
async function getTrendingAnimeAll() {
  const queryTrendingAnime = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryTrendingAnime, variables);
    const trendingAnimeAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryTrendingAnime, variables);
    const trendingAnimeAll2 = data2.data.Page.media;

    const trendingAnimeAll = trendingAnimeAll1.concat(trendingAnimeAll2); // Fusionner les résultats des deux pages

    displayTrendingAnimeAll(trendingAnimeAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}


// Fonction spécifique pour afficher les résultats des animes populaires
function displayTrendingMangaAll(results) {
  const swiperWrapper = document.getElementById('trendingMangaAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}

// UPCOMING ANIME ------
async function getTrendingMangaAll() {
  const queryTrendingManga = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryTrendingManga, variables);
    const trendingMangaAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryTrendingManga, variables);
    const trendingMangaAll2 = data2.data.Page.media;

    const trendingMangaAll = trendingMangaAll1.concat(trendingMangaAll2); // Fusionner les résultats des deux pages

    displayTrendingMangaAll(trendingMangaAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}


// Fonction spécifique pour afficher les résultats des animes populaires
function displayPopularAnimeAll(results) {
  const swiperWrapper = document.getElementById('popularAnimeAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}

// UPCOMING ANIME ------
async function getUpcomingAnimeAll() {
  const queryUpcomingAnime = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryUpcomingAnime, variables);
    const upcomingAnimeAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryUpcomingAnime, variables);
    const upcomingAnimeAll2 = data2.data.Page.media;

    const upcomingAnimeAll = upcomingAnimeAll1.concat(upcomingAnimeAll2); // Fusionner les résultats des deux pages

    displayUpcomingAnimeAll(upcomingAnimeAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}

async function getPopularMangaAll() {
  const queryMangaAll = `
    query ($page: Int) {
      Page(page: $page) {
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
    const data1 = await fetchData(queryMangaAll, variables);
    const popularMangaAll1 = data1.data.Page.media;

    variables.page = 2; // Modifier la valeur de la page pour récupérer la deuxième page
    const data2 = await fetchData(queryMangaAll, variables);
    const popularMangaAll2 = data2.data.Page.media;

    const popularMangaAll = popularMangaAll1.concat(popularMangaAll2); // Fusionner les résultats des deux pages

    displayPopularMangaAll(popularMangaAll);
    console.log(data1);
    console.log(data2);
  } catch (error) {
    console.log(error);
  }
}


// Fonction spécifique pour afficher les résultats des animes à venir
function displayUpcomingAnimeAll(results) {
  const swiperWrapper = document.getElementById('upcomingAnimeAll');
  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // // SCROLL REVEAL
ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction spécifique pour afficher les résultats des mangas tendances
function displayPopularMangaAll(results) {
  const swiperWrapper = document.getElementById('popularMangaAll');

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitle;
    swiperSlide.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'singleid.html?id=' + mediaId; // URL avec l'ID en tant que paramètre

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const slideText = document.createElement('div');
    slideText.classList.add('titleOf');
    slideText.appendChild(titleElement);

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
      // Faites quelque chose avec l'ID du media
    }
  });
  // // SCROLL REVEAL
ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
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

// // Appel de la fonction pour récupérer les données des animes populaires de tous les temps
// getPopularMangaAll();
// // Appel de la fonction pour récupérer les données des animes à venir
// getUpcomingAnimeAll();


const popularAnimeAllWrapper = document.getElementById('popularAnimeAll');
const upcomingAnimeAllWrapper = document.getElementById('upcomingAnimeAll');
const popularMangaAllWrapper = document.getElementById('popularMangaAll');
const popularTrendingMangaAllWrapper = document.getElementById('trendingMangaAll');
const popularTrendingAnimeAllWrapper = document.getElementById('trendingAnimeAll');
const popularMoviesAllWrapper = document.getElementById('popularMoviesAll');
const popularManhwaAllWrapper = document.getElementById('popularManhwaAll');
const popularOneShotAllWrapper = document.getElementById('popularOneShotAll');
const popularMusicAllWrapper = document.getElementById('popularMusicAll');
const popularSportAllWrapper = document.getElementById('popularSportAll');
const popularThrillerAllWrapper = document.getElementById('popularThrillerAll');
const popularEchhiAllWrapper = document.getElementById('popularEchhiAll');
const popularTopMangaAllWrapper = document.getElementById('topMangaAll');
const popularTopAnimeAllWrapper = document.getElementById('topAnimeAll');

if (popularAnimeAllWrapper) {
  getPopularAnimeAll();
}

if (upcomingAnimeAllWrapper) {
  getUpcomingAnimeAll();
}

if (popularMangaAllWrapper) {
  getPopularMangaAll();
}

if (popularTrendingMangaAllWrapper) {
  getTrendingMangaAll();
}

if (popularTrendingAnimeAllWrapper) {
  getTrendingAnimeAll();
}

if (popularMoviesAllWrapper) {
  getPopularMoviesAll();
}

if (popularManhwaAllWrapper) {
  getPopularManhwaAll();
}

if (popularOneShotAllWrapper) {
  getPopularOneShotAll();
}

if (popularMusicAllWrapper) {
  getPopularMusicAll();
}

if (popularSportAllWrapper) {
  getPopularSportAll();
}

if (popularThrillerAllWrapper) {
  getPopularThrillerAll();
}

if (popularEchhiAllWrapper) {
  getPopularEchhiAll();
}

if (popularTopMangaAllWrapper) {
  getTopManga100();
}

if (popularTopAnimeAllWrapper) {
  getTopAnime100();
}



// var queryAllTimePopular = `
//   query ($page: Int) {
//     Page(page: $page) {
//       media(type: ANIME, sort: SCORE_DESC) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//         genres
//         rankings{
//           rank
//         }
//         averageScore
//         format
//         status
//         episodes
//         duration
//         startDate{
//           year
//         }
//       }
//     }
//   }
// `;

// var queryManga = `
//   query ($page: Int) {
//     Page(page: $page) {
//       media(type: MANGA, sort: POPULARITY_DESC,) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;

// var queryAnime = `
//   query ($page: Int) {
//     Page(page: $page,) {
//       media(type: ANIME, sort: POPULARITY_DESC) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;

// var queryUpcomingAnime = `
//   query ($page: Int) {
//     Page(page: $page) {
//       media(type: ANIME, sort: POPULARITY_DESC, seasonYear: 2023, season: WINTER) {
//         id
//         title {
//           romaji
//           english
//           native
//         }
//         coverImage {
//           extraLarge
//         }
//       }
//     }
//   }
// `;



// var variables = {
//   page: 1  // Page number, adjust as needed
// };

// var url = 'https://graphql.anilist.co';
// var options = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query: queryManga,
//     variables: variables
//   })
// };

// fetch(url, options)
//   .then(function (response) {
//     return response.json().then(function (json) {
//       return response.ok ? json : Promise.reject(json);
//     });
//   })
//   .then(function (mangaData) {
//     handleData(mangaData, 'popularmangaAll');

//     // Fetch anime data
//     options.body = JSON.stringify({
//       query: queryAnime,
//       variables: variables
//     });

//     return fetch(url, options)
//       .then(function (response) {
//         return response.json().then(function (json) {
//           return response.ok ? json : Promise.reject(json);
//         });
//       })
//       .then(function (animeData) {
//         handleData(animeData, 'popularanimeAll');

//         // Fetch upcoming anime data
//         options.body = JSON.stringify({
//           query: queryUpcomingAnime,
//           variables: variables
//         });

//         return fetch(url, options)
//           .then(function (response) {
//             return response.json().then(function (json) {
//               return response.ok ? json : Promise.reject(json);
//             });
//           })
//           .then(function (upcomingAnimeData) {
//             handleData(upcomingAnimeData, 'upcominganimeAll');

//             // Fetch all-time popular anime data
//             options.body = JSON.stringify({
//               query: queryAllTimePopular,
//               variables: variables
//             });

//             return fetch(url, options)
//               .then(function (response) {
//                 return response.json().then(function (json) {
//                   return response.ok ? json : Promise.reject(json);
//                 });
//               })
//               .then(function (allTimePopularData) {
//                 handleData(allTimePopularData, 'alltimepopular');
//               });
//           });
//       });
//   })
//   .catch(function (error) {
//     alert('Erreur, consultez la console');
//     console.error(error);
//   });

// // SWIPER FUNCTION 
// function handleData(data, containerId) {
//   console.log(data);
//   var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
//   var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper

//   // if (!swiperWrapper) {
//   //   console.error('Le conteneur', containerId, 'n\'existe pas');
//   //   return;
//   // }

//   for (var i = 0; i < mediaTitles.length; i++) {
//     var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
//     if (mediaTitle.length > 25) {
//       mediaTitle = mediaTitle.substring(0, 24) + '...'; // Limite la longueur du titre à 28 caractères
//     }
//     var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média

//     var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
//     swiperSlide.classList.add('popularBlock--single__card', 'card');
//     swiperSlide.title = mediaTitles[i].title.english;
//     var imageElement = document.createElement('img'); // Créez un élément img pour l'image
//     imageElement.src = mediaImage;
//     imageElement.alt = mediaTitle;
//     imageElement.title = mediaTitles[i].title.english; // Ajoute le titre complet en tant qu'attribut "title" de l'élément "img"
    
//     var titleElement = document.createElement('p'); // Créez un élément p pour le titre romaji
//     titleElement.textContent = mediaTitle;
    
//     var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
//     slideText.classList.add('titleOf');
//     slideText.appendChild(titleElement);
    
//     swiperSlide.appendChild(imageElement);
//     swiperSlide.appendChild(slideText);
//     swiperWrapper.appendChild(swiperSlide);

//     // SCROLL REVEAL
//     ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});


//   }
// }


// function handleAllTimePopularData(data, containerId) {
//     console.log(data);
//     var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
//     var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper
  
//     // if (!swiperWrapper) {
//     //   console.error('Le conteneur', containerId, 'n\'existe pas');
//     //   return;
//     // }
  
//     for (var i = 0; i < mediaTitles.length; i++) {
//       var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
//       if (mediaTitle.length > 25) {
//         mediaTitle = mediaTitle.substring(0, 24) + '...'; // Limite la longueur du titre à 28 caractères
//       }
//       var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média
  
//       var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
//       swiperSlide.classList.add('popularBlock--single__card', 'card');
//       swiperSlide.title = mediaTitles[i].title.english;
//       var imageElement = document.createElement('img'); // Créez un élément img pour l'image
//       imageElement.src = mediaImage;
//       imageElement.alt = mediaTitle;
//       imageElement.title = mediaTitles[i].title.english; // Ajoute le titre complet en tant qu'attribut "title" de l'élément "img"
      
//       var titleElement = document.createElement('p'); // Créez un élément p pour le titre romaji
//       titleElement.textContent = mediaTitle;
      
//       var slideText = document.createElement('div'); // Créez un élément div pour le conteneur de texte
//       slideText.classList.add('titleOf');
//       slideText.appendChild(titleElement);
      
//       swiperSlide.appendChild(imageElement);
//       swiperSlide.appendChild(slideText);
//       swiperWrapper.appendChild(swiperSlide);
//           // SCROLL REVEAL
//     ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
      
//     }
//   }