// SWIPER JS 

var swiper = new Swiper(".popularBlock--slider", {
  slidesPerView: 6,
  spaceBetween: 20,
  freeMode: true,

});

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



var queryAllTimePopular = `
  query ($page: Int) {
    Page(page: $page) {
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
    Page(page: $page) {
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
      }
    }
  }
`;

var queryAnime = `
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

var queryUpcomingAnime = `
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



var variables = {
  page: 1  // Page number, adjust as needed
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
    handleData(mangaData, 'popularmangaAll');

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
        handleData(animeData, 'popularanimeAll');

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
            handleData(upcomingAnimeData, 'upcominganimeAll');

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
                handleAllTimePopularData(allTimePopularData, 'alltimepopular');
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

  // if (!swiperWrapper) {
  //   console.error('Le conteneur', containerId, 'n\'existe pas');
  //   return;
  // }

  for (var i = 0; i < mediaTitles.length; i++) {
    var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
    if (mediaTitle.length > 25) {
      mediaTitle = mediaTitle.substring(0, 24) + '...'; // Limite la longueur du titre à 28 caractères
    }
    var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média

    var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
    swiperSlide.classList.add('popularBlock--single__card', 'card');
    swiperSlide.title = mediaTitles[i].title.english;
    // swiperSlide.innerHTML = '
    // // <img src="${mediaImage}" alt="cover">
    // <p class="titleOf">${ mediaTitles[i].title.english}</p>
    // '
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

    // SCROLL REVEAL
    ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});


  }
}


function handleAllTimePopularData(data, containerId) {
    console.log(data);
    var mediaTitles = data.data.Page.media; // Obtenez les titres des médias à partir des données de réponse
    var swiperWrapper = document.getElementById(containerId); // Sélectionnez le conteneur des éléments swiper
  
    // if (!swiperWrapper) {
    //   console.error('Le conteneur', containerId, 'n\'existe pas');
    //   return;
    // }
  
    for (var i = 0; i < mediaTitles.length; i++) {
      var mediaTitle = mediaTitles[i].title.english; // Obtenez le titre romaji du média correspondant
      if (mediaTitle.length > 25) {
        mediaTitle = mediaTitle.substring(0, 24) + '...'; // Limite la longueur du titre à 28 caractères
      }
      var mediaImage = mediaTitles[i].coverImage.extraLarge; // Obtenez l'URL de l'image du média
  
      var swiperSlide = document.createElement('div'); // Créez un élément div pour swiper-slide
      swiperSlide.classList.add('popularBlock--single__card', 'card');
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
          // SCROLL REVEAL
    ScrollReveal().reveal('.popularBlock--single__card', { duration: 800, easing:'ease-in', interval: 150});
      
    }
  }