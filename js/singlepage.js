
//------------- API ----------


// Fonction pour afficher les résultats de la recherche de mangas
function displaySearchAllManga(results) {
  const searchWrapper = document.getElementById('resultSearchMangaBlock');
  searchWrapper.innerHTML = ''; // Efface les résultats précédents

  for (const result of results) {
    const mediaTitle = result.title.english || result.title.romaji || result.title.native;
    const mediaImage = result.coverImage.extraLarge;
    const mediaId = result.id;

    const resultItem = document.createElement('div');
    resultItem.classList.add('searchResultItem', 'card');
    resultItem.title = mediaTitle;
    resultItem.dataset.mediaId = mediaId;

    const linkElement = document.createElement('a');
    linkElement.href = 'item.html?id=' + mediaId; 

    const imageElement = document.createElement('img');
    imageElement.src = mediaImage;
    imageElement.alt = mediaTitle;
    imageElement.title = mediaTitle;

    const titleElement = document.createElement('p');
    titleElement.textContent = mediaTitle;

    const resultText = document.createElement('div');
    resultText.classList.add('titleOf');
    resultText.appendChild(titleElement);

    linkElement.appendChild(imageElement);
    linkElement.appendChild(resultText);
    resultItem.appendChild(linkElement);
    searchWrapper.appendChild(resultItem);
  }

  searchWrapper.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.searchResultItem');
    if (clickedElement) {
      const mediaId = clickedElement.dataset.mediaId;
      console.log(mediaId);

    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.searchResultItem', { duration: 800, easing: 'ease-in', interval: 150 });
}

// Requête GraphQL pour rechercher des mangas en fonction de l'entrée dans l'input
async function getSearchAllManga(searchQuery) {
  const querySearchManga = `
    query ($search: String) {
      Page {
        media(type: MANGA, search: $search) {
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
    search: searchQuery,
  };

  try {
    const searchData = await fetchData(querySearchManga, variables);
    const searchResults = searchData.data.Page.media;

    displaySearchAllManga(searchResults);
    console.log(searchData);
  } catch (error) {
    console.log(error);
  }
}




// Fonction pour récupérer les 100 meilleurs animes
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

// Fonction pour afficher les 100 meilleurs animes
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

                // Vérification si le contenu du <p> dépasse 17 caractères
                if (mediaTitle.length > 23) {
                  // Ajout de la classe .marquee
                  titleElement.classList.add('marquee');
                }

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
      
    }
  });

  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing: 'ease-in', interval: 150 });
}


// Fonction pour récupérer les 100 meilleurs mangas
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


// Fonction pour afficher les 100 meilleurs mangas
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

                // Vérification si le contenu du <p> dépasse 17 caractères
                if (mediaTitle.length > 23) {
                  // Ajout de la classe .marquee
                  titleElement.classList.add('marquee');
                }

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
      
    }
  });
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}




// Fonction pour récupérer les des animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}



// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}

// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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
  // SCROLL REVEAL
  ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour récupérer les animes populaires
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

// Fonction pour afficher les animes populaires
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


// Fonction pour afficher les animes populaires
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


// Fonction pour afficher les animes populaires
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


// Fonction pour afficher les animes à venir
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
  // // SCROLL REVEAL
ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
}


// Fonction pour afficher popular manga
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
  // // SCROLL REVEAL
ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
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





let mediaList = [];

// Récupérer les données du local storage lors du chargement de la page
window.addEventListener('load', function() {
  const storedMediaList = localStorage.getItem('mediaList');
  document.querySelector('.mangaList').addEventListener('click', function(event) {
    event.preventDefault();
    filterMediaByType('MANGA');
  });
  
  document.querySelector('.animeList').addEventListener('click', function(event) {
    event.preventDefault();
    filterMediaByType('ANIME');
  });
  

  if (storedMediaList) {
    mediaList = JSON.parse(storedMediaList);

    // Parcourir mediaList et appliquer l'action à chaque élément
    for (const mediaId of mediaList) {
      performActionOnMedia(mediaId);
    }
  }
});

// Fonction pour récupérer les détails du média en utilisant son ID
async function getMediaDetails(mediaId) {
  const query = `
    query ($id: Int) {
      Media (id: $id) {
        id
        type
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
  `;

  const variables = {
    id: mediaId
  };

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  });

  const data = await response.json();
  return data.data.Media;
}

// Fonction pour afficher le titre et l'image d'un média dans #listResult
function displayMedia(media) {
  const swiperWrapper = document.getElementById('listResult');

  const mediaTitle = media.title.english || media.title.romaji || media.title.native;
  const mediaImage = media.coverImage.extraLarge;
  
  const swiperSlide = document.createElement('div');
  swiperSlide.classList.add('popularBlock--single__card', 'card');
  swiperSlide.title = mediaTitle;
  swiperSlide.dataset.mediaId = media.id;
  
  const linkElement = document.createElement('a');
  linkElement.href = 'item.html?id=' + media.id; 
  
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
  
  const removeCross = document.createElement('button');
  removeCross.id = 'removeListbtn';
  removeCross.innerHTML = '&#10060;';
  removeCross.dataset.mediaId = media.id;
  
  swiperSlide.appendChild(removeCross);
  swiperSlide.appendChild(linkElement);
  swiperSlide.appendChild(slideText);
  swiperWrapper.appendChild(swiperSlide);

  console.log(media)
}


async function performActionOnMedia(mediaId) {
  // Récupérer les détails du média en utilisant son ID
  const media = await getMediaDetails(mediaId);

  // Afficher le titre et l'image du média dans #listResult
  displayMedia(media);
}

// Parcourir mediaList et appliquer l'action à chaque élément
for (const mediaId of mediaList) {
  performActionOnMedia(mediaId);
}


function setActiveLinkSearch(clickedLink) {
  const links = document.querySelectorAll('.searchMyList a');

  links.forEach((link) => {
    link.classList.remove('active');
  });

  clickedLink.classList.add('active');

  let mediaType;
  if (clickedLink.classList.contains('mangaList')) {
    mediaType = 'Manga';
  } else if (clickedLink.classList.contains('animeList')) {
    mediaType = 'Anime';
  } else {
    mediaType = 'All';
  }

  filterMediaByType(mediaType);
}

const searchLinks = document.querySelectorAll('.searchMyList a');

searchLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveLinkSearch(link);
  });
});


function filterMediaByType(mediaType) {
  // Récupérer tous les éléments dans #listResult
  const mediaElements = document.querySelectorAll('#listResult .popularBlock--single__card');

  // Parcourir les éléments et les afficher ou les masquer en fonction du type sélectionné
  mediaElements.forEach(function(mediaElement) {
    const mediaId = mediaElement.dataset.mediaId;
    getMediaDetails(mediaId)
      .then(function(media) {
        if (media.type === mediaType || mediaType === 'All') {
          mediaElement.style.display = 'block';
        } else {
          mediaElement.style.display = 'none';
        }
      })
      .catch(function(error) {
        console.log('Error retrieving media details:', error);
      });
  });
}







